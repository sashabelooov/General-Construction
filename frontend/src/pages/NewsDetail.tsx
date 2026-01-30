import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, ArrowRight, Share2, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n";
import { api, NewsPost } from "@/lib/api";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [news, setNews] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState<NewsPost[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        if (!id) return;

        const newsData = await api.news.get(id);
        setNews(newsData);

        const allNews = await api.news.list();
        setRelatedNews(allNews.filter(n => n.id !== newsData.id).slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch news details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container-main py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('news.notFound')}</h1>
          <Link to="/news" className="text-accent hover:underline">
            {t('news.backToNews')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-primary py-12">
          <div className="container-main">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('news.backToNews')}
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {news.title && news.title[language]}
              </h1>
              <div className="flex items-center gap-4 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(news.date_of_creation).toLocaleDateString(language === 'uz' ? "uz-UZ" : language === 'ru' ? "ru-RU" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2"
              >
                {/* Image */}
                {news.image_url && (
                  <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-muted mb-8">
                    <img src={news.image_url} alt={news.title[language]} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="prose prose-lg max-w-none">
                  {news.description && (
                    <p className="text-foreground text-lg leading-relaxed mb-6 font-medium">
                      {news.description[language]}
                    </p>
                  )}
                  {news.additional_information && (
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {news.additional_information[language]}
                    </div>
                  )}

                  {news.author_name && (
                    <div className="text-sm text-muted-foreground mt-8 pt-4 border-t border-dashed border-border text-right">
                      <span className="font-medium italic">{news.author_name}</span>
                    </div>
                  )}
                </div>

                {/* Share */}
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
                  <span className="text-muted-foreground font-medium">{t('news.shareNews')}:</span>
                  <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
                  <h3 className="font-heading font-bold text-xl mb-6">{t('news.relatedNews')}</h3>
                  <div className="space-y-4">
                    {relatedNews.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          navigate(`/news/${item.id}`);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="group cursor-pointer flex gap-4 p-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.title[language]} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl">📰</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-accent transition-colors line-clamp-2">
                            {item.title[language]}
                          </h4>
                          <span className="text-xs text-muted-foreground mt-1 block">
                            {new Date(item.date_of_creation).toLocaleDateString(language === 'uz' ? "uz-UZ" : language === 'ru' ? "ru-RU" : "en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
