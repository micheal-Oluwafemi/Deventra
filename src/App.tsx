import HeroSection from "./component/HeroSection";
import Navbar from "./component/Navbar";

export default function App() {
  return (
    <main className="w-full">
      <div className="relative h-dvh">
        <Navbar />

        <HeroSection />

        <div className="bg-heroBg1 absolute left-0 top-0 -z-10 h-full w-[50vw] bg-primary bg-cover bg-no-repeat opacity-50 bg-blend-color-dodge"></div>

        <div className="bg-heroBg2 absolute right-0 top-0 -z-10 h-full w-[50vw] bg-primary bg-cover bg-no-repeat opacity-50 bg-blend-lighten"></div>
      </div>
    </main>
  );
}
