import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit, FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { IoClose, IoWarningOutline } from "react-icons/io5";

function ProductsDeleteConfirm(props) {
    const reviewId = props.reviewID;
    const close = props.close;
    const refresh = props.refresh;

    function deleteProduct() {
        const token = localStorage.getItem("token");
        axios
            .delete(import.meta.env.VITE_API_URL + "/api/review/" + reviewId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                close();
                toast.success("Product deleted Successfully");
                refresh();
            }).catch(() => {
                toast.error("Failed to delete product");
            });
    }

    return (
        <div className="fixed inset-0 w-full h-screen bg-secondary/10 backdrop-blur-md z-[100] flex justify-center items-center p-4 animate-in fade-in duration-300">
            {/* Modal Card */}
            <div className="w-full max-w-[440px] bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(156,39,176,0.2)] border border-white p-10 relative animate-in fade-in zoom-in-95 duration-400">

                {/* Close Button */}
                <button
                    onClick={close}
                    className="absolute right-6 top-6 w-11 h-11 flex items-center justify-center rounded-full text-secondary/40 hover:bg-primary hover:text-accent transition-all duration-300 group"
                >
                    <IoClose size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>

                <div className="flex flex-col items-center text-center">
                    {/* Warning Icon Container */}
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <IoWarningOutline size={38} className="text-accent" />
                    </div>

                    <h2 className="text-secondary text-3xl font-serif italic mb-3">Remove Review?</h2>

                    <p className="text-gray-500 font-light text-sm leading-relaxed mb-8 px-2">
                        Are you sure you want to permanently delete this Review? This action cannot be undone.
                        <span className="font-mono text-secondary font-bold text-[11px] bg-secondary/5 border border-secondary/10 px-3 py-1.5 rounded-xl mt-4 block tracking-wider">
                            ID: {reviewId}
                        </span>
                    </p>

                    {/* Action Buttons */}
                    <div className="flex w-full gap-4">
                        <button
                            onClick={close}
                            className="flex-1 h-14 rounded-2xl border border-secondary/10 text-secondary text-[11px] font-black uppercase tracking-widest hover:bg-secondary/5 transition-all active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={deleteProduct}
                            className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-accent to-secondary text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-accent/20 hover:opacity-90 transition-all active:scale-95"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminReviewPage() {
    const [reviews, setReviews] = useState([]);
    const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            axios
                .get(import.meta.env.VITE_API_URL + "/api/review")
                .then((response) => {
                    setReviews(response.data);
                    setIsLoading(false);
                });
        }
    }, [isLoading]);

    return (
        <div className="w-full min-h-screen bg-[#FFFBFD] p-6 lg:p-12 font-sans selection:bg-accent selection:text-white">
            {isDeleteConfirmVisible && (
                <ProductsDeleteConfirm
                    refresh={() => {
                        setIsLoading(true);
                    }}
                    reviewID={reviewToDelete}
                    close={() => {
                        setIsDeleteConfirmVisible(false);
                    }}
                />
            )}

            {/* Top Header Section */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-in fade-in duration-700">
                <div>
                    <h1 className="text-secondary text-5xl font-serif italic leading-none">
                        Reviews
                        <span className="font-sans not-italic text-sm uppercase tracking-[0.4em] text-accent font-black ml-4 opacity-70">
                            / Admin Console
                        </span>
                    </h1>
                    <p className="text-gray-400 mt-3 font-light tracking-wide italic">
                        Curate and showcase customer experiences for the LuxeGlow collection.
                    </p>
                </div>

                <Link
                    to={"/admin/add-review"}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-secondary to-accent text-white px-8 h-14 rounded-2xl shadow-xl shadow-accent/10 hover:opacity-95 active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest self-start md:self-auto"
                >
                    <FaPlus size={12} />
                    Add Review
                </Link>
            </div>

            {/* Modern Table Container */}
            <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl rounded-[40px] shadow-[0_20px_50px_rgba(156,39,176,0.06)] border border-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
                {isLoading ? (
                    <div className="p-20 flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-secondary/5 bg-secondary/5">
                                    <th className="p-6 pl-8 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/60 w-32">
                                        Product
                                    </th>
                                    <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/60">
                                        Name
                                    </th>
                                    <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/60">
                                        Message
                                    </th>
                                    <th className="p-6 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/60 text-center w-28">
                                        Ratings
                                    </th>
                                    <th className="p-6 pr-8 text-[10px] uppercase tracking-[0.3em] font-black text-secondary/60 text-right w-40">
                                        Management
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-secondary/5">
                                {reviews.map((item) => (
                                    <tr
                                        key={item.ID}
                                        className="group hover:bg-white/80 transition-all duration-300"
                                    >
                                        {/* Image Cell */}
                                        <td className="p-6 pl-8">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-secondary/10 shadow-sm group-hover:scale-105 transition-transform duration-500 bg-primary">
                                                <img
                                                    src={item.image}
                                                    className="w-full h-full object-cover"
                                                    alt={item.name}
                                                />
                                            </div>
                                        </td>

                                        {/* Name Cell */}
                                        <td className="p-6">
                                            <span className="text-secondary font-bold text-base tracking-tight group-hover:text-accent transition-colors block">
                                                {item.name}
                                            </span>
                                        </td>

                                        {/* Message Cell */}
                                        <td className="p-6 max-w-[320px]">
                                            <p className="text-gray-500 font-light text-sm italic leading-relaxed truncate group-hover:text-clip group-hover:whitespace-normal transition-all duration-300">
                                                "{item.message}"
                                            </p>
                                        </td>

                                        {/* Rating Cell */}
                                        <td className="p-6 text-center">
                                            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent/5 border border-accent/10 text-accent font-serif italic font-bold text-sm">
                                                ★ {item.rating}
                                            </span>
                                        </td>

                                        {/* Action Cell */}
                                        <td className="p-6 pr-8">
                                            <div className="flex flex-row gap-3 justify-end">
                                                <button
                                                    onClick={() => {
                                                        navigate("/admin/update-reviews", {
                                                            state: item,
                                                        });
                                                    }}
                                                    className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-secondary/5 text-secondary hover:bg-secondary hover:text-white hover:shadow-lg hover:shadow-secondary/20 transition-all"
                                                    title="Edit Review"
                                                >
                                                    <FaRegEdit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setReviewToDelete(item.ID);
                                                        setIsDeleteConfirmVisible(true);
                                                    }}
                                                    className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white border border-secondary/5 text-gray-400 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 transition-all"
                                                    title="Delete Review"
                                                >
                                                    <FaRegTrashCan size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && reviews.length === 0 && (
                    <div className="p-20 text-center text-gray-400 italic">
                        No products found in the LuxeGlow vault.
                    </div>
                )}
            </div>
        </div>
    );
}