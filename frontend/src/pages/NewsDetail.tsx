import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n";
import { newsItems } from "./News";

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const newsId = parseInt(id || "1");
  const news = newsItems.find((n) => n.id === newsId);
  
  // Get related news (other news from same category, excluding current)
  const relatedNews = newsItems
    .filter((n) => n.id !== newsId)
    .slice(0, 3);

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container-main py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Yangilik topilmadi</h1>
          <Link to="/news" className="text-accent hover:underline">
            {t('news.backToNews')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "Yangiliklar":
        return t('news.category.news');
      case "Aksiyalar":
        return t('news.category.sales');
      default:
        return category;
    }
  };

  const handleRelatedNewsClick = (newsItemId: number) => {
    navigate(`/news/${newsItemId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero with back button */}
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
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-primary inline-block mb-4">
                {getCategoryLabel(news.category)}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                {news.title[language]}
              </h1>
              <div className="flex items-center gap-4 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(news.date).toLocaleDateString(language === 'uz' ? "uz-UZ" : language === 'ru' ? "ru-RU" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container-main">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Article Content - Takes 2 columns */}
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2"
              >
                {/* Featured Image */}
                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden bg-muted mb-8">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <span className="text-8xl">📰</span>
                  </div>
                </div>

                {/* Article Text - More space for content */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-foreground text-lg leading-relaxed mb-6">
                    {news.content[language]}
                  </p>
                  
                  {/* Extended content area */}
                  <div className="bg-secondary rounded-xl p-6 my-8">
                    <h3 className="font-heading font-bold text-xl mb-3">
                      {language === 'uz' ? 'Qo\'shimcha ma\'lumot' : language === 'ru' ? 'Дополнительная информация' : 'Additional Information'}
                    </h3>
                    <p className="text-muted-foreground">
                      {language === 'uz' 
                        ? 'Batafsil ma\'lumot olish uchun bizning sotuv bo\'limimiz bilan bog\'laning yoki ofisimizga tashrif buyuring.'
                        : language === 'ru'
                        ? 'Для получения подробной информации свяжитесь с нашим отделом продаж или посетите наш офис.'
                        : 'For more information, please contact our sales department or visit our office.'
                      }
                    </p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
                  <span className="text-muted-foreground font-medium">{t('news.shareNews')}:</span>
                  <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.article>

              {/* Sidebar - Related News & Links */}
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                {/* Related News */}
                <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
                  <h3 className="font-heading font-bold text-xl mb-6">{t('news.relatedNews')}</h3>
                  <div className="space-y-4">
                    {relatedNews.map((relatedItem) => (
                      <div
                        key={relatedItem.id}
                        onClick={() => handleRelatedNewsClick(relatedItem.id)}
                        className="group cursor-pointer"
                      >
                        <div className="flex gap-4 p-3 rounded-lg hover:bg-secondary transition-colors">
                          <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">📰</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm group-hover:text-accent transition-colors line-clamp-2">
                              {relatedItem.title[language]}
                            </h4>
                            <span className="text-xs text-muted-foreground mt-1 block">
                              {new Date(relatedItem.date).toLocaleDateString(language === 'uz' ? "uz-UZ" : language === 'ru' ? "ru-RU" : "en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-card rounded-2xl p-6 shadow-soft">
                  <h3 className="font-heading font-bold text-xl mb-4">
                    {language === 'uz' ? 'Tezkor havolalar' : language === 'ru' ? 'Быстрые ссылки' : 'Quick Links'}
                  </h3>
                  <div className="space-y-3">
                    <Link 
                      to="/projects" 
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <span>{t('nav.projects')}</span>
                      <ArrowRight className="w-4 h-4 text-accent" />
                    </Link>
                    <Link 
                      to="/about" 
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <span>{t('nav.about')}</span>
                      <ArrowRight className="w-4 h-4 text-accent" />
                    </Link>
                    <Link 
                      to="/contact" 
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <span>{t('nav.contact')}</span>
                      <ArrowRight className="w-4 h-4 text-accent" />
                    </Link>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
