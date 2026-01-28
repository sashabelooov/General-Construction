import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import FilterSection from "@/components/home/FilterSection";
import ConsultationSection from "@/components/home/ConsultationSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <FilterSection />
        <ConsultationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
