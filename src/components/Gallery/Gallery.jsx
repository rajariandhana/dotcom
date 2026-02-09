import { Button, Card, CardHeader, Image, Spinner } from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import supabase from "../../libs/supabase/supabase";

import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

import { slugToTitle } from "../../utils/util";

export default function Gallery() {
  const [albums, setAlbums] = useState([]);

  async function getPhotos() {
    const { data: folders, error } = await supabase.storage
      .from("albums")
      .list();

    if (error) {
      console.error(error);
      return;
    }

    const albumsData = await Promise.all(
      folders.map(async (folder) => {
        const { data: files, error } = await supabase.storage
          .from("albums")
          .list(folder.name);

        if (error) {
          console.error(error);
          return null;
        }

        const links = files.map((file) => {
          const { data } = supabase.storage
            .from("albums")
            .getPublicUrl(`${folder.name}/${file.name}`);

          return data.publicUrl;
        });

        return {
          key: folder.name,
          label: slugToTitle(folder.name),
          number_images: links.length,
          links,
        };
      }),
    );

    const result = albumsData.filter(Boolean);
    console.log(result);
    setAlbums(result);
  }

  useEffect(() => {
    getPhotos();
  }, []);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (albums.length === 0) return <Spinner />;

  return (
    <>
      <div className="w-full flex items-center gap-2">
        <Button
          ref={prevRef}
          radius="full"
          isIconOnly
          color="primary"
          variant="flat"
        >
          <FaAnglesLeft />
        </Button>
        <Swiper
          pagination={{ enabled: true, clickable: true }}
          modules={[Pagination, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={10}
          loop={true}
          className="mySwiper rounded-xl bg-white"
          onSwiper={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;

              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          // navigation={{
          //   prevEl: prevRef.current,
          //   nextEl: nextRef.current,
          // }}
        >
          {albums.map((a) => (
            <SwiperSlide key={a.key} className="rounded-xl">
              <Card className="">
                <CardHeader className="absolute z-10 top-1 flex-col items-start!">
                  <h4 className="text-white font-medium text-large">
                    {a.label}
                  </h4>
                </CardHeader>
                <Image
                  // removeWrapper
                  className="z-0 w-96 h-40 object-cover bg-black opacity-80"
                  src={a.links[0]}
                />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          ref={nextRef}
          radius="full"
          isIconOnly
          color="primary"
          variant="flat"
        >
          <FaAnglesRight />
        </Button>
      </div>
      <div className="flex flex-wrap bg-red-50 w-full">
        {albums.map((album) =>
          album.links.map((link) => (
            <Image className="size-20 object-cover" src={link} key={link} />
          )),
        )}
      </div>
    </>
  );
}
