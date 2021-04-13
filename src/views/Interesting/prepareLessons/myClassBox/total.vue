<template>
  <div class="Interesting-prepareLessons-total height100">
    <!-- 页面右边按钮***start -->
    <div class="right-btn fs14 color-8A9">
      <span
        v-for="(item, index) in $t('Interesting.prepareLessons.filterTabs')"
        :key="index"
        class="cur-pointer"
        :class="{ 'color-blue': index == currentIndex, mr16: index == 0 }"
        @click="handClckTabs(item, index)"
        >{{ item }}</span
      >
    </div>
    <div class="content-box bg-white flex1">
      <div class="flex-wrap pt12 flex-warp-line pl12 pr12">
        <!-- <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">{{ $t("Interesting.prepareLessons.filter_name1") }}：</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.schoolId"
              @change="search"
              clearable
              filterable
              :placeholder="$t('Interesting.prepareLessons.placeholder1')"
            >
              <el-option
                v-for="item in filter.schoolList"
                :key="item.school_id"
                :label="item.school_cnname"
                :value="item.school_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>-->
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5"
            >{{ $t("Interesting.prepareLessons.filter_name2") }}：</span
          >
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.course_id"
              @change="search"
              clearable
              filterable
              :placeholder="$t('Interesting.prepareLessons.placeholder2')"
            >
              <el-option
                v-for="item in filter.courseList"
                :key="item.course_id"
                :label="item.course_cnname"
                :value="item.course_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <template
          v-if="
            $userDetails.account_class == 1 ||
            $Tool.getStorage('postpart_isteregulator') == 1
          "
        >
          <div class="flex-al mb12">
            <span class="mr10 fs14 color-4C5"
              >{{ $t("Interesting.prepareLessons.filter_name3") }}：</span
            >
            <div class="select-box" style="width: 170px">
              <el-select
                v-model="filter.re_staffer_id"
                @change="search"
                clearable
                filterable
                :placeholder="$t('Interesting.prepareLessons.placeholder3')"
              >
                <el-option
                  v-for="(item, index) in filter.stafferList"
                  :key="index"
                  :label="item.staffer_cnname"
                  :value="item.staffer_id"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="lines ml16 mr16 mb12"></div>
        </template>
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5"
            >{{ $t("Interesting.prepareLessons.filter_name4") }}：</span
          >
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.classroom_id"
              clearable
              filterable
              @change="search"
              :placeholder="$t('Interesting.prepareLessons.placeholder4')"
            >
              <el-option
                v-for="item in filter.classRoomList"
                :key="item.classroom_id"
                :label="item.classroom_cnname"
                :value="item.classroom_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width: 240px">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="$t('Interesting.prepareLessons.placeholder5')"
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
      <div class="tableDiv mt12" ref="auto_height_table">
        <!-- 卡片模式 -->
        <div
          :style="{ height: tableList.options.tableHeight + 'px' }"
          style="overflow-y: scroll"
        >
          <div v-if="currentIndex == 0" class="card-modeList pl4 pr4">
            <template v-if="cardModeList.length > 0">
              <div
                class="itemOne fs14 color-4C5"
                v-for="(item, index) in cardModeList"
                :key="index"
              >
                <div class="top flex-all pl16 pr16">
                  <span class="fs16 color-243">
                    {{ item.class_cnname }}
                    <span
                      v-if="item.class_status == '1'"
                      class="status status1 fs12 ml8"
                    >
                      {{ $t("Interesting.prepareLessons.status[0]") }}
                    </span>
                    <!-- 两种状态---暂时注释 -->
                    <span v-else class="status status2 fs12 ml8">{{
                      $t("Interesting.prepareLessons.status[1]")
                    }}</span>
                  </span>
                  <span class="color-8A9">
                    {{ $t("Interesting.prepareLessons.labe_text1")
                    }}{{ item.prepare_createtime }}
                  </span>
                </div>
                <div class="center-cont pl16 pr16 flex-sb">
                  <div class="center-left">
                    <p>
                      {{ $t("Interesting.prepareLessons.labe_text2")
                      }}{{ item.course_cnname }}
                    </p>
                    <p>
                      {{ $t("Interesting.prepareLessons.labe_text3")
                      }}{{ item.classroom_cnname }}
                    </p>
                    <p>
                      {{ $t("Interesting.prepareLessons.labe_text4")
                      }}{{ item.course_branch }}
                    </p>
                    <p>
                      {{ $t("Interesting.prepareLessons.labe_text5")
                      }}{{ item.school_cnname }}
                    </p>
                    <div class="person progress flex-al">
                      {{ $t("Interesting.prepareLessons.labe_text6") }}
                      <div class="out-progress">
                        <div
                          class="inner-progress"
                          :style="{
                            width:
                              parseInt(item.class_fullnums.split('/')[0]) >
                              parseInt(item.class_fullnums.split('/')[1])
                                ? item.class_fullnums.split('/')[1]
                                : (item.class_fullnums.split('/')[0] /
                                    item.class_fullnums.split('/')[1]) *
                                    100 +
                                  '%',
                          }"
                        ></div>
                      </div>
                      <span class="ml5">{{ item.class_fullnums }}</span>
                    </div>
                  </div>
                  <div class="center-right flex">
                    <div class="canvas-cont mr20">
                      <div class="ring-loading ring-loading1 mb8">
                        <div class="percent-circle percent-circle-left">
                          <div
                            v-if="
                              parseInt(item.class_hour_num.split('/')[1]) == 0
                            "
                            class="left-content"
                            style="transform: rotate(0deg)"
                          ></div>
                          <div
                            v-else-if="
                              (parseInt(item.class_hour_num.split('/')[0]) /
                                parseInt(item.class_hour_num.split('/')[1])) *
                                360 <=
                              180
                            "
                            class="left-content"
                            :style="{
                              transform: `rotate(${
                                (parseInt(item.class_hour_num.split('/')[0]) /
                                  parseInt(item.class_hour_num.split('/')[1])) *
                                360
                              }deg)`,
                            }"
                          ></div>
                          <div
                            v-else
                            class="left-content"
                            style="transform: rotate(180deg)"
                          ></div>
                        </div>
                        <div class="percent-circle percent-circle-right">
                          <!-- <div class="right-content"></div> -->
                          <div
                            v-if="
                              parseInt(item.class_hour_num.split('/')[1]) == 0
                            "
                            class="right-content"
                            style="transform: rotate(0deg)"
                          ></div>
                          <div
                            v-else-if="
                              (parseInt(item.class_hour_num.split('/')[0]) /
                                parseInt(item.class_hour_num.split('/')[1])) *
                                360 >
                              180
                            "
                            class="right-content"
                            :style="{
                              transform: `rotate(${
                                (parseInt(item.class_hour_num.split('/')[0]) /
                                  parseInt(item.class_hour_num.split('/')[1])) *
                                  360 -
                                180
                              }deg)`,
                            }"
                          ></div>
                          <div
                            v-else
                            class="right-content"
                            style="transform: rotate(0deg)"
                          ></div>
                        </div>
                        <div class="text-circle">
                          {{ $t("Interesting.prepareLessons.canvas_text1[0]") }}
                          {{ item.class_hour_num.split("/")[1] }}
                        </div>
                      </div>
                      <p>
                        {{ $t("Interesting.prepareLessons.canvas_text1[1]") }}
                        <span class="ml5">{{ item.class_hour_num }}</span>
                      </p>
                      <p class="fs12 mt20">
                        <span class="cicle bg-blue mr5"></span>
                        {{ $t("Interesting.prepareLessons.canvas_text1[2]") }}
                      </p>
                    </div>
                    <div class="canvas-cont">
                      <div class="ring-loading ring-loading2 mb8">
                        <div class="percent-circle percent-circle-left">
                          <div
                            v-if="
                              parseInt(item.class_preparenums.split('/')[1]) ==
                              0
                            "
                            class="left-content"
                            style="transform: rotate(0deg)"
                          ></div>
                          <div
                            v-else-if="
                              (parseInt(item.class_preparenums.split('/')[0]) /
                                parseInt(
                                  item.class_preparenums.split('/')[1]
                                )) *
                                360 <=
                              180
                            "
                            class="left-content"
                            :style="{
                              transform: `rotate(${
                                (parseInt(
                                  item.class_preparenums.split('/')[0]
                                ) /
                                  parseInt(
                                    item.class_preparenums.split('/')[1]
                                  )) *
                                360
                              }deg)`,
                            }"
                          ></div>
                          <div
                            v-else
                            class="left-content"
                            style="transform: rotate(180deg)"
                          ></div>
                        </div>
                        <div class="percent-circle percent-circle-right">
                          <!-- <div class="right-content"></div> -->
                          <div
                            v-if="
                              parseInt(item.class_preparenums.split('/')[1]) ==
                              0
                            "
                            class="right-content"
                            style="transform: rotate(0deg)"
                          ></div>
                          <div
                            v-else-if="
                              (parseInt(item.class_preparenums.split('/')[0]) /
                                parseInt(
                                  item.class_preparenums.split('/')[1]
                                )) *
                                360 >
                              180
                            "
                            class="right-content"
                            :style="{
                              transform: `rotate(${
                                (parseInt(
                                  item.class_preparenums.split('/')[0]
                                ) /
                                  parseInt(
                                    item.class_preparenums.split('/')[1]
                                  )) *
                                  360 -
                                180
                              }deg)`,
                            }"
                          ></div>
                          <div
                            v-else
                            class="right-content"
                            style="transform: rotate(0deg)"
                          ></div>
                        </div>
                        <div class="text-circle">
                          {{ $t("Interesting.prepareLessons.canvas_text2[0]") }}
                          {{ item.class_preparenums.split("/")[1] }}
                        </div>
                      </div>
                      <p>
                        {{ $t("Interesting.prepareLessons.canvas_text2[1]") }}
                        <span class="ml5">{{ item.class_preparenums }}</span>
                      </p>
                      <p class="fs12 mt20">
                        <span class="cicle bg-orange mr5"></span>
                        {{ $t("Interesting.prepareLessons.canvas_text2[2]") }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="footer tr pl16 pr16">
                  <el-button
                    type="primary"
                    size="mini"
                    v-if="
                      (item.is_beike &&
                        $Tool.getStorage('postpart_isteregulator') == '1') ||
                      $Tool.getStorage('postpart_isteregulator') == '0'
                    "
                    class="fs14"
                    @click="handPreparing(item)"
                    >{{ $t("Interesting.prepareLessons.btn_text1") }}</el-button
                  >
                </div>
              </div>
            </template>
            <blank v-else :blankCont="tableList.options.errortip"></blank>
          </div>
          <!-- 列表模式 -->
          <div v-else class="table-cont pl12 pr12">
            <progressTableCont
              :tableData="tableList"
              @handSetting="handSetting"
            >
              <!-- 按钮操作组********start -->
              <el-table-column
                ref="fixedColumn"
                label="操作"
                align="center"
                width="150px"
                fixed="right"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click.native.prevent="handPreparing(scope.row)"
                    >{{ $t("Interesting.prepareLessons.btn_text1") }}</el-button
                  >
                </template>
              </el-table-column>
              <!-- 按钮操作组********end -->
            </progressTableCont>
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
    <!-- 选择课时---侧边弹窗 -->
    <el-drawer
      :title="$t('Interesting.prepareLessons.slider_title')"
      :visible.sync="chooseItem"
      direction="rtl"
      size="700px"
      :modal="false"
      :modal-append-to-body="false"
      custom-class="pop-slider--box chooseCourseDetail-box"
      :before-close="handleClose"
    >
      <div class="slider-content pAll12">
        <div class="flex-al">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs14">{{ classCnname }}</span>
        </div>
        <div class="slider-table mt16">
          <div
            class="table-cont"
            ref="auto_slider_height_table"
            :style="{ height: tableListInventory.options.tableHeight + 'px' }"
          >
            <el-table
              :data="tableListInventory.list"
              fit
              :max-height="tableListInventory.options.tableHeight + 'px'"
              style="width: 100%"
            >
              <!-- 暂无数据提示，自己定义就OK了 -->
              <template slot="empty">
                <div class="empty-box">
                  <i class="mh-kym_icon icon"></i>
                  <p class="col-66 text-1">
                    {{
                      tableListInventory.options.errortip != ""
                        ? tableListInventory.options.errortip
                        : "啊哦～暂时没有内容哦"
                    }}
                  </p>
                </div>
              </template>
              <!-- 表格数据渲染 -->
              <template v-for="(column, $index) in tableListInventory.columns">
                <el-table-column
                  :prop="column.fieldstring"
                  :key="$index"
                  :label="column.fieldname"
                  align="center"
                  :min-width="column.width ? column.width : '120px'"
                  :show-overflow-tooltip="true"
                  v-if="column.show == '1'"
                >
                  <template slot-scope="scope">
                    <!--是否可以备课 -->
                    <template
                      v-if="
                        (scope.row.is_beike &&
                          $Tool.getStorage('postpart_isteregulator') == '1') ||
                        $Tool.getStorage('postpart_isteregulator') == '0'
                      "
                    >
                      <span
                        class="color-red"
                        v-if="
                          scope.row.hour_ischecking == '0' &&
                          column.fieldstring == 'hour_ischecking_name'
                        "
                        >{{ scope.row[column.fieldstring] }}</span
                      >
                      <span
                        class="color-red"
                        v-else-if="
                          scope.row.prepare_status == '0' &&
                          column.fieldstring == 'prepare_status_name'
                        "
                        >{{ scope.row[column.fieldstring] }}</span
                      >
                      <span class="color-4C5" v-else-if="column.isChangeStatus">
                        {{ scope.row[column.fieldstring] }}
                      </span>
                      <span v-else>{{ scope.row[column.fieldstring] }}</span>
                    </template>
                    <span class="color-ADB" v-else>{{
                      scope.row[column.fieldstring]
                    }}</span>
                  </template>
                </el-table-column>
              </template>
              <!-- 按钮操作组********start -->
              <el-table-column
                ref="fixedColumn"
                label="操作"
                align="center"
                width="120px"
                fixed="right"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    v-if="!scope.row.is_beike"
                    disabled
                    >{{ $t("Interesting.prepareLessons.btn_text1") }}</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    v-else
                    @click.native.prevent="handChhoosePrepare(scope.row)"
                    >{{ $t("Interesting.prepareLessons.btn_text1") }}</el-button
                  >
                </template>
              </el-table-column>
              <!-- 按钮操作组********end -->
            </el-table>
          </div>
          <!-- 分页 -->
          <el-pagination
            style="margin: 10px"
            :current-page.sync="paging1.curPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size.sync="paging1.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paging1.pageTotal"
            @current-change="curPageChange1"
            @size-change="pageSizeChange1"
          ></el-pagination>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import echarts from "echarts";
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import httpApi from "../../Interesting";
export default {
  name: "Interesting-prepareLessons-total",
  components: {
    progressTableCont,
    popTips,
    blank,
  },
  data() {
    return {
      currentIndex: 0, //切换模式
      chooseItem: false, //选择课时
      classId: "", //班级的class_id
      classInfo: {}, //单个班级的信息
      hourCheckInfo: {}, //单个课时的信息
      classCnname: "", //单个班级的中文名
      //筛选
      filter: {
        schoolId: "", //校园id
        course_id: "", //课程别id
        re_staffer_id: "", //教师id
        classroom_id: "", //教室id
        keyword: "", //关键词
        schoolList: [], //学校-下拉数据
        courseList: [], //课程别-下拉数据
        stafferList: [], //教师-下拉数据
        classRoomList: [], //教室-下拉数据
      },
      // 卡片模式列表数据
      cardModeList: [],
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
          tableHeight: 0, //表格高度
          moduleName: "Interesting", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "prepareLessons_total", //当前页面的名称，通常与路由名称一致
        },
      },
      tableListInventory: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: "0px", //表格高度
          moduleName: "Interesting", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "prepareLessons_total", //当前页面的名称，通常与路由名称一致
        },
      },
      // 分页--选择课时
      paging1: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0,
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0,
      },
    };
  },
  watch: {},
  computed: {},
  created() {
    console.log(11313);
    this.CoursewareHome(); //备课->我的班级
    this.getSchool(); //备课->下拉->选择校园 -- wgh
    this.getCourse(); //备课->下拉->选择课程别 -- wgh
    this.getClassroom(); //备课->下拉->选择教室 -- wgh
    this.getTeacher(); //备课->下拉->选择教师 -- wgh
  },
  methods: {
    //备课->我的班级
    CoursewareHome() {
      httpApi
        .CoursewareHome({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          // 筛选条件
          class_status: "", //班级状态 :0待进行1进行中（不传查全部）
          schoolId: this.filter.schoolId,
          course_id: this.filter.course_id,
          re_staffer_id: this.filter.re_staffer_id,
          classroom_id: this.filter.classroom_id,
          keyword: this.filter.keyword,
        })
        .then((res) => {
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
          if (res.data.error == 0) {
            this.tableList.list = res.data.result.list;
            this.cardModeList = res.data.result.list;
          } else {
            this.tableList.list = [];
            this.cardModeList = [];
            this.tableList.options.errortip = res.data.errortip;
          }
        });
    },
    //备课->卡片模式->选择课时 -- wgh
    getClasshour() {
      httpApi
        .getClasshour({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging1.curPage,
          num: this.paging1.pageSize,
          class_id: this.classId,
        })
        .then((res) => {
          this.classCnname = res.data.result.classname;
          this.$Tool.setStorage("prepareClassName", this.classCnname);
          this.paging1.pageTotal = parseInt(res.data.result.allnum);
          this.tableListInventory.columns = res.data.result.field;
          if (res.data.error == 0) {
            this.tableListInventory.list = res.data.result.list;
          } else {
            this.tableListInventory.list = [];
            this.tableListInventory.options.errortip = res.data.errortip;
          }
          this.chooseItem = true;
          this.$nextTick(() => {
            if (this.$refs["auto_slider_height_table"]) {
              this.tableListInventory.options.tableHeight = this.$Tool.getTableHeight(
                this.$refs.auto_slider_height_table.getBoundingClientRect()
                  .top + 72
              );
            }
          });
        });
    },
    //备课->下拉->选择校园 -- wgh
    getSchool() {
      this.$http.getSchool({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.schoolList = res.data.result.list;
        } else {
          this.filter.schoolList = [];
        }
      });
    },
    //备课->下拉->选择课程别 -- wgh
    getCourse() {
      this.$http.getCourse({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.courseList = res.data.result.list;
        } else {
          this.filter.courseList = [];
        }
      });
    },
    //备课->下拉->选择教室 -- wgh
    getClassroom() {
      this.$http.getClassroom({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.classRoomList = res.data.result.list;
        } else {
          this.filter.classRoomList = [];
        }
      });
    },
    //备课->下拉->选择教师 -- wgh
    getTeacher() {
      this.$http.getTeacher({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.stafferList = res.data.result.list;
        } else {
          this.filter.stafferList = [];
        }
      });
    },
    // 切换模式
    handClckTabs(item, index) {
      this.currentIndex = index;
      this.CoursewareHome(); //备课->我的班级
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.CoursewareHome(); //备课->我的班级
    },
    // 点击备课
    handPreparing(row) {
      console.log(row);
      this.classId = row.class_id;
      this.classInfo = row;
      this.getClasshour(); //备课->卡片模式->选择课时 -- wgh
    },
    // 选择课时--点击备课
    handChhoosePrepare(row) {
      console.log(row);
      this.hourCheckInfo = row;
      this.$router.push(
        `/Interesting/prepareLessons/preLessonDetais?class_id=${row.class_id}&course_branch=${row.course_branch}&hour_lessontimes=${row.hour_lessontimes}`
      );
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.CoursewareHome(); //备课->我的班级
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.CoursewareHome(); //备课->我的班级
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.CoursewareHome(); //备课->我的班级
    },
    // 页码变化--选择课时
    curPageChange1(v) {
      this.paging.curPage = v;
      this.getClasshour(); //备课->卡片模式->选择课时 -- wgh
    },
    // pageSize改变--选择课时
    pageSizeChange1() {
      this.paging.curPage = 1;
      this.getClasshour(); //备课->卡片模式->选择课时 -- wgh
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
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
.Interesting-prepareLessons-total {
}
</style>
