<template>
  <div class="Educational-callManagement">
    <div class="class-list">
      <!-- 
      <div class="title mAll16 tc">国际幼儿初阶班一级A班/KWA班</div>
      <div class="swiper ml20 mr20" style="position: relative;">
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
                    {{
                    slide.hour_ischecking_name
                    }}
                  </span>
                </div>
                <div class="status status2" v-else-if="slide.hour_ischecking == 1">
                  <span class="color-white">
                    {{
                    slide.hour_ischecking_name
                    }}
                  </span>
                </div>
                <div class="status status1" v-else-if="slide.hour_ischecking == -1">
                  <span class="color-white">
                    {{
                    slide.hour_ischecking_name
                    }}
                  </span>
                </div>
                <div class="title" fs16>{{ slide.hour_name }}</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <i class="el-icon-arrow-left"></i>
        <i class="el-icon-arrow-right"></i>
      </div>
      -->
    </div>
    <div class="flex-al Inquire-box mAll12">
      <div class="flex-al">
        <span class="mr10 fs14 color-4C5">
          {{ $t("Educational.circulateRegistrat.callManagement.a10") }}
        </span>
        <div class="select-box" style="width: 170px">
          <el-select
            v-model="filter.catitrack_class"
            clearable
            filterable
            :placeholder="
              $t('Educational.circulateRegistrat.callManagement.a11')
            "
            @change="search"
          >
            <el-option label="未电访" value="0"></el-option>
            <el-option label="已电访" value="1"></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16"></div>
      <div class="select-box">
        <el-date-picker
          v-model="filter.day"
          value-format="yyyy-MM"
          type="month"
          placeholder="选择时间"
          @change="search"
        >
        </el-date-picker>
      </div>
      <div class="lines ml16 mr16"></div>

      <div class="ipt-box" style="width: 300px">
        <el-input
          v-model="filter.keyword"
          @clear="search"
          @keyup.enter.native="search"
          clearable
          :placeholder="
            $t('Educational.circulateRegistrat.callManagement.find_ph1')
          "
        ></el-input>
      </div>

      <el-button
        type="primary"
        size="small"
        class="search-btn fs14"
        @click="search"
        >{{ $t("Common.input_button") }}</el-button
      >
      <el-popover
        popper-class="myPop"
        placement="bottom"
        width="400"
        trigger="click"
        class="flex-toend"
      >
        <div class="modelDiv">
          <div class="oneDiv" v-for="(model, index) in modelList" :key="index">
            {{ model.comtemp_content }}
          </div>
        </div>
        <div class="color-red fs14 dsplay ml12 cur-pointer" slot="reference">
          <i class="el-icon-question fs16 ml8"></i>
          <span>
            {{ $t("Educational.circulateRegistrat.callManagement.a9") }}
          </span>
        </div>
      </el-popover>
    </div>
    <div class="height100">
      <div class="tableDiv ml10 mr10" ref="auto_height_table">
        <normalTableCont :tableData="tableList" @handSetting="handSetting">
          <!-- 按钮操作组********start -->
          <el-table-column
            ref="fixedColumn"
            label="操作"
            align="center"
            width="150px"
            fixed="right"
          >
            <template slot-scope="scope">
              <!-- <el-button
                type="text"
                size="small"
                @click.native.prevent="addCall(scope.row)"
              >
                {{
                  $t("Educational.circulateRegistrat.callManagement.addCall")
                }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click.native.prevent="callRecord(scope.row)"
              >
                {{
                  $t("Educational.circulateRegistrat.callManagement.callRecord")
                }}
              </el-button>-->
              <el-button
                type="text"
                size="small"
                @click.native.prevent="seeRecord(scope.row)"
              >
                {{ $t("Educational.circulateRegistrat.callManagement.a1") }}
              </el-button>
            </template>
          </el-table-column>
          <!-- 按钮操作组********end -->
        </normalTableCont>
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
    <!-- 电访弹窗 -->
    <el-drawer
      :title="$t('Educational.circulateRegistrat.callManagement.callRecord')"
      :visible.sync="userInfo.showVisable"
      direction="rtl"
      size="700px"
      :modal="false"
      custom-class="pop-slider--box SeeAdmission"
      :before-close="handleClose"
    >
      <div class="slider-btn">
        <el-button
          v-if="activeName == 'first'"
          type="primary"
          size="mini"
          @click="onSubmit"
          >{{ $t("Common.input_submit") }}</el-button
        >
      </div>
      <div
        class="flex-al drawer_title pl20"
        style="background: #f2f4f7; justify-content: space-around"
      >
        <img v-if="childInfo.student_img" :src="childInfo.student_img" />
        <img
          v-else-if="childInfo.student_img || childInfo.student_sex == '男'"
          src="@/assets/images/default-img-man.png"
        />
        <img
          v-else-if="childInfo.student_img || childInfo.student_sex == '女'"
          src="@/assets/images/default-img-women.png"
        />
        <div class="title pAll12 flex-coc flex1" style="background: #f2f4f7">
          <div class="ml10 color-8A9 mb8">
            {{ $t("Educational.circulateRegistrat.callManagement.a2") }}
          </div>
          <div class="ml8">{{ this.childInfo.student_cnname }}</div>
        </div>
        <div class="title pAll12 flex-coc flex1" style="background: #f2f4f7">
          <div class="ml10 color-8A9 mb8">
            {{ $t("Educational.circulateRegistrat.callManagement.a3") }}
          </div>
          <div class="ml8">{{ this.childInfo.student_enname }}</div>
        </div>
        <div class="title pAll12 flex-coc flex1" style="background: #f2f4f7">
          <div class="ml10 color-8A9 mb8">
            {{ $t("Educational.circulateRegistrat.callManagement.a4") }}
          </div>
          <div class="ml8">{{ this.childInfo.student_branch }}</div>
        </div>
        <div class="title pAll12 flex-coc flex1" style="background: #f2f4f7">
          <div class="ml10 color-8A9 mb8">
            {{ $t("Educational.circulateRegistrat.callManagement.a5") }}
          </div>
          <div class="ml8">{{ this.childInfo.catitrack_type }}</div>
        </div>
        <div class="title pAll12 flex-coc flex1" style="background: #f2f4f7">
          <div class="ml10 color-8A9 mb8">
            {{ $t("Educational.circulateRegistrat.callManagement.a6") }}
          </div>
          <div class="ml8">{{ this.childInfo.catitrack_day }}</div>
        </div>
      </div>

      <div class="slide-record ml20 mr20 mt20">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            :label="$t('Educational.circulateRegistrat.callManagement.a7')"
            name="first"
          >
            <div>
              <el-form
                label-width="100px"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
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
                    style="width: 320px"
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
                    style="width: 320px"
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
                    style="width: 320px"
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
                      style="width: 320px"
                    ></el-input>
                    <!--
                    <div class="color-red fs14 dsplay ml12 cur-pointer" @click="seemodel">
                      <i class="el-icon-question fs16 ml8"></i>
                      <span>
                        {{
                        $t("Educational.circulateRegistrat.callManagement.a9")
                        }}
                      </span>
                    </div>
                    -->
                    <el-popover
                      popper-class="myPop"
                      placement="bottom"
                      width="400"
                      trigger="click"
                    >
                      <div class="modelDiv">
                        <div
                          class="oneDiv"
                          v-for="(model, index) in modelList"
                          :key="index"
                        >
                          {{ model.comtemp_content }}
                        </div>
                      </div>
                      <div
                        class="color-red fs14 dsplay ml12 cur-pointer"
                        slot="reference"
                      >
                        <i class="el-icon-question fs16 ml8"></i>
                        <span>
                          {{
                            $t(
                              "Educational.circulateRegistrat.callManagement.a9"
                            )
                          }}
                        </span>
                      </div>
                    </el-popover>
                  </div>
                </el-form-item>
                <!-- <el-form-item
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
                </el-form-item>-->
              </el-form>
              <p class="color-red">
                {{
                  $t(
                    "Educational.circulateRegistrat.callManagement.form.red_tip"
                  )
                }}
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane
            :label="$t('Educational.circulateRegistrat.callManagement.a8')"
            name="second"
          >
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
                  <span class="mr10 fs14 color-666">{{
                    $t("Educational.circulateRegistrat.callManagement.tim")
                  }}</span>
                  <div class="select-box mr20" style="width: 130px">
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
                  <div class="select-box" style="width: 373px">
                    <el-date-picker
                      @change="listSearch"
                      v-model="listFilter.range_time"
                      type="daterange"
                      :range-separator="
                        $t(
                          'Educational.circulateRegistrat.callManagement.range'
                        )
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
                    <span>{{ items.staffer_cnname }}</span>
                    <!-- <span class="spancontent_btn">{{ items.commode_name }}</span> -->
                    <span
                      class="spancontent_btn"
                      :class="{
                        bd_yellow: items.catitrack_type == 0,
                        bd_blue: items.catitrack_type == 1,
                      }"
                      >{{ items.catitrack_type_name }}</span
                    >
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
                    }}: {{ items.student_cnname }}
                  </div>
                  <div>
                    {{
                      $t(
                        "Educational.circulateRegistrat.callManagement.form.commun_time"
                      )
                    }}: {{ items.catitrack_day }}
                  </div>
                  <div>
                    {{
                      $t(
                        "Educational.circulateRegistrat.callManagement.form.commun_content"
                      )
                    }}: {{ items.catitrack_note }}
                  </div>
                  <!-- <div>
                    {{
                    $t(
                    "Educational.circulateRegistrat.callManagement.form.commun_nexttime"
                    )
                    }}: {{ items.catitrack_followutime }}
                  </div>-->
                </div>
              </div>
            </div>
            <div class="slider-content pAll20"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
    <!-- 查看模版 - 弹窗 -->
    <div class="small-dialog" v-if="showmodel">
      <el-dialog
        :title="$t('Educational.circulateRegistrat.callManagement.mode')"
        :visible.sync="showmodel"
        width="900px"
        :before-close="handleClose"
      >
        <div
          class="dialog-content content-model flex"
          style="flex-direction: column"
        >
          <div class="swiper ml20 mr20" style="position: relative">
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
            <i class="el-icon-arrow-left"></i>
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="content">
            <div class="left">
              <div
                class="lesson"
                v-for="(lesson, index) in classList"
                :key="index"
                @click="clickLesson(lesson, index)"
                :class="{ activelesson: lesson.active }"
              >
                <div class>{{ lesson.template_name }}</div>
              </div>
            </div>
            <div class="right">
              <div class="titie color-243 fs18 mAll12">
                {{ lessonList.template_name }}
              </div>
              <div class="contents">
                <div
                  class="lesson-content"
                  v-for="(con, index) in lessonList.content"
                  :key="index"
                >
                  {{ con.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import eduHttp from "../../Educational.js";

export default {
  name: "Educational-callManagement",
  data() {
    return {
      activeName: "first",
      swiperOption: {
        navigation: {
          nextEl: ".el-icon-arrow-right",
          prevEl: ".el-icon-arrow-left",
        },
        slidesPerView: 4,
        slidesPerGroup: 6,
        initialSlide: 0,
      },
      swiperSlides: [],

      tempList: [], // 第一层
      classList: [], //第二层
      lessonList: [], //第三层
      lessonIndex: 0,
      studentId: "",
      typeList: [],
      objectList: [],
      showmodel: false,
      // 弹窗
      userInfo: {
        showVisable: false,
      },
      //筛选
      filter: {
        keyword: "", //关键词
      },
      timeList: [
        { value: "1", label: "本周" },
        { value: "2", label: "近7天" },
        { value: "3", label: "近30天" },
        { value: "4", label: "本月" },
        { value: "5", label: "上月" },
      ],
      listFilter: {
        // keyword: "", //关键词
        range_time: "",
        code: "",
      },
      // 表单
      ruleForm: {
        commode_id: "",
        catitrack_code: "",
        catitrack_day: this.$Tool.getDay(0),
        catitrack_note: "",
        catitrack_type: "",
        // catitrack_followutime: ""
      },
      // 表单验证
      rules: {
        commode_id: [
          {
            required: true,
            message: this.$t(
              "Educational.circulateRegistrat.callManagement.form.commun_type_ph"
            ),
            trigger: "change",
          },
        ],
        catitrack_code: [
          {
            required: true,
            message: this.$t(
              "Educational.circulateRegistrat.callManagement.form.commun_name_ph"
            ),
            trigger: "change",
          },
        ],
        catitrack_type: [
          {
            required: true,
            message: this.$t(
              "Educational.circulateRegistrat.callManagement.form.commun_result_ph"
            ),
            trigger: "change",
          },
        ],
        catitrack_day: [
          {
            required: true,
            message: this.$t(
              "Educational.circulateRegistrat.callManagement.form.commun_time_ph"
            ),
            trigger: "change",
          },
        ],
        // catitrack_followutime: [
        //   {
        //     required: true,
        //     message: this.$t(
        //       "Educational.circulateRegistrat.callManagement.form.commun_nexttime_ph"
        //     ),
        //     trigger: "change"
        //   }
        // ],
        catitrack_note: [
          {
            required: true,
            message: this.$t(
              "Educational.circulateRegistrat.callManagement.form.commun_content_ph"
            ),
            trigger: "blur",
          },
        ],
      },
      // 电访话术
      modelList: [],
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
          issetting: true, //是否可以编辑列
          tableHeight: 600, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "callManagement", //当前页面的名称，通常与路由名称一致
        },
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0,
      },
    };
  },
  components: { normalTableCont, swiper, swiperSlide },
  created() {
    this.$set(
      this.filter,
      "day",
      new Date().getFullYear() +
        "-" +
        String(new Date().getMonth() + 1).padStart(2, "0")
    );
    // this.filter.day =
    //   new Date().getFullYear() +
    //   "-" +
    //   String(new Date().getMonth() + 1).padStart(2, "0");
    if (this.$route.query.day) {
      this.filter.day = this.$route.query.day;
    }
    this.getStudentCatitrackList();
    this.getCatitrackCodeApi();
    this.getCommodeApi();
    this.getComtempApi();
  },
  methods: {
    // 获取访谈列表
    getStudentCatitrackList() {
      eduHttp
        .getStudentCatitrackList({
          keyword: this.filter.keyword,
          catitrack_class: this.filter.catitrack_class,
          // is_catitrack: "1",
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
          class_id: this.$route.query.class_id,
          day: this.filter.day,
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.allnum);
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
    // 获取模版
    getComtempApi() {
      eduHttp.getComtempApi({}).then((res) => {
        if (res.data.error == 0) {
          this.modelList = res.data.result.list;
        } else {
          this.modelList = [];
        }
      });
    },
    // 获取沟通类型下拉
    getCommodeApi() {
      eduHttp.getCommodeApi({}).then((res) => {
        if (res.data.error == 0) {
          this.typeList = res.data.result.list;
        } else {
          this.typeList = [];
        }
      });
    },
    // 获取沟通对象下拉
    getCatitrackCodeApi() {
      eduHttp.getCatitrackCodeApi({}).then((res) => {
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
      this.getStudentCatitrackList();
    },
    listSearch() {
      if (this.listFilter.range_time == null) {
        this.listFilter.range_time = "";
      }
      this.getCatitrackApi();
    },
    // 切换
    handleClick() {},
    //电访记录
    seeRecord(v) {
      this.userInfo.showVisable = true;
      this.studentId = v.student_id;
      this.getCatitrackApi();
      this.resetForm("ruleForm");
    },
    //电访记录
    getCatitrackApi() {
      eduHttp
        .getCatitrackApi({
          student_id: this.studentId,
          // keyword: this.listFilter.keyword,
          code: this.listFilter.code,
          startime: this.listFilter.range_time[0]
            ? this.listFilter.range_time[0]
            : "", //开始时间
          endtime: this.listFilter.range_time[1]
            ? this.listFilter.range_time[1]
            : "", //	结束时间
        })
        .then((res) => {
          this.recordData = res.data.result.list;
          this.childInfo = res.data.result.catitrack;
        });
    },
    // 查看电访话术
    seeLan() {},
    // 查看模版
    seemodel() {
      this.getTemplateApi();
      this.showmodel = !this.showmodel;
    },
    // 模版
    getTemplateApi() {
      eduHttp
        .getTemplateApi({
          student_id: this.studentId,
        })
        .then((res) => {
          console.log(res);
          if (res.data.error == 0) {
            this.tempList = res.data.result.list;
            this.tempList.map((v) => {
              this.$set(v, "active", false);
            });
            this.clickSwiper(this.tempList[0], 0);
          }
        });
    },
    // 点击轮播
    clickSwiper(slide, index) {
      this.tempList.forEach((v) => {
        v.active = false;
      });
      console.log(slide, index);
      slide.active = true;
      if (slide.template) {
        this.classList = slide.template;
      } else {
        this.classList = [];
      }
      if (this.classList.length > 0) {
        this.classList.forEach((v) => {
          v.active = false;
        });
        this.classList[0].active = true;
        this.lessonList = this.classList[0];
      } else {
        this.lessonList = [];
      }
    },
    // 点击课时
    clickLesson(lesson, i) {
      this.lessonList = lesson;
      this.lessonIndex = i;
      console.log(this.lessonList);
      this.classList.forEach((v) => {
        v.active = false;
      });
      lesson.active = true;
    },
    //侧边弹窗 - 新增 - 提交
    onSubmit() {
      let canSubmit = this.$Tool.isNull("ruleForm", this);
      if (canSubmit) {
        eduHttp
          .addStuCatitrackAction({
            catitrack_code: this.ruleForm.catitrack_code,
            catitrack_day: this.ruleForm.catitrack_day,
            catitrack_note: this.ruleForm.catitrack_note,
            catitrack_type: this.ruleForm.catitrack_type,
            commode_id: this.ruleForm.commode_id,
            // catitrack_followutime: this.ruleForm.catitrack_followutime,
            student_id: this.studentId,
          })
          .then((res) => {
            if (res.data.error == 0) {
              this.$message({ message: res.data.errortip, type: "success" });
              this.userInfo.showVisable = false;
              this.getStudentCatitrackList();
            } else {
              this.$message.error(res.data.errortip);
            }
          });
      }
    },
    // 表格内容绑定事件
    handleBlurInput(v, index, value) {
      console.log(v, index, value);
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.getStudentCatitrackList();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getStudentCatitrackList();
    },
    // pageSize改变
    pageSizeChange(v) {
      this.paging.curPage = 1;
      this.paging.pageSize = v;
      this.getStudentCatitrackList();
    },
    // 重置表单
    resetForm(form) {
      // 数据清空
      this.ruleForm = {
        catitrack_code: "",
        catitrack_day: this.$Tool.getDay(0),
        catitrack_note: "",
        catitrack_type: "",
        commode_id: "",
        // catitrack_followutime: ""
      };
      this.listFilter = {
        keyword: "",
        range_time: "",
      };
      if (this.$refs[form]) {
        this.$refs[form].resetFields();
      }
    },
    handleClose(done) {
      done();
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 52
        );
      }
    });
  },
};
</script>
<style lang="less">
// body{
//     overflow-y: hidden;
//     overflow-x: hidden;
// }
.myPop {
  width: 258px !important;
  height: 236px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 0px rgba(27, 30, 73, 0.15);
  overflow-y: auto;
  .oneDiv {
    width: 236px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    border: 1px solid rgba(218, 221, 233, 1);
    margin: 10px 0;
    padding: 5px;
  }
}
.Educational-callManagement {
  .flex-toend {
    flex-grow: 1; //这三个元素只有它在有空余空间时可伸缩，也就是它占据了所有剩余空间
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // .el-dialog__body {
  //   .el-icon-arrow-left {
  //     z-index: 3;
  //     cursor: pointer;
  //     position: absolute;
  //     top: 24px;
  //     left: -10px;
  //   }
  //   .el-icon-arrow-right {
  //     z-index: 3;
  //     cursor: pointer;
  //     position: absolute;
  //     top: 24px;
  //     right: -10px;
  //   }
  // }

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
            font-size: 16px;
            margin: 10px 0;
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
  padding: 2px 8px;
  margin: 0 8px;
  border-radius: 12px;
}
.bd_yellow {
  color: #ff9e02;
  border: 1px solid #ff9e02;
}
.bd_blue {
  color: #00a6ff;
  border: 1px solid #00a6ff;
}
.drawer_title {
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 4px;
  }
}
.record-info {
  .record-item {
    margin: 10px 25px;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(27, 30, 73, 0.15);
    border-radius: 4px;

    .header {
      padding: 10px 12px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: rgba(249, 252, 255, 1);
    }
    .content {
      > div {
        margin: 12px 20px;
      }
      margin-bottom: 20px;
    }
  }
}
</style>
