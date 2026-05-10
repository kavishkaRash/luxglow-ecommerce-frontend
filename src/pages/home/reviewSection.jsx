import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { RiDoubleQuotesL } from "react-icons/ri";

export default function ReviewSection() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/api/review")
            .then((res) => {
                setReviews(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    return (
        <section className="w-full py-28 bg-white selection:bg-accent selection:text-white relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -z-0" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- EDITORIAL HEADER --- */}
                <div className="flex flex-col items-center text-center mb-24">
                    <div className="inline-flex items-center gap-3 bg-white/80 border border-secondary/10 px-5 py-2 rounded-full mb-8 shadow-sm backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary/70">
                            Voices of Beauty
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-serif italic text-secondary leading-tight">
                        The Glow Journal
                    </h2>
                    
                    <p className="mt-6 text-secondary/40 font-light tracking-[0.2em] uppercase text-[10px] md:text-xs max-w-md mx-auto">
                        Authentic experiences shared by our global community of ritualists.
                    </p>

                    <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent mt-12" />
                </div>

                {/* --- CONTENT --- */}
                {isLoading ? (
                    <div className="h-[45vh] flex flex-col items-center justify-center gap-4">
                        <Loader />
                        <p className="text-[10px] uppercase tracking-widest text-secondary/30 animate-pulse">Curating Experiences...</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {reviews.map((item, index) => (
                            <div
                                key={item._id}
                                className="break-inside-avoid group relative bg-white/70 backdrop-blur-sm rounded-[2.5rem] p-10 border border-white shadow-[0_15px_40px_-15px_rgba(156,39,176,0.1)] hover:shadow-[0_30px_70px_-10px_rgba(233,30,99,0.2)] transition-all duration-700 hover:-translate-y-3"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Floating Quote Icon */}
                                <div className="absolute top-8 right-10 text-secondary/5 group-hover:text-accent/10 transition-colors duration-500">
                                    <RiDoubleQuotesL size={60} />
                                </div>

                                {/* User Profile Info */}
                                <div className="flex items-center gap-5 mb-8 relative z-10">
                                    <div className="relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute -bottom-1 -right-1 bg-accent w-4 h-4 rounded-full border-2 border-white flex items-center justify-center" />
                                    </div>

                                    <div>
                                        <h3 className="font-serif italic text-xl text-secondary group-hover:text-accent transition-colors duration-500">
                                            {item.name}
                                        </h3>
                                        <div className="flex gap-1 mt-1.5">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`text-[10px] ${i < (item.rating || 5) ? "text-accent" : "text-secondary/10"}`}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Review Content */}
                                <div className="relative z-10">
                                    <p className="text-secondary/60 leading-relaxed text-base font-light italic">
                                        "{item.message}"
                                    </p>
                                </div>

                                {/* Card Footer Accent */}
                                <div className="mt-8 pt-6 border-t border-secondary/5 flex justify-between items-center relative z-10">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-secondary/30">
                                        Verified Experience
                                    </span>
                                    <div className="h-1 w-12 bg-gradient-to-r from-accent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-4 group-hover:translate-x-0" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}