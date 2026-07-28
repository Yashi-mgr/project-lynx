"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MustangGallery() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  // Initial center scroll position
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      // Start near the middle-left instead of exact center for better initial view
      container.scrollLeft = (container.scrollWidth - container.clientWidth) * 0.1;
      container.scrollTop = (container.scrollHeight - container.clientHeight) * 0.2;
    }
  }, []);

  useEffect(() => {
    // Hide intro after 7 seconds to let the staggered words finish and rest
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;
    const walkX = (x - startX) * 1.5; // scroll speed multiplier
    const walkY = (y - startY) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  const galleryImages = [
    { src: "https://picsum.photos/800/600?random=11", top: "10%", left: "5%", width: "400px" },
    { src: "https://picsum.photos/600/800?random=12", top: "5%", left: "35%", width: "300px" },
    { src: "https://picsum.photos/800/600?random=13", top: "15%", left: "65%", width: "450px" },
    { src: "https://picsum.photos/600/800?random=14", top: "45%", left: "15%", width: "350px" },
    { src: "https://picsum.photos/800/600?random=15", top: "55%", left: "45%", width: "400px" },
    { src: "https://picsum.photos/600/800?random=16", top: "40%", left: "80%", width: "300px" },
    { src: "https://picsum.photos/800/600?random=17", top: "75%", left: "8%", width: "450px" },
    { src: "https://picsum.photos/600/800?random=18", top: "85%", left: "38%", width: "350px" },
    { src: "https://picsum.photos/800/600?random=19", top: "70%", left: "70%", width: "500px" },
  ];

  const text1 = "Mustang".split(" ");
  const text2 = "The Story of Mustang".split(" ");
  const text3 = "A journey through Nepal's hidden kingdom, where every mountain, monastery, and trail holds a story waiting to be discovered.".split(" ");

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: i * 0.12 + 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }
    }),
    exit: (i) => ({
      opacity: 0,
      y: -20,
      filter: "blur(15px)",
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#8cb7d4]">
      {/* Intro Text Animation Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#8cb7d4] text-white px-8 text-center pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 2, ease: "easeInOut" } }}
          >
            <div className="max-w-3xl space-y-12">
              <div className="text-6xl md:text-8xl font-serif tracking-widest uppercase text-[#F3E5AB]" style={{ textShadow: '2px 2px 20px rgba(0,0,0,0.2)' }}>
                {text1.map((word, i) => (
                  <motion.span key={i} custom={i} variants={wordVariants} initial="hidden" animate="visible" exit="exit" className="inline-block mx-3">
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="text-3xl md:text-5xl font-serif text-white/95">
                {text2.map((word, i) => (
                  <motion.span key={i} custom={i + text1.length} variants={wordVariants} initial="hidden" animate="visible" exit="exit" className="inline-block mx-2">
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="text-xl md:text-3xl font-light leading-relaxed text-white/80 max-w-2xl mx-auto">
                {text3.map((word, i) => (
                  <motion.span key={i} custom={i + text1.length + text2.length} variants={wordVariants} initial="hidden" animate="visible" exit="exit" className="inline-block mx-1">
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Sidebar Text */}
      <div className="absolute left-0 top-0 h-full w-24 md:w-32 flex items-center justify-center z-50 pointer-events-none">
        <h1 
          className="text-6xl md:text-[7rem] lg:text-[8rem] font-sans tracking-widest text-[#5c85a6] -rotate-90 whitespace-nowrap mix-blend-multiply opacity-70" 
          style={{ fontWeight: 300, transformOrigin: 'center center' }}
        >
          MUSTANG
        </h1>
      </div>

      {/* 2D Scrollable Area */}
      <div 
        ref={containerRef}
        className={`w-full h-full overflow-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="relative w-[250vw] h-[200vh] min-w-[2000px] min-h-[1500px]">
          {/* Back button */}
          <div className="absolute top-12 left-32 z-50">
            <Link href="/" className="text-black/60 hover:text-black transition-colors font-medium flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Start
            </Link>
          </div>

          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute group shadow-2xl"
              style={{
                top: img.top,
                left: img.left,
                width: img.width,
                aspectRatio: img.src.includes('800/600') ? '4/3' : '3/4'
              }}
            >
              <div className="relative w-full h-full border-[6px] border-white/20 overflow-hidden">
                <Image
                  src={img.src}
                  alt={`Mustang image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  unoptimized
                  draggable="false"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Hide scrollbar styles for webkit */}
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
