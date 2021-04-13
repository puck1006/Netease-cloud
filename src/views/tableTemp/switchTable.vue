<template>
  <div class="home">
    <div class="tableDiv" ref="auto_height_table">
        <switchTableCont  :tableData="tableList" @handleSelectionChange="handleSelectionChange" @switchChange="switchChange" @handSetting="handSetting">
          <!-- 按钮操作组********start -->
          <el-table-column ref="fixedColumn" label="操作" align="center" width="120px" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="handSee(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click.native.prevent="handSee(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
        <!-- 按钮操作组********end -->
        </switchTableCont>
        <!-- 分页 -->
        <el-pagination
          style="margin:10px;"
          :current-page.sync="curPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
          @current-change="curPageChange"
          @size-change="pageSizeChange"
        ></el-pagination>
    </div>
  </div>
</template>

<script>
import switchTableCont from "@/components/tables/switchTableCont.vue";

export default {
  name: "nomalTable",
  data() {
    return {
      // 表格数据
      tableList: {
        // 表格的列
        columns: [
          {
            fieldstring: "a1",
            fieldname: "111111",
            show: "1",
          },
          {
            fieldstring: "a2",
            fieldname: "111111",
            show: "1",
            ismethod:true,//是否有事件
          },
          {
            fieldstring: "a3",
            fieldname: "111111",
            show: "1",
            isswitch:"1"
          },
          {
            fieldstring: "a4",
            fieldname: "111111",
            show: "1"
          },
          {
            fieldstring: "a5",
            fieldname: "111111",
            show: "1"
          },
          {
            fieldstring: "a6",
            fieldname: "111111",
            show: "1"
          }
        ],
        // 表格数据
        list: [
          {
            a1: "222222222222",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: "222222222222222",
            a5: "222222222222222",
            a6: "222222222222222"
          },
          {
            a1: "222222222222222",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: "222222222222222",
            a5: "222222222222222",
            a6: "222222222222222"
          },
          {
            a1: "222222222222222",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: "222222222222222",
            a5: "222222222222222",
            a6: "222222222222222"
          },
          {
            a1: "222222222222222",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: "222222222222222",
            a5: "222222222222222",
            a6: "222222222222222"
          },
          {
            a1: "222222222222222",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: "222222222222222",
            a5: "222222222222222",
            a6: "222222222222222"
          },
          {
            a1: "222222222222222",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: "222222222222222",
            a5: "222222222222222",
            a6: "222222222222222"
          },
          {
            a1: "222222222222222",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: "222222222222222",
            a5: "222222222222222",
            a6: "222222222222222"
          },
          {
            a1: "222222222222222",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: "222222222222222",
            a5: "222222222222222",
            a6: "222222222222222"
          },
          {
            a1: "222222222222222",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: "222222222222222",
            a5: "222222222222222",
            a6: "222222222222222"
          }
        ],
        options:{
          errortip:"",//空页面提示内容
          mutiSelect:true,//是否显示多选
          issetting:true,//是否可以编辑列
          tableHeight:0,//表格高度
        }
      },
      // 分页
      curPage: 1,
      pageSize: 10,
      pageTotal: 0,
    };
  },
  components: {
    switchTableCont
  },
  methods:{
    handSee(v){
      console.log(v,121323)
    },
    // 开关switch
    switchChange(v1,v2){
      console.log(v1,v2)
    },
    // 编辑列渲染
    renderHeader(h, {column, $index }) {
      console.log(h, column, $index);
      return h("span", {
        class: "el-icon-setting btn-setting",
        on: {
          click: () => {
            console.log(11212)
          }
        }
      });
    },
    // 复选框
    handleSelectionChange(val) {
      console.log(val,4564565);
    },
    // 编辑列编辑提交
    handSetting(v){
      console.log(v,121313)
    },
    // 页码变化
    curPageChange(v) {
      this.curPage = v;
    },
    // pageSize改变
    pageSizeChange(v) {
      this.curPage = 1;
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
