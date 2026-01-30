import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Calendar, ArrowRight, Building2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n";
import projectImage1 from "@/assets/project-1.jpg";
import { api, Project } from "@/lib/api";

const segmentFilterKeys = ["all", "comfort", "business", "premium"] as const;

export default function Projects() {
  const { t, language } = useLanguage();
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.projects.list()
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch projects:", error);
        setLoading(false);
      });
  }, []);

  const getSegmentTranslation = (segment: string) => {
    const formatted = segment.toLowerCase();
    switch (formatted) {
      case "comfort":
        return t('filter.class.comfort');
      case "business":
        return t('filter.class.business');
      case "premium":
        return t('filter.class.premium');
      default:
        return segment;
    }
  };

  const formatCompletionDate = (dateString: string | null) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (language === 'uz') {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } else {
      const quarter = Math.floor((date.getMonth() + 3) / 3);
      const year = date.getFullYear();
      return `Q${quarter} ${year}`;
    }
  };

  const filteredProjects = projects.filter((project) => {
    const segmentMatch = selectedSegment === "all" || project.segment === selectedSegment;
    return segmentMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-primary py-12 md:py-20">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3 md:mb-4">
                {t('projects.title')}
              </h1>
              <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl mx-auto">
                {t('projects.description')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-3 md:py-6 bg-secondary sticky top-20 z-30">
          <div className="container-main">
            <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-2 md:gap-4">
              <span className="text-xs md:text-sm font-medium text-muted-foreground hidden md:inline-block">{t('filter.label')}</span>

              {/* Segment Filter */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 w-full md:w-auto">
                {segmentFilterKeys.map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setSelectedSegment(filterKey)}
                    className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${selectedSegment === filterKey
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-muted"
                      }`}
                  >
                    {filterKey === "all" ? t('filter.all') : getSegmentTranslation(filterKey)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-8 md:py-16">
          <div className="container-main">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse bg-muted rounded-2xl h-[400px]" />
                ))
              ) : (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/projects/${project.id}`} className="block">
                      <div className="card-project overflow-hidden">
                        {/* Image */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={project.image_url || projectImage1}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />

                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent text-primary">
                              {getSegmentTranslation(project.segment)}
                            </span>
                          </div>

                          {/* Stats */}
                          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-primary-foreground">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              <span className="text-sm">{project.number_of_houses || 0} xonadon</span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>

                          <div className="flex items-center gap-2 text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 text-accent" />
                            <span className="text-sm">{project.location_name}</span>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground mb-4">
                            <Calendar className="w-4 h-4 text-accent" />
                            <span className="text-sm">{formatCompletionDate(project.completion_date)}</span>
                          </div>

                          <span className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                            {t('projects.more')}
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  {t('projects.notFound')}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
