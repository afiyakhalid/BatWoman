import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <div className="relative aspect-[827/748] h-14 sm:h-18 md:h-20 transition-transform duration-300 hover:scale-105">
        <Image
          src="/images/logo/logo-transparent.png"
          alt="Zubayda by A³ - Haute Abaya"
          fill
          priority
          sizes="(max-width: 640px) 70px, (max-width: 768px) 90px, 120px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
