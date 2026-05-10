import { useEffect, useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import { IoGiftOutline } from "react-icons/io5";
import { MdOutlineLocalShipping } from "react-icons/md";
import { PiHeadset } from "react-icons/pi";
import { SlBadge } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const heroSlides = [
    {
        id: 1,
        image: "https://res.cloudinary.com/ddrbcubf8/image/upload/v1778300762/Gemini_Generated_Image_u93a27u93a27u93a_wx9dcs.png",
        title: "Glow Beyond Beauty",
        subtitle: "Luxury skincare & makeup crafted for your perfect shine.",
    },
    {
        id: 2,
        image: "https://res.cloudinary.com/ddrbcubf8/image/upload/v1778300761/Gemini_Generated_Image_hywotphywotphywo_zivewk.png",
        title: "Luxury Meets Elegance",
        subtitle: "Discover premium beauty collections for every skin tone.",
    },
    {
        id: 3,
        image: "https://res.cloudinary.com/ddrbcubf8/image/upload/v1778300763/Gemini_Generated_Image_7vtez87vtez87vte_yccwr9.png",
        title: "Feel Beautiful Everyday",
        subtitle: "Shop trending cosmetics loved by beauty enthusiasts.",
    },
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const slider = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === heroSlides.length - 1 ? 0 : prev + 1
            );
        }, 5000);
        return () => clearInterval(slider);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === heroSlides.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? heroSlides.length - 1 : prev - 1
        );
    };

    return (
        <div className="w-full bg-primary">
            {/* --- HERO SLIDER --- */}
            <section className="relative w-full h-[80vh] lg:h-[75vh] overflow-hidden bg-secondary selection:bg-accent selection:text-white">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${index === currentSlide
                            ? "opacity-100 scale-100 visible"
                            : "opacity-0 scale-110 invisible"
                            }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/60 via-secondary/20 to-transparent" />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>
                ))}

                <div className="relative z-20 h-full container mx-auto px-6 lg:px-16 flex items-center">
                    <div className="max-w-4xl">
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-[1px] bg-accent/60" />
                                <p className="uppercase tracking-[0.5em] text-[10px] md:text-xs font-black bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent drop-shadow-sm">
                                    Premium Collection 2026
                                </p>
                            </div>

                            <h1 className="text-6xl md:text-[100px] font-serif italic text-white leading-[0.95] mb-10 drop-shadow-2xl">
                                {heroSlides[currentSlide].title.split(' ').map((word, i) => (
                                    <span key={i} className={i === 1 ? "text-primary/80" : ""}>
                                        {word}{" "}
                                    </span>
                                ))}
                            </h1>

                            <p className="text-base md:text-2xl text-gray-200 mb-12 max-w-xl leading-relaxed font-light italic">
                                {heroSlides[currentSlide].subtitle}
                            </p>

                            <div className="flex flex-wrap items-center gap-8">
                                <button  onClick={() => navigate("/products")}  className="bg-accent hover:bg-white hover:text-secondary text-white px-12 py-5 rounded-full font-bold uppercase text-[11px] tracking-[0.3em] transition-all duration-500 shadow-2xl shadow-accent/30 active:scale-95">
                                    Shop Collection
                                </button>
                                <button  onClick={() => navigate("/products")} className="group flex items-center gap-4 text-white text-[11px] font-bold uppercase tracking-[0.3em] transition-all">
                                    <span className="border-b border-white/20 group-hover:border-accent pb-1 transition-colors">Explore More</span>
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                                        <HiOutlineChevronRight className="text-lg" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Glassmorphic Navigation */}
                <div className="absolute bottom-16 right-6 md:right-16 z-30 flex items-center gap-10">
                    <div className="flex gap-3">
                        <button onClick={prevSlide} className="w-14 h-14 border border-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-500 shadow-xl">
                            <HiOutlineChevronLeft size={24} />
                        </button>
                        <button onClick={nextSlide} className="w-14 h-14 border border-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-500 shadow-xl">
                            <HiOutlineChevronRight size={24} />
                        </button>
                    </div>

                    <div className="flex gap-5 items-center bg-white/5 backdrop-blur-2xl px-8 py-4 rounded-full border border-white/10">
                        {heroSlides.map((_, index) => (
                            <button key={index} onClick={() => setCurrentSlide(index)} className="relative group p-1">
                                <div className={`transition-all duration-700 rounded-full ${currentSlide === index ? "w-12 h-1 bg-accent" : "w-3 h-1 bg-white/20 group-hover:bg-white/50"}`} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="absolute left-8 bottom-16 z-20 hidden lg:block">
                    <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.6em] [writing-mode:vertical-lr] rotate-180">
                        LuxeGlow Systems 2026
                    </span>
                </div>
            </section>

            
            <div className="w-full bg-white border-b border-secondary/5">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        
                        
                        <div className="group flex items-center gap-5 transition-transform duration-500 hover:-translate-y-1">
                            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-sm">
                                <MdOutlineLocalShipping size={32} />
                            </div>
                            <div>
                                <h4 className="text-secondary font-black uppercase tracking-widest text-[13px] mb-1">Free Shipping</h4>
                                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tighter">On all orders over $100</p>
                            </div>
                        </div>

                        
                        <div className="group flex items-center gap-5 transition-transform duration-500 hover:-translate-y-1">
                            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-sm">
                                <IoGiftOutline size={32} />
                            </div>
                            <div>
                                <h4 className="text-secondary font-black uppercase tracking-widest text-[13px] mb-1 text-nowrap">Exclusive Sample</h4>
                                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tighter">With every purchase</p>
                            </div>
                        </div>

                        
                        <div className="group flex items-center gap-5 transition-transform duration-500 hover:-translate-y-1">
                            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-sm">
                                <SlBadge size={32} />
                            </div>
                            <div>
                                <h4 className="text-secondary font-black uppercase tracking-widest text-[13px] mb-1">Authentic Products</h4>
                                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tighter">100% Guaranteed</p>
                            </div>
                        </div>

                        
                        <div className="group flex items-center gap-5 transition-transform duration-500 hover:-translate-y-1">
                            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-sm">
                                <PiHeadset size={32} />
                            </div>
                            <div>
                                <h4 className="text-secondary font-black uppercase tracking-widest text-[13px] mb-1">Dedicated Support</h4>
                                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tighter">We're here for you</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}