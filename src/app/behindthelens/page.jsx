import Link from "next/link";

export default function BehindTheLens() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8">
      <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-6">
        Behind the Lens
      </h1>
      <p className="text-lg text-foreground/70 max-w-2xl text-center mb-12">
        A deeper look into the stories, techniques, and moments that shaped these curated photographs.
      </p>
      
      <Link 
        href="/" 
        className="flex items-center gap-2 text-sm font-medium tracking-widest text-foreground/80 hover:text-foreground transition-colors group"
      >
        <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Gallery
      </Link>
    </div>
  );
}
