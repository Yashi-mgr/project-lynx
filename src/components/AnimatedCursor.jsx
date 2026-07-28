"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function AnimatedCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const cursorX = useSpring(0, { stiffness: 250, damping: 15, mass: 0.5 });
  const cursorY = useSpring(0, { stiffness: 250, damping: 15, mass: 0.5 });
  const dotX = useSpring(0, { stiffness: 1000, damping: 40, mass: 0.1 });
  const dotY = useSpring(0, { stiffness: 1000, damping: 40, mass: 0.1 });

  useEffect(() => {
    setIsMounted(true);
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const isClickable = 
        e.target.tagName?.toLowerCase() === "a" ||
        e.target.tagName?.toLowerCase() === "button" ||
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(e.target).cursor === "pointer";
      
      setIsHovering(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  // Don't render on server
  if (!isMounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border-2 border-foreground/80 pointer-events-none z-[99999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "currentColor" : "rgba(0, 0, 0, 0)",
          borderColor: isHovering ? "rgba(0, 0, 0, 0)" : "currentColor"
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-foreground pointer-events-none z-[99999] mix-blend-difference hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
        }}
      />
    </>
  );
}
