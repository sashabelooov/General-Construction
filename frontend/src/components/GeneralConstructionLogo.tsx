interface GeneralConstructionLogoProps {
  className?: string;
}

export default function GeneralConstructionLogo({
  className = "h-12 w-12",
}: GeneralConstructionLogoProps) {
  return (
    <img
      src="/General_Logo.png"
      alt="General Construction"
      className={className}
    />
  );
}
