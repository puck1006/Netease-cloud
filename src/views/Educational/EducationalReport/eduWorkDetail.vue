<template>
  <div class="Educational-eduWorkDetail Educational-box height100">
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{ $t("Educational.educationalReport.title3") }}
        </span>
      </div>
      <div class="cr-head-right">
        <el-button size="mini" @click="back">{{ $t("Common.back") }}</el-button>
        <el-button type="primary" size="mini" @click="handleExport">{{
          $t("Common.export")
        }}</el-button>
      </div>
    </div>
    <div class="content-box bg-white flex1 mt8">
      <div class="top-content">
        <ul>
          <li>
            <p>班级名称</p>
            <p>{{ personInfo.class_cnname }}</p>
          </li>
          <li>
            <p>班级别名</p>
            <p>{{ personInfo.class_enname }}</p>
          </li>
          <li>
            <p>{{ $t("Educational.educationalReport.eduWorkDetail.a3") }}</p>
            <p>{{ personInfo.class_branch }}</p>
          </li>
          <li>
            <p>{{ $t("Educational.educationalReport.eduWorkDetail.a4") }}</p>
            <p>{{ personInfo.staffer_cnname }}</p>
          </li>
          <li>
            <p>{{ $t("Educational.educationalReport.eduWorkDetail.a5") }}</p>
            <p>{{ personInfo.fu_staffer_cnname }}</p>
          </li>
          <li>
            <p>{{ $t("Educational.educationalReport.eduWorkDetail.a6") }}</p>
            <p>{{ personInfo.hour_checkingnum }}/{{ personInfo.hour_allnum }}</p>
          </li>
          <li>
            <p>{{ $t("Educational.educationalReport.eduWorkDetail.a7") }}</p>
            <p>{{ personInfo.resign_hour_num }}</p>
          </li>
          <li>
            <p>{{ $t("Educational.educationalReport.eduWorkDetail.a8") }}</p>
            <p>{{ personInfo.no_resign_hour_num }}</p>
          </li>
        </ul>
      </div>
      <div class="pl12 pr12">
        <div class="flex-al">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs14">课时信息</span>
          <!-- <span class="color-243 fs14">{{ personInfo.school_cnname }}</span> -->
        </div>
        <div class="flex-wrap pt12">
          <div class="flex-al mb12">
            <span class="mr10 fs14 color-666">
              {{ $t("Educational.educationalReport.eduWorkDetail.a9") }}
            </span>
            <div class="select-box" style="width: 170px">
              <el-select
                v-model="filter.hour_ischecking"
                filterable
                clearable
                :placeholder="$t('Educational.educationalReport.eduWorkDetail.a10')"
                @change="search"
              >
                <el-option
                  :label="$t('Educational.educationalReport.eduWorkDetail.a14[0]')"
                  value="1"
                ></el-option>
                <el-option
                  :label="$t('Educational.educationalReport.eduWorkDetail.a14[1]')"
                  value="0"
                ></el-option>
                <el-option
                  :label="$t('Educational.educationalReport.eduWorkDetail.a14[2]')"
                  value="2"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="lines ml16 mr16 mb12"></div>
          <div class="flex-al mb12">
            <span class="mr10 fs14 color-666">
              {{ $t("Educational.educationalReport.eduWorkDetail.a11") }}
            </span>
            <div class="select-box" style="width: 170px">
              <el-select
                v-model="filter.is_register"
                filterable
                clearable
                :placeholder="$t('Educational.educationalReport.eduWorkDetail.a12')"
                @change="search"
              >
                <el-option
                  :label="$t('Educational.educationalReport.eduWorkDetail.a15[0]')"
                  value="0"
                ></el-option>
                <el-option
                  :label="$t('Educational.educationalReport.eduWorkDetail.a15[1]')"
                  value="1"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="lines ml16 mr16 mb12"></div>
          <div class="flex-wrap">
            <div class="flex-al Inquire-box mb12">
              <div class="ipt-box" style="width: 260px">
                <el-input
                  v-model="filter.keyword"
                  clearable
                  placeholder="请输入课时名称"
                  @clear="search"
                  @keyup.enter.native="search"
                ></el-input>
              </div>
              <el-button
                type="primary"
                size="mini"
                class="search-btn fs14"
                @click="search"
                >{{ $t("Common.input_button") }}</el-button
              >
            </div>
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
    </div>
  </div>
</template>

<script>
import normalTableCont from "@/components/tables/normalTableCont.vue";
import eduHttp from "../Educational.js";

export default {
  name: "Educational-eduWorkDetail",
  components: {
    normalTableCont,
  },
  data() {
    return {
      personInfo: {},
      //筛选
      filter: {
        hour_ischecking: "",
        is_register: "",
        keyword: "", //关键词
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
          issetting: false, //是否可以编辑列
          tableHeight: 0, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "report_classTime", //当前页面的名称，通常与路由名称一致
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
  created() {
    this.getEasWorkOneApi();
    this.getClassOneApi();
  },
  watch: {},
  computed: {},
  methods: {
    // 获取列表
    getEasWorkOneApi() {
      eduHttp
        .getEasWorkOneApi({
          keyword: this.filter.keyword,
          hour_ischecking: this.filter.hour_ischecking,
          is_register: this.filter.is_register,
          class_id: this.$route.query.class_id,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          this.classInfo = res.data.result.info;
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
          this.tableList.columns.map((v) => {
            if (v.fieldstring == "hour_name") {
              this.$set(v, "ismethod", true);
            }
          });
          if (res.data.error == "0") {
            this.tableList.list = res.data.result.list; //表格数据
          } else {
            this.tableList.list = [];
            this.tableList.options.errortip = res.data.errortip;
          }
        });
    },
    // 头部
    getClassOneApi() {
      eduHttp
        .getClassOneApi({
          class_id: this.$route.query.class_id,
        })
        .then((res) => {
          this.personInfo = res.data.result.list;
        });
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 导出
    handleExport() {
      let token = this.$Tool.getStorage("USER_TOKEN")
        ? this.$Tool.getStorage("USER_TOKEN")
        : "";
      let stafferId = this.$Tool.getStorage("STAFFER_ID")
        ? this.$Tool.getStorage("STAFFER_ID")
        : "";
      let companyId = this.$Tool.getStorage("COMPANY_ID")
        ? this.$Tool.getStorage("COMPANY_ID")
        : "";
      if (!this.tableList.list.length == 0) {
        let is_count = 1;
        let p = this.paging.curPage;
        let num = this.paging.pageSize;
        let keyword = this.filter.keyword;
        let class_id = this.$route.query.class_id;
        let hour_ischecking = this.filter.hour_ischecking;
        let is_register = this.filter.is_register;
        let address = eduHttp.getEasWorkOneApiUrl();
        const url = `${address}?is_count=${is_count}&p=${p}&num=${num}&keyword=${keyword}&token=${token}&staffer_id=${stafferId}&company_id=${companyId}&class_id=${class_id}
        &hour_ischecking=${hour_ischecking}&is_register=${is_register}&is_export=1`;
        console.log(url);
        window.open(url);
      } else {
        this.$message({
          message: "暂无数据",
          type: "error",
        });
      }
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.getEasWorkOneApi();
    },
    // 跳转
    handleColumnChange(i, v, c) {
      console.log(i, v, c);
      this.$Tool.setStorage("sliderActiveIndex", "1");
      this.$store.dispatch("setActiveIndex", "1");
      this.$router.push(
        `/Educational/circulateRegistrat/classRecord?class_id=${c.class_id}&type=offlineRegist&hour_id=${c.hour_id}`
      );
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.getEasWorkOneApi();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getEasWorkOneApi();
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getEasWorkOneApi();
    },

    handleClose(done) {
      done();
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
.Educational-eduWorkDetail {
  .top-content {
    margin: 8px 0;
    padding: 40px 10px;
    height: 121px;
    background: rgba(249, 252, 255, 1);
    ul {
      text-align: center;
      display: flex;
      li {
        margin-right: 40px;
        width: 20%;
        p:first-child {
          color: #4c5e95;
          font-size: 14px;
          margin-bottom: 8px;
        }
        p:last-child {
          font-size: 16px;
          color: #24356a;
        }
      }
    }
  }
}
</style>
