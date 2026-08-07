import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-foreground/10 py-12 px-8 md:px-12 lg:px-16 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        <Image 
          src="/images/Logo.png" 
          alt="Lynx Logo" 
          width={160} 
          height={64} 
          className="w-auto h-12 md:h-16 mb-8" 
          unoptimized 
        />
        
        <p className="text-foreground/80 font-serif text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed mb-12">
          Photography that tells stories,<br className="hidden md:block" /> not just captures moments.
        </p>

        <div className="flex gap-8 mb-12">
          <a href="#" className="text-sm font-bold tracking-[0.2em] uppercase hover:text-foreground/60 transition-colors">Instagram</a>
          <a href="#" className="text-sm font-bold tracking-[0.2em] uppercase hover:text-foreground/60 transition-colors">GitHub</a>
          <a href="#" className="text-sm font-bold tracking-[0.2em] uppercase hover:text-foreground/60 transition-colors">Email</a>
        </div>

        <div className="w-full flex items-center justify-center pt-8 border-t border-foreground/10">
          <p className="text-xs tracking-[0.1em] text-foreground/50 uppercase">
            © 2026 Lynx. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
