import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Calendar, ArrowRight, Building2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n";

import projectImage1 from "@/assets/project-1.jpg";
import projectImage2 from "@/assets/project-2.jpg";
import projectImage3 from "@/assets/project-3.jpg";

const allProjects = [
  {
    id: 1,
    name: "Sunset Villas",
    image: projectImage1,
    location: "Los Angeles, Hollywood",
    deliveryDate: "2027-06-01", // Format: YYYY-MM-DD
    class: "Comfort",
    status: "Under Construction",
    apartments: 240,
    floors: 16,
  },
  {
    id: 2,
    name: "Downtown Towers",
    image: projectImage2,
    location: "New York, Manhattan",
    deliveryDate: null, // Completed projects don't need completion date
    class: "Business",
    status: "Completed",
    apartments: 320,
    floors: 24,
  },
  {
    id: 3,
    name: "Riverside Apartments",
    image: projectImage3,
    location: "Chicago, Downtown",
    deliveryDate: "2026-06-15",
    class: "Premium",
    status: "For Sale",
    apartments: 180,
    floors: 12,
  },
  {
    id: 4,
    name: "Skyline Residences",
    image: projectImage1,
    location: "Miami, South Beach",
    deliveryDate: "2027-09-01",
    class: "Business",
    status: "Under Construction",
    apartments: 150,
    floors: 18,
  },
  {
    id: 5,
    name: "Oakwood Estates",
    image: projectImage2,
    location: "San Francisco, Nob Hill",
    deliveryDate: "2026-03-15",
    class: "Comfort",
    status: "For Sale",
    apartments: 200,
    floors: 14,
  },
  {
    id: 6,
    name: "Harbor View",
    image: projectImage3,
    location: "Seattle, Waterfront",
    deliveryDate: null,
    class: "Premium",
    status: "Completed",
    apartments: 280,
    floors: 20,
  },
];

const statusFilterKeys = ["all", "forSale", "underConstruction", "completed"] as const;
const classFilterKeys = ["all", "comfort", "business", "premium"] as const;

export default function Projects() {
  const { t, language } = useLanguage();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");

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

  const getClassTranslation = (classType: string) => {
    switch (classType) {
      case "Comfort":
        return t('filter.class.comfort');
      case "Business":
        return t('filter.class.business');
      case "Premium":
        return t('filter.class.premium');
      default:
        return classType;
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

  const filteredProjects = allProjects.filter((project) => {
    const statusMatch = selectedStatus === "all" || 
      (selectedStatus === "forSale" && project.status === "For Sale") ||
      (selectedStatus === "underConstruction" && project.status === "Under Construction") ||
      (selectedStatus === "completed" && project.status === "Completed");
    const classMatch = selectedClass === "all" || 
      (selectedClass === "comfort" && project.class === "Comfort") ||
      (selectedClass === "business" && project.class === "Business") ||
      (selectedClass === "premium" && project.class === "Premium");
    return statusMatch && classMatch;
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
              
              {/* Status Filter */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 w-full md:w-auto">
                <span className="text-xs md:text-sm font-medium text-muted-foreground md:hidden mr-1">{t('filter.label')}</span>
                {statusFilterKeys.map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setSelectedStatus(filterKey)}
                    className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                      selectedStatus === filterKey
                        ? "bg-accent text-primary"
                        : "bg-card hover:bg-muted"
                    }`}
                  >
                    {t(`filter.status.${filterKey}`)}
                  </button>
                ))}
              </div>

              <div className="h-4 md:h-6 w-px bg-border hidden sm:block" />

              {/* Class Filter */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 w-full md:w-auto">
                {classFilterKeys.map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setSelectedClass(filterKey)}
                    className={`px-2.5 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                      selectedClass === filterKey
                        ? "bg-primary text-primary-foreground"
                        : "bg-card hover:bg-muted"
                    }`}
                  >
                    {t(`filter.class.${filterKey}`)}
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
              {filteredProjects.map((project, index) => (
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
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                        
                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            project.status === "Completed"
                              ? "bg-success text-primary-foreground"
                              : project.status === "For Sale"
                              ? "bg-accent text-primary"
                              : "bg-primary text-primary-foreground"
                          }`}>
                            {getStatusTranslation(project.status)}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-card/90 text-foreground">
                            {getClassTranslation(project.class)}
                          </span>
                        </div>

                        {/* Stats */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-primary-foreground">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            <span className="text-sm">{project.apartments} xonadon</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{project.floors} qavat</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-heading font-bold text-xl mb-3 group-hover:text-accent transition-colors">
                          {project.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span className="text-sm">{project.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-muted-foreground mb-4">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span className="text-sm">{formatCompletionDate(project.deliveryDate)}</span>
                        </div>

                        <span className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                          {t('projects.more')}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
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
