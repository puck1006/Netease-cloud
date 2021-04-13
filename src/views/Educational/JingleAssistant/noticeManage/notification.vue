<template>
  <div class="Educational-noticeManage-notification height100">
    <!-- 页面右边按钮***start -->
    <div class="right-btn">
      <el-button type="primary" size="mini" @click="handExport">
        {{ $t("Common.export") }}
      </el-button>
    </div>
    <div class="content-box bg-white flex1 pl12 pr12">
      <div class="flex-wrap pt12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">
            {{ $t("Educational.JingleAssistant.noticeManage.labe_text1") }}
          </span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.tiemRange"
              clearable
              filterable
              :placeholder="
                $t('Educational.JingleAssistant.noticeManage.placeholder1')
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
          <span class="mr10 fs14 color-666">{{
            $t("Educational.JingleAssistant.homeWork.labe_text11")
          }}</span>
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
          <span class="mr10 fs14 color-666">{{
            $t("Educational.JingleAssistant.noticeManage.labe_text2")
          }}</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.classId"
              filterable
              clearable
              :placeholder="
                $t('Educational.JingleAssistant.noticeManage.placeholder2')
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
          <span class="mr10 fs14 color-4C5">{{
            $t("Educational.JingleAssistant.noticeManage.labe_text3")
          }}</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.stafferId"
              clearable
              filterable
              :placeholder="
                $t('Educational.JingleAssistant.noticeManage.placeholder3')
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
                $t('Educational.JingleAssistant.noticeManage.placeholder4')
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
                >{{ $t("Common.btn_del") }}</el-button
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
    </div>
    <!-- 查看通知详情 -->
    <el-drawer
      :title="$t('Educational.JingleAssistant.noticeManage.title1')"
      :visible.sync="workDetailVisible"
      direction="rtl"
      size="700px"
      :modal="false"
      custom-class="pop-slider--box workDetail-box"
      :before-close="handleClose"
    >
      <div class="slider-content pt16 pb16">
        <div class="pl16 pr16">
          <div class="title fs18 tc">{{ detailInfo.message_title }}</div>
          <div class="fs14 mt10 tc color-aaa mb24">
            <span class="mr30">{{ detailInfo.message_createtime }}</span>
            <span class="mr30"
              >{{ $t("Educational.JingleAssistant.noticeManage.labe_text4")
              }}{{ detailInfo.staffer_cnname }}</span
            >
            <span>
              {{ $t("Educational.JingleAssistant.noticeManage.labe_text5") }}
              <span class="color-blue"
                >{{ detailInfo.readnum }}/{{ detailInfo.allnum }}</span
              >
            </span>
          </div>
          <div class="cont color-666" v-html="detailInfo.message_content">
            {{ detailInfo.message_content }}
          </div>
        </div>
        <div class="media-cont mt12 pl16 pr8">
          <previewMedia :fileList="detailInfo.message_mediajson"></previewMedia>
        </div>
      </div>
    </el-drawer>
    <!-- 查看通知完成状态 -->
    <div class="small-dialog" v-if="seeWorkStatus">
      <el-dialog
        :title="$t('Educational.JingleAssistant.noticeManage.title2')"
        :visible.sync="seeWorkStatus"
        width="700px"
        class="seeWorkStatus"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              :label="
                `${$t('Educational.JingleAssistant.noticeManage.tabs[0]')} (${
                  WorkStatusNum.readNum
                })`
              "
              name="first"
            >
              <ul v-if="WorkStatusList.length > 0" class="fs12">
                <li
                  class="flex-al mb24"
                  v-for="(item, index) in WorkStatusList"
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
                  <i
                    v-if="item.student_sex == $t('Common.woman')"
                    class="icon-girl"
                  ></i>
                  <i v-else class="icon-boy"></i>
                  <span class="status ml5">{{
                    item.message_isread == "1"
                      ? $t("Educational.JingleAssistant.noticeManage.status[0]")
                      : $t("Educational.JingleAssistant.noticeManage.status[1]")
                  }}</span>
                </li>
              </ul>
              <blank
                v-else
                :blankCont="
                  $t('Educational.JingleAssistant.noticeManage.blankTips[0]')
                "
              ></blank>
            </el-tab-pane>
            <el-tab-pane
              :label="
                `${$t('Educational.JingleAssistant.noticeManage.tabs[1]')} (${
                  WorkStatusNum.unreadnum
                })`
              "
              name="second"
            >
              <ul v-if="WorkStatusList.length > 0" class="fs12">
                <li
                  class="flex-al mb24"
                  v-for="(item, index) in WorkStatusList"
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
                  <i
                    v-if="item.student_sex == $t('Common.woman')"
                    class="icon-girl"
                  ></i>
                  <i v-else class="icon-boy"></i>
                  <span class="status ml5">{{
                    item.message_isread == "1"
                      ? $t("Educational.JingleAssistant.noticeManage.status[0]")
                      : $t("Educational.JingleAssistant.noticeManage.status[1]")
                  }}</span>
                </li>
              </ul>
              <blank
                v-else
                :blankCont="
                  $t('Educational.JingleAssistant.noticeManage.blankTips[1]')
                "
              ></blank>
            </el-tab-pane>
            <el-tab-pane
              :label="
                `${$t('Educational.JingleAssistant.noticeManage.tabs[2]')} (${
                  WorkStatusNum.allnum
                })`
              "
              name="three"
            >
              <ul v-if="WorkStatusList.length > 0" class="fs12">
                <li
                  class="flex-al mb24"
                  v-for="(item, index) in WorkStatusList"
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
                  <i
                    v-if="item.student_sex == $t('Common.woman')"
                    class="icon-girl"
                  ></i>
                  <i v-else class="icon-boy"></i>
                  <span class="status ml5">{{
                    item.message_isread == "1"
                      ? $t("Educational.JingleAssistant.noticeManage.status[0]")
                      : $t("Educational.JingleAssistant.noticeManage.status[1]")
                  }}</span>
                </li>
              </ul>
              <blank
                v-else
                :blankCont="
                  $t('Educational.JingleAssistant.noticeManage.blankTips[2]')
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
            >{{ $t("Common.btn_sure") }}</el-button
          >
          <el-button size="mini" @click="seeWorkStatus = false">{{
            $t("Common.btn_cancel")
          }}</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 删除弹框-->
    <popTips
      :dialogVisable="delVisible"
      :popTipsCont="popTips_del"
      @handConfirm="delMessageAction"
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
  name: "Educational-noticeManage-notification",
  components: {
    popTips,
    blank,
    previewMedia,
    normalTableCont
  },
  data() {
    return {
      workDetailVisible: false, //通知详情
      seeWorkStatus: false, //查看通知完成状态
      delVisible: false,
      activeName: "first",
      messageId: "", //通知id
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
          ColumnName: "JingleAssistant_notification" //当前页面的名称，通常与路由名称一致
        }
      },
      // 通知详情
      detailInfo: {
        media_json: []
      },
      // 通知完成状态
      WorkStatusNum: {
        allnum: 0,
        readNum: 0,
        unreadnum: 0
      },
      WorkStatusList: [],
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0
      }
    };
  },
  created() {
    this.PcClassMessage(); // 后台PC->班级通知列表-qyh
    this.getSchoolApi();
    this.MessageClassListPCApi();
    this.MessageTeaListPCApi();
  },
  watch: {},
  computed: {},
  methods: {
    // 后台PC->班级通知列表-qyh
    PcClassMessage() {
      httpApi
        .PcClassMessage({
          keyword: this.filter.keyword,
          start_time: this.filter.time ? this.filter.time[0] : "",
          end_time: this.filter.time ? this.filter.time[1] : "",
          re_school_id: this.filter.schoolId,
          class_id: this.filter.classId,
          worker_id: this.filter.stafferId,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1" //是否需要总数
        })
        .then(res => {
          this.paging.pageTotal = parseInt(res.data.result.all_num);
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
    //后台PC->学校下拉-qyh
    getSchoolApi() {
      httpApi.getSchoolApi({}).then(res => {
        if (res.data.error == "0") {
          this.filter.schoolList = res.data.result.list;
        } else {
          this.filter.schoolList = [];
        }
      });
    },
    //后台PC->班级下拉-qyh
    MessageClassListPCApi() {
      httpApi
        .MessageClassListPCApi({
          re_school_id: this.filter.schoolId
        })
        .then(res => {
          if (res.data.error == "0") {
            this.filter.classList = res.data.result.list;
          } else {
            this.filter.classList = [];
          }
        });
    },
    //后台PC->教师下拉-qyh
    MessageTeaListPCApi() {
      httpApi
        .MessageTeaListPCApi({
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
    //后台PC->查看阅读情况-qyh
    ReadSituation(type) {
      httpApi
        .ReadSituation({
          message_id: this.messageId,
          type: type //0全部1已读2未读
        })
        .then(res => {
          const result = res.data.result;
          this.WorkStatusNum = {
            allnum: result.allnum ? result.allnum : 0,
            readNum: result.readnum ? result.readnum : 0,
            unreadnum: result.unreadnum ? result.unreadnum : 0
          };
          this.WorkStatusList = result.data;
          this.seeWorkStatus = true;
        });
    },
    //后台PC->删除通知/公告-qyh
    delMessageAction() {
      httpApi
        .delMessageAction({
          message_id: this.messageId
        })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.PcClassMessage(); // 后台PC->班级通知列表-qyh
            this.delVisible = false;
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //班级通知（后台PC）->班级通知详情-qyh
    MessageDetail() {
      httpApi
        .MessageDetail({
          message_id: this.messageId
        })
        .then(res => {
          if (res.data.error == "0") {
            this.detailInfo = res.data.result.data;
          } else {
            this.detailInfo = {};
          }
          this.detailInfo.message_mediajson = this.detailInfo.message_mediajson
            ? JSON.parse(this.detailInfo.message_mediajson)
            : [];
          this.workDetailVisible = true;
        });
    },
    // 改学校检索
    changeSchool() {
      this.filter.classId = "";
      this.filter.stafferId = "";
      this.MessageClassListPCApi();
      this.search();
    },
    // 改班级检索
    changeClass() {
      this.filter.stafferId = "";
      this.MessageTeaListPCApi();
      this.search();
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.PcClassMessage(); // 后台PC->班级通知列表-qyh
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
      this.PcClassMessage(); // 后台PC->班级通知列表-qyh
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
      this.messageId = v3.message_id;
      if (v2.isTitle) {
        this.activeName = "first";
        this.ReadSituation(1); //后台PC->查看阅读情况-qyh
      } else {
        this.MessageDetail();
      }
    },
    // 点击删除
    handDel(row) {
      console.log(row);
      this.messageId = row.message_id;
      this.delVisible = true;
    },
    // tab切换
    handleClick(tab, event) {
      console.log(tab, event);
      this.WorkStatusList = []; //先清空数据
      if (this.activeName == "first") {
        this.ReadSituation(1); //后台PC->查看阅读情况-qyh
      } else if (this.activeName == "second") {
        this.ReadSituation(2); //后台PC->查看阅读情况-qyh
      } else {
        this.ReadSituation(0); //后台PC->查看阅读情况-qyh
      }
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
      let url = httpApi.PcClassMessage1();
      console.log(url);
      if (this.tableList.list.length > 0) {
        window.open(
          `${url}?is_export=1&language_type=${language_type}&staffer_id=${stafferId}&token=${token}&dataequity=${dataequity}&account_class=${account_class}&school_id=${schoolId}&company_id=${companyId}&re_postbe_id=${re_postbe_id}&start_time=${starttime}&end_time=${endtime}&class_id=${this.filter.classId}&re_school_id=${this.filter.schoolId}&worker_id=${this.filter.stafferId}&keyword=${this.filter.keyword}`,
          "_blank"
        );
      } else {
        this.$message.error(this.$t("Common.export_tips"));
      }
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.PcClassMessage(); // 后台PC->班级通知列表-qyh
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.PcClassMessage(); // 后台PC->班级通知列表-qyh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.PcClassMessage(); // 后台PC->班级通知列表-qyh
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
.Educational-noticeManage-notification {
  // 查看通知完成状态
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
// 通知详情
.workDetail-box {
  .cont {
    line-height: 20px;
  }
}
</style>
