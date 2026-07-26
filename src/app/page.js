"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const images = [
    { src: "https://picsum.photos/400/800?random=1", height: "h-[45vh] md:h-[50vh]", alt: "Mountain landscape" },
    { src: "https://picsum.photos/400/800?random=2", height: "h-[55vh] md:h-[65vh]", alt: "Road through fog" },
    { src: "https://picsum.photos/400/800?random=3", height: "h-[65vh] md:h-[80vh]", alt: "Rocky mountain peak" },
    { src: "https://picsum.photos/400/800?random=4", height: "h-[55vh] md:h-[65vh]", alt: "Sunlight through clouds" },
    { src: "https://picsum.photos/400/800?random=5", height: "h-[45vh] md:h-[50vh]", alt: "Mountain village" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Navigation */}
      <nav className="w-full flex justify-between items-start p-8 md:p-12 lg:px-16 absolute top-0 z-10">
        <div className="flex flex-col items-center">
          {/* Logo - Using a cursive font as a placeholder until the image is uploaded */}
          <h1 
            className="text-6xl md:text-7xl font-light tracking-tighter text-foreground" 
            style={{ fontFamily: 'Brush Script MT, cursive, sans-serif' }}
          >
            lynx.
          </h1>
          <p className="text-[0.45rem] md:text-[0.55rem] font-bold tracking-[0.15em] text-foreground uppercase leading-tight text-center mt-2">
            Wonderful, as we seen them<br/>
            Since 2011
          </p>
        </div>
        
        <div className="flex gap-8 mt-4 md:mt-6">
          <a href="#" className="text-sm font-medium hover:text-foreground/60 transition-colors">Blog</a>
          <a href="#" className="text-sm font-medium hover:text-foreground/60 transition-colors">About</a>
        </div>
      </nav>

      {/* Main Gallery */}
      <main className="flex-1 flex items-center justify-center w-full px-12 md:px-24">
        <div className="flex items-center justify-center w-full max-w-5xl">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1], // Custom spring-like ease for a premium feel
              }}
              className={`relative flex-1 w-full ${img.height} overflow-hidden group`}
            >
              {/* Note: Remove 'unoptimized' and use local paths (e.g., '/images/photo1.jpg') when adding your own images */}
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out cursor-pointer"
                unoptimized
              />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Right side text */}
      <div className="absolute right-4 md:right-12 top-1/2 flex items-center justify-center w-8 h-8 -translate-y-1/2">
        <Link href="/behindthelens" className="flex items-center gap-2 text-sm font-medium tracking-widest text-foreground/80 -rotate-90 whitespace-nowrap origin-center hover:text-foreground transition-colors group">
          Know More 
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </div>
    </div>
  );
}
