/* eslint-disable @next/next/no-img-element */
"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function Carousel({ images, className }: { images: string[], className?: string}) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={`mySwiper ${className ?? ''}`}
    >
      {images.map((imageId) => (
        <SwiperSlide key={imageId} className="flex items-center justify-center">
          <img 
            src={`/images/${imageId}.webp`}
            alt=""
            className="w-full h-full object-contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
