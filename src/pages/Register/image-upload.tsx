import { useState } from "react"
import { ImagePlus, X } from "lucide-react"
import axios from "axios"

interface ImageUploadProps {
  label: string
  isBanner?: boolean
  onChange: (files: File[]) => void
}

export function ImageUpload({ label, isBanner = false, onChange }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // If it's a banner, only use the last selected image
    const relevantFiles = isBanner ? [files[files.length - 1]] : files

    // Create preview URLs
    const newPreviews = relevantFiles.map((file) => URL.createObjectURL(file))

    // If it's a banner, replace existing preview
    setPreviews((prev) => (isBanner ? newPreviews : [...prev, ...newPreviews]))
    onChange(relevantFiles)
  }

  const removeImage = async (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index))
    const filteredPreviews = previews.filter((_, i) => i !== index)
    const files = await Promise.all(
      filteredPreviews.map(async (url) => {
        const response = await axios.get(url, { responseType: 'blob' })
        return new File([response.data], "image.jpg", { type: "image/jpeg" })
      })
    )
    onChange(files)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
        <label className="cursor-pointer rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
          Upload
          <input type="file" accept="image/*" multiple={!isBanner} className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {previews.length > 0 && (
        <div className={`grid gap-4 ${isBanner ? "" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"}`}>
          {previews.map((preview, index) => (
            <div key={preview} className={`group relative ${isBanner ? "w-full" : "aspect-square"}`}>
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className={`w-full rounded-lg  object-contain ${isBanner ? "h-auto max-h-[450px]" : "h-full"}`}
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {previews.length === 0 && (
        <div
          className={`flex items-center justify-center h-[200px]  ${isBanner
            ? "w-full rounded-lg bg-gray-100 dark:bg-gray-800"
            : "aspect-square w-full rounded-lg bg-gray-100 dark:bg-gray-800"
            }`}
        >
          <ImagePlus className="h-8 w-8 text-gray-400" />
        </div>
      )}
    </div>
  )
}