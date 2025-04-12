import { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import { Calendar, Clock, MapPin, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getEvents } from "@/lib/contract"
import { Report } from "notiflix"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Event } from "@/types/event"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ethers } from 'ethers'

export default function EventViewPage() {
  const [eventData, setEventData] = useState<Event | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  async function fetchEvent() {
    const { data: response, err } = await getEvents()
    if (!err && response) {
      const _data = response.find(r => r.id == Number(id));
      if (_data) {
        setEventData(_data)
      }
    } else {
      Report.failure("Error", err, "Noted")
      navigate("/")
    }
  }

  async function handleRegister() {
    Report.warning("Will Soon be imlemented", "This feature will be implemented soon", "Ok")
  }

  useEffect(() => {
    fetchEvent()
  }, [])

  if (eventData) {
    // Format dates for display
    const formattedStartDate = eventData.data.startDate ? format(parseISO(eventData.data.startDate), "MMMM d, yyyy") : ''
    const formattedEndDate = eventData.data.endDate ? format(parseISO(eventData.data.endDate), "MMMM d, yyyy") : ''

    // Format times for display
    const formatTime = (timeString: string | null) => {
      if (!timeString) return ''
      const [hours, minutes] = timeString.split(":")
      return new Date(0, 0, 0, Number.parseInt(hours), Number.parseInt(minutes)).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    }

    const formattedStartTime = formatTime(eventData.data.startTime)
    const formattedEndTime = formatTime(eventData.data.endTime)

    // Convert price from Gwei to ETH using ethers
    const priceInEth = eventData.data.price

    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back button */}
        <Link className="mb-10" to={"/"}>
          <Button variant="ghost" className="flex items-center gap-1 text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            Back to Events
          </Button>
        </Link>

        {/* Banner Image */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
          <img src={eventData.data.banner || "/placeholder.svg"} alt={eventData.title} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 w-full">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{eventData.title}</h1>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#e14817] hover:bg-[#c13d14]">
                  {eventData.data.public ? "Public Event" : "Private Event"}
                </Badge>
                {eventData.data.requireApproval && (
                  <Badge variant="outline" className="text-white border-white">
                    Approval Required
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                <p className="text-muted-foreground">{eventData.data.description}</p>
              </CardContent>
            </Card>

            {/* Image Gallery */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Event Gallery</h2>
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  {eventData.data.images && eventData.data.images.length > 0 ? (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      navigation
                      pagination={{ clickable: true }}
                      className="h-full w-full"
                    >
                      {eventData.data.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Event image ${index + 1}`}
                            className="object-contain w-full h-full"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground">No images available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Event Agenda */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Event Agenda</h2>
                {eventData.data.eventOrder && eventData.data.eventOrder.length > 0 ? (
                  <ol className="space-y-4">
                    {eventData.data.eventOrder.map((item, index) => (
                      <li key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e14817]/10 flex items-center justify-center text-[#e14817] font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium">{item}</h3>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-muted-foreground">No agenda items available</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Event Details</h2>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-[#e14817] mt-0.5" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-muted-foreground">
                        {formattedStartDate === formattedEndDate
                          ? formattedStartDate
                          : `${formattedStartDate} - ${formattedEndDate}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[#e14817] mt-0.5" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-muted-foreground">
                        {formattedStartTime} - {formattedEndTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#e14817] mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{eventData.data.location}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Button className="w-full bg-[#e14817] hover:bg-[#c13d14] text-white" onClick={handleRegister}>
                    {priceInEth === '0' ? "Register For Free" : `Register for ${priceInEth} ETH`}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Organizers Card */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Organizers</h2>
                {eventData.data.organizers && eventData.data.organizers.length > 0 ? (
                  <div className="space-y-4">
                    {eventData.data.organizers.map((organizer, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {/* Organizer details would go here */}
                        <p>Organizer information</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No organizer information available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }
  return null
}