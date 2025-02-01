import HeroSection from "@/sections/HeroSection";
import Navbar from "@/sections/Navbar";
import OtherEvents from "@/sections/OtherEvents";
import LenisScroll from "@/LenisScroll";
import { useState } from "react";
import bg from "@/assets/hero/abstract_bg.jpg"

export default function Landing() {
  const [connected, setConnected] = useState(false);
  return (
    <main className="w-full">
      <LenisScroll />
      <div
        className="relative h-[90dvh]"
        style={{
          backgroundImage: `url('${bg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000000DD",
          backgroundBlendMode: "multiply",
        }}
      >
        <Navbar walletConnected={connected} setWalletConnected={setConnected} />

        <HeroSection connected={connected} setConnected={setConnected} />

        <div className="absolute left-0 top-0 -z-10 h-full w-screen bg-black/95 bg-heroBg1 bg-cover bg-no-repeat bg-blend-multiply"></div>
        {/* <div className="absolute left-0 top-0 -z-10 h-full w-[50vw] bg-primary bg-heroBg1 bg-cover bg-no-repeat opacity-50 bg-blend-color-dodge"></div> */}

        {/* <div className="absolute right-0 top-0 -z-10 h-full w-[50vw] bg-primary bg-heroBg2 bg-cover bg-no-repeat opacity-50 bg-blend-lighten"></div> */}
      </div>

      {connected && <OtherEvents />}
    </main >
  );
}
