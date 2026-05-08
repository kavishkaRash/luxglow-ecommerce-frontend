import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";
import { IoArrowBackOutline, IoCloudUploadOutline, IoSparklesOutline } from "react-icons/io5";

export default function UpdateAddNewReview() {
  const location = useLocation();
  const [reviewId, setReviewId] = useState(location.state.ID);
  const [name, setName] = useState(location.state.name);
  const [message, setMessage] = useState(location.state.message);
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(location.state.rating);
  const navigate = useNavigate();

  async function addProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
        navigate("/login");
        return;        
    }

    const promises = [];
    for (let i = 0; i < images.length; i++){
        promises[i] = mediaUpload(images[i])
    }
    try {
        let urls = await Promise.all(promises);

        if(urls.length == 0){
            urls = [location.state.image]
        }

        const review = {
            ID : reviewId,
            name : name,
            message : message,
            images: urls[0],
            rating: rating
        }

        await axios.put(import.meta.env.VITE_API_URL+"/api/review/"+ reviewId, review, {
            headers:{
                Authorization : "Bearer "+token
            }
        })

        toast.success("Review Updated Successfully");
        navigate("/admin/reviews");
    } catch {
        toast.error("An error occurred during update");
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#FFFBFD] flex flex-col justify-center items-center p-6 lg:p-12 font-sans selection:bg-accent selection:text-white">
      
      {/* Background Decorative Element */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-primary to-transparent -z-10 opacity-60" />

      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-2xl rounded-[50px] shadow-[0_30px_80px_rgba(156,39,176,0.08)] border border-white p-10 lg:p-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
        
        {/* Header Section */}
        <header className="mb-12 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-accent mb-2">
                <IoSparklesOutline size={18} />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black">Refinement Mode</span>
            </div>
            <h1 className="text-secondary text-5xl font-serif italic leading-none">
              Edit <span className="text-accent">Review</span>
            </h1>
            <p className="text-gray-400 text-sm mt-3 font-light italic">
                Polishing a masterpiece for the LuxeGlow community.
            </p>
          </div>
          <button 
            onClick={() => navigate("/admin/reviews")}
            className="w-12 h-12 rounded-full bg-white border border-secondary/5 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all shadow-sm group"
          >
            <IoArrowBackOutline size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          
          {/* Review SKU (Read Only) */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/40 ml-1">Reference ID</label>
            <div className="w-full h-14 px-6 rounded-2xl bg-secondary/5 border border-secondary/5 flex items-center text-secondary/50 font-mono text-xs">
               {reviewId}
            </div>
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/40 ml-1">Star Rating</label>
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
            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/40 ml-1">Customer Identity</label>
            <input 
              value={name} 
              placeholder="e.g. Isabella Sterling"
              onChange={(e) => setName(e.target.value)} 
              className="w-full h-14 px-6 rounded-2xl bg-primary/30 border border-transparent focus:bg-white focus:border-accent/20 focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-3 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/40 ml-1">The Experience (Message)</label>
            <textarea 
              value={message} 
              placeholder="How did the product feel on their skin?"
              rows="4"
              onChange={(e) => setMessage(e.target.value)} 
              className="w-full p-6 rounded-[30px] bg-primary/30 border border-transparent focus:bg-white focus:border-accent/20 focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary resize-none font-light leading-relaxed italic"
            />
          </div>

          {/* Image Upload Area */}
          <div className="flex flex-col gap-3 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.3em] font-black text-secondary/40 ml-1">Product Imagery</label>
            <div className="relative group overflow-hidden">
              <input 
                type="file" 
                onChange={(e) => setImages(e.target.files)} 
                multiple
                className="w-full h-24 opacity-0 absolute inset-0 z-10 cursor-pointer"
              />
              <div className="w-full h-24 rounded-3xl border-2 border-dashed border-secondary/10 bg-primary/20 group-hover:bg-white group-hover:border-accent/30 transition-all flex items-center justify-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent shadow-sm group-hover:scale-110 transition-transform">
                    <IoCloudUploadOutline size={20} />
                </div>
                <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary">Choose New Assets</p>
                    <p className="text-[9px] text-gray-400 italic">Leave empty to keep current image</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <footer className="flex items-center justify-between mt-12 pt-10 border-t border-secondary/5">
          <button 
            onClick={() => navigate("/admin/reviews")} 
            className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400 hover:text-red-500 transition-colors"
          >
            Discard Changes
          </button>
          
          <button 
            onClick={addProduct} 
            className="group relative px-12 h-16 bg-gradient-to-r from-secondary to-accent text-white rounded-2xl shadow-xl shadow-accent/20 overflow-hidden active:scale-95 transition-all"
          >
            <div className="relative z-10 flex items-center gap-3">
                <span className="text-[11px] font-black uppercase tracking-[0.4em]">Apply Updates</span>
                <IoSparklesOutline className="group-hover:rotate-12 transition-transform" />
            </div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
        </footer>

      </div>

      {/* Decorative Branding */}
      <p className="mt-12 text-[9px] uppercase tracking-[0.8em] text-secondary/20 font-black italic">
        LuxeGlow Administrative Protocol 2.0
      </p>
    </div>
  );
}