<template>
  <div class="Educational-complaint-schoolComplaint height100">
    <div class="content-box bg-white flex1 pl12 pr12">
      <div class="flex-wrap pt12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">
            {{ $t("Educational.JingleAssistant.complaint.labe_text1") }}
          </span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.tiemRange"
              clearable
              filterable
              :placeholder="
                $t('Educational.JingleAssistant.complaint.placeholder1')
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
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">{{
            $t("Educational.JingleAssistant.complaint.labe_text2")
          }}</span>
          <div class="time-box ml12" style="width:260px;">
            <el-date-picker
              v-model="filter.time"
              type="daterange"
              :range-separator="$t('Common.range_time')"
              value-format="yyyy-MM-dd"
              :start-placeholder="$t('Common.start_time')"
              :end-placeholder="$t('Common.end_time')"
              @clear="search"
              @change="search"
            ></el-date-picker>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width:280px;">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="
                $t('Educational.JingleAssistant.complaint.placeholder2')
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
        ></normalTableCont>
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
    <!-- 查看投诉与建议 -->
    <div class="small-dialog" v-if="seeComplaintDetail">
      <el-dialog
        :title="$t('Educational.JingleAssistant.complaint.title1')"
        :visible.sync="seeComplaintDetail"
        width="700px"
        class="seeComplaintDetail"
        :before-close="handleClose"
      >
        <div class="dialog-content color-243 fs14">
          <div class="flex-al color-4C5">
            <img class="img mr12" :src="SuggestList.student_img" v-if="SuggestList.student_img" alt />
            <img class="img mr12" src="@/assets/images/default-new-men.png" v-else alt />
            <div class="info">
              <p>{{ SuggestList.student_cnname }}</p>
              <p class="fs12 mt4">
                <span class="color-aaa mr4">{{
                  $t("Educational.JingleAssistant.complaint.labe_text3")
                }}</span>
                {{ SuggestList.complain_createtime }}
                <span class="color-aaa mr4 ml10">{{
                  $t("Educational.JingleAssistant.complaint.labe_text4")
                }}</span>
                {{ SuggestList.school_cnname }}
              </p>
            </div>
          </div>
          <div class="cont mt20 mb10">{{ SuggestList.complain_content }}</div>
          <div class="media-cont">
            <previewMedia
              :fileList="detailInfo.complain_mediajson"
            ></previewMedia>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="mini"
            @click="seeComplaintDetail = false"
            >{{ $t("Common.btn_sure") }}</el-button
          >
          <el-button size="mini" @click="seeComplaintDetail = false">{{
            $t("Common.btn_cancel")
          }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import previewMedia from "@/components/previewMedia/previewMedia.vue";
import JingleAssistantHttp from "../JingleAssistant";

export default {
  name: "Educational-complaint-schoolComplaint",
  components: {
    previewMedia,
    normalTableCont
  },
  data() {
    return {
      seeComplaintDetail: false, //查看投诉与建议
      activeName: "first",
      //筛选
      filter: {
        tiemRange: "",
        time: "",
        keyword: "", // 关键词
        // 时间范围-下拉数据
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
        ]
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
          ColumnName: "JingleAssistant_schoolComplaint" //当前页面的名称，通常与路由名称一致
        }
      },
      // 投诉与建议
      detailInfo: {
        complain_mediajson: []
      },
      SuggestList: {}, // 弹窗详情
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0
      }
    };
  },
  created() {
    this.ScComplainList(); // 投诉列表（学校）
  },
  watch: {},
  computed: {},
  methods: {
    // 投诉列表（学校）
    ScComplainList() {
      JingleAssistantHttp.ScComplainList({
        start_time: this.filter.time ? this.filter.time[0] : "",
        end_time: this.filter.time ? this.filter.time[1] : "",
        keyword: this.filter.keyword,
        p: this.paging.curPage,
        num: this.paging.pageSize,
        is_count: "1" //是否需要总数
      }).then(res => {
        this.paging.pageTotal = parseInt(res.data.result.all_num);
        this.tableList.columns = res.data.result.field;
        if (res.data.error == "0") {
          this.tableList.list = res.data.result.list; //表格数据
        } else {
          this.tableList.list = [];
          this.tableList.options.errortip = res.data.errortip;
        }
      });
    },
    // 时间范围检索
    tiemRangeSearch() {
      console.log(this.filter.tiemRange);
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
      this.ScComplainList(); // 投诉列表（学校）
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      if (this.filter.time != null) {
        this.filter.tiemRange = "";
      }
      this.ScComplainList(); // 投诉列表（学校）
    },
    // 点击表格中的内容
    handleColumnChange(v1, v2, v3) {
      console.log(v1, v2, v3);
      this.seeComplaintDetail = true;
      this.complain_id = v3.complain_id;
      this.ComplainDetail();
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v);
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.ScComplainList(); // 投诉列表（学校）
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.ScComplainList(); // 投诉列表（学校）
    },
    handleClose(done) {
      done();
    },
    // 详情 - 弹窗
    ComplainDetail() {
      JingleAssistantHttp.ComplainDetail({
        complain_id: this.complain_id
      }).then(res => {
        if (res.data.error == "0") {
          let string = res.data.result.data[0].complain_mediajson;
          this.detailInfo.complain_mediajson = JSON.parse(string);
          this.SuggestList = res.data.result.data[0];
        }
      });
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
.Educational-complaint-schoolComplaint {
  // 查看投诉与建议
  .seeComplaintDetail {
    .el-dialog__body {
      padding: 10px 16px;
      .img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
  }
}
</style>
