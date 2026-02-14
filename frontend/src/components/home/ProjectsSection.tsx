import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Home, ArrowRight, Calendar, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { api, Project } from "@/lib/api";

import projectImage1 from "@/assets/project-1.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ProjectsSection() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.projects.list();
        // Take first 3 projects for homepage
        setProjects(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (slug: string) => {
    navigate(`/projects/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAllProjectsClick = () => {
    navigate('/projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case "completed":
        return t('projects.status.sold');
      case "for_sale":
        return t('projects.status.sale');
      case "under_construction":
        return t('projects.status.building');
      case "will_start":
        return t('projects.status.building');
      default:
        return status;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-primary-foreground";
      case "for_sale":
        return "bg-accent text-primary";
      case "under_construction":
      case "will_start":
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const getSegmentTranslation = (segment: string) => {
    switch (segment) {
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
    if (!dateString) return t('projects.status.sold');

    const date = new Date(dateString);
    if (language === 'uz') {
      // Format as DD-MM-YYYY for Uzbek
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } else {
      // For English and Russian, use Q format
      const quarter = Math.floor((date.getMonth() + 3) / 3);
      const year = date.getFullYear();
      return `Q${quarter} ${year}`;
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-3 block">
            {t('projects.subtitle')}
          </span>
          <h2 className="section-title">
            {t('projects.title')}
          </h2>
          <p className="section-subtitle mx-auto">
            {t('projects.description')}
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('projects.notFound')}</p>
          </div>
        ) : (
          /* Projects Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="card-project group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image_url || project.detail?.image1_url || projectImage1}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(project.status)}`}
                    >
                      {getStatusTranslation(project.status)}
                    </span>
                  </div>

                  {/* Segment Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-card/90 text-foreground">
                      {getSegmentTranslation(project.segment)}
                    </span>
                  </div>

                  {/* Project Name on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading font-bold text-xl text-primary-foreground mb-1">{project.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-sm">{project.location_name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Home className="w-4 h-4 text-accent" />
                    <span className="text-sm">
                      {project.number_of_houses} {t('projects.apartment')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-sm">
                      {formatCompletionDate(project.completion_date)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleProjectClick(project.slug)}
                    className="flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
                  >
                    {t('projects.more')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button onClick={handleAllProjectsClick} className="btn-navy inline-flex items-center gap-2">
            {t('projects.all')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
