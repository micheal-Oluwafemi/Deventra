import HeroSection from "./sections/HeroSection";
import Navbar from "./sections/Navbar";
import OtherEvents from "./sections/OtherEvents";
import LenisScroll from "../LenisScroll";

export default function App() {
  return (
    <main className="w-full">
      <LenisScroll />
      <div className="relative h-dvh">
        <Navbar />

        <HeroSection />

        <div className="absolute left-0 top-0 -z-10 h-full w-[50vw] bg-primary bg-heroBg1 bg-cover bg-no-repeat opacity-50 bg-blend-color-dodge"></div>

        <div className="absolute right-0 top-0 -z-10 h-full w-[50vw] bg-primary bg-heroBg2 bg-cover bg-no-repeat opacity-50 bg-blend-lighten"></div>
      </div>

      <OtherEvents />
    </main>
  );
}
