import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Calendar, ArrowRight, Building2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import projectImage1 from "@/assets/project-1.jpg";
import projectImage2 from "@/assets/project-2.jpg";
import projectImage3 from "@/assets/project-3.jpg";

const allProjects = [
  {
    id: 1,
    name: "Navruz Residence",
    image: projectImage1,
    location: "Toshkent, Yunusobod tumani",
    deliveryDate: "Q4 2025",
    class: "Comfort",
    status: "Qurilish jarayonida",
    apartments: 240,
    floors: 16,
  },
  {
    id: 2,
    name: "Grand Tower",
    image: projectImage2,
    location: "Toshkent, Mirzo Ulug'bek tumani",
    deliveryDate: "Topshirilgan",
    class: "Business",
    status: "Topshirilgan",
    apartments: 320,
    floors: 24,
  },
  {
    id: 3,
    name: "Oasis Park",
    image: projectImage3,
    location: "Toshkent, Sergeli tumani",
    deliveryDate: "Q2 2026",
    class: "Premium",
    status: "Sotuvda",
    apartments: 180,
    floors: 12,
  },
  {
    id: 4,
    name: "City Center",
    image: projectImage1,
    location: "Toshkent, Shayxontohur tumani",
    deliveryDate: "Q3 2025",
    class: "Business",
    status: "Qurilish jarayonida",
    apartments: 150,
    floors: 18,
  },
  {
    id: 5,
    name: "Green Valley",
    image: projectImage2,
    location: "Toshkent, Chilonzor tumani",
    deliveryDate: "Q1 2026",
    class: "Comfort",
    status: "Sotuvda",
    apartments: 200,
    floors: 14,
  },
  {
    id: 6,
    name: "Sunrise Heights",
    image: projectImage3,
    location: "Toshkent, Yakkasaroy tumani",
    deliveryDate: "Topshirilgan",
    class: "Premium",
    status: "Topshirilgan",
    apartments: 280,
    floors: 20,
  },
];

const statusFilters = ["Barchasi", "Sotuvda", "Qurilish jarayonida", "Topshirilgan"];
const classFilters = ["Barchasi", "Comfort", "Business", "Premium"];

export default function Projects() {
  const [selectedStatus, setSelectedStatus] = useState("Barchasi");
  const [selectedClass, setSelectedClass] = useState("Barchasi");

  const filteredProjects = allProjects.filter((project) => {
    const statusMatch = selectedStatus === "Barchasi" || project.status === selectedStatus;
    const classMatch = selectedClass === "Barchasi" || project.class === selectedClass;
    return statusMatch && classMatch;
  });

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
                Bizning loyihalar
              </h1>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Zamonaviy me'morchilik va yuqori sifat bilan qurilgan turar-joy majmualarimiz
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-secondary sticky top-20 z-30">
          <div className="container-main">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Filtr:</span>
              
              {/* Status Filter */}
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedStatus(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedStatus === filter
                        ? "bg-accent text-primary"
                        : "bg-card hover:bg-muted"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="h-6 w-px bg-border hidden sm:block" />

              {/* Class Filter */}
              <div className="flex flex-wrap gap-2">
                {classFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedClass(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedClass === filter
                        ? "bg-primary text-primary-foreground"
                        : "bg-card hover:bg-muted"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
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
                            project.status === "Topshirilgan"
                              ? "bg-success text-primary-foreground"
                              : project.status === "Sotuvda"
                              ? "bg-accent text-primary"
                              : "bg-primary text-primary-foreground"
                          }`}>
                            {project.status}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-card/90 text-foreground">
                            {project.class}
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
                          <span className="text-sm">{project.deliveryDate}</span>
                        </div>

                        <span className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                          Batafsil
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
                  Ushbu filtrlar bo'yicha loyihalar topilmadi
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
