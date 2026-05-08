import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, Cell } from "recharts";
import {
    IoWalletOutline, IoCartOutline, IoBagHandleOutline, IoPeopleOutline,
    IoTimeOutline, IoCheckmarkDoneOutline, IoWarningOutline, IoChatbubbleOutline,
    IoArrowUpOutline, IoTrendingUpOutline, IoCalendarOutline
} from "react-icons/io5";

export default function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            axios.get(import.meta.env.VITE_API_URL + "/api/admin/dashboard").then(
                (res) => {
                    setDashboardData(res.data)
                    setIsLoading(false);
                }
            ).catch((err) => console.log(err));
        }
    }, [isLoading]);

    const statsRow1 = [
        { label: "Total Revenue", value: `$${dashboardData?.totalRevenue || 0}`, icon: <IoWalletOutline />, trend: "+12%" },
        { label: "Total Orders", value: dashboardData?.totalOrders || 0, icon: <IoCartOutline />, trend: "+8%" },
        { label: "Total Products", value: dashboardData?.totalProducts || 0, icon: <IoBagHandleOutline />, trend: "Active" },
        { label: "Total Users", value: dashboardData?.totalUsers || 0, icon: <IoPeopleOutline />, trend: "+15%" },
    ];

    const statsRow2 = [
        { label: "Pending Orders", value: dashboardData?.pendingOrders || 0, icon: <IoTimeOutline />, color: "text-amber-500", bg: "bg-amber-50" },
        { label: "Delivered", value: dashboardData?.deliveredOrders || 0, icon: <IoCheckmarkDoneOutline />, color: "text-green-500", bg: "bg-green-50" },
        { label: "Low Stock", value: dashboardData?.lowStock || 0, icon: <IoWarningOutline />, color: "text-accent", bg: "bg-accent/5" },
        { label: "Reviews", value: dashboardData?.reviews?.length || 0, icon: <IoChatbubbleOutline />, color: "text-secondary", bg: "bg-secondary/5" },
    ];

    if (isLoading) return (
        <div className="w-full h-screen bg-primary flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                <p className="text-secondary font-serif italic animate-pulse">Initializing LuxeGlow Systems...</p>
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-[#FFFBFD] p-6 lg:p-12 font-sans selection:bg-accent selection:text-white">

            {/* --- HEADER --- */}
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div>
                    <div className="flex items-center gap-2 text-accent mb-2">
                        <IoTrendingUpOutline size={18} />
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black">Performance Analytics</span>
                    </div>
                    <h1 className="text-secondary text-5xl font-serif italic leading-none">
                        Executive <span className="text-accent">Overview</span>
                    </h1>
                    <p className="text-gray-400 font-light text-sm mt-3 italic">Welcome back to the LuxeGlow command center.</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-secondary/5">
                    <IoCalendarOutline className="text-secondary" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-secondary/60">May 2026</span>
                </div>
            </header>

            {/* --- TOP SECTION: PRIMARY STATS --- */}
            <div className="space-y-8 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statsRow1.map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[45px] shadow-[0_20px_50px_rgba(156,39,176,0.04)] border border-secondary/5 group hover:scale-[1.02] transition-all duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-secondary text-2xl group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-sm">
                                        {stat.icon}
                                    </div>
                                    <span className="text-[9px] font-black text-green-500 bg-green-50 px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-tighter">
                                        <IoArrowUpOutline /> {stat.trend}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">{stat.label}</p>
                                <h3 className="text-secondary text-3xl font-serif italic mt-2">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- SECONDARY STATS (GLASSMORPHISM) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsRow2.map((stat, i) => (
                        <div key={i} className="bg-white/40 backdrop-blur-xl p-6 rounded-[30px] border border-white flex items-center gap-5 shadow-sm hover:bg-white transition-all duration-300">
                            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center text-xl`}>
                                {stat.icon}
                            </div>
                            <div>
                                <h4 className="text-secondary font-black text-lg leading-none">{stat.value}</h4>
                                <p className="text-gray-400 text-[9px] uppercase tracking-widest font-bold mt-1.5">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- MIDDLE SECTION: DATA VISUALIZATION --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">

                {/* Revenue Chart */}

                <div className="lg:col-span-8 bg-white p-10 rounded-[50px] border border-secondary/5 shadow-sm relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 relative z-10">
                        <div>
                            <h3 className="text-secondary font-serif italic text-2xl">Revenue Growth</h3>
                            <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">Monthly financial trajectory</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 px-4 py-2 bg-primary rounded-xl text-[10px] font-bold text-secondary">
                                <div className="w-2 h-2 rounded-full bg-secondary" /> Actual Revenue
                            </div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            {/* Added margin here to prevent X-Axis labels from being cut off */}
                            <BarChart
                                data={dashboardData?.revenueData || []}
                                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                            >
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#E91E63" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 'bold' }}
                                    dy={10} // Adjusted distance
                                />
                                <Tooltip
                                    cursor={{ fill: '#FFF5F8' }}
                                    contentStyle={{
                                        borderRadius: '20px',
                                        border: 'none',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                        padding: '15px',
                                        fontSize: '12px',
                                        fontFamily: 'sans-serif'
                                    }}
                                    itemStyle={{ color: '#9C27B0', fontWeight: 'bold' }}
                                />
                                <Bar
                                    dataKey="revenue"
                                    fill="url(#barGradient)"
                                    radius={[10, 10, 10, 10]}
                                    barSize={35} // Slightly reduced for better spacing
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="lg:col-span-4 bg-secondary/5 backdrop-blur-xl p-10 rounded-[50px] border border-white flex flex-col">
                    <div className="mb-8">
                        <h3 className="text-secondary font-serif italic text-2xl">Recent Orders</h3>
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">Latest luxury acquisitions</p>
                    </div>
                    <div className="space-y-5 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
                        {dashboardData?.recentOrders?.map((order, i) => (
                            <div key={i} className="bg-white/60 p-5 rounded-[25px] flex items-center justify-between border border-white hover:bg-white hover:shadow-lg hover:shadow-secondary/5 transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-xs font-black">
                                        {order.customerName.charAt(0) || "U"}
                                    </div>
                                    <div>
                                        <p className="text-secondary font-bold text-sm tracking-tight group-hover:text-accent transition-colors">{order.customerName}</p>
                                        <p className="text-[10px] text-gray-400 font-mono uppercase mt-0.5">{order.orderID}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-secondary font-black text-sm">{order.total}</p>
                                    <span className="text-[8px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-black uppercase tracking-tighter">
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-auto pt-8 text-secondary text-[11px] font-black uppercase tracking-[0.2em] hover:text-accent transition-colors flex items-center justify-center gap-2">
                        View Analytics Suite
                        <div className="w-5 h-px bg-secondary/20 group-hover:bg-accent/20" />
                    </button>
                </div>
            </div>

            {/* --- LOWER SECTION: ACTIVITY PULSE --- */}
            <div className="bg-white p-10 rounded-[50px] border border-secondary/5 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            <IoTrendingUpOutline size={20} />
                        </div>
                        <h3 className="text-secondary font-serif italic text-2xl">Pulse Activity Feed</h3>
                    </div>
                    <div className="h-px flex-1 bg-primary mx-8 hidden md:block" />
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Real-time Updates</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {dashboardData?.activities?.map((act, i) => (
                        <div key={i} className="relative pl-8 group">
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary rounded-full group-hover:bg-accent/30 transition-colors" />
                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-white border-2 border-accent shadow-[0_0_10px_rgba(233,30,99,0.4)] group-hover:scale-125 transition-transform" />
                            <p className="text-secondary text-[13px] leading-relaxed font-medium mb-3 italic">
                                "{act.text}"
                            </p>
                            <span className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                <IoTimeOutline className="text-accent" /> {act.time}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}