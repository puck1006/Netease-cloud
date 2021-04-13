<template>
  <div class="CareerGrowth-index TrainingReport-container height100">
    <!-- 页面右边按钮***start -->
    <div class="right-btn" style="top:74px">
      <span>
        {{$t('Training.TrainingReport.info[2]')}}
        <span
          style="color:#00A6FF"
        >{{$t('Training.TrainingReport.form4')}}</span>
      </span>
    </div>
    <div class="content-box bg-white flex1 pl12 pr12">
      <div class="flex-wrap pt12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">{{$t('Training.TrainingReport.info[0]')}}</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.GradeValue"
              clearable
              @change="search()"
              filterable
              :placeholder="$t('Training.TrainingReport.info[1]')"
            >
              <el-option
                v-for="item in filter.GradeList"
                :key="item.career_id"
                :label="item.career_cnname"
                :value="item.career_id"
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
              :placeholder="$t('Training.TrainingReport.info[5]')"
              @clear="search"
              @keyup.enter.native="search"
            ></el-input>
          </div>
          <el-button
            type="primary"
            size="mini"
            class="search-btn fs14"
            @click="search"
          >{{$t('Common.input_button')}}</el-button>
        </div>
      </div>
      <div class="tableDiv" ref="auto_height_table">
        <normalTableCont :tableData="tableList" @handSetting="handSetting">
          <!-- 按钮操作组********start -->
          <!-- <el-table-column ref="fixedColumn" label="操作" align="center" width="150px" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="handCount(scope.row)"
              >{{$t('Training.TrainingReport.info[1]')}}</el-button>
            </template>
          </el-table-column>-->
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
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import httpApi from "../CareerGrowth/CareerGrowth";

export default {
  name: "Interesting-report-campusReport",
  components: {
    normalTableCont,
    popTips
  },
  data() {
    let item = {
      a1: "美语初阶小一班",
      a2: "26020090302",
      a3: "幼儿初阶班一级",
      a4: "KN1",
      a5: "2019-10-12  12:00-14:00",
      a6: "待备课",
      a7: "待上课",
      a8: "备课提醒",
      status: "0"
    };
    return {
      //筛选
      filter: {
        time: "", //日期
        GradeValue: "", //选择园所
        GradeList: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          }
        ], //选择园所-下拉数据
        GradeType: [
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          }
        ], //货品类别-下拉数据
        GradeTypeValue: "", //货品类别
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
          moduleName: "Interesting", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "report_campusReport" //当前页面的名称，通常与路由名称一致
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
  created() {
    this.getCareer();
    this.OpenClassReport();
  },
  watch: {},
  computed: {},
  methods: {
    getCareer() {
      httpApi.getCareer({}).then(res => {
        this.filter.GradeList = res.data.result.list;
      });
    },
    OpenClassReport() {
      httpApi
        .OpenClassReport({
          career_id: this.filter.GradeValue,
          keyword: this.filter.keyword,
          account_class: 0,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: 1
        })
        .then(res => {
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
          // this.tableList.columns = res.data.result.field;
          if (res.data.error == 0) {
            this.tableList.list = res.data.result.list;
            this.paging.pageTotal = Number(res.data.result.allnum);
          } else {
            this.tableList.list = [];
          }
        });
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.OpenClassReport();
    },
    // 点击教师统计
    handCount(row) {
      console.log(row);
      this.$router.push("");
    },
    // 编辑列编辑提交
    handSetting(v) {
      this.tableList.columns = v;
      console.log(v, 121313);
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.OpenClassReport();
    },
    // pageSize改变
    pageSizeChange(v) {
      this.paging.curPage = 1;
      this.paging.pageSize = v;
      this.OpenClassReport();
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
.Interesting-report-campusReport {
}
</style>
