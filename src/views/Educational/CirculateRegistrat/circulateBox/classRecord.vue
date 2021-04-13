<template>
  <div class="Educational-classRecord">
    <div class="height100">
      <div class="class-list">
        <div class="title mAll16 tc">
          {{ swiperSlides.length == 0 ? "" : swiperSlides[0].class_cnname }}
        </div>
        <div class="swiper ml20 mr20" style="position: relative">
          <div class="title" fs14>
            {{ $t("Educational.circulateRegistrat.choose_class") }}
          </div>
          <div class="swiperDiv mt10">
            <swiper :options="swiperOption" ref="swiperTab">
              <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
                <div
                  class="one-swiper cur-pointer"
                  :class="{ activeswiper: slide.active }"
                  @click="clickSwiper(slide, index)"
                >
                  <div class="status status0" v-if="slide.hour_ischecking == 0">
                    <span class="color-white">
                      {{ slide.hour_ischecking_name }}
                    </span>
                  </div>
                  <div
                    class="status status2"
                    v-else-if="slide.hour_ischecking == 1"
                  >
                    <span class="color-white">
                      {{ slide.hour_ischecking_name }}
                    </span>
                  </div>
                  <div
                    class="status status1"
                    v-else-if="slide.hour_ischecking == -1"
                  >
                    <span class="color-white">
                      {{ slide.hour_ischecking_name }}
                    </span>
                  </div>
                  <div class="title" fs16>{{ slide.hour_name }}</div>
                  <div
                    class="endStatus"
                    v-if="slide.hour_ischecking == 1"
                    :class="{ success: slide.register == 1 }"
                  >
                    {{ slide.register == 1 ? "已登记" : "未登记" }}
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <i class="el-icon-arrow-left"></i>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="content-box bg-white flex1 mt8">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          class="ct-head-left"
        >
          <el-tab-pane
            :label="
              $t('Educational.circulateRegistrat.table_option.content[0]')
            "
            name="offlineRegist"
          >
            <div class="flex-al Inquire-box mb12 ml12 mr12">
              <div class="ipt-box" style="width: 270px">
                <el-input
                  v-model="filter1.keyword"
                  @clear="search1"
                  @keyup.enter.native="search1"
                  clearable
                  :placeholder="
                    $t('Educational.circulateRegistrat.offlineRegist.find_ph')
                  "
                ></el-input>
              </div>
              <el-button
                type="primary"
                size="small"
                class="search-btn fs14"
                @click="search1"
                >{{ $t("Common.input_button") }}</el-button
              >
              <div class="fs14 flex-toend">
                <el-button
                  v-if="batchButtonVisible && tempStatus.teachhour_isonline == 1"
                  type="primary"
                  size="small"
                  @click="totalAction(null, null, 1, 1)"
                  >{{ $t("Educational.circulateRegistrat.a3") }}</el-button
                >
                
              </div>
            </div>
            <div class="height100">
              <div class="tableDiv ml10 mr10" ref="auto_height_table">
                <offlineRegistTable
                  :tableData="tableList1"
                  @handleBlurInput="handleBlurInput1"
                  @handClickChange="handClickChange1"
                  @handSetting="handSetting"
                ></offlineRegistTable>
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
          </el-tab-pane>
          <el-tab-pane
            :label="
              $t('Educational.circulateRegistrat.table_option.content[1]')
            "
            name="onlineClass"
          >
            <div class="flex Inquire-box mb12 ml12 mr12">
              <div class="ipt-box" style="width: 270px">
                <el-input
                  v-model="filter2.keyword"
                  @clear="search2"
                  @keyup.enter.native="search2"
                  clearable
                  :placeholder="
                    $t('Educational.circulateRegistrat.offlineRegist.find_ph')
                  "
                ></el-input>
              </div>
              <el-button
                type="primary"
                size="small"
                class="search-btn fs14"
                @click="search2"
                >{{ $t("Common.input_button") }}</el-button
              >
              <div class="fs14 flex-toend">
                <el-button
                  type="primary"
                  size="small"
                  @click="totalAction(1, null, null, null)"
                  v-if="batchButtonVisible"
                  >{{ $t("Educational.circulateRegistrat.a1") }}</el-button
                >
              </div>
            </div>

            <div class="height100">
              <div class="tableDiv ml10 mr10" ref="auto_height_table">
                <onlineClassTable
                  :tableData="tableList2"
                  @handleBlurInput="handleBlurInput2"
                  @handClickChange="handClickChange2"
                  @handSetting="handSetting"
                  @handSelect="handSelect2"
                ></onlineClassTable>
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
          </el-tab-pane>
          <el-tab-pane
            :label="
              $t('Educational.circulateRegistrat.table_option.content[2]')
            "
            name="missclassRecord"
          >
            <div class="flex Inquire-box mb12 ml12 mr12">
              <div class="ipt-box" style="width: 270px">
                <el-input
                  v-model="filter3.keyword"
                  @clear="search3"
                  @keyup.enter.native="search3"
                  clearable
                  :placeholder="
                    $t('Educational.circulateRegistrat.offlineRegist.find_ph')
                  "
                ></el-input>
              </div>
              <el-button
                type="primary"
                size="small"
                class="search-btn fs14"
                @click="search3"
                >{{ $t("Common.input_button") }}</el-button
              >
              <div class="fs14 flex-toend">
                <el-button
                  type="primary"
                  size="small"
                  @click="totalAction(null, 0, null, null)"
                  v-if="batchButtonVisible"
                  >{{ $t("Educational.circulateRegistrat.a2") }}</el-button
                >
              </div>
            </div>
            <div class="height100">
              <div class="tableDiv ml10 mr10" ref="auto_height_table">
                <missclassRecordTable
                  :tableData="tableList3"
                  @handClickChange="handClickChange3"
                  @handSelect="handSelect3"
                  @handSetting="handSetting"
                ></missclassRecordTable>
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
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <popTips
      :dialogVisable="poptipsData.visible"
      :popTipsCont="poptipsData"
      @handConfirm="handleConfirm"
      @handCancel="poptipsData.visible = false"
      @handleCloseTip="poptipsData.visible = false"
    ></popTips>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import eduHttp from "../../Educational.js";
import offlineRegistTable from "@/components/tables/offlineRegistTable.vue";
import onlineClassTable from "@/components/tables/onlineClassTable.vue";
import missclassRecordTable from "@/components/tables/missclassRecordTable.vue";
import popTips from "@/components/common/popTips/popTips.vue";

export default {
  name: "Educational-classRecord",
  data() {
    return {
      poptipsData: {
        btn_text1: "确定",
        btn_text2: "",
        title: "提示",
        context: "您前面有已结束的课次未登记,请先去登记最早结束的课次",
        visible: false,
      },
      hourId: "",
      studentId: "",
      batchButtonVisible: false,
      activeName: "offlineRegist",
      swiperOption: {
        navigation: {
          nextEl: ".el-icon-arrow-right",
          prevEl: ".el-icon-arrow-left",
        },
        slidesPerView: 6,
        slidesPerGroup: 6,
        // initialSlide: 5
      },
      swiperSlides: [],
      //筛选
      filter1: {
        keyword: "", //关键词
      },
      filter2: {
        keyword: "", //关键词
      },
      filter3: {
        keyword: "", //关键词
      },
      hourRefresher: "",
      hourNetstatus: "",
      // 表格数据
      tableList1: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: true, //是否可以编辑列
          tableHeight: 600, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名                                                                                                                                                                                       当前页面的名称，通常与路由名称一致
        },
      },
      tableList2: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: true, //是否可以编辑列
          tableHeight: 600, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "classRecord-onlineclass", //当前页面的名称，通常与路由名称一致
        },
      },
      tableList3: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: true, //是否可以编辑列
          tableHeight: 600, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "classRecord-missclassRecord", //当前页面的名称，通常与路由名称一致
        },
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0,
      },
      currentData: "",
      tempSlide: "",
      tempStatus: "",
    };
  },
  components: {
    swiper,
    swiperSlide,
    offlineRegistTable,
    missclassRecordTable,
    onlineClassTable,
    popTips,
  },
  created() {
    if (this.$route.query.type == "onlineClass") {
      this.activeName = "onlineClass";
      this.getStudyStudentListSecond();
    } else if (this.$route.query.type == "missclassRecord") {
      this.activeName = "missclassRecord";
      this.getStudyStudentListThird();
    } else {
      this.activeName = "offlineRegist";
      this.getStudyStudentListFirst();
    }
    this.getClassHourList();
  },
  methods: {
    handleConfirm() {
      const swiperIndex = this.swiperSlides.findIndex(
        (item) => item.hour_id == this.currentData.hour_id
      );
      this.clickSwiper(this.swiperSlides[swiperIndex], swiperIndex);
      this.$refs.swiperTab.swiper.slideTo(parseInt(swiperIndex / 6) * 6);
      console.log(this.currentData, swiperIndex);
      this.poptipsData.visible = false;
    },
    // 获取小时列表
    getClassHourList() {
      eduHttp
        .getClassHourList({
          class_id: this.$route.query.class_id,
        })
        .then((res) => {
          this.swiperSlides = res.data.result.list;
          let swiperIndex = 0;

          if (this.$route.query.hour_id) {
            this.swiperSlides.forEach((v, index) => {
              if (v.hour_id == this.$route.query.hour_id) {
                swiperIndex = index;
              }
            });
          } else {
            swiperIndex = 0;

            // this.swiperSlides.forEach((v, index) => {
            //   if (v.hour_ischecking == 1) {
            //     swiperIndex = index;
            //   }
            // });
          }
          this.clickSwiper(this.swiperSlides[swiperIndex], swiperIndex, true);
          this.$refs.swiperTab.swiper.slideTo(parseInt(swiperIndex / 6) * 6);
        });
    },
    // 点击轮播
    clickSwiper(slide, index, flag) {
      this.tempSlide = slide;
      const endData = this.swiperSlides.filter(
        (item) => item.hour_ischecking == 1
      );
      const tempIndex = endData.findIndex(
        (item) => item.hour_id == slide.hour_id
      );
      const finalData = endData.filter((item, endDataIndex) => {
        if (endDataIndex > tempIndex && item.register == 0) {
          return true;
        }
      });
      console.log(finalData, "finalData", flag);
      console.log(slide, endData, tempIndex);
      if (slide.register == "0" && !flag && finalData.length > 0) {
        this.currentData = finalData[finalData.length - 1];
        this.poptipsData.visible = true;
        return false;
      }
      this.batchButtonVisible = slide.hour_ischecking !== "0";
      this.swiperSlides.forEach((v) => {
        v.active = false;
      });
      slide.active = true;
      this.hourId = slide.hour_id;
      if (this.activeName == "offlineRegist") {
        this.getStudyStudentListFirst();
      } else if (this.activeName == "onlineClass") {
        this.getStudyStudentListSecond();
      } else if (this.activeName == "missclassRecord") {
        this.getStudyStudentListThird();
      }
    },
    handleClick() {
      if (this.activeName == "offlineRegist") {
        this.getStudyStudentListFirst();
      } else if (this.activeName == "onlineClass") {
        this.getStudyStudentListSecond();
      } else if (this.activeName == "missclassRecord") {
        this.getStudyStudentListThird();
      }
    },
    // 一键已参与
    totalAction(s, f, c, h) {
      eduHttp
        .fillClassHourNetstatusAction({
          class_id: this.$route.query.class_id,
          hour_id: this.hourId,
          hour_netstatus: s,
          hour_refresher: f,
          hour_bookcheck: c,
          hour_homework: h,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.tempSlide.register = "1";
            if (s != null) {
              this.getStudyStudentListSecond();
            } else if (f != null) {
              this.getStudyStudentListThird();
            } else {
              this.getStudyStudentListFirst();
            }
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 获取线下登记列表
    getStudyStudentListFirst() {
      eduHttp
        .getStudyStudentListApi({
          keyword: this.filter1.keyword,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
          is_catitrack: "1",
          is_classtype: "0",
          class_id: this.$route.query.class_id,
          hour_id: this.hourId,
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          this.tempStatus = res.data.status;
          let obj = this.$Tool.getStorage(
            "module" + [this.tableList1.options.moduleName]
          );
          if (obj) {
            if (obj["show_" + [this.tableList1.options.ColumnName]]) {
              this.tableList1.columns =
                obj["show_" + [this.tableList1.options.ColumnName]];
            } else {
              this.tableList1.columns = res.data.result.field;
            }
          } else {
            this.tableList1.columns = res.data.result.field;
          }
          if (res.data.error == "0") {
            this.tableList1.list = res.data.result.list; //表格数据
          } else {
            this.tableList1.list = [];
            this.tableList1.options.errortip = res.data.errortip;
          }
        });
    },
    // 获取网课参与登记列表
    getStudyStudentListSecond() {
      eduHttp
        .getStudyStudentListApi({
          keyword: this.filter2.keyword,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
          is_catitrack: "1",
          is_classtype: "1",
          class_id: this.$route.query.class_id,
          hour_id: this.hourId,
          hour_netstatus: this.hourNetstatus,
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          this.tempStatus = res.data.status;
          let obj = this.$Tool.getStorage(
            "module" + [this.tableList2.options.moduleName]
          );
          if (obj) {
            if (obj["show_" + [this.tableList2.options.ColumnName]]) {
              this.tableList2.columns =
                obj["show_" + [this.tableList2.options.ColumnName]];
            } else {
              this.tableList2.columns = res.data.result.field;
            }
          } else {
            this.tableList2.columns = res.data.result.field;
          }
          if (res.data.error == "0") {
            this.tableList2.list = res.data.result.list; //表格数据
          } else {
            this.tableList2.list = [];
            this.tableList2.options.errortip = res.data.errortip;
          }
          this.tableList2.columns.map((v) => {
            if (v.fieldstring == "hour_netstatus_name") {
              this.$set(v, "showSelect", true);
            }
          });
          console.log(this.tableList2.columns);
        });
    },
    // 获取补课记录列表
    getStudyStudentListThird() {
      eduHttp
        .getStudyStudentListApi({
          keyword: this.filter3.keyword,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
          is_catitrack: "1",
          is_classtype: "2",
          class_id: this.$route.query.class_id,
          hour_id: this.hourId,
          hour_refresher: this.hourRefresher,
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          this.tempStatus = res.data.status;
          let obj = this.$Tool.getStorage(
            "module" + [this.tableList3.options.moduleName]
          );
          if (obj) {
            if (obj["show_" + [this.tableList3.options.ColumnName]]) {
              this.tableList3.columns =
                obj["show_" + [this.tableList3.options.ColumnName]];
            } else {
              this.tableList3.columns = res.data.result.field;
            }
          } else {
            this.tableList3.columns = res.data.result.field;
          }
          if (res.data.error == "0") {
            this.tableList3.list = res.data.result.list; //表格数据
          } else {
            this.tableList3.list = [];
            this.tableList3.options.errortip = res.data.errortip;
          }
          this.tableList3.columns.map((v) => {
            if (v.fieldstring == "hour_refresher_name") {
              this.$set(v, "showSelect", true);
            }
          });
        });
    },
    // 检索
    search1() {
      this.paging.curPage = 1;
      this.getStudyStudentListFirst();
    },
    search2() {
      this.paging.curPage = 1;
      this.getStudyStudentListSecond();
    },
    search3() {
      this.paging.curPage = 1;
      this.getStudyStudentListThird();
    },
    // 线下登记表格提交
    fillStuWorkScoreFirst(
      testscore,
      homeworkscores,
      bookcheck,
      hourhomework,
      score
    ) {
      eduHttp
        .fillStuWorkScoreAction({
          student_id: this.studentId,
          hour_id: this.hourId,
          class_id: this.$route.query.class_id,
          hour_testscore: testscore,
          hour_homeworkscores: homeworkscores,
          hour_bookcheck: bookcheck,
          hour_homework: hourhomework,
          hour_resitscore: score,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.getStudyStudentListFirst();
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 网课表格提交
    fillStuWorkScoreSecond(netstatus, netscores) {
      eduHttp
        .fillStuWorkScoreAction({
          student_id: this.studentId,
          hour_id: this.hourId,
          class_id: this.$route.query.class_id,
          hour_netstatus: netstatus,
          hour_netscores: netscores,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.getStudyStudentListSecond();
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 补课表格提交
    fillStuWorkScoreThird(refresher) {
      eduHttp
        .fillStuWorkScoreAction({
          student_id: this.studentId,
          hour_id: this.hourId,
          class_id: this.$route.query.class_id,
          hour_refresher: refresher,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.getStudyStudentListThird();
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 表格内容绑定事件
    handleBlurInput1(v) {
      console.log(v);
      this.studentId = v.student_id;
      this.fillStuWorkScoreFirst(
        v.hour_testscore,
        v.hour_homeworkscores,
        null,
        null,
        v.hour_resitscore
      );
    },
    handClickChange1(v, index, value, c) {
      console.log(v, index, value, c);
      let flag = this.tableList1.list.every(
        (item) => item.hour_bookcheck_name !== null
      );
      if (flag) {
        this.tempSlide.register = "1";
      }
      console.log(flag);
      this.studentId = v.student_id;
      if (c.isSelect) {
        this.fillStuWorkScoreFirst(null, null, value, null);
      } else if (c.isSelectHomework) {
        this.fillStuWorkScoreFirst(null, null, null, value);
      }
    },
    handClickChange2(v, index, value) {
      this.studentId = v.student_id;
      this.fillStuWorkScoreSecond(value, null);
      // console.log(v, index, value, c);
    },
    handleBlurInput2(v) {
      this.studentId = v.student_id;
      this.fillStuWorkScoreSecond(null, v.hour_netscores);
      // console.log(v, index, value);
    },
    handSelect2(val) {
      this.hourNetstatus = val;
      this.getStudyStudentListSecond();
    },
    handClickChange3(v, index, value) {
      this.studentId = v.student_id;
      this.fillStuWorkScoreThird(value);
      // console.log(v.hour_refresher);
    },
    handSelect3(val) {
      this.hourRefresher = val;
      this.getStudyStudentListThird();
    },

    // 编辑列编辑提交
    handSetting() {
      if (this.activeName == "offlineRegist") {
        this.getStudyStudentListFirst();
      } else if (this.activeName == "onlineClass") {
        this.getStudyStudentListSecond();
      } else if (this.activeName == "missclassRecord") {
        this.getStudyStudentListThird();
      }
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      if (this.activeName == "offlineRegist") {
        this.getStudyStudentListFirst();
      } else if (this.activeName == "onlineClass") {
        this.getStudyStudentListSecond();
      } else if (this.activeName == "missclassRecord") {
        this.getStudyStudentListThird();
      }
    },
    // pageSize改变
    pageSizeChange(v) {
      this.paging.curPage = 1;
      this.paging.pageSize = v;
      if (this.activeName == "offlineRegist") {
        this.getStudyStudentListFirst();
      } else if (this.activeName == "onlineClass") {
        this.getStudyStudentListSecond();
      } else if (this.activeName == "missclassRecord") {
        this.getStudyStudentListThird();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      // if (this.$refs["auto_height_table"]) {
      //   this.tableList1.options.tableHeight = this.$Tool.getTableHeight(
      //     this.$refs.auto_height_table.getBoundingClientRect().top + 150
      //   );
      //   this.tableList2.options.tableHeight = this.$Tool.getTableHeight(
      //     this.$refs.auto_height_table.getBoundingClientRect().top + 150
      //   );
      //   this.tableList3.options.tableHeight = this.$Tool.getTableHeight(
      //     this.$refs.auto_height_table.getBoundingClientRect().top + 150
      //   );
      // }
    });
  },
};
</script>
<style lang="less">
.Educational-classRecord {
  .class-list {
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
        .endStatus {
          position: absolute;
          top: 5px;
          right: 22px;
          font-size: 12px;
          color: #f52e2e;
        }
        .endStatus.success {
          color: #d79f64;
        }

        .status {
          font-size: 12px;
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
  .el-tabs__nav-scroll {
    padding: 0 20px;
    .el-tabs__nav {
      .el-tabs__active-bar {
        height: 4px;
        width: 80px !important;
        left: -10px;
        border-radius: 3px;
      }
      .el-tabs__item {
        margin: 10px 0px;
      }
    }
  }
}
</style>
