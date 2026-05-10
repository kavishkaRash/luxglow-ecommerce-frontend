import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
    IoCallOutline, IoMailOutline, IoLocationOutline, IoTimeOutline,
    IoLogoInstagram, IoLogoFacebook, IoLogoTiktok, IoChevronDownOutline,
    IoPaperPlaneOutline, IoSparklesOutline
} from "react-icons/io5";
import Header from '../components/header';
import Footer from '../components/footer';


export default function ContactUs() {


    // FAQ Toggle Logic (Simplified for UI display)
    const [openFaq, setOpenFaq] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");

    async function sendMessage() {
        const data = {
            name: name,
            email: email,
            message: message,
            phone: phone,
            subject: subject
        }

        console.log(data);

        try {
            await axios.post(import.meta.env.VITE_API_URL + "/api/contact", data)
                .then(() => {
                    toast.success("Message sent successfully");
                    setName("");
                    setEmail("");
                    setMessage("");
                    setPhone("");
                    setSubject("");
                });
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message");
        }

    }

    const faqs = [
        { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express options are available at checkout." },
        { q: "Are products skin-friendly?", a: "Absolutely. All LuxeGlow products are dermatologically tested and paraben-free." },
        { q: "Can I return products?", a: "We offer a 14-day return policy on unopened items to ensure your satisfaction." },
        { q: "How can I track my order?", a: "Once shipped, a tracking link will be sent directly to your verified email." }
    ];

    return (
        <div className="w-full min-h-screen bg-[#FFFBFD] font-sans selection:bg-accent selection:text-white">

            <Header />

            {/* --- 1. HERO SECTION --- */}
            <section className="relative pt-28 pb-20 px-6 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-primary to-transparent -z-10 opacity-70" />
                <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-black mb-4 block">Concierge Service</span>
                    <h1 className="text-secondary text-5xl md:text-7xl font-serif italic mb-6">Contact <span className="text-accent">Us</span></h1>
                    <p className="text-gray-500 font-light text-lg italic leading-relaxed">
                        We’re here to help with product inquiries, beauty advice, and customer support. Let's make your radiance journey effortless.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* --- LEFT COLUMN: Info & Support --- */}
                    <div className="lg:col-span-5 space-y-10">

                        {/* 2. Contact Information */}
                        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[40px] shadow-[0_20px_50px_rgba(156,39,176,0.05)] border border-white">
                            <h2 className="text-secondary text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-accent/30"></span>
                                Get In Touch
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-secondary shrink-0"><IoCallOutline size={20} /></div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Phone</p>
                                        <p className="text-secondary font-medium">+94 77 123 4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-secondary shrink-0"><IoMailOutline size={20} /></div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Email</p>
                                        <p className="text-secondary font-medium">support@luxglow.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-secondary shrink-0"><IoLocationOutline size={20} /></div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Address</p>
                                        <p className="text-secondary font-medium">LuxeGlow Boutique, Colombo, Sri Lanka</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 pt-4 border-t border-secondary/5">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary shrink-0"><IoTimeOutline size={20} /></div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Business Hours</p>
                                        <p className="text-secondary font-medium">Mon – Sat: 9:00 AM – 6:00 PM</p>
                                        <p className="text-[10px] text-gray-400 italic">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Beauty Support Section */}
                        <div className="bg-gradient-to-br from-secondary to-[#7B1FA2] p-10 rounded-[40px] text-white shadow-xl shadow-secondary/20 relative overflow-hidden group">
                            <IoSparklesOutline className="absolute -right-4 -top-4 text-white/10 group-hover:rotate-12 transition-transform duration-700" size={150} />
                            <h3 className="text-2xl font-serif italic mb-4">Beauty Support</h3>
                            <p className="text-white/80 text-sm font-light leading-relaxed mb-6">
                                Need help choosing the right products? Our beauty support team is ready to help you find matches for your unique style and skincare needs.
                            </p>
                            <button className="text-[10px] uppercase tracking-[0.3em] font-black border-b border-white/30 pb-1 hover:border-white transition-all">
                                Chat with a Specialist
                            </button>
                        </div>
                    </div>

                    {/* --- 3. CONTACT FORM --- */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-10 md:p-14 rounded-[50px] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-secondary/5">
                            <h2 className="text-secondary text-2xl font-serif italic mb-8 text-center">Send us a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-2">Full Name</label>
                                        <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Jane Doe" className="w-full h-14 px-6 rounded-2xl bg-primary/30 border-transparent focus:bg-white focus:border-accent/20 focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-2">Email Address</label>
                                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="jane@example.com" className="w-full h-14 px-6 rounded-2xl bg-primary/30 border-transparent focus:bg-white focus:border-accent/20 focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-2">Phone Number</label>
                                        <input type="text" onChange={(e) => { setPhone(e.target.value) }} placeholder="+94 77..." className="w-full h-14 px-6 rounded-2xl bg-primary/30 border-transparent focus:bg-white focus:border-accent/20 focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-2">Subject</label>
                                        <input type="text" onChange={(e) => { setSubject(e.target.value) }} placeholder="Beauty Advice" className="w-full h-14 px-6 rounded-2xl bg-primary/30 border-transparent focus:bg-white focus:border-accent/20 focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-2">Your Message</label>
                                    <textarea rows="5" onChange={(e) => { setMessage(e.target.value) }} placeholder="How can we help you glow today?" className="w-full p-6 rounded-3xl bg-primary/30 border-transparent focus:bg-white focus:border-accent/20 focus:ring-4 focus:ring-accent/5 outline-none transition-all text-secondary resize-none"></textarea>
                                </div>
                                <button type="button" onClick={() => { sendMessage() }} className="w-full h-16 bg-gradient-to-r from-secondary to-accent text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-2xl shadow-xl shadow-accent/20 transition-all hover:shadow-accent/40 active:scale-[0.98] flex items-center justify-center gap-3">
                                    Send Message <IoPaperPlaneOutline size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* --- 5. SOCIAL MEDIA SECTION --- */}
                <div className="mt-24 text-center">
                    <p className="text-gray-400 text-[11px] uppercase tracking-[0.4em] font-bold mb-8">Follow The Glow</p>
                    <div className="flex justify-center gap-8">
                        <a href="#" className="w-14 h-14 rounded-full bg-white shadow-sm border border-secondary/5 flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all duration-300"><IoLogoInstagram size={24} /></a>
                        <a href="#" className="w-14 h-14 rounded-full bg-white shadow-sm border border-secondary/5 flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all duration-300"><IoLogoFacebook size={24} /></a>
                        <a href="#" className="w-14 h-14 rounded-full bg-white shadow-sm border border-secondary/5 flex items-center justify-center text-secondary hover:bg-accent hover:text-white transition-all duration-300"><IoLogoTiktok size={24} /></a>
                    </div>
                    <p className="text-gray-400 text-[10px] font-light mt-6 italic">Follow LuxeGlow for beauty tips, new arrivals, and exclusive offers.</p>
                </div>

                {/* --- 6. FAQ SECTION --- */}
                <div className="mt-32 max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-secondary text-4xl font-serif italic mb-4">Frequently Asked</h2>
                        <div className="w-12 h-[1px] bg-accent mx-auto"></div>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-3xl border border-secondary/5 overflow-hidden transition-all duration-300">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-8 py-6 flex items-center justify-between text-left group"
                                >
                                    <span className={`font-bold text-sm tracking-wide transition-colors ${openFaq === index ? 'text-accent' : 'text-secondary'}`}>{faq.q}</span>
                                    <IoChevronDownOutline className={`text-secondary transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-accent' : ''}`} />
                                </button>
                                <div className={`px-8 transition-all duration-500 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-gray-500 text-sm font-light leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- 7. GOOGLE MAP PLACEHOLDER --- */}
                <div className="mt-32 w-full h-[450px] rounded-[50px] overflow-hidden shadow-2xl shadow-secondary/5 border-4 border-white relative">
                    {/* In a real app, replace this div with your <iframe src="google-map-url"> */}
                    <div className="absolute inset-0 bg-primary/50 flex items-center justify-center flex-col">
                        <iframe

                            src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_HERE"

                            width="100%"

                            height="450"

                            style={{border:0}}

                            allowFullScreen

                            loading="lazy"

                        ></iframe>                        <IoLocationOutline className="text-accent mb-4" size={40} />
                        <p className="text-secondary font-serif italic text-xl">Visit our Flagship Store</p>
                        <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">Colombo, Western Province, Sri Lanka</p>
                    </div>
                </div>

            </section>

            {/* Aesthetic Footer Tag */}
            <Footer />
        </div>
    );
}