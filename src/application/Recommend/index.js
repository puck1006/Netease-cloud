import React from "react";
import Slider from "../../components/slider/slider.jsx";
import { Content } from "./style";

function Recommend() {
  const bannerList = [1, 2, 3, 4].map((item) => {
    return {
      imageUrl:
        "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg",
    };
  });

  return (
    <Content>
      <div>
        <Slider bannerList={bannerList}></Slider>
      </div>
    </Content>
  );
}

export default React.memo(Recommend);
