import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { IoMailOutline, IoLockClosedOutline, IoKeyOutline, IoArrowBackOutline, IoChevronForward } from "react-icons/io5";

export default function ForgetPassword() {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function changePassword() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        
        try {
            await axios.post(import.meta.env.VITE_API_URL + "/api/users/change-password", {
                email: email,
                otp: otp,
                newPassword: newPassword
            });
            toast.success("Password changed successfully");
            navigate("/login");
        } catch (error) {
            toast.error("Failed to change password. Please try again.");
        }
    }

    async function sendOTP() {
        if (loading) return;
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

        setLoading(true);
        try {
            await axios.get(import.meta.env.VITE_API_URL + "/api/users/send-otp/" + email);
            toast.success("OTP sent successfully");
            setStep("otp");
        } catch (error) {
            toast.error("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex justify-center items-center p-4 relative overflow-hidden font-sans">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-secondary/10 backdrop-blur-[2px]"></div>

            <div className="relative w-full max-w-[480px] bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_32px_64px_-16px_rgba(156,39,176,0.2)] rounded-[50px] overflow-hidden animate-in fade-in zoom-in duration-500">
                
                {/* Visual Header */}
                <div className="p-10 pb-0 text-center">
                    <img src="/logo1.png" alt="LuxeGlow" className="w-40 mx-auto mb-6 hover:scale-105 transition-transform duration-500" />
                    <h1 className="text-secondary text-3xl font-serif italic mb-2">Account Recovery</h1>
                    <div className="flex items-center justify-center gap-2">
                        <span className="h-[1px] w-4 bg-accent/40"></span>
                        <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">
                            {step === "email" ? "Identity Verification" : "Secure New Access"}
                        </p>
                        <span className="h-[1px] w-4 bg-accent/40"></span>
                    </div>
                </div>

                <div className="p-10 pt-8">
                    {step === "email" && (
                        <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500">
                            <p className="text-gray-600 text-sm font-light text-center px-4 leading-relaxed">
                                Enter your email address and we'll send you a specialized code to restore your radiance.
                            </p>
                            
                            <div className="relative group">
                                <IoMailOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white/80 border border-transparent focus:border-accent/20 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-400 text-secondary"
                                />
                            </div>

                            <button
                                onClick={sendOTP}
                                disabled={loading}
                                className="group w-full h-14 bg-gradient-to-r from-secondary to-accent text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-xl shadow-accent/20 transition-all hover:shadow-accent/40 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
                            >
                                <span>{loading ? "Requesting Code..." : "Send Reset Code"}</span>
                                {!loading && <IoChevronForward className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    )}

                    {step === "otp" && (
                        <div className="flex flex-col gap-5 animate-in slide-in-from-right-4 duration-500">
                            <div className="relative group">
                                <IoKeyOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                                <input
                                    type="text"
                                    placeholder="Verification Code"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white/80 border border-transparent focus:border-accent/20 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-400 text-secondary tracking-[0.5em] font-bold"
                                />
                            </div>

                            <div className="relative group">
                                <IoLockClosedOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white/80 border border-transparent focus:border-accent/20 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-400 text-secondary"
                                />
                            </div>

                            <div className="relative group">
                                <IoLockClosedOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" size={20} />
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white/80 border border-transparent focus:border-accent/20 focus:bg-white focus:ring-4 focus:ring-accent/5 outline-none transition-all placeholder:text-gray-400 text-secondary"
                                />
                            </div>

                            <button
                                onClick={changePassword}
                                className="w-full h-14 bg-gradient-to-r from-secondary to-accent text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-xl shadow-accent/20 transition-all active:scale-95 mt-2"
                            >
                                Confirm New Password
                            </button>
                            
                            <button 
                                onClick={() => setStep("email")}
                                className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-secondary/40 hover:text-accent font-bold transition-colors"
                            >
                                <IoArrowBackOutline /> Use a different email
                            </button>
                        </div>
                    )}

                    {/* Back to Login Link */}
                    <div className="mt-10 pt-6 border-t border-secondary/5 text-center">
                        <Link to="/login" className="text-gray-500 text-[12px] font-light hover:text-secondary transition-colors">
                            Remembered your password? <span className="text-accent font-bold ml-1 border-b border-accent/20 pb-0.5">Sign In</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Aesthetic Tag */}
            <p className="absolute bottom-10 text-[10px] uppercase tracking-[0.5em] text-white/40 font-bold">
                LuxeGlow Security Protocol
            </p>
        </div>
    );
}