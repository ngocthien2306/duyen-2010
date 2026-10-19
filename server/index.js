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
  HER_EMAIL,
  SITE_URL = 'https://ngocthien2306.github.io/duyen-2010/',
  SMTP_HOST, SMTP_PORT = '587', SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM_EMAIL, SMTP_FROM_NAME = 'Ngọc Thiện',
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

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Thư viết như thư cá nhân (có bản text thuần, tiêu đề ít emoji, Reply-To là mail thật của anh)
// để Gmail xếp vào hộp thư chính thay vì Spam/Quảng cáo.
async function send(to, subject, paragraphs, sign = 'Thiện') {
  if (!mailer || !to) return;
  const text = `${paragraphs.join('\n\n')}\n\n${sign}`;
  const html = `<!doctype html><html lang="vi"><body style="margin:0;padding:24px 12px;background:#fff7fa">
<div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:14px;padding:28px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#3a0a1e;border:1px solid #ffe3ee">
${paragraphs.map((p) => `<p style="margin:0 0 14px">${esc(p).replace(/\n/g, '<br>')}</p>`).join('\n')}
<p style="margin:22px 0 0;color:#b4185d">${esc(sign)}</p>
</div></body></html>`;
  try {
    await mailer.sendMail({
      from: { name: SMTP_FROM_NAME, address: SMTP_FROM_EMAIL || SMTP_USERNAME },
      replyTo: NOTIFY_TO || undefined,
      to,
      subject,
      text,
      html,
    });
  } catch (e) { console.error('mail', e.message); }
}

// Báo cho anh
async function notify(subject, paragraphs) {
  await events.add({ subject, at: Date.now() }).catch((e) => console.error('event', e.message));
  await send(NOTIFY_TO, subject, [...paragraphs, `Lúc ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Taipei' })} (giờ Đài Loan).`], 'Trang 20/10 của Duyên');
}

// Gửi cho em
const toHer = (subject, paragraphs) => send(HER_EMAIL, subject, paragraphs);

app.get('/api/state', async (_req, res) => {
  const [snap, ws] = await Promise.all([doc.get(), wishes.orderBy('at', 'desc').limit(50).get()]);
  const d = snap.data() || {};
  res.json({ flowers: d.flowers || 0, redeemed: d.redeemed || [], rsvp: d.rsvp || null, wishes: ws.docs.map((w) => w.data()).reverse() });
});

app.post('/api/open', limit(5, 60_000), async (_req, res) => {
  const snap = await doc.get();
  const first = !snap.exists || !snap.data().openedAt;
  await doc.set({ openedAt: first ? Date.now() : snap.data().openedAt, opens: FieldValue.increment(1) }, { merge: true });
  if (first) notify('Duyên vừa mở quà 20/10', ['Em ấy đã nhập đúng mật mã và đang xem trang web. Chuẩn bị tinh thần nha.']);
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
  notify('Duyên vừa thả một điều ước', [`“${text}”`, 'Thực hiện liền đi anh ơi!']);
  toHer('Anh đã nhận được điều ước của em', ['Em ơi,', `Anh vừa nhận được điều ước em thả vào lọ: “${text}”`, 'Anh ghi lại rồi, để anh thực hiện cho em nha. Em muốn ước thêm gì cứ vào trang ước tiếp:', SITE_URL]);
  res.json({ ok: true, wish });
});

app.post('/api/coupons/:id/redeem', limit(10, 60_000), async (req, res) => {
  const id = String(req.params.id).slice(0, 40);
  const title = String(req.body?.title || id).slice(0, 100);
  await doc.set({ redeemed: FieldValue.arrayUnion(id) }, { merge: true });
  notify(`Duyên dùng phiếu: ${title}`, [`Em ấy vừa dùng phiếu “${title}”.`, 'Thực hiện vô điều kiện nha!']);
  toHer(`Phiếu “${title}” đã được ghi nhận`, ['Em ơi,', `Anh nhận được phiếu “${title}” của em rồi nhé. Phiếu này có hiệu lực ngay, anh sẽ thực hiện sớm nhất có thể.`, 'Cảm ơn em đã dùng phiếu, cứ dùng hết luôn cũng được.']);
  res.json({ ok: true });
});

app.post('/api/rsvp', limit(5, 60_000), async (req, res) => {
  const answer = req.body?.answer === 'yes' ? 'yes' : 'no';
  const attempts = Number(req.body?.attempts) || 0;
  await doc.set({ rsvp: answer, rsvpAt: Date.now() }, { merge: true });
  const inv = req.body?.invite || {};
  const field = (k) => String(inv[k] || '').slice(0, 200);
  notify(answer === 'yes' ? 'Duyên đã đồng ý lời mời tối 20/10' : 'Duyên trả lời lời mời',
    [`Câu trả lời: ${answer}${attempts ? ` (sau ${attempts} lần cố bấm nút "Để em suy nghĩ")` : ''}.`]);
  if (answer === 'yes') {
    toHer('Hẹn em tối 20/10 nhé', ['Em ơi,', 'Cảm ơn em đã nhận lời mời của anh. Anh ghi lại lịch hẹn ở đây cho em nha:',
      [field('when') && `Thời gian: ${field('when')}`, field('where') && `Địa điểm: ${field('where')}`, field('what') && `Có gì: ${field('what')}`].filter(Boolean).join('\n'),
      'Chúc em một ngày 20/10 thật vui và thật xinh. Hẹn gặp em tối nay.']);
  }
  res.json({ ok: true });
});

app.post('/api/quiz', limit(10, 60_000), async (req, res) => {
  const score = Number(req.body?.score) || 0;
  const total = Number(req.body?.total) || 0;
  await doc.set({ quiz: { score, total, at: Date.now() } }, { merge: true });
  notify(`Duyên làm quiz được ${score}/${total}`, [score === total ? 'Điểm tuyệt đối! Nhớ thưởng em nha.' : 'Có vài câu sai, nhớ “phạt” cho đúng luật.']);
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
