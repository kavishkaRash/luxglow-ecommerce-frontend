import { useNavigate } from "react-router-dom";

export default function LuxuryPromoSection() {
    const navigate = useNavigate();
    return (
        <section className="w-full bg-white py-28 px-6 selection:bg-accent selection:text-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="inline-flex items-center gap-3 bg-white/80 border border-secondary/10 px-5 py-2 rounded-full mb-6 shadow-sm backdrop-blur-md">
                            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary/70">
                                Global Runway Edit
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif italic text-secondary leading-tight text-center lg:text-left">
                            The Couture Collection
                        </h2>
                    </div>

                    <div className="flex gap-10 border-l border-secondary/10 pl-10 hidden lg:flex">
                        <div>
                            <p className="text-accent font-serif italic text-2xl">3</p>
                            <p className="text-[10px] uppercase tracking-widest text-secondary/40 font-bold">New Drops</p>
                        </div>
                        <div>
                            <p className="text-accent font-serif italic text-2xl">24/7</p>
                            <p className="text-[10px] uppercase tracking-widest text-secondary/40 font-bold">Elite Support</p>
                        </div>
                        <div>
                            <p className="text-accent font-serif italic text-2xl">Global</p>
                            <p className="text-[10px] uppercase tracking-widest text-secondary/40 font-bold">Curated Sourcing</p>
                        </div>
                    </div>
                </div>

                <div className="mb-24 text-center md:text-left">
                    <div className="flex items-center gap-4 mb-12">
                        <p className="text-[10px] tracking-[0.5em] uppercase font-black text-secondary/40">
                            The Elite Circle
                        </p>
                        <div className="flex-1 h-[1px] bg-secondary/10" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 items-center gap-12 grayscale opacity-40 hover:grayscale-0 transition-all duration-1000">
                        <div className="flex justify-center font-serif text-2xl tracking-tighter text-secondary hover:text-accent transition-colors cursor-pointer">DIOR</div>
                        <div className="flex justify-center font-sans font-black text-xl tracking-widest text-secondary hover:text-accent transition-colors cursor-pointer">M·A·C</div>
                        <div className="flex justify-center font-serif text-lg text-secondary hover:text-accent transition-colors cursor-pointer text-center leading-none uppercase">ESTÉE<br/>LAUDER</div>
                        <div className="flex justify-center font-sans font-bold text-2xl tracking-[-0.1em] text-secondary hover:text-accent transition-colors cursor-pointer">NARS</div>
                        <div className="flex justify-center font-serif italic text-xl text-secondary hover:text-accent transition-colors cursor-pointer">LA MER</div>
                        <div className="flex justify-center font-serif text-[10px] uppercase tracking-[0.2em] font-bold text-secondary hover:text-accent transition-colors cursor-pointer text-center">Charlotte<br/>Tilbury</div>
                        <div className="flex justify-center font-sans text-lg font-medium text-secondary hover:text-accent transition-colors cursor-pointer">The Ordinary.</div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-[3.5rem] bg-secondary h-[550px] shadow-2xl shadow-secondary/20 transition-all duration-1000">
                    
                    <img
                        src="https://res.cloudinary.com/ddrbcubf8/image/upload/v1778348457/Gemini_Generated_Image_320khn320khn320k_uuvhk9.png"
                        alt="Luxury Beauty"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[5000ms] ease-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/40 to-transparent" />

                    <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-24 max-w-4xl">
                        
                        <div className="inline-flex items-center gap-4 mb-8">
                            <div className="w-12 h-[1px] bg-accent" />
                            <p className="text-accent uppercase tracking-[0.5em] text-[10px] font-black">
                                Private Sale Access
                            </p>
                        </div>

                        <h2 className="text-white text-6xl md:text-[95px] font-serif italic leading-[0.9] mb-10 drop-shadow-2xl">
                            Glow More. <br />
                            <span className="text-primary/80">Save More.</span>
                        </h2>

                        <p className="text-white/70 text-base md:text-xl max-w-md mb-12 leading-relaxed font-light italic">
                            Redefine your beauty standards with an exclusive <span className="text-white font-bold">20% off</span> on our most iconic designer bestsellers.
                        </p>

                        <button onClick={()=> navigate("/products")} className="relative w-fit group/btn bg-accent text-white px-14 py-6 rounded-full uppercase tracking-[0.3em] text-[11px] font-black transition-all duration-500 hover:shadow-2xl hover:shadow-accent/40 active:scale-95 overflow-hidden">
                            <span className="relative z-10">Shop The Vault</span>
                            <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 -z-0 mix-blend-difference" />
                        </button>
                    </div>

                    <div className="absolute right-12 bottom-12 md:top-1/2 md:-translate-y-1/2 md:right-24 z-20 scale-90 md:scale-100 ">
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/20 backdrop-blur-xl bg-white/5 flex flex-col items-center justify-center text-white shadow-2xl animate-float">
                            
                            <div className="absolute inset-4 border border-dashed border-white/10 rounded-full animate-spin-slow" />

                            <span className="text-[10px] uppercase tracking-[0.4em] mb-3 font-black text-primary/60">
                                Up To
                            </span>

                            <div className="flex items-start">
                                <span className="text-7xl md:text-9xl font-serif italic leading-none">20</span>
                                <span className="text-2xl md:text-4xl font-serif italic mt-3">%</span>
                            </div>

                            <span className="uppercase text-[12px] tracking-[0.4em] mt-4 font-black text-accent">
                                OFF
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}