import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {

    return (
        <header className="w-full h-35 bg-primary text-secondary">
            <div className="w-full h-10 flex justify-center items-center bg-accent text-white text-sm">
                <span>Free Delivery on Orders Over $10!</span>
            </div>

            <div className="w-full h-full  flex relative">

                <img src="/logo1.png" className="h-25 absolute left-0 object-cover px-10" />


                <div className="h-25 w-full flex justify-center items-center gap-5 text-lg">
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                
                <Link to="/cart" className="h-full  text-3xl absolute right-0 flex justify-center items-center ">
                    <BsCart3 />
                </Link>

            </div>
        </header>
    )
}