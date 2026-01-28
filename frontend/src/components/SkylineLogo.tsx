export default function SkylineLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Building 1 - Left (Empire State style) */}
      <rect x="2" y="14" width="10" height="18" fill="currentColor" className="text-primary" />
      <rect x="5" y="10" width="4" height="4" fill="currentColor" className="text-primary" />
      <rect x="6" y="6" width="2" height="4" fill="currentColor" className="text-primary" />
      {/* Windows */}
      <rect x="4" y="16" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="8" y="16" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="4" y="20" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="8" y="20" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="4" y="24" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="8" y="24" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      
      {/* Building 2 - Center (Chrysler style - tallest) */}
      <rect x="14" y="8" width="14" height="24" fill="currentColor" className="text-primary" />
      <polygon points="21,0 14,8 28,8" fill="currentColor" className="text-primary" />
      {/* Windows */}
      <rect x="16" y="10" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="20" y="10" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="24" y="10" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="16" y="14" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="20" y="14" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="24" y="14" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="16" y="18" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="20" y="18" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="24" y="18" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="16" y="22" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="20" y="22" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="24" y="22" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="16" y="26" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="20" y="26" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="24" y="26" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      
      {/* Building 3 - Right (Modern tower) */}
      <rect x="30" y="12" width="12" height="20" fill="currentColor" className="text-primary" />
      <rect x="33" y="8" width="6" height="4" fill="currentColor" className="text-primary" />
      {/* Windows */}
      <rect x="32" y="14" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="36" y="14" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="32" y="18" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="36" y="18" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="32" y="22" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="36" y="22" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="32" y="26" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="36" y="26" width="2" height="2" fill="hsl(40 30% 95%)" opacity="0.6" />
      
      {/* Building 4 - Far right (shorter) */}
      <rect x="44" y="18" width="8" height="14" fill="currentColor" className="text-primary" />
      {/* Windows */}
      <rect x="46" y="20" width="1.5" height="1.5" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="49" y="20" width="1.5" height="1.5" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="46" y="24" width="1.5" height="1.5" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="49" y="24" width="1.5" height="1.5" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="46" y="28" width="1.5" height="1.5" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="49" y="28" width="1.5" height="1.5" fill="hsl(40 30% 95%)" opacity="0.6" />
      
      {/* Building 5 - Smallest on right */}
      <rect x="54" y="22" width="6" height="10" fill="currentColor" className="text-primary" />
      <rect x="55.5" y="24" width="1.5" height="1.5" fill="hsl(40 30% 95%)" opacity="0.6" />
      <rect x="55.5" y="27" width="1.5" height="1.5" fill="hsl(40 30% 95%)" opacity="0.6" />
    </svg>
  );
}