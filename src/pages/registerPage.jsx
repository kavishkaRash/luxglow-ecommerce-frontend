import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMailOutline, IoLockClosedOutline, IoPersonOutline, IoChevronForward } from "react-icons/io5";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasttName] = useState("");
    const navigate = useNavigate();

    async function register() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/api/users/",
                {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                }
            );
            toast.success("Registration successful! Please login.");
            navigate("/login");
        } catch (e) {
            console.error("Register failed", e);
            toast.error("Registration failed. Please check your credentials.");
        }
    }

    return (
        <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex relative overflow-hidden font-sans selection:bg-accent/30">
            
            {/* --- LEFT SIDE: EDITORIAL EXPERIENCE --- */}
            <div className="hidden lg:flex w-[50%] h-full flex-col justify-between p-20 z-10 relative">
                {/* Brand Header */}
                <div className="flex items-center gap-6">
                    <div className="h-[1px] w-16 bg-secondary/30"></div>
                    <span className="text-secondary tracking-[0.5em] text-[10px] uppercase font-black">Est. 2024 • LuxeGlow Global</span>
                </div>

                {/* Main Hero Text */}
                <div className="relative">
                    <span className="absolute -top-32 -left-16 text-[220px] font-serif text-white/10 select-none leading-none italic">
                        Glow
                    </span>
                    <div className="relative z-20">
                        <h1 className="text-secondary text-8xl font-serif leading-[0.85] tracking-tight">
                            Elevate Your <br />
                            <span className="text-accent italic font-light drop-shadow-sm">Ritual.</span>
                        </h1>
                        <p className="mt-10 text-gray-700 text-lg font-light tracking-wide leading-relaxed max-w-sm border-l-2 border-accent/20 pl-6">
                            Join our inner circle for exclusive access to dermatologically-perfected skincare and bespoke beauty artistry.
                        </p>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-10">
                    
                    <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/60 font-bold">
                        Join 50k+ Beauty Enthusiasts
                    </p>
                </div>
            </div>

            {/* --- RIGHT SIDE: REGISTRATION FORM --- */}
            <div className="w-full lg:w-[50%] h-full flex justify-center items-center z-10 p-6">
                <div className="w-full max-w-[520px] bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_32px_64px_-16px_rgba(156,39,176,0.15)] rounded-[50px] p-10 lg:p-14 flex flex-col items-center animate-in fade-in zoom-in duration-700">
                    
                    {/* Logo & Heading */}
                    <div className="text-center mb-10">
                        <img src="/logo1.png" alt="LuxeGlow" className="w-48 mx-auto mb-6 hover:scale-105 transition-transform duration-500" />
                        <h2 className="text-secondary text-4xl font-serif italic mb-2">Create Account</h2>
                        <div className="flex items-center justify-center gap-2">
                            <span className="h-[1px] w-4 bg-accent/40"></span>
                            <p className="text-gray-500 text-[11px] uppercase tracking-widest font-bold">Begin your journey</p>
                            <span className="h-[1px] w-4 bg-accent/40"></span>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="w-full space-y-4">
                        {/* Name Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative group">
                                <IoPersonOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="First Name" 
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/80 border border-transparent focus:border-accent/20 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-400 text-secondary text-sm"
                                />
                            </div>
                            <div className="relative group">
                                <IoPersonOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Last Name" 
                                    onChange={(e) => setLasttName(e.target.value)}
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/80 border border-transparent focus:border-accent/20 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-400 text-secondary text-sm"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="relative group">
                            <IoMailOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={18} />
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/80 border border-transparent focus:border-accent/20 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-400 text-secondary text-sm"
                            />
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <IoLockClosedOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type="password" 
                                    placeholder="Password" 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/80 border border-transparent focus:border-accent/20 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-400 text-secondary text-sm"
                                />
                            </div>
                            <div className="relative group">
                                <IoLockClosedOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type="password" 
                                    placeholder="Confirm" 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-white/80 border border-transparent focus:border-accent/20 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-400 text-secondary text-sm"
                                />
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            onClick={register}
                            className="group mt-4 relative w-full h-15 bg-gradient-to-r from-secondary to-accent text-white font-bold tracking-[0.2em] uppercase text-[11px] rounded-2xl shadow-xl shadow-accent/20 transition-all hover:shadow-accent/40 active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
                        >
                            <span className="relative z-10">Create Profile</span>
                            <IoChevronForward className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 text-center">
                        <p className="text-gray-500 text-[13px] font-light">
                            Already a member? 
                            <Link to="/login" className="text-secondary font-bold ml-2 hover:text-accent transition-colors border-b border-secondary/20 pb-0.5">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Subtle Aesthetic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 via-transparent to-accent/5 pointer-events-none"></div>
        </div>
    );
}