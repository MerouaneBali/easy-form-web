import { Swiper, SwiperSlide } from "swiper/react";
import Results from "./Results";

import "swiper/css";

function Carousel({ steps, project, setSwiper }) {
  return (
    <div id="carousel__container">
      <Swiper
        id="carousel"
        initialSlide={0}
        spaceBetween={0}
        slidesPerView={1}
        allowTouchMove={false}
        onSwiper={setSwiper} // Setting the swiper instance (instead of using useRef hook)
      >
        {/* Rendering the steps views */}
        {steps.map(({ View }, index) => (
          <SwiperSlide key={index} className="carousel__wrapper">
            <View />
          </SwiperSlide>
        ))}
        {/* Rendering last step alone so it won't be included in the steps timeline  */}
        <SwiperSlide className="carousel__wrapper">
          <Results project={project} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Carousel;
