import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/home/Logo";

export const metadata = {
  title: "Brand Story | Zubayda by A³",
  description: "Wear your grace in the worldly race. The story, memory, and heritage behind Zubayda by A³.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4EFEB] text-[#2C2420] antialiased selection:bg-[#D4AF37] selection:text-white">
      {/* 1. Dramatic Stage Curtain Top Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-[#2D1F1A] sm:h-56 lg:h-64">
        {/* Soft fabric curtain gradient folds */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, #1A120F 0px, #3E2723 35px, #5D4037 70px, #3E2723 105px, #1A120F 140px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#F4EFEB]" />
      </div>

      {/* 2. Floating Arch Header with Official Logo */}
      <section className="relative mx-auto -mt-24 max-w-4xl px-6 text-center sm:-mt-32">
        <div className="mx-auto inline-flex flex-col items-center justify-center rounded-3xl border border-[#D4AF37]/40 bg-[#FAF7F2] p-8 shadow-[0_25px_60px_rgba(45,31,26,0.12)] sm:p-12">
          {/* Your uploaded logo rendered large */}
          <div className="relative h-24 w-56 sm:h-32 sm:w-72">
            <Image
              src="/images/logo/logo.png"
              alt="Zubayda by A³ Official Emblem"
              fill
              priority
              className="object-contain"
            />
          </div>

          <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-medium sm:text-xs">
            ✦ Wear your grace in the worldly race ✦
          </p>
        </div>

        <h1 className="mt-14 font-[var(--font-playfair)] text-4xl font-normal leading-tight text-[#1E1613] sm:text-5xl lg:text-6xl">
          More than just a name. <br />
          <em className="font-normal italic text-[#6D5548]">
            A feeling of love, warmth, strength and grace.
          </em>
        </h1>
        <div className="mx-auto mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-[#C5A059]" />
          <span className="text-xs text-[#C5A059]">✦</span>
          <span className="h-px w-16 bg-[#C5A059]" />
        </div>
      </section>

      {/* 3. The Grand Arched Editorial Story Frame */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#D9C8B4] bg-[#FAF7F2] shadow-[0_30px_90px_rgba(62,39,35,0.08)]">
          {/* Warm Silk Curtain Accent Trim (Left Border) */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-[#8C6D4F] via-[#D4AF37] to-[#5D4037]" />

          <div className="grid gap-14 p-8 sm:p-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20 lg:p-20 items-center">

            {/* LEFT: Arched Portrait of Abaya Fabric & Calligraphy */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              {/* Architectural Arch Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[120px] rounded-b-2xl border-2 border-[#C5A059]/40 bg-[#3E2723] shadow-2xl">
                <Image
                  src="https://res.cloudinary.com/m0okzag4/image/upload/f_auto,q_auto/landingpage"
                  alt="Zubayda by A³ Abaya Drape"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Dark Silk Velvet Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1F1A] via-transparent to-black/20" />

                {/* Bottom Calligraphy Watermark */}
                <div className="absolute bottom-8 left-0 right-0 text-center text-white px-6">
                  <span
                    lang="ar"
                    dir="rtl"
                    className="block text-4xl text-[#F5EFEB] font-normal"
                    style={{ fontFamily: "'Amiri', serif" }}
                  >
                    زُبَيْدَة
                  </span>
                  <span className="mt-2 block text-[10px] tracking-[0.35em] uppercase text-[#D4AF37]">
                    Haute Modesty
                  </span>
                </div>
              </div>

              {/* Decorative Corner Filigree */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-t-[120px] rounded-b-2xl border border-[#C5A059]/30" />
            </div>

            {/* RIGHT: The Narrative Text */}
            <div className="space-y-8 font-[var(--font-playfair)] text-lg leading-[2.1] text-[#2C2420] sm:text-xl sm:leading-[2.2]">
              <div className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-[#8C6D4F]">
                <span>01</span>
                <span className="h-px w-10 bg-[#C5A059]" />
                <span>Our Heritage</span>
              </div>

              {/* Grandmother Story */}
              <p>
                The name <strong className="font-semibold text-[#1A120F]">&ldquo;Zubayda,&rdquo;</strong> our beloved grandmother’s name, holds a special place in our hearts. It is more than just a name. It is a feeling of love, warmth, strength and grace. A reminder of the values she passed down, the way she carried herself with dignity and the quiet elegance that never faded, no matter the time.
              </p>

              {/* Craftsmanship Quote Box */}
              <div className="relative my-8 rounded-xl border-l-4 border-[#C5A059] bg-[#F3ECE4] p-6 italic text-[#1E1613]">
                <p>
                  &ldquo;Our collection is created with the same love and intention for the woman who values quality over quantity, who believes in timeless pieces, and who chooses elegance in every aspect of her life. Each piece is crafted to be more than just an outfit, but a part of your story that lasts.&rdquo;
                </p>
              </div>

              {/* Historical Legacy */}
              <p>
                At Zubayda, we also draw inspiration from the life of <strong className="font-semibold text-[#1A120F]">Hazrat Zubayda bint Ja&apos;far (RA)</strong>, a woman of faith, kindness and generosity. She was known for her strength, wisdom and compassion, and her legacy continues to remind us of the beauty of a woman who leads with faith, carries herself with modesty and leaves a positive impact wherever she goes.
              </p>

              {/* Empowering Purpose */}
              <p>
                Just like her, we believe in building a brand that empowers women through modest fashion, meaningful choices and a deep connection to our faith and timeless values.
              </p>

              {/* Signature Sign-Off */}
              <div className="pt-10 border-t border-[#E5DACD] text-center sm:text-left">
                <span className="block font-[var(--font-playfair)] text-2xl italic text-[#6D5548]">
                  Just like them,
                </span>
                <span className="mt-2 block font-[var(--font-playfair)] text-4xl font-semibold tracking-wider text-[#1E1613]">
                  Zubayda
                </span>
                <span className="mt-1 block font-sans text-xs uppercase tracking-[0.3em] text-[#8C6D4F]">
                  by A³
                </span>
              </div>


<div className="pt-6">
  <Link
    href="/customer/products"
    className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#2D1F1A] px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF7F2] opacity-100 shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-[#4E342E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] focus-visible:ring-offset-2"
  >
    <span className="!text-[#FAF7F2] !opacity-100">
      Explore the Collection
    </span>
    <span aria-hidden="true" className="!text-[#FAF7F2] !opacity-100">
      →
    </span>
  </Link>
</div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}