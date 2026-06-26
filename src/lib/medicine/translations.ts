export type Lang = 'en' | 'ar' | 'ru' | 'fr' | 'es' | 'zh';

export const languages: { code: Lang; name: string; nativeName: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', dir: 'ltr' },
];

export interface TranslationDict {
  // Header
  brandName: string;
  tagline: string;
  subtitle: string;
  ctaButton: string;
  contactButton: string;

  // Stats
  statYears: string;
  statYearsValue: string;
  statModules: string;
  statModulesValue: string;
  statCompliance: string;
  statComplianceValue: string;

  // Section titles
  sectionServices: string;
  sectionJourney: string;
  sectionRefund: string;
  sectionPricing: string;
  sectionContact: string;
  sectionDisclaimer: string;

  // Service modules
  module1Title: string;
  module1Desc: string;
  module1Item1: string;
  module1Item2: string;
  module1Item3: string;

  module2Title: string;
  module2Desc: string;
  module2Item1: string;
  module2Item2: string;
  module2Item3: string;
  module2Item4: string;
  module2Covers: string;

  module3Title: string;
  module3Desc: string;
  module3ProductA: string;
  module3ProductB: string;
  module3Compliance: string;
  module3RiskNote: string;

  module4Title: string;
  module4Desc: string;
  module4Item1: string;
  module4Item2: string;
  module4Item3: string;
  module4Excludes: string;

  module5Title: string;
  module5Desc: string;

  // Customer journey
  journeyTitle1: string;
  journeySteps1: string[];
  journeyTitle2: string;
  journeySteps2: string[];
  journeyTitle3: string;
  journeySteps3: string[];
  journeyTitle4: string;
  journeySteps4: string[];

  // Refund table
  refundTitle: string;
  refundNote: string;
  refundHeader1: string;
  refundHeader2: string;
  refundRow1Label: string;
  refundRow1Value: string;
  refundRow2Label: string;
  refundRow2Value: string;
  refundRow3Label: string;
  refundRow3Value: string;
  refundRow4Label: string;
  refundRow4Value: string;
  refundRow5Label: string;
  refundRow5Value: string;

  // Pricing & discounts
  pricingTitle: string;
  pricingDiscount1: string;
  pricingDiscount2: string;
  pricingDiscount3: string;
  pricingRegionTitle: string;
  pricingRegionHeader1: string;
  pricingRegionHeader2: string;
  pricingRegionRow1Label: string;
  pricingRegionRow1Value: string;
  pricingRegionRow2Label: string;
  pricingRegionRow2Value: string;
  pricingRegionRow3Label: string;
  pricingRegionRow3Value: string;

  // Contact
  contactTitle: string;
  contactEmail: string;
  contactDesc: string;

  // Compliance
  complianceTitle: string;
  complianceItems: string[];

  // Disclaimer
  disclaimer: string;
  copyright: string;

  // Language switcher
  langLabel: string;

  // Meta
  metaTitle: string;
  metaDesc: string;

  // Journey labels
  journeyStepLabel: string;
  journeyDetailLabel: string;
}

const translations: Record<Lang, TranslationDict> = {
  en: {
    brandName: 'MediBridge China',
    tagline: 'Your Trusted Gateway to Medical Care in China',
    subtitle: 'Five independent service modules — medical translation, in-hospital escort, expert appointment booking, health itinerary consultation, and free third-party referrals. Choose what you need, no bundles.',
    ctaButton: 'Explore Our Services',
    contactButton: 'Contact Us',

    statYears: 'Experience',
    statYearsValue: '30+ Years',
    statModules: 'Service Modules',
    statModulesValue: '5 Independent',
    statCompliance: 'Compliance',
    statComplianceValue: '100% Official',

    sectionServices: 'Our Services',
    sectionJourney: 'Your Journey',
    sectionRefund: 'Refund Policy',
    sectionPricing: 'Pricing & Discounts',
    sectionContact: 'Get in Touch',
    sectionDisclaimer: 'Compliance First',

    module1Title: 'Independent Medical Translation',
    module1Desc: 'Professional medical document and real-time interpretation services by certified medical translators.',
    module1Item1: 'Written medical records: Standard $25/page | Specialist $40/page (rush ≤50% surcharge)',
    module1Item2: 'Live online translation: $180/hour (certified medical translators only)',
    module1Item3: 'On-site interpretation: $250/day (8–10 hours full-day accompaniment)',

    module2Title: 'Full-Process In-Hospital Escort',
    module2Desc: 'End-to-end companionship through every step of your hospital visit — from check-in to discharge.',
    module2Item1: 'Single day: $180',
    module2Item2: '3-day package: $480 (avg $160/day)',
    module2Item3: '7-day full cycle: $980 (avg $140/day)',
    module2Item4: 'Monthly follow-up card: $420 (one revisit per month)',
    module2Covers: 'Covers: admission examination escort, inpatient guidance, discharge settlement, medical record copying',

    module3Title: 'Advance Appointment & Specialist Booking',
    module3Desc: 'We assist with official hospital channel bookings only. No scalping, no queue-jumping, no inside dealing.',
    module3ProductA: 'Product A — Non-Specified Specialist: $160/appointment (rush 3-day $224)',
    module3ProductB: 'Product B — Named Specialist Booking: $260/appointment (rush 7-day $390)',
    module3Compliance: 'All bookings via hospital official app/website/international medical department only. No guarantee of 100% success — slots are allocated solely by the hospital.',
    module3RiskNote: 'Risk Notice: We do not and cannot guarantee a specific specialist appointment. Our fee is for information assistance only.',

    module4Title: 'China Medical Travel Consultation',
    module4Desc: 'Personalized consultation to plan your medical journey to China — policies, hospital selection, logistics guidance.',
    module4Item1: 'Basic plan: from $800',
    module4Item2: 'Standard plan: $1,200–$2,500',
    module4Item3: 'Premium plan: $4,800–$9,000 (includes remote consultation arrangement, multi-disciplinary coordination)',
    module4Excludes: 'Excludes: hotel booking, transportation, visa processing',

    module5Title: 'Free Third-Party Referrals',
    module5Desc: 'We connect you to licensed travel agencies and immigration services at no extra cost. No commission, no markup.',

    journeyTitle1: 'Appointment-Only Journey',
    journeySteps1: [
      'Submit passport, medical records, desired department/specialist',
      'Receive personalized quote',
      'Pay service fee + hospital registration fee directly to hospital',
      'We submit booking via official hospital channels',
      'Receive booking result — success with appointment time, or refund with alternative options',
      'Data securely archived within 48 hours',
    ],
    journeyTitle2: 'Translation-Only Journey',
    journeySteps2: [
      'Submit medical documents',
      'Receive professional translation',
      'Free revisions within 3 days',
      'Original documents securely deleted 48 hours after delivery',
    ],
    journeyTitle3: 'Escort-Only Journey',
    journeySteps3: [
      'Match appointment date',
      'Receive hospital navigation pack 48 hours before visit',
      'Admission check-in escort',
      'Inpatient guidance throughout stay',
      'Discharge settlement assistance',
      'Medical record copying support',
    ],
    journeyTitle4: 'Full Package Journey',
    journeySteps4: [
      'Personalized consultation & plan creation',
      'Appointment booking',
      'In-hospital escort upon arrival',
      'Real-time translation support',
      'Discharge follow-up',
      'Complete documentation & archiving',
    ],

    refundTitle: 'Appointment Booking Refund Policy',
    refundNote: 'All four service categories are independently refundable. Each follows its own tiered rules — no cross-deduction between modules.',
    refundHeader1: 'Refund Milestone',
    refundHeader2: 'Refund Rate',
    refundRow1Label: 'Cancellation ≥7 days before submission',
    refundRow1Value: '100%',
    refundRow2Label: 'Submitted but slot not yet locked',
    refundRow2Value: '70%',
    refundRow3Label: 'Slot confirmed, client cancels',
    refundRow3Value: '30%',
    refundRow4Label: 'Hospital cancels / doctor unavailable (not client fault)',
    refundRow4Value: '100%',
    refundRow5Label: 'False client information causes cancellation',
    refundRow5Value: '0%',

    pricingTitle: 'Discounts & Bundles',
    pricingDiscount1: 'Appointment + single-day escort: 10% off total',
    pricingDiscount2: 'Named specialist booking + 7-day escort + on-site translation: 15% off total package',
    pricingDiscount3: 'First-time appointment booking: $89 (new clients only)',
    pricingRegionTitle: 'Recommended Packages by Region',
    pricingRegionHeader1: 'Region',
    pricingRegionHeader2: 'Recommended Package',
    pricingRegionRow1Label: 'North America / Europe',
    pricingRegionRow1Value: 'Premium Full Package (Consultation + Booking + Escort + Translation)',
    pricingRegionRow2Label: 'Southeast Asia / Central Asia',
    pricingRegionRow2Value: 'Essential Core (Booking + Single-Day Escort)',
    pricingRegionRow3Label: 'Africa / Middle East',
    pricingRegionRow3Value: 'Flexible Quote — Customized to Your Needs',

    contactTitle: 'Contact Us',
    contactEmail: '3032785238@qq.com',
    contactDesc: 'Reach out for a personalized consultation. We respond within 24 hours.',

    complianceTitle: 'Our Compliance Commitments',
    complianceItems: [
      'No hoarding or reselling of hospital appointment slots',
      'No backdoor or personal channels to reserve doctors',
      'No promise of 100% success for named specialist bookings',
      'No collection of hospital registration fees — patients pay hospitals directly',
      'No forced bundling — every module can be purchased independently',
      'No patient identity fraud or document forgery',
      'No gifts or payments to medical staff',
    ],

    disclaimer: 'MediBridge China provides non-medical support services only. We do not provide medical diagnosis, treatment, or recommendations. All medical decisions should be made in consultation with licensed healthcare professionals.',
    copyright: '© 2026 MediBridge China. All rights reserved.',

    langLabel: 'Language',

    metaTitle: 'MediBridge China — Cross-Border Medical Support Services',
    metaDesc: 'Medical translation, in-hospital escort, expert appointment booking, and health travel consultation for international patients seeking care in China. Five independent modules, no bundles. Compliance-first, officially channeled service.',

    journeyStepLabel: 'Step',
    journeyDetailLabel: 'Details',
  },

  ar: {
    brandName: 'ميدي بريدج الصين',
    tagline: 'بوابتك الموثوقة للرعاية الطبية في الصين',
    subtitle: 'خمس وحدات خدمة مستقلة — ترجمة طبية، مرافقة داخل المستشفى، حجز مواعيد الخبراء، استشارة الرحلات الصحية، وإحالات مجانية لأطراف ثالثة. اختر ما تحتاج إليه، دون حزم إجبارية.',
    ctaButton: 'استكشف خدماتنا',
    contactButton: 'اتصل بنا',

    statYears: 'خبرة',
    statYearsValue: 'أكثر من 30 عاماً',
    statModules: 'وحدات الخدمة',
    statModulesValue: '5 مستقلة',
    statCompliance: 'امتثال',
    statComplianceValue: 'رسمي 100%',

    sectionServices: 'خدماتنا',
    sectionJourney: 'رحلتك',
    sectionRefund: 'سياسة الاسترداد',
    sectionPricing: 'الأسعار والخصومات',
    sectionContact: 'تواصل معنا',
    sectionDisclaimer: 'الامتثال أولاً',

    module1Title: 'الترجمة الطبية المستقلة',
    module1Desc: 'خدمات ترجمة المستندات الطبية والترجمة الفورية بواسطة مترجمين طبيين معتمدين.',
    module1Item1: 'السجلات الطبية المكتوبة: قياسي $25/صفحة | متخصص $40/صفحة (رسوم إضافية للاستعجال ≤50%)',
    module1Item2: 'ترجمة فورية عبر الإنترنت: $180/ساعة (مترجمون طبيون معتمدون فقط)',
    module1Item3: 'ترجمة فورية في الموقع: $250/يوم (مرافقة كاملة 8–10 ساعات)',

    module2Title: 'مرافقة كاملة داخل المستشفى',
    module2Desc: 'مرافقة شاملة خلال كل خطوة من زيارتك للمستشفى — من التسجيل حتى الخروج.',
    module2Item1: 'يوم واحد: $180',
    module2Item2: 'باقة 3 أيام: $480 (متوسط $160/يوم)',
    module2Item3: 'دورة كاملة 7 أيام: $980 (متوسط $140/يوم)',
    module2Item4: 'بطاقة متابعة شهرية: $420 (زيارة متابعة واحدة شهرياً)',
    module2Covers: 'تشمل: مرافقة فحص الدخول، إرشاد المرضى الداخليين، تسوية الخروج، نسخ السجلات الطبية',

    module3Title: 'الحجز المسبق وحجز الخبراء',
    module3Desc: 'نساعد في الحجز عبر القنوات الرسمية للمستشفى فقط. لا سماسرة، لا تجاوز للدور، لا تعاملات داخلية.',
    module3ProductA: 'المنتج أ — حجز بدون تحديد طبيب: $160/حجز (مستعجل 3 أيام $224)',
    module3ProductB: 'المنتج ب — حجز طبيب محدد بالاسم: $260/حجز (مستعجل 7 أيام $390)',
    module3Compliance: 'جميع الحجوزات عبر التطبيق/الموقع الرسمي للمستشفى/القسم الطبي الدولي فقط. لا نضمن نجاح 100% — المواعيد مخصصة من قبل المستشفى فقط.',
    module3RiskNote: 'إشعار المخاطر: لا نضمن ولا نستطيع ضمان موعد مع طبيب محدد. رسومنا هي مقابل المساعدة في المعلومات فقط.',

    module4Title: 'استشارة السفر الطبي إلى الصين',
    module4Desc: 'استشارة شخصية لتخطيط رحلتك الطبية إلى الصين — السياسات، اختيار المستشفى، إرشاد لوجستي.',
    module4Item1: 'الخطة الأساسية: من $800',
    module4Item2: 'الخطة القياسية: $1,200–$2,500',
    module4Item3: 'الخطة المميزة: $4,800–$9,000 (تشمل ترتيب الاستشارة عن بُعد، تنسيق متعدد التخصصات)',
    module4Excludes: 'لا تشمل: حجز الفنادق، النقل، معالجة التأشيرات',

    module5Title: 'إحالات مجانية لأطراف ثالثة',
    module5Desc: 'نوصلك بوكالات سفر مرخصة وخدمات هجرة بدون تكلفة إضافية. لا عمولة، لا هامش ربح.',

    journeyTitle1: 'رحلة الحجز فقط',
    journeySteps1: [
      'تقديم جواز السفر، السجلات الطبية، القسم/الطبيب المطلوب',
      'استلام عرض سعر مخصص',
      'دفع رسوم الخدمة + رسوم تسجيل المستشفى مباشرة للمستشفى',
      'نقوم بتقديم الحجز عبر القنوات الرسمية للمستشفى',
      'استلام نتيجة الحجز — نجاح مع وقت الموعد، أو استرداد مع خيارات بديلة',
      'أرشفة آمنة للبيانات خلال 48 ساعة',
    ],
    journeyTitle2: 'رحلة الترجمة فقط',
    journeySteps2: [
      'تقديم المستندات الطبية',
      'استلام ترجمة احترافية',
      'تعديلات مجانية خلال 3 أيام',
      'حذف آمن للمستندات الأصلية بعد 48 ساعة من التسليم',
    ],
    journeyTitle3: 'رحلة المرافقة فقط',
    journeySteps3: [
      'مطابقة تاريخ الموعد',
      'استلام حزمة إرشاد المستشفى قبل 48 ساعة من الزيارة',
      'مرافقة تسجيل الدخول',
      'إرشاد المرضى الداخليين طوال الإقامة',
      'مساعدة تسوية الخروج',
      'دعم نسخ السجلات الطبية',
    ],
    journeyTitle4: 'رحلة الباقة الكاملة',
    journeySteps4: [
      'استشارة شخصية وإنشاء خطة',
      'حجز الموعد',
      'مرافقة داخل المستشفى عند الوصول',
      'دعم ترجمة فورية',
      'متابعة ما بعد الخروج',
      'توثيق وأرشفة كاملة',
    ],

    refundTitle: 'سياسة استرداد رسوم حجز المواعيد',
    refundNote: 'جميع فئات الخدمة الأربع قابلة للاسترداد بشكل مستقل. كل منها يتبع قواعده المتدرجة — لا خصم متبادل بين الوحدات.',
    refundHeader1: 'مرحلة الاسترداد',
    refundHeader2: 'نسبة الاسترداد',
    refundRow1Label: 'إلغاء قبل 7 أيام من التقديم',
    refundRow1Value: '100%',
    refundRow2Label: 'تم التقديم ولكن الموعد غير مؤكد بعد',
    refundRow2Value: '70%',
    refundRow3Label: 'تم تأكيد الموعد، العميل يلغي',
    refundRow3Value: '30%',
    refundRow4Label: 'إلغاء من المستشفى / الطبيب غير متاح (ليس خطأ العميل)',
    refundRow4Value: '100%',
    refundRow5Label: 'معلومات عميل خاطئة تسبب الإلغاء',
    refundRow5Value: '0%',

    pricingTitle: 'الخصومات والباقات',
    pricingDiscount1: 'حجز + مرافقة يوم واحد: خصم 10% على الإجمالي',
    pricingDiscount2: 'حجز طبيب محدد + مرافقة 7 أيام + ترجمة فورية: خصم 15% على الباقة الكاملة',
    pricingDiscount3: 'أول حجز موعد: $89 (للعملاء الجدد فقط)',
    pricingRegionTitle: 'الباقات الموصى بها حسب المنطقة',
    pricingRegionHeader1: 'المنطقة',
    pricingRegionHeader2: 'الباقة الموصى بها',
    pricingRegionRow1Label: 'أمريكا الشمالية / أوروبا',
    pricingRegionRow1Value: 'الباقة الكاملة المميزة (استشارة + حجز + مرافقة + ترجمة)',
    pricingRegionRow2Label: 'جنوب شرق آسيا / آسيا الوسطى',
    pricingRegionRow2Value: 'الأساسيات (حجز + مرافقة يوم واحد)',
    pricingRegionRow3Label: 'أفريقيا / الشرق الأوسط',
    pricingRegionRow3Value: 'عرض سعر مرن — مخصص لاحتياجاتك',

    contactTitle: 'اتصل بنا',
    contactEmail: '3032785238@qq.com',
    contactDesc: 'تواصل معنا للحصول على استشارة شخصية. نرد خلال 24 ساعة.',

    complianceTitle: 'التزامات الامتثال لدينا',
    complianceItems: [
      'لا احتكار أو إعادة بيع لمواعيد المستشفيات',
      'لا قنوات خلفية أو شخصية لحجز الأطباء',
      'لا وعد بنجاح 100% لحجوزات الأطباء المحددين',
      'لا تحصيل لرسوم تسجيل المستشفى — المرضى يدفعون مباشرة للمستشفى',
      'لا حزم إجبارية — كل وحدة يمكن شراؤها بشكل مستقل',
      'لا احتيال في هوية المريض أو تزوير مستندات',
      'لا هدايا أو مدفوعات للطاقم الطبي',
    ],

    disclaimer: 'تقدم ميدي بريدج الصين خدمات الدعم غير الطبي فقط. نحن لا نقدم تشخيصاً طبياً أو علاجاً أو توصيات. يجب اتخاذ جميع القرارات الطبية بالتشاور مع متخصصي الرعاية الصحية المرخصين.',
    copyright: '© 2026 ميدي بريدج الصين. جميع الحقوق محفوظة.',

    langLabel: 'اللغة',

    metaTitle: 'ميدي بريدج الصين — خدمات الدعم الطبي عبر الحدود',
    metaDesc: 'ترجمة طبية، مرافقة داخل المستشفى، حجز مواعيد الخبراء، واستشارة السفر الصحي للمرضى الدوليين الباحثين عن الرعاية في الصين. خمس وحدات مستقلة، بدون حزم. خدمة بقنوات رسمية، الامتثال أولاً.',

    journeyStepLabel: 'الخطوة',
    journeyDetailLabel: 'التفاصيل',
  },

  ru: {
    brandName: 'MediBridge China',
    tagline: 'Ваш надежный путь к медицинской помощи в Китае',
    subtitle: 'Пять независимых сервисных модулей — медицинский перевод, сопровождение в больнице, запись к специалистам, консультация по медицинским поездкам и бесплатные рекомендации третьих лиц. Выбирайте, что нужно, без навязанных пакетов.',
    ctaButton: 'Наши услуги',
    contactButton: 'Связаться с нами',

    statYears: 'Опыт',
    statYearsValue: 'Более 30 лет',
    statModules: 'Модули услуг',
    statModulesValue: '5 независимых',
    statCompliance: 'Соответствие',
    statComplianceValue: '100% официально',

    sectionServices: 'Наши услуги',
    sectionJourney: 'Ваш путь',
    sectionRefund: 'Правила возврата',
    sectionPricing: 'Цены и скидки',
    sectionContact: 'Свяжитесь с нами',
    sectionDisclaimer: 'Соответствие прежде всего',

    module1Title: 'Независимый медицинский перевод',
    module1Desc: 'Профессиональный перевод медицинских документов и устный перевод сертифицированными медицинскими переводчиками.',
    module1Item1: 'Письменные мед. записи: Стандарт $25/стр. | Специализированный $40/стр. (срочно ≤50% наценки)',
    module1Item2: 'Онлайн перевод в реальном времени: $180/час (только сертифицированные мед. переводчики)',
    module1Item3: 'Перевод на месте: $250/день (полный день 8–10 часов)',

    module2Title: 'Полное сопровождение в больнице',
    module2Desc: 'Комплексное сопровождение на каждом этапе вашего визита в больницу — от регистрации до выписки.',
    module2Item1: 'Один день: $180',
    module2Item2: 'Пакет на 3 дня: $480 (в среднем $160/день)',
    module2Item3: 'Полный цикл 7 дней: $980 (в среднем $140/день)',
    module2Item4: 'Карта ежемесячного наблюдения: $420 (один повторный визит в месяц)',
    module2Covers: 'Включает: сопровождение при поступлении, руководство для стационарных пациентов, помощь при выписке, копирование мед. записей',

    module3Title: 'Предварительная запись и бронирование специалистов',
    module3Desc: 'Мы помогаем с записью только через официальные каналы больниц. Без спекуляции, без обхода очереди, без внутренних договоренностей.',
    module3ProductA: 'Продукт A — Запись без указания врача: $160/запись (срочно 3 дня $224)',
    module3ProductB: 'Продукт B — Запись к конкретному специалисту: $260/запись (срочно 7 дней $390)',
    module3Compliance: 'Все записи только через официальное приложение/сайт/международный отдел больницы. Не гарантируем 100% успех — слоты распределяются исключительно больницей.',
    module3RiskNote: 'Уведомление о рисках: Мы не можем и не гарантируем запись к конкретному специалисту. Наша плата взимается только за информационную помощь.',

    module4Title: 'Консультация по медицинским поездкам в Китай',
    module4Desc: 'Персонализированная консультация по планированию вашей медицинской поездки в Китай — правила, выбор больницы, логистическая поддержка.',
    module4Item1: 'Базовый план: от $800',
    module4Item2: 'Стандартный план: $1,200–$2,500',
    module4Item3: 'Премиум план: $4,800–$9,000 (включает организацию удаленной консультации, междисциплинарную координацию)',
    module4Excludes: 'Не включает: бронирование отелей, транспорт, оформление виз',

    module5Title: 'Бесплатные рекомендации третьих лиц',
    module5Desc: 'Мы свяжем вас с лицензированными туристическими агентствами и иммиграционными службами без дополнительной платы. Без комиссии, без наценки.',

    journeyTitle1: 'Путь только с записью',
    journeySteps1: [
      'Предоставьте паспорт, мед. записи, желаемое отделение/специалиста',
      'Получите персонализированное предложение',
      'Оплатите сервисный сбор + регистрационный сбор больницы напрямую больнице',
      'Мы подаем заявку через официальные каналы больницы',
      'Получите результат — успех с временем приема или возврат с альтернативными вариантами',
      'Данные надежно архивируются в течение 48 часов',
    ],
    journeyTitle2: 'Путь только с переводом',
    journeySteps2: [
      'Отправьте медицинские документы',
      'Получите профессиональный перевод',
      'Бесплатные правки в течение 3 дней',
      'Оригиналы документов надежно удаляются через 48 часов после доставки',
    ],
    journeyTitle3: 'Путь только с сопровождением',
    journeySteps3: [
      'Согласование даты приема',
      'Получите навигационный пакет по больнице за 48 часов до визита',
      'Сопровождение при регистрации',
      'Руководство для стационарных пациентов на протяжении всего пребывания',
      'Помощь при выписке',
      'Поддержка копирования мед. записей',
    ],
    journeyTitle4: 'Полный пакет',
    journeySteps4: [
      'Персонализированная консультация и создание плана',
      'Запись на прием',
      'Сопровождение в больнице по прибытии',
      'Поддержка перевода в реальном времени',
      'Последующее наблюдение после выписки',
      'Полная документация и архивирование',
    ],

    refundTitle: 'Правила возврата за запись на прием',
    refundNote: 'Все четыре категории услуг возвращаются независимо. Каждая следует своим правилам — без перекрестных вычетов между модулями.',
    refundHeader1: 'Этап возврата',
    refundHeader2: 'Процент возврата',
    refundRow1Label: 'Отмена за ≥7 дней до подачи',
    refundRow1Value: '100%',
    refundRow2Label: 'Подано, но слот еще не закреплен',
    refundRow2Value: '70%',
    refundRow3Label: 'Слот подтвержден, клиент отменяет',
    refundRow3Value: '30%',
    refundRow4Label: 'Больница отменяет / врач недоступен (не вина клиента)',
    refundRow4Value: '100%',
    refundRow5Label: 'Ложная информация клиента приводит к отмене',
    refundRow5Value: '0%',

    pricingTitle: 'Скидки и пакеты',
    pricingDiscount1: 'Запись + однодневное сопровождение: скидка 10%',
    pricingDiscount2: 'Запись к конкретному специалисту + 7-дневное сопровождение + перевод на месте: скидка 15% на весь пакет',
    pricingDiscount3: 'Первая запись на прием: $89 (только для новых клиентов)',
    pricingRegionTitle: 'Рекомендуемые пакеты по регионам',
    pricingRegionHeader1: 'Регион',
    pricingRegionHeader2: 'Рекомендуемый пакет',
    pricingRegionRow1Label: 'Северная Америка / Европа',
    pricingRegionRow1Value: 'Премиум полный пакет (Консультация + Запись + Сопровождение + Перевод)',
    pricingRegionRow2Label: 'Юго-Восточная Азия / Центральная Азия',
    pricingRegionRow2Value: 'Базовый основной (Запись + Однодневное сопровождение)',
    pricingRegionRow3Label: 'Африка / Ближний Восток',
    pricingRegionRow3Value: 'Гибкое предложение — Индивидуально под ваши потребности',

    contactTitle: 'Свяжитесь с нами',
    contactEmail: '3032785238@qq.com',
    contactDesc: 'Обратитесь за персональной консультацией. Мы отвечаем в течение 24 часов.',

    complianceTitle: 'Наши обязательства по соответствию',
    complianceItems: [
      'Никакого накопления или перепродажи слотов записи в больницах',
      'Никаких теневых или личных каналов для резервирования врачей',
      'Никаких обещаний 100% успеха для записи к конкретным специалистам',
      'Никакого сбора регистрационных сборов больниц — пациенты платят напрямую',
      'Никаких принудительных пакетов — каждый модуль можно приобрести отдельно',
      'Никакого мошенничества с личностью пациента или подделки документов',
      'Никаких подарков или платежей медперсоналу',
    ],

    disclaimer: 'MediBridge China предоставляет только немедицинские вспомогательные услуги. Мы не предоставляем медицинскую диагностику, лечение или рекомендации. Все медицинские решения должны приниматься после консультации с лицензированными медицинскими специалистами.',
    copyright: '© 2026 MediBridge China. Все права защищены.',

    langLabel: 'Язык',

    metaTitle: 'MediBridge China — Услуги трансграничной медицинской поддержки',
    metaDesc: 'Медицинский перевод, сопровождение в больнице, запись к специалистам и консультация по медицинским поездкам для иностранных пациентов, ищущих лечение в Китае. Пять независимых модулей, без пакетов. Соответствие прежде всего, официальные каналы.',

    journeyStepLabel: 'Шаг',
    journeyDetailLabel: 'Детали',
  },

  fr: {
    brandName: 'MediBridge China',
    tagline: 'Votre passerelle de confiance vers les soins médicaux en Chine',
    subtitle: 'Cinq modules de service indépendants — traduction médicale, accompagnement hospitalier, réservation de spécialistes, consultation de voyage médical et orientations gratuites vers des tiers. Choisissez ce dont vous avez besoin, sans forfait obligatoire.',
    ctaButton: 'Découvrir nos services',
    contactButton: 'Nous contacter',

    statYears: 'Expérience',
    statYearsValue: 'Plus de 30 ans',
    statModules: 'Modules de service',
    statModulesValue: '5 indépendants',
    statCompliance: 'Conformité',
    statComplianceValue: '100% officiel',

    sectionServices: 'Nos services',
    sectionJourney: 'Votre parcours',
    sectionRefund: 'Politique de remboursement',
    sectionPricing: 'Tarifs et réductions',
    sectionContact: 'Contactez-nous',
    sectionDisclaimer: 'La conformité d\'abord',

    module1Title: 'Traduction médicale indépendante',
    module1Desc: 'Services professionnels de traduction de documents médicaux et d\'interprétation en temps réel par des traducteurs médicaux certifiés.',
    module1Item1: 'Dossiers médicaux écrits : Standard 25 $/page | Spécialisé 40 $/page (urgent ≤50% de supplément)',
    module1Item2: 'Traduction en ligne en direct : 180 $/heure (traducteurs médicaux certifiés uniquement)',
    module1Item3: 'Interprétation sur place : 250 $/jour (accompagnement complet 8–10 heures)',

    module2Title: 'Accompagnement hospitalier complet',
    module2Desc: 'Accompagnement de bout en bout à chaque étape de votre visite à l\'hôpital — de l\'enregistrement à la sortie.',
    module2Item1: 'Jour unique : 180 $',
    module2Item2: 'Forfait 3 jours : 480 $ (moy. 160 $/jour)',
    module2Item3: 'Cycle complet 7 jours : 980 $ (moy. 140 $/jour)',
    module2Item4: 'Carte de suivi mensuel : 420 $ (une visite de suivi par mois)',
    module2Covers: 'Couvre : accompagnement à l\'admission, guidance pour patients hospitalisés, règlement de sortie, copie des dossiers médicaux',

    module3Title: 'Réservation anticipée et prise de rendez-vous avec spécialistes',
    module3Desc: 'Nous aidons à la réservation uniquement via les canaux officiels des hôpitaux. Pas de revente, pas de passe-droit, pas d\'arrangement interne.',
    module3ProductA: 'Produit A — Réservation sans spécialiste spécifié : 160 $/réservation (urgent 3 jours 224 $)',
    module3ProductB: 'Produit B — Réservation avec spécialiste nommé : 260 $/réservation (urgent 7 jours 390 $)',
    module3Compliance: 'Toutes les réservations via l\'application officielle/site web/département médical international de l\'hôpital uniquement. Aucune garantie de succès à 100% — les créneaux sont attribués uniquement par l\'hôpital.',
    module3RiskNote: 'Avis de risque : Nous ne pouvons pas et ne garantissons pas un rendez-vous avec un spécialiste spécifique. Nos frais sont uniquement pour l\'assistance informationnelle.',

    module4Title: 'Consultation de voyage médical en Chine',
    module4Desc: 'Consultation personnalisée pour planifier votre voyage médical en Chine — politiques, sélection d\'hôpital, conseils logistiques.',
    module4Item1: 'Plan de base : à partir de 800 $',
    module4Item2: 'Plan standard : 1 200 $–2 500 $',
    module4Item3: 'Plan premium : 4 800 $–9 000 $ (inclut l\'organisation de consultation à distance, coordination multidisciplinaire)',
    module4Excludes: 'Exclut : réservation d\'hôtel, transport, traitement des visas',

    module5Title: 'Orientations gratuites vers des tiers',
    module5Desc: 'Nous vous mettons en relation avec des agences de voyage agréées et des services d\'immigration sans frais supplémentaires. Pas de commission, pas de marge.',

    journeyTitle1: 'Parcours réservation seule',
    journeySteps1: [
      'Soumettre passeport, dossiers médicaux, département/spécialiste souhaité',
      'Recevoir un devis personnalisé',
      'Payer les frais de service + frais d\'inscription hospitalière directement à l\'hôpital',
      'Nous soumettons la réservation via les canaux officiels de l\'hôpital',
      'Recevoir le résultat — succès avec l\'heure du rendez-vous, ou remboursement avec options alternatives',
      'Données archivées en toute sécurité sous 48 heures',
    ],
    journeyTitle2: 'Parcours traduction seule',
    journeySteps2: [
      'Soumettre les documents médicaux',
      'Recevoir la traduction professionnelle',
      'Révisions gratuites dans les 3 jours',
      'Documents originaux supprimés en toute sécurité 48 heures après la livraison',
    ],
    journeyTitle3: 'Parcours accompagnement seul',
    journeySteps3: [
      'Confirmation de la date de rendez-vous',
      'Recevoir le pack de navigation hospitalière 48 heures avant la visite',
      'Accompagnement à l\'enregistrement',
      'Guidance tout au long du séjour hospitalier',
      'Aide au règlement de sortie',
      'Support de copie des dossiers médicaux',
    ],
    journeyTitle4: 'Parcours forfait complet',
    journeySteps4: [
      'Consultation personnalisée et création de plan',
      'Réservation de rendez-vous',
      'Accompagnement hospitalier à l\'arrivée',
      'Support de traduction en temps réel',
      'Suivi post-sortie',
      'Documentation et archivage complets',
    ],

    refundTitle: 'Politique de remboursement des réservations',
    refundNote: 'Les quatre catégories de service sont remboursables indépendamment. Chacune suit ses propres règles échelonnées — pas de déduction croisée entre les modules.',
    refundHeader1: 'Étape de remboursement',
    refundHeader2: 'Taux de remboursement',
    refundRow1Label: 'Annulation ≥7 jours avant la soumission',
    refundRow1Value: '100%',
    refundRow2Label: 'Soumis mais créneau non encore verrouillé',
    refundRow2Value: '70%',
    refundRow3Label: 'Créneau confirmé, le client annule',
    refundRow3Value: '30%',
    refundRow4Label: 'Annulation par l\'hôpital / médecin indisponible (non imputable au client)',
    refundRow4Value: '100%',
    refundRow5Label: 'Fausses informations du client entraînant l\'annulation',
    refundRow5Value: '0%',

    pricingTitle: 'Réductions et forfaits',
    pricingDiscount1: 'Réservation + accompagnement une journée : 10% de réduction',
    pricingDiscount2: 'Réservation spécialiste nommé + accompagnement 7 jours + traduction sur place : 15% de réduction sur le forfait total',
    pricingDiscount3: 'Première réservation : 89 $ (nouveaux clients uniquement)',
    pricingRegionTitle: 'Forfaits recommandés par région',
    pricingRegionHeader1: 'Région',
    pricingRegionHeader2: 'Forfait recommandé',
    pricingRegionRow1Label: 'Amérique du Nord / Europe',
    pricingRegionRow1Value: 'Forfait complet premium (Consultation + Réservation + Accompagnement + Traduction)',
    pricingRegionRow2Label: 'Asie du Sud-Est / Asie centrale',
    pricingRegionRow2Value: 'Essentiel de base (Réservation + Accompagnement une journée)',
    pricingRegionRow3Label: 'Afrique / Moyen-Orient',
    pricingRegionRow3Value: 'Devis flexible — Personnalisé selon vos besoins',

    contactTitle: 'Contactez-nous',
    contactEmail: '3032785238@qq.com',
    contactDesc: 'Contactez-nous pour une consultation personnalisée. Nous répondons dans les 24 heures.',

    complianceTitle: 'Nos engagements de conformité',
    complianceItems: [
      'Aucune accumulation ou revente de créneaux de rendez-vous hospitaliers',
      'Aucun canal officieux ou personnel pour réserver des médecins',
      'Aucune promesse de succès à 100% pour les réservations de spécialistes nommés',
      'Aucune collecte des frais d\'inscription hospitalière — les patients paient directement l\'hôpital',
      'Aucun forfait obligatoire — chaque module peut être acheté indépendamment',
      'Aucune fraude d\'identité du patient ou falsification de documents',
      'Aucun cadeau ou paiement au personnel médical',
    ],

    disclaimer: 'MediBridge China fournit uniquement des services de soutien non médicaux. Nous ne fournissons pas de diagnostic médical, de traitement ou de recommandations. Toutes les décisions médicales doivent être prises en consultation avec des professionnels de santé agréés.',
    copyright: '© 2026 MediBridge China. Tous droits réservés.',

    langLabel: 'Langue',

    metaTitle: 'MediBridge China — Services de soutien médical transfrontalier',
    metaDesc: 'Traduction médicale, accompagnement hospitalier, réservation de spécialistes et consultation de voyage médical pour les patients internationaux cherchant des soins en Chine. Cinq modules indépendants, sans forfait. Conformité d\'abord, canaux officiels.',

    journeyStepLabel: 'Étape',
    journeyDetailLabel: 'Détails',
  },

  es: {
    brandName: 'MediBridge China',
    tagline: 'Su puerta de confianza para la atención médica en China',
    subtitle: 'Cinco módulos de servicio independientes — traducción médica, acompañamiento hospitalario, reserva de especialistas, consulta de viajes médicos y referencias gratuitas a terceros. Elija lo que necesita, sin paquetes obligatorios.',
    ctaButton: 'Explorar servicios',
    contactButton: 'Contáctenos',

    statYears: 'Experiencia',
    statYearsValue: 'Más de 30 años',
    statModules: 'Módulos de servicio',
    statModulesValue: '5 independientes',
    statCompliance: 'Cumplimiento',
    statComplianceValue: '100% oficial',

    sectionServices: 'Nuestros servicios',
    sectionJourney: 'Su recorrido',
    sectionRefund: 'Política de reembolso',
    sectionPricing: 'Precios y descuentos',
    sectionContact: 'Contáctenos',
    sectionDisclaimer: 'Cumplimiento primero',

    module1Title: 'Traducción médica independiente',
    module1Desc: 'Servicios profesionales de traducción de documentos médicos e interpretación en tiempo real por traductores médicos certificados.',
    module1Item1: 'Registros médicos escritos: Estándar $25/pág. | Especializado $40/pág. (urgente ≤50% recargo)',
    module1Item2: 'Traducción en línea en vivo: $180/hora (solo traductores médicos certificados)',
    module1Item3: 'Interpretación presencial: $250/día (acompañamiento completo 8–10 horas)',

    module2Title: 'Acompañamiento hospitalario completo',
    module2Desc: 'Acompañamiento integral en cada paso de su visita al hospital — desde el registro hasta el alta.',
    module2Item1: 'Día único: $180',
    module2Item2: 'Paquete de 3 días: $480 (promedio $160/día)',
    module2Item3: 'Ciclo completo de 7 días: $980 (promedio $140/día)',
    module2Item4: 'Tarjeta de seguimiento mensual: $420 (una revisión por mes)',
    module2Covers: 'Cubre: acompañamiento en admisión, orientación para pacientes hospitalizados, liquidación de alta, copia de registros médicos',

    module3Title: 'Reserva anticipada de citas y especialistas',
    module3Desc: 'Ayudamos con la reserva solo a través de los canales oficiales del hospital. Sin reventa, sin saltar la cola, sin arreglos internos.',
    module3ProductA: 'Producto A — Reserva sin especialista específico: $160/reserva (urgente 3 días $224)',
    module3ProductB: 'Producto B — Reserva con especialista nombrado: $260/reserva (urgente 7 días $390)',
    module3Compliance: 'Todas las reservas solo a través de la aplicación/sitio web/departamento médico internacional oficial del hospital. No se garantiza el 100% de éxito — los cupos son asignados únicamente por el hospital.',
    module3RiskNote: 'Aviso de riesgo: No podemos ni garantizamos una cita con un especialista específico. Nuestra tarifa es solo por asistencia informativa.',

    module4Title: 'Consulta de viaje médico a China',
    module4Desc: 'Consulta personalizada para planificar su viaje médico a China — políticas, selección de hospital, orientación logística.',
    module4Item1: 'Plan básico: desde $800',
    module4Item2: 'Plan estándar: $1,200–$2,500',
    module4Item3: 'Plan premium: $4,800–$9,000 (incluye organización de consulta remota, coordinación multidisciplinaria)',
    module4Excludes: 'Excluye: reserva de hotel, transporte, tramitación de visas',

    module5Title: 'Referencias gratuitas a terceros',
    module5Desc: 'Lo conectamos con agencias de viajes autorizadas y servicios de inmigración sin costo adicional. Sin comisión, sin sobreprecio.',

    journeyTitle1: 'Recorrido solo con reserva',
    journeySteps1: [
      'Enviar pasaporte, registros médicos, departamento/especialista deseado',
      'Recibir presupuesto personalizado',
      'Pagar tarifa de servicio + tarifa de registro hospitalario directamente al hospital',
      'Presentamos la reserva a través de los canales oficiales del hospital',
      'Recibir resultado — éxito con hora de cita, o reembolso con opciones alternativas',
      'Datos archivados de forma segura en 48 horas',
    ],
    journeyTitle2: 'Recorrido solo con traducción',
    journeySteps2: [
      'Enviar documentos médicos',
      'Recibir traducción profesional',
      'Revisiones gratuitas dentro de los 3 días',
      'Documentos originales eliminados de forma segura 48 horas después de la entrega',
    ],
    journeyTitle3: 'Recorrido solo con acompañamiento',
    journeySteps3: [
      'Confirmar fecha de cita',
      'Recibir paquete de navegación hospitalaria 48 horas antes de la visita',
      'Acompañamiento en el registro de admisión',
      'Orientación durante toda la estancia hospitalaria',
      'Asistencia en la liquidación de alta',
      'Apoyo en copia de registros médicos',
    ],
    journeyTitle4: 'Recorrido con paquete completo',
    journeySteps4: [
      'Consulta personalizada y creación de plan',
      'Reserva de cita',
      'Acompañamiento hospitalario al llegar',
      'Soporte de traducción en tiempo real',
      'Seguimiento posterior al alta',
      'Documentación y archivo completos',
    ],

    refundTitle: 'Política de reembolso de reservas',
    refundNote: 'Las cuatro categorías de servicio son reembolsables de forma independiente. Cada una sigue sus propias reglas escalonadas — sin deducción cruzada entre módulos.',
    refundHeader1: 'Hito de reembolso',
    refundHeader2: 'Tasa de reembolso',
    refundRow1Label: 'Cancelación ≥7 días antes del envío',
    refundRow1Value: '100%',
    refundRow2Label: 'Enviado pero cupo aún no bloqueado',
    refundRow2Value: '70%',
    refundRow3Label: 'Cupo confirmado, el cliente cancela',
    refundRow3Value: '30%',
    refundRow4Label: 'El hospital cancela / médico no disponible (no por culpa del cliente)',
    refundRow4Value: '100%',
    refundRow5Label: 'Información falsa del cliente causa cancelación',
    refundRow5Value: '0%',

    pricingTitle: 'Descuentos y paquetes',
    pricingDiscount1: 'Reserva + acompañamiento de un día: 10% de descuento',
    pricingDiscount2: 'Reserva con especialista nombrado + acompañamiento 7 días + traducción presencial: 15% de descuento en el paquete total',
    pricingDiscount3: 'Primera reserva de cita: $89 (solo nuevos clientes)',
    pricingRegionTitle: 'Paquetes recomendados por región',
    pricingRegionHeader1: 'Región',
    pricingRegionHeader2: 'Paquete recomendado',
    pricingRegionRow1Label: 'Norteamérica / Europa',
    pricingRegionRow1Value: 'Paquete completo premium (Consulta + Reserva + Acompañamiento + Traducción)',
    pricingRegionRow2Label: 'Sudeste asiático / Asia central',
    pricingRegionRow2Value: 'Esencial básico (Reserva + Acompañamiento de un día)',
    pricingRegionRow3Label: 'África / Medio Oriente',
    pricingRegionRow3Value: 'Cotización flexible — Personalizado a sus necesidades',

    contactTitle: 'Contáctenos',
    contactEmail: '3032785238@qq.com',
    contactDesc: 'Contáctenos para una consulta personalizada. Respondemos dentro de las 24 horas.',

    complianceTitle: 'Nuestros compromisos de cumplimiento',
    complianceItems: [
      'Sin acaparamiento ni reventa de cupos de citas hospitalarias',
      'Sin canales internos o personales para reservar médicos',
      'Sin promesa de 100% de éxito para reservas de especialistas específicos',
      'Sin cobro de tarifas de registro hospitalario — los pacientes pagan directamente al hospital',
      'Sin paquetes obligatorios — cada módulo se puede comprar de forma independiente',
      'Sin fraude de identidad del paciente ni falsificación de documentos',
      'Sin regalos ni pagos al personal médico',
    ],

    disclaimer: 'MediBridge China proporciona solo servicios de apoyo no médico. No proporcionamos diagnóstico, tratamiento ni recomendaciones médicas. Todas las decisiones médicas deben tomarse en consulta con profesionales de la salud autorizados.',
    copyright: '© 2026 MediBridge China. Todos los derechos reservados.',

    langLabel: 'Idioma',

    metaTitle: 'MediBridge China — Servicios de apoyo médico transfronterizo',
    metaDesc: 'Traducción médica, acompañamiento hospitalario, reserva de especialistas y consulta de viajes médicos para pacientes internacionales que buscan atención en China. Cinco módulos independientes, sin paquetes. Cumplimiento primero, canales oficiales.',

    journeyStepLabel: 'Paso',
    journeyDetailLabel: 'Detalles',
  },

  zh: {
    brandName: '华医通 MediBridge China',
    tagline: '来华就医，一步到位',
    subtitle: '五大独立服务模块 — 医学翻译、院内陪诊、专家预约、来华医疗咨询、第三方免费对接。按需选择，自由组合，无强制捆绑。',
    ctaButton: '了解我们的服务',
    contactButton: '联系我们',

    statYears: '行业经验',
    statYearsValue: '30+ 年',
    statModules: '服务模块',
    statModulesValue: '5 大独立',
    statCompliance: '合规保障',
    statComplianceValue: '100% 官方渠道',

    sectionServices: '服务项目',
    sectionJourney: '服务流程',
    sectionRefund: '退费规则',
    sectionPricing: '定价与优惠',
    sectionContact: '联系我们',
    sectionDisclaimer: '合规优先',

    module1Title: '独立医学翻译服务',
    module1Desc: '由持证医学翻译提供的专业病历翻译和实时口译服务。',
    module1Item1: '书面病历翻译：标准 $25/页 | 专家 $40/页（加急上浮 ≤50%）',
    module1Item2: '线上实时翻译：$180/小时（仅限持证医学翻译）',
    module1Item3: '线下现场翻译：$250/天（全天 8-10 小时陪同）',

    module2Title: '全流程院内陪诊服务',
    module2Desc: '从入院到出院的全程陪伴，覆盖挂号、检查、住院、结算、病历复印每一个环节。',
    module2Item1: '单日陪诊：$180',
    module2Item2: '3 天打包：$480（日均 $160）',
    module2Item3: '7 天全周期：$980（日均 $140）',
    module2Item4: '月度复查卡：$420（每月一次复查陪诊）',
    module2Covers: '覆盖范围：入院检查陪同、住院引导、出院结算、病案复印全流程',

    module3Title: '提前挂号与专家预约服务',
    module3Desc: '仅通过医院官方渠道协助预约。不囤号、不倒卖、不走后门。',
    module3ProductA: '产品 A — 非指定专科预约：$160/单（加急 3 日内 $224）',
    module3ProductB: '产品 B — 指定专家精准预约：$260/单（加急 7 日内 $390）',
    module3Compliance: '所有预约仅通过医院官方 APP/官网/国际医疗部操作。不保证100%成功——号源由医院统一分配。',
    module3RiskNote: '风险提示：我方无法也不承诺保证指定专家预约一定成功。服务费仅为信息填报协助费用。',

    module4Title: '来华就医行程咨询',
    module4Desc: '为您量身定制来华就医方案——包含政策解读、医院选择、行程规划建议。',
    module4Item1: '基础版：$800 起',
    module4Item2: '标准版：$1,200–$2,500',
    module4Item3: '尊享版：$4,800–$9,000（含远程会诊协调、多学科协作安排）',
    module4Excludes: '不含：酒店预订、交通安排、签证办理',

    module5Title: '第三方资源免费对接',
    module5Desc: '免费为您引荐持证旅行社和出入境服务机构。无佣金，无差价，纯公益对接。',

    journeyTitle1: '仅预约挂号流程',
    journeySteps1: [
      '提交护照、病历、目标科室或专家姓名',
      '获取个性化报价',
      '支付服务费 + 自行在线缴纳医院挂号费',
      '我方通过医院官方渠道提交预约',
      '收到预约结果——成功则告知就诊时间，失败则执行退费并提供备选方案',
      '48 小时内资料脱敏归档',
    ],
    journeyTitle2: '仅医学翻译流程',
    journeySteps2: [
      '提交医学文件',
      '收到专业翻译稿',
      '3 日内免费修改',
      '交付后 48 小时原始文件安全删除',
    ],
    journeyTitle3: '仅院内陪诊流程',
    journeySteps3: [
      '匹配就诊日期',
      '就诊前 48 小时收到医院导航包',
      '入院登记陪同',
      '住院期间全程引导',
      '出院结算协助',
      '病历复印支持',
    ],
    journeyTitle4: '全套组合流程',
    journeySteps4: [
      '个性化咨询与方案制定',
      '预约挂号',
      '到院陪诊',
      '实时翻译支持',
      '出院后续跟进',
      '完整归档文档',
    ],

    refundTitle: '挂号预约退费政策',
    refundNote: '四大服务类型独立退费，各自按对应阶梯规则计算，互不抵扣。',
    refundHeader1: '退费节点',
    refundHeader2: '退费比例',
    refundRow1Label: '提交前 7 天取消',
    refundRow1Value: '100%',
    refundRow2Label: '已提交、号源未锁定',
    refundRow2Value: '70%',
    refundRow3Label: '号源已确认、客户单方取消',
    refundRow3Value: '30%',
    refundRow4Label: '医院停诊/号源取消（非客户原因）',
    refundRow4Value: '100%',
    refundRow5Label: '客户提供虚假信息导致作废',
    refundRow5Value: '0%',

    pricingTitle: '组合优惠',
    pricingDiscount1: '挂号 + 单日陪诊：总价减免 10%',
    pricingDiscount2: '指定专家预约 + 7 天陪诊 + 现场翻译：全套减免 15%',
    pricingDiscount3: '首次体验价（单独挂号）：$89（仅限新客户）',
    pricingRegionTitle: '区域化套餐推荐',
    pricingRegionHeader1: '客群来源',
    pricingRegionHeader2: '推荐套餐',
    pricingRegionRow1Label: '北美 / 欧洲',
    pricingRegionRow1Value: '尊享版全套（咨询 + 挂号 + 陪诊 + 翻译）',
    pricingRegionRow2Label: '东南亚 / 中亚',
    pricingRegionRow2Value: '经济版核心（挂号 + 单日陪诊）',
    pricingRegionRow3Label: '非洲 / 中东',
    pricingRegionRow3Value: '灵活报价 — 按需定制',

    contactTitle: '联系我们',
    contactEmail: '3032785238@qq.com',
    contactDesc: '现在联系获取个性化方案，我们 24 小时内回复。',

    complianceTitle: '合规承诺',
    complianceItems: [
      '不囤积、不倒卖医院号源',
      '不走后门、不通过私人关系预留号源',
      '不承诺 100% 挂到指定专家',
      '不代收医院挂号费——患者直接向医院支付',
      '不强制捆绑——每个模块均可单独购买',
      '不冒用他人身份、不伪造证件',
      '不向医护人员赠送礼品或金钱',
    ],

    disclaimer: '华医通 MediBridge China 仅提供非诊疗配套服务。我们不提供医疗诊断、治疗或建议。所有医疗决策应由持有执业资质的医疗专业人员做出。',
    copyright: '© 2026 华医通 MediBridge China. 版权所有。',

    langLabel: '语言',

    metaTitle: '华医通 MediBridge China — 跨境来华就医配套服务',
    metaDesc: '为来华外籍患者提供医学翻译、院内陪诊、专家预约、就医行程咨询。五大独立模块，自由组合，无强制捆绑。合规优先，全程官方渠道。',

    journeyStepLabel: '步骤',
    journeyDetailLabel: '详情',
  },
};

export default translations;
