import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const newsItems = [
  {
    id: 1,
    title: "Navruz Residence loyihasi 70% ga tayyor",
    excerpt: "Yunusobod tumanida qurilayotgan Navruz Residence loyihasida qurilish ishlari jadal davom etmoqda...",
    date: "2024-01-15",
    image: "/placeholder.svg",
    category: "Loyihalar",
  },
  {
    id: 2,
    title: "Yangi to'lov shartlari e'lon qilindi",
    excerpt: "Mijozlarimiz uchun yanada qulay to'lov rejalarini taqdim etamiz. Endi siz xonadon sotib olishingiz mumkin...",
    date: "2024-01-10",
    image: "/placeholder.svg",
    category: "Aksiyalar",
  },
  {
    id: 3,
    title: "Grand Tower loyihasi muvaffaqiyatli topshirildi",
    excerpt: "Mirzo Ulug'bek tumanidagi Grand Tower loyihasi barcha qurilish ishlari yakunlanib, egalarga topshirildi...",
    date: "2024-01-05",
    image: "/placeholder.svg",
    category: "Yangiliklar",
  },
  {
    id: 4,
    title: "2024-yil uchun yangi loyihalar e'lon qilindi",
    excerpt: "Kompaniyamiz 2024-yilda 3 ta yangi turar-joy majmuasini qurishni boshlaydi. Jami 500 dan ortiq xonadon...",
    date: "2024-01-02",
    image: "/placeholder.svg",
    category: "Yangiliklar",
  },
  {
    id: 5,
    title: "Qishki chegirmalar aksiyasi boshlandi",
    excerpt: "2024-yil yanvar oyida xonadon sotib oluvchilarga maxsus chegirmalar taqdim etiladi...",
    date: "2023-12-28",
    image: "/placeholder.svg",
    category: "Aksiyalar",
  },
  {
    id: 6,
    title: "Oasis Park loyihasida sotuvlar boshlandi",
    excerpt: "Sergeli tumanida joylashgan Oasis Park premium turar-joy majmuasida xonadonlar sotuvga qo'yildi...",
    date: "2023-12-20",
    image: "/placeholder.svg",
    category: "Loyihalar",
  },
];

const categories = ["Barchasi", "Yangiliklar", "Loyihalar", "Aksiyalar"];

export default function News() {
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
                Yangiliklar
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Kompaniyamiz va loyihalarimiz haqida so'nggi yangiliklar
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
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
                  {category}
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
                  className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow group"
                >
                  <Link to={`/news/${news.id}`}>
                    <div className="relative h-56 overflow-hidden bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                        <span className="text-6xl">📰</span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-primary">
                          {news.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        {new Date(news.date).toLocaleDateString("uz-UZ", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      
                      <h2 className="font-heading font-bold text-xl mb-3 group-hover:text-accent transition-colors">
                        {news.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {news.excerpt}
                      </p>
                      
                      <span className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                        Ko'proq
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  Ushbu kategoriya bo'yicha yangiliklar topilmadi
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
