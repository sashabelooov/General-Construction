import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Building2, Home, SquareStack, ChevronLeft, ChevronRight, ChevronDown, Maximize2, Calendar, Search, RefreshCcw, Heart, Layers } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getProjectById } from "@/lib/projectData";
import { useLanguage } from "@/lib/i18n";

const roomOptions = ["Barchasi", "1", "2", "3", "4", "5"];
const floorOptions = ["Barchasi", "1-5", "6-10", "11-15", "16+"];
const areaOptions = ["Barchasi", "30-50 m²", "50-80 m²", "80-120 m²", "120+ m²"];
const deliveryOptions = ["Barchasi", "2024", "2026", "2027", "2028"];

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [showContactForm, setShowContactForm] = useState(false);
    const [currentAmenityIndex, setCurrentAmenityIndex] = useState(0);

    // Filter states
    const [selectedRooms, setSelectedRooms] = useState("Barchasi");
    const [selectedFloor, setSelectedFloor] = useState("Barchasi");
    const [selectedArea, setSelectedArea] = useState("Barchasi");
    const [selectedDelivery, setSelectedDelivery] = useState("Barchasi");

    const project = getProjectById(parseInt(id || "0"));
    const [filteredApartments, setFilteredApartments] = useState(project?.availableApartments || []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Project not found</h2>
                    <button onClick={() => navigate("/projects")} className="btn-beige">
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    const nextAmenity = () => {
        setCurrentAmenityIndex((prev) => (prev + 1) % project.amenities.length);
    };

    const prevAmenity = () => {
        setCurrentAmenityIndex((prev) => (prev - 1 + project.amenities.length) % project.amenities.length);
    };

    const applyFilters = () => {
        if (!project) return;
        let filtered = [...project.availableApartments];

        if (selectedRooms !== "Barchasi") {
            filtered = filtered.filter((apt) => apt.rooms === parseInt(selectedRooms));
        }
        if (selectedDelivery !== "Barchasi") {
            filtered = filtered.filter((apt) => apt.deliveryYear === selectedDelivery);
        }

        setFilteredApartments(filtered);
    };

    const clearFilters = () => {
        setSelectedRooms("Barchasi");
        setSelectedFloor("Barchasi");
        setSelectedArea("Barchasi");
        setSelectedDelivery("Barchasi");
        if (project) {
            setFilteredApartments(project.availableApartments);
        }
    };

    const toggleFavorite = (aptId: number) => {
        setFilteredApartments((prev) =>
            prev.map((apt) =>
                apt.id === aptId ? { ...apt, isFavorite: !apt.isFavorite } : apt
            )
        );
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative h-screen overflow-hidden">
                    <img
                        src={project.heroImage}
                        alt={project.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="container-main text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground">
                                    {project.name}
                                </h1>
                                <div className="flex items-center justify-center gap-2 text-primary-foreground/90 mt-4">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-lg md:text-xl">{project.location}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* About the Project Section */}
                <section className="py-16 md:py-24">
                    <div className="container-main">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 gap-12 items-center"
                        >
                            {/* Left - Description */}
                            <div>
                                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                                    About the Project
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                    {project.fullDescription}
                                </p>

                                {/* Statistics */}
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="bg-secondary p-4 rounded-xl">
                                        <Building2 className="w-8 h-8 text-accent mb-2" />
                                        <p className="text-2xl font-bold text-foreground">{project.blocks}</p>
                                        <p className="text-sm text-muted-foreground">Blocks</p>
                                    </div>
                                    <div className="bg-secondary p-4 rounded-xl">
                                        <Home className="w-8 h-8 text-accent mb-2" />
                                        <p className="text-2xl font-bold text-foreground">{project.apartments}</p>
                                        <p className="text-sm text-muted-foreground">Apartments</p>
                                    </div>
                                    <div className="bg-secondary p-4 rounded-xl">
                                        <SquareStack className="w-8 h-8 text-accent mb-2" />
                                        <p className="text-2xl font-bold text-foreground">{project.totalArea.toLocaleString()}</p>
                                        <p className="text-sm text-muted-foreground">m² Total Area</p>
                                    </div>
                                    <div className="bg-secondary p-4 rounded-xl">
                                        <MapPin className="w-8 h-8 text-accent mb-2" />
                                        <p className="text-2xl font-bold text-foreground">{project.location.split(',')[0]}</p>
                                        <p className="text-sm text-muted-foreground">Location</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Image */}
                            <div className="relative">
                                <img
                                    src={project.aboutImage}
                                    alt={project.name}
                                    className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Google Maps Section */}
                <section className="py-16 bg-secondary">
                    <div className="container-main">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
                                Location
                            </h2>
                            <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">
                                <iframe
                                    src={project.mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`Map of ${project.name}`}
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Form Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/10">
                    <div className="container-main">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl mx-auto text-center"
                        >
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                                Interested in {project.name}?
                            </h2>
                            <p className="text-muted-foreground text-lg mb-8">
                                Contact us today to schedule a viewing or get more information about available apartments.
                            </p>
                            <div className="bg-card p-8 rounded-2xl shadow-lg">
                                <ConsultationForm onSuccess={() => { }} />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Architecture Section */}
                <section className="py-16 md:py-24">
                    <div className="container-main">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                                Architecture
                            </h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-4xl">
                                {project.architectureDescription}
                            </p>
                            <div className="grid md:grid-cols-3 gap-6">
                                {project.architectureImages.map((image, index) => (
                                    <div key={index} className="h-[400px] rounded-2xl overflow-hidden shadow-xl">
                                        <img
                                            src={image}
                                            alt={`${project.name} Architecture ${index + 1}`}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Interior Space Section */}
                <section className="py-16 md:py-24 bg-secondary">
                    <div className="container-main">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid md:grid-cols-2 gap-12 items-center"
                        >
                            {/* Left - Text */}
                            <div>
                                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                                    Interior Space & Amenities
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                    {project.interiorDescription}
                                </p>

                                {/* Amenities List */}
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-xl mb-4">Premium Amenities:</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {project.amenities.map((amenity) => (
                                            <div key={amenity.id} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-accent rounded-full" />
                                                <span className="text-foreground">{amenity.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right - Carousel */}
                            <div className="relative">
                                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src={project.amenities[currentAmenityIndex].image}
                                        alt={project.amenities[currentAmenityIndex].name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
                                        <h3 className="text-primary-foreground text-2xl font-bold">
                                            {project.amenities[currentAmenityIndex].name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Carousel Controls */}
                                <button
                                    onClick={prevAmenity}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-lg"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={nextAmenity}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors shadow-lg"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>

                                {/* Indicators */}
                                <div className="flex gap-2 justify-center mt-4">
                                    {project.amenities.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentAmenityIndex(index)}
                                            className={`h-2 rounded-full transition-all ${index === currentAmenityIndex ? "w-8 bg-accent" : "w-2 bg-border"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Apartment Selection Section */}
                <section className="py-16 md:py-24 bg-secondary">
                    <div className="container-main">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center">
                                {t('filter.title')}
                            </h2>

                            {/* Filters */}
                            <div className="bg-card rounded-2xl p-6 shadow-medium mb-10">
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

                                    {/* Project Filter - Hidden since we're on a project detail page */}
                                    <div className="relative hidden">
                                        <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                                            <Building2 className="w-4 h-4" /> {t('filter.project')}
                                        </label>
                                        <select className="filter-select w-full appearance-none cursor-pointer">
                                            <option>{project.name}</option>
                                        </select>
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

                                    {/* Refresh Button */}
                                    <button
                                        onClick={clearFilters}
                                        className="p-3 h-[42px] rounded-lg border border-border hover:bg-muted transition-colors flex items-center justify-center"
                                        title={t('filter.clear')}
                                    >
                                        <RefreshCcw className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Apartments Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredApartments.map((apartment, index) => (
                                    <motion.div
                                        key={apartment.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
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
                                                    <span className="font-semibold text-primary">{apartment.deliveryYear}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-muted-foreground">{t('filter.apartmentProject')}</span>
                                                    <span className="font-semibold text-accent">{apartment.project}</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setShowContactForm(true)}
                                                className="btn-navy w-full text-sm flex items-center justify-center gap-2"
                                            >
                                                <Search className="w-4 h-4" />
                                                {t('filter.learnMore')}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {filteredApartments.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground text-lg">
                                        No apartments match your filters.
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Contact Form Dialog */}
            <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-heading text-2xl">
                            Request More Information
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground text-sm mb-4">
                        Fill out the form below and our team will contact you shortly with detailed information about this apartment.
                    </p>
                    <ConsultationForm onSuccess={() => setShowContactForm(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
