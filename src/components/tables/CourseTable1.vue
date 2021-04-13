<template>
<div class="bulle-tableDiv" :style="{'height':(tableData.options.tableHeight+'px')}">
  <el-table 
      :data="tableData.list" 
      border 
      fit 
      :max-height="tableData.options.tableHeight"
      @selection-change="handleSelectionChange"
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
    <!--endregion-->
    <!-- 编辑列start -->
    <template v-for="(column,$index) in tableData.columns">
      <el-table-column :prop="column.fieldstring" 
        :key="$index" 
        :label="column.fieldname" 
        align="center" 
        min-width="auto"
        v-if="column.show='1'"
        >
          <!-- <template slot-scope="scope" v-if="column.isname">111</template> -->
          <template slot-scope="scope">
            <span v-if="column.is_title==1 &&typeSchedule=='1'">{{tableData.list[scope.$index][column.fieldstring].class_cnname}}</span>
            <span v-if="column.is_title==1 &&typeSchedule=='2'">{{tableData.list[scope.$index][column.fieldstring].staffer_cnname}}</span>
            <span v-if="column.is_title==1 &&typeSchedule=='3'">{{tableData.list[scope.$index][column.fieldstring].classroom_cnname}}</span>
            <div v-for="(item,index2) in tableData.list[scope.$index][column.fieldstring]" 
                 :key="index2" 
                 class="row-state">
              <div class="appeare-state" v-if="item.hour_ischecking=='1'">
                <ul class="state1" 
                    @click="listsClick(scope.$index, scope.row,item)" 
                    v-if="typeSchedule=='1'"
                >
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skls"></i><span>{{item.staffer_cnname}}</span></li>
                  <li><i class="mh-skjs"></i><span>{{item.classroom_cnname}}({{item.hour_way_name}})</span></li>
                </ul>
                <ul class="state1" 
                    @click="listsClick(scope.$index, scope.row,item)" 
                    v-if="typeSchedule=='2'"
                >
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skbj"></i><span>{{item.class_cnname}}</span></li>
                  <!-- <li><i class="mh-skjs"></i><span>{{item.classroom_cnname}}({{item.hour_way_name}})</span></li> -->
                </ul>
                <ul class="state1" 
                    @click="listsClick(scope.$index, scope.row,item)" 
                    v-if="typeSchedule=='3'"
                >
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skls"></i><span>{{item.staffer_cnname}}</span></li>
                  <li><i class="mh-skbj"></i><span>{{item.class_cnname}}</span></li>
                </ul>
              </div>
              <div class="appeare-state" v-if="item.hour_ischecking=='0'">
                <ul class="state2" 
                    @click="listsClick(scope.$index, scope.row,item)"
                    v-if="typeSchedule=='1'"
                >
                  <!-- {{scope.column.label}}={{tableDateNumber}}  {{$index}} -->
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skls"></i><span>{{item.staffer_cnname}}</span></li>
                  <li><i class="mh-skjs"></i><span>{{item.classroom_cnname}}({{item.hour_way_name}})</span></li>
                </ul>
                <ul class="state2" 
                    @click="listsClick(scope.$index, scope.row,item)"
                    v-if="typeSchedule=='2'"
                >
                  <!-- {{scope.column.label}}={{tableDateNumber}}  {{$index}} -->
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skbj"></i><span>{{item.class_cnname}}</span></li>
                  <!-- <li><i class="mh-skjs"></i><span>{{item.classroom_cnname}}({{item.hour_way_name}})</span></li> -->
                </ul>
                <ul class="state2" 
                    @click="listsClick(scope.$index, scope.row,item)"
                    v-if="typeSchedule=='3'"
                >
                  <!-- {{scope.column.label}}={{tableDateNumber}}  {{$index}} -->
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skls"></i><span>{{item.staffer_cnname}}</span></li>
                  <li><i class="mh-skbj"></i><span>{{item.class_cnname}}</span></li>
                </ul>
              </div>
              <div class="appeare-state" v-if="item.hour_ischecking=='-1'">
                <ul class="state3" 
                    @click="listsClick(scope.$index, scope.row,item)"
                    v-if="typeSchedule=='1'"
                >
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skls"></i><span>{{item.staffer_cnname}}</span></li>
                  <li><i class="mh-skjs"></i><span>{{item.classroom_cnname}}({{item.hour_way_name}})</span></li>
                </ul>
                 <ul class="state3" 
                    @click="listsClick(scope.$index, scope.row,item)"
                    v-if="typeSchedule=='2'"
                >
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skbj"></i><span>{{item.class_cnname}}</span></li>
                  <!-- <li><i class="mh-skjs"></i><span>{{item.classroom_cnname}}({{item.hour_way_name}})</span></li> -->
                </ul>
                 <ul class="state3" 
                    @click="listsClick(scope.$index, scope.row,item)"
                    v-if="typeSchedule=='3'"
                >
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skls"></i><span>{{item.staffer_cnname}}</span></li>
                  <li><i class="mh-skbj"></i><span>{{item.class_cnname}}</span></li>
                </ul>
              </div>
              <div class="appeare-state" v-if="item.hour_ischecking=='-2'">
                <ul class="state4" 
                    @click="listsClick(scope.$index, scope.row,item)"
                     v-if="typeSchedule=='1'"
                >
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skls"></i><span>{{item.staffer_cnname}}</span></li>
                  <li><i class="mh-skjs"></i><span>{{item.classroom_cnname}}({{item.hour_way_name}})</span></li>
                </ul>
                <ul class="state4" 
                    @click="listsClick(scope.$index, scope.row,item)"
                     v-if="typeSchedule=='2'"
                >
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skbj"></i><span>{{item.class_cnname}}</span></li>
                  <!-- <li><i class="mh-skjs"></i><span>{{item.classroom_cnname}}({{item.hour_way_name}})</span></li> -->
                </ul>
                <ul class="state4" 
                    @click="listsClick(scope.$index, scope.row,item)"
                     v-if="typeSchedule=='3'"
                >
                  <li><i class="mh-sksj"></i><span>{{item.hour_starttime}}-{{item.hour_endtime}}</span></li>
                  <li><i class="mh-skls"></i><span>{{item.staffer_cnname}}</span></li>
                  <li><i class="mh-skbj"></i><span>{{item.class_cnname}}</span></li>
                </ul>
              </div>
              <div v-else-if="!item.hour_ischecking" class="appeare-state"></div>
            </div>
          </template>
        </el-table-column>
    </template>
    <!-- 编辑列end -->
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
</div>
</template>
<script>
export default {
  name: "CoursetTable1",
  props: {
    // 表格数据所有参数
    tableData: {
      type: Object
    },
    typeSchedule: '', //判断课表类型 1:班级课表;2:老师课表;3:教师课表;
    isCheckbox: null,
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
        if (newdata.isMark==true) {
          console.log(dom_td);
          dom_td.forEach((item, index) => {
            // console.log(item, 11111111111111);
            item.childNodes.forEach((item1, index1) => {
              // console.log(index1,newdata.tableDateNumber,newdata.isMark,222222222222)
              if (index1 == newdata.tableDateNumber) {
                // item1.style.background = "red";
                item1.style.background = "rgba(223,244,250,1)";
              }else{
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
                console.log(383338383388)
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
    // .ct-top-right {
    //   font-size: 14px;
    //   color: #6ce3b2;
    //   > span {
    //     display: inline-block;
    //     width: 10px;
    //     height: 10px;
    //     background: #6ce3b2;
    //     border-radius: 50%;
    //     margin-right: 5px;
    //   }
    // }
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
