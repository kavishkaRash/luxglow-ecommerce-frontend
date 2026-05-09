import Header from "../components/header.jsx";
import HeroSection from "./home/heroSection.jsx";
import HomeCategorySection from "./home/homeCategorySection.jsx";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen">

      <Header />

      <HeroSection />

      <HomeCategorySection />

    </div>
  );
}