import { useState } from 'react'
import CreateEventForm from './Register/create-event-form'
import Navbar from '@/sections/Navbar'

function RegisterEvent() {
  const [connected, setConnected] = useState(false)
  return (
    <div className='min-h-screen bg-white dark:bg-[#1b1a25] text-black/80 dark:text-white'>
      <Navbar setWalletConnected={setConnected} walletConnected={connected} />
      <div className='relative'>
        <CreateEventForm />
        {connected || <div className="absolute w-full h-full backdrop-blur-md top-0 left-0 text-center pt-[10vh]">
          <h2 className="text-3xl font-bold">Connect Your Wallet to continue</h2>
        </div>}
      </div>
    </div>
  )
}

export default RegisterEvent