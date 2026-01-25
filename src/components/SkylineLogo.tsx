export default function SkylineLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="48" height="48" rx="10" fill="currentColor" className="text-primary" />
      
      {/* Building 1 - Left (shorter) */}
      <rect x="8" y="22" width="8" height="18" fill="hsl(20, 55%, 50%)" />
      <rect x="10" y="24" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="13" y="24" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="10" y="29" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="13" y="29" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="10" y="34" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="13" y="34" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      
      {/* Building 2 - Center (tallest) */}
      <rect x="18" y="12" width="12" height="28" fill="hsl(20, 55%, 50%)" />
      <rect x="20" y="14" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="23" y="14" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="26" y="14" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="20" y="19" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="23" y="19" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="26" y="19" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="20" y="24" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="23" y="24" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="26" y="24" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="20" y="29" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="23" y="29" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="26" y="29" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="20" y="34" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="23" y="34" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="26" y="34" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      
      {/* Building 3 - Right (medium) */}
      <rect x="32" y="18" width="8" height="22" fill="hsl(20, 55%, 50%)" />
      <rect x="34" y="20" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="37" y="20" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="34" y="25" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="37" y="25" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="34" y="30" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="37" y="30" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="34" y="35" width="2" height="3" fill="hsl(20, 50%, 62%)" />
      <rect x="37" y="35" width="2" height="3" fill="hsl(20, 50%, 62%)" />
    </svg>
  );
}
