import { useState } from "react"
import { Globe, Lock, MapPin } from "lucide-react"
import { ImageUpload } from "./image-upload"
import { EventOrder } from "./event-order"
import { PriceConverter } from "./price-converter"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { createHelia } from 'helia'
import { strings } from '@helia/strings'
import { parseEther } from "ethers"
import { Event } from "@/types/event"
import toBase64 from "@/lib/utils"
import { CID } from 'multiformats/cid'


export default function CreateEventForm() {
  const [isPublic, setIsPublic] = useState(true)
  const [requireApproval, setRequireApproval] = useState(false)
  const [bannerImage, setBannerImage] = useState<File[]>([])
  const [eventImages, setEventImages] = useState<File[]>([])
  const [entryFee, setEntryFee] = useState(0)
  const [eventOrder, setEventOrder] = useState<string[]>([])
  const [eventName, setEventName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endDate, setEndDate] = useState("")
  const [endTime, setEndTime] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [seats, setSeats] = useState("U" as number | "U")
  const [editingSeats, setEditingSeats] = useState(false)

  const handleSubmit = async () => {
    const eventData = {
      isPublic,
      requireApproval,
      price: parseEther(entryFee.toString()),
      eventOrder,
      eventName,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      description
    }

    const helia = await createHelia()
    const ipfs = strings(helia)
    const imageBase64 = await toBase64(bannerImage[0]);
    console.log(imageBase64)
    const bannerImageCid = (await ipfs.add(imageBase64)).toString()
    console.log(eventData)
    console.log({ bannerImage: bannerImageCid })
    const raw_cid = "bafkreicjmu22rad524iuzkqifzvluhnmcmqyciryrewchxl64xp2eckwbu";
    console.log(raw_cid)
    const cid = CID.parse(raw_cid)
    const data = await ipfs.get(cid)
    console.log(data)

  }

  return (
    <div className="">
      <div className="mx-auto max-w-4xl px-4 pt-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-700 dark:text-gray-200">Personal Calendar</span>
            </div>
            {isPublic ? <div className="flex gap-1">
              <Globe /> Public
            </div> : <div className="flex gap-1">
              <Lock /> Private
            </div>}
            <div className="flex items-center space-x-2">
              <Switch id="public" checked={isPublic} onClick={() => setIsPublic(!isPublic)} className="text-red-500" />
              <Label htmlFor="public">Publically accessible</Label>
            </div>
          </div>

          <ImageUpload label="Event Banner" isBanner onChange={(files) => setBannerImage(files)} />

          <div>
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full border-none bg-transparent text-4xl font-bold placeholder-gray-500 focus:outline-none focus:ring-0 dark:text-white dark:placeholder-gray-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Start</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="rounded-md border border-gray-200 bg-transparent px-3 py-2 text-gray-900 dark:border-gray-700 dark:text-white"
                />
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="rounded-md border border-gray-200 bg-transparent px-3 py-2 text-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">End</label>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="rounded-md border border-gray-200 bg-transparent px-3 py-2 text-gray-900 dark:border-gray-700 dark:text-white"
                />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="rounded-md border border-gray-200 bg-transparent px-3 py-2 text-gray-900 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Add Event Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border-none bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">Offline location or virtual link</p>
          </div>

          <div>
            <textarea
              placeholder="Add Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border-none bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 dark:text-white dark:placeholder-gray-400"
            ></textarea>
          </div>

          <ImageUpload label="Event Images" onChange={(files) => setEventImages((prev) => [...prev, ...files])} />

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Event Options</h3>

            <div className="space-y-4">
              <PriceConverter ethAmount={entryFee} onChange={setEntryFee} />

              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Require Approval</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Manually approve registrations</p>
                </div>
                <button
                  onClick={() => setRequireApproval(!requireApproval)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${requireApproval ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}
                >
                  <span
                    className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${requireApproval ? "translate-x-5" : ""}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Capacity</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {seats == "U" ? "Unlimted" : seats}
                  </p>
                </div>
                {editingSeats ? <div>
                  <Input className="max-w-28" value={seats} type="number" onChange={e => {
                    const value = Number(e.target.value)
                    setSeats(value > 0 ? value : "U")
                  }} />
                  <div className="text-xs">Leave blank or type zero for unlimited seats</div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" onClick={() => setEditingSeats(false)}>
                    Done
                  </button>
                </div> : <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" onClick={() => setEditingSeats(true)}>
                  Edit
                </button>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Event Order</h3>
            <EventOrder onChange={setEventOrder} />
          </div>

          <div className="pt-6">
            <button
              onClick={handleSubmit}
              className="w-full rounded-lg bg-black py-2 text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100">
              Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}