"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { placesData } from "@/data/places";

export default function PlaceGallery() {
  const params = useParams();
  const router = useRouter();
  const placeId = params?.place;
  const placeData = placesData[placeId];

  const containerRef = useRef(null);
  const dragRef = useRef({ isDragging: false, lastX: 0, lastY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [viewMode, setViewMode] = useState("gallery");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Initial center scroll position (start at the center block of the 3x3 grid)
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const blockWidth = container.scrollWidth / 3;
      const blockHeight = container.scrollHeight / 3;
      
      // Center the view on the middle block
      container.scrollLeft = blockWidth + (blockWidth - container.clientWidth) / 2;
      container.scrollTop = blockHeight + (blockHeight - container.clientHeight) / 2;
    }
  }, [placeId, viewMode]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollTop, scrollWidth, scrollHeight } = containerRef.current;
    
    // Each block is 1/3 of the total scrollable width/height
    const blockWidth = scrollWidth / 3;
    const blockHeight = scrollHeight / 3;

    let newScrollLeft = scrollLeft;
    let newScrollTop = scrollTop;

    // Wrap horizontally
    if (scrollLeft < blockWidth * 0.5) newScrollLeft += blockWidth;
    else if (scrollLeft > blockWidth * 1.5) newScrollLeft -= blockWidth;

    // Wrap vertically
    if (scrollTop < blockHeight * 0.5) newScrollTop += blockHeight;
    else if (scrollTop > blockHeight * 1.5) newScrollTop -= blockHeight;

    if (newScrollLeft !== scrollLeft || newScrollTop !== scrollTop) {
      // If actively dragging, adjust the drag origin to prevent jumping
      if (dragRef.current.isDragging) {
        dragRef.current.lastX += (scrollLeft - newScrollLeft) / 1.5;
        dragRef.current.lastY += (scrollTop - newScrollTop) / 1.5;
      }
      containerRef.current.scrollLeft = newScrollLeft;
      containerRef.current.scrollTop = newScrollTop;
    }
  };

  if (!placeData) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Place not found</h1>
          <Link href="/" className="underline hover:text-gray-300">Return Home</Link>
        </div>
      </div>
    );
  }

  const handleMouseDown = (e) => {
    dragRef.current = { isDragging: true, lastX: e.pageX, lastY: e.pageY };
    setIsDragging(true);
  };

  const handleMouseLeave = () => {
    dragRef.current.isDragging = false;
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    dragRef.current.isDragging = false;
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!dragRef.current.isDragging) return;
    e.preventDefault();
    const deltaX = (e.pageX - dragRef.current.lastX) * 1.5;
    const deltaY = (e.pageY - dragRef.current.lastY) * 1.5;
    dragRef.current.lastX = e.pageX;
    dragRef.current.lastY = e.pageY;
    
    containerRef.current.scrollLeft -= deltaX;
    containerRef.current.scrollTop -= deltaY;
  };

  const text1 = placeData.titleText.split(" ");
  const text2 = placeData.subtitleText.split(" ");
  const text3 = placeData.descriptionText.split(" ");

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
    <div 
      className="relative w-screen h-screen bg-black overflow-hidden"
      style={{ perspective: "2000px" }}
    >
      <motion.div
        className="w-full h-full relative"
        initial={false}
        animate={{ rotateY: showIntro ? -180 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT FACE (Gallery) */}
        <motion.div 
          className="absolute inset-0 w-full h-full transition-colors duration-1000"
          style={{ 
            backgroundColor: placeData.theme.bg,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            pointerEvents: showIntro ? 'none' : 'auto'
          }}
          initial={false}
          animate={{ opacity: showIntro ? 0 : 1 }}
          transition={{ duration: 0.1, delay: 0.25 }}
        >
      {/* Gallery content begins */}

      {/* Fixed Sidebar Text */}
      <div className="absolute left-0 top-0 h-full w-24 md:w-32 flex items-center justify-center z-50 pointer-events-none">
        <h1 
          className="text-6xl md:text-[7rem] lg:text-[8rem] font-sans tracking-widest -rotate-90 whitespace-nowrap mix-blend-multiply opacity-70" 
          style={{ 
            color: placeData.theme.sidebarText, 
            fontWeight: 300, 
            transformOrigin: 'center center' 
          }}
        >
          {placeData.titleText.toUpperCase()}
        </h1>
      </div>

      {/* Back button */}
      <div className="absolute top-12 left-12 md:left-32 z-50">
        <Link href="/" className="text-white hover:text-white/80 transition-colors font-medium flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-sm hover:bg-white/20">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Start
        </Link>
      </div>

      {/* View Toggle */}
      <div className="absolute top-12 right-12 z-50 flex gap-2 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-lg">
        <button 
          onClick={() => setViewMode("gallery")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${viewMode === "gallery" ? "bg-white text-black shadow-sm" : "text-white hover:bg-white/20"}`}
        >
          Gallery
        </button>
        <button 
          onClick={() => setViewMode("single")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${viewMode === "single" ? "bg-white text-black shadow-sm" : "text-white hover:bg-white/20"}`}
        >
          Single
        </button>
      </div>

      {/* Unfold Story Button */}
      <div className="absolute bottom-12 left-12 z-50">
        <button 
          onClick={() => setShowIntro(true)}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white text-xs font-bold tracking-widest uppercase transition-all shadow-lg flex items-center gap-3 group"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>
          Unfold the story
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "gallery" ? (
          <motion.div
            key="gallery-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
            style={{ pointerEvents: showIntro ? 'none' : 'auto' }}
          >
            {/* 2D Scrollable Area */}
            <div 
              ref={containerRef}
              className={`w-full h-full overflow-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onScroll={handleScroll}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div 
                className="relative"
                style={{
                  width: '660vw',
                  height: '660vh',
                  minWidth: '5400px',
                  minHeight: '5400px'
                }}
              >
                {[
                  { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
                  { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 },
                  { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }
                ].map((pos, gridIndex) => (
                  <div 
                    key={gridIndex} 
                    className="absolute"
                    style={{
                      left: `${pos.x * 33.33333}%`,
                      top: `${pos.y * 33.33333}%`,
                      width: '33.33333%',
                      height: '33.33333%'
                    }}
                  >
                    {placeData.images.map((img, index) => (
                      <motion.div
                        key={`${gridIndex}-${index}`}
                        initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ root: containerRef, once: false, amount: 0.15 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
                            alt={`${placeData.titleText} image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                            unoptimized
                            draggable="false"
                            priority={index < 4 && pos.x === 1 && pos.y === 1}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="single-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative pointer-events-auto shadow-2xl"
                style={{
                  width: placeData.images[currentImageIndex].width,
                  aspectRatio: placeData.images[currentImageIndex].src.includes('800/600') ? '4/3' : '3/4',
                  maxWidth: '70vw',
                  maxHeight: '75vh'
                }}
              >
                <div className="relative w-full h-full border-[6px] border-white/20 overflow-hidden">
                  <Image
                    src={placeData.images[currentImageIndex].src}
                    alt={`${placeData.titleText} image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                    draggable="false"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 pointer-events-auto">
              <button 
                onClick={() => setCurrentImageIndex(prev => (prev > 0 ? prev - 1 : placeData.images.length - 1))}
                className="p-4 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full border border-white/30 text-white transition-all hover:-translate-y-1 shadow-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              </button>
              <button 
                onClick={() => setCurrentImageIndex(prev => (prev < placeData.images.length - 1 ? prev + 1 : 0))}
                className="p-4 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full border border-white/30 text-white transition-all hover:translate-y-1 shadow-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
        </motion.div>

        {/* BACK FACE (Story) */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-white px-8 text-center"
          style={{ 
            backgroundColor: placeData.theme.bg,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            pointerEvents: showIntro ? 'auto' : 'none'
          }}
          initial={false}
          animate={{ opacity: showIntro ? 1 : 0 }}
          transition={{ duration: 0.1, delay: 0.25 }}
        >
          <button 
            onClick={() => setShowIntro(false)}
            className="absolute top-12 right-12 z-[110] text-white/70 hover:text-white transition-colors p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 cursor-pointer shadow-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <AnimatePresence>
            {showIntro && (
              <motion.div 
                className="max-w-3xl space-y-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div 
                  className="text-6xl md:text-8xl font-serif tracking-widest uppercase" 
                  style={{ color: placeData.theme.textHighlight, textShadow: '2px 2px 20px rgba(0,0,0,0.2)' }}
                >
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Hide scrollbar styles for webkit */}
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
