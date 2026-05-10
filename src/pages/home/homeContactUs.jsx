import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

export default function HomeContactUs() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");

    async function sendMessage() {
        const data = { name, email, message, phone, subject };
        try {
            await axios.post(import.meta.env.VITE_API_URL + "/api/contact", data);
            toast.success("Message sent successfully");
            // Logic for clearing inputs remains the same
            setName(""); setEmail(""); setMessage(""); setPhone(""); setSubject("");
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message");
        }
    }

    return (
        <div className="w-full min-h-screen bg-white  selection:bg-accent selection:text-white relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-0" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-0" />

            <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">

                {/* --- HEADER --- */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-3 bg-white/80 border border-secondary/10 px-5 py-2 rounded-full mb-8 shadow-sm backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary/70">
                            Concierge Services
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-serif italic text-secondary mb-8 leading-tight">
                        Contact LuxGlow
                    </h1>

                    <p className="max-w-2xl mx-auto text-secondary/50 leading-relaxed font-light text-lg italic">
                        Whether you seek product advice or bespoke collaborations, 
                        our beauty consultants are here to guide your journey.
                    </p>
                </div>

                {/* --- MAIN INTERFACE --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT - CONTACT INFO CARDS */}
                    <div className="lg:col-span-5 space-y-6">
                        
                        {[
                            { label: "Email", val: "support@luxglow.com", icon: <HiOutlineMail />, color: "accent" },
                            { label: "Phone", val: "+94 77 123 4567", icon: <HiOutlinePhone />, color: "secondary" },
                            { label: "Location", val: "Colombo, Sri Lanka", icon: <HiOutlineLocationMarker />, color: "accent" }
                        ].map((item, index) => (
                            <div 
                                key={index}
                                className="group bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-[0_10px_30px_-15px_rgba(156,39,176,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(233,30,99,0.15)] transition-all duration-700 hover:-translate-y-1 flex items-center gap-6"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-white shadow-inner flex items-center justify-center text-2xl transition-colors duration-500 text-secondary group-hover:text-accent`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-secondary/30 font-black mb-1">
                                        {item.label}
                                    </p>
                                    <h3 className="text-xl md:text-2xl font-serif italic text-secondary group-hover:text-accent transition-colors duration-500">
                                        {item.val}
                                    </h3>
                                </div>
                            </div>
                        ))}

                        {/* Visual Decoration Card */}
                        <div className="hidden lg:block bg-secondary rounded-[3rem] p-10 h-48 relative overflow-hidden group shadow-2xl shadow-secondary/20">
                            <div className="relative z-10 text-white">
                                <h4 className="font-serif italic text-2xl mb-2">Private Consultations</h4>
                                <p className="text-white/60 text-sm font-light">Available for elite members and corporate gifting.</p>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                        </div>
                    </div>

                    {/* RIGHT - MODERN FORM */}
                    <div className="lg:col-span-7 bg-white rounded-[3.5rem] p-8 md:p-14 border border-secondary/5 shadow-[0_30px_100px_-20px_rgba(156,39,176,0.1)] relative">
                        
                        <h2 className="text-4xl font-serif italic text-secondary mb-12">
                            Send A Message
                        </h2>

                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group relative">
                                    <input
                                        type="text"
                                        value={name}
                                        placeholder="Your Name"
                                        onChange={(e) => { setName(e.target.value) }}
                                        className="w-full bg-transparent border-b border-secondary/10 py-4 outline-none focus:border-accent transition-colors duration-500 placeholder:text-secondary/20"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-focus-within:w-full" />
                                </div>

                                <div className="group relative">
                                    <input
                                        type="email"
                                        value={email}
                                        placeholder="Email Address"
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        className="w-full bg-transparent border-b border-secondary/10 py-4 outline-none focus:border-accent transition-colors duration-500 placeholder:text-secondary/20"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-focus-within:w-full" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group relative">
                                    <input
                                        type="text"
                                        value={phone}
                                        placeholder="Phone Number"
                                        onChange={(e)=>{setPhone(e.target.value)}}
                                        className="w-full bg-transparent border-b border-secondary/10 py-4 outline-none focus:border-accent transition-colors duration-500 placeholder:text-secondary/20"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-focus-within:w-full" />
                                </div>

                                <div className="group relative">
                                    <input
                                        type="text"
                                        value={subject}
                                        placeholder="Subject"
                                        onChange={(e)=>{setSubject(e.target.value)}}
                                        className="w-full bg-transparent border-b border-secondary/10 py-4 outline-none focus:border-accent transition-colors duration-500 placeholder:text-secondary/20"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-focus-within:w-full" />
                                </div>
                            </div>

                            <div className="group relative">
                                <textarea
                                    rows="4"
                                    value={message}
                                    placeholder="Your Message"
                                    onChange={(e)=>{setMessage(e.target.value)}}
                                    className="w-full bg-transparent border-b border-secondary/10 py-4 outline-none resize-none focus:border-accent transition-colors duration-500 placeholder:text-secondary/20"
                                />
                                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-focus-within:w-full" />
                            </div>

                            <button
                                type="button"
                                onClick={sendMessage}
                                className="group/btn relative w-full md:w-fit overflow-hidden bg-secondary text-white px-14 py-5 rounded-full uppercase tracking-[0.3em] text-[10px] font-black transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/30 active:scale-95"
                            >
                                <span className="relative z-10">Submit Message</span>
                                <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}