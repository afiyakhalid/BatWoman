import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/*
        The radial-gradient mask softly dissolves the rectangular outer edges
        so the image melts seamlessly into the navbar!
      */}
      <div
        className="relative h-16 w-40 sm:h-20 sm:w-48 md:h-22 md:w-56 transition-transform duration-300 hover:scale-105"
        style={{
          maskImage:
            "radial-gradient(ellipse 95% 85% at 50% 50%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 95% 85% at 50% 50%, black 60%, transparent 100%)",
        }}
      >
        <Image
          src="https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/logo1"
          alt="Zubayda by A³ - Haute Abaya"
          fill
          priority
          sizes="(max-width: 768px) 160px, 220px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
