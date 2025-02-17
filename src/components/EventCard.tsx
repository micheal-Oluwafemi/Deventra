import type { Event } from "../types/event";

export function EventCard({ event }: { event: Event }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-gray-800">
      <div className="relative h-48">
        <img
          src={event.data.banner || "/placeholder.svg"}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-orange-600 px-3 py-1 text-sm font-medium text-white first-letter:uppercase">
          {event.data.type}
        </span>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-orange-500">
          <span>{event.title}</span>
          <span>•</span>
          <span>{event.data.startDate}</span>
        </div>
        <h3 className="mb-3 line-clamp-1 text-lg font-semibold text-white">
          {event.title}
        </h3>
        <p className="flex items-center gap-2 text-sm text-gray-400">
          📍 {event.data.location}
        </p>
      </div>
    </div>
  );
}
