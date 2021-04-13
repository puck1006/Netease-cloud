<template>
  <div class="bulle-tableDiv">
    <el-table
      :data="list"
      border
      :stripe="options.stripe"
      fit
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :height="options.tableHeight"
    >
      <!-- 暂无数据提示，自己定义就OK了 -->
      <template slot="empty">
        <div class="empty-box mt20 mb20">
          <i class="mh-kym_icon icon"></i>
          <p class="col-66 mt10">{{options.errortip}}</p>
        </div>
      </template>
      <!--region 选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;"></el-table-column>
      <!--endregion-->
      <!-- 编辑列start -->
      <template v-for="(column,$index) in columns">
        <el-table-column
          :prop="column.fieldstring"
          :key="$index"
          :label="column.fieldname"
          align="center"
          min-width="auto"
          v-if="column.show='1'"
        >
          <!-- <template slot-scope="scope" v-if="column.isname">111</template> -->
          <template slot-scope="scope">
            <span v-if="column.is_title==1">{{list[scope.$index][column.fieldstring].time_quantum}}</span>
            <template v-else>
              <div
                v-for="(item, index) in list[scope.$index][column.fieldstring]"
                :key="index"
                class="row-state"
              >
                <div class="appeare-state">
                  <ul class="state2" @click="listsClick(scope.$index, scope.row,item)">
                    <li v-if="tableType == 1">
                      <i class="mh-skjs"></i>
                      <span>{{item.course_branch}}</span>
                    </li>
                    <li v-else-if="tableType == 2">
                      <i class="mh-skjs"></i>
                      <span>{{item.staffer_cnname}}</span>
                    </li>
                    <li>
                      <i class="mh-skbj"></i>
                      <span>{{item.class_cnname}}({{item.hour_way_name}})</span>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </template>
        </el-table-column>
      </template>
      <!-- 编辑列end -->
      <!--region 按钮操作组-->
      <el-table-column
        ref="fixedColumn"
        min-width="120px"
        :label="operates.label"
        :align="operates.align"
        :width="operates.width"
        :fixed="operates.fixed"
        v-if="operates.list.filter(_x=>_x.show === true).length > 0"
      >
        <template slot-scope="scope">
          <template v-for="(btn, key) in operates.list">
            <div class="item" v-if="btn.show" :key="btn.id">
              <el-button
                @click.native.prevent="btn.method(key,scope.row)"
                :type="btn.type"
                size="small"
                :disabled="btn.disabled"
              >{{ btn.label }}</el-button>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "CoursetTable1",
  props: {
    total: Number, //分页数据
    pagesize: Number, //分页条数
    list: {
      type: Array
      // default: []
    }, // 数据列表
    tableType: "", //判断课表类型 1:班级;2:老师
    isCheckbox: null,
    isPagination: null,
    columns: {
      type: Array
      // default: []
    }, // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    operates: {}, // 操作按钮组 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
    options: {
      type: Object
      // default: {
      //   highlightCurrentRow: false // 是否要高亮当前行
      // }
    }, // table 表格的控制参数
    isMark: Boolean,
    tableDateNumber: Number, //父组件向子组件传递-今日筛选的日期(index)
    preDom: String //父组件向子组件传递-今日筛选的日期
  },
  data() {
    return {
      currentPage: 1,
      num: 10,
      size: 10,
      nowToday1: ""
    };
  },
  created() {
    console.log(this.columns, 100000000);
    console.log(this.list);
    // this.num = this.total;
    // this.size = this.pagesize;
    console.log(this.$Common.getDate(0));
    this.nowToday1 = this.$Common.getDate(0);
  },
  watch: {
    total(newdata, olddata) {
      console.log(newdata, olddata);
      this.num = this.newdata;
    },
    pagesize(newdata, olddata) {
      console.log(newdata, olddata);
      this.size = this.newdata;
    },
    columnsList: {
      handler: function(newdata) {
        // console.log('address change: ', newdata);
        var dom_td = document.querySelectorAll(
          ".bulle-tableDiv .el-table__row"
        );
        if (newdata.isMark == true) {
          console.log(dom_td);
          dom_td.forEach((item, index) => {
            // console.log(item, 11111111111111);
            item.childNodes.forEach((item1, index1) => {
              // console.log(index1,newdata.tableDateNumber,newdata.isMark,222222222222)
              if (index1 == newdata.tableDateNumber) {
                // item1.style.background = "red";
                item1.style.background = "rgba(223,244,250,1)";
              } else {
                item1.style.background = "#fff";
              }
            });
          });
          console.log("不等于-1，变颜色", newdata.tableDateNumber);
        } else {
          dom_td.forEach((item2, index2) => {
            item2.childNodes.forEach((item3, index3) => {
              // console.log(index3,newdata.tableDateNumber,newdata.isMark,222222222222)
              // console.log(item1)
              item3.style.background = "#fff";
              if (index3 != newdata.tableDateNumber) {
                console.log(383338383388);
                item3.style.background = "#fff";
              }
            });
          });
          console.log("等于-1，不需要变颜色", newdata.tableDateNumber);
        }
      },
      deep: true
    }
  },
  computed: {
    columnsList() {
      const { tableDateNumber, isMark } = this;
      this.$nextTick(() => {
        // console.log(this.tableDateNumber, this.isMark, 3333);
      });
      return {
        tableDateNumber,
        isMark
      };
    }
  },
  methods: {
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      this.$emit("handleSelectionChange", val);
    },
    handleColumnChange(k, v) {
      console.log(k, v);
      this.$emit("handleColumnChange", k, v);
    },
    handleCodeChange(k, v) {
      console.log(k, v);
      this.$emit("handleCodeChange", k, v);
    },
    listsClick(v1, v2, v3) {
      this.$emit("listsClick", v1, v2, v3);
    }
  }
};
</script>

<style lang="less">
.el-icon-caret-bottom {
  color: #aaaaaa;
}
.el-table .cell {
  padding: 0;
}
td .cell {
  .row-state {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }

  .row-state:nth-last-of-type(1) {
    margin-bottom: 0px;
  }
}

.link-type {
  color: #20a8d8;
}

// 课程详情样式
.course-table-detail {
  .ct-top {
    width: 100%;
    .ct-top-left {
      font-size: 18px;
      color: #333333;
    }
    .ct-top-right {
      font-size: 14px;
      color: #6ce3b2;
      > span {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #6ce3b2;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
  .ct-cont {
    margin: 15px 0px 50px 0px;
    p {
      line-height: 28px;
      label {
        display: inline-block;
        width: 70px;
        text-align: right;
        color: #aaa;
        margin-right: 5px;
      }
    }
  }
}
.appeare-state {
  ul {
    li {
      .mh-sksj:before {
        color: #fff;
      }
      .mh-skls:before {
        color: #fff;
      }
      .mh-skjs:before {
        color: #fff;
      }
      .mh-skbj:before {
        color: #fff;
      }
    }
  }
}
</style>
