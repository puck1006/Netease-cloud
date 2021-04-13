<template>
  <div class="Educational-viewCheckStatus height100">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">{{
          $t("Educational.checkStatusrouter.viewCheckStatus")
        }}</span>
      </div>
      <div class="cr-head-right fs12">
        <span>{{ $t("Common.header.nav_name3") }}</span
        >> <span>{{ $t("Educational.checkStatusrouter.title") }}</span
        >>
        <span class="color-blue">{{
          $t("Educational.checkStatusrouter.viewCheckStatus")
        }}</span>
      </div>
    </div>
    <div class="content-box bg-white flex1 mt8">
      <div class="class-list pb12 flex-warp-line" v-if="swiperSlides.length > 0">
        <div class="title mAll16 tc">
          {{ swiperSlides.length == 0 ? "" : swiperSlides[0].class_cnname }}
        </div>
        <div class="swiper ml20 mr20" style="position: relative">
          <div class="title" fs14>
            {{ $t("Educational.circulateRegistrat.choose_class") }}
          </div>
          <div class="swiperDiv mt10">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <div
                  class="one-swiper cur-pointer"
                  :class="{ activeswiper: slide.active }"
                  @click="clickSwiper(slide, index)"
                >
                  <div class="status status0" v-if="slide.hour_ischecking == 0">
                    <span class="color-white fs12">{{ slide.hour_ischecking_name }}</span>
                  </div>
                  <div class="status status2" v-else-if="slide.hour_ischecking == 1">
                    <span class="color-white fs12">{{ slide.hour_ischecking_name }}</span>
                  </div>
                  <div class="status status1" v-else-if="slide.hour_ischecking == -1">
                    <span class="color-white fs12">{{ slide.hour_ischecking_name }}</span>
                  </div>
                  <div class="title" fs16>{{ slide.hour_name }}</div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <i class="el-icon-arrow-left"></i>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="flex-al Inquire-box mAll12">
        <div class="ipt-box" style="width: 270px">
          <el-input
            v-model="filter.keyword"
            @clear="search"
            @keyup.enter.native="search"
            clearable
            :placeholder="$t('Educational.circulateRegistrat.offlineRegist.find_ph')"
          ></el-input>
        </div>
        <el-button type="primary" size="small" class="search-btn fs14" @click="search">{{
          $t("Common.input_button")
        }}</el-button>
      </div>
      <div
        class="card mt10 mb10"
        ref="auto_height_table"
        :style="{ height: tableList.options.tableHeight + 'px' }"
      >
        <div
          class="onecard"
          v-for="(card, index) in tableList.list"
          :key="index"
          @click="handSee(card)"
        >
          <!-- <img src="@/assets/images/default-new-men.png" alt /> -->
          <img v-if="card.student_img" :src="card.student_img" />
          <img
            v-else-if="card.student_img || card.student_sex == '男'"
            src="@/assets/images/default-img-man.png"
          />
          <img
            v-else-if="card.student_img || card.student_sex == '女'"
            src="@/assets/images/default-img-women.png"
          />
          <div class="content">
            <div class="flex-al">
              <div class="title color-243 fs16 ml8">
                {{ card.student_cnname }}
              </div>
              <img
                v-if="card.student_sex == '女'"
                src="../../../assets/images/icon/icon-person-women.png"
                style="width: 14px; height: 14px"
                class="ml8"
              />
              <img
                v-else
                src="../../../assets/images/icon/icon-person-men.png"
                style="width: 14px; height: 14px"
                class="ml8"
              />
            </div>
            <div class="color-4C5 mAll8 fs14">学号：{{ card.student_branch }}</div>
            <div class="color-4C5 mAll8 fs14">出生日期：{{ card.student_birthday }}</div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        style="margin: 10px"
        :current-page.sync="paging.curPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.pageTotal"
        @current-change="curPageChange"
        @size-change="pageSizeChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import eduHttp from "../Educational.js";

export default {
  name: "Educational-viewCheckStatus",
  data() {
    return {
      hourId: "",
      //筛选
      filter: {
        keyword: "", //关键词
      },
      tableList: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],
        options: {
          tableHeight: 0, //表格高度
        },
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0,
      },
      swiperOption: {
        navigation: {
          nextEl: ".el-icon-arrow-right",
          prevEl: ".el-icon-arrow-left",
        },
        initialSlide: 0,
        slidesPerGroup: 6,
        slidesPerView: 6,
      },
      swiperSlides: [],
    };
  },
  components: { swiper, swiperSlide },
  created() {
    this.getClassHourList();
    this.getStudyStudentListApi();
  },
  methods: {
    // 获取小时列表
    getClassHourList() {
      eduHttp
        .getClassHourList({
          class_id: this.$route.query.class_id,
        })
        .then((res) => {
          this.swiperSlides = res.data.result.list;
          // this.swiperSlides.find((v, index) => {
          //   this.swiperOption.initialSlide = index;
          //   return v.hour_ischecking == 0;
          // });

          if (this.swiperSlides.length > 0) {
            this.clickSwiper(this.swiperSlides[0], 0);
          }
        });
    },
    clickSwiper(slide, index) {
      this.swiperSlides.forEach((v) => {
        v.active = false;
      });
      console.log(slide, index);
      slide.active = true;
      this.hourId = slide.hour_id;
      this.getStudyStudentListApi();
    },
    // 获取列表
    getStudyStudentListApi() {
      eduHttp
        .getStudyStudentListApi({
          keyword: this.filter.keyword,
          class_id: this.$route.query.class_id,
          hour_id: this.hourId,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          if (res.data.error == "0") {
            this.tableList.list = res.data.result.list; //表格数据
          } else {
            this.tableList.list = [];
            this.tableList.options.errortip = res.data.errortip;
          }
        });
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.getStudyStudentListApi();
    },
    //点击卡片
    handSee(v) {
      console.log(v.student_id);
      this.$router.push({
        path: `/Educational/viewCheckDetails?hour_id=${this.hourId}&class_id=${this.$route.query.class_id}&student_id=${v.student_id}`,
      });
    },

    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.getStudyStudentListApi();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getStudyStudentListApi();
    },
    // pageSize改变
    pageSizeChange(v) {
      this.paging.curPage = 1;
      this.paging.pageSize = v;
      this.getStudyStudentListApi();
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 150
        );
      }
    });
  },
};
</script>
<style lang="less">
.Educational-viewCheckStatus {
  .card {
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    height: 600px;
    .onecard {
      display: flex;
      padding-top: 32px;
      justify-content: center;
      margin: 8px;
      cursor: pointer;
      width: calc(20% - 16px);
      height: 152px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px 0px rgba(27, 30, 73, 0.15);
      border-radius: 4px;
      img {
        margin-right: 10px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
  }
  .el-icon-arrow-left {
    z-index: 3;
    cursor: pointer;
    position: absolute;
    top: 50px;
    left: -10px;
  }
  .el-icon-arrow-right {
    z-index: 3;
    cursor: pointer;
    position: absolute;
    top: 50px;
    right: -10px;
  }
  .class-list {
    .swiperDiv {
      .one-swiper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
        margin: 0 12px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(223, 225, 236, 1);
        .status {
          padding: 0 8px;
          width: 60px;
          height: 20px;
          position: absolute;
          top: 0;
          left: 12px;
          border-radius: 0px 0px 25px 0px;
        }
        .status0 {
          background: rgba(255, 53, 105, 1);
        }
        .status1 {
          background: rgba(255, 158, 2, 1);
        }
        .status2 {
          background: rgba(138, 150, 188, 1);
        }
      }
      .activeswiper {
        background-color: #00a6ff;
        color: #ffffff;
      }
    }
  }
}
</style>
