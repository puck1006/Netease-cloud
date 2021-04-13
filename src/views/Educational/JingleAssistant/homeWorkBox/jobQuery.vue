<template>
  <div class="Educational-homeworkManage-jobQuery height100">
    <!-- 页面右边按钮***start -->
    <div class="right-btn">
      <el-button type="primary" size="mini" @click="handExport">{{ $t("Common.export") }}</el-button>
    </div>
    <div class="content-box bg-white flex1 pl12 pr12">
      <div class="flex-wrap pt12">
        <div class="flex-al mb12">
          <span
            class="mr10 fs14 color-4C5"
          >{{ $t("Educational.JingleAssistant.homeWork.labe_text1") }}</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.tiemRange"
              clearable
              filterable
              :placeholder="
                $t('Educational.JingleAssistant.homeWork.placeholder1')
              "
              @change="tiemRangeSearch"
            >
              <el-option
                v-for="item in filter.timeList"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="time-box ml12" style="width:260px;">
            <el-date-picker
              v-model="filter.time"
              type="daterange"
              :range-separator="$t('Common.range_time')"
              value-format="yyyy-MM-dd"
              :start-placeholder="$t('Common.start_time')"
              :end-placeholder="$t('Common.end_time')"
              @change="timeSearch"
            ></el-date-picker>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <!-- <div class="flex-al mb12">
          <span class="mr10 fs14 color-666">
            {{
            $t("Educational.JingleAssistant.homeWork.labe_text11")
            }}
          </span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.schoolId"
              filterable
              clearable
              :placeholder="
                $t('Educational.JingleAssistant.homeWork.placeholder11')
              "
              @change="changeSchool"
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
        <div class="lines ml16 mr16 mb12"></div> -->
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-666">
            {{
            $t("Educational.JingleAssistant.homeWork.labe_text2")
            }}
          </span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.classId"
              filterable
              clearable
              :placeholder="
                $t('Educational.JingleAssistant.homeWork.placeholder2')
              "
              @change="changeClass"
            >
              <el-option
                v-for="item in filter.classList"
                :key="item.class_id"
                :label="item.class_cnname"
                :value="item.class_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">
            {{
            $t("Educational.JingleAssistant.homeWork.labe_text3")
            }}
          </span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.stafferId"
              clearable
              filterable
              :placeholder="
                $t('Educational.JingleAssistant.homeWork.placeholder3')
              "
              @change="search"
            >
              <el-option
                v-for="item in filter.stafferList"
                :key="item.staffer_id"
                :label="item.staffer_cnname"
                :value="item.staffer_id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width:200px;">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="
                $t('Educational.JingleAssistant.homeWork.placeholder4')
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
          >{{ $t("Common.input_button") }}</el-button>
        </div>
      </div>
      <div class="tableDiv" ref="auto_height_table">
        <normalTableCont
          :tableData="tableList"
          @handleColumnChange="handleColumnChange"
          @handSetting="handSetting"
        >
          <!-- 按钮操作组********start -->
          <el-table-column
            ref="fixedColumn"
            :label="$t('Common.table_operate')"
            align="center"
            width="120px"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="handDel(scope.row)"
              >{{ $t("Common.btn_del") }}</el-button>
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
    </div>
    <!-- 查看作业详情 -->
    <el-drawer
      :title="$t('Educational.JingleAssistant.homeWork.title1')"
      :visible.sync="workDetailVisible"
      direction="rtl"
      size="700px"
      :modal="false"
      custom-class="pop-slider--box workDetail-box"
      :before-close="handleClose"
    >
      <div class="slider-content pt16 pb16">
        <div class="pl16 pr16">
          <div class="title fs18 tc">{{ detailInfo.homework_title }}</div>
          <div class="fs14 mt10 tc color-aaa mb24">
            <span class="mr30">{{ detailInfo.homework_createtime }}</span>
            <span>
              {{ $t("Educational.JingleAssistant.homeWork.labe_text4")
              }}{{ detailInfo.staffer_cnname }}
            </span>
          </div>
          <div class="cont color-666" v-html="detailInfo.homework_content"></div>
        </div>
        <div class="media-cont mt12 pl16 pr8">
          <previewMedia :fileList="detailInfo.homework_mediajson"></previewMedia>
        </div>
      </div>
    </el-drawer>
    <!-- 查看作业完成状态 -->
    <div class="small-dialog" v-if="seeWorkStatus">
      <el-dialog
        :title="$t('Educational.JingleAssistant.homeWork.title2')"
        :visible.sync="seeWorkStatus"
        width="700px"
        class="seeWorkStatus"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              :label="
                `${$t('Educational.JingleAssistant.homeWork.tabs[0]')} (${
                  WorkStatusNum.readNum
                })`
              "
              name="first"
            >
              <ul v-if="WorkStatusList.readlist.length > 0" class="fs12">
                <li
                  class="flex-al mb24"
                  v-for="(item, index) in WorkStatusList.readlist"
                  :key="index"
                >
                  <img
                    v-if="item.student_img && item.student_img != ''"
                    :src="item.student_img"
                    alt
                  />
                  <img
                    v-else-if="item.student_sex == $t('Common.woman')"
                    src="@/assets/images/woman.png"
                    alt
                  />
                  <img v-else src="@/assets/images/default-new-men.png" alt />
                  <span class="ml4 mr4">{{ item.student_cnname }}</span>
                  <i v-if="item.student_sex == $t('Common.woman')" class="icon-girl"></i>
                  <i v-else class="icon-boy"></i>
                  <span class="status ml5">{{ item.stustate }}</span>
                </li>
              </ul>
              <blank
                v-else
                :blankCont="
                  $t('Educational.JingleAssistant.homeWork.blankTips[0]')
                "
              ></blank>
            </el-tab-pane>
            <el-tab-pane
              :label="
                `${$t('Educational.JingleAssistant.homeWork.tabs[1]')} (${
                  WorkStatusNum.noreadNum
                })`
              "
              name="second"
            >
              <ul v-if="WorkStatusList.noreadlist.length > 0" class="fs12">
                <li
                  class="flex-al mb24"
                  v-for="(item, index) in WorkStatusList.noreadlist"
                  :key="index"
                >
                  <img
                    v-if="item.student_img && item.student_img != ''"
                    :src="item.student_img"
                    alt
                  />
                  <img
                    v-else-if="item.student_sex == $t('Common.woman')"
                    src="@/assets/images/woman.png"
                    alt
                  />
                  <img v-else src="@/assets/images/default-new-men.png" alt />
                  <span class="ml4 mr4">{{ item.student_cnname }}</span>
                  <i v-if="item.student_sex == $t('Common.woman')" class="icon-girl"></i>
                  <i v-else class="icon-boy"></i>
                  <span class="status ml5">{{ item.stustate }}</span>
                </li>
              </ul>
              <blank
                v-else
                :blankCont="
                  $t('Educational.JingleAssistant.homeWork.blankTips[1]')
                "
              ></blank>
            </el-tab-pane>
            <el-tab-pane
              :label="
                `${$t('Educational.JingleAssistant.homeWork.tabs[2]')} (${
                  WorkStatusNum.submitNum
                })`
              "
              name="third"
            >
              <ul v-if="WorkStatusList.submitlist.length > 0" class="fs12">
                <li
                  class="flex-al mb24"
                  v-for="(item, index) in WorkStatusList.submitlist"
                  :key="index"
                >
                  <img
                    v-if="item.student_img && item.student_img != ''"
                    :src="item.student_img"
                    alt
                  />
                  <img
                    v-else-if="item.student_sex == $t('Common.woman')"
                    src="@/assets/images/woman.png"
                    alt
                  />
                  <img v-else src="@/assets/images/default-new-men.png" alt />
                  <span class="ml4 mr4">{{ item.student_cnname }}</span>
                  <i v-if="item.student_sex == $t('Common.woman')" class="icon-girl"></i>
                  <i v-else class="icon-boy"></i>
                  <span class="status ml5">{{ item.stustate }}</span>
                </li>
              </ul>
              <blank
                v-else
                :blankCont="
                  $t('Educational.JingleAssistant.homeWork.blankTips[2]')
                "
              ></blank>
            </el-tab-pane>
            <el-tab-pane
              :label="
                `${$t('Educational.JingleAssistant.homeWork.tabs[3]')} (${
                  WorkStatusNum.commentNum
                })`
              "
              name="fourth"
            >
              <ul v-if="WorkStatusList.commentlist.length > 0" class="fs12">
                <li
                  class="flex-al mb24"
                  v-for="(item, index) in WorkStatusList.commentlist"
                  :key="index"
                >
                  <img
                    v-if="item.student_img && item.student_img != ''"
                    :src="item.student_img"
                    alt
                  />
                  <img
                    v-else-if="item.student_sex == $t('Common.woman')"
                    src="@/assets/images/woman.png"
                    alt
                  />
                  <img v-else src="@/assets/images/default-new-men.png" alt />
                  <span class="ml4 mr4">{{ item.student_cnname }}</span>
                  <i v-if="item.student_sex == $t('Common.woman')" class="icon-girl"></i>
                  <i v-else class="icon-boy"></i>
                  <span class="status ml5">{{ item.stustate }}</span>
                </li>
              </ul>
              <blank
                v-else
                :blankCont="
                  $t('Educational.JingleAssistant.homeWork.blankTips[3]')
                "
              ></blank>
            </el-tab-pane>
            <el-tab-pane
              :label="
                `${$t('Educational.JingleAssistant.homeWork.tabs[4]')} (${
                  WorkStatusNum.allnum
                })`
              "
              name="five"
            >
              <ul v-if="WorkStatusList.alllist.length > 0" class="fs12">
                <li
                  class="flex-al mb24"
                  v-for="(item, index) in WorkStatusList.alllist"
                  :key="index"
                >
                  <img
                    v-if="item.student_img && item.student_img != ''"
                    :src="item.student_img"
                    alt
                  />
                  <img
                    v-else-if="item.student_sex == $t('Common.woman')"
                    src="@/assets/images/woman.png"
                    alt
                  />
                  <img v-else src="@/assets/images/default-new-men.png" alt />
                  <span class="ml4 mr4">{{ item.student_cnname }}</span>
                  <i v-if="item.student_sex == $t('Common.woman')" class="icon-girl"></i>
                  <i v-else class="icon-boy"></i>
                  <span class="status ml5">{{ item.stustate }}</span>
                </li>
              </ul>
              <blank
                v-else
                :blankCont="
                  $t('Educational.JingleAssistant.homeWork.blankTips[4]')
                "
              ></blank>
            </el-tab-pane>
          </el-tabs>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="mini"
            @click="seeWorkStatus = false"
          >{{ $t("Common.btn_sure") }}</el-button>
          <el-button size="mini" @click="seeWorkStatus = false">
            {{
            $t("Common.btn_cancel")
            }}
          </el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 删除弹框-->
    <popTips
      :dialogVisable="delVisible"
      :popTipsCont="popTips_del"
      @handConfirm="delHomeworkOneApi"
      @handCancel="delVisible = false"
      @handleCloseTip="delVisible = false"
    ></popTips>
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import previewMedia from "@/components/previewMedia/previewMedia.vue";
import httpApi from "../../Educational.js";

export default {
  name: "Educational-homeworkManage-jobQuery",
  components: {
    popTips,
    blank,
    previewMedia,
    normalTableCont
  },
  data() {
    return {
      workDetailVisible: false, //作业详情
      class_idData: "", //作业详情
      seeWorkStatus: false, //查看作业完成状态
      delVisible: false,
      activeName: "first",
      homeworkId: "", //作业id
      // 删除提示弹窗
      popTips_del: {
        btn_text1: this.$t("Common.btn_sure"),
        btn_text2: this.$t("Common.btn_cancel"),
        title: this.$t("Common.popTips"),
        context: this.$t("Common.popTips_del")
      },
      //筛选
      filter: {
        time: "",
        tiemRange: "",
        starttime: "",
        endtime: "",
        schoolId: "",
        classId: "",
        stafferId: "",
        //时间范围-下拉数据
        timeList: [
          {
            text: this.$t("Educational.JingleAssistant.timeListText[0]"),
            value: ""
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[1]"),
            value: "today"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[2]"),
            value: "yesterday"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[3]"),
            value: "week"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[4]"),
            value: "sevenDay"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[5]"),
            value: "threeDay"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[6]"),
            value: "thisMonth"
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[7]"),
            value: "prevMonth"
          }
        ],
        schoolList: [], //学校-下拉数据
        classList: [], //班级-下拉数据
        stafferList: [], //教师-下拉数据
        keyword: "" //关键词
      },
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
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "JingleAssistant_jobQuery" //当前页面的名称，通常与路由名称一致
        }
      },
      // 作业详情
      detailInfo: {
        media_json: []
      },
      // 作业完成状态
      WorkStatusNum: {
        allnum: 0,
        readNum: 0,
        noreadNum: 0,
        submitNum: 0,
        commentNum: 0
      },
      WorkStatusList: {
        readlist: [],
        noreadlist: [],
        submitlist: [],
        commentlist: [],
        alllist: []
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
    this.homeworkListPCApi(); // 后台PC->作业查询 管理列表 -- 97
    this.homeworkSchListPCApi();
    this.homeworkClassListPCApi();
    this.homeworkTeaListPCApi();
  },
  watch: {},
  computed: {},
  methods: {
    // 后台PC->作业查询 管理列表 -- 97
    homeworkListPCApi() {
      httpApi
        .homeworkListPCApi({
          keyword: this.filter.keyword,
          starttime: this.filter.time ? this.filter.time[0] : "",
          endtime: this.filter.time ? this.filter.time[1] : "",
          class_id: this.filter.classId,
          from_staffer_id: this.filter.stafferId,
          from_school_id: this.filter.schoolId,
          p: this.paging.curPage,
          num: this.paging.pageSize,
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
    //后台PC->作业查询 学校列表- 97
    homeworkSchListPCApi() {
      httpApi.homeworkSchListPCApi({}).then(res => {
        if (res.data.error == "0") {
          this.filter.schoolList = res.data.result.list;
        } else {
          this.filter.schoolList = [];
        }
      });
    },
    //后台PC->作业查询 班级列表- 97
    homeworkClassListPCApi() {
      httpApi
        .homeworkClassListPCApi({
          from_school_id: this.filter.schoolId
        })
        .then(res => {
          if (res.data.error == "0") {
            this.filter.classList = res.data.result.list;
          } else {
            this.filter.classList = [];
          }
        });
    },
    //后台PC->作业查询 老师列表- 97
    homeworkTeaListPCApi() {
      httpApi
        .homeworkTeaListPCApi({
          class_id: this.filter.classId
        })
        .then(res => {
          if (res.data.error == "0") {
            this.filter.stafferList = res.data.result.list;
          } else {
            this.filter.stafferList = [];
          }
        });
    },
    //作业查询 作业学生状态
    homeworkStuStatePCApi() {
      httpApi
        .homeworkStuStatePCApi({
          homework_id: this.homeworkId,
          class_id: this.class_idData
        })
        .then(res => {
          let { list, num } = res.data.result;
          num = num[0];
          this.WorkStatusNum = {
            allnum: num.allnum ? num.allnum : 0,
            readNum: num.readNum ? num.readNum : 0,
            noreadNum: num.noreadNum ? num.noreadNum : 0,
            submitNum: num.submitNum ? num.submitNum : 0,
            commentNum: num.commentNum ? num.commentNum : 0
          };
          this.WorkStatusList = {
            readlist: list.readlist ? list.readlist : [],
            noreadlist: list.noreadlist ? list.noreadlist : [],
            submitlist: list.submitlist ? list.submitlist : [],
            commentlist: list.commentlist ? list.commentlist : [],
            alllist: list.alllist ? list.alllist : []
          };
          this.seeWorkStatus = true;
        });
    },
    //后台PC->作业查询 删除一个作业- 97
    delHomeworkOneApi() {
      httpApi
        .delHomeworkOneApi({
          homework_id: this.homeworkId
        })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.homeworkListPCApi(); // 后台PC->作业查询 管理列表 -- 97
            this.delVisible = false;
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //作业->家庭作业详情-（适用后台PC-97）-zjb
    homeworkItemApi() {
      httpApi
        .homeworkItemApi({
          homework_id: this.homeworkId
        })
        .then(res => {
          if (res.data.error == "0") {
            this.detailInfo = res.data.result.list;
          } else {
            this.detailInfo = {};
          }
          this.detailInfo.homework_mediajson = this.detailInfo
            .homework_mediajson
            ? JSON.parse(this.detailInfo.homework_mediajson)
            : [];
          this.workDetailVisible = true;
        });
    },
    // 改学校检索
    changeSchool() {
      this.filter.classId = "";
      this.filter.stafferId = "";
      this.homeworkClassListPCApi();
      this.search();
    },
    // 改班级检索
    changeClass() {
      this.filter.stafferId = "";
      this.homeworkTeaListPCApi();
      this.search();
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.homeworkListPCApi(); // 后台PC->作业查询 管理列表 -- 97
    },
    // 时间范围检索
    tiemRangeSearch() {
      this.paging.curPage = 1;
      switch (this.filter.tiemRange) {
        case "today":
          this.filter.starttime = this.$Tool.getDay(0);
          this.filter.endtime = this.filter.starttime;
          break;
        case "yesterday":
          this.filter.starttime = this.$Tool.getDay(-1);
          this.filter.endtime = this.filter.starttime;
          break;
        case "week":
          console.log(this.$Tool.getAppointedDate(1, 0).startDate);
          this.filter.starttime = this.$Tool.getAppointedDate(1, 0).startDate;
          this.filter.endtime = this.$Tool.getAppointedDate(1, 0).endDate;
          break;
        case "sevenDay":
          this.filter.starttime = this.$Tool.getDay(-7);
          this.filter.endtime = this.$Tool.getDay(0);
          break;
        case "threeDay":
          this.filter.starttime = this.$Tool.getDay(-30);
          this.filter.endtime = this.$Tool.getDay(0);
          break;
        case "thisMonth":
          this.filter.starttime = this.$Tool.getAppointedDate(2, 0).startDate;
          this.filter.endtime = this.$Tool.getAppointedDate(2, 0).endDate;
          break;
        case "prevMonth":
          console.log(this.$Tool.getAppointedDate(2, 1).startDate);
          this.filter.starttime = this.$Tool.getAppointedDate(2, 1).startDate;
          this.filter.endtime = this.$Tool.getAppointedDate(2, 1).endDate;
          break;
        default:
          this.filter.starttime = "";
          this.filter.endtime = "";
          break;
      }
      this.filter.time = [this.filter.starttime, this.filter.endtime];
      this.homeworkListPCApi(); // 后台PC->作业查询 管理列表 -- 97
    },
    // 时间检索
    timeSearch() {
      this.filter.tiemRange = "";
      this.paging.curPage = 1;
      this.homeworkListPCApi(); // 后台PC->作业查询 管理列表 -- 97
    },
    // 点击表格中的内容
    handleColumnChange(v1, v2, v3) {
      console.log(v1, v2, v3);
      this.homeworkId = v3.homework_id;
      this.class_idData = v3.class_id;
      if (v2.isTitle) {
        this.homeworkItemApi();
      } else {
        this.homeworkStuStatePCApi(); //作业查询 作业学生状态
      }
    },
    // 点击删除
    handDel(row) {
      console.log(row);
      this.homeworkId = row.homework_id;
      this.delVisible = true;
    },
    // tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 导出
    handExport() {
      const token = this.$userDetails.token;
      const stafferId = this.$userDetails.stafferId;
      const schoolId = this.$userDetails.schoolId;
      const companyId = this.$userDetails.companyId;
      const re_postbe_id = this.$userDetails.re_postbe_id;
      const dataequity = this.$userDetails.dataequity;
      const account_class = this.$userDetails.account_class;
      const language_type = this.$userDetails.language_type;
      let starttime = this.filter.time ? this.filter.time[0] : "";
      let endtime = this.filter.time ? this.filter.time[1] : "";
      let url = httpApi.homeworkListPCApi1();
      console.log(url);
      if (this.tableList.list.length > 0) {
        window.open(
          `${url}?is_export=1&language_type=${language_type}&staffer_id=${stafferId}&token=${token}&dataequity=${dataequity}&account_class=${account_class}&school_id=${schoolId}&company_id=${companyId}&re_postbe_id=${re_postbe_id}&starttime=${starttime}&endtime=${endtime}&from_school_id=${this.filter.schoolId}&class_id=${this.filter.classId}&from_staffer_id=${this.filter.stafferId}&keyword=${this.filter.keyword}`,
          "_blank"
        );
      } else {
        this.$message.error(this.$t("Common.export_tips"));
      }
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.homeworkListPCApi(); // 后台PC->作业查询 管理列表 -- 97
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.homeworkListPCApi(); // 后台PC->作业查询 管理列表 -- 97
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.homeworkListPCApi(); // 后台PC->作业查询 管理列表 -- 97
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
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
.Educational-homeworkManage-jobQuery {
  // 查看作业完成状态
  .seeWorkStatus {
    .el-dialog__body {
      padding: 10px 16px;
      .dialog-content ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        li {
          width: 33.33%;
          img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
          }
          .status {
            display: inline-block;
            padding: 0 4px;
            color: #00b100;
            border: 1px solid rgba(28, 173, 6, 1);
          }
        }
      }
    }
  }
}
// 作业详情
.workDetail-box {
  .cont {
    line-height: 20px;
  }
}
</style>
