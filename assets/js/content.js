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
  facebook: 'https://www.facebook.com/atf.jo/',
  // Apollo Live: their live floor counter. The bubble opens this page in a panel. If Apollo gives us a JSON
  // endpoint for the number (e.g. { "count": 42 }), put its URL in liveCountUrl and the bubble shows the count.
  liveUrl: 'https://www.apollotrainingfacility.com/live',
  liveCountUrl: '',
  google: 'https://www.google.com/maps/search/?api=1&query=Apollo+Training+Facility+Mecca+Street+Amman',
  mapEmbed: 'https://www.google.com/maps?q=Apollo+Training+Facility,+Mecca+Street,+Al+Sayegh+Commercial+Complex,+Amman&output=embed',
  // Opening hours, Sunday first: [open, close] in 24h. '00:00' as a close means midnight. Confirmed by the owner (2026-10-18).
  hours: [['06:00', '00:00'], ['06:00', '00:00'], ['06:00', '00:00'], ['06:00', '00:00'], ['06:00', '00:00'], ['11:00', '19:00'], ['06:00', '00:00']]
};

const TEXT = {
  en: {
    lang_btn: 'عربي',
    menu: 'Menu', close: 'Close',
    nav_space: 'The space', nav_programs: 'Train', nav_story: 'Story', nav_members: 'Members', nav_plans: 'Membership', nav_visit: 'Visit', nav_faq: 'FAQ', nav_franchise: 'Franchise', nav_live: 'Live',
    nav_family: 'Family', nav_cta: 'Call Apollo',
    loader_skip: 'Skip intro',
    hero_eyebrow: 'Mecca Street, Amman',
    hero_l1: 'Rule your', hero_l2: 'destiny.', hero_l3: 'Defy the', hero_l4: 'limits.',
    hero_sub: 'A training community in Amman. 840 square metres of iron and turf, and the best people you will meet in a gym. Open from 6 AM.',
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
    space_kicker: '02 · The space', space_title: 'A gym guide', space_text: 'Scroll through the floor. Every corner was built on purpose.',
    space_hint: 'Swipe, or use the arrows', space_more: 'Explore the full gallery', space_prev: 'Previous photo', space_next: 'Next photo',
    programs_kicker: '03 · Train', programs_title: 'Pick your weapon',
    programs_text: 'Strength, conditioning, combat and classes, all under one roof, with certified trainers in your corner.',
    amenities: ['Cafeteria', 'Lounge', 'Showers', 'Lockers', 'On-site parking', 'Trial classes'],
    ethos_kicker: '04 · The ethos', ethos_title: 'We are the Desperados',
    ethos_text: 'More than they show, the Desperados are the rebels of the game. Four traits make a true Apolloian.',
    values_title: 'Our values', values: ['Respect', 'Challenge', 'Assist', 'Change'],
    story_kicker: '05 · The story', story_title: 'Born in Amman',
    members_kicker: '06 · Members', members_title: 'Why they keep coming back',
    google_badge: '4.9 on Google · 374 reviews',
    family_kicker: '01 · Beyond the training floor', family_title: 'The Apollo family, outside Apollo',
    family_text: 'Apollo is a community before it is a gym. The people you lift next to become the people you run with on a Friday morning and argue with over a football. Nobody is a stranger here for long.',
    family_slot: 'Photo coming',
    membership_kicker: '07 · Membership', membership_title: 'Join the Apollo family',
    membership_text: 'Membership is a conversation, not a checkout. Call or message the team, come and see the place, and they will walk you through how it works.',
    includes: ['Full access to the 840 m² floor: free weights, machines, turf and cardio', 'Strength, HIIT and group classes, with trial classes available', 'Personal training with the Apollo coaches', 'Cafeteria, lounge, showers and lockers', 'Group runs and the occasional football game with the family'],
    enquire_title: 'Enquire about membership', enquire_short: 'Enquire on WhatsApp',
    enquire_text: 'The quickest way in is a call. The team will tell you what membership looks like for you and invite you to visit.',
    enquire_call: 'Call Apollo', enquire_wa: 'Speak to the team on WhatsApp',
    enquire_note: 'Open Saturday to Thursday from 6 AM, Friday from 11 AM.',
    faq_kicker: '08 · FAQ', faq_title: 'Good questions',
    faq_text: 'The things people ask before their first visit. Anything else, send a message.',
    live_title: 'Apollo Live', live_text: 'See how busy the floor is right now, before you leave the house.', live_cta: 'Open Apollo Live',
    live_bubble: 'Live floor', live_bubble_hint: 'How busy is it now?', live_panel_title: 'Apollo Live', live_panel_text: 'How busy the floor is at this moment, straight from the gym.', live_open_tab: 'Open in a new tab', live_close: 'Close', live_members: 'on the floor',
    quotes_prev: 'Previous review', quotes_next: 'Next review',
    social_instagram: 'Apollo on Instagram', social_facebook: 'Apollo on Facebook', facebook: 'Facebook',
    visit_kicker: '09 · Visit', visit_title: 'Come see it',
    hours_title: 'Opening hours', contact_title: 'Talk to us', address_title: 'Find us',
    address: 'Mecca Street, Al Sayegh Commercial Complex #181, Amman, Jordan',
    directions: 'Get directions', call: 'Call', whatsapp: 'WhatsApp', instagram: 'Instagram',
    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: 'Today',
    franchise_kicker: '10 · Franchise', franchise_title: 'Own an Apollo',
    franchise_text: 'Apollo is open to franchise partners who want to bring the community gym to a new city. Talk to the team about how it works.',
    franchise_cta: 'Ask on WhatsApp', franchise_mail: 'Email the team',
    final_word: 'Rise.', final_title: 'Your place in the family starts with a conversation.', final_cta: 'Enquire about membership',
    footer_name: 'Apollo Training Facility', footer_addr: 'Mecca Street, Amman',
    footer_credit: 'Site by LabsUncut',
    wa_msg: 'Hi Apollo! I saw the website and would like to come and see the place.',
    wa_member_msg: 'Hi Apollo! I saw the website and would like to ask about membership.'
  },
  ar: {
    lang_btn: 'EN',
    menu: 'القائمة', close: 'إغلاق',
    nav_space: 'المكان', nav_programs: 'تمرّن', nav_story: 'القصة', nav_members: 'الأعضاء', nav_plans: 'الاشتراكات', nav_visit: 'زورونا', nav_faq: 'الأسئلة', nav_franchise: 'الامتياز', nav_live: 'مباشر',
    nav_family: 'العائلة', nav_cta: 'اتصل بأبولو',
    loader_skip: 'تخطَّ المقدمة',
    hero_eyebrow: 'شارع مكة، عمّان',
    hero_l1: 'تحكّم', hero_l2: 'بمصيرك.', hero_l3: 'تحدَّ', hero_l4: 'الحدود.',
    hero_sub: 'مجتمع تدريب في عمّان. ٨٤٠ متراً مربعاً من الحديد والعشب، وأطيب ناس ممكن تقابلهم في نادي. نفتح من الساعة ٦ صباحاً.',
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
    space_kicker: '٠٢ · المكان', space_title: 'جولة في النادي', space_text: 'تصفّح الصالة. كل زاوية بُنيت بقصد.',
    space_hint: 'اسحب، أو استخدم الأسهم', space_more: 'استكشف المعرض كاملاً', space_prev: 'الصورة السابقة', space_next: 'الصورة التالية',
    programs_kicker: '٠٣ · تمرّن', programs_title: 'اختر سلاحك',
    programs_text: 'قوة ولياقة وقتال وحصص جماعية، كلها تحت سقف واحد، مع مدربين معتمدين إلى جانبك.',
    amenities: ['كافتيريا', 'صالة استراحة', 'حمامات', 'خزائن', 'موقف سيارات', 'حصص تجريبية'],
    ethos_kicker: '٠٤ · الروح', ethos_title: 'نحن الديسبيرادوس',
    ethos_text: 'الديسبيرادوس هم متمرّدو اللعبة. أربع صفات تصنع الأبولوي الحقيقي.',
    values_title: 'قيمنا', values: ['الاحترام', 'التحدي', 'المساندة', 'التغيير'],
    story_kicker: '٠٥ · القصة', story_title: 'وُلد في عمّان',
    members_kicker: '٠٦ · الأعضاء', members_title: 'ليش بيرجعوا كل يوم',
    google_badge: '٤٫٩ على غوغل · ٣٧٤ مراجعة',
    family_kicker: '٠١ · خارج صالة التمرين', family_title: 'عائلة أبولو، خارج أبولو',
    family_text: 'أبولو مجتمع قبل ما يكون نادي. الناس اللي بتتمرن جنبهم بيصيروا الناس اللي بتركض معهم صبح الجمعة وبتتخانق معهم على كرة. ما حدا بيضل غريب هون لوقت طويل.',
    family_slot: 'الصورة قريباً',
    membership_kicker: '٠٧ · العضوية', membership_title: 'انضم لعائلة أبولو',
    membership_text: 'العضوية حديث، مش عملية شراء. اتصل أو ابعث للفريق، تعال شوف المكان، وهم بيشرحولك كيف بتمشي الأمور.',
    includes: ['دخول كامل للصالة بمساحة ٨٤٠ م²: أوزان حرة وأجهزة وعشب وكارديو', 'حصص قوة وHIIT وحصص جماعية، مع حصص تجريبية متاحة', 'تدريب شخصي مع مدربي أبولو', 'كافتيريا وصالة استراحة ودُشّات وخزائن', 'ركض جماعي ومباراة كرة بين فترة وأخرى مع العائلة'],
    enquire_title: 'استفسر عن العضوية', enquire_short: 'استفسر على واتساب',
    enquire_text: 'أسرع طريق هو مكالمة. الفريق بيحكيلك كيف بتكون العضوية إلك وبيدعوك تزور المكان.',
    enquire_call: 'اتصل بأبولو', enquire_wa: 'احكِ مع الفريق على واتساب',
    enquire_note: 'نفتح من السبت إلى الخميس من ٦ صباحاً، والجمعة من ١١ صباحاً.',
    faq_kicker: '٠٨ · الأسئلة الشائعة', faq_title: 'أسئلة بمحلها',
    faq_text: 'الأشياء التي يسألها الناس قبل أول زيارة. أي شيء آخر، ابعث رسالة.',
    live_title: 'أبولو مباشر', live_text: 'شوف كم الصالة مزدحمة الآن، قبل ما تطلع من البيت.', live_cta: 'افتح أبولو مباشر',
    live_bubble: 'الصالة مباشر', live_bubble_hint: 'كم مزدحمة الآن؟', live_panel_title: 'أبولو مباشر', live_panel_text: 'كم الصالة مزدحمة في هذه اللحظة، مباشرة من النادي.', live_open_tab: 'افتح في تبويب جديد', live_close: 'إغلاق', live_members: 'في الصالة',
    quotes_prev: 'الرأي السابق', quotes_next: 'الرأي التالي',
    social_instagram: 'أبولو على إنستغرام', social_facebook: 'أبولو على فيسبوك', facebook: 'فيسبوك',
    visit_kicker: '٠٩ · زورونا', visit_title: 'تعال شوفه بنفسك',
    hours_title: 'ساعات العمل', contact_title: 'تواصل معنا', address_title: 'موقعنا',
    address: 'شارع مكة، مجمع الصايغ التجاري #181، عمّان، الأردن',
    directions: 'الاتجاهات', call: 'اتصل', whatsapp: 'واتساب', instagram: 'إنستغرام',
    days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    today: 'اليوم',
    franchise_kicker: '١٠ · الامتياز التجاري', franchise_title: 'امتلك أبولو',
    franchise_text: 'أبولو منفتح على شركاء امتياز يريدون نقل النادي المجتمعي إلى مدينة جديدة. تواصل مع الفريق لتعرف كيف يتم الأمر.',
    franchise_cta: 'اسأل على واتساب', franchise_mail: 'راسل الفريق',
    final_word: 'ارتقِ.', final_title: 'مكانك في العائلة يبدأ بحديث.', final_cta: 'استفسر عن العضوية',
    footer_name: 'أبولو للتدريب', footer_addr: 'شارع مكة، عمّان',
    footer_credit: 'الموقع من LabsUncut',
    wa_msg: 'مرحباً أبولو! شفت الموقع وحاب أجي أشوف المكان.',
    wa_member_msg: 'مرحباً أبولو! شفت الموقع وحاب أسأل عن العضوية.'
  }
};

// ---------- Images ----------
// Every photo on the site is referenced here, so swapping in Apollo's real photos is a one-file job.
// `focus` is the CSS object-position (which part survives a crop), w/h reserve space before load.
// PLACEHOLDER quality: frames from Apollo's own Instagram "a gym guide" post (shot by @wassleh.cs)
// and one photo Apollo sent, until the originals arrive. See PHOTOS.md for the shot list.
const IMAGES = {
  hero: { src: 'assets/img/hero-cardio.webp', w: 1860, h: 1160, focus: '50% 45%' },
  heroPhone: { src: 'assets/img/red-weights.webp', w: 640, h: 882, focus: '50% 30%' },
  finale: { src: 'assets/img/red-weights.webp', w: 640, h: 882, focus: '50% 40%' }
};
// The gym guide. The first `highlights` photos show by default; the rest open with "Explore the full gallery".
const SPACE_HIGHLIGHTS = 6;
const SPACE = [
  { img: 'assets/img/space/reception.webp', w: 930, h: 580, focus: '50% 50%', en: 'Reception', ar: 'الاستقبال' },
  { img: 'assets/img/space/open-gym.webp', w: 930, h: 580, focus: '50% 50%', en: 'Open gym area', ar: 'منطقة التمرين المفتوحة' },
  { img: 'assets/img/space/free-weights.webp', w: 930, h: 580, focus: '50% 50%', en: 'Free weights', ar: 'الأوزان الحرة' },
  { img: 'assets/img/space/cardio.webp', w: 930, h: 580, focus: '50% 50%', en: 'Cardio area', ar: 'منطقة الكارديو' },
  { img: 'assets/img/space/calisthenics.webp', w: 930, h: 580, focus: '50% 50%', en: 'Calisthenics area', ar: 'منطقة الكاليستينكس' },
  { img: 'assets/img/space/boxing-zone.webp', w: 930, h: 580, focus: '50% 50%', en: 'Boxing zone', ar: 'منطقة الملاكمة' },
  { img: 'assets/img/space/chest-area.webp', w: 930, h: 580, focus: '50% 50%', en: 'Chest area', ar: 'منطقة الصدر' },
  { img: 'assets/img/space/classroom.webp', w: 930, h: 580, focus: '50% 50%', en: 'Classroom, lights on', ar: 'قاعة الحصص، الأضواء مضاءة' },
  { img: 'assets/img/space/classroom-lights-off.webp', w: 930, h: 580, focus: '50% 50%', en: 'Classroom, lights off', ar: 'قاعة الحصص، الأضواء مطفأة' },
  { img: 'assets/img/space/cafeteria.webp', w: 930, h: 580, focus: '50% 50%', en: 'Cafeteria', ar: 'الكافتيريا' },
  { img: 'assets/img/space/lounge.webp', w: 930, h: 580, focus: '50% 50%', en: 'Lounge', ar: 'صالة الاستراحة' },
  { img: 'assets/img/space/chill-area.webp', w: 930, h: 580, focus: '50% 50%', en: 'Chess & chill area', ar: 'زاوية الشطرنج والاسترخاء' },
  { img: 'assets/img/space/balcony-view.webp', w: 930, h: 580, focus: '50% 50%', en: 'Balcony view', ar: 'إطلالة الشرفة' }
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
  { y: '2023', en: ['The doors', '1 October 2023: Apollo officially opens on Mecca Street.'], ar: ['الأبواب', '١ أكتوبر ٢٠٢٣: أبولو يفتح أبوابه رسمياً على شارع مكة.'] },
  // 2024-2026 from the owner's notes (2026-10-18). Short on purpose; he will send fuller wording.
  { y: '2024', en: ['The craft', 'The first full year. Apollo sharpens the floor, the classes and the way it trains people.'], ar: ['الصنعة', 'أول سنة كاملة. أبولو يصقل الصالة والحصص وطريقته في تدريب الناس.'] },
  { y: '2025', en: ['The rise', 'Yousef Al-Masri teams up with Abed Salameh, and Apollo takes off: the city starts talking about the gym on Mecca Street.'], ar: ['الانطلاقة', 'يوسف المصري يتعاون مع عبد سلامة، وأبولو ينطلق: المدينة تبدأ تحكي عن النادي على شارع مكة.'] },
  { y: '2026', en: ['The family', 'The community comes together: training partners, group runs, football games. Apollo becomes more than a gym.'], ar: ['العائلة', 'المجتمع يكتمل: شركاء تمرين، ركض جماعي، مباريات كرة. أبولو يصبح أكثر من نادٍ.'] }
];

// Real member quotes only. Add more here as Apollo approves them (name, role, English, Arabic); the carousel grows by itself.
// Removed 2026-10-18 at the owner's request: Mohammad Riyal.
const QUOTES = [
  { name: 'Mohammad Nsour', role: { en: 'IFBB Pro & Olympian', ar: 'محترف IFBB وأولمبي' },
    en: 'Apollo has everything a professional, an amateur or just a normal fitness person needs. Great atmosphere, great facilities and the best vibes. It’s my second home.',
    ar: 'أبولو فيه كل ما يحتاجه المحترف والهاوي وأي شخص يحب الرياضة. أجواء رائعة ومرافق ممتازة وأفضل فايبز. هو بيتي الثاني.' }
];

// Only facts from Apollo's listings and this site: hours, trial classes, parking, facilities. No prices on the site.
const FAQ = [
  { en: ['When are you open?', 'Saturday to Thursday from 6:00 AM to midnight, and Friday from 11:00 AM to 7:00 PM.'], ar: ['متى تفتحون؟', 'من السبت إلى الخميس من ٦:٠٠ صباحاً حتى ١٢:٠٠ منتصف الليل، والجمعة من ١١:٠٠ صباحاً حتى ٧:٠٠ مساءً.'] },
  { en: ['Can I try before I join?', 'Yes. Trial classes are available. Message us on WhatsApp and we will book you in.'], ar: ['هل أقدر أجرّب قبل الاشتراك؟', 'نعم. الحصص التجريبية متاحة. ابعث لنا على واتساب ونحجز لك.'] },
  { en: ['How do I join?', 'Call Apollo or message the team on WhatsApp. They will explain how membership works and invite you to come and see the place.'], ar: ['كيف أنضم؟', 'اتصل بأبولو أو ابعث للفريق على واتساب. بيشرحولك كيف بتمشي العضوية وبيدعوك تزور المكان.'] },
  { en: ['Is it busy right now?', 'Check Apollo Live before you come. It shows how full the floor is at this moment.'], ar: ['هل الصالة مزدحمة الآن؟', 'افتح أبولو مباشر قبل ما تيجي. يعرض لك كم الصالة ممتلئة في هذه اللحظة.'] },
  { en: ['Where do I park?', 'There is on-site parking at Al Sayegh Commercial Complex #181 on Mecca Street.'], ar: ['وين أركن؟', 'يوجد موقف سيارات في مجمع الصايغ التجاري رقم ١٨١ على شارع مكة.'] },
  { en: ['What is there besides the gym floor?', 'A cafeteria, a lounge, showers and lockers. Come early, stay late.'], ar: ['شو في غير صالة التمرين؟', 'كافتيريا وصالة استراحة ودُشّات وخزائن. تعال بكّير وابقَ لوقت متأخر.'] }
];

// The family, outside the gym. Photo slots are empty until Apollo sends real photos (see PHOTOS.md).
const FAMILY = [
  { img: null, en: ['Training together', 'Nobody trains alone here for long. A spot, a tip, a push on the last rep: it comes from the person next to you.'], ar: ['نتمرن سوا', 'ما حدا بيتمرن لحاله هون لوقت طويل. مساعدة، نصيحة، دفعة على آخر عدّة: بتيجي من الشخص اللي جنبك.'] },
  { img: null, en: ['Group runs', 'Members meet up and run together around Amman. Everyone finishes, nobody gets left behind.'], ar: ['ركض جماعي', 'الأعضاء بيتجمعوا ويركضوا سوا في عمّان. الكل بيخلّص، وما حدا بيضل لحاله.'] },
  { img: null, en: ['Football, now and then', 'Every so often the family takes it outside for a game. Zero technique, maximum heart.'], ar: ['كرة قدم بين فترة وأخرى', 'كل فترة العائلة بتطلع تلعب مباراة. مهارة صفر، قلب على الآخر.'] }
];
