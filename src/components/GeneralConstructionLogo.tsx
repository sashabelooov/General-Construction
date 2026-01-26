import logoImage from "@/assets/general-construction-logo.png";

interface GeneralConstructionLogoProps {
  className?: string;
  showText?: boolean;
}

export default function GeneralConstructionLogo({ 
  className = "h-12 w-auto", 
  showText = true 
}: GeneralConstructionLogoProps) {
  return (
    <div className="flex items-center gap-3">
      <img 
        src={logoImage} 
        alt="General Construction Logo" 
        className={className}
      />
      {showText && (
        <div className="hidden sm:block">
          <span className="font-heading font-bold text-lg text-accent tracking-wide">GENERAL</span>
          <span className="font-heading font-bold text-lg text-accent tracking-wide block -mt-1">CONSTRUCTION</span>
        </div>
      )}
    </div>
  );
}
