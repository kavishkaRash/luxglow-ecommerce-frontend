import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { FaEdit, FaCamera, FaCheck, FaTimes } from "react-icons/fa";
import { IoShieldCheckmarkOutline, IoPersonOutline, IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Header from "../components/header";
import Footer from "./home/footer";

export default function Setting() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(null);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
    });

    async function updateUserData() {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await axios.put(
                import.meta.env.VITE_API_URL + "/api/users/me",
                {
                    firstName: form.firstName,
                    lastName: form.lastName,
                    image: form.image
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Profile updated successfully");
            setUser(res.data);
            setIsEditing(null);
        } catch (err) {
            console.error("Failed to update profile", err);
            toast.error("Failed to update profile");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token != null) {
            axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => {
                    setUser(res.data);
                    setForm({
                        firstName: res.data.firstName || "",
                        lastName: res.data.lastName || "",
                        image: res.data.image || ""
                    });
                    setIsLoading(false);
                }).catch(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    setIsLoading(false);
                })
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#FFFBFD]  font-sans selection:bg-accent selection:text-white">
            <Header />
            {isLoading ? (
                <div className="h-[60vh] flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 p-6 lg:p-12">

                    {/* Page Header */}
                    <header className="mb-10">
                        <h1 className="text-secondary text-5xl font-serif italic leading-none">
                            Account <span className="text-accent">Settings</span>
                        </h1>
                        <p className="text-gray-400 mt-3 font-light tracking-wide italic">
                            Manage your personal radiance profile and security.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* LEFT: Avatar Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/70 backdrop-blur-xl rounded-[40px] p-8 shadow-[0_20px_50px_rgba(156,39,176,0.08)] border border-white text-center">
                                <div className="relative inline-block group">
                                    <div className="w-32 h-32 rounded-full p-1 border-2 border-accent/20 transition-transform duration-500 group-hover:scale-105">
                                        <img
                                            className="w-full h-full rounded-full object-cover shadow-lg border-2 border-white"
                                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                                            src={user?.image || "https://via.placeholder.com/150"}
                                            alt="Profile"
                                        />
                                    </div>
                                    <label className="absolute bottom-1 right-1 bg-secondary text-white p-2.5 rounded-full cursor-pointer hover:bg-accent transition-colors shadow-lg shadow-secondary/20">
                                        <FaCamera size={14} />
                                        <input type="file" className="hidden" />
                                    </label>
                                </div>
                                <h3 className="text-secondary font-serif italic text-xl mt-4 leading-tight">
                                    {user?.firstName} {user?.lastName}
                                </h3>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-secondary/40 mt-1">
                                    Valued Member Since 2024
                                </p>
                            </div>
                        </div>

                        {/* RIGHT: Information Form */}
                        <div className="lg:col-span-2 space-y-6 w-full">

                            {/* Profile Info Section */}
                            <div className="bg-white/70 backdrop-blur-xl rounded-[40px] p-10 shadow-[0_20px_50px_rgba(156,39,176,0.08)] border border-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <IoPersonOutline size={80} className="text-secondary" />
                                </div>

                                <h2 className="text-secondary text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-accent/30"></span>
                                    Profile Information
                                </h2>

                                <div className="space-y-8 w-full">
                                    {/* First Name Field */}
                                    <div className="group flex flex-col border-b border-secondary/5 pb-6">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">First Name</p>
                                        
                                        {isEditing === "firstName" ? (
                                            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                                                <input
                                                    value={form.firstName}
                                                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                                    className="w-full h-12 px-4 rounded-xl bg-white border border-accent/20 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary"
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={updateUserData} 
                                                        className="px-6 h-10 bg-gradient-to-r from-secondary to-accent text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                                                    >
                                                        <FaCheck /> Save Changes
                                                    </button>
                                                    <button 
                                                        onClick={() => setIsEditing(null)} 
                                                        className="px-6 h-10 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-2"
                                                    >
                                                        <FaTimes /> Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center group/item">
                                                <p className="text-secondary font-medium text-lg">{user?.firstName}</p>
                                                <button 
                                                    onClick={() => setIsEditing("firstName")} 
                                                    className="p-3 rounded-xl bg-primary text-secondary hover:bg-accent hover:text-white transition-all duration-300 opacity-0 group-hover/item:opacity-100 lg:opacity-100"
                                                >
                                                    <FaEdit size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Last Name Field */}
                                    <div className="group flex flex-col border-b border-secondary/5 pb-6">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">Last Name</p>
                                        
                                        {isEditing === "lastName" ? (
                                            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
                                                <input
                                                    value={form.lastName}
                                                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                                    className="w-full h-12 px-4 rounded-xl bg-white border border-accent/20 focus:border-accent focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary"
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={updateUserData} 
                                                        className="px-6 h-10 bg-gradient-to-r from-secondary to-accent text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
                                                    >
                                                        <FaCheck /> Save Changes
                                                    </button>
                                                    <button 
                                                        onClick={() => setIsEditing(null)} 
                                                        className="px-6 h-10 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center gap-2"
                                                    >
                                                        <FaTimes /> Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center group/item">
                                                <p className="text-secondary font-medium text-lg">{user?.lastName}</p>
                                                <button 
                                                    onClick={() => setIsEditing("lastName")} 
                                                    className="p-3 rounded-xl bg-primary text-secondary hover:bg-accent hover:text-white transition-all duration-300 opacity-0 group-hover/item:opacity-100 lg:opacity-100"
                                                >
                                                    <FaEdit size={14} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Security Section */}
                            <div className="bg-secondary/5 backdrop-blur-xl rounded-[40px] p-10 border mb-10 border-secondary/5 group hover:bg-white/80 transition-all duration-500">
                                <h2 className="text-secondary text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-accent/30"></span>
                                    Security & Access
                                </h2>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-secondary shadow-sm">
                                            <IoShieldCheckmarkOutline size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Password</p>
                                            <p className="text-secondary tracking-[0.3em] font-black">••••••••••••</p>
                                        </div>
                                    </div>
                                    <Link to="/forgot-password" size="sm" className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white text-secondary text-[10px] font-black uppercase tracking-widest border border-secondary/10 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 group/btn shadow-sm">
                                        Update Access <IoChevronForward className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            <Footer />
        </div>
    );
}