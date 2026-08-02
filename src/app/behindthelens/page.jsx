import Link from "next/link";
import Image from "next/image";
import { Dancing_Script, Caveat } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400"] });

export default function BehindTheLens() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row relative">
      {/* Back button (optional, but good for navigation) */}
      <div className="absolute top-8 left-8 z-50">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-sm font-medium tracking-widest text-black/60 hover:text-black transition-colors group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back
        </Link>
      </div>

      {/* Left side */}
      <div className="w-full md:w-1/2 flex flex-col items-center p-8 relative min-h-screen md:min-h-[auto]">
        <div className="flex-1 flex items-center justify-center w-full max-w-sm mx-auto mb-32 md:mb-0">
          <div className="w-full aspect-[4/5] relative bg-black/5 flex items-center justify-center rounded-sm overflow-hidden">
            {/* When you have the image, uncomment the Image component below and set the src */}
            {/* <Image src="/photographer.jpg" alt="Photographer" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" /> */}
            <div className="text-black/30 tracking-widest uppercase text-sm">Image Placeholder</div>
          </div>
        </div>
        
        <div className="absolute bottom-16 left-0 w-full flex flex-col items-center">
           <h3 className="text-sm font-semibold tracking-[0.2em] mb-6 uppercase">Reach out via</h3>
           <div className="flex gap-6">
             <a href="#" className="hover:opacity-70 transition-opacity">
                {/* LinkedIn */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
             </a>
             <a href="#" className="hover:opacity-70 transition-opacity">
                {/* Github */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
             </a>
             <a href="#" className="hover:opacity-70 transition-opacity">
                {/* Gmail/Mail */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
             </a>
           </div>
        </div>
      </div>

      {/* Middle Line */}
      <div className="hidden md:block w-[1px] h-3/4 bg-black/30 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Right side */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:px-16 md:py-24 relative min-h-screen md:min-h-[auto]">
        {/* Logo at the top right-ish */}
        <div className="w-full flex justify-center md:justify-end md:pr-16 mb-24">
          <h1 className={`${dancingScript.className} text-7xl md:text-[7rem] leading-none`}>lynx</h1>
        </div>

        {/* Quote & Text */}
        <div className="flex flex-col max-w-lg mx-auto">
          <h2 className={`${dancingScript.className} text-3xl md:text-4xl mb-8`}>
            Behind every frame is a story waiting to be felt.
          </h2>
          
          <div className={`${caveat.className} text-xl md:text-2xl text-black/80 leading-snug space-y-2`}>
            <p>Lynx was created to celebrate places through emotion, light, and perspective.</p>
            <p>Every image is captured with patience and purpose not simply to document a destination,</p>
            <p>but to preserve its atmosphere, culture, and soul.</p>
            <p>Through work, turning the camera becomes more than a tool,</p>
            <p>it becomes a way of sharing experiences that words alone cannot express.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
