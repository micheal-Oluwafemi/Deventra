import { useState } from "react"
import { GripVertical, Plus, X } from "lucide-react"

interface EventOrderProps {
  onChange: (items: string[]) => void
}

export function EventOrder({ onChange }: EventOrderProps) {
  const [items, setItems] = useState<string[]>([])
  const [newItem, setNewItem] = useState("")

  const addItem = () => {
    if (newItem.trim()) {
      const updatedItems = [...items, newItem.trim()]
      setItems(updatedItems)
      onChange(updatedItems)
      setNewItem("")
    }
  }

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index)
    setItems(updatedItems)
    onChange(updatedItems)
  }

  const moveItem = (fromIndex: number, toIndex: number) => {
    const updatedItems = [...items]
    const [removed] = updatedItems.splice(fromIndex, 1)
    updatedItems.splice(toIndex, 0, removed)
    setItems(updatedItems)
    onChange(updatedItems)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add event item"
          className="flex-1 rounded-md border border-gray-200 bg-transparent px-3 py-2 dark:border-gray-700 dark:text-white"
        />
        <button
          onClick={addItem}
          className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", index.toString())}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              const fromIndex = Number.parseInt(e.dataTransfer.getData("text/plain"))
              moveItem(fromIndex, index)
            }}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800"
          >
            <GripVertical className="h-4 w-4 cursor-move text-gray-400" />
            <span className="flex-1 text-sm dark:text-white">{item}</span>
            <button
              onClick={() => removeItem(index)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

