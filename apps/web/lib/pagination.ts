/**
 * URL searchParam 의 page 값을 안전하게 양의 정수로 정규화.
 *
 * `1.5` → 1, `"foo"` → 1, `"-3"` → 1, `Infinity` → 1, `1e6` → 1_000_000.
 *
 * Number(string) 의 부동소수/NaN/Infinity 케이스를 모두 차단해 잘못된
 * offset 계산으로 인한 빈 페이지 / 중간 슬라이스 노출을 방지한다.
 */
export function parsePage(value: string | string[] | undefined | null): number {
  const s = Array.isArray(value) ? value[0] : value;
  if (!s) return 1;
  const n = Number(s);
  if (!Number.isInteger(n) || n < 1) return 1;
  return n;
}
