import React, { useEffect } from "react";
import Slider from "../../components/slider/slider.jsx";
import { Content } from "./style";
import { connect } from "react-redux";
import { getBannerList, getRecommendList } from "./store/actionCreators";
import RecommendList from "../../components/list/index.jsx";
import Loading from '../../baseUI/loading/index';

function Recommend(props) {
  // mock 数据
  // const bannerList = [1, 2, 3, 4].map((item) => {
  //   return {
  //     imageUrl:
  //       "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg",
  //   };
  // });
  // const recommendList = [1,2,3,4,5,6,7,8,9].map ((item,index) => {
  //   return {
  //     id: index,
  //     picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
  //     playCount: 17171122,
  //     name: "朴树、许巍、李健、郑钧、老狼、赵雷"
  //   }
  // });
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
  const bannerListJS = bannerList ? bannerList.toJS() : [] 
  const recommendListJS = recommendList ? recommendList.toJS() : [] 

  return (
    <Content>
      <div>
        <Slider bannerList={bannerListJS}></Slider>
        <RecommendList recommendList={recommendListJS}></RecommendList>
      </div>
      { enterLoading ? <Loading></Loading> : ``}
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
