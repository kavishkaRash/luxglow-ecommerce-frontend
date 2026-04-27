export default function Loader() {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col justify-center items-center bg-transparent">
      <div className="relative flex items-center justify-center">
        
        {/* The Glowing Aura - Soft pulse effect using the accent color */}
        <div className="absolute w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse"></div>
        
        {/* Outer Ring - Subtle secondary color */}
        <div className="absolute w-20 h-20 border-2 border-secondary/5 rounded-full"></div>

        {/* The Main Spinner - Refined thin border with the brand accent */}
        <div className="w-20 h-20 border-[3px] border-transparent border-t-accent border-r-accent/30 rounded-full animate-spin"></div>
        
        {/* Inner Static Ring - For a "lens" look */}
        <div className="absolute w-12 h-12 border border-secondary/10 rounded-full"></div>
      </div>

      {/* Elegant Brand Label */}
      <div className="mt-8 flex flex-col items-center gap-1">
        <span className="text-secondary text-[10px] uppercase tracking-[0.5em] font-bold opacity-60">
          Preparing your
        </span>
        <span className="text-accent text-sm font-serif italic tracking-widest animate-pulse">
          LuxeGlow Experience
        </span>
      </div>
    </div>
  );
}