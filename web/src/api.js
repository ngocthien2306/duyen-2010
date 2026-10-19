// Backend chạy trên Cloud Run. Không có backend thì các tính năng vẫn chạy, chỉ lưu tạm trên máy.
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
let key = '';

export const setKey = (k) => { key = k; };
export const hasBackend = () => Boolean(BASE);

async function call(path, body) {
  if (!BASE) throw new Error('no-backend');
  const res = await fetch(`${BASE}${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', 'x-love-key': key },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

export const api = {
  state: () => call('/api/state'),
  open: () => call('/api/open', {}),
  wish: (text) => call('/api/wishes', { text }),
  redeem: (id, title) => call(`/api/coupons/${id}/redeem`, { title }),
  flower: () => call('/api/flowers', {}),
  rsvp: (answer, attempts, invite) => call('/api/rsvp', { answer, attempts, invite }),
  quiz: (score, total) => call('/api/quiz', { score, total }),
  poem: (style) => call('/api/poem', { style }),
};

// localStorage có thể bị chặn (chế độ ẩn danh...) nên luôn bọc try/catch
export const local = {
  get(k, fallback) {
    try { const v = localStorage.getItem(`d2010:${k}`); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
  },
  set(k, v) {
    try { localStorage.setItem(`d2010:${k}`, JSON.stringify(v)); } catch { /* ignore */ }
  },
};
