/** @format */

import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";

const Slider = ({
  data,
  swiperConfig,
  RenderSlide,
  ExtraComponent,
  onClickEvent,
}) => {
  return (
    <section className="generic-slider">
      <Swiper {...swiperConfig}>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <RenderSlide {...item} onClickEvent={onClickEvent} />
          </SwiperSlide>
        ))}
        {ExtraComponent && <ExtraComponent />}
      </Swiper>
    </section>
  );
};

const abroadCollegeConfig = {
    spaceBetween: 20,
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 4000,
    resistance: false,
    resistanceRatio: 0,
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      900: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
    modules: [Autoplay],
  };
