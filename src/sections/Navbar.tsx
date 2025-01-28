/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { connectWallet, getUserFromAddress, registerUser, signer } from "@/lib/contract";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dispatch } from "react"
import { useDispatch } from "react-redux"
import OnboardingModal from "@/components/OnboardingModal";
import { setUser } from "@/redux/userReducer";
import UserProfile from "@/components/UserProfile";

type Props = {
  walletConnected: boolean,
  setWalletConnected: Dispatch<boolean>
}
const Navbar = ({ walletConnected, setWalletConnected }: Props) => {
  const [connecting, setConnecting] = useState(false)
  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false)
  const [r, setR] = useState(false)
  const [registering, setRegistering] = useState(false)
  const dispatch = useDispatch()

  async function InitData() {
    const connected = Boolean(signer);
    setWalletConnected(connected)
    if (connected) {
      //TODO: Fetch User data and display a username instead of the button
      const userResponse = await getUserFromAddress(await signer?.getAddress() as string)
      if (userResponse.err) {
        toast.error(userResponse.err)
      } else {
        const user = userResponse.data
        if (!user) {
          setOnboardingModalOpen(true)
        } else {
          console.log({ user })
          dispatch(setUser(user))
        }
      }
    }
  }

  async function handleSubmit(formData: { email: string, phone: string, name: string }) {
    setRegistering(true)
    const { err } = await registerUser(formData.name, formData.email, formData.phone)
    if (!err) {
      toast.success("User registered successfully")
      setOnboardingModalOpen(false)
      InitData()
      setR(!r)
    } else {
      toast.error(err)
    }
    setRegistering(false)
  }

  useEffect(() => {
    InitData()
  }, [signer, r])


  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between border-b border-gray-600 px-3 py-2">
      <div className="cursor-pointer font-youth text-2xl font-semibold text-accent transition-colors hover:text-accent-hover md:text-2xl">
        Deventra
      </div>

      <div className="flex items-center gap-4">
        {walletConnected ?
          <UserProfile /> :
          <Button className="bg-accent text-white hover:bg-accent-hover" disabled={connecting} onClick={async () => {
            setConnecting(true)
            const { err } = await connectWallet();
            if (!err) {
              setWalletConnected(true)
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

      <OnboardingModal isOpen={onboardingModalOpen} loading={registering} onSubmit={handleSubmit} />
    </div>
  );
};

export default Navbar;
