<template>
  <div class="Educational-publishWork-alreadyWork height100">
    <!-- 页面右边按钮***start -->
    <!-- <div class="right-btn">
      <el-button type="primary" size="mini" @click="handExport">
        {{ $t("Interesting.report.btn_text1") }}
      </el-button>
    </div>-->
    <div class="content-box bg-white flex1 pl12 pr12">
      <div class="tableDiv" ref="auto_height_table">
        <normalTableCont
          :tableData="tableList"
          @handleColumnChange="handleColumnChange"
          @handSetting="handSetting"
        >
          <!-- 按钮操作组********start -->
          <el-table-column
            ref="fixedColumn"
            :label="$t('Common.table_operate')"
            align="center"
            width="120px"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.native.prevent="handSee(scope.row)">
                {{
                $t("Educational.JingleAssistant.educationWork.child2.ar")
                }}
              </el-button>
            </template>
          </el-table-column>
          <!-- 按钮操作组********end -->
        </normalTableCont>
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
    <!-- 查看详情 -->
    <el-drawer
      :title="$t('Educational.JingleAssistant.homeWork.title1')"
      :visible.sync="workDetailVisible"
      direction="rtl"
      size="700px"
      :modal="false"
      custom-class="pop-slider--box workDetail-box"
      :before-close="handleClose"
    >
      <div class="slider-content pt16 pb16">
        <div class="pl16 pr16">
          <div class="title fs18 tc">{{ detailInfo.homework_title }}</div>
          <div class="fs14 mt10 tc color-aaa mb24">
            <span class="mr30">{{ detailInfo.homework_createtime }}</span>
            <span class="mr30">
              {{
              $t("Educational.JingleAssistant.homeWork.labe_text6")
              }} : {{ receiveMan }}
            </span>
            <span>
              {{ $t("Educational.JingleAssistant.homeWork.labe_text7")
              }} : {{ hourRead }}
            </span>
          </div>
          <div class="cont color-666" v-html="detailInfo.homework_content"></div>
        </div>
        <div class="media-cont mt12 pl16 pr8">
          <previewMedia :fileList="detailInfo.homework_mediajson"></previewMedia>
        </div>
      </div>
    </el-drawer>
    <!-- 查看作业完成状态 -->
    <div class="small-dialog" v-if="seeWorkStatus">
      <el-dialog
        :title="$t('Educational.JingleAssistant.homeWork.title2')"
        :visible.sync="seeWorkStatus"
        width="700px"
        class="seeWorkStatus"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              :label="
                `${$t('Educational.JingleAssistant.homeWork.tabs[0]')} (${
                  WorkStatusNum.readNum
                })`
              "
              name="first"
            >
              <ul v-if="WorkStatusList.readlist.length > 0" class="fs12">
                <li
                  class="flex-al mb24"
                  v-for="(item, index) in WorkStatusList.readlist"
                  :key="index"
                >
                  <img
                    v-if="item.student_img && item.student_img != ''"
                    :src="item.student_img"
                    alt
                  />
                  <img
                    v-else-if="item.student_sex == $t('Common.woman')"
                    src="@/assets/images/woman.png"
                    alt
                  />
                  <img v-else src="@/assets/images/default-new-men.png" alt />
                  <span class="ml4 mr4">{{ item.student_cnname }}</span>
                  <i v-if="item.student_sex == $t('Common.woman')" class="icon-girl"></i>
                  <i v-else class="icon-boy"></i>
                  <span class="status ml5">{{ item.stustate }}</span>
                </li>
              </ul>
              <blank
                v-else
                :blankCont="
                  $t('Educational.JingleAssistant.homeWork.blankTips[0]')
                "
              ></blank>
            </el-tab-pane>
            <el-tab-pane
              :label="
                `${$t('Educational.JingleAssistant.homeWork.tabs[1]')} (${
                  WorkStatusNum.noreadNum
                })`
              "
              name="second"
            >
              <ul v-if="WorkStatusList.noreadlist.length > 0" class="fs12">
                <li
                  class="flex-al mb24"
                  v-for="(item, index) in WorkStatusList.noreadlist"
                  :key="index"
                >
                  <img
                    v-if="item.student_img && item.student_img != ''"
                    :src="item.student_img"
                    alt
                  />
                  <img
                    v-else-if="item.student_sex == $t('Common.woman')"
                    src="@/assets/images/woman.png"
                    alt
                  />
                  <img v-else src="@/assets/images/default-new-men.png" alt />
                  <span class="ml4 mr4">{{ item.student_cnname }}</span>
                  <i v-if="item.student_sex == $t('Common.woman')" class="icon-girl"></i>
                  <i v-else class="icon-boy"></i>
                  <span class="status ml5">{{ item.stustate }}</span>
                </li>
              </ul>
              <blank
                v-else
                :blankCont="
                  $t('Educational.JingleAssistant.homeWork.blankTips[1]')
                "
              ></blank>
            </el-tab-pane>

            <el-tab-pane
              :label="
                `${$t('Educational.JingleAssistant.homeWork.tabs[4]')} (${
                  WorkStatusNum.allnum
                })`
              "
              name="five"
            >
              <ul v-if="WorkStatusList.alllist.length > 0" class="fs12">
                <li
                  class="flex-al mb24"
                  v-for="(item, index) in WorkStatusList.alllist"
                  :key="index"
                >
                  <img
                    v-if="item.student_img && item.student_img != ''"
                    :src="item.student_img"
                    alt
                  />
                  <img
                    v-else-if="item.student_sex == $t('Common.woman')"
                    src="@/assets/images/woman.png"
                    alt
                  />
                  <img v-else src="@/assets/images/default-new-men.png" alt />
                  <span class="ml4 mr4">{{ item.student_cnname }}</span>
                  <i v-if="item.student_sex == $t('Common.woman')" class="icon-girl"></i>
                  <i v-else class="icon-boy"></i>
                  <span class="status ml5">{{ item.stustate }}</span>
                </li>
              </ul>
              <blank
                v-else
                :blankCont="
                  $t('Educational.JingleAssistant.homeWork.blankTips[4]')
                "
              ></blank>
            </el-tab-pane>
          </el-tabs>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="mini"
            @click="seeWorkStatus = false"
          >{{ $t("Common.btn_sure") }}</el-button>
          <el-button size="mini" @click="seeWorkStatus = false">
            {{
            $t("Common.btn_cancel")
            }}
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import blank from "@/components/common/Blank/blank.vue";
import previewMedia from "@/components/previewMedia/previewMedia.vue";
import httpApi from "../../../Educational.js";

export default {
  name: "Educational-publishWork-alreadyWork",
  components: {
    blank,
    previewMedia,
    normalTableCont
  },
  data() {
    return {
      workDetailVisible: false, //通知详情
      seeWorkStatus: false, //查看通知完成状态
      delVisible: false,
      activeName: "first",
      hourRead: "",
      receiveMan: "",
      homeworkId: "", //通知id
      // 表格数据
      tableList: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: 0, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "JingleAssistant-alreadyWork" //当前页面的名称，通常与路由名称一致
        }
      },
      // 通知详情
      detailInfo: {
        media_json: []
      },
      // 通知完成状态
      WorkStatusNum: {
        allnum: 0,
        readNum: 0,
        noreadNum: 0
      },
      WorkStatusList: {},
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0
      }
    };
  },
  created() {
    this.homeworkAllListApi(); // 后台PC->班级通知列表-qyh
  },
  watch: {},
  computed: {},
  methods: {
    // 后台PC->班级通知列表-qyh
    homeworkAllListApi() {
      httpApi
        .homeworkAllListApi({
          class_id: this.$route.query.class_id,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1" //是否需要总数
        })
        .then(res => {
          if (res.data.error == "0") {
            this.paging.pageTotal = parseInt(res.data.result.allnum);
            this.tableList.columns = res.data.result.field;
            this.tableList.columns.map(v => {
              if (v.fieldstring == "hourread") {
                this.$set(v, "ismethod", 1);
              }
            });
            this.tableList.list = res.data.result.list; //表格数据
          } else {
            this.tableList.list = [];
            this.tableList.options.errortip = res.data.errortip;
          }
        });
    },
    //作业查询 作业学生状态
    homeworkStuStatePCApi() {
      httpApi
        .homeworkStuStatePCApi({
          homework_id: this.homeworkId,
          class_id: this.$route.query.class_id
        })
        .then(res => {
          const { list, num } = res.data.result;
          let temp = num[0]
          this.WorkStatusNum = {
            allnum: temp.allnum ? temp.allnum : 0,
            readNum: temp.readNum ? temp.readNum : 0,
            noreadNum: temp.noreadNum ? temp.noreadNum : 0
          };
          this.WorkStatusList = {
            readlist: list.readlist ? list.readlist : [],
            noreadlist: list.noreadlist ? list.noreadlist : [],
            alllist: list.alllist ? list.alllist : []
          };
          this.seeWorkStatus = true;
        });
    },
    //班级通知（后台PC）->班级通知详情-qyh
    homeworkItemApi() {
      httpApi
        .homeworkItemApi({
          homework_id: this.homeworkId
        })
        .then(res => {
          if (res.data.error == "0") {
            this.detailInfo = res.data.result.list;
          } else {
            this.detailInfo = {};
          }
          this.receiveMan = this.detailInfo.classInfo[0].class_cnname;
          this.detailInfo.homework_mediajson = this.detailInfo
            .homework_mediajson
            ? JSON.parse(this.detailInfo.homework_mediajson)
            : [];
          this.workDetailVisible = true;
        });
    },

    // 点击表格中的内容
    handleColumnChange(v1, v2, v3) {
      console.log(v1, v2, v3);
      this.homeworkId = v3.homework_id;
      console.log(v3);
      this.homeworkStuStatePCApi(); //作业查询 作业学生状态
    },
    // 点击查看
    handSee(row) {
      console.log(row);
      this.homeworkId = row.homework_id;
      this.hourRead = row.hourread;
      this.homeworkItemApi();
    },
    // tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.homeworkAllListApi(); // 后台PC->班级通知列表-qyh
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.homeworkAllListApi(); // 后台PC->班级通知列表-qyh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.homeworkAllListApi(); // 后台PC->班级通知列表-qyh
    },
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
.Educational-publishWork-alreadyWork {
  // 查看通知完成状态
  .seeWorkStatus {
    .el-dialog__body {
      padding: 10px 16px;
      .dialog-content ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        li {
          width: 33.33%;
          img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
          }
          .status {
            display: inline-block;
            padding: 0 4px;
            color: #00b100;
            border: 1px solid rgba(28, 173, 6, 1);
          }
        }
      }
    }
  }
}
// 通知详情
.workDetail-box {
  .cont {
    line-height: 20px;
  }
}
</style>
