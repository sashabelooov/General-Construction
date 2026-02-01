import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, RefreshCcw, ChevronDown, Home, Layers, Building2, Maximize2, Calendar, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { useLanguage } from "@/lib/i18n";
import { api, Apartment as ApiApartment, Project } from "@/lib/api";

import floorPlan1 from "@/assets/floor-plan-1.jpg";

interface DisplayApartment extends ApiApartment {
  isFavorite: boolean;
}

const roomOptions = ["all", "1", "2", "3", "4+"];
const floorOptions = ["all", "1-5", "6-10", "11-15", "16+"];
const areaOptions = ["all", "30-50", "50-80", "80-100", "100+"];

export default function FilterSection() {
  const { t } = useLanguage();
  const [apartments, setApartments] = useState<DisplayApartment[]>([]);
  const [allApartments, setAllApartments] = useState<DisplayApartment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<DisplayApartment | null>(null);

  // Filter states
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedRooms, setSelectedRooms] = useState("all");
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedDelivery, setSelectedDelivery] = useState("all");

  // Fetch apartments and projects from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [apartmentsData, projectsData] = await Promise.all([
          api.apartments.list(),
          api.projects.list(),
        ]);

        // Add isFavorite to apartments
        const apartmentsWithFavorite = apartmentsData.map((apt) => ({
          ...apt,
          isFavorite: false,
        }));

        setAllApartments(apartmentsWithFavorite);
        setApartments(apartmentsWithFavorite.slice(0, visibleCount));
        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get unique delivery years from apartments
  const deliveryYears = [...new Set(allApartments.map((apt) => apt.delivery_year.toString()))].sort();

  const applyFilters = () => {
    let filtered = [...allApartments];

    if (selectedProject !== "all") {
      filtered = filtered.filter((apt) => apt.project_id.toString() === selectedProject);
    }
    if (selectedRooms !== "all") {
      if (selectedRooms === "4+") {
        filtered = filtered.filter((apt) => apt.rooms >= 4);
      } else {
        filtered = filtered.filter((apt) => apt.rooms === parseInt(selectedRooms));
      }
    }
    if (selectedFloor !== "all") {
      const [min, max] = selectedFloor.split("-").map((v) => (v.includes("+") ? 999 : parseInt(v)));
      if (selectedFloor.includes("+")) {
        filtered = filtered.filter((apt) => apt.floor >= parseInt(selectedFloor));
      } else {
        filtered = filtered.filter((apt) => apt.floor >= min && apt.floor <= max);
      }
    }
    if (selectedArea !== "all") {
      const [min, max] = selectedArea.split("-").map((v) => (v.includes("+") ? 9999 : parseFloat(v)));
      if (selectedArea.includes("+")) {
        filtered = filtered.filter((apt) => apt.area >= parseFloat(selectedArea));
      } else {
        filtered = filtered.filter((apt) => apt.area >= min && apt.area <= max);
      }
    }
    if (selectedDelivery !== "all") {
      filtered = filtered.filter((apt) => apt.delivery_year.toString() === selectedDelivery);
    }

    setApartments(filtered.slice(0, visibleCount));
  };

  const clearFilters = () => {
    setSelectedProject("all");
    setSelectedRooms("all");
    setSelectedFloor("all");
    setSelectedArea("all");
    setSelectedDelivery("all");
    setApartments(allApartments.slice(0, visibleCount));
  };

  const toggleFavorite = (id: number) => {
    setApartments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, isFavorite: !apt.isFavorite } : apt
      )
    );
    setAllApartments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, isFavorite: !apt.isFavorite } : apt
      )
    );
  };

  const showMore = () => {
    const newCount = visibleCount + 4;
    setVisibleCount(newCount);
    // Re-apply filters with new count
    applyFilters();
  };

  useEffect(() => {
    if (allApartments.length > 0) {
      applyFilters();
    }
  }, [visibleCount]);

  const handleRequestInfo = (apartment: DisplayApartment) => {
    setSelectedApartment(apartment);
    setShowContactForm(true);
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-3 block">
            {t('filter.subtitle')}
          </span>
          <h2 className="section-title">
            {t('filter.title')}
          </h2>
          <p className="section-subtitle mx-auto">
            {t('filter.description')}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-6 shadow-medium mb-10 overflow-visible"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 items-end">
            {/* Rooms Filter */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                <Home className="w-4 h-4" /> {t('filter.rooms')}
              </label>
              <select
                value={selectedRooms}
                onChange={(e) => setSelectedRooms(e.target.value)}
                className="filter-select w-full appearance-none cursor-pointer"
              >
                {roomOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt === "all" ? t('filter.all') : opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Floor Filter */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                <Layers className="w-4 h-4" /> {t('filter.floor')}
              </label>
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="filter-select w-full appearance-none cursor-pointer"
              >
                {floorOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt === "all" ? t('filter.all') : opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Project Filter */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                <Building2 className="w-4 h-4" /> {t('filter.project')}
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="filter-select w-full appearance-none cursor-pointer"
              >
                <option value="all">{t('filter.all')}</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id.toString()}>{project.title}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Area Filter */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                <Maximize2 className="w-4 h-4" /> {t('filter.area')}
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="filter-select w-full appearance-none cursor-pointer"
              >
                {areaOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === "all" ? t('filter.all') : `${opt} m²`}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Delivery Filter */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {t('filter.delivery')}
              </label>
              <select
                value={selectedDelivery}
                onChange={(e) => setSelectedDelivery(e.target.value)}
                className="filter-select w-full appearance-none cursor-pointer"
              >
                <option value="all">{t('filter.all')}</option>
                {deliveryYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Search Button */}
            <button
              onClick={applyFilters}
              className="btn-beige flex items-center justify-center gap-2 py-3 h-[42px]"
            >
              <Search className="w-4 h-4" />
              {t('filter.search')}
            </button>

            {/* Refresh Button */}
            <button
              onClick={clearFilters}
              className="p-3 h-[42px] rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center"
              title={t('filter.clear')}
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : apartments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('projects.notFound')}</p>
          </div>
        ) : (
          /* Apartments Grid */
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {apartments.map((apartment, index) => (
                <motion.div
                  key={apartment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-xl overflow-hidden shadow-soft group hover:shadow-medium transition-shadow"
                >
                  {/* Floor Plan Image */}
                  <div className="relative h-52 bg-muted overflow-hidden">
                    <img
                      src={apartment.image_url || floorPlan1}
                      alt={`Floor plan ${apartment.number}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(apartment.id)}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${apartment.isFavorite
                          ? "bg-destructive text-primary-foreground"
                          : "bg-card/90 text-muted-foreground hover:bg-destructive hover:text-primary-foreground"
                        }`}
                    >
                      <Heart className={`w-5 h-5 ${apartment.isFavorite ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Details */}
                    <div className="space-y-2 mb-5 text-sm">
                      <div className="flex justify-between items-center border-b border-dashed border-border pb-2">
                        <span className="text-muted-foreground">{t('filter.apartmentNumber')}</span>
                        <span className="font-semibold text-primary">{apartment.number}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-dashed border-border pb-2">
                        <span className="text-muted-foreground">{t('filter.apartmentArea')}</span>
                        <span className="font-semibold text-primary">{apartment.area} m²</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-dashed border-border pb-2">
                        <span className="text-muted-foreground">{t('filter.apartmentRooms')}</span>
                        <span className="font-semibold text-primary">{apartment.rooms}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-dashed border-border pb-2">
                        <span className="text-muted-foreground">{t('filter.apartmentFloor')}</span>
                        <span className="font-semibold text-primary">{apartment.floor}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-dashed border-border pb-2">
                        <span className="text-muted-foreground">{t('filter.apartmentDelivery')}</span>
                        <span className="font-semibold text-primary">{apartment.delivery_year}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">{t('filter.apartmentProject')}</span>
                        <span className="font-semibold text-accent">{apartment.project_title}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRequestInfo(apartment)}
                      className="btn-navy w-full text-sm flex items-center justify-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      {t('filter.learnMore')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Show More Button */}
        {!loading && apartments.length > 0 && apartments.length < allApartments.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <button onClick={showMore} className="btn-outline-beige">
              {t('filter.showMore')}
            </button>
          </motion.div>
        )}

        {/* Contact Form Dialog */}
        <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">
                {selectedApartment && (
                  <>№{selectedApartment.number} - {selectedApartment.project_title}</>
                )}
              </DialogTitle>
            </DialogHeader>
            <ConsultationForm
              onSuccess={() => setShowContactForm(false)}
              apartmentId={selectedApartment?.id}
            />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
