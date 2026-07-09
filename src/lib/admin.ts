export const ADMIN_EMAIL = "admin@studio-caffe-bar.rs";

export function normalizeEmail(email: string | null | undefined) {
  return (email ?? "").trim().toLowerCase();
}

export function isAdminEmail(email: string | null | undefined) {
  return normalizeEmail(email) === normalizeEmail(ADMIN_EMAIL);
}
