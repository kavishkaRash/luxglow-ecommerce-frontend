import { useState } from "react";

export default function ImageSlider(props) {
    const images = props.images;
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="w-full max-w-[450px] flex flex-col gap-6">
            {/* Main Hero Image */}
            <div className="relative group w-full aspect-square rounded-[40px] overflow-hidden bg-white shadow-2xl shadow-secondary/5 border border-white">
                <img 
                    className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105" 
                    src={images[activeImage]} 
                    alt="Product Preview" 
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent pointer-events-none"></div>
            </div>

            {/* Thumbnails Row */}
            <div className="w-full flex justify-center items-center gap-3 px-2">
                {images.map((img, index) => {
                    const isActive = activeImage === index;
                    return (
                        <div
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`
                                relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-300
                                ${isActive 
                                    ? "w-24 h-24 ring-2 ring-accent ring-offset-4 ring-offset-primary scale-105" 
                                    : "w-20 h-20 opacity-50 grayscale-[50%] hover:opacity-100 hover:grayscale-0 hover:scale-105"
                                }
                            `}
                        >
                            <img 
                                className="w-full h-full object-cover" 
                                src={img} 
                                alt={`Thumbnail ${index}`} 
                            />
                            
                            {/* Selection Overlay */}
                            {isActive && (
                                <div className="absolute inset-0 bg-accent/5 pointer-events-none"></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}