/** @format */

export const TestMatchConfig  = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 4,
  nextArrow: <CustomNextArrow1 />,
  prevArrow: currentSlide === 0 ? null : <CustomPrevArrow />,
  beforeChange: (oldIndex, newIndex) => {
    setCurrentSlide(newIndex);
  },
};
