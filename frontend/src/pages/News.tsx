import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n";
import { api, NewsPost } from "@/lib/api";

export default function News() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    api.news.list()
      .then(data => {
        setNewsList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch news:", err);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(newsList.length / itemsPerPage);
  const paginatedNews = newsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getField = (field: any) => {
    if (!field) return "";
    return (field as any)[language] || field.en || "";
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

        {/* News Grid */}
        <section className="py-16">
          <div className="container-main">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-muted rounded-2xl h-[400px]" />
                ))}
              </div>
            ) : (
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
                      {news.image_url ? (
                        <img src={news.image_url} alt={getField(news.title)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                          <span className="text-6xl">📰</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                        <Calendar className="w-4 h-4" />
                        {new Date(news.date_of_creation).toLocaleDateString(language === 'uz' ? "uz-UZ" : language === 'ru' ? "ru-RU" : "en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>

                      <h2 className="font-heading font-bold text-xl mb-3 group-hover:text-accent transition-colors">
                        {getField(news.title)}
                      </h2>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {getField(news.description)}
                      </p>

                      {news.author_name && (
                        <div className="text-sm text-muted-foreground mb-4">
                          <span className="font-medium">{news.author_name}</span>
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
            )}

            {!loading && newsList.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  {t('news.notFound')}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-border"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full font-medium transition-all ${currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "bg-card hover:bg-muted border border-border"
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-border"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
