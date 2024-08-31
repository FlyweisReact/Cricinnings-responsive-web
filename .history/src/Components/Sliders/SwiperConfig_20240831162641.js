/** @format */

import { Autoplay } from "swiper/modules";

export const abroadCollegeConfig = {
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
};
