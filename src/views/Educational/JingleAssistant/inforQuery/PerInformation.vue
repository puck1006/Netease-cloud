<template>
  <div class="Sta-class-container">
    <div class="content-box bg-white flex1">
      <div class="flex-wrap pt12 flex-warp-line pl12 pr12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">消息类型</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.re_school_id"
              clearable
              filterable
              placeholder="不限"
              @change="search"
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
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">发送日期</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.re_school_id"
              clearable
              filterable
              placeholder="今天"
              @change="search"
            >
              <el-option
                v-for="item in filter.schoolList"
                :key="item.school_id"
                :label="item.school_cnname"
                :value="item.school_id"
              ></el-option>
            </el-select>
          </div>

          <div class="time-box ml12" style="width:320px;">
            <el-date-picker
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
          <span class="mr10 fs14 color-4C5">{{ $t("Interesting.prepareLessons.filter_name3") }}：</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.stafferId"
              @change="search"
              clearable
              filterable
              :placeholder="$t('Interesting.prepareLessons.placeholder3')"
            >
              <el-option
                v-for="(item,index) in filter.stafferList"
                :key="index"
                :label="item.staffer_cnname"
                :value="item.staffer_id"
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
              placeholder="学生姓名、内容"
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
    </div>
    <!-- 查看评价状况 -->
    <div class="small-dialog" v-if="seeWorkStatus">
      <el-dialog
        title="查看评价状况"
        :visible.sync="seeWorkStatus"
        width="700px"
        class="seeWorkStatus"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="评价 (14)" name="first">
              <ul class="fs12">
                <li class="flex-al mb24" v-for="(item,index) in 9" :key="index">
                  <img src="@/assets/images/avatar.jpg" alt />
                  <span class="ml4 mr4">李墨涵</span>
                  <i class="icon-girl"></i>
                  <!-- <i class="icon-boy"></i> -->
                  <span class="status ml5">评价</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="回评 (2)" name="second">
              <ul class="fs12">
                <li class="flex-al mb24" v-for="(item,index) in 9" :key="index">
                  <img src="@/assets/images/avatar.jpg" alt />
                  <span class="ml4 mr4">李墨涵</span>
                  <i class="icon-girl"></i>
                  <!-- <i class="icon-boy"></i> -->
                  <span class="status ml5">评价</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="出勤 (16)" name="third">
              <ul class="fs12">
                <li class="flex-al mb24" v-for="(item,index) in 9" :key="index">
                  <img src="@/assets/images/avatar.jpg" alt />
                  <span class="ml4 mr4">李墨涵</span>
                  <i class="icon-girl"></i>
                  <!-- <i class="icon-boy"></i> -->
                  <span class="status ml5">评价</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="seeWorkStatus = false">确 定</el-button>
          <el-button size="mini" @click="seeWorkStatus = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 上课明细 -->
    <div class="small-dialog" v-if="seeClassDetail">
      <el-dialog
        title="上课明细"
        :visible.sync="seeClassDetail"
        width="1000px"
        class="seeClassDetail"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <div class="tableDiv">
            <noBorderTableCont :tableData="tableList2" @handSetting="handSetting"></noBorderTableCont>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import progressAnaularTableCont from "@/components/tables/progressAnaularTableCont.vue";
import noBorderTableCont from "@/components/tables/noBorderTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
export default {
  name: "Educational-homeworkManage-jobQuery",
  components: {
    progressAnaularTableCont,
    noBorderTableCont
  },
  data() {
    let item2 = {
      a1: "2020-01-22 10:40-11:00",
      a2: "Eric",
      a3: "12",
      a4: "12",
      a5: "100%",
      a6: "12",
      a7: "100%"
    };
    let item = {
      a1: "幼儿初阶班",
      a2: "WK",
      a3: "23849384020",
      a4: "Eric",
      a5: "200",
      a6: "200",
      a7: "200",
      a8: "100%",
      a9: "200",
      a10: "100%"
    };
    return {
      tableList2: {
        // 表格的列
        columns: [
          {
            fieldname: "上课时间",
            fieldstring: "a1",
            show: 1,
            custom: 1
          },
          {
            fieldname: "上课老师",
            fieldstring: "a2",
            show: 1,
            custom: 1
          },
          {
            fieldname: "出勤人数",
            fieldstring: "a3",
            show: 1,
            custom: 1
          },
          {
            fieldname: "评价人数",
            fieldstring: "a4",
            show: 1,
            custom: 1
          },
          {
            fieldname: "评价率",
            fieldstring: "a5",
            show: 1,
            custom: 1,
            ismethod: 1
          },
          {
            fieldname: "回评人数",
            fieldstring: "a6",
            show: 1,
            custom: 1
          },
          {
            fieldname: "回评率",
            fieldstring: "a7",
            show: 1,
            custom: 1,
            ismethod: 1
          }
        ],
        // 表格数据
        list: Array(10).fill(item2),
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: 522, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "report_classReport" //当前页面的名称，通常与路由名称一致
        }
      },
      seeClassDetail: false,
      activeName: "first",
      seeWorkStatus: false,
      //筛选
      filter: {
        time: "",
        re_school_id: "", //校园id
        course_id: "", //课程别id
        re_staffer_id: "", //教师id
        schoolList: [], //学校-下拉数据
        courseList: [], //课程别-下拉数据
        stafferList: [], //教师-下拉数据
        keyword: "" //关键词
      },
      // 表格数据
      tableList: {
        // 表格的列
        columns: [
          {
            fieldname: "班级中文名",
            fieldstring: "a1",
            show: 1,
            custom: 1
          },
          {
            fieldname: "班级英文名",
            fieldstring: "a2",
            show: 1,
            custom: 1
          },
          {
            fieldname: "班级编号",
            fieldstring: "a3",
            show: 1,
            custom: 1
          },
          {
            fieldname: "老师",
            fieldstring: "a4",
            show: 1,
            custom: 1
          },
          {
            fieldname: "上课次数",
            fieldstring: "a5",
            show: 1,
            custom: 1,
            ismethod: 1
          },
          {
            fieldname: "出勤人数",
            fieldstring: "a6",
            show: 1,
            custom: 1
          },
          {
            fieldname: "评价人数",
            fieldstring: "a7",
            show: 1,
            custom: 1,
            ismethod: 1
          },
          {
            fieldname: "评价率",
            fieldstring: "a8",
            show: 1,
            custom: 1
          },
          {
            fieldname: "回评人数",
            fieldstring: "a9",
            show: 1,
            custom: 1,
            ismethod: 1
          },
          {
            fieldname: "回评率",
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
          issetting: false, //是否可以编辑列
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
      }
    };
  },
  created() {},
  watch: {},
  computed: {},
  methods: {
    handleColumnChange(k, v, col) {
      console.log(k, v, col);
      if (v.fieldname == "上课次数") {
        this.seeClassDetail = true;
      } else {
        this.seeWorkStatus = true;
      }
    },
    // tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取列表
    getStaClassReport() {
      httpApi
        .getStaClassReport({
          keyword: this.filter.keyword,
          course_id: this.filter.course_id,
          re_school_id: this.filter.re_school_id,
          re_staffer_id: this.filter.re_staffer_id,

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
    // 检索
    search() {
      this.paging.curPage = 1;
      // this.getStaClassReport();
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
      // this.getStaClassReport();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      // this.getStaClassReport();
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
.Sta-class-container {
  // 查看评价状况
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
</style>
