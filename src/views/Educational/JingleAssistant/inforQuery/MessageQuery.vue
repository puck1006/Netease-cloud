<template>
  <div class="MessageQuery-container">
    <!-- 页面右边按钮***end -->
    <div class="flex-wrap pt12 pl12 pr12">
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">发送日期</span>
        <div class="select-box" style="width:170px;">
          <el-select v-model="filter.time" filterable clearable placeholder="不限" @change="search">
            <el-option
              v-for="item in filter.postList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">选择日期</span>
        <div class="select-box" style="width:300px;">
          <el-date-picker
            v-model="filter.times"
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
        <span class="mr10 fs14 color-666">群组名称</span>
        <div class="select-box" style="width:170px;">
          <el-select
            v-model="filter.teacher"
            filterable
            clearable
            placeholder="选择群组名称"
            @change="search"
          >
            <el-option
              v-for="item in filter.postList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al Inquire-box mb12">
        <div class="ipt-box" style="width:200px;">
          <el-input
            v-model="filterDetails.keyword"
            @clear="searchDetails"
            @keyup.enter.native="searchDetails"
            clearable
            placeholder="发送人、内容"
          ></el-input>
        </div>
        <el-button @click="searchDetails" type="primary" size="small" class="search-btn fs14">查询</el-button>
      </div>
    </div>
    <div class="tableDiv" ref="auto_height_table">
      <normalTableCont
        :tableData="tableList"
        @handSetting="handSetting"
        @handleColumnChange="handleColumnChange"
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
    <!-- 点击查看 -->
    <div class="small-dialog" v-if="viewDetails">
      <el-dialog
        title="出勤学员评价详情"
        :visible.sync="viewDetails"
        width="900px"
        @close="handleClose"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <div class="flex-wrap">
            <div class="flex-al mb12">
              <span class="mr10 fs14 color-666">是否评价</span>
              <div class="select-box" style="width:140px;">
                <el-select v-model="filterDetails.isPing" clearable filterable placeholder="是否评价">
                  <el-option
                    v-for="item in filterDetails.pingList"
                    :key="item.region_id"
                    :label="item.region_name"
                    :value="item.region_id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al Inquire-box mb12">
              <div class="ipt-box" style="width:280px;">
                <el-input
                  v-model="filterDetails.keyword"
                  @clear="searchDetails"
                  @keyup.enter.native="searchDetails"
                  clearable
                  placeholder="单行输入"
                ></el-input>
              </div>
              <el-button
                @click="searchDetails"
                type="primary"
                size="small"
                class="search-btn fs14"
              >查询</el-button>
            </div>
          </div>
          <div class="tableDiv">
            <levelTableCont :tableData="tableviewDetails"></levelTableCont>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="viewDetails = false">确 定</el-button>
          <el-button size="mini" @click="viewDetails = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import levelTableCont from "@/components/tables/levelTableCont.vue";

export default {
  name: "MessageQuery-container",
  data() {
    return {
      viewDetails: false,
      //筛选
      filter: {
        time: "", //选择时间
        times: "", //选择时间
        class: "", //选择教室
        teacher: "", //选择老师
        date: "", //选择日期
        postList: [],
        keyword: "" //关键词
      },
      filterDetails: {
        isPing: "",
        pingList: []
      },
      // 表格数据
      tableList: {
        // 表格的列
        columns: [
          {
            fieldstring: "a1",
            fieldname: "111111",
            show: "1",
            ismethod: "1"
          },
          {
            fieldstring: "a2",
            fieldname: "111111",
            show: "1"
          },
          {
            fieldstring: "a3",
            fieldname: "111111",
            show: "1"
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
            a1: "aa",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: 3,
            a5: "222222222222222",
            a6: "222222222222222"
          },
          {
            a1: "222222222222222",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: 3,
            a5: "222222222222222",
            a6: "222222222222222"
          }
        ],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: 0 //表格高度
        }
      },
      // 弹窗表哥
      tableviewDetails: {
        // 表格的列
        columns: [
          {
            fieldstring: "a1",
            fieldname: "111111",
            show: "1",
            ismethod: "1"
          },
          {
            fieldstring: "a2",
            fieldname: "111111",
            show: "1"
          },
          {
            fieldstring: "a3",
            fieldname: "111111",
            show: "1"
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
            a1: "aa",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: 3,
            a5: "222222222222222",
            a6: "222222222222222"
          },
          {
            a1: "222222222222222",
            a2: "222222222222222",
            a3: "222222222222222",
            a4: 3,
            a5: "222222222222222",
            a6: "222222222222222"
          }
        ],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: 0 //表格高度
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
  components: {
    normalTableCont,
    levelTableCont
  },
  created() {},
  methods: {
    // 检索
    search() {},
    searchDetails() {},
    // 点击事件
    handleColumnChange(k, v, column) {
      this.viewDetails = true;
      this.tableviewDetails.options.tableHeight = this.$Tool.getTableHeight(
        this.$refs.auto_height_table.getBoundingClientRect().top + 52
      );
      console.log(k, v, column);
    },

    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
    },
    // 页码变化
    curPageChange(v) {
      this.curPage = v;
    },
    // pageSize改变
    pageSizeChange(v) {
      this.curPage = 1;
    },
    // 关闭弹框
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
.MessageQuery-container {
}
</style>
