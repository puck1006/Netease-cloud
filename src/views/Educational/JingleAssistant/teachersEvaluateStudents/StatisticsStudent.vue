<template>
  <div class="staStudent-container" id="staStudent-container">
    <div class="content-box bg-white flex1">
      <div class="flex-wrap pt12 flex-warp-line pl12 pr12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">时间范围</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.code"
              clearable
              filterable
              placeholder="请选择时间范围"
              @change="search"
            >
              <el-option
                v-for="item in filter.codeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="time-box ml12" style="width:320px;">
            <el-date-picker
              @change="search"
              v-model="filter.time"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">{{ $t("Interesting.prepareLessons.filter_name2") }}：</span>
          <div class="select-box" style="width:170px;">
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
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">班级：</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.class_id"
              @change="search"
              clearable
              filterable
              placeholder="选择班级"
            >
              <el-option
                v-for="(item,index) in filter.classList"
                :key="index"
                :label="item.class_cnname"
                :value="item.class_id"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width:240px;">
            <el-input
              v-model="filter.keyword"
              clearable
              placeholder="请输入学员姓名"
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
        <progressAnaularTableCont
          @handleColumnChange="handleColumnChange"
          :tableData="tableList"
          @handSetting="handSetting"
        ></progressAnaularTableCont>
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
      <!-- 查看查看评价明细 -->
      <el-drawer
        title="查看评价明细"
        :visible.sync="isShowDetail"
        v-if="isShowDetail"
        direction="rtl"
        size="700px"
        :modal="false"
        custom-class="pop-slider--box workDetail-box"
        :before-close="handleClose"
      >
        <div class="slider-content Stu-comment-detail pt16 pb16">
          <div class="user-container">
            <img :src="commmentDetail.student_img" v-if="commmentDetail.student_img" alt />
            <img src="@/assets/images/default-new-men.png" v-else alt />
            <span class="ml10">{{commmentDetail.student_cnname}}</span>
          </div>
          <div class="info-container">
            <ul>
              <li class="li-item">
                <div class="label">班级 :</div>
                <div class="content">{{commmentDetail.class_cnname}}</div>
              </li>
              <li>
                <div class="label">上课老师 :</div>
                <div class="content">{{commmentDetail.staffer_cnname}}</div>
              </li>
              <li>
                <div class="label">上课时间 :</div>
                <div class="content">{{commmentDetail.hour_time}}</div>
              </li>
              <li>
                <div class="label">上课内容 :</div>
                <div class="content" style="color:#666666;" v-html="commmentDetail.hour_content"></div>
              </li>
            </ul>
          </div>
          <div class="comment-bottom">
            <p>评价信息</p>
            <div class="rate-container">
              <div class="rate-item" v-for="(item, index) in startList" :key="index">
                <span class="label">{{item.sturemarkstar_name}}</span>
                <el-rate v-model="item.sturemarkstar_score" disabled text-color="#ff9900"></el-rate>
              </div>
            </div>
            <template v-if="startList">
              <div
                class="content-info"
              >{{startList[0].sturemark_comment ? startList[0].sturemark_comment : ''}}</div>
              <div class="media-cont mt12 pr8">
                <previewMedia :fileList="startList[0].sturemark_picturejson"></previewMedia>
              </div>
            </template>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import progressAnaularTableCont from "@/components/tables/progressAnaularTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import httpApi from "../../Educational";
import previewMedia from "@/components/previewMedia/previewMedia.vue";
import blank from "@/components/common/Blank/blank.vue";
export default {
  name: "Educational-homeworkManage-jobQuery",
  components: {
    progressAnaularTableCont,
    previewMedia
  },
  data() {
    let item = {
      a1: "幼儿初阶班",
      a2: "WK",
      a3: "23849384020",
      a4: "Eric",
      a5: "200",
      a6: "200",
      a7: "200",
      a8: "100%",
      a9: "评价明细",
      a10: "100%"
    };
    return {
      rateData: [
        { label: "学习表现", value: 3 },
        { label: "行为表现", value: 3 },
        { label: "参与度", value: 3 },
        { label: "作业缴交", value: 3 }
      ],
      isShowDetail: false,
      startList: [],
      commmentDetail: "",
      commentInfo: "",
      detailInfo: {
        media_json: [
          {
            type: "img",
            url:
              "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
          },
          {
            type: "img",
            url:
              "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
          },
          {
            type: "img",
            url:
              "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
          },
          {
            type: "img",
            url:
              "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
          }
        ]
      },
      // 表格数据
      tableList: {
        // 表格的列
        columns: [
          {
            fieldname: "学员中文名",
            fieldstring: "a1",
            show: 1,
            custom: 1
          },
          {
            fieldname: "学员英文名",
            fieldstring: "a2",
            show: 1,
            custom: 1
          },
          {
            fieldname: "学员编号",
            fieldstring: "a3",
            show: 1,
            custom: 1
          },
          {
            fieldname: "班级",
            fieldstring: "a4",
            show: 1,
            custom: 1
          },
          {
            fieldname: "课程别",
            fieldstring: "a5",
            show: 1,
            custom: 1
          },
          {
            fieldname: "上课老师",
            fieldstring: "a6",
            show: 1,
            custom: 1
          },
          {
            fieldname: "上课时间",
            fieldstring: "a7",
            show: 1,
            custom: 1
          },
          {
            fieldname: "上课内容",
            fieldstring: "a8",
            show: 1,
            custom: 1
          },
          {
            fieldname: "老师评价",
            fieldstring: "a9",
            show: 1,
            custom: 1,
            ismethod: 1
          },
          {
            fieldname: "学习意愿",
            fieldstring: "a10",
            show: 1,
            custom: 1
          }
        ],
        // 表格数据
        list: Array(10).fill(item),
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: true, //是否可以编辑列
          tableHeight: 0, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "report_classReport" //当前页面的名称，通常与路由名称一致
        }
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0
      },
      //筛选
      filter: {
        codeList: [
          { label: "不限", value: "0" },
          { label: "今日", value: "1" },
          { label: "昨日", value: "2" },
          { label: "本周", value: "3" },
          { label: "近七天", value: "4" },
          { label: "近30天", value: "5" },
          { label: "本月", value: "6" },
          { label: "上月", value: "7" }
        ],
        code: "",
        class_id: "",
        time: [],
        start_time: "",
        end_time: "", //校园id
        keyword: "", //课程别id
        course_id: "", //教师id
        courseList: [], //课程别-下拉数据
        classList: [] //教师-下拉数据
      }
    };
  },
  created() {
    this.StudentList();
    this.getClassJingle();
    this.getCourseJingle();
  },
  watch: {},
  computed: {},
  methods: {
    EvaluateDetail() {
      httpApi
        .EvaluateDetail({
          student_id: this.commentInfo.student_id
        })
        .then(res => {
          if (res.data.error == 0) {
            this.commmentDetail = res.data.result.list.list;
            this.startList = res.data.result.list.staffer;
            this.startList &&
              this.startList.forEach(item => {
                item.sturemarkstar_score = Number(item.sturemarkstar_score);
                item.sturemark_picturejson = JSON.parse(
                  item.sturemark_picturejson
                );
              });

            this.isShowDetail = true;
          }
        });
    },
    getClassJingle() {
      httpApi.getClassJingle({}).then(res => {
        this.filter.classList = res.data.result.list;
      });
    },
    getCourseJingle() {
      httpApi.getCourseJingle({}).then(res => {
        this.filter.courseList = res.data.result.list;
      });
    },
    StudentList() {
      if (!this.filter.time) {
        this.filter.time = [];
      }
      httpApi
        .StudentList({
          code: this.filter.code,
          start_time: this.filter.time.length != 0 ? this.filter.time[0] : "",
          end_time: this.filter.time.length != 0 ? this.filter.time[1] : "",
          keyword: this.filter.keyword,
          course_id: this.filter.course_id,
          class_id: this.filter.class_id,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1",
          is_export: ""
        })
        .then(res => {
          let { field, allnum, list } = res.data.result;
          this.tableList.columns = field;
          this.tableList.columns.forEach(item => {
            if (item.fieldname == "老师评价") {
              item.ismethod = 1;
            }
          });
          if (res.data.error == 0) {
            this.tableList.list = list;
            this.paging.pageTotal = Number(allnum);
            this.tableList.list.forEach(item => {
              item.staffer_appraise = "评价明细";
            });
          } else {
            this.tableList.list = [];
            this.paging.pageTotal = 0;
          }
        });
    },
    handleColumnChange(k, v, col) {
      this.commentInfo = col;
      console.log(k, v, col);
      if (v.fieldstring == "staffer_appraise") {
        this.EvaluateDetail();
      }
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.StudentList();
    },
    // 点击删除
    handDel(row) {
      console.log(row);
    },
    // 导出
    handExport() {
      // const token = this.$userDetails.token;
      // const stafferId = this.$userDetails.stafferId;
      // const schoolId = this.$userDetails.schoolId;
      // const companyId = this.$userDetails.companyId;
      // const re_postbe_id = this.$userDetails.re_postbe_id;
      // const dataequity = this.$userDetails.dataequity;
      // const account_class = this.$userDetails.account_class;
      // let url = httpApi.SchoolExport();
      // console.log(url);
      // if (this.tableList.list.length > 0) {
      //   window.open(
      //     `${url}?staffer_id=${stafferId}&token=${token}&dataequity=${dataequity}&account_class=${account_class}&school_id=${schoolId}&company_id=${companyId}&re_postbe_id=${re_postbe_id}&date=${this.filter.time}&schoolId=${this.filter.schoolId}`,
      //     "_blank"
      //   );
      // } else {
      //   this.$message.error("没有可导出的数据哦");
      // }
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      // this.getStaClassReport();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.StudentList();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.StudentList();
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
.Stu-comment-detail {
  padding: 15px;
  .user-container {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  .info-container {
    border-bottom: 1px dashed #dddddd;
    padding-bottom: 15px;
    ul {
      margin-top: 5px;
      li {
        display: flex;
        padding: 5px;
        padding-left: 0;
        .label {
          width: 80px;
          font-size: 14px;
          color: rgba(170, 170, 170, 1);
          line-height: 20px;
        }
        .content {
          flex: 1;
          font-size: 14px;
          color: rgba(36, 53, 106, 1);
          line-height: 20px;
        }
      }
    }
  }
  .comment-bottom {
    p {
      font-size: 18px;
      color: rgba(36, 53, 106, 1);
      line-height: 25px;
    }
    padding-top: 15px;
    .rate-container {
      padding-top: 5px;
      .rate-item {
        display: flex;
        padding: 8px;
        .label {
          display: inline-block;
          width: 70px;
          margin-right: 14px;
        }
      }
    }
    .content-info {
      padding: 8px;
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
      line-height: 24px;
    }
  }
}
.staStudent-container {
}
</style>
