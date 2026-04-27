export default function ProductCard(props) {
    const product = props.product;
    
    // Calculate discount percentage for a small badge
    const hasDiscount = product.labelledPrice > product.price;
    const discountPercent = hasDiscount 
        ? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100) 
        : 0;

    return (
        <div className="group w-[300px] bg-white rounded-[32px] shadow-[0_10px_30px_rgba(156,39,176,0.05)] hover:shadow-[0_20px_40px_rgba(156,39,176,0.12)] m-4 flex flex-col overflow-hidden transition-all duration-500 border border-secondary/5">
            
            {/* Image Container with Hover Zoom */}
            <div className="relative w-full h-[260px] overflow-hidden bg-primary/20">
                <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={product.images[0]} 
                    alt={product.name}
                />
                
                {/* Optional Luxury Badge for Discounts */}
                {hasDiscount && (
                    <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-widest">
                        {discountPercent}% Off
                    </div>
                )}
                
                {/* Floating Category Tag */}
                <div className="absolute bottom-3 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] uppercase tracking-[0.2em] font-bold text-secondary/60">
                    {product.category}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                    <h1 className="text-lg font-serif text-secondary leading-tight italic truncate pr-2">
                        {product.name}
                    </h1>
                    <span className="text-[9px] font-mono text-gray-300 mt-1">#{product.productID}</span>
                </div>

                <div className="mt-auto pt-4 flex flex-col gap-3">
                    {/* Price Section */}
                    <div className="flex items-baseline gap-2">
                        {hasDiscount ? (
                            <>
                                <span className="text-xl font-bold text-accent">
                                    <span className="text-xs mr-1">LKR</span>{product.price.toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-300 line-through font-light">
                                    {product.labelledPrice.toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-secondary">
                                <span className="text-xs mr-1 font-medium">LKR</span>{product.price.toFixed(2)}
                            </span>
                        )}
                    </div>

                    {/* Elegant Action Button */}
                    <button className="w-full py-3 rounded-2xl bg-white border border-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-accent hover:text-white hover:border-accent hover:shadow-lg hover:shadow-accent/20 active:scale-95">
                        View Product
                    </button>
                </div>
            </div>
        </div>
    )
}