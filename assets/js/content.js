// APOLLO: every word, price and fact on the site lives here, in English (en) and Arabic (ar).
// Anything marked PLACEHOLDER is waiting for real info from Apollo. Never replace it with a guess.

const BUSINESS = {
  name: 'Apollo',
  timezone: 'Asia/Amman',
  phone: '',          // PLACEHOLDER: digits with country code, e.g. '+9627XXXXXXXX'
  whatsapp: '',       // PLACEHOLDER: digits only, e.g. '9627XXXXXXXX'
  instagram: '',      // PLACEHOLDER: full https://instagram.com/... link
  maps: 'https://www.google.com/maps/search/?api=1&query=Amman+Jordan', // PLACEHOLDER: Apollo's Google Maps link
  mapEmbed: 'https://www.google.com/maps?q=Amman,+Jordan&output=embed'  // PLACEHOLDER: Apollo's exact location
};

const TEXT = {
  en: {
    lang_btn: 'عربي',
    nav_programs: 'Programs', nav_coaches: 'Coaches', nav_membership: 'Membership', nav_schedule: 'Schedule', nav_visit: 'Visit',
    wa_short: 'WhatsApp',
    hero_eyebrow: 'Gym · Amman, Jordan',
    hero_l1: 'Rise', hero_l2: 'with', hero_l3: 'Apollo',
    hero_sub: 'Train hard, get stronger and feel it every day. Coaches who know your name, and a floor built for real work.',
    cta_wa: 'Message us on WhatsApp', cta_map: 'Get directions',
    scroll: 'Scroll',
    marquee: ['Strength', 'Conditioning', 'Classes', 'Coaching', 'Community'],
    programs_kicker: '01 · Programs', programs_title: 'Find your way to train',
    space_kicker: '02 · The space', space_title: 'Built for the work',
    space_text: 'Room to lift, room to move, and the kit you need to do both. Come see it for yourself.',
    coaches_kicker: '03 · Coaches', coaches_title: 'People in your corner',
    coaches_text: 'Our coaches help you start right, train safe and keep showing up.',
    membership_kicker: '04 · Membership', membership_title: 'Pick your plan',
    membership_text: 'Message us for current prices and offers. No pressure, just answers.',
    plan_cta: 'Ask on WhatsApp', jd: 'JD', per_month: '/ month', popular: 'Most popular',
    schedule_kicker: '05 · Schedule', schedule_title: 'Class times',
    visit_kicker: '06 · Visit', visit_title: 'Come train with us',
    hours_title: 'Opening hours', contact_title: 'Get in touch', address_title: 'Where to find us',
    address: 'Amman, Jordan',
    call: 'Call us', instagram: 'Instagram',
    final_title: 'Your first session starts with one message.', final_cta: 'Message Apollo',
    footer: 'Apollo · Amman, Jordan',
    open_now: 'Open now', closed_now: 'Closed now',
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    wa_msg: 'Hi Apollo! I found you on your website and would like to know more about membership.'
  },
  ar: {
    lang_btn: 'EN',
    nav_programs: 'البرامج', nav_coaches: 'المدربون', nav_membership: 'الاشتراكات', nav_schedule: 'الجدول', nav_visit: 'زورونا',
    wa_short: 'واتساب',
    hero_eyebrow: 'نادي رياضي · عمّان، الأردن',
    hero_l1: 'ارتقِ', hero_l2: 'مع', hero_l3: 'أبولو',
    hero_sub: 'تمرّن بجد، كن أقوى، واشعر بالفرق كل يوم. مدربون يعرفونك بالاسم، وصالة مجهزة للعمل الحقيقي.',
    cta_wa: 'راسلنا على واتساب', cta_map: 'الاتجاهات',
    scroll: 'انزل',
    marquee: ['قوة', 'لياقة', 'حصص جماعية', 'تدريب', 'مجتمع'],
    programs_kicker: '٠١ · البرامج', programs_title: 'اختر طريقتك في التمرين',
    space_kicker: '٠٢ · المكان', space_title: 'مجهّز للعمل',
    space_text: 'مساحة لرفع الأوزان، ومساحة للحركة، وكل المعدات التي تحتاجها. تعال وشاهد بنفسك.',
    coaches_kicker: '٠٣ · المدربون', coaches_title: 'فريق يقف معك',
    coaches_text: 'مدربونا يساعدونك تبدأ صح، تتمرن بأمان، وتستمر.',
    membership_kicker: '٠٤ · الاشتراكات', membership_title: 'اختر اشتراكك',
    membership_text: 'راسلنا لمعرفة الأسعار والعروض الحالية. بدون ضغط، فقط إجابات.',
    plan_cta: 'اسأل على واتساب', jd: 'د.أ', per_month: '/ شهر', popular: 'الأكثر طلباً',
    schedule_kicker: '٠٥ · الجدول', schedule_title: 'مواعيد الحصص',
    visit_kicker: '٠٦ · زورونا', visit_title: 'تعال تمرّن معنا',
    hours_title: 'ساعات العمل', contact_title: 'تواصل معنا', address_title: 'موقعنا',
    address: 'عمّان، الأردن',
    call: 'اتصل بنا', instagram: 'إنستغرام',
    final_title: 'أول تمرين يبدأ برسالة واحدة.', final_cta: 'راسل أبولو',
    footer: 'أبولو · عمّان، الأردن',
    open_now: 'مفتوح الآن', closed_now: 'مغلق الآن',
    days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    wa_msg: 'مرحباً أبولو! شفت موقعكم وحاب أعرف أكثر عن الاشتراكات.'
  }
};

// PLACEHOLDER: the four programs. Confirm what Apollo actually offers.
const PROGRAMS = [
  { icon: 'bar',   en: ['Strength', 'Free weights, racks and machines for building real strength at your own pace.'],
                   ar: ['القوة', 'أوزان حرة وأجهزة لبناء قوة حقيقية على راحتك.'] },
  { icon: 'pulse', en: ['Cardio & conditioning', 'Get your heart rate up and your stamina higher.'],
                   ar: ['الكارديو واللياقة', 'ارفع نبضك وزِد قدرتك على التحمل.'] },
  { icon: 'group', en: ['Group classes', 'Train with a crew. Energy, music and a coach leading the way.'],
                   ar: ['الحصص الجماعية', 'تمرّن مع مجموعة. طاقة وموسيقى ومدرب يقودك.'] },
  { icon: 'coach', en: ['Personal training', 'One-to-one coaching built around your goal.'],
                   ar: ['التدريب الشخصي', 'تدريب فردي مبني على هدفك.'] }
];

// PLACEHOLDER photo tiles. Swap each `img` for a real Apollo photo in assets/img/.
const SPACE = [
  { en: 'Weights floor', ar: 'صالة الأوزان', img: '' },
  { en: 'Cardio zone', ar: 'منطقة الكارديو', img: '' },
  { en: 'Class studio', ar: 'استوديو الحصص', img: '' },
  { en: 'Functional zone', ar: 'منطقة التمارين الوظيفية', img: '' },
  { en: 'Locker rooms', ar: 'غرف التبديل', img: '' }
];

// PLACEHOLDER coaches. Real names, roles and photos only.
const COACHES = [
  { en: ['Coach name', 'Strength & conditioning'], ar: ['اسم المدرب', 'القوة واللياقة'], img: '' },
  { en: ['Coach name', 'Group classes'], ar: ['اسم المدرب', 'الحصص الجماعية'], img: '' },
  { en: ['Coach name', 'Personal training'], ar: ['اسم المدرب', 'التدريب الشخصي'], img: '' }
];

// PLACEHOLDER plans. price: '' shows "--" until Apollo confirms real prices.
const PLANS = [
  { en: ['1 Month', ['Full gym access', 'Group classes']], ar: ['شهر', ['دخول كامل للنادي', 'الحصص الجماعية']], price: '' },
  { en: ['3 Months', ['Full gym access', 'Group classes', 'Better monthly rate']], ar: ['٣ أشهر', ['دخول كامل للنادي', 'الحصص الجماعية', 'سعر شهري أفضل']], price: '', popular: true },
  { en: ['12 Months', ['Full gym access', 'Group classes', 'Best monthly rate']], ar: ['١٢ شهر', ['دخول كامل للنادي', 'الحصص الجماعية', 'أفضل سعر شهري']], price: '' }
];

// PLACEHOLDER opening hours, Sunday first: [open, close] in 24h, or null when closed. Close past midnight = '25:00'.
const HOURS = [
  ['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00'], ['06:00', '23:00'],
  ['10:00', '20:00'], ['08:00', '22:00']
];

// PLACEHOLDER class schedule, by day index (0 = Sunday). Each row: [time, en name, ar name, coach].
const SCHEDULE = {
  0: [['07:00', 'Morning conditioning', 'لياقة صباحية'], ['18:00', 'Strength class', 'حصة قوة'], ['19:30', 'HIIT', 'تمارين متقطعة عالية الشدة']],
  1: [['07:00', 'Mobility', 'مرونة وحركة'], ['18:30', 'Circuit', 'تمارين دائرية']],
  2: [['07:00', 'Morning conditioning', 'لياقة صباحية'], ['18:00', 'Strength class', 'حصة قوة'], ['19:30', 'HIIT', 'تمارين متقطعة عالية الشدة']],
  3: [['07:00', 'Mobility', 'مرونة وحركة'], ['18:30', 'Circuit', 'تمارين دائرية']],
  4: [['07:00', 'Morning conditioning', 'لياقة صباحية'], ['18:00', 'Strength class', 'حصة قوة']],
  5: [],
  6: [['10:00', 'Weekend burn', 'حرق نهاية الأسبوع']]
};
