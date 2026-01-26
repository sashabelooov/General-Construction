import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n";

export const newsItems = [
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
    author: "David Anderson",
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
      en: "Our company will start construction of 3 new residential complexes in 2024. A total of over 500 apartments are planned. The new projects will be located in different areas of major US cities and designed for different budgets. Detailed information about the projects will be announced soon.",
    },
    date: "2024-01-02",
    image: "/placeholder.svg",
    category: "Yangiliklar",
    author: "Emily Davis",
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
    <div className="min-h-screen bg-white">
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

                    {news.author && (
                      <div className="text-sm text-muted-foreground mb-4">
                        <span className="font-medium">{news.author}</span>
                      </div>
                    )}
                    
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
