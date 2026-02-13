import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Building2, Home, ChevronLeft, ChevronRight, ChevronDown, Maximize2, Calendar, Search, RefreshCcw, Heart, Layers, Play, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConsultationForm from "@/components/forms/ConsultationForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/lib/i18n";
import { api, Project, Apartment as APIApartment } from "@/lib/api";

const roomOptions = ["Barchasi", "1", "2", "3", "4+"];
const floorOptions = ["Barchasi", "1-5", "6-10", "11-15", "16+"];
const areaOptions = ["Barchasi", "30-50 m²", "50-80 m²", "80-100 m²", "100+ m²"];
const deliveryOptions = ["Barchasi", "2026", "2027", "2028"];

export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [showContactForm, setShowContactForm] = useState(false);
    const [currentAmenityIndex, setCurrentAmenityIndex] = useState(0);
    const [showVideoModal, setShowVideoModal] = useState(false);

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [allApartmentsGlobal, setAllApartmentsGlobal] = useState<APIApartment[]>([]);

    // Filter states
    const [selectedRooms, setSelectedRooms] = useState("Barchasi");
    const [selectedProject, setSelectedProject] = useState("Barchasi");
    const [selectedFloor, setSelectedFloor] = useState("Barchasi");
    const [selectedArea, setSelectedArea] = useState("Barchasi");
    const [selectedDelivery, setSelectedDelivery] = useState("Barchasi");

    const [filteredApartments, setFilteredApartments] = useState<APIApartment[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            setLoading(true);
            api.projects.get(id)
                .then(data => {
                    setProject(data);
                    setFilteredApartments(data.apartments || []);
                    setSelectedProject(data.title);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch project:", error);
                    setLoading(false);
                });

            api.apartments.list()
                .then(data => setAllApartmentsGlobal(data))
                .catch(err => console.error("Failed to fetch global apartments:", err));
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

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

    const amenitiesCount = project.detail?.amenities?.length || 0;

    const nextAmenity = () => {
        if (amenitiesCount > 0) {
            setCurrentAmenityIndex((prev) => (prev + 1) % amenitiesCount);
        }
    };

    const prevAmenity = () => {
        if (amenitiesCount > 0) {
            setCurrentAmenityIndex((prev) => (prev - 1 + amenitiesCount) % amenitiesCount);
        }
    };

    const applyFilters = () => {
        let filtered = [...(project.apartments || [])]; // Default to project apartments if global list is not used

        if (selectedRooms !== "Barchasi") {
            if (selectedRooms === "4+") {
                filtered = filtered.filter((apt) => apt.rooms >= 4);
            } else {
                filtered = filtered.filter((apt) => apt.rooms === parseInt(selectedRooms));
            }
        }
        if (selectedFloor !== "Barchasi") {
            if (selectedFloor === "1-5") filtered = filtered.filter((apt) => apt.floor >= 1 && apt.floor <= 5);
            else if (selectedFloor === "6-10") filtered = filtered.filter((apt) => apt.floor >= 6 && apt.floor <= 10);
            else if (selectedFloor === "11-15") filtered = filtered.filter((apt) => apt.floor >= 11 && apt.floor <= 15);
            else if (selectedFloor === "16+") filtered = filtered.filter((apt) => apt.floor >= 16);
        }
        if (selectedArea !== "Barchasi") {
            if (selectedArea === "30-50 m²") filtered = filtered.filter((apt) => apt.area >= 30 && apt.area <= 50);
            else if (selectedArea === "50-80 m²") filtered = filtered.filter((apt) => apt.area >= 50 && apt.area <= 80);
            else if (selectedArea === "80-100 m²") filtered = filtered.filter((apt) => apt.area >= 80 && apt.area <= 100);
            else if (selectedArea === "100+ m²") filtered = filtered.filter((apt) => apt.area >= 100);
        }
        if (selectedDelivery !== "Barchasi") {
            filtered = filtered.filter((apt) => apt.delivery_year.toString() === selectedDelivery);
        }

        setFilteredApartments(filtered);
    };

    const clearFilters = () => {
        setSelectedRooms("Barchasi");
        setSelectedProject(project.title);
        setSelectedFloor("Barchasi");
        setSelectedArea("Barchasi");
        setSelectedDelivery("Barchasi");
        setFilteredApartments(project.apartments || []);
    };

    const getField = (field: any) => {
        if (!field) return "";
        if (typeof field === "string") return field;
        return (field as any)[language] || field.en || "";
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative h-screen overflow-hidden">
                    <img
                        src={project.detail?.image1_url || project.image_url || ""}
                        alt={project.title}
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
                                    {project.title}
                                </h1>
                                <div className="flex items-center justify-center gap-2 text-primary-foreground/90 mt-4">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-lg md:text-xl">{project.location_name}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                {project.detail && (
                    <section className="py-16 md:py-24">
                        <div className="container-main">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-2 gap-12 items-center"
                            >
                                <div>
                                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                                        {language === 'uz' ? 'Loyiha haqida' : language === 'ru' ? 'О проекте' : 'About the Project'}
                                    </h2>
                                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                        {getField(project.detail.about_description)}
                                    </p>

                                    <div className="grid grid-cols-3 gap-4 mt-8">
                                        <div className="bg-secondary p-4 rounded-xl">
                                            <Building2 className="w-8 h-8 text-accent mb-2" />
                                            <p className="text-2xl font-bold text-foreground">{project.number_of_houses}</p>
                                            <p className="text-sm text-muted-foreground">{language === 'uz' ? 'Uylar soni' : language === 'ru' ? 'Кол-во домов' : 'Total Units'}</p>
                                        </div>
                                        <div className="bg-secondary p-4 rounded-xl">
                                            <MapPin className="w-8 h-8 text-accent mb-2" />
                                            <p className="text-lg font-bold text-foreground">{project.location_name}</p>
                                            <p className="text-sm text-muted-foreground">{language === 'uz' ? 'Joylashuv' : language === 'ru' ? 'Локация' : 'Location'}</p>
                                        </div>
                                        <div className="bg-secondary p-4 rounded-xl">
                                            <Calendar className="w-8 h-8 text-accent mb-2" />
                                            <p className="text-2xl font-bold text-foreground">{project.completion_date}</p>
                                            <p className="text-sm text-muted-foreground">{language === 'uz' ? 'Topshirish' : language === 'ru' ? 'Сдача' : 'Delivery'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <img
                                        src={project.detail.about_image_url || ""}
                                        alt={getField(project.title)}
                                        className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Gallery (Header images 2-5) */}
                {project.detail && (project.detail.image2_url || project.detail.image3_url) && (
                    <section className="py-16 bg-secondary">
                        <div className="container-main">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8 text-center">
                                {language === 'uz' ? 'Loyiha galereyasi' : language === 'ru' ? 'Галерея проекта' : 'Project Gallery'}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[project.detail.image2_url, project.detail.image3_url, project.detail.image4_url, project.detail.image5_url].filter(Boolean).map((img, i) => (
                                    <div key={i} className="h-64 rounded-xl overflow-hidden shadow-lg">
                                        <img src={img!} className="w-full h-full object-cover hover:scale-105 transition-transform" alt="Gallery" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Video Section - Construction Progress */}
                <section className="py-16 md:py-24">
                    <div className="container-main">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                                {language === 'uz' ? 'Qurilish jarayoni' : language === 'ru' ? 'Процесс строительства' : 'Construction Progress'}
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                {language === 'uz'
                                    ? "Loyihamiz qanday qurilayotganini video orqali ko'ring"
                                    : language === 'ru'
                                    ? 'Посмотрите видео о том, как строится наш проект'
                                    : 'Watch how our project is being built'}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative max-w-4xl mx-auto"
                        >
                            {/* Video Thumbnail with Play Button */}
                            <div
                                className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                                onClick={() => setShowVideoModal(true)}
                            >
                                {/* Thumbnail Image */}
                                <img
                                    src={project.detail?.image1_url || project.image_url || ""}
                                    alt="Video thumbnail"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-colors" />

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center shadow-xl"
                                    >
                                        <Play className="w-8 h-8 md:w-10 md:h-10 text-accent-foreground ml-1" fill="currentColor" />
                                    </motion.div>
                                </div>

                                {/* Video Label */}
                                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-primary">
                                        {language === 'uz' ? "Videoni ko'rish" : language === 'ru' ? 'Смотреть видео' : 'Watch Video'}
                                    </span>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
                            <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-xl -z-10" />
                        </motion.div>
                    </div>
                </section>

                {/* Video Modal */}
                {showVideoModal && (
                    <div
                        className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setShowVideoModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative w-full max-w-5xl aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowVideoModal(false)}
                                className="absolute -top-12 right-0 text-white hover:text-accent transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            {/* YouTube Embed - Using channel's video or placeholder */}
                            <iframe
                                src={`https://www.youtube.com/embed?listType=user_uploads&list=GeneralConstruction-f4g&autoplay=1`}
                                title="Construction Progress Video"
                                className="w-full h-full rounded-xl bg-black"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </div>
                )}

                {/* Location Map - Full Width */}
                {project.detail && (
                    <section className="relative">
                        {/* Section Title */}
                        <div className="bg-white py-8">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center">
                                {language === 'uz' ? 'Joylashuv' : language === 'ru' ? 'Местоположение' : 'Location'}
                            </h2>
                        </div>

                        {/* Full Width Map Container */}
                        <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
                            {/* Full Width Map */}
                            <iframe
                                src={`https://maps.google.com/maps?q=${project.detail.latitude},${project.detail.longitude}&z=15&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Project Location Map"
                                className="w-full h-full"
                            />
                        </div>
                    </section>
                )}

                {/* Architecture Section */}
                {project.detail && (
                    <section className="py-16 md:py-24 bg-secondary">
                        <div className="container-main">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                                    {language === 'uz' ? 'Arxitektura' : language === 'ru' ? 'Архитектура' : 'Architecture'}
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-4xl">
                                    {getField(project.detail.architecture_description)}
                                </p>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {[project.detail.architecture_image1_url, project.detail.architecture_image2_url, project.detail.architecture_image3_url].filter(Boolean).map((url, index) => (
                                        <div key={index} className="h-[400px] rounded-2xl overflow-hidden shadow-xl">
                                            <img
                                                src={url!}
                                                alt={`${getField(project.title)} Architecture ${index + 1}`}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Interior & Amenities */}
                {project.detail && (
                    <section className="py-16 md:py-24">
                        <div className="container-main">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-2 gap-12 items-center"
                            >
                                <div>
                                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                                        {language === 'uz' ? "Ichki makon va qulayliklar" : language === 'ru' ? 'Интерьер и удобства' : 'Interior Space & Amenities'}
                                    </h2>
                                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                        {getField(project.detail.interior_description)}
                                    </p>

                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-xl mb-4">{language === 'uz' ? 'Premium qulayliklar:' : language === 'ru' ? 'Премиум удобства:' : 'Premium Amenities:'}</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {project.detail?.amenities?.map(amenity => (
                                                <div key={amenity.id} className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-accent rounded-full" />
                                                    <span className="text-foreground">{getField(amenity.name)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                        <img
                                            src={project.detail.interior_image_url || ""}
                                            alt="Interior"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Apartment Selection */}
                <section className="py-16 md:py-24 bg-secondary">
                    <div className="container-main">
                        <div className="text-center mb-12">
                            <h2 className="section-title">{t('filter.title')}</h2>
                            <p className="section-subtitle mx-auto">{t('filter.description')}</p>
                        </div>

                        {/* Filter Bar */}
                        <div className="bg-card rounded-2xl p-6 shadow-medium mb-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
                                <div className="relative">
                                    <label className="text-sm text-muted-foreground mb-2 block">{t('filter.rooms')}</label>
                                    <select value={selectedRooms} onChange={(e) => setSelectedRooms(e.target.value)} className="filter-select w-full appearance-none">
                                        {roomOptions.map(opt => <option key={opt} value={opt}>{opt === "Barchasi" ? t('filter.all') : opt}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
                                </div>
                                <div className="relative">
                                    <label className="text-sm text-muted-foreground mb-2 block">{t('filter.floor')}</label>
                                    <select value={selectedFloor} onChange={(e) => setSelectedFloor(e.target.value)} className="filter-select w-full appearance-none">
                                        {floorOptions.map(opt => <option key={opt} value={opt}>{opt === "Barchasi" ? t('filter.all') : opt}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
                                </div>
                                <div className="relative">
                                    <label className="text-sm text-muted-foreground mb-2 block">{t('filter.area')}</label>
                                    <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)} className="filter-select w-full appearance-none">
                                        {areaOptions.map(opt => <option key={opt} value={opt}>{opt === "Barchasi" ? t('filter.all') : opt}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
                                </div>
                                <div className="relative">
                                    <label className="text-sm text-muted-foreground mb-2 block">{t('filter.delivery')}</label>
                                    <select value={selectedDelivery} onChange={(e) => setSelectedDelivery(e.target.value)} className="filter-select w-full appearance-none">
                                        {deliveryOptions.map(opt => <option key={opt} value={opt}>{opt === "Barchasi" ? t('filter.all') : opt}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 text-muted-foreground" />
                                </div>
                                <button onClick={applyFilters} className="btn-beige h-[42px] px-0 flex items-center justify-center gap-2">
                                    <Search className="w-4 h-4" /> {t('filter.search')}
                                </button>
                                <button onClick={clearFilters} className="h-[42px] border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                                    <RefreshCcw className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Apartments Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredApartments.map((apt) => (
                                <div key={apt.id} className="bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow">
                                    <div className="relative h-48 bg-muted overflow-hidden">
                                        <img src={apt.image_url || ""} alt={`Apt ${apt.number}`} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-5">
                                        <div className="space-y-2 mb-5 text-sm">
                                            <div className="flex justify-between border-b border-dashed pb-2">
                                                <span className="text-muted-foreground">{t('filter.apartmentNumber')}</span>
                                                <span className="font-semibold">{apt.number}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-dashed pb-2">
                                                <span className="text-muted-foreground">{t('filter.apartmentArea')}</span>
                                                <span className="font-semibold">{apt.area} m²</span>
                                            </div>
                                            <div className="flex justify-between border-b border-dashed pb-2">
                                                <span className="text-muted-foreground">{t('filter.apartmentRooms')}</span>
                                                <span className="font-semibold">{apt.rooms}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">{t('filter.apartmentFloor')}</span>
                                                <span className="font-semibold">{apt.floor}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => setShowContactForm(true)} className="btn-navy w-full text-xs py-2">
                                            {t('filter.learnMore')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Request More Information</DialogTitle>
                    </DialogHeader>
                    <ConsultationForm onSuccess={() => setShowContactForm(false)} />
                </DialogContent>
            </Dialog>
        </div>
    );
}
