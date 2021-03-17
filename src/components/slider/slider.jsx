import React, { useEffect, useState } from "react";
import { SliderContainer } from "./style";
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";

export default React.memo(function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null);
  const { bannerList } = props;

  useEffect(() => {
    if (bannerList.length > 0 && !sliderSwiper) {
      let tempSlider = new Swiper(".slider-container", {
        loop: true,
        autoplay: true,
        autoplayDisableOnInteraction: false,
        pagination: { el: ".swiper-pagination" },
      });
      setSliderSwiper(tempSlider);
    }
  }, [bannerList, sliderSwiper]);

  return (
    <div>
      <SliderContainer>
        <div className="before"></div>
        <div className="slider-container">
          <div className="swiper-wrapper">
            {bannerList.map((slider, index) => {
              return (
                <div className="swiper-slide" key={index}>
                  <div className="slider-nav">
                    <img
                      src={slider.imageUrl}
                      width="100%"
                      height="100%"
                      alt="推荐"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </SliderContainer>
    </div>
  );
});
