import * as crypto from "node:crypto";
import * as bcrypt from "bcryptjs";
import { requireCryptoKeys } from "./env";

/**
 * 환자 데이터 보호 — KISA "개인정보 안전성 확보조치 기준" 준수 헬퍼.
 *
 * 정책 (Gemini 리서치 / KISA 2024 기준):
 *  - 전화번호(식별정보): AES-256-GCM 컬럼 암호화 + AAD="pii"
 *  - 상담 내용·답변(민감정보 §23): AES-256-GCM 컬럼 암호화 + AAD="medical"
 *  - 비밀번호: bcrypt cost 12 (단방향)
 *  - 키는 PHONE_ENC_KEY (32 bytes hex) — Vercel env 에서 주입.
 *
 * 출력 포맷: `<iv-hex>:<authTag-hex>:<ciphertext-hex>` 한 컬럼에 안전 저장.
 */

const ALG = "aes-256-gcm";
const IV_LEN = 12; // GCM 권장 96-bit
const TAG_LEN = 16;

/**
 * 필드 암호화 — AAD 에 `<kind>|<recordId>` 를 묶어서 ciphertext 가 행/필드에
 * 고정되도록 한다. 동일 클래스(예: name) 의 ciphertext 를 다른 행으로 옮겨도
 * setAuthTag 단계에서 즉시 거부됨.
 */
export type FieldKind = "name" | "phone" | "content" | "reply";

function bindAad(kind: FieldKind, recordId: string): Buffer {
  return Buffer.from(`${kind}|${recordId}`, "utf8");
}

export function encryptField(plain: string, kind: FieldKind, recordId: string): string {
  const { phoneKey } = requireCryptoKeys();
  const iv = crypto.randomBytes(IV_LEN);
  const cipher = crypto.createCipheriv(ALG, phoneKey, iv, { authTagLength: TAG_LEN });
  cipher.setAAD(bindAad(kind, recordId));
  const ct = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${tag.toString("hex")}:${ct.toString("hex")}`;
}

export function decryptField(payload: string, kind: FieldKind, recordId: string): string {
  const { phoneKey } = requireCryptoKeys();
  const [ivHex, tagHex, ctHex] = payload.split(":");
  if (!ivHex || !tagHex || !ctHex) {
    throw new Error("crypto: malformed ciphertext payload");
  }
  const decipher = crypto.createDecipheriv(ALG, phoneKey, Buffer.from(ivHex, "hex"), {
    authTagLength: TAG_LEN,
  });
  decipher.setAAD(bindAad(kind, recordId));
  decipher.setAuthTag(Buffer.from(tagHex, "hex"));
  const pt = Buffer.concat([decipher.update(Buffer.from(ctHex, "hex")), decipher.final()]);
  return pt.toString("utf8");
}

// === Password (단방향) ===
const BCRYPT_COST = 12;
export const hashPassword = (plain: string) => bcrypt.hash(plain, BCRYPT_COST);
export const verifyPassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);

/**
 * 이름 마스킹 — 가운데 글자(들) 를 'O' 로 치환. 표시용 only, DB 에는 평문 저장.
 *  김준영 → 김O영, 이준 → 이O, 김 → 김
 */
export function maskName(name: string): string {
  const trimmed = name.trim();
  const len = [...trimmed].length;
  if (len <= 1) return trimmed;
  if (len === 2) return `${[...trimmed][0]}O`;
  const chars = [...trimmed];
  return chars[0] + "O".repeat(len - 2) + chars[len - 1];
}

/** 휴대전화 끝 4자리만 노출. 010-****-1234 식. */
export function maskPhoneLast4(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return "****";
  const last4 = digits.slice(-4);
  return `***-****-${last4}`;
}
