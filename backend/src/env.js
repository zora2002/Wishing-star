export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`缺少必要的環境變數 ${name}，請檢查 .env 是否有設定`);
  }
  return value;
}
