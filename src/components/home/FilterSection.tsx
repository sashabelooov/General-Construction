import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Search, RefreshCcw, ChevronDown, Home, Layers, Building2, Maximize2, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ConsultationForm from "@/components/forms/ConsultationForm";

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
  { id: 1, number: "A-101", area: 65, rooms: 2, floor: 3, deliveryYear: "2025", project: "Navruz Residence", image: "/placeholder.svg", isFavorite: false },
  { id: 2, number: "B-205", area: 85, rooms: 3, floor: 7, deliveryYear: "2025", project: "Grand Tower", image: "/placeholder.svg", isFavorite: false },
  { id: 3, number: "C-312", area: 120, rooms: 4, floor: 12, deliveryYear: "2024", project: "Oasis Park", image: "/placeholder.svg", isFavorite: false },
  { id: 4, number: "A-415", area: 45, rooms: 1, floor: 4, deliveryYear: "2025", project: "Navruz Residence", image: "/placeholder.svg", isFavorite: false },
  { id: 5, number: "B-518", area: 95, rooms: 3, floor: 15, deliveryYear: "2026", project: "Grand Tower", image: "/placeholder.svg", isFavorite: false },
  { id: 6, number: "D-208", area: 78, rooms: 2, floor: 8, deliveryYear: "2025", project: "Oasis Park", image: "/placeholder.svg", isFavorite: false },
];

const projects = ["Barchasi", "Navruz Residence", "Grand Tower", "Oasis Park"];
const roomOptions = ["Barchasi", "1", "2", "3", "4+"];
const floorOptions = ["Barchasi", "1-5", "6-10", "11-15", "16+"];
const areaOptions = ["Barchasi", "30-50 m²", "50-80 m²", "80-100 m²", "100+ m²"];
const deliveryOptions = ["Barchasi", "2024", "2025", "2026"];

export default function FilterSection() {
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
            Xonadon tanlash
          </span>
          <h2 className="section-title">
            O'zingizga mos uyni toping
          </h2>
          <p className="section-subtitle mx-auto">
            Filtrlar yordamida o'zingizga mos xonadonni oson toping
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-6 shadow-medium mb-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Rooms Filter */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                <Home className="w-4 h-4" /> Xonalar
              </label>
              <select
                value={selectedRooms}
                onChange={(e) => setSelectedRooms(e.target.value)}
                className="filter-select w-full appearance-none cursor-pointer"
              >
                {roomOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Floor Filter */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                <Layers className="w-4 h-4" /> Qavat
              </label>
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="filter-select w-full appearance-none cursor-pointer"
              >
                {floorOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Project Filter */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                <Building2 className="w-4 h-4" /> Loyiha
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="filter-select w-full appearance-none cursor-pointer"
              >
                {projects.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Area Filter */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                <Maximize2 className="w-4 h-4" /> Maydon
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="filter-select w-full appearance-none cursor-pointer"
              >
                {areaOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Delivery Filter */}
            <div className="relative">
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Topshirish
              </label>
              <select
                value={selectedDelivery}
                onChange={(e) => setSelectedDelivery(e.target.value)}
                className="filter-select w-full appearance-none cursor-pointer"
              >
                {deliveryOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>

            {/* Action Buttons */}
            <div className="flex items-end gap-2">
              <button
                onClick={applyFilters}
                className="btn-gold flex-1 flex items-center justify-center gap-2 py-3"
              >
                <Search className="w-4 h-4" />
                Qidirish
              </button>
              <button
                onClick={clearFilters}
                className="p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                title="Tozalash"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Apartments Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                {/* Image / Floor Plan */}
                <div className="relative h-48 bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <line x1="3" y1="9" x2="21" y2="9" />
                        <line x1="9" y1="21" x2="9" y2="9" />
                      </svg>
                      <span className="text-sm">Kadastr rejasi</span>
                    </div>
                  </div>
                  
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
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-heading font-bold text-lg">№{apartment.number}</h3>
                      <p className="text-sm text-muted-foreground">{apartment.project}</p>
                    </div>
                    <span className="text-accent font-bold text-lg">{apartment.area} m²</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-5 text-sm">
                    <div className="text-center p-2 bg-secondary rounded-lg">
                      <span className="block text-muted-foreground text-xs">Xonalar</span>
                      <span className="font-semibold">{apartment.rooms}</span>
                    </div>
                    <div className="text-center p-2 bg-secondary rounded-lg">
                      <span className="block text-muted-foreground text-xs">Qavat</span>
                      <span className="font-semibold">{apartment.floor}</span>
                    </div>
                    <div className="text-center p-2 bg-secondary rounded-lg">
                      <span className="block text-muted-foreground text-xs">Yil</span>
                      <span className="font-semibold">{apartment.deliveryYear}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRequestInfo(apartment)}
                    className="btn-navy w-full text-sm"
                  >
                    Batafsil ma'lumot
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
            <button onClick={showMore} className="btn-outline-gold">
              Yana ko'rsatish
            </button>
          </motion.div>
        )}

        {/* Contact Form Dialog */}
        <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl">
                {selectedApartment && (
                  <>№{selectedApartment.number} xonadoni haqida so'rov</>
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
