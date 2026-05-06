/**
 * Edge runtime 안전한 상수만. middleware.ts 에서 import 해도 node:crypto 등의
 * Node-전용 모듈을 끌어오지 않기 위해 분리됨.
 */

export const SESSION_COOKIE = "ks_admin_session";
