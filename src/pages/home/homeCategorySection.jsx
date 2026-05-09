import { useNavigate } from "react-router-dom";

export default function HomeCategorySection() {
    const navigate = useNavigate();

    const categries = [
        {
            name: "perfume",
            image: "https://res.cloudinary.com/ddrbcubf8/image/upload/q_auto/f_auto/v1778320870/Rain_On_Me_-_Best_Men_Perfume_In_The_World_y96i1c.webp"
        },
        {
            name: "skincare",
            image: "https://res.cloudinary.com/ddrbcubf8/image/upload/q_auto/f_auto/v1778320899/Group-1-2_bpwcec.png"
        },
        {
            name: "haircare",
            image: "https://res.cloudinary.com/ddrbcubf8/image/upload/q_auto/f_auto/v1778320899/Aloe_Vera_Watergrass_-_Hair_Care_Discovery_Set_-_Spa_Ceylon_Sri_Lanka-4357837_w5ydfl.webp"
        },
        {
            name: "makeup",
            image: "https://res.cloudinary.com/ddrbcubf8/image/upload/q_auto/f_auto/v1778321005/Must-Have-Makeup-My-Daily-Makeup-Routine-2_uwtoqu.jpg"
        },
        {
            name: "cream",
            image: "https://res.cloudinary.com/ddrbcubf8/image/upload/q_auto/f_auto/v1778320898/1000635789.jpg_nlvs63.webp"
        }
    ];

    return (
        <section className="w-full py-28 bg-primary selection:bg-accent selection:text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                
                <div className="flex flex-col items-center mb-20 text-center">
                    <div className="inline-flex items-center gap-3 bg-white/80 border border-secondary/10 px-5 py-2 rounded-full mb-6 shadow-sm backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary/70">
                            Our Curations
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif italic text-secondary leading-tight">
                        Shop By Category
                    </h2>
                    <p className="mt-6 text-secondary/50 font-light tracking-widest uppercase text-[10px] md:text-xs">
                        Refinement in every detail &bull; Crafted for your glow
                    </p>
                    <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent mt-10" />
                </div>

                
                <div className="flex flex-wrap justify-center gap-12 md:gap-20">
                    {categries.map((category) => {
                        return (
                            <div
                                key={category.name}
                                onClick={() =>
                                    navigate(`/products?category=${category.name}`)
                                }
                                className="group cursor-pointer flex flex-col items-center"
                            >
                                
                                <div className="relative w-[150px] h-[150px] md:w-[180px] md:h-[180px] flex items-center justify-center">
                                    
                                   
                                    <div className="absolute inset-0 border border-dashed border-accent/0 rounded-full group-hover:border-accent/40 group-hover:rotate-45 transition-all duration-1000 ease-out" />
                                    
                                    
                                    <div className="relative w-full h-full rounded-full bg-white border border-secondary/10 shadow-lg group-hover:shadow-2xl group-hover:shadow-accent/20 group-hover:-translate-y-4 transition-all duration-700 ease-out overflow-hidden z-10">
                                        
                                       
                                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-40 z-20" />
                                        
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover group-hover:scale-115 transition-all duration-1000 ease-in-out"
                                        />

                                       
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-30" />
                                    </div>

                                   
                                    <div className="absolute -inset-2 bg-secondary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                                </div>

                               
                                <div className="mt-10 flex flex-col items-center gap-3">
                                    <span className="text-[12px] font-black uppercase tracking-[0.5em] text-secondary/60 group-hover:text-accent transition-all duration-500">
                                        {category.name}
                                    </span>
                                    
                                    
                                    <div className="relative h-[2px] w-6 bg-secondary/10 overflow-hidden rounded-full">
                                        <div className="absolute inset-0 bg-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}