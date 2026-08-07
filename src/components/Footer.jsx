import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-black/95 backdrop-blur-lg border-t border-white/10 py-12 px-8 md:px-12 lg:px-16 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <Image 
          src="/images/Logo.png" 
          alt="Lynx Logo" 
          width={240} 
          height={96} 
          className="w-auto h-16 md:h-24 mb-8 invert" 
          unoptimized 
        />
        
        <p className="text-white/80 font-serif text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed mb-12">
          Photography that tells stories,<br className="hidden md:block" /> not just captures moments.
        </p>

        <div className="flex gap-8 mb-12">
          <a href="#" className="text-white text-sm font-bold tracking-[0.2em] uppercase hover:text-white/60 transition-colors">Instagram</a>
          <a href="#" className="text-white text-sm font-bold tracking-[0.2em] uppercase hover:text-white/60 transition-colors">GitHub</a>
          <a href="#" className="text-white text-sm font-bold tracking-[0.2em] uppercase hover:text-white/60 transition-colors">Email</a>
        </div>

        <div className="w-full flex items-center justify-center pt-8 border-t border-white/10">
          <p className="text-xs tracking-[0.1em] text-white/50 uppercase leading-relaxed">
            © 2026 Lynx. All photographs are copyrighted.<br className="hidden md:block" />
            Unauthorized use or reproduction is prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}
