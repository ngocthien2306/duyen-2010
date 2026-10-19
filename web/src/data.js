// Toàn bộ nội dung của trang nằm ở đây — sửa file này là đủ để đổi chữ, ảnh, câu hỏi...
const P = (p) => `${import.meta.env.BASE_URL}${p}`;

export const couple = {
  me: 'Thiện',
  her: 'Minh Duyên',
  herShort: 'Duyên',
  // Mốc tính bộ đếm "bên nhau"
  startDate: '2025-07-12T00:00:00+08:00',
  // Mật mã mở quà: ngày mình chính thức yêu nhau (ddmm)
  passcode: '1207',
  passcodeHint: 'Ngày mình chính thức thành một đôi (ddmm) 💞',
};

export const photos = {
  hero: P('photos/memory/15.jpg'),
  heroAlt: P('photos/memory/11.jpg'),
  her: P('photos/profile/mylove.jpg'),
  her2: P('photos/profile/mylove2.jpg'),
  her3: P('photos/profile/mylove3.jpg'),
  me: P('photos/profile/me.jpg'),
  nightView: P('photos/bg/4.jpg'),
  finale: P('photos/memory/9.jpg'),
};

// Nhạc phát qua YouTube nhúng (video chính thức), id là phần sau "watch?v="
export const playlist = [
  { id: 'Ga-RSTJbFjo', title: 'Until You', artist: 'Shayne Ward' },
  { id: 'o_lN37OAJ9U', title: 'Cưới Nhau Đi (Yes I Do)', artist: 'Bùi Anh Tuấn & Hiền Hồ' },
  { id: '2Vv-BfVoq4g', title: 'Perfect', artist: 'Ed Sheeran' },
  { id: '06-XXOTP3Gc', title: 'Beautiful In White', artist: 'Shane Filan' },
  { id: '450p7goxZqg', title: 'All of Me', artist: 'John Legend' },
  { id: 'rtOvBOTyX00', title: 'A Thousand Years', artist: 'Christina Perri' },
  { id: 'ulOb9gIGGd0', title: 'My Love', artist: 'Westlife' },
  { id: 'hNCKSS2E_yU', title: 'I Do', artist: 'Westlife' },
  { id: '1kofixtz2Us', title: 'I Do (Cherish You)', artist: '98º' },
  { id: 'acvIVA9-FMQ', title: 'Lucky', artist: 'Jason Mraz ft. Colbie Caillat' },
  { id: 'SPUJIbXN0WY', title: 'Everything', artist: 'Michael Bublé' },
  { id: 'dElRVQFqj-k', title: 'Marry You', artist: 'Bruno Mars' },
  { id: '3HbKnQxd0_E', title: 'Breathless', artist: 'Shayne Ward' },
];

export const story = [
  {
    date: '23/04/2025',
    title: 'Lần đầu tim rung rinh',
    place: 'Louisa · NCU',
    photo: P('photos/memory/3.jpg'),
    text: 'Thật ra đó không phải lần đầu mình gặp nhau, nhưng là khoảnh khắc trái tim anh thật sự rung rinh. Anh trộm nhìn em mỗi khi có cơ hội — xinh đẹp mà còn toát lên vẻ đẹp tri thức. Tối đó anh về, đứng ngồi không yên, và quyết định nhắn tin làm quen.',
  },
  {
    date: '22/06/2025',
    title: 'Buổi hẹn đầu tiên',
    place: 'Chuyến bus xuống Zhongli',
    photo: P('photos/memory/12.jpg'),
    text: 'Anh thức cả đêm để làm chiếc thiệp mời, mong trời sáng thật nhanh. Lần đầu được ngồi cạnh em trên chuyến bus, tim anh loạn nhịp (đứng gần thôi đã lộn tên rồi =)) ). Nhưng anh chưa đánh rơi nhịp nào cả — mọi giây phút hôm đó đều đặc biệt.',
  },
  {
    date: '12/07/2025',
    title: 'Chính thức là của nhau',
    place: 'Ngày khai màn tình yêu',
    photo: P('photos/memory/5.jpg'),
    text: 'Ngày anh chờ lâu lắm rồi — anh là người đàn ông "tham danh phận" mà =)) Những ngày đi chơi đó đến giờ vẫn còn đọng lại trong anh rất nhiều, và anh đã rất, rất hạnh phúc.',
  },
  {
    date: '05/10/2025',
    title: 'Trung thu đầu tiên bên nhau',
    place: 'Đài Loan',
    photo: P('photos/memory/trung_thu_18.jpg'),
    text: 'Những buổi nấu ăn cùng nhau, những lần đèo nhau băng qua phố phường. Những điều đơn giản thôi mà khiến mình hạnh phúc, em nhỉ.',
  },
  {
    date: 'Mãi về sau',
    title: 'Cùng nhau lớn lên',
    place: 'Bất cứ nơi đâu có em',
    photo: P('photos/memory/13.jpg'),
    text: 'Tình yêu nào cũng có lúc buồn, anh vẫn đang cố gắng từng ngày để hoàn thiện hơn. Cảm ơn em đã đến bên anh — người con gái anh thương nhất trên đời.',
  },
];

export const gallery = [
  { src: P('photos/memory/11.jpg'), caption: 'Hội chợ & hai trái tim', tilt: -4 },
  { src: P('photos/memory/4.jpg'), caption: 'Công chúa áo hồng', tilt: 3 },
  { src: P('photos/memory/6.jpg'), caption: 'Má ai mà phúng phính', tilt: -2 },
  { src: P('photos/memory/8.jpg'), caption: 'Wat Arun và nàng thơ', tilt: 4 },
  { src: P('photos/memory/xiaolongbao.jpg'), caption: '小籠包 cùng em', tilt: -3 },
  { src: P('photos/memory/9.jpg'), caption: 'Trái tim của tụi mình', tilt: 2 },
  { src: P('photos/profile/mylove2.jpg'), caption: 'Taipei 101 mùa đông', tilt: -4 },
  { src: P('photos/memory/2.jpg'), caption: 'Hai đứa mình', tilt: 3 },
  { src: P('photos/memory/7.jpg'), caption: 'Cổng vòm & váy trắng', tilt: -2 },
  { src: P('photos/memory/trung_thu_19.jpg'), caption: 'Ngắm thành phố về đêm', tilt: 4 },
  { src: P('photos/profile/mylove.jpg'), caption: 'Nàng thơ bên sông', tilt: -3 },
  { src: P('photos/memory/xiaolongbao2.jpg'), caption: 'Selfie no căng bụng', tilt: 2 },
];


export const film = [
  { kicker: 'Thiện presents', title: 'Minh Duyên', text: 'một bộ phim nhỏ về người con gái anh thương' },
  { photo: P('photos/memory/3.jpg'), kicker: '23 · 04 · 2025 — Louisa', title: 'Lần đầu tim anh lỡ nhịp', text: 'anh trộm nhìn em, rồi về nhà đứng ngồi không yên' },
  { photo: P('photos/memory/12.jpg'), kicker: '22 · 06 · 2025 — Zhongli', title: 'Buổi hẹn đầu tiên', text: 'ngồi cạnh em trên chuyến bus, tim đập loạn xạ' },
  { photo: P('photos/memory/5.jpg'), kicker: '12 · 07 · 2025', title: 'Em thành người yêu anh', text: 'ngày anh chờ lâu lắm rồi' },
  { photo: P('photos/memory/11.jpg'), kicker: 'Những ngày rong chơi', title: 'Đi đâu cũng được, miễn là có em', text: '' },
  { photo: P('photos/memory/4.jpg'), kicker: 'Nàng thơ áo hồng', title: 'Công chúa của anh', text: 'xinh như một đóa hồng' },
  { photo: P('photos/profile/mylove2.jpg'), kicker: 'Taipei 101', title: 'Mùa đông có em là ấm', text: '' },
  { photo: P('photos/memory/trung_thu_19.jpg'), kicker: 'Thành phố về đêm', title: 'Cùng nhìn về một hướng', text: 'xứ người cũng thành nhà, vì có nhau' },
  { photo: P('photos/memory/9.jpg'), kicker: 'Mãi về sau', title: 'Tay trong tay', text: 'anh sẽ luôn nắm thật chặt' },
  { kicker: '20 · 10 · 2026', title: 'Chúc mừng 20/10, Minh Duyên', text: 'người phụ nữ anh thương nhất trên đời 💗' },
];

export const letter = {
  greeting: 'Gửi công chúa Minh Duyên của anh,',
  paragraphs: [
    'Hôm nay là 20/10 — ngày của những người phụ nữ Việt Nam. Và với anh, người phụ nữ đặc biệt nhất chính là em: cô gái giỏi giang, giành học bổng toàn phần, nói ba thứ tiếng, vậy mà vẫn đáng yêu tới mức anh nhìn hoài không chán.',
    'Anh vẫn nhớ cái ngày ở Louisa, anh trộm nhìn em rồi về nhà đứng ngồi không yên. Anh vẫn nhớ chuyến bus xuống Zhongli tim đập loạn xạ. Và anh nhớ từng bữa cơm hai đứa nấu cùng nhau — có món ngon, có món "không biết ngon không nhưng quất gần hết" =))',
    'Cảm ơn em vì đã kiên nhẫn với anh, vì những lúc anh vụng về, vì những ngày xa nhau mà vẫn nhớ nhau không chịu nổi. Anh biết anh chưa hoàn hảo, nhưng anh hứa sẽ cố gắng mỗi ngày để xứng đáng với nụ cười của em.',
    'Chúc em 20/10 thật xinh, thật vui, luôn được yêu thương và luôn là chính mình. Phần còn lại cứ để anh lo nha, vại tương lơ của anh.',
  ],
  signature: 'Thương em nhiều nhất trên đời,',
  name: 'Thiện',
};

export const reasons = [
  { emoji: '😊', text: 'Vì nụ cười của em làm mọi ngày mệt mỏi của anh tan biến.' },
  { emoji: '🎓', text: 'Vì em giỏi ghê — học bổng toàn phần, TOEIC 940, HSK 4. Anh tự hào lắm.' },
  { emoji: '🥟', text: 'Vì em ăn xiaolongbao dễ thương nhất thế giới.' },
  { emoji: '🍳', text: 'Vì nấu ăn cùng em, món dở cũng thành ngon.' },
  { emoji: '🌙', text: 'Vì vừa gặp xong anh đã nhớ em rồi.' },
  { emoji: '💪', text: 'Vì em mạnh mẽ, tự lập dù đang ở xa nhà.' },
  { emoji: '🫶', text: 'Vì em luôn kiên nhẫn với những lúc anh vụng về.' },
  { emoji: '🏍️', text: 'Vì những lần đèo em băng qua phố là lúc anh vui nhất.' },
  { emoji: '🌸', text: 'Vì em xinh — xinh từ trong ra ngoài.' },
  { emoji: '🏠', text: 'Vì ở cạnh em, xứ người cũng thành nhà.' },
  { emoji: '🤭', text: 'Vì cái kiểu em ăn nước tương với mẹc rất là... độc lạ =))' },
  { emoji: '✨', text: 'Vì em làm anh muốn trở thành phiên bản tốt hơn của mình.' },
  { emoji: '🌊', text: 'Vì mình cùng quê Phan Thiết mà phải qua tận Đài Loan mới gặp — duyên mà!' },
  { emoji: '💌', text: 'Vì em là Duyên — và em là duyên của anh.' },
];

export const coupons = [
  { id: 'massage', icon: '💆‍♀️', title: '1 buổi massage vai gáy', note: '30 phút, không kỳ kèo' },
  { id: 'dishes', icon: '🍽️', title: 'Anh rửa chén cả tuần', note: 'Kể cả nồi chảo' },
  { id: 'cook', icon: '👨‍🍳', title: 'Đầu bếp riêng 1 ngày', note: 'Em order món gì anh nấu món đó' },
  { id: 'forgive', icon: '🕊️', title: 'Thẻ miễn giận 1 lần', note: 'Anh xin lỗi trước, hỏi sau' },
  { id: 'trip', icon: '✈️', title: 'Một chuyến đi do em chọn', note: 'Anh lo lịch trình & xách đồ' },
  { id: 'boba', icon: '🧋', title: 'Trà sữa không giới hạn 1 ngày', note: 'Full topping' },
  { id: 'photo', icon: '📸', title: 'Thợ chụp ảnh riêng', note: 'Chụp tới khi em ưng thì thôi' },
  { id: 'yes', icon: '👑', title: 'Ngày "Em nói gì cũng đúng"', note: 'Hiệu lực 24 giờ' },
];

export const quiz = [
  { q: 'Mình chính thức yêu nhau ngày nào?', options: ['22/06/2025', '12/07/2025', '23/04/2025', '20/10/2025'], answer: 1 },
  { q: 'Anh nhắn tin làm quen em qua đâu?', options: ['Facebook', 'Instagram', 'LinkedIn', 'Zalo'], answer: 2 },
  { q: 'Buổi hẹn đầu tiên mình đi bus xuống đâu?', options: ['Taipei', 'Zhongli', 'Taoyuan', 'Hsinchu'], answer: 1 },
  { q: 'Món mà em mê nhất là gì?', options: ['Bún bò', 'Xiaolongbao', 'Pizza', 'Lẩu cay'], answer: 1 },
  { q: 'Mì udon "3 phút" anh nấu mất bao lâu?', options: ['3 phút', '10 phút', '30 phút', '1 tiếng'], answer: 2 },
  { q: 'Hai đứa mình cùng quê ở đâu?', options: ['Nha Trang', 'Phan Thiết', 'Đà Lạt', 'Vũng Tàu'], answer: 1 },
  { q: 'Anh thương em bao nhiêu?', options: ['Nhiều', 'Rất nhiều', 'Vô cực', 'Tất cả các đáp án trên'], answer: 3 },
];

export const invite = {
  title: 'Tối 20/10, anh mời em nha',
  when: 'Thứ Ba · 20/10 · 19:00',
  where: 'Anh đón em tận nơi 🚗',
  what: 'Một bữa tối anh tự tay nấu, một bó hoa, và một bất ngờ nhỏ 🎁',
};

export const poemStyles = [
  { id: 'sweet', label: 'Ngọt ngào', emoji: '🍯' },
  { id: 'funny', label: 'Hài hước', emoji: '🤭' },
  { id: 'lucbat', label: 'Lục bát', emoji: '🎋' },
  { id: 'deep', label: 'Sâu lắng', emoji: '🌙' },
];
