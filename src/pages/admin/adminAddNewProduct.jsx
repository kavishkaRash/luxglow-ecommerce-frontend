import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminAddNewProduct() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const [labelledPrice, setlabelledPrice] = useState(0);
  const [category, setCategory] = useState("cream");
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  async function addProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
        navigate("/login");
        return;        
    }

    const promises = [];
    for (let i = 0; i <images.length; i++){
        promises[i] = mediaUpload(images[i])
    }
    try {
        const urls = await Promise.all(promises);
        const alternativNames = altNames.split("'")

        const product = {
            productID : productId,
            name : name,
            altNames : alternativNames,
            description : description,
            images: urls,
            price: price,
            labelledPrice: labelledPrice,
            category: category,
            stock: stock
        }

        axios.post(import.meta.env.VITE_API_URL+"/api/products",product,{
            headers:{
                Authorization : "Bearer "+token
            }
        })

        toast.success("Product Added Succesfully");
        navigate("/admin/products");
    } catch{
        toast.error("An error occured");
    }
  }

  return (
    <div className="w-full min-h-screen bg-primary flex justify-center items-center p-8 font-sans">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-xl rounded-[40px] shadow-2xl shadow-secondary/10 border border-white p-10 lg:p-14">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-secondary text-4xl font-serif italic tracking-tight">New Creation</h1>
          <p className="text-gray-500 text-sm mt-2 font-light">Add a new masterpiece to the LuxeGlow collection.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          {/* Product ID */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 ml-1">Product SKU / ID</label>
            <input 
              value={productId} 
              placeholder="e.g. LG-CRM-001"
              onChange={(e) => setProductId(e.target.value)} 
              className="w-full h-12 px-5 rounded-2xl bg-white border border-secondary/5 focus:ring-2 focus:ring-accent/20 outline-none transition-all text-secondary"
            />
          </div>

          {/* Category Select */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 ml-1">Collection Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 px-5 rounded-2xl bg-white border border-secondary/5 focus:ring-2 focus:ring-accent/20 outline-none transition-all text-secondary appearance-none cursor-pointer"
            >
              <option value="cream">Luxury Cream</option>    
              <option value="lotion">Velvet Lotion</option>    
              <option value="serum">Radiant Serum</option>    
              <option value="perfume">Perfume</option>    
            </select>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 ml-1">Product Name</label>
            <input 
              value={name} 
              placeholder="Enter product title..."
              onChange={(e) => setName(e.target.value)} 
              className="w-full h-12 px-5 rounded-2xl bg-white border border-secondary/5 focus:ring-2 focus:ring-accent/20 outline-none transition-all text-secondary"
            />
          </div>

          {/* Alt Names */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 ml-1">Search Keywords / Alt Names</label>
            <input 
              value={altNames} 
              placeholder="Night cream, hydrating, anti-aging..."
              onChange={(e) => setAltNames(e.target.value)} 
              className="w-full h-12 px-5 rounded-2xl bg-white border border-secondary/5 focus:ring-2 focus:ring-accent/20 outline-none transition-all text-secondary text-sm font-light"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 ml-1">Product Narrative</label>
            <textarea 
              value={description} 
              placeholder="Describe the luxury experience..."
              rows="4"
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full p-5 rounded-3xl bg-white border border-secondary/5 focus:ring-2 focus:ring-accent/20 outline-none transition-all text-secondary resize-none font-light leading-relaxed"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 ml-1">Product Imagery</label>
            <div className="relative group">
              <input 
                type="file" 
                onChange={(e) => setImages(e.target.files)} 
                multiple
                className="w-full h-14 file:hidden text-xs text-gray-400 p-4 rounded-2xl border-2 border-dashed border-secondary/10 bg-white/50 group-hover:bg-white transition-all cursor-pointer"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-bold text-accent pointer-events-none">UPLOAD FILES</span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 ml-1">Selling Price (LKR)</label>
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full h-12 px-5 rounded-2xl bg-white border border-secondary/5 focus:ring-2 focus:ring-accent/20 outline-none transition-all text-secondary font-bold"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 ml-1">Retail Price (Labelled)</label>
            <input 
              type="number" 
              value={labelledPrice} 
              onChange={(e) => setlabelledPrice(e.target.value)} 
              className="w-full h-12 px-5 rounded-2xl bg-white border border-secondary/5 focus:ring-2 focus:ring-accent/20 outline-none transition-all text-gray-400"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary/60 ml-1">Inventory Stock</label>
            <input 
              type="number" 
              value={stock} 
              onChange={(e) => setStock(e.target.value)} 
              className="w-full h-12 px-5 rounded-2xl bg-white border border-secondary/5 focus:ring-2 focus:ring-accent/20 outline-none transition-all text-secondary"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-6 mt-12 pt-8 border-t border-secondary/5">
          <button  onClick={
            () => {
                navigate("/admin/products");
            }
          } className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-red-500 transition-colors">
            Discard
          </button>
          <button onClick={addProduct} className="bg-gradient-to-r from-accent to-secondary text-white px-10 py-4 rounded-2xl shadow-xl shadow-accent/20 hover:opacity-90 active:scale-95 transition-all text-xs font-bold uppercase tracking-widest">
            Publish Product
          </button>
        </div>

      </div>
    </div>
  );
}