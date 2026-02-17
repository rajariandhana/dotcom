import { Button, Chip, Image } from "@heroui/react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export default function HistoryDetail({ history }) {
  return (
    <section className="flex flex-col">
      <div className="flex gap-x-1 -mt-4 mb-4">
        {history.techs.map((tech) => (
          <Chip key={tech} variant="flat" color="primary">
            {tech}
          </Chip>
        ))}
      </div>
      <div className="relative mb-4">
        <Button
          className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 ml-4"
          isIconOnly
          radius="full"
          color="primary"
          variant="flat"
        >
          <FaAngleLeft />
        </Button>

        <Button
          className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 mr-4"
          isIconOnly
          radius="full"
          color="primary"
          variant="flat"
        >
          <FaAngleRight />
        </Button>

        <Swiper
          // pagination={{ type: "fraction" }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Pagination, Navigation]}
          className="w-full"
          spaceBetween={20}
          loop
        >
          {history.links.map((link, index) => (
            <SwiperSlide key={index}>
              <Image
                src={link}
                alt={link}
                className="w-full h-auto object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <p className="text-justify mb-4">
        {history.text === ""
          ? "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, laborum. Consectetur, veritatis. Repellat itaque facilis modi iste quaerat necessitatibus veritatis."
          : history.text}
      </p>
    </section>
  );
}
