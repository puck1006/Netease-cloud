<template>
  <div class="Educational-complaint-schoolComplaint height100">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          全部待办事项
        </span>
      </div>
    </div>
    <div class="content-box bg-white flex1 pl12 pr12 mt8">
      <div class="flex-wrap pt12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5">选择日期</span>
          <div class="time-box ml12" style="width:260px;">
            <el-date-picker
              v-model="filter.time"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="search"
            ></el-date-picker>
          </div>
        </div>
      </div>
      <div class="tableDiv" ref="auto_height_table">
        <normalTableCont
          :tableData="tableList"
        >
          <!-- 按钮操作组********start -->
          <el-table-column ref="fixedColumn" label="操作" align="center" width="120px" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.native.prevent="handReview(scope.row)">评价</el-button>
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
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import educationHttp from '../Educational'
export default {
  name: "Educational-complaint-schoolComplaint",
  components: {
    normalTableCont
  },
  data() {
    return {
      //筛选
      filter: {
        time: "",
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
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0
      }
    };
  },
  created() {
    this.AgentList(); // 待办事项
  },
  watch: {},
  computed: {},
  methods: {
    search () {
      this.AgentList(); // 待办事项
    },
     // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.AgentList(); // 待办事项
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.AgentList(); // 待办事项
    },
    // 评价
    handReview(v) {
      console.log(v)
      this.$router.push({
        path:'/Educational/JingleAssistant/educationWork',
        query: { 
          class_id: v.class_id
        }
      })
    },
    // 待办事项
    AgentList() {
      educationHttp.AgentList({
        start_time: this.filter.time?this.filter.time[0]:'',
        end_time: this.filter.time?this.filter.time[1]:'',
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

<style lang="less"></style>
