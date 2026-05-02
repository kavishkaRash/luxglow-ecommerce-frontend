import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            axios.post(import.meta.env.VITE_API_URL + "/api/users/google-login", {
                token: response.access_token
            }).then((res) => {
                localStorage.setItem("token", res.data.token)
                toast.success("Login Successfully")
                const user = res.data.user;
                if (user.role == "admin") {
                    navigate("/admin");
                } else {
                    navigate("/")
                }
            }).catch((err) => {
                console.error("Google Login Failed:", err);
                toast.error("Google login Failed. Please try again. ");
            });
        }
    });

    async function login() {
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/api/users/login",
                {
                    email: email,
                    password: password,
                }
            );
            localStorage.setItem("token", response.data.token)
            const user = response.data.user;
            if (user.role == "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (e) {
            console.error("Login failed", e);
            toast.error("Login Failed. Please Check your credentials.");
        }
    }

    return (
        <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex relative overflow-hidden font-sans">

            {/* --- LEFT SIDE: THE BRAND EXPERIENCE (High-End Look) --- */}
            <div className="hidden lg:flex w-[55%] h-full flex-col justify-between p-16 z-10">

                {/* Top Decoration */}
                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-secondary/40"></div>
                    <span className="text-secondary tracking-[0.4em] text-[10px] uppercase font-bold">Est. 2024 • Global Beauty</span>
                </div>

                {/* Center: High-Fashion Typography */}
                <div className="relative">
                    {/* Watermark */}
                    <span className="absolute -top-20 -left-10 text-[180px] font-serif text-white/10 select-none leading-none">
                        Luxe
                    </span>

                    <div className="relative z-20">
                        <h1 className="text-secondary text-8xl font-serif leading-[0.9]">
                            The Art of <br />
                            <span className="text-accent italic font-light">Radiance.</span>
                        </h1>

                        <div className="h-1 w-24 bg-gradient-to-r from-accent to-secondary my-8 rounded-full"></div>

                        <p className="text-gray-800 text-lg font-light tracking-wide leading-relaxed max-w-sm">
                            Discover a curated collection of skincare and cosmetics designed to empower your natural beauty.
                        </p>
                    </div>
                </div>

                {/* Bottom: Luxury Trust Indicators */}
                <div className="flex items-end justify-between">
                    <div className="flex gap-12">
                        <div className="group">
                            <p className="text-accent text-xs font-bold uppercase tracking-widest">Cruelty Free</p>
                            <p className="text-secondary/40 text-[10px]">Certified PETA</p>
                        </div>
                        <div className="group">
                            <p className="text-accent text-xs font-bold uppercase tracking-widest">Vegan Friendly</p>
                            <p className="text-secondary/40 text-[10px]">100% Plant Based</p>
                        </div>
                    </div>

                    <div className="rotate-90 origin-right translate-x-4 mb-10">
                        <p className="text-[10px] uppercase tracking-[0.5em] text-secondary/30 font-medium whitespace-nowrap">
                            Premium Beauty Solutions • LuxeGlow
                        </p>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: THE CLEAN PREVIOUS LOGIN LOOK --- */}
            <div className="w-full lg:w-[45%] h-full flex justify-center items-center lg:justify-end lg:pr-24 z-10">
                <div className="w-full max-w-[460px] min-h-[580px] backdrop-blur-xl bg-white/40 border border-white/40 shadow-[0_20px_50px_rgba(156,39,176,0.1)] rounded-[40px] p-10 flex flex-col items-center justify-between mx-4">

                    {/* Logo Section */}
                    <div className="w-full flex flex-col items-center gap-2">
                        <img
                            src="/logo1.png"
                            alt="LuxeGlow Logo"
                            className="w-56 mb-2 drop-shadow-sm"
                        />
                        <div className="h-[1px] w-12 bg-secondary/30 mb-4"></div>
                    </div>

                    {/* Form Section */}
                    <div className="w-full flex flex-col gap-8">
                        <div className="text-center">
                            <h2 className="text-secondary text-3xl font-serif italic tracking-wide">Welcome Back</h2>
                            <p className="text-gray-600 text-sm font-light mt-2">Sign in to access your beauty profile</p>
                        </div>

                        <div className="flex flex-col gap-5">
                            <input
                                type="email"
                                placeholder="Email Address"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-14 px-6 rounded-2xl border-none bg-white/70 focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-400 text-secondary"
                            />

                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-14 px-6 rounded-2xl border-none bg-white/70 focus:bg-white focus:ring-2 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-400 text-secondary"
                                />
                                <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-secondary/60 hover:text-accent font-bold">
                                    Forgot?
                                </button>
                            </div>

                            <button
                                onClick={login}
                                className="mt-2 bg-gradient-to-r from-accent to-secondary hover:opacity-90 text-white font-medium tracking-widest uppercase text-sm w-full h-14 rounded-2xl shadow-xl shadow-accent/20 transition-all active:scale-[0.97]"
                            >
                                Sign In
                            </button>

                            <button
                                onClick={googleLogin}
                                className="mt-2 bg-gradient-to-r from-accent to-secondary hover:opacity-90 text-white font-medium tracking-widest uppercase text-sm w-full h-14 rounded-2xl shadow-xl shadow-accent/20 transition-all active:scale-[0.97]"
                            >
                                Google LogIn
                            </button>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="text-center pt-6">
                        <p className="text-gray-600 text-sm font-light">
                            New to LuxeGlow?
                            <Link to="/register" className="text-accent font-semibold ml-2 hover:underline decoration-accent/30 underline-offset-4">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Soft gradient to unify the two sides */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent pointer-events-none"></div>
        </div>
    );
}