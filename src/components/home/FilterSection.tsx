import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search, RefreshCcw, ChevronDown, Home, Layers, Building2, Maximize2, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { useLanguage } from "@/lib/i18n";

import floorPlan1 from "@/assets/floor-plan-1.jpg";
import floorPlan2 from "@/assets/floor-plan-2.jpg";
import floorPlan3 from "@/assets/floor-plan-3.jpg";

interface Apartment {
  id: number;
  number: string;
  area: number;
  rooms: number;
  floor: number;
  deliveryYear: string;
  project: string;
  image: string;
  isFavorite: boolean;
}

const allApartments: Apartment[] = [
  { id: 1, number: "1A", area: 57.24, rooms: 2, floor: 1, deliveryYear: "2027", project: "Sunset Heights", image: floorPlan1, isFavorite: false },
  { id: 2, number: "37", area: 122.79, rooms: 4, floor: 9, deliveryYear: "2026", project: "Grand Plaza", image: floorPlan2, isFavorite: false },
  { id: 3, number: "195", area: 44.86, rooms: 1, floor: 24, deliveryYear: "2028", project: "Harbor View", image: floorPlan3, isFavorite: false },
  { id: 4, number: "16", area: 78.84, rooms: 3, floor: 5, deliveryYear: "2028", project: "Sunset Heights", image: floorPlan1, isFavorite: false },
  { id: 5, number: "42", area: 95.50, rooms: 3, floor: 15, deliveryYear: "2026", project: "Grand Plaza", image: floorPlan2, isFavorite: false },
  { id: 6, number: "88", area: 68.20, rooms: 2, floor: 8, deliveryYear: "2027", project: "Harbor View", image: floorPlan3, isFavorite: false },
];

const projects = ["Barchasi", "Sunset Heights", "Grand Plaza", "Harbor View"];
const roomOptions = ["Barchasi", "1", "2", "3", "4+"];
const floorOptions = ["Barchasi", "1-5", "6-10", "11-15", "16+"];
const areaOptions = ["Barchasi", "30-50 m²", "50-80 m²", "80-100 m²", "100+ m²"];
const deliveryOptions = ["Barchasi", "2026", "2027", "2028"];

export default function FilterSection() {
  const { t } = useLanguage();
  const [apartments, setApartments] = useState<Apartment[]>(allApartments.slice(0, 6));
  const [visibleCount, setVisibleCount] = useState(6);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  
  // Filter states
  const [selectedProject, setSelectedProject] = useState("Barchasi");
  const [selectedRooms, setSelectedRooms] = useState("Barchasi");
  const [selectedFloor, setSelectedFloor] = useState("Barchasi");
  const [selectedArea, setSelectedArea] = useState("Barchasi");
  const [selectedDelivery, setSelectedDelivery] = useState("Barchasi");

  const applyFilters = () => {
    let filtered = [...allApartments];

    if (selectedProject !== "Barchasi") {
      filtered = filtered.filter((apt) => apt.project === selectedProject);
    }
    if (selectedRooms !== "Barchasi") {
      if (selectedRooms === "4+") {
        filtered = filtered.filter((apt) => apt.rooms >= 4);
      } else {
        filtered = filtered.filter((apt) => apt.rooms === parseInt(selectedRooms));
      }
    }
    if (selectedDelivery !== "Barchasi") {
      filtered = filtered.filter((apt) => apt.deliveryYear === selectedDelivery);
    }

    setApartments(filtered.slice(0, visibleCount));
  };

  const clearFilters = () => {
    setSelectedProject("Barchasi");
    setSelectedRooms("Barchasi");
    setSelectedFloor("Barchasi");
    setSelectedArea("Barchasi");
    setSelectedDelivery("Barchasi");
    setApartments(allApartments.slice(0, visibleCount));
  };

  const toggleFavorite = (id: number) => {
    setApartments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, isFavorite: !apt.isFavorite } : apt
      )
    );
  };

  const showMore = () => {
    const newCount = visibleCount + 3;
    setVisibleCount(newCount);
    setApartments(allApartments.slice(0, newCount));
  };

  const handleRequestInfo = (apartment: Apartment) => {
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

        {/* Filters - Fixed overflow issue */}
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
                  <option key={opt} value={opt}>{opt === "Barchasi" ? t('filter.all') : opt}</option>
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
                  <option key={opt} value={opt}>{opt === "Barchasi" ? t('filter.all') : opt}</option>
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
                {projects.map((opt) => (
                  <option key={opt} value={opt}>{opt === "Barchasi" ? t('filter.all') : opt}</option>
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
                  <option key={opt} value={opt}>{opt === "Barchasi" ? t('filter.all') : opt}</option>
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
                {deliveryOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt === "Barchasi" ? t('filter.all') : opt}</option>
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

            {/* Refresh Button - Fixed to stay within container */}
            <button
              onClick={clearFilters}
              className="p-3 h-[42px] rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center"
              title={t('filter.clear')}
            >
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Apartments Grid */}
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
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl overflow-hidden shadow-soft group hover:shadow-medium transition-shadow"
              >
                {/* Floor Plan Image */}
                <div className="relative h-52 bg-muted p-4">
                  <img 
                    src={apartment.image} 
                    alt={`Floor plan ${apartment.number}`}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(apartment.id)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      apartment.isFavorite
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
                      <span className="font-semibold text-primary">{apartment.deliveryYear}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t('filter.apartmentProject')}</span>
                      <span className="font-semibold text-accent">{apartment.project}</span>
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

        {/* Show More Button */}
        {visibleCount < allApartments.length && (
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
                  <>№{selectedApartment.number} {t('filter.apartmentNumber')}</>
                )}
              </DialogTitle>
            </DialogHeader>
            <ConsultationForm onSuccess={() => setShowContactForm(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
