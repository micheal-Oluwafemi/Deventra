import { Button } from "@/components/ui/button";
import { browserProvider, connectWallet, signer } from "@/lib/contract";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dispatch } from "react"

type Props = {
  walletConnected: boolean,
  setWalletConnected: Dispatch<boolean>
}
const Navbar = ({ walletConnected, setWalletConnected }: Props) => {
  const [connecting, setConnecting] = useState(false)
  useEffect(() => {
    const connected = Boolean(signer);
    setWalletConnected(connected)
    if (connected) {
      //TODO: Fetch User data and display a username instead of the button
    }
  }, [signer])
  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between border-b border-gray-600 px-3 py-2">
      <div className="cursor-pointer font-youth text-2xl font-semibold text-accent transition-colors hover:text-accent-hover md:text-2xl">
        Deventra
      </div>

      <div className="flex items-center gap-4">
        {walletConnected || <Button className="bg-accent text-white hover:bg-accent-hover" disabled={connecting} onClick={async () => {
          setConnecting(true)
          const { err } = await connectWallet();
          if (!err) {
            setWalletConnected(true)
            toast.success("Connected wallet succesfully")
          } else {
            toast.error(err)
            setWalletConnected(false)
          }
          setConnecting(false)
        }}>
          {connecting ? <Loader2 className="animate-spin" /> : "Connect your wallet"}
        </Button>}

        <div className="hidden">
          <img src="/src/assets/header/avatar.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
