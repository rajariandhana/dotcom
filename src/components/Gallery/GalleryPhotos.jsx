import { Link, useParams } from "react-router";
import { slugToTitle } from "../../utils/util";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@heroui/react";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft } from "react-icons/fa6";
import { useAlbum } from "../../hooks/album";
import GallerySkeleton from "./GallerySkeleton";
import { RxCross2 } from "react-icons/rx";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useState } from "react";

export default function GalleryPhotos() {
  const { album_name } = useParams();

  const { data: album, isPending } = useAlbum(album_name);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [activeIndex, setActiveIndex] = useState(0);
  const openPhoto = (index) => {
    console.log("set to", index);
    setActiveIndex(index);
    onOpen();
  };

  return (
    <>
      <section>
        <Link
          to={`/gallery`}
          className="flex gap-2 items-center text-sm text-primary h-6 w-fit"
        >
          <FaAnglesLeft />
          <span>Back to Albums</span>
        </Link>
        <h2 className="mb-2 text-xl cursor-pointer">
          {slugToTitle(album_name)}
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {isPending ? (
            <GallerySkeleton length={4} />
          ) : (
            album.links.map((photo, index) => (
              <Image
                key={index}
                isZoomed={true}
                className="z-0 size-40 object-cover cursor-pointer"
                src={photo}
                alt={photo}
                onClick={() => openPhoto(index)}
              />
            ))
          )}
        </ul>
      </section>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        hideCloseButton
        classNames={{
          base: "h-screen max-h-screen m-0",
          wrapper: "p-0",
          backdrop: "bg-black/95",
        }}
      >
        <ModalContent className="h-screen">
          {(onClose) => (
            <ModalBody className="h-screen bg-black relative p-0">
              <Button
                onPress={onClose}
                className="absolute top-4 right-4 text-2xl z-50"
                variant="light"
                isIconOnly
                radius="full"
              >
                <RxCross2 />
              </Button>
              <Button
                className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-50"
                isIconOnly
                radius="full"
              >
                <FaAngleLeft />
              </Button>
              <Button
                className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-50"
                isIconOnly
                radius="full"
              >
                <FaAngleRight />
              </Button>

              <Swiper
                initialSlide={activeIndex}
                pagination={{ type: "fraction" }}
                navigation={{
                  nextEl: ".custom-next",
                  prevEl: ".custom-prev",
                }}
                modules={[Pagination, Navigation]}
                className="h-full w-full"
                loop
              >
                {album.links.map((photo, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex items-center justify-center h-full">
                      <Image
                        src={photo}
                        alt={photo}
                        className="max-h-[90vh] max-w-full object-contain p-2 rounded-4xl"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
