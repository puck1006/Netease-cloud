<template>
  <div class="table-content noboderB" :style="{'height':(tableData.options.tableHeight+'px')}">
    <el-table
      :data="tableData.list"
      border
      fit
      @selection-change="handleSelectionChange"
      style="width: 100%;background-color:#e9f0f2"
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
      <!-- //表格多选是否存在判断 -->
      <el-table-column
        v-if="tableData.options.mutiSelect && tableData.options.selectDisable"
        type="selection"
        align="center"
        style="width: 55px;"
        :selectable="checkboxInit"
        fixed="left"
      ></el-table-column>
      <el-table-column
        v-else-if="tableData.options.mutiSelect"
        type="selection"
        align="center"
        style="width: 55px;"
        fixed="left"
      ></el-table-column>
      <!-- 表格数据渲染 -->
      <template v-for="(column,$index) in tableData.columns">
        <!-- 一般列 -->
        <template>
          <el-table-column
            :prop="column.fieldstring"
            :key="$index"
            :label="column.fieldname"
            :sortable="column.sortable"
            align="center"
            :min-width="column.width?column.width:'150px'"
            v-if="column.show=='1'"
          >
            <template slot-scope="scope">
              <el-button
                v-if="column.ismethod"
                type="text"
                class="link-type"
                @click="handleColumnChange(scope.$index,column,scope.row)"
              >{{tableData.list[scope.$index][column.fieldstring]}}</el-button>
              <!-- <span v-else type="text">{{tableData.list[scope.$index][column.fieldstring]}}</span> -->
              <div v-else>
                <div v-for="(item,index2) in scope.row[column.fieldstring]" :key="index2">
                  <!-- {{item.meeting_class}} -->
                  <p class="detail-time tl mb12" style="position:absolute;top:10px;left:10px;">{{item.hour_day}}</p>
                  <div class="my-list-box"  style="margin-top:30px;">
                    <div class="my-list">
                      <el-popover
                      popper-class="itemHover"
                      placement="right"
                      width="400"
                      trigger="hover"
                    >
                      <div class="cardHover">
                        <div class="flex-sb mb8">
                          <span class="fs16 tl">{{item.class_cnname}}</span>
                           <span class="btn_state1" style="top: 11px;"  v-if="item.hour_ischecking==0">{{item.hour_ischecking_name}}</span>
                          <span class="btn_state2" style="top: 11px;" v-else>{{item.hour_ischecking_name}}</span>
                        </div>
                        <p class="fs14 color-333 mb8">
                          <span class="color-aaa mr4">{{$t('mySchedule.labe_text1')}}</span>
                          <span>{{item.hour_day}} {{item.hour_starttime}}-{{item.hour_endtime}}</span>
                        </p>
                        <p class="fs14 color-333 mb8">
                          <span class="color-aaa mr4">{{$t('mySchedule.labe_text2')}}</span>
                          <span> {{item.class_enname}}</span>
                        </p>
                        <p class="fs14 color-333 mb8">
                          <span class="color-aaa mr4">{{$t('mySchedule.labe_text3')}}</span>
                          <span>{{item.course_branch }}</span>
                        </p>
                        <!-- <p class="fs14 color-333 mb8">
                          <span class="color-aaa mr4">{{$t('mySchedule.labe_text4')}}</span>
                          <span>{{item.school_cnname}}</span>
                        </p> -->
                        <p class="fs14 color-333 mb8">
                          <span class="color-aaa mr4">{{$t('mySchedule.labe_text5')}}</span>
                          <span>{{item.classroom_cnname}}</span>
                        </p>
                        <p class="fs14 color-333 mb8">
                          <span class="color-aaa mr4">{{$t('mySchedule.labe_text6')}}</span>
                          <span>{{item.hour_ischecking_name}}</span>
                        </p>
                      </div>
                      <div slot="reference" class="everyItem week-item">
                        <div class="pAll5" :class="item.hour_ischecking==0?'bgOne bgOneB':'bgTwo bgTwoB'" style="position:relative"  v-if="item.class_cnname">
                          <!-- <div class="flex-sb mb8">
                            <span class="fs16 tl" style="width: calc(100% - 50px);">AS班级哈哈哈哈哈哈</span>
                            <span class="btn_state1">已读</span>
                          </div> -->
                          <p class="fs14 color-333 mb8 tl">
                            {{item.hour_day}}  {{item.hour_starttime}}-{{item.hour_endtime}}
                          </p>
                          <p class="fs14 color-333 mb8 tl">
                            {{item.class_cnname}}
                          </p>
                        </div>
                      </div>
                    </el-popover>
                    </div>
                  </div>
                </div>
              </div>
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
  name: "doubleListTable",
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
    // this.getColums();
    console.log(this.tableData);
    console.log(this.tableData.list);
  },
  watch: {
    getIndex(n, o) {
      console.log(n, o);
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
  computed: {},
  methods: {
      // 复选框控制权限
    checkboxInit(row, index) {
      console.log(row, index);
      return 0; //不可勾选
    },
    // 编辑列渲染
    renderHeader(h, { column, $index }) {
      console.log(h, column, $index);
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
        console.log(index);
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
.currentPageNames{
  width:150px;
  height:22px;
  overflow:hidden;
}
</style>
