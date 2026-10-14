// APOLLO: every word, number and fact on the site lives here, in English (en) and Arabic (ar).
// Sources: apollotrainingfacility.com, Instagram @apollogym.jo and the Google listing (screen recordings, 2026-10-14).
// Anything marked PLACEHOLDER is waiting for Apollo to confirm or send the real thing. Never replace it with a guess.

const BUSINESS = {
  name: 'Apollo Training Facility',
  timezone: 'Asia/Amman',
  whatsapp: '962799792078',            // "Book your tour" number from the Instagram posts (+962 79 979 2078)
  phone: '+96265861393',               // 06 586 1393 (Google listing + website)
  phoneDisplay: '06 586 1393',
  mobileDisplay: '+962 79 979 2078',
  email: 'info@apollotf.com',
  instagram: 'https://www.instagram.com/apollogym.jo/',
  google: 'https://www.google.com/maps/search/?api=1&query=Apollo+Training+Facility+Mecca+Street+Amman',
  mapEmbed: 'https://www.google.com/maps?q=Apollo+Training+Facility,+Mecca+Street,+Al+Sayegh+Commercial+Complex,+Amman&output=embed',
  // Opening hours, Sunday first: [open, close] in 24h. From the website's gym page.
  hours: [['06:00', '23:30'], ['06:00', '23:30'], ['06:00', '23:30'], ['06:00', '23:30'], ['06:00', '23:30'], ['11:00', '19:00'], ['06:00', '23:30']]
};

const TEXT = {
  en: {
    lang_btn: 'عربي',
    menu: 'Menu', close: 'Close',
    nav_space: 'The space', nav_programs: 'Train', nav_story: 'Story', nav_members: 'Members', nav_plans: 'Membership', nav_visit: 'Visit',
    nav_cta: 'Book a tour',
    loader_tag: 'Welcome to the next level',
    hero_eyebrow: 'Apollo Training Facility · Mecca Street, Amman',
    hero_l1: 'Rule your', hero_l2: 'destiny.', hero_l3: 'Defy the', hero_l4: 'limits.',
    hero_sub: 'Amman’s community gym. 840 square metres of iron, turf and good people, open from 6 AM.',
    cta_tour: 'Book your tour', cta_space: 'See the space',
    open_now: 'Open now', closed_now: 'Closed now', closes: 'closes', opens: 'opens',
    scroll: 'Scroll',
    marquee: ['Welcome to the next level', 'Rule your destiny', 'Defy the limits', 'We are the Desperados'],
    stats: [
      { n: 840, suffix: ' m²', label: 'of training floor' },
      { n: 4.9, suffix: '', label: 'Google rating, 374 reviews', dec: 1 },
      { n: 2023, suffix: '', label: 'doors opened, 1 October' },
      { n: 6, suffix: ' AM', label: 'first session of the day' }
    ],
    space_kicker: '01 · The space', space_title: 'A gym guide', space_text: 'Scroll through the floor. Every corner was built on purpose.',
    space_hint: 'Drag or scroll sideways',
    programs_kicker: '02 · Train', programs_title: 'Pick your weapon',
    programs_text: 'Strength, conditioning, combat and classes, all under one roof, with certified trainers in your corner.',
    amenities: ['Cafeteria', 'Lounge', 'Showers', 'Lockers', 'On-site parking', 'Trial classes'],
    ethos_kicker: '03 · The ethos', ethos_title: 'We are the Desperados',
    ethos_text: 'More than they show, the Desperados are the rebels of the game. Four traits make a true Apolloian.',
    values_title: 'Our values', values: ['Respect', 'Challenge', 'Assist', 'Change'],
    story_kicker: '04 · The story', story_title: 'Born in Amman',
    members_kicker: '05 · Members', members_title: 'The testament of true power',
    google_badge: '4.9 on Google · 374 reviews',
    plans_kicker: '06 · Membership', plans_title: 'Welcome to the next level',
    plans_text: 'October 2026 prices. The first 10 members to sign up with this offer get one extra month free.',
    jd: 'JD', per: 'for', popular: 'Best value', plan_cta: 'Ask on WhatsApp',
    referral_title: 'Apollo Referral League', referral_text: 'Bring your people. The member with the most referrals in 2026 wins a full year of membership for themselves and a loved one.',
    visit_kicker: '07 · Visit', visit_title: 'Come see it',
    hours_title: 'Opening hours', contact_title: 'Talk to us', address_title: 'Find us',
    address: 'Mecca Street, Al Sayegh Commercial Complex #181, Amman, Jordan',
    directions: 'Get directions', call: 'Call', whatsapp: 'WhatsApp', instagram: 'Instagram',
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today',
    final_word: 'Rise.', final_title: 'Your first session starts with one message.', final_cta: 'Book your tour',
    footer_name: 'Apollo Training Facility', footer_addr: 'Mecca Street, Amman',
    footer_credit: 'Site by LabsUncut',
    wa_msg: 'Hi Apollo! I saw the website and would like to book a tour.'
  },
  ar: {
    lang_btn: 'EN',
    menu: 'القائمة', close: 'إغلاق',
    nav_space: 'المكان', nav_programs: 'تمرّن', nav_story: 'القصة', nav_members: 'الأعضاء', nav_plans: 'الاشتراكات', nav_visit: 'زورونا',
    nav_cta: 'احجز جولة',
    loader_tag: 'أهلاً بك في المستوى التالي',
    hero_eyebrow: 'أبولو للتدريب · شارع مكة، عمّان',
    hero_l1: 'تحكّم', hero_l2: 'بمصيرك.', hero_l3: 'تحدَّ', hero_l4: 'الحدود.',
    hero_sub: 'نادي عمّان المجتمعي. ٨٤٠ متراً مربعاً من الحديد والعشب والناس الطيبين، من الساعة ٦ صباحاً.',
    cta_tour: 'احجز جولتك', cta_space: 'شاهد المكان',
    open_now: 'مفتوح الآن', closed_now: 'مغلق الآن', closes: 'يغلق', opens: 'يفتح',
    scroll: 'انزل',
    marquee: ['أهلاً بك في المستوى التالي', 'تحكّم بمصيرك', 'تحدَّ الحدود', 'نحن الديسبيرادوس'],
    stats: [
      { n: 840, suffix: ' م²', label: 'مساحة التدريب' },
      { n: 4.9, suffix: '', label: 'تقييم غوغل من ٣٧٤ مراجعة', dec: 1 },
      { n: 2023, suffix: '', label: 'الافتتاح، ١ أكتوبر' },
      { n: 6, suffix: ' ص', label: 'أول تمرين في اليوم' }
    ],
    space_kicker: '٠١ · المكان', space_title: 'جولة في النادي', space_text: 'تصفّح الصالة. كل زاوية بُنيت بقصد.',
    space_hint: 'اسحب أو مرّر جانبياً',
    programs_kicker: '٠٢ · تمرّن', programs_title: 'اختر سلاحك',
    programs_text: 'قوة ولياقة وقتال وحصص جماعية، كلها تحت سقف واحد، مع مدربين معتمدين إلى جانبك.',
    amenities: ['كافتيريا', 'صالة استراحة', 'حمامات', 'خزائن', 'موقف سيارات', 'حصص تجريبية'],
    ethos_kicker: '٠٣ · الروح', ethos_title: 'نحن الديسبيرادوس',
    ethos_text: 'الديسبيرادوس هم متمرّدو اللعبة. أربع صفات تصنع الأبولوي الحقيقي.',
    values_title: 'قيمنا', values: ['الاحترام', 'التحدي', 'المساندة', 'التغيير'],
    story_kicker: '٠٤ · القصة', story_title: 'وُلد في عمّان',
    members_kicker: '٠٥ · الأعضاء', members_title: 'شهادة القوة الحقيقية',
    google_badge: '٤٫٩ على غوغل · ٣٧٤ مراجعة',
    plans_kicker: '٠٦ · الاشتراكات', plans_title: 'أهلاً بك في المستوى التالي',
    plans_text: 'أسعار أكتوبر ٢٠٢٦. أول ١٠ أعضاء يشتركون بهذا العرض يحصلون على شهر إضافي مجاناً.',
    jd: 'د.أ', per: 'لمدة', popular: 'الأفضل قيمة', plan_cta: 'اسأل على واتساب',
    referral_title: 'دوري الإحالات', referral_text: 'جيب ناسك. العضو صاحب أكبر عدد إحالات في ٢٠٢٦ يربح اشتراك سنة كاملة له ولشخص عزيز عليه.',
    visit_kicker: '٠٧ · زورونا', visit_title: 'تعال شوفه بنفسك',
    hours_title: 'ساعات العمل', contact_title: 'تواصل معنا', address_title: 'موقعنا',
    address: 'شارع مكة، مجمع الصايغ التجاري #181، عمّان، الأردن',
    directions: 'الاتجاهات', call: 'اتصل', whatsapp: 'واتساب', instagram: 'إنستغرام',
    days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    today: 'اليوم',
    final_word: 'ارتقِ.', final_title: 'أول تمرين يبدأ برسالة واحدة.', final_cta: 'احجز جولتك',
    footer_name: 'أبولو للتدريب', footer_addr: 'شارع مكة، عمّان',
    footer_credit: 'الموقع من LabsUncut',
    wa_msg: 'مرحباً أبولو! شفت الموقع وحاب أحجز جولة.'
  }
};

// The gym guide. Photos are frames from Apollo's own Instagram "a gym guide" post (shot by @wassleh.cs).
// PLACEHOLDER quality: low-res video frames until Apollo sends the originals.
const SPACE = [
  { img: 'assets/img/space/reception.webp', en: 'Reception', ar: 'الاستقبال' },
  { img: 'assets/img/space/open-gym.webp', en: 'Open gym area', ar: 'منطقة التمرين المفتوحة' },
  { img: 'assets/img/space/free-weights.webp', en: 'Free weights', ar: 'الأوزان الحرة' },
  { img: 'assets/img/space/cardio.webp', en: 'Cardio area', ar: 'منطقة الكارديو' },
  { img: 'assets/img/space/calisthenics.webp', en: 'Calisthenics area', ar: 'منطقة الكاليستينكس' },
  { img: 'assets/img/space/boxing-zone.webp', en: 'Boxing zone', ar: 'منطقة الملاكمة' },
  { img: 'assets/img/space/chest-area.webp', en: 'Chest area', ar: 'منطقة الصدر' },
  { img: 'assets/img/space/classroom.webp', en: 'Classroom, lights on', ar: 'قاعة الحصص، الأضواء مضاءة' },
  { img: 'assets/img/space/classroom-lights-off.webp', en: 'Classroom, lights off', ar: 'قاعة الحصص، الأضواء مطفأة' },
  { img: 'assets/img/space/cafeteria.webp', en: 'Cafeteria', ar: 'الكافتيريا' },
  { img: 'assets/img/space/lounge.webp', en: 'Lounge', ar: 'صالة الاستراحة' },
  { img: 'assets/img/space/chill-area.webp', en: 'Chess & chill area', ar: 'زاوية الشطرنج والاسترخاء' },
  { img: 'assets/img/space/balcony-view.webp', en: 'Balcony view', ar: 'إطلالة الشرفة' }
];

// Training. Names come from Apollo's site and posts; the one-liners are ours.
const PROGRAMS = [
  { img: 'assets/img/space/free-weights.webp', en: ['Strength', 'Racks, free weights and biomechanical machines for real strength.'], ar: ['القوة', 'رفوف وأوزان حرة وأجهزة بيوميكانيكية لقوة حقيقية.'] },
  { img: 'assets/img/space/cardio.webp', en: ['HIIT & conditioning', 'Short, hard sessions that build a bigger engine.'], ar: ['HIIT واللياقة', 'جلسات قصيرة وقاسية تبني محركاً أكبر.'] },
  { img: 'assets/img/space/calisthenics.webp', en: ['Calisthenics', 'Rings, bars and turf. Own your bodyweight.'], ar: ['الكاليستينكس', 'حلقات وقضبان وعشب. تحكّم بوزن جسمك.'] },
  { img: 'assets/img/space/boxing-zone.webp', en: ['Boxing & combat', 'Gloves on. Classes and bag work in the boxing zone.'], ar: ['الملاكمة والقتال', 'البس القفازات. حصص وتمارين كيس في منطقة الملاكمة.'] },
  { img: 'assets/img/space/classroom.webp', en: ['Group classes', 'Train with a crew in the classroom. Trial classes available.'], ar: ['الحصص الجماعية', 'تمرّن مع مجموعة في القاعة. حصص تجريبية متاحة.'] },
  { img: 'assets/img/space/chest-area.webp', en: ['Personal training', 'One-to-one with a certified trainer, built around your goal.'], ar: ['التدريب الشخصي', 'فردي مع مدرب معتمد، مبني على هدفك.'] }
];

// The four Desperado traits, as written on Apollo's site.
const ETHOS = [
  { en: ['Beasty', 'Character', 'A part-time human, a full-time beast. Always pushing forward and going the extra grind and running the extra mile.'],
    ar: ['طبع', 'الوحش', 'إنسان بدوام جزئي، وحش بدوام كامل. يدفع دائماً إلى الأمام ويعطي الجهد الإضافي ويقطع الميل الإضافي.'] },
  { en: ['Apolloian', 'Spirit', 'Healing, lifting, lifestyle and arts, light, knowledge, herds and flocks of power, and protection of the inexperienced.'],
    ar: ['روح', 'أبولو', 'شفاء ورفع وأسلوب حياة وفنون، نور ومعرفة، قطعان من القوة، وحماية للمبتدئين.'] },
  { en: ['Driven', 'Visionary', 'Thirsty to experience the new, hungry to erase all boundaries. With one eye on the now, and the other on the next.'],
    ar: ['رؤية', 'مدفوعة', 'متعطش لتجربة الجديد، جائع لمحو كل الحدود. عين على الحاضر، والأخرى على ما بعده.'] },
  { en: ['Brazen', 'Charisma', 'Marked by shameless and respectful boldness. A brazen disregard for the rules and sets the tone.'],
    ar: ['كاريزما', 'جريئة', 'جرأة بلا خجل وباحترام. تجاهل صريح للقواعد، وهي من تضع الإيقاع.'] }
];

// The story, from the History section on Apollo's homepage.
const STORY = [
  { y: '2018', en: ['The idea', 'December 2018: Yousef Al Masri, Mohammad Al Masri and Dorian Yates meet to create the ultimate gym in Amman.'], ar: ['الفكرة', 'ديسمبر ٢٠١٨: يوسف المصري ومحمد المصري ودوريان ييتس يلتقون لصناعة النادي الأمثل في عمّان.'] },
  { y: '2019', en: ['The hunt', 'The search for the perfect spot begins. The heart of Amman wins.'], ar: ['البحث', 'يبدأ البحث عن المكان المثالي. قلب عمّان يفوز.'] },
  { y: '2021', en: ['The brand', 'The Apollo brand is born and ready to be commenced.'], ar: ['العلامة', 'تولد علامة أبولو وتصبح جاهزة للانطلاق.'] },
  { y: '2023', en: ['The doors', '1 October 2023: Apollo officially opens on Mecca Street.'], ar: ['الأبواب', '١ أكتوبر ٢٠٢٣: أبولو يفتح أبوابه رسمياً على شارع مكة.'] }
];

// Real member quotes, as published on Apollo's website.
const QUOTES = [
  { name: 'Mohammad Riyal', role: { en: 'Content creator', ar: 'صانع محتوى' },
    en: 'No one’s ever been able to change my body like Apollo have. I’m grateful for everyone at Apollo.',
    ar: 'ما حدا قدر يغيّر جسمي مثل أبولو. ممتن لكل شخص في أبولو.' },
  { name: 'Mohammad Nsour', role: { en: 'IFBB Pro & Olympian', ar: 'محترف IFBB وأولمبي' },
    en: 'Apollo has everything a professional, an amateur or just a normal fitness person needs. Great atmosphere, great facilities and the best vibes. It’s my second home.',
    ar: 'أبولو فيه كل ما يحتاجه المحترف والهاوي وأي شخص يحب الرياضة. أجواء رائعة ومرافق ممتازة وأفضل فايبز. هو بيتي الثاني.' }
];

// Membership prices from Apollo's "October 2026" Instagram post.
const PLANS = [
  // Perks are not published, so each plan shows only its price, length and the offer. PLACEHOLDER until Apollo lists what's included.
  { price: 150, months: 1, en: ['1 month', ['Full gym access']], ar: ['شهر', ['دخول كامل للنادي']] },
  { price: 250, months: 3, en: ['3 months', ['Full gym access', 'About 83 JD a month']], ar: ['٣ أشهر', ['دخول كامل للنادي', 'حوالي ٨٣ د.أ شهرياً']] },
  { price: 300, months: 9, en: ['9 months', ['Full gym access', 'About 33 JD a month', '+1 month free for the first 10 sign-ups']], ar: ['٩ أشهر', ['دخول كامل للنادي', 'حوالي ٣٣ د.أ شهرياً', 'شهر إضافي مجاناً لأول ١٠ مشتركين']], popular: true }
];
