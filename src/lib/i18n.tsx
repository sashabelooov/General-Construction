import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'uz' | 'ru' | 'en';

interface Translations {
  [key: string]: {
    uz: string;
    ru: string;
    en: string;
  };
}

const translations: Translations = {
  // Navbar
  'nav.projects': {
    uz: 'Bizning loyihalar',
    ru: 'Наши проекты',
    en: 'Our Projects',
  },
  'nav.about': {
    uz: 'Kompaniya haqida',
    ru: 'О компании',
    en: 'About Us',
  },
  'nav.news': {
    uz: 'Yangiliklar',
    ru: 'Новости',
    en: 'News',
  },
  'nav.contact': {
    uz: 'Kontakt',
    ru: 'Контакты',
    en: 'Contact',
  },
  'nav.connect': {
    uz: "Bog'lanish",
    ru: 'Связаться',
    en: 'Contact Us',
  },

  // Hero Section
  'hero.subtitle': {
    uz: 'Premium turar-joy majmualari',
    ru: 'Премиум жилые комплексы',
    en: 'Premium Residential Complexes',
  },
  'hero.title': {
    uz: "Orzuingizdagi uyni biz bilan toping",
    ru: 'Найдите дом своей мечты с нами',
    en: 'Find Your Dream Home With Us',
  },
  'hero.description': {
    uz: "Zamonaviy me'morchilik, qulay infrastruktura va ishonchli sifat. Biz har bir oila uchun mukammal uy yaratamiz.",
    ru: 'Современная архитектура, удобная инфраструктура и надежное качество. Мы создаем идеальный дом для каждой семьи.',
    en: 'Modern architecture, convenient infrastructure and reliable quality. We create the perfect home for every family.',
  },
  'hero.consultation': {
    uz: 'Konsultatsiya olish',
    ru: 'Получить консультацию',
    en: 'Get Consultation',
  },
  'hero.viewProject': {
    uz: 'Loyihani ko\'rish',
    ru: 'Смотреть проект',
    en: 'View Project',
  },
  'hero.viewProjects': {
    uz: 'Loyihalarni ko\'rish',
    ru: 'Смотреть проекты',
    en: 'View Projects',
  },
  'hero.slide1.title': {
    uz: 'Kelajagingizdagi uy',
    ru: 'Ваш будущий дом',
    en: 'Your Future Home',
  },
  'hero.slide1.subtitle': {
    uz: 'bugundan boshlanadi',
    ru: 'начинается сегодня',
    en: 'starts today',
  },
  'hero.slide1.description': {
    uz: 'Premium sifatli turar-joy majmualari. Zamonaviy dizayn, qulay to\'lov shartlari va ishonchli quruvchi.',
    ru: 'Премиум качественные жилые комплексы. Современный дизайн, удобные условия оплаты и надежный застройщик.',
    en: 'Premium quality residential complexes. Modern design, convenient payment terms and reliable builder.',
  },
  'hero.slide2.title': {
    uz: 'Hashamatli hayot',
    ru: 'Роскошная жизнь',
    en: 'Luxurious Life',
  },
  'hero.slide2.subtitle': {
    uz: 'eng yaxshi joyda',
    ru: 'в лучшем месте',
    en: 'in the best location',
  },
  'hero.slide2.description': {
    uz: 'Shahar markazida joylashgan zamonaviy turar-joy majmualari. Barcha qulayliklar bir joyda.',
    ru: 'Современные жилые комплексы, расположенные в центре города. Все удобства в одном месте.',
    en: 'Modern residential complexes located in the city center. All amenities in one place.',
  },
  'hero.slide3.title': {
    uz: 'Sifat va ishonch',
    ru: 'Качество и доверие',
    en: 'Quality and Trust',
  },
  'hero.slide3.subtitle': {
    uz: 'bizning ustuvorligimiz',
    ru: 'наш приоритет',
    en: 'our priority',
  },
  'hero.slide3.description': {
    uz: '10+ yillik tajriba, 50+ muvaffaqiyatli loyiha. Oilangiz uchun eng yaxshi tanlov.',
    ru: '10+ лет опыта, 50+ успешных проектов. Лучший выбор для вашей семьи.',
    en: '10+ years of experience, 50+ successful projects. The best choice for your family.',
  },

  // Projects Section
  'projects.subtitle': {
    uz: 'Bizning loyihalar',
    ru: 'Наши проекты',
    en: 'Our Projects',
  },
  'projects.title': {
    uz: 'Premium turar-joy majmualari',
    ru: 'Премиум жилые комплексы',
    en: 'Premium Residential Complexes',
  },
  'projects.description': {
    uz: "Zamonaviy me'morchilik, qulay infrastruktura va ishonchli sifat bilan ajralib turuvchi loyihalarimiz",
    ru: 'Наши проекты отличаются современной архитектурой, удобной инфраструктурой и надежным качеством',
    en: 'Our projects featuring modern architecture, convenient infrastructure and reliable quality',
  },
  'projects.sold': {
    uz: 'Sotilgan',
    ru: 'Продано',
    en: 'Sold',
  },
  'projects.apartment': {
    uz: 'xonadon',
    ru: 'квартир',
    en: 'apartments',
  },
  'projects.more': {
    uz: 'Batafsil',
    ru: 'Подробнее',
    en: 'Details',
  },
  'projects.all': {
    uz: 'Barcha loyihalar',
    ru: 'Все проекты',
    en: 'All Projects',
  },
  'projects.notFound': {
    uz: 'Ushbu filtrlar bo\'yicha loyihalar topilmadi',
    ru: 'Проекты по данным фильтрам не найдены',
    en: 'No projects found matching these filters',
  },
  'projects.status.sold': {
    uz: 'Topshirilgan',
    ru: 'Сдан',
    en: 'Completed',
  },
  'projects.status.sale': {
    uz: 'Sotuvda',
    ru: 'В продаже',
    en: 'For Sale',
  },
  'projects.status.building': {
    uz: 'Qurilish jarayonida',
    ru: 'Строится',
    en: 'Under Construction',
  },

  // Filter Section
  'filter.subtitle': {
    uz: 'Xonadon tanlash',
    ru: 'Выбор квартиры',
    en: 'Choose Apartment',
  },
  'filter.title': {
    uz: 'O\'zingizga mos uyni toping',
    ru: 'Найдите подходящую квартиру',
    en: 'Find Your Perfect Apartment',
  },
  'filter.description': {
    uz: 'Filtrlar yordamida o\'zingizga mos xonadonni oson toping',
    ru: 'Легко найдите подходящую квартиру с помощью фильтров',
    en: 'Easily find the right apartment with filters',
  },
  'filter.rooms': {
    uz: 'Xonalar',
    ru: 'Комнаты',
    en: 'Rooms',
  },
  'filter.floor': {
    uz: 'Qavat',
    ru: 'Этаж',
    en: 'Floor',
  },
  'filter.project': {
    uz: 'Loyiha',
    ru: 'Проект',
    en: 'Project',
  },
  'filter.area': {
    uz: 'Maydon',
    ru: 'Площадь',
    en: 'Area',
  },
  'filter.delivery': {
    uz: 'Topshirish',
    ru: 'Сдача',
    en: 'Delivery',
  },
  'filter.all': {
    uz: 'Barchasi',
    ru: 'Все',
    en: 'All',
  },
  'filter.label': {
    uz: 'Filtr:',
    ru: 'Фильтр:',
    en: 'Filter:',
  },
  'filter.status.all': {
    uz: 'Barchasi',
    ru: 'Все',
    en: 'All',
  },
  'filter.status.forSale': {
    uz: 'Sotuvda',
    ru: 'В продаже',
    en: 'For Sale',
  },
  'filter.status.underConstruction': {
    uz: 'Qurilish jarayonida',
    ru: 'Строится',
    en: 'Under Construction',
  },
  'filter.status.completed': {
    uz: 'Topshirilgan',
    ru: 'Сдан',
    en: 'Completed',
  },
  'filter.class.all': {
    uz: 'Barchasi',
    ru: 'Все',
    en: 'All',
  },
  'filter.class.comfort': {
    uz: 'Komfort',
    ru: 'Комфорт',
    en: 'Comfort',
  },
  'filter.class.business': {
    uz: 'Biznes',
    ru: 'Бизнес',
    en: 'Business',
  },
  'filter.class.premium': {
    uz: 'Premium',
    ru: 'Премиум',
    en: 'Premium',
  },
  'filter.search': {
    uz: 'Qidirish',
    ru: 'Поиск',
    en: 'Search',
  },
  'filter.clear': {
    uz: 'Tozalash',
    ru: 'Очистить',
    en: 'Clear',
  },
  'filter.showMore': {
    uz: 'Yana ko\'rsatish',
    ru: 'Показать еще',
    en: 'Show More',
  },
  'filter.learnMore': {
    uz: 'Batafsil',
    ru: 'Подробнее',
    en: 'Learn More',
  },
  'filter.apartmentNumber': {
    uz: 'Kvartira raqami',
    ru: 'Номер квартиры',
    en: 'Apartment #',
  },
  'filter.apartmentArea': {
    uz: 'Maydon',
    ru: 'Площадь',
    en: 'Area',
  },
  'filter.apartmentRooms': {
    uz: 'Xonalar',
    ru: 'Комнат',
    en: 'Rooms',
  },
  'filter.apartmentFloor': {
    uz: 'Qavat',
    ru: 'Этаж',
    en: 'Floor',
  },
  'filter.apartmentDelivery': {
    uz: 'Topshirish yili',
    ru: 'Год сдачи',
    en: 'Delivery Year',
  },
  'filter.apartmentProject': {
    uz: 'Loyiha',
    ru: 'Проект',
    en: 'Project',
  },

  // Consultation Section
  'consultation.subtitle': {
    uz: 'Bepul konsultatsiya',
    ru: 'Бесплатная консультация',
    en: 'Free Consultation',
  },
  'consultation.title': {
    uz: 'Bepul konsultatsiya',
    ru: 'Бесплатная консультация',
    en: 'Free Consultation',
  },
  'consultation.description': {
    uz: 'Professional mutaxassislarimiz sizga mos uy tanlashda yordam beradi. Bepul konsultatsiya olish uchun formani to\'ldiring yoki qo\'ng\'iroq qiling.',
    ru: 'Наши профессиональные специалисты помогут вам выбрать подходящий дом. Заполните форму или позвоните для получения бесплатной консультации.',
    en: 'Our professional experts will help you choose the right home. Fill out the form or call for a free consultation.',
  },
  'consultation.quickResponse': {
    uz: 'Tez javob',
    ru: 'Быстрый ответ',
    en: 'Quick Response',
  },
  'consultation.quickResponseDesc': {
    uz: '15 daqiqa ichida qo\'ng\'iroq',
    ru: 'Звонок в течение 15 минут',
    en: 'Call within 15 minutes',
  },
  'consultation.freeAdvice': {
    uz: 'Bepul maslahat',
    ru: 'Бесплатная консультация',
    en: 'Free Consultation',
  },
  'consultation.freeAdviceDesc': {
    uz: 'Hech qanday to\'lovsiz',
    ru: 'Без каких-либо платежей',
    en: 'No payment required',
  },
  'consultation.support247': {
    uz: '24/7 qo\'llab-quvvatlash',
    ru: 'Поддержка 24/7',
    en: '24/7 Support',
  },
  'consultation.support247Desc': {
    uz: 'Har doim aloqadamiz',
    ru: 'Всегда на связи',
    en: 'Always in touch',
  },
  'consultation.formTitle': {
    uz: 'So\'rov qoldiring',
    ru: 'Оставьте заявку',
    en: 'Leave a Request',
  },
  'consultation.formDesc': {
    uz: 'Ma\'lumotlaringizni qoldiring, tez orada bog\'lanamiz',
    ru: 'Оставьте свои данные, мы свяжемся с вами в ближайшее время',
    en: 'Leave your details, we will contact you soon',
  },
  'consultation.name': {
    uz: 'Ismingiz',
    ru: 'Ваше имя',
    en: 'Your Name',
  },
  'consultation.phone': {
    uz: 'Telefon raqamingiz',
    ru: 'Ваш телефон',
    en: 'Your Phone',
  },
  'consultation.submit': {
    uz: 'Yuborish',
    ru: 'Отправить',
    en: 'Submit',
  },
  'consultation.sending': {
    uz: 'Yuborilmoqda...',
    ru: 'Отправка...',
    en: 'Sending...',
  },
  'consultation.success': {
    uz: 'So\'rovingiz qabul qilindi! Tez orada siz bilan bog\'lanamiz.',
    ru: 'Ваша заявка принята! Мы свяжемся с вами в ближайшее время.',
    en: 'Your request has been received! We will contact you soon.',
  },
  'consultation.successTitle': {
    uz: 'Rahmat!',
    ru: 'Спасибо!',
    en: 'Thank you!',
  },

  // About Page
  'about.subtitle': {
    uz: 'Kompaniya haqida',
    ru: 'О компании',
    en: 'About Company',
  },
  'about.description': {
    uz: '2014-yildan beri O\'zbekiston qurilish bozorida faoliyat yuritayotgan yetakchi kompaniya. Biz zamonaviy turar-joy majmualari qurish va oilalarga orzularidagi uyni taqdim etish bilan shug\'ullanamiz.',
    ru: 'Ведущая компания на строительном рынке Узбекистана с 2014 года. Мы занимаемся строительством современных жилых комплексов и предоставлением семьям дома их мечты.',
    en: 'A leading company in the construction market of the USA since 2014. We are engaged in the construction of modern residential complexes and providing families with their dream home.',
  },
  'about.stats.projects': {
    uz: 'Topshirilgan loyihalar',
    ru: 'Сданных проектов',
    en: 'Completed Projects',
  },
  'about.stats.families': {
    uz: 'Baxtli oilalar',
    ru: 'Счастливых семей',
    en: 'Happy Families',
  },
  'about.stats.experience': {
    uz: 'Yillik tajriba',
    ru: 'Лет опыта',
    en: 'Years of Experience',
  },
  'about.stats.area': {
    uz: 'Kv.m qurilgan maydon',
    ru: 'Кв.м построенной площади',
    en: 'Sq.m Built Area',
  },
  'about.values.subtitle': {
    uz: 'Bizning qadriyatlarimiz',
    ru: 'Наши ценности',
    en: 'Our Values',
  },
  'about.values.title': {
    uz: 'Nima uchun bizni tanlashadi?',
    ru: 'Почему выбирают нас?',
    en: 'Why Do People Choose Us?',
  },
  'about.values.quality': {
    uz: 'Sifat',
    ru: 'Качество',
    en: 'Quality',
  },
  'about.values.qualityDesc': {
    uz: 'Biz har bir loyihada eng yuqori sifat standartlariga rioya qilamiz.',
    ru: 'Мы соблюдаем высочайшие стандарты качества в каждом проекте.',
    en: 'We adhere to the highest quality standards in every project.',
  },
  'about.values.trust': {
    uz: 'Ishonch',
    ru: 'Доверие',
    en: 'Trust',
  },
  'about.values.trustDesc': {
    uz: '10 yillik tajriba davomida minglab oilalarning ishonchini qozondik.',
    ru: 'За 10 лет опыта мы заслужили доверие тысяч семей.',
    en: 'Over 10 years of experience, we have earned the trust of thousands of families.',
  },
  'about.values.innovation': {
    uz: 'Innovatsiya',
    ru: 'Инновации',
    en: 'Innovation',
  },
  'about.values.innovationDesc': {
    uz: 'Zamonaviy me\'morchilik yechimlari va aqlli uy texnologiyalarini joriy etamiz.',
    ru: 'Мы внедряем современные архитектурные решения и технологии умного дома.',
    en: 'We implement modern architectural solutions and smart home technologies.',
  },
  'about.values.customer': {
    uz: 'Mijoz uchun',
    ru: 'Для клиента',
    en: 'Customer Focus',
  },
  'about.values.customerDesc': {
    uz: 'Mijozlarimizning qulayligi va mamnuniyati bizning asosiy maqsadimiz.',
    ru: 'Комфорт и удовлетворенность наших клиентов - наша главная цель.',
    en: 'The comfort and satisfaction of our customers is our main goal.',
  },
  'about.mission.title': {
    uz: 'Bizning missiyamiz',
    ru: 'Наша миссия',
    en: 'Our Mission',
  },
  'about.mission.text': {
    uz: 'Har bir oilaga qulay va sifatli turar-joy taqdim etish.',
    ru: 'Предоставить каждой семье комфортное и качественное жилье.',
    en: 'To provide every family with comfortable and quality housing.',
  },

  // News Page
  'news.title': {
    uz: 'Yangiliklar',
    ru: 'Новости',
    en: 'News',
  },
  'news.description': {
    uz: 'Kompaniyamiz va loyihalarimiz haqida so\'nggi yangiliklar',
    ru: 'Последние новости о нашей компании и проектах',
    en: 'Latest news about our company and projects',
  },
  'news.all': {
    uz: 'Barchasi',
    ru: 'Все',
    en: 'All',
  },
  'news.category.news': {
    uz: 'Yangiliklar',
    ru: 'Новости',
    en: 'News',
  },
  'news.category.sales': {
    uz: 'Aksiyalar',
    ru: 'Акции',
    en: 'Sales',
  },
  'news.more': {
    uz: 'Ko\'proq',
    ru: 'Подробнее',
    en: 'More',
  },
  'news.notFound': {
    uz: 'Ushbu kategoriya bo\'yicha yangiliklar topilmadi',
    ru: 'Новости по данной категории не найдены',
    en: 'No news found in this category',
  },
  'news.backToNews': {
    uz: 'Yangiliklarга qaytish',
    ru: 'Вернуться к новостям',
    en: 'Back to News',
  },
  'news.relatedNews': {
    uz: 'Boshqa yangiliklar',
    ru: 'Другие новости',
    en: 'Related News',
  },
  'news.shareNews': {
    uz: 'Ulashish',
    ru: 'Поделиться',
    en: 'Share',
  },

  // Contact Page
  'contact.title': {
    uz: 'Biz bilan bog\'laning',
    ru: 'Свяжитесь с нами',
    en: 'Contact Us',
  },
  'contact.description': {
    uz: 'Savollaringiz bormi? Biz bilan bog\'laning!',
    ru: 'Есть вопросы? Свяжитесь с нами!',
    en: 'Have questions? Contact us!',
  },
  'contact.office': {
    uz: 'Bosh ofis',
    ru: 'Головной офис',
    en: 'Head Office',
  },
  'contact.salesOffice': {
    uz: 'Sotuv ofisi',
    ru: 'Офис продаж',
    en: 'Sales Office',
  },
  'contact.phone': {
    uz: 'Telefon',
    ru: 'Телефон',
    en: 'Phone',
  },
  'contact.email': {
    uz: 'Elektron pochta',
    ru: 'Электронная почта',
    en: 'Email',
  },

  // Footer
  'footer.company': {
    uz: 'General Construction - O\'zbekistonning yetakchi qurilish kompaniyasi',
    ru: 'General Construction - ведущая строительная компания Узбекистана',
    en: 'General Construction - leading construction company in the USA',
  },
  'footer.quickLinks': {
    uz: 'Tezkor havolalar',
    ru: 'Быстрые ссылки',
    en: 'Quick Links',
  },
  'footer.contactUs': {
    uz: 'Bog\'lanish',
    ru: 'Контакты',
    en: 'Contact Us',
  },
  'footer.rights': {
    uz: 'Barcha huquqlar himoyalangan',
    ru: 'Все права защищены',
    en: 'All rights reserved',
  },

  // Common
  'common.loading': {
    uz: 'Yuklanmoqda...',
    ru: 'Загрузка...',
    en: 'Loading...',
  },
  'common.error': {
    uz: 'Xatolik yuz berdi',
    ru: 'Произошла ошибка',
    en: 'An error occurred',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
