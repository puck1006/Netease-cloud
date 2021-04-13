<template>
  <div class="Educational-noticeManage-noticeList height100">
    <!-- 页面右边按钮***start -->
    <!-- <div class="right-btn">
      <el-button type="primary" size="mini" @click="handExport">
        {{ $t("Interesting.report.btn_text1") }}
      </el-button>
    </div> -->
    <div class="content-box bg-white flex1 pl12 pr12">
      <div class="flex-wrap pt12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">{{
            $t("Educational.JingleAssistant.educationWork.child4.af")
          }}</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.tiemRange"
              clearable
              filterable
              :placeholder="
                $t('Educational.JingleAssistant.educationWork.child4.ag')
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
          <div class="time-box ml12" style="width:320px;">
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
                @click.native.prevent="handSee(scope.row)"
                >{{
                  $t("Educational.JingleAssistant.educationWork.child4.ah")
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
              >{{ $t("Educational.JingleAssistant.educationWork.child2.ah")
              }} : {{ detailInfo.staffer_cnname }}</span
            >
            <span>
              {{ $t("Educational.JingleAssistant.noticeManage.labe_text5") }}
              <span class="color-blue cur-pointer" @click="ReadSituation(1)"
                >{{ detailInfo.readnum }}/{{ detailInfo.allnum }}</span
              >
            </span>
          </div>
          <div class="cont color-666" v-html="detailInfo.message_content">{{ detailInfo.message_content }}</div>
        </div>
        <div class="media-cont mt12 pl16 pr8"> 
          <previewMedia :fileList="detailInfo.message_mediajson"></previewMedia>
        </div>
      </div>
    </el-drawer>
    <!-- 查看阅读状态 -->
    <div class="small-dialog" v-if="seeWorkStatus">
      <el-dialog
        :title="$t('Educational.JingleAssistant.educationWork.child4.ai')"
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
                  WorkStatusNum.readnum
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
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import blank from "@/components/common/Blank/blank.vue";
import previewMedia from "@/components/previewMedia/previewMedia.vue";
import httpApi from "../../../Educational.js";

export default {
  name: "Educational-noticeManage-noticeList",
  components: {
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
      //筛选
      filter: {
        time: "",
        tiemRange: "",
        starttime: "",
        endtime: "",
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
          issetting: false, //是否可以编辑列
          tableHeight: 0, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "JingleAssistant-noticeList" //当前页面的名称，通常与路由名称一致
        }
      },
      // 通知详情
      detailInfo: {
        media_json: []
      },
      // 通知完成状态
      WorkStatusNum: {
        allnum: 0,
        readnum: 0,
        noreadNum: 0
      },
      WorkStatusList: {},
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
          type: "1",
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
    //通知查询 阅读状态
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
            readnum: result.readnum ? result.readnum : 0,
            unreadnum: result.unreadnum ? result.unreadnum : 0
          };
          this.WorkStatusList = result.data;
          this.workDetailVisible = false;
          this.seeWorkStatus = true;
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
      this.PcClassMessage(); // 后台PC->班级通知列表-qyh
    },
    // 点击表格中的内容
    handleColumnChange(v1, v2, v3) {
      console.log(v1, v2, v3);
      this.messageId = v3.message_id;
      console.log(v3);
      this.ReadSituation(1); //通知查询 通知学生状态
    },
    // 点击查看
    handSee(row) {
      console.log(row);
      this.messageId = row.message_id;
      this.MessageDetail();
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
.Educational-noticeManage-noticeList {
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
