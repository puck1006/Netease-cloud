<template>
  <!-- 表格说明： 此表格主要用于侧边栏无边框，且表头有背景颜色的表格，同时兼具基本表格的功能：复选框，编辑列，表格列中内容有点击事件-->
  <div
    class="table-content noBorderTableCont"
    :style="{'height':(tableData.options.tableHeight+'px')}"
  >
    <el-table
      :data="tableData.list"
      fit
      :max-height="tableData.options.tableHeight"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <!-- 暂无数据提示，自己定义就OK了 -->
      <template slot="empty">
        <div class="empty-box">
          <i class="mh-kym_icon icon"></i>
          <p
            class="col-66 text-1"
          >{{tableData.options.errortip!=''?tableData.options.errortip:$t('Table.a1')}}</p>
        </div>
      </template>
      <!--region 选择框-->
      <el-table-column
        v-if="tableData.options.RadioSelect"
        style="width: 30px;"
        min-width="30px"
        align="center"
        fixed="left"
      >
        <template slot-scope="scope">
          <el-radio
            v-model="radio"
            :label="scope.$index"
            @change="singleBox(scope.row)"
            style="color:white;"
          >{{''}}</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableData.options.mutiSelect"
        type="selection"
        align="center"
        style="width: 55px;"
        fixed="left"
      ></el-table-column>
      <!-- 表格数据渲染 -->
      <template v-for="(column,$index) in tableData.columns">
        <!-- 固定列 -->
        <template v-if="$index==IndexId || $index==IndexIdTwo ||$index==0">
          <el-table-column
            :prop="column.fieldstring"
            :key="$index"
            fixed="left"
            :sortable="column.sortable"
            :label="column.fieldname"
            align="center"
            :min-width="column.width?column.width:'120px'"
            :show-overflow-tooltip="true"
            v-if="column.show=='1'"
          >
            <template slot-scope="scope">
              <el-button
                v-if="column.ismethod"
                type="text"
                class="link-type"
                @click="handleColumnChange(scope.$index,column,scope.row)"
              >{{tableData.list[scope.$index][column.fieldstring]}}</el-button>
              <span v-else type="text">{{tableData.list[scope.$index][column.fieldstring]}}</span>
            </template>
          </el-table-column>
        </template>
        <!-- 一般列 -->
        <template v-else>
          <el-table-column
            :prop="column.fieldstring"
            :key="$index"
            :label="column.fieldname"
            :sortable="column.sortable"
            align="center"
            :min-width="column.width?column.width:'120px'"
            :show-overflow-tooltip="true"
            v-if="column.show=='1'"
          >
            <template slot-scope="scope">
              <el-button
                v-if="column.ismethod"
                type="text"
                class="link-type"
                @click="handleColumnChange(scope.$index,column,scope.row)"
              >{{tableData.list[scope.$index][column.fieldstring]}}</el-button>
              <span v-else type="text">{{tableData.list[scope.$index][column.fieldstring]}}</span>
            </template>
          </el-table-column>
        </template>
      </template>
      <!-- 操作列 -->
      <slot></slot>
      <!-- 编辑列 -->
      <el-table-column
        fixed="right"
        label
        align="center"
        width="40px"
        v-if="tableData.options.issetting"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <el-button
            v-if="column.ismethod"
            type="text"
            class="link-type"
            @click="handleColumnChange(scope.$index,column,scope.row)"
          >{{tableData.list[scope.$index][column.fieldstring]}}</el-button>
          <span v-else type="text">{{tableData.list[scope.$index][column.fieldstring]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 穿梭框 -->
    <el-dialog :title="$t('Table.a2')" class="setting-box" :visible.sync="dialogVisible" width="500px">
      <el-transfer v-model="oprateColumn" :data="data" :titles="[$t('Table.a3'), $t('Table.a4')]"></el-transfer>
      <div class="oprate">
        <el-button size="small" type="primary" @click="handSetting()">{{$t('Table.a5')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "noBorderTableCont",
  props: {
    // 表格数据所有参数
    tableData: {
      type: Object
    }
  },
  data() {
    return {
      radio: "",
      dialogVisible: false,
      showColumns: [],
      data: [],
      oprateColumn: [], //编辑列
      IndexId: -1, //固定的列数
      IndexIdTwo: -1 //固定的列数
    };
  },
  created() {
    this.getColums();
  },
  watch: {
    getIndex(n, o) {
      console.log(n);
      var i = 0;
      var _index = 0,
        _index_two = 0;
      if (n.length >= 8) {
        n.forEach((item, index) => {
          if (item.show == "1" && i == 0) {
            i++;
            _index = index;
          } else if (item.show == "1" && i == 1) {
            i++;
            _index_two = index;
          }
        });
        this.IndexId = _index;
        this.IndexIdTwo = _index_two;
      }
      console.log(this.IndexId);
      // 编辑列操作
      if (this.tableData.options.issetting) {
        var fieldColumns = n;
        if (
          !this.$Tool.getStorage("module" + [this.tableData.options.moduleName])
        ) {
          this.$Tool.setStorage(
            "module" + [this.tableData.options.moduleName],
            {}
          );
        }
        var obj = this.$Tool.getStorage(
          "module" + [this.tableData.options.moduleName]
        );
        obj["all_" + [this.tableData.options.ColumnName]] = n;
        // obj["show_" + [this.tableData.options.ColumnName]] = n;
        this.$Tool.setStorage(
          "module" + [this.tableData.options.moduleName],
          obj
        );
        if (obj["show_" + [this.tableData.options.ColumnName]]) {
          fieldColumns = obj["show_" + [this.tableData.options.ColumnName]];
        }
        // 自定义编辑列
        var settingOprateData = this.$Common.settingOprateData(fieldColumns);
        this.data = settingOprateData.data;
        this.oprateColumn = settingOprateData.oprateColumn;
      }
    }
  },
  computed: {
    getIndex() {
      return this.tableData.columns;
    }
  },
  methods: {
    //正式学员-单选
    singleBox(val) {
      this.studentInfo = val;
      console.log(val, 5555);
      this.$emit("handleSelectionRadio", val);
    },
    getColums() {
      var i = 0;
      var _index = 0,
        _index_two = 0;
      if (this.tableData.columns.length >= 8) {
        this.tableData.columns.forEach((item, index) => {
          if (item.show == "1" && i == 0) {
            i++;
            _index = index;
          } else if (item.show == "1" && i == 1) {
            i++;
            _index_two = index;
          }
        });
        this.IndexId = _index;
        this.IndexIdTwo = _index_two;
      }
    },
    // 复选框控制权限
    checkboxInit(row, index) {
      return 0; //不可勾选
      // 　　if (row.withdrawState==2)//这个判断根据你的情况而定
      // 　　　　return 0;//不可勾选
      // 　　else
      // 　　　　return 1;//可勾选
      // 　　},
    },
    // 编辑列渲染
    renderHeader(h, { column, $index }) {
      console.log(h, column, $index, "点击了啊啊啊");
      return h("span", {
        class: "mh-sz btn-setting",
        on: {
          click: () => {
            this.dialogVisible = true;
          }
        }
      });
    },
    // 表格内容绑定事件
    handleColumnChange(k, v, column) {
      console.log(k, v);
      this.$emit("handleColumnChange", k, v, column);
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    // 编辑列提交
    handSetting() {
      let obj = this.$Tool.getStorage(
        "module" + [this.tableData.options.moduleName]
      );
      let allnum = obj["all_" + [this.tableData.options.ColumnName]];
      allnum.forEach((item, index) => {
        allnum[parseInt(index)].show = "1";
      });
      this.oprateColumn.forEach((item, index) => {
        allnum[parseInt(item)].show = "0";
      });
      console.log(this.oprateColumn, 12131);
      this.showColumns = allnum;
      obj["show_" + [this.tableData.options.ColumnName]] = this.showColumns;
      this.$Tool.setStorage(
        "module" + [this.tableData.options.moduleName],
        obj
      );
      this.$emit("handSetting", this.showColumns);
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="less">
.btn-setting {
  display: block;
  width: 20px;
  height: 20px;
  font-size: 16px;
  margin: 0 auto;
  color: #aaa;
  // background-color: green;
  cursor: pointer;
}
.noBorderTableCont {
  .el-table .cell {
    padding-right: 2px !important;
  }
  .el-table thead tr th {
    background: #f0f4f9;
    color: #909399;
    font-weight: bold;
  }
  //隐藏-table的底部线
  .el-table::before {
    height: 0;
  }
  //隐藏-table 固定列 的底部线
  .el-table__fixed::before,
  .el-table__fixed-right::before {
    height: 0;
  }
}
</style>
