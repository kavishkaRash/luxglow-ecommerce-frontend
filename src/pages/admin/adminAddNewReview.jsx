import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";
import { 
  IoStar, 
  IoPersonOutline, 
  IoChatbubbleEllipsesOutline, 
  IoFingerPrintOutline, 
  IoImageOutline,
  IoSparklesOutline 
} from "react-icons/io5";

export default function AdminAddNewReview() {
    const [reviewId, setReviewId] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [images, setImages] = useState([]);
    const [rating, setRating] = useState(5);
    const navigate = useNavigate();

    async function addProduct() {
        const token = localStorage.getItem("token");
        if (token == null) {
            navigate("/login");
            return;
        }

        const promises = [];
        for (let i = 0; i < images.length; i++) {
            promises[i] = mediaUpload(images[i])
        }
        try {
            const urls = await Promise.all(promises);

            const review = {
                ID: reviewId,
                name: name,
                message: message,
                image: urls[0],
                rating: rating
            }

            await axios.post(import.meta.env.VITE_API_URL + "/api/review",
                review,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })

            toast.success("Review Curated Successfully");
            navigate("/admin/reviews");
        } catch {
            toast.error("Failed to publish review");
        }
    }

    return (
        <div className="w-full min-h-screen bg-[#FFFBFD] flex justify-center items-center p-6 lg:p-12 font-sans selection:bg-accent selection:text-white">
            {/* Background Decorative Glow */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent opacity-50 -z-10" />

            <div className="w-full max-w-4xl bg-white/80 backdrop-blur-2xl rounded-[50px] shadow-[0_32px_64px_-16px_rgba(156,39,176,0.1)] border border-white p-8 lg:p-16 animate-in fade-in zoom-in-95 duration-700">

                {/* Header Section */}
                <div className="mb-12 relative">
                    <div className="flex items-center gap-2 text-accent mb-3">
                        <IoSparklesOutline className="animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black">Curation Studio</span>
                    </div>
                    <h1 className="text-secondary text-5xl font-serif italic leading-none">Add New <span className="text-accent">Testimonial</span></h1>
                    <p className="text-gray-400 text-sm mt-4 font-light italic">Record a new moment of beauty and confidence for the collection.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

                    {/* Review ID */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/40 ml-1 flex items-center gap-2">
                            <IoFingerPrintOutline className="text-accent" /> Review Reference
                        </label>
                        <input
                            type="text"
                            value={reviewId}
                            placeholder="e.g. LG-REV-2026"
                            onChange={(e) => setReviewId(e.target.value)}
                            className="w-full h-14 px-6 rounded-2xl bg-primary/30 border border-transparent focus:bg-white focus:border-accent/20 focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary placeholder:text-gray-300"
                        />
                    </div>

                    {/* Rating */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/40 ml-1 flex items-center gap-2">
                            <IoStar className="text-accent" /> Satisfaction Score
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full h-14 px-6 rounded-2xl bg-primary/30 border border-transparent focus:bg-white focus:border-accent/20 focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary font-bold"
                        />
                    </div>

                    {/* User Name */}
                    <div className="flex flex-col gap-3 md:col-span-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/40 ml-1 flex items-center gap-2">
                            <IoPersonOutline className="text-accent" /> Customer Identity
                        </label>
                        <input
                            value={name}
                            placeholder="Enter the client's name..."
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-14 px-6 rounded-2xl bg-primary/30 border border-transparent focus:bg-white focus:border-accent/20 focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary"
                        />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-3 md:col-span-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/40 ml-1 flex items-center gap-2">
                            <IoChatbubbleEllipsesOutline className="text-accent" /> The Experience
                        </label>
                        <textarea
                            value={message}
                            placeholder="Transcribe the luxury experience here..."
                            rows="4"
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-6 rounded-[30px] bg-primary/30 border border-transparent focus:bg-white focus:border-accent/20 focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary resize-none font-light leading-relaxed italic"
                        />
                    </div>

                    {/* Image Upload Custom UI */}
                    <div className="flex flex-col gap-3 md:col-span-2">
                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/40 ml-1 flex items-center gap-2">
                            <IoImageOutline className="text-accent" /> Visual Asset
                        </label>
                        <div className="relative group">
                            <input
                                type="file"
                                onChange={(e) => setImages(e.target.files)}
                                multiple
                                className="w-full h-20 opacity-0 absolute inset-0 z-10 cursor-pointer"
                            />
                            <div className="w-full h-20 rounded-2xl border-2 border-dashed border-secondary/10 bg-white/50 group-hover:bg-white group-hover:border-accent/30 transition-all flex items-center justify-center gap-3">
                                <IoImageOutline className="text-secondary/20 group-hover:text-accent transition-colors" size={24} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40 group-hover:text-secondary transition-colors">
                                    {images.length > 0 ? `${images.length} File(s) Ready` : 'Drop Image or Click to Select'}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-16 pt-10 border-t border-secondary/5">
                    <button 
                        onClick={() => navigate("/admin/reviews")} 
                        className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 hover:text-accent transition-all active:scale-90"
                    >
                        Discard Entry
                    </button>
                    
                    <button 
                        onClick={addProduct} 
                        className="relative group px-12 py-5 bg-gradient-to-r from-secondary to-accent text-white rounded-2xl shadow-xl shadow-accent/20 hover:shadow-accent/40 active:scale-95 transition-all overflow-hidden"
                    >
                        <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.4em]">Publish Review</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    </button>
                </div>

            </div>
        </div>
    );
}