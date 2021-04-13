<template>
 <!-- 表格说明： 此表格组件主要用于表格内容中存在自定义tips悬浮提示框和意向级别图标的样式的表格，同时兼具基本表格的功能：：复选框，编辑列，表格列中内容有点击事件-->
  <div class="table-content tipsTable" :style="{'height':(tableData.options.tableHeight+'px')}">
    <el-table
      :data="tableData.list"
      border
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
            :show-overflow-tooltip="true"
            :sortable="column.sortable"
            :label="column.fieldname"
            align="center"
            :min-width="column.width?column.width:'150px'"
            v-if="column.show=='1'"
          >
            <template slot-scope="scope">
              <!-- 判断意向级别 -->
              <span v-if="column.isLevel" class="fs14">
                <el-rate
                  v-model="tableData.list[scope.$index][column.fieldstring]"
                  disabled
                  :icon-classes="['mh-start_filled', 'mh-start_filled', 'mh-start_filled']"
                  disabled-void-icon-class="mh-start_border"
                  :colors="['#99A9BF', '#F7BA2A', '#F78F0E']"
                  score-template="{tableData.list[scope.$index][column.fieldstring]}"
                ></el-rate>
              </span>
              <!-- 判断提示原因框 -->
              <el-popover
                v-else-if="column.isTip &&tableData.list[scope.$index][column.fieldstring]=='否'"
                trigger="hover"
                placement="bottom"
                class="help-button"
                popper-class="help-button-tip"
              >
                <div class="info-body">
                  <div class="top">提示</div>
                  <div class="cont">
                    <!-- 生病了，预约2019-10-10来试听 -->
                    {{tableData.list[scope.$index]['invite_novisitreason']}}
                  </div>
                </div>
                <div slot="reference" class="name-wrapper">
                  <el-button type="text">
                    {{tableData.list[scope.$index][column.fieldstring]}}
                    <i class="mh-warn"></i>
                  </el-button>
                </div>
              </el-popover>
              <el-button
                v-else-if="column.ismethod"
                type="text"
                class="link-type"
                @click="handleColumnChange(scope.$index,column,scope.row)"
              >{{tableData.list[scope.$index][column.fieldstring]}}</el-button>
              <span v-else>{{tableData.list[scope.$index][column.fieldstring]}}</span>
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
            :show-overflow-tooltip="true"
            :min-width="column.width?column.width:'150px'"
            v-if="column.show=='1'"
          >
            <!-- 判断意向级别 -->
            <template slot-scope="scope">
              <!-- 判断意向级别 -->
              <span v-if="column.isLevel" class="fs14">
                <el-rate
                  v-model="tableData.list[scope.$index][column.fieldstring]"
                  disabled
                  :icon-classes="['mh-start_filled', 'mh-start_filled', 'mh-start_filled']"
                  disabled-void-icon-class="mh-start_border"
                  :colors="['#99A9BF', '#F7BA2A', '#F78F0E']"
                  score-template="{tableData.list[scope.$index][column.fieldstring]}"
                ></el-rate>
              </span>
              <!-- 判断提示原因框 -->
              <el-popover
                v-else-if="column.isTip &&tableData.list[scope.$index][column.fieldstring]=='否'"
                trigger="hover"
                placement="bottom"
                class="help-button"
                popper-class="help-button-tip"
              >
                <div class="info-body">
                  <div class="top">提示</div>
                  <div class="cont">
                    <!-- 生病了，预约2019-10-10来试听 -->
                    {{tableData.list[scope.$index]['invite_novisitreason']}}
                  </div>
                </div>
                <div slot="reference" class="name-wrapper">
                  <el-button type="text">
                    {{tableData.list[scope.$index][column.fieldstring]}}
                    <i class="mh-warn"></i>
                  </el-button>
                </div>
              </el-popover>
              <span v-else>{{tableData.list[scope.$index][column.fieldstring]}}</span>
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
      ></el-table-column>
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
  name: "tipsTableCont",
  props: {
    // 表格数据所有参数
    tableData: {
      type: Object
    }
  },
  data() {
    return {
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
      console.log(h, column, $index);
      return h("span", {
        class: "icon-sz btn-setting",
        on: {
          click: () => {
            this.dialogVisible = true;
          }
        }
      });
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    // 表格内容绑定事件
    handleColumnChange(k, v, column) {
      console.log(k, v);
      this.$emit("handleColumnChange", k, v, column);
    },
    // 点击二维码图片
    handleCodeChange(k, v, col) {
      console.log(k, v);
      this.$emit("handleCodeChange", k, v, col);
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
    },
    switchChange(v1, v2) {
      this.$emit("switchChange", v1, v2);
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
.table-code {
  width: 40px;
  margin: 0 auto;
  img {
    width: 100%;
    display: block;
  }
}
.tipsTable {
  .el-rate__icon {
    font-size: 14px;
  }
  // 提示框样式
  .help-button {
    .el-button--text {
      color: #333;
    }
    color: #333;
  }
}
// 表格提示框样式
body .help-button-tip {
  box-shadow: 0px 0px 26px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 0px;
  max-width: 200px;
  .info-body {
    .top {
      height: 32px;
      line-height: 32px;
      width: 100%;
      padding: 0px 16px;
      background: rgba(246, 249, 252, 1);
      border-radius: 4px 4px 0px 0px;
    }
    .cont {
      padding: 16px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(247, 143, 14, 1);
      line-height: 20px;
    }
  }
}
</style>
