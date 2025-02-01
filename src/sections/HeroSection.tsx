import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { connectWallet } from "@/lib/contract";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "sonner";
import { Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  connected: boolean;
  setConnected: React.Dispatch<boolean>;
};
const HeroSection = ({ connected, setConnected }: Props) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 370px)",
  });
  const [connecting, setConnecting] = useState(false);
  const navigate = useNavigate()
  return (
    <main className="mx-auto max-w-6xl px-4 pt-10 text-center md:pt-20">
      <div className="mb-10 space-y-6">
        <h2 className="font-youth text-lg text-orange-500 lg:text-3xl">
          Uncover New Moments
        </h2>
        <h1
          className={cn(
            "font-youth text-5xl font-bold leading-tight text-white md:text-6xl",
            {
              "text-4xl": isMobile,
            },
          )}
        >
          DISCOVER DECENTRALIZED EVENTS
          <br />& EXPERIENCES
        </h1>
        <p className="mx-auto max-w-2xl text-base text-gray-300 lg:text-lg">
          Join a global community where you can explore, book, and share
          unforgettable events—securely powered by blockchain technology.
        </p>
      </div>
      {connected ? (
        <>
          <div className="rounded-lg bg-black/40 p-4 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="relative ">
                <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Event name "
                  className="border-white/10 bg-white/10 pl-10 text-white"
                />
              </div>

              <Select>
                <SelectTrigger className="min-w-[150px] border-white/10 bg-white/10 text-white">
                  <SelectValue placeholder="Art" />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="theater">Theater</SelectItem>
                  <SelectItem value="art">Visual Art</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-accent px-8 hover:bg-accent-hover">
                <SearchIcon className="h-5 w-5" />
              </Button>
              <Button className="border-accent border-2 bg-transparent text-accent hover:text-white px-8 hover:bg-accent" onClick={() => navigate("/register")}>
                <CalendarIcon className="h-5 w-5" /> Register Event
              </Button>
            </div>
          </div>

          <p className="text-gray-400">
            Please select at least one field or leave them empty to see all
            events.
          </p>
        </>
      ) : (
        <Button
          className="rounded-full bg-accent text-white hover:bg-accent-hover"
          disabled={connecting}
          size={"lg"}
          onClick={async () => {
            setConnecting(true);
            const { err } = await connectWallet();
            if (!err) {
              setConnected(true);
              toast.success("Connected wallet succesfully");
            } else {
              toast.error(err);
              setConnected(false);
            }
            setConnecting(false);
          }}
        >
          {connecting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <Wallet /> Connect Wallet To Begin
            </>
          )}
        </Button>
      )}
    </main>
  );
};

export default HeroSection;
