import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, Home, ChevronLeft, ChevronRight, ChevronDown, Maximize2, Calendar, Search, RefreshCcw, Heart, Layers } from "lucide-react";
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
    const { slug } = useParams();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [showContactForm, setShowContactForm] = useState(false);
    const [currentAmenityIndex, setCurrentAmenityIndex] = useState(0);
    const [aboutSlide, setAboutSlide] = useState(0);
    const [aboutDirection, setAboutDirection] = useState(0);

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
        if (slug) {
            setLoading(true);
            api.projects.get(slug)
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
    }, [slug]);

    // Auto-slide for interior sections carousel
    useEffect(() => {
        if (!project?.interior_sections?.length) return;
        const count = project.interior_sections.length;
        if (count <= 1) return;
        const timer = setInterval(() => {
            setCurrentAmenityIndex((prev) => (prev + 1) % count);
        }, 6000);
        return () => clearInterval(timer);
    }, [project]);

    // Auto-slide for about carousel
    useEffect(() => {
        if (!project?.detail) return;
        const aboutImages = [
            project.detail.about_image_url,
            project.detail.image2_url,
            project.detail.image3_url,
            project.detail.image4_url,
            project.detail.image5_url,
        ].filter(Boolean);
        if (aboutImages.length <= 1) return;
        const timer = setInterval(() => {
            setAboutDirection(1);
            setAboutSlide((prev) => (prev + 1) % aboutImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [project]);

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

    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) return null;
        let videoId = '';
        // Handle youtu.be/ID
        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
        if (shortMatch) videoId = shortMatch[1];
        // Handle youtube.com/watch?v=ID
        const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
        if (longMatch) videoId = longMatch[1];
        // Handle youtube.com/embed/ID
        const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]+)/);
        if (embedMatch) videoId = embedMatch[1];
        // Handle youtube.com/shorts/ID
        const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
        if (shortsMatch) videoId = shortsMatch[1];
        // Handle youtube.com/live/ID
        const liveMatch = url.match(/live\/([a-zA-Z0-9_-]+)/);
        if (liveMatch) videoId = liveMatch[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    };

    const formatCompletionDate = (dateString: string | null) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
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
                                    <span className="text-lg md:text-xl">{project.location_name[language] || project.location_name.uz}</span>
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

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                                        <div className="bg-secondary p-4 rounded-xl flex sm:block items-center gap-3">
                                            <Building2 className="w-8 h-8 text-accent mb-0 sm:mb-2 flex-shrink-0" />
                                            <div>
                                                <p className="text-2xl font-bold text-foreground">{project.number_of_houses}</p>
                                                <p className="text-sm text-muted-foreground">{language === 'uz' ? 'Uylar soni' : language === 'ru' ? 'Кол-во домов' : 'Total Units'}</p>
                                            </div>
                                        </div>
                                        <div className="bg-secondary p-4 rounded-xl flex sm:block items-center gap-3">
                                            <MapPin className="w-8 h-8 text-accent mb-0 sm:mb-2 flex-shrink-0" />
                                            <div>
                                                <p className="text-lg font-bold text-foreground">{project.location_name[language] || project.location_name.uz}</p>
                                                <p className="text-sm text-muted-foreground">{language === 'uz' ? 'Joylashuv' : language === 'ru' ? 'Локация' : 'Location'}</p>
                                            </div>
                                        </div>
                                        <div className="bg-secondary p-4 rounded-xl flex sm:block items-center gap-3">
                                            <Calendar className="w-8 h-8 text-accent mb-0 sm:mb-2 flex-shrink-0" />
                                            <div>
                                                <p className="text-2xl font-bold text-foreground">{formatCompletionDate(project.completion_date)}</p>
                                                <p className="text-sm text-muted-foreground">{language === 'uz' ? 'Topshirish' : language === 'ru' ? 'Сдача' : 'Delivery'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {(() => {
                                    const aboutImages = [
                                        project.detail.about_image_url,
                                        project.detail.image2_url,
                                        project.detail.image3_url,
                                        project.detail.image4_url,
                                        project.detail.image5_url,
                                    ].filter(Boolean) as string[];

                                    const slideVariants = {
                                        enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
                                        center: { x: 0, opacity: 1 },
                                        exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
                                    };

                                    return (
                                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                            <AnimatePresence initial={false} custom={aboutDirection}>
                                                <motion.img
                                                    key={aboutSlide}
                                                    src={aboutImages[aboutSlide] || ""}
                                                    alt={`${getField(project.title)} ${aboutSlide + 1}`}
                                                    custom={aboutDirection}
                                                    variants={slideVariants}
                                                    initial="enter"
                                                    animate="center"
                                                    exit="exit"
                                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            </AnimatePresence>

                                            {aboutImages.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={() => { setAboutDirection(-1); setAboutSlide((prev) => (prev - 1 + aboutImages.length) % aboutImages.length); }}
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/50 transition-colors z-10"
                                                    >
                                                        <ChevronLeft className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => { setAboutDirection(1); setAboutSlide((prev) => (prev + 1) % aboutImages.length); }}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-card/50 transition-colors z-10"
                                                    >
                                                        <ChevronRight className="w-5 h-5" />
                                                    </button>

                                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                                        {aboutImages.map((_, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => { setAboutDirection(index > aboutSlide ? 1 : -1); setAboutSlide(index); }}
                                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === aboutSlide ? "w-6 bg-accent" : "bg-primary-foreground/50 hover:bg-primary-foreground/70"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    );
                                })()}
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Video Section - Construction Progress */}
                {project.detail?.video_url && getYouTubeEmbedUrl(project.detail.video_url) && (
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
                                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                                    <iframe
                                        src={getYouTubeEmbedUrl(project.detail.video_url)!}
                                        title="Construction Progress Video"
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
                                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-xl -z-10" />
                            </motion.div>
                        </div>
                    </section>
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
                            <a
                                href={`https://www.google.com/maps?q=${project.detail.latitude},${project.detail.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-10"
                                aria-label="Open in Google Maps"
                            />
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
                        {/* Navigation Buttons */}
                        <div className="bg-white py-4">
                            <div className="flex justify-center gap-3">
                                <a
                                    href={`https://3.redirect.appmetrica.yandex.com/route?end-lat=${project.detail.latitude}&end-lon=${project.detail.longitude}&appmetrica_tracking_id=1178268795219780156`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 bg-[#FCE000] rounded-xl hover:brightness-95 transition-all shadow-sm"
                                >
                                    <svg width="110" height="24" viewBox="0 0 880 200" xmlns="http://www.w3.org/2000/svg">
                                        <text x="10" y="155" fontFamily="Montserrat, Arial, sans-serif" fontWeight="600" fontSize="160" fill="black">Яндекс</text>
                                        <text x="630" y="155" fontFamily="Montserrat, Arial, sans-serif" fontWeight="500" fontStyle="italic" fontSize="160" fill="black">Go</text>
                                    </svg>
                                </a>
                                <a
                                    href={`https://waze.com/ul?ll=${project.detail.latitude},${project.detail.longitude}&navigate=yes`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#33CCFF] rounded-xl hover:brightness-95 transition-all shadow-sm"
                                >
                                    <svg width="28" height="28" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M165,75 C165,120 135,150 100,150 C70,150 35,130 20,110 C5,90 20,75 20,75 C20,30 55,5 100,5 C145,5 165,35 165,75 Z" fill="white" stroke="black" strokeWidth="10"/>
                                        <circle cx="75" cy="65" r="10" fill="black"/>
                                        <circle cx="125" cy="65" r="10" fill="black"/>
                                        <path d="M75,105 Q100,130 125,105" fill="none" stroke="black" strokeWidth="8" strokeLinecap="round"/>
                                        <circle cx="55" cy="145" r="18" fill="black"/>
                                        <circle cx="145" cy="145" r="18" fill="black"/>
                                    </svg>
                                    <span className="font-bold text-sm text-black">Waze</span>
                                </a>
                            </div>
                        </div>
                    </section>
                )}

                {/* Architecture Section - Card Layout */}
                {project.architecture_sections && project.architecture_sections.length > 0 && (
                    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
                        <div className="container-main">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-12 text-center uppercase">
                                    {language === 'uz' ? 'Arxitektura' : language === 'ru' ? 'Архитектура' : 'Architecture'}
                                </h2>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {project.architecture_sections.map((section, index) => (
                                        <motion.div
                                            key={section.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.15 }}
                                            className={`rounded-2xl overflow-hidden shadow-xl flex flex-col ${
                                                index % 2 === 1 ? 'md:flex-col-reverse' : ''
                                            }`}
                                        >
                                            {/* Image */}
                                            <div className="h-[280px] overflow-hidden">
                                                <img
                                                    src={section.image_url || ""}
                                                    alt={getField(section.title)}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>

                                            {/* Text */}
                                            <div className={`p-6 flex-1 ${
                                                index % 2 === 1
                                                    ? 'bg-accent/10'
                                                    : 'bg-primary-foreground/5'
                                            }`}>
                                                <h3 className="font-heading text-xl md:text-2xl font-bold mb-3 uppercase">
                                                    {getField(section.title)}
                                                </h3>
                                                <p className="text-primary-foreground/80 text-sm md:text-base leading-relaxed">
                                                    {getField(section.description)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Interior Sections - Carousel */}
                {project.interior_sections && project.interior_sections.length > 0 && (
                    <section className="py-16 md:py-24">
                        <div className="container-main">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-10 uppercase">
                                    {language === 'uz' ? "Ichki qulayliklar" : language === 'ru' ? 'Внутренние удобства' : 'Interior Amenities'}
                                </h2>

                                {(() => {
                                    const sections = project.interior_sections;
                                    const currentSection = sections[currentAmenityIndex % sections.length];
                                    const sectionSlideVariants = {
                                        enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
                                        center: { x: 0, opacity: 1 },
                                        exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
                                    };

                                    return (
                                        <div className="grid md:grid-cols-2 gap-12 items-center">
                                            <div>
                                                <AnimatePresence mode="wait">
                                                    <motion.div
                                                        key={currentAmenityIndex}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <h3 className="font-heading text-2xl font-bold mb-4">
                                                            {getField(currentSection.name)}
                                                        </h3>
                                                        <p className="text-muted-foreground text-lg leading-relaxed">
                                                            {getField(currentSection.description)}
                                                        </p>
                                                    </motion.div>
                                                </AnimatePresence>

                                                {/* Section navigation tabs */}
                                                <div className="flex flex-wrap gap-3 mt-8">
                                                    {sections.map((section, index) => (
                                                        <button
                                                            key={section.id}
                                                            onClick={() => setCurrentAmenityIndex(index)}
                                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                                                index === currentAmenityIndex % sections.length
                                                                    ? "bg-accent text-accent-foreground"
                                                                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                                                            }`}
                                                        >
                                                            {getField(section.name)}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Arrow navigation */}
                                                <div className="flex gap-3 mt-6">
                                                    <button
                                                        onClick={() => setCurrentAmenityIndex((prev) => (prev - 1 + sections.length) % sections.length)}
                                                        className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                                                    >
                                                        <ChevronLeft className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => setCurrentAmenityIndex((prev) => (prev + 1) % sections.length)}
                                                        className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                                                    >
                                                        <ChevronRight className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Section Image Carousel */}
                                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                                <AnimatePresence initial={false} custom={1}>
                                                    <motion.img
                                                        key={currentAmenityIndex}
                                                        src={currentSection.image_url || ""}
                                                        alt={getField(currentSection.name)}
                                                        custom={1}
                                                        variants={sectionSlideVariants}
                                                        initial="enter"
                                                        animate="center"
                                                        exit="exit"
                                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    );
                                })()}
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
