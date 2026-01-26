import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n";

export const newsItems = [
  {
    id: 1,
    title: {
      uz: "Navruz Residence loyihasi 70% ga tayyor",
      ru: "Проект Navruz Residence готов на 70%",
      en: "Navruz Residence project is 70% complete",
    },
    excerpt: {
      uz: "Yunusobod tumanida qurilayotgan Navruz Residence loyihasida qurilish ishlari jadal davom etmoqda...",
      ru: "Строительные работы на проекте Navruz Residence в Юнусабадском районе продолжаются активно...",
      en: "Construction work on the Navruz Residence project in Yunusobod district is progressing rapidly...",
    },
    content: {
      uz: "Yunusobod tumanida qurilayotgan Navruz Residence loyihasida qurilish ishlari jadal davom etmoqda. Loyiha 2025-yilning 4-choragida topshirilishi rejalashtirilgan. Hozirda bino konstruksiyasi to'liq qurilgan va ichki pardozlash ishlari boshlangan. Loyihada jami 240 ta zamonaviy xonadon qurilmoqda. Har bir xonadon yuqori sifatli materiallar bilan jihozlanadi.",
      ru: "Строительные работы на проекте Navruz Residence в Юнусабадском районе продолжаются активно. Проект планируется сдать в 4-м квартале 2025 года. В настоящее время конструкция здания полностью завершена и начаты внутренние отделочные работы. В проекте всего 240 современных квартир. Каждая квартира оснащена высококачественными материалами.",
      en: "Construction work on the Navruz Residence project in Yunusobod district is progressing rapidly. The project is scheduled for completion in Q4 2025. Currently, the building structure is fully completed and interior finishing work has begun. The project includes a total of 240 modern apartments. Each apartment is equipped with high-quality materials.",
    },
    date: "2024-01-15",
    image: "/placeholder.svg",
    category: "Yangiliklar",
  },
  {
    id: 2,
    title: {
      uz: "Yangi to'lov shartlari e'lon qilindi",
      ru: "Объявлены новые условия оплаты",
      en: "New payment terms announced",
    },
    excerpt: {
      uz: "Mijozlarimiz uchun yanada qulay to'lov rejalarini taqdim etamiz. Endi siz xonadon sotib olishingiz mumkin...",
      ru: "Мы предлагаем более удобные планы оплаты для наших клиентов. Теперь вы можете купить квартиру...",
      en: "We offer more convenient payment plans for our customers. Now you can buy an apartment...",
    },
    content: {
      uz: "Mijozlarimiz uchun yanada qulay to'lov rejalarini taqdim etamiz. Endi siz xonadon sotib olishingiz mumkin 0% boshlang'ich to'lov bilan! Oylik to'lovlar 36 oygacha bo'linadi. Bundan tashqari, doimiy mijozlarimiz uchun maxsus chegirmalar ham mavjud. To'lov shartlari haqida batafsil ma'lumot olish uchun sotuv bo'limimiz bilan bog'laning.",
      ru: "Мы предлагаем более удобные планы оплаты для наших клиентов. Теперь вы можете купить квартиру с 0% первоначальным взносом! Ежемесячные платежи распределяются на срок до 36 месяцев. Кроме того, для постоянных клиентов действуют специальные скидки. Для получения подробной информации об условиях оплаты свяжитесь с нашим отделом продаж.",
      en: "We offer more convenient payment plans for our customers. Now you can buy an apartment with 0% down payment! Monthly payments are spread over up to 36 months. In addition, special discounts are available for regular customers. For detailed information about payment terms, contact our sales department.",
    },
    date: "2024-01-10",
    image: "/placeholder.svg",
    category: "Aksiyalar",
  },
  {
    id: 3,
    title: {
      uz: "Grand Tower loyihasi muvaffaqiyatli topshirildi",
      ru: "Проект Grand Tower успешно сдан",
      en: "Grand Tower project successfully completed",
    },
    excerpt: {
      uz: "Mirzo Ulug'bek tumanidagi Grand Tower loyihasi barcha qurilish ishlari yakunlanib, egalarga topshirildi...",
      ru: "Проект Grand Tower в Мирзо-Улугбекском районе полностью завершен и передан владельцам...",
      en: "The Grand Tower project in Mirzo Ulugbek district has been fully completed and handed over to owners...",
    },
    content: {
      uz: "Mirzo Ulug'bek tumanidagi Grand Tower loyihasi barcha qurilish ishlari yakunlanib, egalarga topshirildi. 320 ta xonadonli ushbu loyiha bizning eng yirik loyihalarimizdan biri hisoblanadi. Barcha xonadonlar zamonaviy jihozlar bilan ta'minlangan. Atrofida yashil hudud, bolalar maydoni va sport zallar mavjud.",
      ru: "Проект Grand Tower в Мирзо-Улугбекском районе полностью завершен и передан владельцам. Этот проект с 320 квартирами является одним из наших крупнейших проектов. Все квартиры оснащены современным оборудованием. Вокруг есть зеленая зона, детская площадка и спортивные залы.",
      en: "The Grand Tower project in Mirzo Ulugbek district has been fully completed and handed over to owners. This project with 320 apartments is one of our largest projects. All apartments are equipped with modern facilities. There is a green area, playground and sports halls around.",
    },
    date: "2024-01-05",
    image: "/placeholder.svg",
    category: "Yangiliklar",
  },
  {
    id: 4,
    title: {
      uz: "2024-yil uchun yangi loyihalar e'lon qilindi",
      ru: "Объявлены новые проекты на 2024 год",
      en: "New projects announced for 2024",
    },
    excerpt: {
      uz: "Kompaniyamiz 2024-yilda 3 ta yangi turar-joy majmuasini qurishni boshlaydi. Jami 500 dan ortiq xonadon...",
      ru: "Наша компания начнет строительство 3 новых жилых комплексов в 2024 году. Всего более 500 квартир...",
      en: "Our company will start construction of 3 new residential complexes in 2024. A total of over 500 apartments...",
    },
    content: {
      uz: "Kompaniyamiz 2024-yilda 3 ta yangi turar-joy majmuasini qurishni boshlaydi. Jami 500 dan ortiq xonadon qurilishi rejalashtirilgan. Yangi loyihalar Toshkentning turli tumanlarida joylashadi va har xil byudjetga mo'ljallangan bo'ladi. Loyihalar haqida batafsil ma'lumot tez orada e'lon qilinadi.",
      ru: "Наша компания начнет строительство 3 новых жилых комплексов в 2024 году. Всего планируется построить более 500 квартир. Новые проекты будут расположены в разных районах Ташкента и рассчитаны на разный бюджет. Подробная информация о проектах будет объявлена в ближайшее время.",
      en: "Our company will start construction of 3 new residential complexes in 2024. A total of over 500 apartments are planned. The new projects will be located in different districts of Tashkent and designed for different budgets. Detailed information about the projects will be announced soon.",
    },
    date: "2024-01-02",
    image: "/placeholder.svg",
    category: "Yangiliklar",
  },
  {
    id: 5,
    title: {
      uz: "Qishki chegirmalar aksiyasi boshlandi",
      ru: "Начата акция зимних скидок",
      en: "Winter discounts promotion started",
    },
    excerpt: {
      uz: "2024-yil yanvar oyida xonadon sotib oluvchilarga maxsus chegirmalar taqdim etiladi...",
      ru: "В январе 2024 года покупателям квартир предоставляются специальные скидки...",
      en: "Special discounts are offered to apartment buyers in January 2024...",
    },
    content: {
      uz: "2024-yil yanvar oyida xonadon sotib oluvchilarga maxsus chegirmalar taqdim etiladi. Chegirmalar 15% gacha bo'lishi mumkin. Aksiya faqat yanvar oyining oxirigacha amal qiladi. Bu ajoyib imkoniyatdan foydalaning va o'zingizga mos xonadonni arzon narxda sotib oling!",
      ru: "В январе 2024 года покупателям квартир предоставляются специальные скидки. Скидки могут достигать 15%. Акция действует только до конца января. Воспользуйтесь этой прекрасной возможностью и купите подходящую квартиру по выгодной цене!",
      en: "Special discounts are offered to apartment buyers in January 2024. Discounts can be up to 15%. The promotion is valid only until the end of January. Take advantage of this great opportunity and buy your ideal apartment at a discounted price!",
    },
    date: "2023-12-28",
    image: "/placeholder.svg",
    category: "Aksiyalar",
  },
  {
    id: 6,
    title: {
      uz: "Oasis Park loyihasida sotuvlar boshlandi",
      ru: "Начались продажи в проекте Oasis Park",
      en: "Sales started in Oasis Park project",
    },
    excerpt: {
      uz: "Sergeli tumanida joylashgan Oasis Park premium turar-joy majmuasida xonadonlar sotuvga qo'yildi...",
      ru: "Квартиры в премиальном жилом комплексе Oasis Park в Сергелийском районе выставлены на продажу...",
      en: "Apartments in the premium Oasis Park residential complex in Sergeli district are now on sale...",
    },
    content: {
      uz: "Sergeli tumanida joylashgan Oasis Park premium turar-joy majmuasida xonadonlar sotuvga qo'yildi. Loyiha 180 ta xonadondan iborat bo'lib, 2026-yilning 2-choragida topshirilishi rejalashtirilgan. Premium sinfga kiruvchi ushbu loyiha zamonaviy infrastruktura va ekologik toza muhit bilan ajralib turadi.",
      ru: "Квартиры в премиальном жилом комплексе Oasis Park в Сергелийском районе выставлены на продажу. Проект состоит из 180 квартир и планируется к сдаче во 2-м квартале 2026 года. Этот проект премиум-класса отличается современной инфраструктурой и экологически чистой средой.",
      en: "Apartments in the premium Oasis Park residential complex in Sergeli district are now on sale. The project consists of 180 apartments and is scheduled for completion in Q2 2026. This premium-class project stands out with its modern infrastructure and environmentally friendly environment.",
    },
    date: "2023-12-20",
    image: "/placeholder.svg",
    category: "Yangiliklar",
  },
];

// Only News and Sales categories - removed Projects
const categories = ["Barchasi", "Yangiliklar", "Aksiyalar"];

export default function News() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredNews = newsItems.filter(
    (news) => selectedCategory === "Barchasi" || news.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "Barchasi":
        return t('news.all');
      case "Yangiliklar":
        return t('news.category.news');
      case "Aksiyalar":
        return t('news.category.sales');
      default:
        return category;
    }
  };

  const handleNewsClick = (newsId: number) => {
    navigate(`/news/${newsId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero */}
        <section className="bg-primary py-20">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
                {t('news.title')}
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                {t('news.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter - Only News and Sales */}
        <section className="py-8 bg-secondary sticky top-20 z-30">
          <div className="container-main">
            <div className="flex flex-wrap items-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-accent text-primary"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {paginatedNews.map((news, index) => (
                <motion.article
                  key={news.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow group cursor-pointer"
                  onClick={() => handleNewsClick(news.id)}
                >
                  <div className="relative h-56 overflow-hidden bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <span className="text-6xl">📰</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-primary">
                        {getCategoryLabel(news.category)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <Calendar className="w-4 h-4" />
                      {new Date(news.date).toLocaleDateString(language === 'uz' ? "uz-UZ" : language === 'ru' ? "ru-RU" : "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    
                    <h2 className="font-heading font-bold text-xl mb-3 group-hover:text-accent transition-colors">
                      {news.title[language]}
                    </h2>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {news.excerpt[language]}
                    </p>
                    
                    <span className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                      {t('news.more')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  {t('news.notFound')}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center gap-4 mt-12"
              >
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full font-medium transition-all ${
                        currentPage === page
                          ? "bg-accent text-primary"
                          : "bg-card hover:bg-muted"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
