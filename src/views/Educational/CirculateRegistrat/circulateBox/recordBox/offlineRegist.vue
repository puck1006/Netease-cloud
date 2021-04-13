<template>
  <div class="Educational-offlineRegist">
    <div class="flex-al Inquire-box mAll12">
      <div class="ipt-box" style="width:270px;">
        <el-input
          v-model="filter.keyword"
          @clear="search"
          @keyup.enter.native="search"
          clearable
          :placeholder="$t('Educational.circulateRegistrat.offlineRegist.find_ph')"
        ></el-input>
      </div>
      <el-button
        type="primary"
        size="small"
        class="search-btn fs14"
        @click="search"
      >{{$t("Common.input_button")}}</el-button>
    </div>
    <div class="height100">
      <div class="tableDiv" ref="auto_height_table">
        <inputTableCont
          :tableData="tableList"
          @handleBlurInput="handleBlurInput"
          @handSetting="handSetting"
        ></inputTableCont>
      </div>
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
</template>

<script>
import inputTableCont from "@/components/tables/inputTableCont.vue";
import eduHttp from "../../../Educational.js";

export default {
  name: "Educational-offlineRegist",
  data() {
    return {
      classId: "", // 课程id
      //筛选
      filter: {
        keyword: "" //关键词
      },
      // 表格数据
      tableList: {
        // 表格的列
        columns: [
          {
            fieldstring: "a1",
            fieldname: "校园名称",
            show: "1"
          },
          {
            fieldstring: "a2",
            fieldname: "班级中文名称",
            show: "1"
          },
          {
            fieldstring: "a3",
            fieldname: "班级英文名称",
            show: "1"
          },
          {
            fieldstring: "a4",
            fieldname: "班级编号",
            show: "1"
          },
          {
            fieldstring: "a5",
            fieldname: "课程别",
            show: "1",
            isInputText: true,
            disabled: true
          },
          {
            fieldstring: "a6",
            fieldname: "课程别编号",
            show: "1"
          },
          {
            fieldstring: "a7",
            fieldname: "人数",
            show: "1",
            isProgress: true //是否有事件
          },
          {
            fieldstring: "a8",
            fieldname: "教室",
            show: "1"
          },
          {
            fieldstring: "a9",
            fieldname: "班级状态",
            show: "1"
          }
        ],
        // 表格数据
        list: [
          {
            a1: "上海吉的堡新村路校",
            a2: "幼儿初阶小一1班",
            a3: "Wonder Kids 1",
            a4: "20191001001",
            a5: "幼儿初阶一班",
            a6: "KN1",
            a7: "10/12",
            a8: "教室1",
            a9: "进行中"
          },
          {
            a1: "上海吉的堡新村路校",
            a2: "幼儿初阶小一2班",
            a3: "Wonder Kids 1",
            a4: "20191001001",
            a5: "幼儿初阶一班",
            a6: "KN1",
            a7: "10/12",
            a8: "教室1",
            a9: "进行中"
          },
          {
            a1: "上海吉的堡新村路校",
            a2: "幼儿初阶小一3班",
            a3: "Wonder Kids 1",
            a4: "20191001001",
            a5: "幼儿初阶一班",
            a6: "KN1",
            a7: "10/12",
            a8: "教室1",
            a9: "进行中"
          },
          {
            a1: "上海吉的堡新村路校",
            a2: "幼儿初阶小一4班",
            a3: "Wonder Kids 1",
            a4: "20191001001",
            a5: "幼儿初阶一班",
            a6: "KN1",
            a7: "10/12",
            a8: "教室1",
            a9: "进行中"
          },
          {
            a1: "上海吉的堡新村路校",
            a2: "幼儿初阶小一班",
            a3: "Wonder Kids 1",
            a4: "20191001001",
            a5: "幼儿初阶一班",
            a6: "KN1",
            a7: "10/12",
            a8: "教室1",
            a9: "进行中"
          },
          {
            a1: "上海吉的堡新村路校",
            a2: "幼儿初阶小一班",
            a3: "Wonder Kids 1",
            a4: "20191001001",
            a5: "幼儿初阶一班",
            a6: "KN1",
            a7: "10/12",
            a8: "教室1",
            a9: "进行中"
          },
          {
            a1: "上海吉的堡新村路校",
            a2: "幼儿初阶小一班",
            a3: "Wonder Kids 1",
            a4: "20191001001",
            a5: "幼儿初阶一班",
            a6: "KN1",
            a7: "10/12",
            a8: "教室1",
            a9: "进行中"
          },
          {
            a1: "上海吉的堡新村路校",
            a2: "幼儿初阶小一班",
            a3: "Wonder Kids 1",
            a4: "20191001001",
            a5: "幼儿初阶一班",
            a6: "KN1",
            a7: "10/12",
            a8: "教室1",
            a9: "进行中"
          },
          {
            a1: "上海吉的堡新村路校",
            a2: "幼儿初阶小一班",
            a3: "Wonder Kids 1",
            a4: "20191001001",
            a5: "幼儿初阶一班",
            a6: "KN1",
            a7: "10/12",
            a8: "教室1",
            a9: "进行中"
          }
        ],

        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: true, //是否可以编辑列
          tableHeight: 600, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "callManagement" //当前页面的名称，通常与路由名称一致
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
  components: { inputTableCont },
  created() {
    this.classId = this.$Tool.getStorage("circulateClassId");
    this.getStudyStudentListApi();
  },
  methods: {
    // 获取线下登记列表
    getStudyStudentListApi() {
      eduHttp
        .getStudyStudentListApi({
          keyword: this.filter.keyword,
          is_catitrack: "0",
          class_id: this.classId
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
    },
    // 表格内容绑定事件
    handleBlurInput(v, index, value) {
      console.log(v, index, value);
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
    },
    // pageSize改变
    pageSizeChange(v) {
      this.paging.curPage = 1;
      this.paging.pageSize = v;
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
.Educational-offlineRegist {
}
</style>
