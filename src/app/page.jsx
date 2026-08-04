"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function KnowMoreButton() {
  const container = useRef(null);
  const arrowRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: container });

  const onMouseEnter = contextSafe(() => {
    gsap.to(arrowRef.current, {
      x: 24,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(arrowRef.current, { x: -24 });
        gsap.to(arrowRef.current, { x: 0, opacity: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      }
    });
  });

  return (
    <Link 
      href="/behindthelens" 
      ref={container}
      onMouseEnter={onMouseEnter}
      className="flex items-center gap-4 text-[0.65rem] md:text-xs font-bold tracking-[0.25em] uppercase text-foreground/70 hover:text-foreground -rotate-90 whitespace-nowrap origin-center transition-colors duration-500 group"
    >
      <span className="relative pb-1">
        KNOW MORE
        <span className="absolute left-0 bottom-0 w-full h-[1px] bg-foreground origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-hover:origin-left"></span>
      </span>
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-foreground/10 group-hover:border-foreground/40 transition-colors duration-500 overflow-hidden bg-foreground/5">
        <svg ref={arrowRef} className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </Link>
  );
}

export default function Home() {
  const router = useRouter();
  const [clickedImage, setClickedImage] = useState(null);

  // Replace the 'src' values below with your own image paths (e.g., '/images/your-image.jpg')
  // Update the titles and href to point to your new destinations
  const images = [
    { src: "/images/mustang/Landing.jpg", height: "h-[45vh] md:h-[50vh]", alt: "Mustang landscape", title1: "Echoes", title2: "Of", title3: "MUSTANG", href: "/mustang" },
    { src: "/images/pokhara/Landing.jpg", height: "h-[55vh] md:h-[65vh]", alt: "Pokhara view", title1: "Lakes", title2: "Of", title3: "POKHARA", href: "/pokhara" },
    { src: "https://picsum.photos/400/800?random=3", height: "h-[65vh] md:h-[80vh]", alt: "Manang mountains", title1: "Spirit", title2: "Of", title3: "MANANG", href: "/manang" },
    { src: "https://picsum.photos/400/800?random=4", height: "h-[55vh] md:h-[65vh]", alt: "Sunlight through clouds", title1: "Heart", title2: "Of", title3: "NEPAL", href: "/nepal" },
    { src: "https://picsum.photos/400/800?random=5", height: "h-[45vh] md:h-[50vh]", alt: "Mountain village", title1: "Soul", title2: "Of", title3: "HIMALAYAS", href: "/himalayas" },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Navigation */}
      <nav className={`w-full flex justify-between items-start p-8 md:p-12 lg:px-16 absolute top-0 z-10 transition-opacity duration-500 ${clickedImage !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col items-center">
          <h1
            className="text-6xl md:text-7xl font-light tracking-tighter text-foreground"
            style={{ fontFamily: 'Brush Script MT, cursive, sans-serif' }}
          >
            lynx.
          </h1>
          <p className="text-[0.45rem] md:text-[0.55rem] font-bold tracking-[0.15em] text-foreground uppercase leading-tight text-center mt-2">
            Wonderful, as we seen them<br />
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
          {images.map((img, index) => {
            const isActive = clickedImage === index;
            const isAnyActive = clickedImage !== null;

            return (
              <motion.div
                layoutId={`image-container-${index}`}
                key={index}
                initial={{ opacity: 0, y: 80 }}
                animate={{
                  opacity: isAnyActive && !isActive ? 0 : 1,
                  y: 0
                }}
                transition={{
                  duration: 1,
                  delay: isAnyActive ? 0 : index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => {
                  if (clickedImage === null) {
                    setClickedImage(index);
                  }
                }}
                className={`relative flex-1 w-full ${img.height} overflow-hidden group ${isAnyActive && !isActive ? 'pointer-events-none' : 'cursor-pointer'}`}
              >
                <motion.div layoutId={`image-${index}`} className="w-full h-full relative">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className={`object-cover transition-all duration-1000 ease-out ${isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`}
                    unoptimized
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Right side text */}
      <div className={`absolute right-4 md:right-8 top-1/2 flex items-center justify-center w-12 h-12 -translate-y-1/2 transition-opacity duration-500 ${clickedImage !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <KnowMoreButton />
      </div>

      {/* Full Screen Cinematic Overlay */}
      <AnimatePresence>
        {clickedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              layoutId={`image-container-${clickedImage}`}
              className="absolute inset-0 z-40"
              initial={{ borderRadius: "16px" }}
              animate={{ borderRadius: "0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div layoutId={`image-${clickedImage}`} className="w-full h-full relative">
                <Image
                  src={images[clickedImage].src}
                  alt={images[clickedImage].alt}
                  fill
                  className="object-cover grayscale-0"
                  unoptimized
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            <motion.div
              className="relative z-50 flex flex-col items-center justify-center text-center px-4"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl text-white font-serif tracking-widest mb-4" style={{ textShadow: '2px 2px 20px rgba(0,0,0,0.8)' }}>
                {images[clickedImage].title1}
              </h2>
              <h3 className="text-2xl md:text-4xl text-white/80 font-serif tracking-[0.3em] mb-4">
                {images[clickedImage].title2}
              </h3>
              <h1 className="text-6xl md:text-8xl lg:text-[9rem] text-[#E5D3B3] font-serif tracking-tighter uppercase" style={{ textShadow: '0 0 40px rgba(229,211,179,0.3)' }}>
                {images[clickedImage].title3}
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-12 pointer-events-auto"
              >
                <button
                  onClick={() => router.push(images[clickedImage].href)}
                  className="px-8 py-4 border border-white/30 rounded-full text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500"
                >
                  Explore Story
                </button>
              </motion.div>
            </motion.div>

            <motion.button
              className="absolute top-8 right-8 md:top-12 md:right-12 z-50 text-white hover:text-white/70 transition-colors pointer-events-auto flex items-center gap-2"
              onClick={() => setClickedImage(null)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Back</span>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
