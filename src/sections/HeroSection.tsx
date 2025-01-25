import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { connectWallet } from "@/lib/contract";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, MapPinIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { toast } from "sonner";

type Props = {
  connected: boolean,
  setConnected: React.Dispatch<boolean>
}
const HeroSection = ({ connected, setConnected }: Props) => {
  const [date, setDate] = useState<Date>();
  const isMobile = useMediaQuery({
    query: "(max-width: 370px)",
  });
  const [connecting, setConnecting] = useState(false)
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
          DISCOVER EVENTS
          <br />& EXPERIENCES
        </h1>
        <p className="mx-auto max-w-2xl text-base text-gray-300 lg:text-lg">
          Join a vibrant community where you can explore global happenings and
          share memorable moments with friends and family.
        </p>
      </div>
      {connected ? <>

        <div className="rounded-lg bg-black/40 p-4 backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Event name "
                className="border-white/10 bg-white/10 pl-10 text-white md:w-48"
              />
            </div>

            <Select>
              <SelectTrigger className="border-white/10 bg-white/10 text-white">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <SelectValue placeholder="Event location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ny">New York</SelectItem>
                <SelectItem value="la">Los Angeles</SelectItem>
                <SelectItem value="ch">Chicago</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start border-white/10 bg-white/10 text-left font-normal text-white"
                >
                  <CalendarIcon className="mr-2 h-5 w-5 text-gray-400" />
                  {date ? date.toLocaleDateString() : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

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

            <Button className="bg-orange-500 px-8 hover:bg-orange-600">
              <SearchIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="mt-2 flex justify-end text-sm">
            <button className="text-orange-500 hover:text-orange-400">
              clear search
            </button>
          </div>
        </div>

        <p className="text-gray-400">
          Please select at least one field or leave them empty to see all events.
        </p>
      </>
        :
        <Button className="bg-accent text-white hover:bg-accent-hover rounded-full" disabled={connecting} size={"lg"} onClick={async () => {
          setConnecting(true)
          const { err } = await connectWallet();
          if (!err) {
            setConnected(true)
            toast.success("Connected wallet succesfully")
          } else {
            toast.error(err)
            setConnected(false)
          }
          setConnecting(false)
        }}>
          {connecting ? <Loader2 className="animate-spin" /> : "Connect Wallet To Begin"}
        </Button>
      }
    </main>
  );
};

export default HeroSection;
