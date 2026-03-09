import { db } from "@/lib/db";
import { socialLinks } from "@/lib/schema";
import { asc, eq } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import SocialCarousel from "@/components/public/SocialCarousel";
import BackgroundVideo from "@/components/public/BackgroundVideo";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const links = await db
    .select()
    .from(socialLinks)
    .where(eq(socialLinks.active, true))
    .orderBy(asc(socialLinks.displayOrder));

  const appName = process.env.NEXT_PUBLIC_APP_NAME || "Cityfirstfoods";

  return (
    <main className="min-h-screen relative flex flex-col items-center overflow-x-hidden" style={{ background: '#ffffff', fontFamily: '"Capriola", sans-serif' }}>
      {/* Background video */}
      <BackgroundVideo src="/5538178-uhd_4096_2160_25fps.mp4" />

      {/* Black overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.7)', zIndex: 1 }} />

      {/* Content */}
      <div className="relative z-10 w-full py-14 flex flex-col items-center">

        {/* Logo & Brand */}
        <div className="flex flex-col items-center mb-10 px-4">
          <div className="relative mb-5 w-72 h-32">
            <Image
              src="/main-logo.png"
              alt={appName}
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: '"Co Headline", sans-serif' }}>
            <span style={{ color: '#006443' }}>CITY</span>
            <span style={{ color: '#F16726' }}>{appName.slice(4)}</span>
          </h1>
          <p className="mt-1.5 text-sm">
            <span style={{ color: '#006443' }}>Fresh. </span>
            <span style={{ color: '#F16726' }}>Global. </span>
            <span style={{ color: '#006443' }}>Reliable. </span>
            <span style={{ color: '#F16726' }}>Intentional.</span>
          </p>

          {/* Divider */}
          <div className="mt-5 flex items-center gap-2">
            <span className="w-6 h-px bg-white/20" />
            <span className="text-base font-bold tracking-widest" style={{ fontFamily: '"Co Headline", sans-serif' }}>
              <span style={{ color: '#006443' }}>CONNECT </span>
              <span style={{ color: '#F16726' }}>WITH </span>
              <span style={{ color: '#006443' }}>US</span>
            </span>
            <span className="w-6 h-px bg-white/20" />
          </div>
        </div>

        {/* Social Links Carousel */}
        <div className="w-full" style={{ marginTop: "50px" }}>
          <SocialCarousel links={links} />
        </div>

        {/* Footer */}
        <footer className="mt-14 flex flex-col items-center gap-2 px-4">

        </footer>
      </div>
    </main>
  );
}
