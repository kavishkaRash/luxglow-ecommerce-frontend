import { Route, Routes } from "react-router-dom";
import Header from "../components/header.jsx";
import ProductPage from "./productPage.jsx";
import ProductOverview from "./productOverview.jsx";
import Cart from "./cart.jsx";
import Checkout from "./checkout.jsx";
import Setting from "./settings.jsx";




export default function HomePage() {
    return (
        <div className="w-full h-full">

            <Header />

            <Routes path="/">
                <Route path="/" element={<h1>Welcome To the Home Page</h1>} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/contact" element={<h1>Contact Us</h1>} />
                <Route path="/about" element={<h1>About Us</h1>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/overview/:id" element={<ProductOverview />} />
                <Route path="/settings" element={<Setting />} />
                <Route path="/*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </div>
    )
}