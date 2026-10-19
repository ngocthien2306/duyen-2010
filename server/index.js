import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { Firestore, FieldValue } from '@google-cloud/firestore';
import { GoogleGenAI } from '@google/genai';

const {
  PORT = 8080,
  LOVE_KEY = '1207',
  ALLOWED_ORIGINS = 'http://localhost:5173',
  FIRESTORE_DB = 'love-2010',
  GOOGLE_CLOUD_PROJECT,
  GEMINI_LOCATION = 'global',
  GEMINI_MODEL = 'gemini-3.5-flash',
  NOTIFY_TO,
  SMTP_HOST, SMTP_PORT = '587', SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM_EMAIL, SMTP_FROM_NAME = 'Duyên 20/10',
} = process.env;

const db = new Firestore({ databaseId: FIRESTORE_DB });
const doc = db.collection('love').doc('state');
const wishes = db.collection('wishes');
const events = db.collection('events');
const ai = new GoogleGenAI({ vertexai: true, project: GOOGLE_CLOUD_PROJECT, location: GEMINI_LOCATION });
const mailer = SMTP_HOST && SMTP_USERNAME
  ? nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT), secure: SMTP_PORT === '465', auth: { user: SMTP_USERNAME, pass: SMTP_PASSWORD } })
  : null;

const app = express();
app.use(express.json({ limit: '20kb' }));
const origins = ALLOWED_ORIGINS.split(',').map((s) => s.trim());
app.use(cors({ origin: (o, cb) => cb(null, !o || origins.includes(o)) }));

app.get('/', (_req, res) => res.json({ ok: true, name: 'duyen-2010-api' }));

// Mọi API đều cần mật mã mở quà
app.use('/api', (req, res, next) => (req.get('x-love-key') === LOVE_KEY ? next() : res.status(401).json({ error: 'Sai mật mã' })));

// Giới hạn đơn giản theo IP để tránh spam (đặc biệt là API gọi Gemini)
const hits = new Map();
const limit = (max, windowMs) => (req, res, next) => {
  const k = `${req.path}:${req.ip}`;
  const now = Date.now();
  const arr = (hits.get(k) || []).filter((t) => now - t < windowMs);
  if (arr.length >= max) return res.status(429).json({ error: 'Từ từ thôi em ơi 😆' });
  arr.push(now); hits.set(k, arr); next();
};

async function notify(subject, html) {
  await events.add({ subject, at: Date.now() }).catch((e) => console.error('event', e.message));
  if (!mailer || !NOTIFY_TO) return;
  try {
    await mailer.sendMail({
      from: `${SMTP_FROM_NAME} <${SMTP_FROM_EMAIL || SMTP_USERNAME}>`,
      to: NOTIFY_TO,
      subject,
      html: `<div style="font-family:sans-serif;max-width:520px;margin:auto;padding:24px;border-radius:16px;background:#fff8f3;color:#4a0f22">
        <h2 style="color:#b42647;margin-top:0">${subject}</h2>${html}
        <p style="color:#999;font-size:12px;margin-top:24px">Gửi từ trang 20/10 của Duyên · ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Taipei' })}</p></div>`,
    });
  } catch (e) { console.error('mail', e.message); }
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

app.get('/api/state', async (_req, res) => {
  const [snap, ws] = await Promise.all([doc.get(), wishes.orderBy('at', 'desc').limit(50).get()]);
  const d = snap.data() || {};
  res.json({ flowers: d.flowers || 0, redeemed: d.redeemed || [], rsvp: d.rsvp || null, wishes: ws.docs.map((w) => w.data()).reverse() });
});

app.post('/api/open', limit(5, 60_000), async (_req, res) => {
  const snap = await doc.get();
  const first = !snap.exists || !snap.data().openedAt;
  await doc.set({ openedAt: first ? Date.now() : snap.data().openedAt, opens: FieldValue.increment(1) }, { merge: true });
  if (first) notify('💌 Duyên vừa mở quà 20/10!', '<p>Em ấy đã nhập đúng mật mã và đang xem trang web. Chuẩn bị tinh thần nha 😆</p>');
  res.json({ ok: true });
});

app.post('/api/flowers', limit(120, 60_000), async (_req, res) => {
  await doc.set({ flowers: FieldValue.increment(1) }, { merge: true });
  res.json({ ok: true });
});

app.post('/api/wishes', limit(10, 60_000), async (req, res) => {
  const text = String(req.body?.text || '').trim().slice(0, 300);
  if (!text) return res.status(400).json({ error: 'Trống' });
  const wish = { text, at: Date.now() };
  await wishes.add(wish);
  notify('⭐ Duyên vừa thả một điều ước', `<p style="font-size:18px">“${esc(text)}”</p><p>Thực hiện liền đi anh ơi!</p>`);
  res.json({ ok: true, wish });
});

app.post('/api/coupons/:id/redeem', limit(10, 60_000), async (req, res) => {
  const id = String(req.params.id).slice(0, 40);
  const title = String(req.body?.title || id).slice(0, 100);
  await doc.set({ redeemed: FieldValue.arrayUnion(id) }, { merge: true });
  notify(`🎁 Duyên dùng phiếu: ${title}`, `<p>Em ấy vừa dùng phiếu <b>${esc(title)}</b>. Thực hiện vô điều kiện nha!</p>`);
  res.json({ ok: true });
});

app.post('/api/rsvp', limit(5, 60_000), async (req, res) => {
  const answer = req.body?.answer === 'yes' ? 'yes' : 'no';
  const attempts = Number(req.body?.attempts) || 0;
  await doc.set({ rsvp: answer, rsvpAt: Date.now() }, { merge: true });
  notify(answer === 'yes' ? '🥂 Duyên đã ĐỒNG Ý lời mời tối 20/10!' : 'Duyên trả lời lời mời',
    `<p>Câu trả lời: <b>${answer}</b>${attempts ? ` (sau ${attempts} lần cố bấm nút "Để em suy nghĩ" 😂)` : ''}</p>`);
  res.json({ ok: true });
});

app.post('/api/quiz', limit(10, 60_000), async (req, res) => {
  const score = Number(req.body?.score) || 0;
  const total = Number(req.body?.total) || 0;
  await doc.set({ quiz: { score, total, at: Date.now() } }, { merge: true });
  notify(`🎮 Duyên làm quiz được ${score}/${total}`, `<p>${score === total ? 'Điểm tuyệt đối! Nhớ thưởng em nha.' : 'Có vài câu sai, nhớ “phạt” cho đúng luật 😚'}</p>`);
  res.json({ ok: true });
});

const STYLES = {
  sweet: 'ngọt ngào, lãng mạn, 8-12 câu thơ tự do có vần',
  funny: 'hài hước, dí dỏm, đáng yêu, có chút tự trào của người yêu, 8-12 câu',
  lucbat: 'thể thơ lục bát truyền thống chuẩn vần, 8-10 câu',
  deep: 'sâu lắng, cảm động, chân thành, 8-12 câu',
};
const CONTEXT = `Người viết: Thiện (anh), nghiên cứu sinh AI tại NCU Đài Loan. Người nhận: Minh Duyên (em), học MBA học bổng toàn phần tại NCU, giỏi giang, TOEIC 940, HSK 4, mê xiaolongbao.
Cả hai cùng quê Phan Thiết nhưng gặp nhau ở Đài Loan. Gặp ở quán Louisa NCU 23/4/2025, hẹn hò đầu tiên đi bus xuống Zhongli 22/6/2025, chính thức yêu nhau 12/7/2025.
Hay nấu ăn cùng nhau (udon "3 phút nấu 30 phút", cuốn chả, tôm cà chua), đèo nhau đi chơi phố. Anh gọi em là "vại tương lơ", "công chúa". Hôm nay là 20/10 - Ngày Phụ nữ Việt Nam.`;

app.post('/api/poem', limit(6, 60_000), async (req, res) => {
  const style = STYLES[req.body?.style] ? req.body.style : 'sweet';
  try {
    const r = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: `${CONTEXT}\n\nHãy viết MỘT bài thơ tiếng Việt, xưng "anh" gọi "em", phong cách: ${STYLES[style]}. Lồng ghép tự nhiên 1-2 chi tiết kỷ niệm ở trên (mỗi lần chọn chi tiết khác nhau), nhắc tới 20/10. Chỉ trả về nội dung bài thơ, không tiêu đề, không giải thích, không markdown.`,
      config: { temperature: 1.1, maxOutputTokens: 4096 },
    });
    const poem = (r.text || '').replace(/\*\*/g, '').trim();
    if (!poem) throw new Error('empty');
    res.json({ poem });
  } catch (e) {
    console.error('poem', e.message);
    res.status(502).json({ error: 'AI đang bận' });
  }
});

app.use((err, _req, res, _next) => { console.error(err); res.status(500).json({ error: 'Lỗi server' }); });

app.listen(PORT, () => console.log(`duyen-2010-api on :${PORT}`));
