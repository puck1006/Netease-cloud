<template>
  <div class="Educational-educationWork-communicate height100">
    <div class="content-box bg-white flex1 pl12 pr12">
      <div class="flex-wrap pt12">
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width:200px;">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="
                $t('Educational.JingleAssistant.educationWork.child3.aa')
              "
              @clear="search"
              @keyup.enter.native="search"
            ></el-input>
          </div>
          <el-button
            type="primary"
            size="mini"
            class="search-btn fs14"
            @click="search"
            >{{ $t("Common.input_button") }}</el-button
          >
        </div>
      </div>
      <div class="tableDiv" ref="auto_height_table">
        <normalTableCont :tableData="tableList" @handSetting="handSetting">
          <!-- 按钮操作组********start -->
          <el-table-column
            ref="fixedColumn"
            :label="$t('Common.table_operate')"
            align="center"
            width="150px"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="addCall(scope.row)"
                >{{
                  $t("Educational.JingleAssistant.educationWork.child3.ab")
                }}</el-button
              >
              <el-button
                type="text"
                size="small"
                @click.native.prevent="callRecord(scope.row)"
                >{{
                  $t("Educational.JingleAssistant.educationWork.child3.ac")
                }}</el-button
              >
            </template>
          </el-table-column>
          <!-- 按钮操作组********end -->
        </normalTableCont>
        <!-- 分页 -->
        <el-pagination
          style="margin: 10px;"
          :current-page.sync="paging.curPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="paging.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paging.pageTotal"
          @current-change="curPageChange"
          @size-change="pageSizeChange"
        ></el-pagination>
      </div>
      <!-- 电访弹窗 -->
      <el-drawer
        :title="
          userInfo.isAdd
            ? $t('Educational.JingleAssistant.educationWork.child3.ab')
            : $t('Educational.JingleAssistant.educationWork.child3.ac')
        "
        :visible.sync="userInfo.showVisable"
        direction="rtl"
        size="700px"
        :modal="false"
        custom-class="pop-slider--box SeeAdmission"
        :before-close="handleClose"
      >
        <div class="slider-btn">
          <el-button
            v-if="userInfo.isAdd"
            type="primary"
            size="mini"
            @click="onSubmit"
            >{{ $t("Common.input_submit") }}</el-button
          >
        </div>
        <div
          class="flex-al drawer_title pl20"
          style="background: #F2F4F7; justify-content: space-around;"
        >
          <img v-if="childInfo.student_img" :src="childInfo.student_img" />
          <img
            v-else-if="
              childInfo.student_img || childInfo.student_sex == $t('Common.man')
            "
            src="@/assets/images/default-new-men.png"
          />
          <img
            v-else-if="
              childInfo.student_img ||
                childInfo.student_sex == $t('Common.woman')
            "
            src="@/assets/images/default-img-women.png"
          />
          <div
            class="title pAll12 flex-coc flex1"
            style="align-items: flex-start; background: #F2F4F7;"
          >
            <div class="ml10 color-8A9 mb8">
              {{ $t("Educational.circulateRegistrat.callManagement.name") }}
            </div>
            <div class="ml8">{{ this.childInfo.student_cnname }}</div>
          </div>
          <div
            class="title pAll12 flex-coc flex1"
            style="align-items: flex-start; background: #F2F4F7;"
          >
            <div class="ml10 color-8A9 mb8">
              {{ $t("Educational.circulateRegistrat.callManagement.count") }}
            </div>
            <div class="ml8">{{ this.childInfo.catitrack_num }}</div>
          </div>
          <div
            class="title pAll12 flex-coc flex1"
            style="align-items: flex-start; background: #F2F4F7;"
          >
            <div class="ml10 color-8A9 mb8">
              {{ $t("Educational.circulateRegistrat.callManagement.time") }}
            </div>
            <div class="ml8">
              {{
                this.childInfo.catitrack_day
                  ? this.childInfo.catitrack_day
                  : "无"
              }}
            </div>
          </div>
        </div>

        <div class="slide-record pAll12">
          <div v-if="userInfo.isAdd">
            <el-form
              label-width="120px"
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              class="ml12"
            >
              <el-form-item
                :label="
                  $t(
                    'Educational.circulateRegistrat.callManagement.form.commun_type'
                  )
                "
                prop="commode_id"
              >
                <el-select
                  v-model="ruleForm.commode_id"
                  clearable
                  filterable
                  :placeholder="
                    $t(
                      'Educational.circulateRegistrat.callManagement.form.commun_type_ph'
                    )
                  "
                  style="width:320px;"
                >
                  <el-option
                    v-for="item in typeList"
                    :key="item.commode_id"
                    :label="item.commode_name"
                    :value="item.commode_id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :label="
                  $t(
                    'Educational.circulateRegistrat.callManagement.form.commun_name'
                  )
                "
                prop="catitrack_code"
              >
                <el-select
                  v-model="ruleForm.catitrack_code"
                  clearable
                  filterable
                  :placeholder="
                    $t(
                      'Educational.circulateRegistrat.callManagement.form.commun_name_ph'
                    )
                  "
                  style="width:320px;"
                >
                  <el-option
                    v-for="item in objectList"
                    :key="item.object_code"
                    :label="item.object_name"
                    :value="item.object_code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :label="
                  $t(
                    'Educational.circulateRegistrat.callManagement.form.commun_time'
                  )
                "
                prop="catitrack_day"
              >
                <el-date-picker
                  v-model="ruleForm.catitrack_day"
                  type="date"
                  value-format="yyyy-MM-dd"
                  clearable
                  :placeholder="
                    $t(
                      'Educational.circulateRegistrat.callManagement.form.commun_time_ph'
                    )
                  "
                  style="width:320px;"
                ></el-date-picker>
              </el-form-item>

              <el-form-item
                :label="
                  $t(
                    'Educational.circulateRegistrat.callManagement.form.commun_result'
                  )
                "
                prop="catitrack_type"
              >
                <el-radio-group v-model="ruleForm.catitrack_type">
                  <el-radio :label="0">
                    {{
                      $t(
                        "Educational.circulateRegistrat.callManagement.form.commun_result_arr[0]"
                      )
                    }}
                  </el-radio>
                  <el-radio :label="1">
                    {{
                      $t(
                        "Educational.circulateRegistrat.callManagement.form.commun_result_arr[1]"
                      )
                    }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item
                :label="
                  $t(
                    'Educational.circulateRegistrat.callManagement.form.commun_content'
                  )
                "
                prop="catitrack_note"
              >
                <div class="flex">
                  <el-input
                    type="textarea"
                    clearable
                    v-model="ruleForm.catitrack_note"
                    autosize
                    :placeholder="
                      $t(
                        'Educational.circulateRegistrat.callManagement.form.commun_content_ph'
                      )
                    "
                    style="width:320px;"
                  ></el-input>
                  <div
                    class="color-blue fs14 dsplay ml12 cur-pointer"
                    @click="seemodel"
                  >
                    <span>
                      {{
                        $t(
                          "Educational.JingleAssistant.educationWork.child3.ad"
                        )
                      }}
                    </span>
                  </div>
                </div>
              </el-form-item>
              <el-form-item
                :label="
                  $t(
                    'Educational.circulateRegistrat.callManagement.form.commun_nexttime'
                  )
                "
                prop="catitrack_followutime"
              >
                <el-date-picker
                  v-model="ruleForm.catitrack_followutime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  clearable
                  :placeholder="
                    $t(
                      'Educational.circulateRegistrat.callManagement.form.commun_nexttime_ph'
                    )
                  "
                  style="width:320px;"
                ></el-date-picker>
              </el-form-item>
            </el-form>
            <p class="color-red">
              {{
                $t("Educational.circulateRegistrat.callManagement.form.red_tip")
              }}
            </p>
            <div class="flex-all bg-white height30">
              <div class="ct-head-left flex-al mt12">
                <span class="left-line-orange mr10"></span>
                <span class="color-333 fs14">
                  {{
                    $t(
                      "Educational.circulateRegistrat.callManagement.callRecord"
                    )
                  }}
                </span>
              </div>
            </div>
          </div>
          <div>
            <!-- <div class="flex-wrap pl10 pr10">
            <div class="flex-al mb12">
              <span class="mr10 fs14 color-666">{{
                $t("Educational.circulateRegistrat.callManagement.call_time")
              }}</span>
              <div class="select-box" style="width:250px;">
                <el-date-picker
                  v-model="listFilter.range_time"
                  type="daterange"
                  :range-separator="
                    $t('Educational.circulateRegistrat.callManagement.range')
                  "
                  value-format="yyyy-MM-dd"
                  :start-placeholder="
                    $t(
                      'Educational.circulateRegistrat.callManagement.start_time'
                    )
                  "
                  :end-placeholder="
                    $t('Educational.circulateRegistrat.callManagement.end_time')
                  "
                  @change="listSearch"
                ></el-date-picker>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al Inquire-box mb12">
              <div class="ipt-box" style="width:220px;">
                <el-input
                  v-model="listFilter.keyword"
                  clearable
                  @clear="listSearch"
                  @keyup.enter.native="listSearch"
                  :placeholder="
                    $t('Educational.circulateRegistrat.callManagement.find_ph')
                  "
                ></el-input>
              </div>
              <el-button
                type="primary"
                size="small"
                class="search-btn fs14"
                @click="listSearch"
                >{{ $t("Common.input_button") }}</el-button
              >
            </div>
          </div>-->
            <div class="flex-wrap pt12 pl12 pr12">
              <div class="flex-al mb12">
                <span class="mr10 fs14 color-666">
                  {{ $t("Educational.circulateRegistrat.callManagement.tim") }}
                </span>
                <div class="select-box mr20" style="width:130px;">
                  <el-select
                    v-model="listFilter.code"
                    @change="listSearch"
                    filterable
                    clearable
                    :placeholder="
                      $t('Educational.circulateRegistrat.callManagement.none')
                    "
                  >
                    <el-option
                      v-for="tims in timeList"
                      :key="tims.value"
                      :label="tims.label"
                      :value="tims.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="flex-al mb12">
                <div class="select-box" style="width:373px;">
                  <el-date-picker
                    @change="listSearch"
                    v-model="listFilter.range_time"
                    type="daterange"
                    :range-separator="
                      $t('Educational.circulateRegistrat.callManagement.range')
                    "
                    value-format="yyyy-MM-dd"
                    :start-placeholder="
                      $t(
                        'Educational.circulateRegistrat.callManagement.start_time'
                      )
                    "
                    :end-placeholder="
                      $t(
                        'Educational.circulateRegistrat.callManagement.end_time'
                      )
                    "
                  ></el-date-picker>
                </div>
              </div>
            </div>
          </div>

          <div
            class="record-info flex-sb fs14 color-4C5"
            v-for="(items, index) in recordData"
            :key="index"
          >
            <div class="record-item">
              <div class="header">
                <div class="title fs16 color-243 flex-al-ce">
                  <img v-if="items.staffer_img" :src="items.staffer_img" />
                  <img
                    v-else-if="
                      items.staffer_img || items.staffer_sex == $t('Common.man')
                    "
                    src="@/assets/images/default-new-men.png"
                  />
                  <img
                    v-else-if="
                      items.staffer_img ||
                        items.staffer_sex == $t('Common.woman')
                    "
                    src="@/assets/images/default-img-women.png"
                  />
                  <span>{{ items.staffer_cnname }}</span>
                  <span class="spancontent_btn">{{ items.commode_name }}</span>
                  <span class="spancontent_btn">{{
                    items.catitrack_type
                  }}</span>
                </div>
                <div class="date color-B8C">
                  {{ items.catitrack_createtime }}
                </div>
              </div>
              <div class="content">
                <div>
                  {{
                    $t(
                      "Educational.circulateRegistrat.callManagement.form.commun_name"
                    )
                  }}: {{ items.object_name }}
                </div>
                <!-- <div>
                  {{
                    $t(
                      "Educational.circulateRegistrat.callManagement.form.commun_time"
                    )
                  }}: {{ items.catitrack_day }}
                </div> -->
                <div>
                  {{
                    $t(
                      "Educational.circulateRegistrat.callManagement.form.commun_content"
                    )
                  }}: {{ items.catitrack_note }}
                </div>
                <div>
                  {{
                    $t(
                      "Educational.circulateRegistrat.callManagement.form.commun_nexttime"
                    )
                  }}:
                  {{
                    items.catitrack_followutime
                      ? items.catitrack_followutime
                      : "待定"
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="slider-content pAll20"></div>
        </div>
      </el-drawer>
      <!-- 查看模版 - 弹窗 -->
      <div class="small-dialog" v-if="showmodel">
        <el-dialog
          :title="$t('Educational.circulateRegistrat.callManagement.mode')"
          :visible.sync="showmodel"
          width="900px"
          :before-close="handleClose"
          custom-class="pop-slider--box SeeAdmission"
        >
          <div class="slider-btn">
            <el-button type="primary" size="mini" @click="subModel">{{
              $t("Common.btn_sure")
            }}</el-button>
          </div>
          <div
            class="dialog-content content-model flex"
            style="flex-direction: column;"
          >
            <!--
            <div class="swiper ml20 mr20" style="position: relative;">
              <div class="swiperDiv mb20">
                <swiper :options="swiperOption">
                  <swiper-slide v-for="(slide, index) in tempList" :key="index">
                    <div
                      class="one-swiper cur-pointer"
                      :class="{ activeswiper: slide.active }"
                      @click="clickSwiper(slide, index)"
                    >
                      <div class="title ml20 mr20" fs16>
                        {{ slide.course_cnname }}
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
              <i v-if="tempList.length > 0" class="el-icon-arrow-left"></i>
              <i v-if="tempList.length > 0" class="el-icon-arrow-right"></i>
            </div>
            -->
            <div class="content">
              <div class="left">
                <div
                  class="lesson"
                  v-for="(lesson, index) in classList"
                  :key="index"
                  @click="clickLesson(lesson, index)"
                  :class="{ activelesson: lesson.active }"
                >
                  <div class>{{ lesson.comtemp_title }}</div>
                </div>
              </div>
              <div class="right">
                <div class="titie color-243 fs18 mAll12">
                  {{ onelesson.template_name }}
                </div>
                <div class="contents">
                  <el-radio-group v-model="oneContent">
                    <el-radio
                      :label="onelesson"
                    >
                      <span class="lesson-content">
                        {{ onelesson }}
                      </span></el-radio
                    >
                  </el-radio-group>
                </div>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import eduHttp from "../../Educational.js";
export default {
  name: "Educational-educationWork-communicate",
  components: { normalTableCont, swiper, swiperSlide },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".el-icon-arrow-right",
          prevEl: ".el-icon-arrow-left"
        },
        slidesPerView: 4,
        slidesPerGroup: 6,
        initialSlide: 0
      },
      tempList: [], // 第一层
      classList: [], //第二层
      onelesson: '', //第三层
      oneContent: "",
      lessonIndex: 0,
      studentId: "",
      studentname: "",
      typeList: [],
      objectList: [],
      showmodel: false,

      // 弹窗
      userInfo: {
        showVisable: false,
        isAdd: false
      },
      //筛选
      filter: {
        keyword: "" //关键词
      },
      timeList: [
        {
          value: "1",
          label: this.$t("Educational.JingleAssistant.timeListText[3]")
        },
        {
          value: "2",
          label: this.$t("Educational.JingleAssistant.timeListText[4]")
        },
        {
          value: "3",
          label: this.$t("Educational.JingleAssistant.timeListText[5]")
        },
        {
          value: "4",
          label: this.$t("Educational.JingleAssistant.timeListText[6]")
        },
        {
          value: "5",
          label: this.$t("Educational.JingleAssistant.timeListText[7]")
        }
      ],
      listFilter: {
        // keyword: "", //关键词
        range_time: "",
        code: ""
      },
      // 表单
      ruleForm: {
        commode_id: "",
        catitrack_code: "",
        catitrack_day: "",
        catitrack_note: "",
        catitrack_type: "",
        catitrack_followutime: ""
      },
      // 表单验证
      rules: {
        commode_id: [
          {
            required: true,
            message: this.$t(
              "Educational.circulateRegistrat.callManagement.form.commun_type_ph"
            ),
            trigger: "change"
          }
        ],
        catitrack_code: [
          {
            required: true,
            message: this.$t(
              "Educational.circulateRegistrat.callManagement.form.commun_name_ph"
            ),
            trigger: "change"
          }
        ],
        catitrack_type: [
          {
            required: true,
            message: this.$t(
              "Educational.circulateRegistrat.callManagement.form.commun_result_ph"
            ),
            trigger: "change"
          }
        ],
        catitrack_day: [
          {
            required: true,
            message: this.$t(
              "Educational.circulateRegistrat.callManagement.form.commun_time_ph"
            ),
            trigger: "change"
          }
        ],
        catitrack_followutime: [
          {
            required: false,
            message: this.$t(
              "Educational.circulateRegistrat.callManagement.form.commun_nexttime_ph"
            ),
            trigger: "change"
          }
        ],
        catitrack_note: [
          {
            required: true,
            message: this.$t(
              "Educational.circulateRegistrat.callManagement.form.commun_content_ph"
            ),
            trigger: "blur"
          }
        ]
      },
      recordData: [],
      childInfo: [],
      // 表格数据
      tableList: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: 0, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "JingleAssistant_communicate" //当前页面的名称，通常与路由名称一致
        }
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0
      }
    };
  },
  created() {
    this.getStudyStudentListE();
    this.getCatitrackCodeApi();
    this.getCommodeApi();
  },
  watch: {},
  computed: {},
  methods: {
    // 获取访谈列表
    getStudyStudentListE() {
      eduHttp
        .getStudyStudentListE({
          keyword: this.filter.keyword,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          class_id: this.$route.query.class_id,
          is_count: "1" //是否需要总数
        })
        .then(res => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          let obj = this.$Tool.getStorage(
            "module" + [this.tableList.options.moduleName]
          );
          if (obj) {
            if (obj["show_" + [this.tableList.options.ColumnName]]) {
              this.tableList.columns =
                obj["show_" + [this.tableList.options.ColumnName]];
            } else {
              this.tableList.columns = res.data.result.field;
            }
          } else {
            this.tableList.columns = res.data.result.field;
          }
          if (res.data.error == "0") {
            this.tableList.list = res.data.result.list; //表格数据
          } else {
            this.tableList.list = [];
            this.tableList.options.errortip = res.data.errortip;
          }
        });
    },
    // 获取沟通类型下拉
    getCommodeApi() {
      eduHttp.getCommodeApi({}).then(res => {
        if (res.data.error == 0) {
          this.typeList = res.data.result.list;
        } else {
          this.typeList = [];
        }
      });
    },
    // 获取沟通对象下拉
    getCatitrackCodeApi() {
      eduHttp.getCatitrackCodeApi({}).then(res => {
        if (res.data.error == 0) {
          this.objectList = res.data.result;
        } else {
          this.objectList = [];
        }
      });
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.getStudyStudentListE();
    },
    listSearch() {
      if (this.listFilter.range_time == null) {
        this.listFilter.range_time = "";
      }
      this.getCatitrackApiE();
    },
    //添加沟通
    addCall(v) {
      this.userInfo.isAdd = true;
      this.userInfo.showVisable = true;
      this.studentId = v.student_id;
      this.studentname = v.student_cnname;
      this.getCatitrackApiE();
      this.resetForm("ruleForm");
    },
    //电访记录
    callRecord(v) {
      this.userInfo.isAdd = false;
      this.userInfo.showVisable = true;
      this.studentId = v.student_id;
      this.studentname = v.student_cnname;
      this.getCatitrackApiE();
      this.resetForm("ruleForm");
    },
    //电访记录
    getCatitrackApiE() {
      eduHttp
        .getCatitrackApiE({
          student_id: this.studentId,
          // keyword: this.listFilter.keyword,
          code: this.listFilter.code,
          startime: this.listFilter.range_time[0]
            ? this.listFilter.range_time[0]
            : "", //开始时间
          endtime: this.listFilter.range_time[1]
            ? this.listFilter.range_time[1]
            : "" //	结束时间
        })
        .then(res => {
          this.recordData = res.data.result.list;
          this.childInfo = res.data.result.catitrack;
        });
    },
    // 查看模版
    seemodel() {
      this.getTemplateApiE();
      this.showmodel = !this.showmodel;
    },
    // 选择模版
    subModel() {
      this.ruleForm.catitrack_note = this.oneContent;
      this.showmodel = !this.showmodel;
    },
    // 模版
    getTemplateApiE() {
      eduHttp
        .getTemplateApiE({
          student_id: this.studentId
        })
        .then(res => {
          console.log(res);
          if (res.data.error == 0) {
            this.classList = res.data.result.list
            this.clickLesson(this.classList[0],0);
            // this.tempList = res.data.result.list;
            // this.tempList.map(v => {
            //   this.$set(v, "active", false);
            // });
            // this.clickSwiper(this.tempList[0], 0);
          }
        });
    },
    // 点击轮播
    // clickSwiper(slide, index) {
    //   this.tempList.forEach(v => {
    //     v.active = false;
    //   });
    //   console.log(slide, index);
    //   slide.active = true;
    //   if (slide.template) {
    //     this.classList = slide.template;
    //   } else {
    //     this.classList = [];
    //   }
    //   if (this.classList.length > 0) {
    //     this.classList.forEach(v => {
    //       v.active = false;
    //     });
    //     this.classList[0].active = true;
    //     this.onelesson = this.classList[0];
    //   } else {
    //     this.onelesson = [];
    //   }
    // },
    // 点击课时
    clickLesson(lesson, i) {
      this.onelesson = lesson.comtemp_content;
      this.lessonIndex = i;
      this.classList.forEach(v => {
        v.active = false;
      });
      lesson.active = true;
    },
    //侧边弹窗 - 新增 - 提交
    onSubmit() {
      let canSubmit = this.$Tool.isNull("ruleForm", this);
      if (canSubmit) {
        eduHttp
          .addStuCatitrackActionE({
            catitrack_code: this.ruleForm.catitrack_code,
            catitrack_day: this.ruleForm.catitrack_day,
            catitrack_note: this.ruleForm.catitrack_note,
            catitrack_type: this.ruleForm.catitrack_type,
            commode_id: this.ruleForm.commode_id,
            catitrack_followutime: this.ruleForm.catitrack_followutime,
            student_id: this.studentId
          })
          .then(res => {
            if (res.data.error == 0) {
              this.$message({ message: res.data.errortip, type: "success" });
              this.userInfo.showVisable = false;
              this.getStudyStudentListE();
            } else {
              this.$message.error(res.data.errortip);
            }
          });
      }
    },

    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.getStudyStudentListE();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getStudyStudentListE();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getStudyStudentListE();
    },
    // 重置表单
    resetForm(form) {
      // 数据清空
      this.ruleForm = {
        catitrack_code: "",
        catitrack_day: "",
        catitrack_note: "",
        catitrack_type: "",
        commode_id: "",
        catitrack_followutime: ""
      };
      this.listFilter = {
        keyword: "",
        range_time: ""
      };
      if (this.$refs[form]) {
        this.$refs[form].resetFields();
      }
    },
    handleClose(done) {
      done();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 52
        );
      }
    });
  }
};
</script>

<style lang="less">
.Educational-educationWork-communicate {
  .el-dialog__body {
    .el-icon-arrow-left {
      z-index: 3;
      cursor: pointer;
      position: absolute;
      top: 24px;
      left: -10px;
    }
    .el-icon-arrow-right {
      z-index: 3;
      cursor: pointer;
      position: absolute;
      top: 24px;
      right: -10px;
    }
  }

  .content-model {
    .activelesson {
      color: #24356a;
      background: rgba(249, 252, 255, 1);
    }
    display: flex;
    justify-content: center;
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
      }
      .activeswiper {
        background-color: #00a6ff;
        color: #ffffff;
      }
    }
    .content {
      color: #8a96bc;
      width: 95%;
      height: 500px;
      border: 1px solid #dadde9;
      display: flex;
      .left {
        width: 25%;
        overflow-y: scroll;
        .lesson {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          font-size: 16px;
          border-bottom: 1px solid #dadde9;
        }
      }
      .right {
        width: 75%;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-left: 1px solid #dadde9;
        .contents {
          width: 95%;
          .lesson-content {
            font-size: 14px;
            margin: 10px 0;
            display: inline-block;
            border: 1px solid #dadde9;
            border-radius: 4px;
            padding: 10px;
          }
        }
      }
    }
  }
}
.spancontent_btn {
  font-size: 12px;
  color: #b8c3e6;
  padding: 4px 8px;
  margin: 0 8px;
  border-radius: 4px;
  border: 1px solid #dadde9;
}
.drawer_title {
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-left: 20px;
    margin-right: 4px;
  }
}
.record-info {
  .record-item {
    margin: 10px 25px;
    width: 100%;
    height: 200px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(27, 30, 73, 0.15);
    border-radius: 4px;

    .header {
      margin: 10px 12px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-right: 4px;
      }
    }
    .content {
      > div {
        margin: 12px 20px 12px 50px;
      }
    }
  }
}
</style>
