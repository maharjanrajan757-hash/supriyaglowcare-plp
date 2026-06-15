const requiredOrderVariables = [
  "GOOGLE_SHEET_ID",
  "GOOGLE_SHEET_TAB_NAME",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
] as const;

export function getMissingOrderConfiguration() {
  return requiredOrderVariables.filter((name) => !process.env[name]?.trim());
}
