import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import HeroSection from "./home/heroSection.jsx";
import HomeCategorySection from "./home/homeCategorySection.jsx";
import HomeContactUs from "./home/homeContactUs.jsx";
import LuxuryPromoSection from "./home/luxuryPromoSection.jsx";
import NewArrivalSection from "./home/newArrivalSection.jsx";
import ReviewSection from "./home/reviewSection.jsx";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen">

      <Header />

      <HeroSection />

      <HomeCategorySection />

      <NewArrivalSection />

      <LuxuryPromoSection />

      <ReviewSection />

      <HomeContactUs />

      <Footer />

    </div>
  );
}