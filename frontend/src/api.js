const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "發生未知的錯誤");
  }
  return res.json();
}

async function request(path, options) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, options);
  } catch {
    throw new Error("連不到許願牆伺服器，請稍後再試");
  }
  return handleResponse(res);
}

export function getWishes() {
  return request("/api/wishes");
}

export function createWish({ name, message }) {
  return request("/api/wishes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message }),
  });
}
