import { eventData } from "@/constants";
import { Category } from "@/types/event";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EventCard } from "@/components/EventCard";
import { Mousewheel, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

const OtherEvents = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("food");

  const filteredEvents = eventData.events.filter(
    (event) => activeCategory === "All" || event.type == activeCategory,
  );

  return (
    <div className="mx-auto my-20 max-w-6xl px-3 lg:my-32">
      <div className="flex flex-col items-center gap-2">
        <p className="font-youth text-xl font-medium text-accent lg:text-3xl">
          Other Users Events
        </p>

        <h2 className="font-youth text-4xl font-semibold text-white md:text-6xl">
          Popular Events
        </h2>
      </div>

      <div className="mt-2 lg:mt-6">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          mousewheel={true}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          keyboard={{
            enabled: true,
          }}
          modules={[Mousewheel, Keyboard, Pagination]}
          className="events-swiper w-full"
        >
          {filteredEvents.map((event) => (
            <SwiperSlide key={event.id} style={{ width: "280px" }}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OtherEvents;
