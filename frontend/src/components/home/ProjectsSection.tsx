import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Home, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

import projectImage1 from "@/assets/project-1.jpg";
import projectImage2 from "@/assets/project-2.jpg";
import projectImage3 from "@/assets/project-3.jpg";

const projects = [
  {
    id: 1,
    name: "Sunset Villas",
    image: projectImage1,
    location: "Los Angeles, Hollywood",
    totalApartments: 240,
    soldApartments: 180,
    status: "Under Construction",
    class: "Comfort",
    completionDate: "2027-05-01", // Format: YYYY-MM-DD
  },
  {
    id: 2,
    name: "Downtown Towers",
    image: projectImage2,
    location: "New York, Manhattan",
    totalApartments: 320,
    soldApartments: 280,
    status: "Completed",
    class: "Business",
    completionDate: null, // Completed projects don't need completion date
  },
  {
    id: 3,
    name: "Riverside Apartments",
    image: projectImage3,
    location: "Chicago, Downtown",
    totalApartments: 180,
    soldApartments: 45,
    status: "For Sale",
    class: "Premium",
    completionDate: "2026-08-15",
  },
];

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

  const handleProjectClick = (projectId: number) => {
    navigate(`/projects/${projectId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAllProjectsClick = () => {
    navigate('/projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case "Completed":
        return t('projects.status.sold');
      case "For Sale":
        return t('projects.status.sale');
      case "Under Construction":
        return t('projects.status.building');
      default:
        return status;
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

        {/* Projects Grid */}
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
              {/* Image - removed progress bar */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === "Completed"
                        ? "bg-success text-primary-foreground"
                        : project.status === "For Sale"
                        ? "bg-accent text-primary"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {getStatusTranslation(project.status)}
                  </span>
                </div>

                {/* Class Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-card/90 text-foreground">
                    {project.class}
                  </span>
                </div>

                {/* Project Name on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading font-bold text-xl text-primary-foreground mb-1">{project.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-sm">{project.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Home className="w-4 h-4 text-accent" />
                  <span className="text-sm">
                    {project.totalApartments} {t('projects.apartment')}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-sm">
                    {formatCompletionDate(project.completionDate)}
                  </span>
                </div>

                <button
                  onClick={() => handleProjectClick(project.id)}
                  className="flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
                >
                  {t('projects.more')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
