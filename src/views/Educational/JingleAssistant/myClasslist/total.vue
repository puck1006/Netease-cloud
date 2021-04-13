<template>
  <div class="Educational-total">
    <div class="flex-wrap pt12 pl12 pr12 flex-warp-line">
      <div class="flex-al mb12">
        <div class="right-mode fs14 color-8A9">
          <span
            class="cur-pointer mr20"
            @click="mode = true"
            :class="{ 'color-blue': mode }"
            >{{ $t("Common.mode.card_mode") }}</span
          >
          <span class="cur-pointer" :class="{ 'color-blue': !mode }" @click="tabList">{{
            $t("Common.mode.list_mode")
          }}</span>
        </div>
        <span class="mr10 fs14 color-666">{{
          $t("Educational.circulateRegistrat.school")
        }}</span>
        <div class="select-box" style="width: 170px">
          <el-select
            v-model="filter.re_school_id"
            filterable
            clearable
            :placeholder="$t('Educational.circulateRegistrat.school_ph')"
            @change="searchSchool"
          >
            <el-option
              v-for="item in filter.schoolList"
              :key="item.school_id"
              :label="item.school_cnname"
              :value="item.school_id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">{{
          $t("Educational.circulateRegistrat.course")
        }}</span>
        <div class="select-box" style="width: 170px">
          <el-select
            v-model="filter.course_id"
            filterable
            clearable
            :placeholder="$t('Educational.circulateRegistrat.course_ph')"
            @change="search"
          >
            <el-option
              v-for="item in filter.courseList"
              :key="item.course_id"
              :label="item.course_cnname"
              :value="item.course_id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">班级类型</span>
        <div class="select-box" style="width: 170px">
          <el-select
            v-model="filter.class_type"
            filterable
            clearable
            placeholder="请选择班级类型"
            @change="search"
          >
            <el-option label="父班" value="0"></el-option>
            <el-option label="子班" value="1"></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al Inquire-box mb12">
        <div class="ipt-box" style="width: 270px">
          <el-input
            v-model="filter.keyword"
            @clear="search"
            @keyup.enter.native="search"
            clearable
            :placeholder="$t('Educational.circulateRegistrat.find_ph')"
          ></el-input>
        </div>
        <el-button type="primary" size="small" class="search-btn fs14" @click="search">{{
          $t("Common.input_button")
        }}</el-button>
      </div>
    </div>
    <div class="content-box">
      <div
        v-if="mode"
        class="card mt10 mb10"
        ref="auto_height_table"
        :style="{ height: tableList.options.tableHeight + 'px' }"
      >
        <template v-if="tableList.list.length > 0">
          <div
            class="onecard"
            @mouseenter="mouseEnter(card, index)"
            @mouseleave="mouseLeave(card, index)"
            v-for="(card, index) in tableList.list"
            :key="index"
          >
            <div class="header color-243">
              <div class="title">{{ card.class_cnname }}</div>
              <div class="status1" v-if="card.class_status == 0">
                {{ $t("Educational.circulateRegistrat.class_tab[1]") }}
              </div>
              <div class="status2" v-else-if="card.class_status == 1">
                {{ $t("Educational.circulateRegistrat.class_tab[0]") }}
              </div>
              <div class="status3" v-if="card.class_type == 0">父班</div>
              <div class="status4" v-else-if="card.class_type == 1">子班</div>
            </div>
            <div class="main fs14">
              <div>
                <span>{{ tableList.cardfield.course_cnname }}</span>
                : {{ card.course_cnname }}
                <span></span>
              </div>
              <div>
                <span>{{ tableList.cardfield.course_branch }}</span>
                : {{ card.course_branch }}
                <span></span>
              </div>
              <div>
                <span>{{ tableList.cardfield.classroom_cnname }}</span>
                : {{ card.classroom_cnname }}
                <span></span>
              </div>
              <!-- <div>
              <span>{{tableList.cardfield.class_enname}}</span>
              : {{card.class_enname}}
              <span></span>
            </div>
            <div>
              <span>{{tableList.cardfield.class_branch}}</span>
              : {{card.class_branch}}
              <span></span>
            </div> -->
              <div>
                <span>{{ tableList.cardfield.school_cnname }}</span>
                : {{ card.school_cnname }}
                <span></span>
              </div>
              <div class="flex-al">
                <span>{{ tableList.cardfield.student_nums }}</span
                >:
                <div class="progress-au dsplay ml8 mr8">
                  <div class="out-progress">
                    <div
                      class="inner-progress"
                      :style="{
                        width:
                          parseInt(card.student_nums.split('/')[0]) >
                          parseInt(card.student_nums.split('/')[1])
                            ? card.student_nums.split('/')[1]
                            : (card.student_nums.split('/')[0] /
                                card.student_nums.split('/')[1]) *
                                100 +
                              '%',
                      }"
                    ></div>
                  </div>
                </div>

                <span>{{ card.student_nums }}</span>
              </div>
            </div>
            <div v-if="card.status" class="hoverDiv color-white fs14">
              <div class="btnDiv">
                <div class="btn bg-blue" @click="handclassValue(card)">
                  {{ $t("Educational.JingleAssistant.educationWork.innerSliderArr[0]") }}
                </div>
                <div class="btn bg-orange" @click="handsendHomework(card)">
                  {{ $t("Educational.JingleAssistant.educationWork.innerSliderArr[1]") }}
                </div>
                <div class="btn bg-green" @click="handcommunicate(card)">
                  {{ $t("Educational.JingleAssistant.educationWork.innerSliderArr[2]") }}
                </div>
                <div class="btn bg-red" @click="handsendNotice(card)">
                  {{ $t("Educational.JingleAssistant.educationWork.innerSliderArr[3]") }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <blank :blankCont="tableList.options.errortip" class="mt40"></blank>
        </template>
      </div>
      <div class="tableDiv mt10 mb10" ref="auto_height_table" v-else>
        <progressAnaularTableCont
          :tableData="tableList"
          @handleColumnChange="handleColumnChange"
          @handSetting="handSetting"
        >
          <!-- 按钮操作组********start -->
          <el-table-column
            ref="fixedColumn"
            :label="$t('Common.table_operate')"
            align="center"
            width="150px"
            fixed="right"
          >
            <template slot-scope="scope">
              <!-- 下拉菜单 -->
              <el-dropdown
                class="user-name"
                trigger="click"
                @command="handleCommand"
                @visible-change="handClickDrop(scope.row)"
              >
                <el-button type="text" class="el-dropdown-link">
                  {{ $t("Educational.circulateRegistrat.table_option.title") }}
                  <i class="mh-select"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item divided command="classValue">
                    {{
                      $t("Educational.JingleAssistant.educationWork.innerSliderArr[0]")
                    }}
                  </el-dropdown-item>
                  <el-dropdown-item divided command="sendHomework">
                    {{
                      $t("Educational.JingleAssistant.educationWork.innerSliderArr[1]")
                    }}
                  </el-dropdown-item>
                  <el-dropdown-item divided command="communicate">
                    {{
                      $t("Educational.JingleAssistant.educationWork.innerSliderArr[2]")
                    }}
                  </el-dropdown-item>
                  <el-dropdown-item divided command="sendNotice">
                    {{
                      $t("Educational.JingleAssistant.educationWork.innerSliderArr[3]")
                    }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <!-- 按钮操作组********end -->
        </progressAnaularTableCont>
      </div>
      <!-- 分页 -->
      <el-pagination
        style="margin: 10px"
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
import progressAnaularTableCont from "@/components/tables/progressAnaularTableCont.vue";
import eduHttp from "../../Educational.js";
import blank from "@/components/common/Blank/blank.vue";

export default {
  name: "Educational-total",
  data() {
    return {
      mode: true,
      classId: "",
      //筛选
      filter: {
        re_school_id: "", //校园id
        course_id: "", //课程别id
        keyword: "", //关键词
        class_type: "", //关键词

        schoolList: [], //学校-下拉数据
        courseList: [], //课程别-下拉数据
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
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "circulate_total", //当前页面的名称，通常与路由名称一致
        },
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0,
      },
    };
  },
  components: { progressAnaularTableCont, blank },
  created() {
    this.getSchoolJingle(); //下拉->选择校园
    this.getCourseJingle(); //下拉->选择课程别
    this.getStaClassListJingle();
  },
  methods: {
    // 获取列表
    getStaClassListJingle() {
      eduHttp
        .getStaClassListJingle({
          keyword: this.filter.keyword,
          class_type: this.filter.class_type,

          course_id: this.filter.course_id,
          re_school_id: this.filter.re_school_id,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
          class_status: "",
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          let obj = this.$Tool.getStorage("module" + [this.tableList.options.moduleName]);
          if (obj) {
            if (obj["show_" + [this.tableList.options.ColumnName]]) {
              this.tableList.columns = obj["show_" + [this.tableList.options.ColumnName]];
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
          console.log(this.tableList.columns);
          this.tableList.cardfield = {};
          this.tableList.columns.map((v) => {
            this.tableList.cardfield[v.fieldstring] = v.fieldname;
          });
          console.log(this.tableList.cardfield);
        });
    },
    // 下拉 -- 校园
    getSchoolJingle() {
      eduHttp.getSchoolJingle({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.schoolList = res.data.result.list;
        } else {
          this.filter.schoolList = [];
        }
      });
    },
    // 下拉 -- 课程别
    getCourseJingle() {
      eduHttp.getCourseJingle({}).then((res) => {
        if (res.data.error == 0) {
          this.filter.courseList = res.data.result.list;
        } else {
          this.filter.courseList = [];
        }
      });
    },

    // 检索
    search() {
      this.paging.curPage = 1;
      this.getStaClassListJingle();
    },
    // 选择校园时检索
    searchSchool() {
      this.paging.curPage = 1;
      this.getStaClassListJingle();
      this.getTeacher(this.filter.re_school_id);
      this.getClassroom(this.filter.re_school_id);
    },
    //鼠标悬浮上去
    mouseEnter(c, indev) {
      console.log(c, indev);
      c.status = true;
    },
    //鼠标离开
    mouseLeave(c, indev) {
      console.log(c, indev);
      c.status = false;
    },
    //按钮操作
    handclassValue(v) {
      this.$router.push({
        path: `/Educational/JingleAssistant/educationWork/classReviews?class_id=${v.class_id}`,
      });
    },
    handsendHomework(v) {
      this.$router.push({
        path: `/Educational/JingleAssistant/educationWork/publishWork?class_id=${v.class_id}`,
      });
    },
    handcommunicate(v) {
      this.$router.push({
        path: `/Educational/JingleAssistant/educationWork/communicate?class_id=${v.class_id}`,
      });
    },
    handsendNotice(v) {
      this.$router.push({
        path: `/Educational/JingleAssistant/educationWork/noticeManage?class_id=${v.class_id}`,
      });
    },

    // 功能菜单下拉
    handleCommand(command) {
      console.log(command, 23232);
      if (command == "classValue") {
        this.$router.push({
          path: `/Educational/JingleAssistant/educationWork/classReviews?class_id=${this.classId}`,
        });
      } else if (command == "sendHomework") {
        this.$router.push({
          path: `/Educational/JingleAssistant/educationWork/publishWork?class_id=${this.classId}`,
        });
      } else if (command == "communicate") {
        this.$router.push({
          path: `/Educational/JingleAssistant/educationWork/communicate?class_id=${this.classId}`,
        });
      } else if (command == "sendNotice") {
        this.$router.push({
          path: `/Educational/JingleAssistant/educationWork/noticeManage?class_id=${this.classId}`,
        });
      }
    },
    tabList() {
      this.mode = false;
      this.getStaClassListJingle();
    },
    // 功能菜单点击
    handClickDrop(row) {
      console.log(row, 121212);
      this.classId = row.class_id;
    },
    // 表格内容绑定事件
    handleColumnChange(k, v) {
      console.log(k, v);
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.getStaClassListJingle();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getStaClassListJingle();
    },
    // pageSize改变
    pageSizeChange(v) {
      this.paging.curPage = 1;
      this.paging.pageSize = v;
      this.getStaClassListJingle();
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
<style lang="less">
.Educational-total {
  .card {
    // height: 600px;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    .onecard {
      position: relative;
      width: calc(25% - 16px);
      height: 245px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 16px 0px rgba(27, 30, 73, 0.15);
      border-radius: 8px;
      margin: 8px;
      .header {
        display: flex;
        align-items: center;
        height: 58px;
        background: rgba(249, 252, 255, 1);
        border-radius: 8px 8px 0px 0px;
        .title {
          font-size: 16px;
          margin-left: 20px;
          // max-width: 20px;
          flex-shrink: 1;
        }
        .status1 {
          color: #ff3569;
          font-size: 12px;
          margin-left: 12px;
          padding: 2px 5.5px;
          border-radius: 11px;
          border: 1px solid rgba(255, 53, 105, 1);
          flex-shrink: 0;
        }
        .status2 {
          color: #ff9e02;
          font-size: 12px;
          margin-left: 12px;
          padding: 2px 5.5px;
          border-radius: 11px;
          border: 1px solid rgba(255, 158, 2, 1);
          flex-shrink: 0;
        }
        .status3 {
          color: #6be2b2;
          font-size: 12px;
          margin-left: 12px;
          padding: 2px 5.5px;
          border-radius: 11px;
          border: 1px solid #6be2b2;
          flex-shrink: 0;
        }
        .status4 {
          color: #808ff6;
          font-size: 12px;
          margin-left: 12px;
          padding: 2px 5.5px;
          border-radius: 11px;
          border: 1px solid #808ff6;
          flex-shrink: 0;
        }
      }
      .main {
        padding: 10px 20px;
        > div {
          margin: 10px 0;
        }
      }
      .hoverDiv {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;

        .btnDiv {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;

          .btn {
            margin: 6px;
            padding: 5px 10px;
            border-radius: 4px;
            width: 80px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
