/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export const CustomSlider = ({
  data,
  swiperConfig,
  RenderSlide,
  ExtraComponent,
  onClickEvent,
  className
}) => {
  return (
    <section className={`generic-slider ${className}`}>
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
