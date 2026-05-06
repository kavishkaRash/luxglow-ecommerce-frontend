import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { IoClose, IoWarningOutline, IoShieldCheckmarkOutline, IoBanOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

function BlockUserDeleteConfirm(props) {
    const email = props.user?.email;
    const isBlocking = !props.user?.isBlock;
    const close = props.close;
    const refresh = props.refresh;

    function blockUser() {
        const token = localStorage.getItem("token");
        axios
            .put(import.meta.env.VITE_API_URL + "/api/users/block/" + email, {
                isBlock: !props.user.isBlock
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(() => {
                close();
                toast.success(isBlocking ? "User restricted successfully" : "User access restored");
                refresh();
            }).catch(() => {
                toast.error("Process failed. Please try again.");
            });
    }

    return (
        <div className="fixed inset-0 w-full h-screen bg-secondary/30 backdrop-blur-md z-[100] flex justify-center items-center p-4 animate-in fade-in duration-300">
            <div className="w-full max-w-[420px] bg-white rounded-[45px] shadow-2xl border border-white p-10 relative animate-in zoom-in duration-500">
                <button onClick={close} className="absolute right-8 top-8 text-secondary/30 hover:text-accent transition-colors">
                    <IoClose size={28} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isBlocking ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                        {isBlocking ? <IoBanOutline size={40} /> : <IoShieldCheckmarkOutline size={40} />}
                    </div>

                    <h2 className="text-secondary text-3xl font-serif italic mb-3">
                        {isBlocking ? "Restrict Access?" : "Restore Access?"}
                    </h2>

                    <p className="text-gray-500 font-light text-sm leading-relaxed mb-8 px-2">
                        You are about to modify access permissions for: <br />
                        <span className="font-bold text-secondary italic block mt-1 underline decoration-accent/30">{email}</span>
                    </p>

                    <div className="flex w-full gap-3">
                        <button onClick={close} className="flex-1 py-4 rounded-2xl bg-primary text-secondary text-[11px] font-black uppercase tracking-widest hover:bg-secondary/5 transition-all">
                            Cancel
                        </button>
                        <button onClick={blockUser} className={`flex-1 py-4 rounded-2xl text-white text-[11px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95 ${isBlocking ? 'bg-gradient-to-r from-rose-500 to-accent shadow-rose-200' : 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-200'}`}>
                            {isBlocking ? "Confirm Block" : "Confirm Unblock"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminUserPage() {
    const [users, setUsers] = useState([]);
    const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
    const [userToBlock, setUserToBlock] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            const token = localStorage.getItem("token");
            axios
                .get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((response) => {
                    setUsers(response.data);
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    return (
        <div className="w-full min-h-screen bg-[#FFFBFD] p-6 lg:p-12 font-sans selection:bg-accent selection:text-white">
            {isBlockConfirmVisible && (
                <BlockUserDeleteConfirm
                    refresh={() => setIsLoading(true)}
                    user={userToBlock}
                    close={() => setIsBlockConfirmVisible(false)}
                />
            )}

            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-secondary text-5xl font-serif italic leading-none">
                        Luxe<span className="text-accent">Glow</span> <span className="text-2xl font-sans not-italic opacity-30 ml-4 tracking-tighter">Community</span>
                    </h1>
                    <p className="text-gray-400 mt-3 font-light tracking-wide italic">Oversee account permissions and administrative roles.</p>
                </div>
            </div>

            {/* Table Container */}
            <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl rounded-[50px] shadow-[0_30px_100px_-20px_rgba(156,39,176,0.1)] border border-white/50 overflow-hidden">
                {isLoading ? (
                    <div className="p-40 flex justify-center"><Loader /></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-secondary/5 border-b border-secondary/5">
                                    <th className="py-8 px-10 text-[10px] uppercase tracking-[0.4em] font-black text-secondary/50 text-left">Member</th>
                                    <th className="py-8 px-10 text-[10px] uppercase tracking-[0.4em] font-black text-secondary/50 text-left">Identity</th>
                                    <th className="py-8 px-10 text-[10px] uppercase tracking-[0.4em] font-black text-secondary/50 text-center">Role</th>
                                    <th className="py-8 px-10 text-[10px] uppercase tracking-[0.4em] font-black text-secondary/50 text-right">Access Management</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-secondary/5">
                                {users.map((user) => (
                                    <tr key={user.email} className="group hover:bg-primary/30 transition-all duration-500">
                                        {/* Profile Cell */}
                                        <td className="py-6 px-10">
                                            <div className="flex items-center gap-5">
                                                <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 p-1 transition-transform group-hover:scale-110 duration-500 ${user.isBlock === false ? 'border-green-500 shadow-lg shadow-accent/10' : 'border-red-500'}`}>
                                                    <img src={user.image} className="w-full h-full object-cover rounded-full" alt="" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-secondary font-bold text-sm tracking-tight">{user.firstName} {user.lastName}</span>
                                                    <span className={`text-[9px] uppercase font-black tracking-widest ${user.isBlock ? 'text-rose-500' : 'text-emerald-500'}`}>
                                                        {user.isBlock ? '• Restricted' : '• Active'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Contact Cell */}
                                        <td className="py-6 px-10">
                                            <span className="text-secondary/70 font-mono text-xs">{user.email}</span>
                                        </td>

                                        {/* Role Cell */}
                                        <td className="py-6 px-10">
                                            <div className="flex justify-center">
                                                <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-accent text-white shadow-md shadow-accent/20' : 'bg-secondary/10 text-secondary'}`}>
                                                    {user.role === 'admin' && <MdOutlineAdminPanelSettings size={14} />}
                                                    {user.role}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Actions Cell */}
                                        <td className="py-6 px-10">
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => { setUserToBlock(user); setIsBlockConfirmVisible(true); }}
                                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
                                                        user.isBlock 
                                                        ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white' 
                                                        : 'bg-white border-secondary/10 text-secondary hover:bg-rose-500 hover:text-white hover:border-rose-500'
                                                    }`}
                                                >
                                                    {user.isBlock ? "Unrestrict" : "Restrict"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {users.length === 0 && !isLoading && (
                    <div className="p-32 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4 italic text-secondary/30 font-serif text-4xl">!</div>
                        <p className="text-secondary/40 italic font-serif">The LuxeGlow community vault is currently empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
}