import React, { useEffect } from "react";
import Slider from "../../components/slider/slider.jsx";
import { Content } from "./style";
import { connect } from "react-redux";
import { getBannerList, getRecommendList } from "./store/actionCreators";
import RecommendList from "../../components/list/index.jsx";
import Loading from "../../baseUI/loading/index";
import Scroll from "../../baseUI/scroll";
import {forceCheck} from 'react-lazyload';

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props;
  const { getRecommendListDataDispatch, getBannerDataDispatch } = props;
  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
  }, []);
  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  const pullDown = () => {
    console.log("pullDown");
  };
  const pullUp = () => {
    console.log("pullUp");
  };
  

  return (
    <Content>
      <Scroll pullDown={pullDown} pullUp={pullUp} onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading></Loading> : ``}
    </Content>
  );
}

const mapStateToProps = (state) => {
  return {
    bannerList: state.getIn(["recommend", "bannerList"]),
    recommendList: state.getIn(["recommend", "recommendList"]),
    enterLoading: state.getIn(["recommend", "enterLoading"]),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(getRecommendList());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
