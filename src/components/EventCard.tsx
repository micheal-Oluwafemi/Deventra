import type { Event } from "../types/event";

export function EventCard({ event }: { event: Event }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-gray-800">
      <div className="relative h-48">
        <img
          src={event.img_sm || "/placeholder.svg"}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-4 left-4 rounded-full bg-orange-600 px-3 py-1 text-sm font-medium text-white">
          {event.type}
        </span>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-orange-500">
          <span>{event.date}</span>
          <span>•</span>
          <span>{event.hour}</span>
        </div>
        <h3 className="mb-3 line-clamp-1 text-lg font-semibold text-white">
          {event.title}
        </h3>
        <p className="flex items-center gap-2 text-sm text-gray-400">
          📍 {event.location}
        </p>
      </div>
    </div>
  );
}
