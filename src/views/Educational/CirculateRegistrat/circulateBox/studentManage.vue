<template>
  <div class="Educational-studentManage height100">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">学员管理</span>
      </div>
      <div class="cr-head-right fs12">
        <span>{{ $t("Common.header.nav_name3") }}</span
        >> <span>我的班级</span>>
        <span class="color-blue">学员管理</span>
      </div>
    </div>
    <div class="content-box bg-white flex1 mt8">
      <div class="top-info flex">
        <div class="right flex1 pt10">
          <p class="fs22 mb24 color-333">{{ classInfo.class_cnname }}</p>
          <ul class="fs14">
            <li>
              <p class="color-aaa">课程别</p>
              <p class="color-333">{{ classInfo.course_cnname || "--" }}</p>
            </li>
            <li>
              <p class="color-aaa">班级别名</p>
              <p class="color-333">{{ classInfo.class_enname || "--" }}</p>
            </li>
            <li>
              <p class="color-aaa">班级编号</p>
              <p class="color-333">{{ classInfo.class_branch || "--" }}</p>
            </li>
            <li>
              <p class="color-aaa">主教老师</p>
              <p class="color-333">{{ classInfo.teachername || "--" }}</p>
            </li>
            <li>
              <p class="color-aaa">助教老师</p>
              <p class="color-333">{{ classInfo.fu_teachername || "--" }}</p>
            </li>
            <li>
              <p class="color-aaa">教室</p>
              <p class="color-333">{{ classInfo.classroom || "--" }}</p>
            </li>
            <li>
              <p class="color-aaa">子班数量</p>
              <p class="color-333">{{ classInfo.sub_class_num || "--" }}</p>
            </li>
            <li>
              <p class="color-aaa">开班时间</p>
              <p class="color-333">{{ classInfo.class_stdate || "--" }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex-wrap pt12 pl12 pr12">
        <template v-if="selectList.length > 0">
          <div class="select-box" style="width: 170px; margin-bottom: 11px">
            <template v-if="selectList[0].fu_class_cnname === '--'">
              <el-select
                v-model="filter.classId"
                clearable
                filterable
                placeholder="请选择分班班级"
              >
                <el-option
                  v-for="(item, index) in classSelectList"
                  :key="index"
                  :label="item.class_cnname"
                  :value="item.class_id"
                ></el-option>
              </el-select>
            </template>
            <template v-else>
              <el-select
                v-model="filter.classId"
                clearable
                filterable
                placeholder="请选择转班班级"
              >
                <el-option
                  v-for="(item, index) in classSelectList"
                  :key="index"
                  :label="item.class_cnname"
                  :value="item.class_id"
                ></el-option>
              </el-select>
            </template>
          </div>
          <div class="flex-al mb12"></div>
          <div class="lines ml16 mr16 mb12"></div>
        </template>

        <div class="flex-al mb12">
          <!-- <span class="mr10 fs14 color-4C5">学生状态</span>-->
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.student_status"
              clearable
              filterable
              placeholder="请选择学生状态"
              @change="search"
            >
              <el-option label="待分班" value="0"></el-option>
              <el-option label="已分班" value="1"></el-option>
            </el-select>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width: 240px">
            <el-input
              v-model="filter.keyword"
              clearable
              placeholder="可检索中/英文名、学员编号"
              @clear="search"
              @keyup.enter.native="search"
            ></el-input>
          </div>
          <el-button
            type="primary"
            size="mini"
            class="search-btn fs14"
            @click="search"
            >查询</el-button
          >
        </div>
      </div>
      <div class="ml12 mb10" v-if="selectList.length > 0">
        <el-button type="primary" size="mini" @click="batch"
          >批量调整</el-button
        >
      </div>

      <div class="tableDiv" ref="auto_height_table">
        <normalTableCont
          :tableData="tableList"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- 按钮操作组********start -->
          <el-table-column
            ref="fixedColumn"
            label="操作"
            align="center"
            width="150px"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="splitClass(scope.row)"
                v-if="scope.row.fu_class_cnname === '--'"
              >
                分班
              </el-button>
              <el-button
                type="text"
                size="small"
                @click.native.prevent="turnClass(scope.row)"
                v-else
              >
                转班
              </el-button>
            </template>
          </el-table-column>
          <!-- 按钮操作组********end -->
        </normalTableCont>
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
    <!-- 拆班 转班 -->
    <div class="studenntManage_dialog">
      <el-dialog
        :title="isSplit ? '分班' : '转班'"
        :visible.sync="showClassDialog"
        width="500px"
        :before-close="handleClose"
      >
        <div class="color-243 fs14">
          <el-form label-width="100px" ref="form" :model="form">
            <template v-if="isSplit">
              <el-form-item
                label="分班班级"
                prop="classId"
                :rules="[
                  {
                    required: true,
                    message: '请选择分班班级',
                  },
                ]"
              >
                <el-select
                  v-model="form.classId"
                  filterable
                  placeholder="请选择分班班级"
                >
                  <el-option
                    v-for="(item, index) in classSelectList"
                    :key="index"
                    :label="item.class_cnname"
                    :value="item.class_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
            <template v-else>
              <el-form-item
                label="转班班级"
                prop="classId"
                :rules="[
                  {
                    required: true,
                    message: '请选择转班班级',
                  },
                ]"
              >
                <el-select
                  v-model="form.classId"
                  filterable
                  placeholder="请选择转班班级"
                >
                  <el-option
                    v-for="(item, index) in classSelectList"
                    :key="index"
                    :label="item.class_cnname"
                    :value="item.class_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="confirmClass">{{
            $t("Common.btn_sure")
          }}</el-button>
          <el-button size="mini" @click="showClassDialog = false">{{
            $t("Common.btn_cancel")
          }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import eduHttp from "../../Educational.js";
import normalTableCont from "@/components/tables/normalTableCont.vue";

export default {
  name: "Educational-studentManage",
  data() {
    return {
      classInfo: {},
      showClassDialog: false,
      isSplit: false,
      //筛选
      filter: {
        classId: "",
        student_status: "",
        keyword: "", //关键词
      },
      form: {
        classId: "",
      },
      classSelectList: [],
      currRow: {},
      selectList: [],
      // 表格数据
      tableList: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],
        options: {
          errortip: "", //空页面提示内容
          studentManageMutiSelect: true, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: 0, //表格高度
        },
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0,
      },
    };
  },
  components: { normalTableCont },
  created() {
    this.getStudentListApi();
  },
  methods: {
    handleSelectionChange(v) {
      this.selectList = v;
      this.filter.classId = "";
      if (this.selectList.length > 0) {
        if (this.selectList[0].fu_class_cnname === "--") {
          this.getSeparateClassApi(null);
        } else {
          this.getSeparateClassApi(this.selectList[0].to_class_id);
        }
      }
    },
    // 教学教务->小循环登记->学员管理
    getStudentListApi() {
      eduHttp
        .getStudentListApi({
          class_id: this.$route.query.class_id,
          student_status: this.filter.student_status,
          keyword: this.filter.keyword,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
        })
        .then((res) => {
          this.tableList.columns = res.data.result.field;
          this.classInfo = res.data.result.classOne;
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          if (res.data.error == "0") {
            this.tableList.list = res.data.result.list;
          } else {
            this.tableList.list = [];
            this.tableList.options.errortip = res.data.errortip;
          }
        });
    },
    // 分班
    splitClass(v) {
      this.isSplit = true;
      this.initDialog();
      this.getSeparateClassApi(null);
      this.currRow = v;
    },
    // 转班
    turnClass(v) {
      this.isSplit = false;
      this.initDialog();
      this.getSeparateClassApi(v.to_class_id);
      this.currRow = v;
    },
    initDialog() {
      this.showClassDialog = true;
      this.$nextTick(() => {
        this.$refs["form"].resetFields();
      });
    },
    // 下拉
    getSeparateClassApi(v) {
      eduHttp
        .getSeparateClassApi({
          class_id: this.$route.query.class_id,
          to_class_id: v,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.classSelectList = res.data.result.list;
          } else {
            this.classSelectList = [];
          }
        });
    },
    confirmClass() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let stu = [];
          stu.push({ student_id: this.currRow.student_id });
          if (this.isSplit) {
            this.separateClassAction(this.form.classId, JSON.stringify(stu));
          } else {
            this.toSeparateClassAction(
              this.form.classId,
              this.currRow.to_class_id,
              JSON.stringify(stu)
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 批量
    batch() {
      let stu = [];
      this.selectList.map((v) => {
        stu.push({ student_id: v.student_id });
      });
      if (this.selectList[0].fu_class_cnname === "--") {
        this.separateClassAction(this.filter.classId, JSON.stringify(stu));
      } else {
        this.toSeparateClassAction(
          this.filter.classId,
          this.selectList[0].to_class_id,
          JSON.stringify(stu)
        );
      }
    },
    // 分班 -- 确定
    separateClassAction(c, v) {
      eduHttp
        .separateClassAction({
          class_id: c,
          student_list: v,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.showClassDialog = false;
            this.$message({
              message: res.data.errortip,
              type: "success",
            });
            this.getStudentListApi();
          } else {
            this.$message({
              message: res.data.errortip,
              type: "error",
            });
          }
        });
    },
    // 转班 -- 确定
    toSeparateClassAction(c, nc, v) {
      eduHttp
        .toSeparateClassAction({
          to_class_id: c,
          class_id: nc,
          student_list: v,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.showClassDialog = false;
            this.$message({
              message: res.data.errortip,
              type: "success",
            });
            this.getStudentListApi();
          } else {
            this.$message({
              message: res.data.errortip,
              type: "error",
            });
          }
        });
    },

    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getStudentListApi();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getStudentListApi();
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.getStudentListApi();
    },
    handleClose(done) {
      done();
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 82
        );
      }
    });
  },
};
</script>
<style lang="less">
.Educational-studentManage {
  .tableDiv {
    .el-table__fixed-header-wrapper {
      .el-table__header {
        .cell {
          .el-checkbox {
            display: none;
          }
        }
      }
      //找到表头那一行，然后把里面的复选框隐藏掉
    }
  }
  .top-info {
    padding: 20px 20px 40px;
    background: #f5f7fa;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 12%;
        line-height: 20px;
        p + p {
          margin-top: 5px;
        }
      }
      .out-progress {
        width: 80px;
        height: 8px;
        background: #dddddd;
        border-radius: 7px;
        .inner-progress {
          height: 8px;
          background: #00a6ff;
          border-radius: 7px;
        }
      }
    }
  }
  .studenntManage_dialog {
    .el-dialog__title {
      color: #24356a;
      font-size: 16px;
    }

    .el-dialog__header {
      border-bottom: 1px solid #dddddd;
      padding-top: 10px;
    }

    //中间弹窗右上的按钮定位
    .dialog-btn {
      position: absolute;
      top: 10px;
      right: 50px;
    }

    .el-dialog__footer {
      background: rgba(246, 249, 252, 1);
      border-top: 1px solid #dddddd;
      padding-bottom: 10px;
    }
  }
}
</style>
