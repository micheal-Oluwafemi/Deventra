/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader, Sparkles } from "lucide-react"

interface OnboardingModalProps {
  isOpen: boolean
  onSubmit: (data: { name: string; email: string; phone: string }) => void,
  loading: boolean
}

export default function OnboardingModal({ isOpen, loading, onSubmit }: OnboardingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
      isValid = false
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Dialog open={isOpen} >
      <DialogContent className="sm:max-w-[425px] dark:bg-secondary text-black dark:text-white">
        <DialogHeader className="space-y-4" >
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e14817]/10">
              <Sparkles className="w-8 h-8 text-[#e14817]" />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-[#e14817] to-[#ff6b3d] bg-clip-text text-accent">
              Welcome to Deventra
            </DialogTitle>
            <p className="text-center text-muted-foreground">
              Join the next generation of decentralized events. Complete your profile to get started.
            </p>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4 ">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-accent">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-accent">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-accent">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
          </div>
          <Button type="submit" className="w-full bg-[#e14817] hover:bg-[#c13d14] text-white font-medium" disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Complete Profile"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

