/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { connectWallet, getUserFromAddress, registerUser, signer } from "@/lib/contract";
import { Loader2, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dispatch } from "react"
import { useDispatch } from "react-redux"
import OnboardingModal from "@/components/OnboardingModal";
import { setUser } from "@/redux/userReducer";
import UserProfile from "@/components/UserProfile";
import { Link } from "react-router-dom";

type Props = {
  walletConnected: boolean,
  setWalletConnected: Dispatch<boolean>
}
const Navbar = ({ walletConnected, setWalletConnected }: Props) => {
  const [connecting, setConnecting] = useState(false)
  const [onboardingModalOpen, setOnboardingModalOpen] = useState(false)
  const [r, setR] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme')
    return (savedTheme === 'dark' || savedTheme === 'light') ? savedTheme : 'light'
  })
  const dispatch = useDispatch()

  async function InitData() {
    const connected = Boolean(signer);
    setWalletConnected(connected)
    if (connected) {
      //TODO: Fetch User data and display a username instead of the button
      const userResponse = await getUserFromAddress(await signer?.getAddress() as string)
      console.log({ userResponse })
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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="mx-auto flex max-w-5xl items-center justify-between border-b border-gray-600 px-3 py-2">
      <Link className="cursor-pointer font-youth text-2xl font-semibold text-accent transition-colors hover:text-accent-hover md:text-2xl" to={"/"}>
        Deventra
      </Link>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

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