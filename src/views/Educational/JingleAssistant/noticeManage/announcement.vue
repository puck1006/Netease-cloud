<template>
  <div class="Educational-homeworkManage-jobQuery height100">
    <!-- 页面右边按钮***start -->
    <div class="right-btn">
      <el-button type="primary" size="mini" @click="handlePublish">
        {{
        $t("Educational.JingleAssistant.noticeManage.btn_text1")
        }}
      </el-button>
    </div>
    <div class="content-box bg-white flex1 pl12 pr12">
      <div class="flex-wrap pt12">
        <div class="flex-al mb12">
          <span
            class="mr10 fs14 color-4C5"
          >{{ $t("Educational.JingleAssistant.noticeManage.labe_text1") }}</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.tiemRange"
              clearable
              filterable
              :placeholder="
                $t('Educational.JingleAssistant.noticeManage.placeholder1')
              "
              @change="tiemRangeSearch"
            >
              <el-option
                v-for="item in filter.timeList"
                :key="item.value"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="time-box ml12" style="width:260px;">
            <el-date-picker
              v-model="filter.time"
              type="daterange"
              :range-separator="$t('Common.range_time')"
              value-format="yyyy-MM-dd"
              :start-placeholder="$t('Common.start_time')"
              :end-placeholder="$t('Common.end_time')"
              @change="timeSearch"
            ></el-date-picker>
          </div>
        </div>
        <div class="lines ml16 mr16 mb12"></div>
        <!-- <div class="flex-al mb12">
          <span class="mr10 fs14 color-666">{{
            $t("Educational.JingleAssistant.homeWork.labe_text11")
          }}</span>
          <div class="select-box" style="width:170px;">
            <el-select
              v-model="filter.schoolId"
              filterable
              clearable
              :placeholder="
                $t('Educational.JingleAssistant.homeWork.placeholder11')
              "
              @change="search"
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
        <div class="lines ml16 mr16 mb12"></div>-->
        <div class="flex-al Inquire-box mb12">
          <div class="ipt-box" style="width:200px;">
            <el-input
              v-model="filter.keyword"
              clearable
              :placeholder="
                $t('Educational.JingleAssistant.noticeManage.placeholder4')
              "
              @clear="search"
              @keyup.enter.native="search"
            ></el-input>
          </div>
          <el-button
            type="primary"
            size="mini"
            class="search-btn fs14"
            @click="search"
          >{{ $t("Common.input_button") }}</el-button>
        </div>
      </div>
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
              <el-button
                type="text"
                size="small"
                @click.native.prevent="handEdit(scope.row)"
              >{{ $t("Common.btn_edit2") }}</el-button>
              <el-button
                type="text"
                size="small"
                @click.native.prevent="handDel(scope.row)"
              >{{ $t("Common.btn_del") }}</el-button>
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
    <!-- 查看公告详情 -->
    <el-drawer
      :title="$t('Educational.JingleAssistant.noticeManage.title3')"
      :visible.sync="workDetailVisible"
      direction="rtl"
      size="700px"
      :modal="false"
      custom-class="pop-slider--box workDetail-box"
      :before-close="handleClose"
    >
      <div class="slider-content pt16 pb16">
        <div class="pl16 pr16">
          <div class="title fs18 tc">{{ detailInfo.message_title }}</div>
          <div class="fs14 mt10 tc color-aaa mb24">
            <span class="mr30">{{ detailInfo.message_createtime }}</span>
            <span class="mr30">
              {{ $t("Educational.JingleAssistant.noticeManage.labe_text4")
              }}{{ detailInfo.staffer_cnname }}
            </span>
            <span>
              {{ $t("Educational.JingleAssistant.noticeManage.labe_text5") }}
              <span
                class="color-blue"
              >{{ detailInfo.readnum }}/{{ detailInfo.allnum }}</span>
            </span>
          </div>
          <div class="cont color-666" v-html="detailInfo.message_content"></div>
        </div>
        <!-- <div class="media-cont mt12 pl16 pr8">
          <previewMedia :fileList="detailInfo.media_json"></previewMedia>
        </div>-->
      </div>
    </el-drawer>
    <el-drawer
      :title="
        isCreate
          ? $t('Educational.JingleAssistant.noticeManage.title4')
          : $t('Educational.JingleAssistant.noticeManage.title5')
      "
      :visible.sync="announcementVisible"
      v-if="announcementVisible"
      direction="rtl"
      size="700px"
      :modal="false"
      custom-class="pop-slider--box announcement-pop"
      :before-close="handleClose"
    >
      <div class="slider-content pb16">
        <el-button
          @click="submitForm('announcementForm')"
          class="announcement-publish"
          type="primary"
          size="small"
        >
          {{
          isCreate
          ? $t("Educational.JingleAssistant.noticeManage.btn_text2")
          : $t("Educational.JingleAssistant.noticeManage.btn_text3")
          }}
        </el-button>
        <!-- <p class="announcement-pop-tips">
          <i class="icon-tips mr4"></i>
          {{ $t("Educational.JingleAssistant.noticeManage.tips") }}
        </p>-->
        <div class="pAll16">
          <el-form ref="announcementForm" :model="announcementForm" label-width="100px">
            <el-form-item :label="$t('Educational.JingleAssistant.noticeManage.form_text100')">
              <span class="ml5">{{this.$UserInfo.school_cnname}}</span>
            </el-form-item>
            <el-form-item
              label="发布对象："
              prop="message_object"
              :rules="[
                {
                  required: true,
                  type: 'array',
                  message: '请选择发布对象',
                  trigger: 'change',
                }
              ]"
            >
              <el-checkbox-group v-model="announcementForm.message_object">
                <el-checkbox label="1">学员</el-checkbox>
                <el-checkbox label="2">老师</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              :label="$t('Educational.JingleAssistant.noticeManage.form_text1')"
              prop="message_title"
              :rules="[
                {
                  required: true,
                  message: $t(
                    'Educational.JingleAssistant.noticeManage.form_rule1'
                  ),
                  trigger: 'blur'
                }
              ]"
            >
              <el-input
                style="width: 300px"
                v-model.trim="announcementForm.message_title"
                type="text"
                :placeholder="
                  $t('Educational.JingleAssistant.noticeManage.form_rule1')
                "
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('Educational.JingleAssistant.noticeManage.form_text2')"
              prop="message_content"
              :rules="[
                {
                  required: true,
                  message: $t(
                    'Educational.JingleAssistant.noticeManage.form_rule2'
                  ),
                  trigger: 'blur'
                }
              ]"
            >
              <VueNeditorWrap
                ref="ueditor"
                v-model.trim="announcementForm.message_content"
                :destroy="true"
                :config="config"
              ></VueNeditorWrap>
            </el-form-item>

            <el-form-item label="上传图片：">
              <el-upload
                class="upload-demo"
                drag
                :action="`${baseUrl}/Uploading/Picture`"
                name="ossfile"
                :data="Uploadfile"
                multiple
                :show-file-list="false"
                :on-success="handleAvatarSuccess4"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">上传图片</div>
              </el-upload>
              <!-- <el-input type="textarea" v-show="false" v-model="announcementForm.message_mediajson"></el-input> -->
              <div
                class="pl20 pr10 pt20 bg-white media-cont media-cont-show"
                v-if="announcementForm.message_mediajson"
              >
                <previewMedia
                  :isEditImg="true"
                  @delMedia="delMedia"
                  :fileList="announcementForm.message_mediajson"
                ></previewMedia>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-drawer>

    <!-- 删除弹框-->
    <popTips
      :dialogVisable="delVisible"
      :popTipsCont="popTips_del"
      @handConfirm="delMessageAction"
      @handCancel="delVisible = false"
      @handleCloseTip="delVisible = false"
    ></popTips>
  </div>
</template>

<script>
import previewMedia from "@/components/common/previewMedia.vue";
import VueNeditorWrap from "vue-neditor-wrap";
import normalTableCont from "@/components/tables/normalTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
// import previewMedia from "@/components/previewMedia/previewMedia.vue";
import httpApi from "../../Educational.js";

export default {
  name: "Educational-homeworkManage-jobQuery",
  components: {
    VueNeditorWrap,
    popTips,
    previewMedia,
    normalTableCont,
  },
  data() {
    return {
      baseUrl: "",
      Uploadfile: {
        company_id: "",
        ossfile: "",
      },
      checked1: false,
      checked2: false,
      workDetailVisible: false, //公告详情
      announcementVisible: false, // 发布公告公告
      delVisible: false,
      isCreate: true, //是否是发布公告
      messageId: "", //公告id
      // 公告表单
      announcementForm: {
        message_title: "",
        message_content: "",
        message_mediajson: [],
        message_object: [],
      },
      // 编辑器配置
      config: {
        UEDITOR_HOME_URL: "/NEditor/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 300,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: `${this.$urls.crmApiUrl}/Uploading/Picture`,
        // toolbars: [
        //   [
        //     // "insertimage",
        //     // "insertvideo",
        //     // 'insertcode',
        //     "source",
        //     "justifyleft",
        //     "justifyright",
        //     "justifycenter",
        //     "justifyjustify",
        //     "fontfamily",
        //     "fontsize",
        //     "link",
        //     "inserttable",
        //     "fullscreen",
        //     "forecolor",
        //     "backcolor"
        //   ]
        // ]
      },
      // 删除提示弹窗
      popTips_del: {
        btn_text1: this.$t("Common.btn_sure"),
        btn_text2: this.$t("Common.btn_cancel"),
        title: this.$t("Common.popTips"),
        context: this.$t("Common.popTips_del"),
      },
      //筛选
      filter: {
        time: "",
        tiemRange: "",
        starttime: "",
        endtime: "",
        schoolId: "",
        schoolList: "",
        timeList: [
          {
            text: this.$t("Educational.JingleAssistant.timeListText[0]"),
            value: "",
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[1]"),
            value: "today",
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[2]"),
            value: "yesterday",
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[3]"),
            value: "week",
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[4]"),
            value: "sevenDay",
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[5]"),
            value: "threeDay",
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[6]"),
            value: "thisMonth",
          },
          {
            text: this.$t("Educational.JingleAssistant.timeListText[7]"),
            value: "prevMonth",
          },
        ],
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
          issetting: true, //是否可以编辑列
          tableHeight: 0, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "JingleAssistant_announcement", //当前页面的名称，通常与路由名称一致
        },
      },
      // 公告详情
      detailInfo: {
        message_mediajson: [],
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0,
      },
    };
  },
  created() {
    this.baseUrl = this.$urls.easxApiUrl;
    this.PcNoticeMessage(); // 后台PC->公告列表-qyh
    this.getSchoolApi();
    this.Uploadfile = {
      company_id: this.$store.state.COMPANY_ID,
    };
  },
  watch: {},
  computed: {},
  methods: {
    delMedia(item, index) {
      this.formData.img_list.forEach((val, index) => {
        if (val.url == item.url) {
          this.formData.img_list.splice(index, 1);
        }
      });
      console.log(item, index);
    },
    handleAvatarSuccess4(res, file) {
      console.log(res, file);
      let obj = {};
      obj.type = "img";
      obj.url = res.result.picture_imgurl;
      obj.img_name = file.name;
      this.announcementForm.message_mediajson.push(obj);
    },
    // 后台PC->公告列表-qyh
    PcNoticeMessage() {
      httpApi
        .PcNoticeMessage({
          keyword: this.filter.keyword,
          start_time: this.filter.time ? this.filter.time[0] : "",
          end_time: this.filter.time ? this.filter.time[1] : "",
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1", //是否需要总数
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.all_num);
          let obj = this.$Tool.getStorage(
            "module" + [this.tableList.options.moduleName]
          );
          if (obj) {
            if (obj["show_" + [this.tableList.options.ColumnName]]) {
              this.tableList.columns =
                obj["show_" + [this.tableList.options.ColumnName]];
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
        });
    },
    //后台PC->学校下拉-qyh
    getSchoolApi() {
      httpApi.getSchoolApi({}).then((res) => {
        if (res.data.error == "0") {
          this.filter.schoolList = res.data.result.list;
        } else {
          this.filter.schoolList = [];
        }
      });
    },
    //班级公告（后台PC）->班级公告详情-qyh
    MessageDetail(type) {
      httpApi
        .MessageDetail({
          message_id: this.messageId,
        })
        .then((res) => {
          let data = res.data.result.data;
          if (type == "edit") {
            // 编辑查看
            this.announcementForm.message_title = data.message_title;
            this.announcementForm.message_content = data.message_content;
            this.announcementForm.message_object =
              data.message_object == "0"
                ? ["1", "2"]
                : data.message_object == "1"
                ? ["1"]
                : ["2"];
            this.announcementVisible = true;
          } else {
            if (res.data.error == "0") {
              this.detailInfo = data;
            } else {
              this.detailInfo = {};
            }
            this.detailInfo.message_mediajson = this.detailInfo
              .message_mediajson
              ? JSON.parse(this.detailInfo.message_mediajson)
              : [];
            this.workDetailVisible = true;
          }
        });
    },
    //后台PC->删除公告/公告-qyh
    delMessageAction() {
      httpApi
        .delMessageAction({
          message_id: this.messageId,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.PcNoticeMessage(); // 后台PC->公告列表-qyh
            this.delVisible = false;
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //后台PC->发布公告-qyh
    createMessageAction() {
      httpApi
        .createMessageAction({
          message_title: this.announcementForm.message_title,
          message_content: this.announcementForm.message_content,
          message_object:
            this.announcementForm.message_object.length == 1
              ? this.announcementForm.message_object[0]
              : "0",
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.PcNoticeMessage(); // 后台PC->公告列表-qyh
            this.announcementVisible = false;
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //后台PC->编辑公告-qyh
    updateMessageAction() {
      httpApi
        .updateMessageAction({
          message_title: this.announcementForm.message_title,
          message_content: this.announcementForm.message_content,
          message_object:
            this.announcementForm.message_object.length == 1
              ? this.announcementForm.message_object[0]
              : "0",
          message_id: this.messageId,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.PcNoticeMessage(); // 后台PC->公告列表-qyh
            this.announcementVisible = false;
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 检索
    search() {
      this.paging.curPage = 1;
      this.PcNoticeMessage(); // 后台PC->公告列表-qyh
    },
    // 时间范围检索
    tiemRangeSearch() {
      this.paging.curPage = 1;
      switch (this.filter.tiemRange) {
        case "today":
          this.filter.starttime = this.$Tool.getDay(0);
          this.filter.endtime = this.filter.starttime;
          break;
        case "yesterday":
          this.filter.starttime = this.$Tool.getDay(-1);
          this.filter.endtime = this.filter.starttime;
          break;
        case "week":
          console.log(this.$Tool.getAppointedDate(1, 0).startDate);
          this.filter.starttime = this.$Tool.getAppointedDate(1, 0).startDate;
          this.filter.endtime = this.$Tool.getAppointedDate(1, 0).endDate;
          break;
        case "sevenDay":
          this.filter.starttime = this.$Tool.getDay(-7);
          this.filter.endtime = this.$Tool.getDay(0);
          break;
        case "threeDay":
          this.filter.starttime = this.$Tool.getDay(-30);
          this.filter.endtime = this.$Tool.getDay(0);
          break;
        case "thisMonth":
          this.filter.starttime = this.$Tool.getAppointedDate(2, 0).startDate;
          this.filter.endtime = this.$Tool.getAppointedDate(2, 0).endDate;
          break;
        case "prevMonth":
          console.log(this.$Tool.getAppointedDate(2, 1).startDate);
          this.filter.starttime = this.$Tool.getAppointedDate(2, 1).startDate;
          this.filter.endtime = this.$Tool.getAppointedDate(2, 1).endDate;
          break;
        default:
          this.filter.starttime = "";
          this.filter.endtime = "";
          break;
      }
      this.filter.time = [this.filter.starttime, this.filter.endtime];
      console.log(this.filter.time);
      this.PcNoticeMessage(); // 后台PC->公告列表-qyh
    },
    // 时间检索
    timeSearch() {
      this.filter.tiemRange = "";
      this.paging.curPage = 1;
      this.PcNoticeMessage(); // 后台PC->公告列表-qyh
    },
    // 新增、编辑提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isCreate) {
            // 发布提交
            this.createMessageAction();
          } else {
            // 编辑提交
            this.updateMessageAction();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 点击表格中的内容
    handleColumnChange(v1, v2, v3) {
      console.log(v1, v2, v3);
      this.messageId = v3.message_id;
      this.MessageDetail("see");
    },
    // 点击删除
    handDel(row) {
      console.log(row);
      this.messageId = row.message_id;
      this.delVisible = true;
    },
    // 点击编辑
    handEdit(row) {
      console.log(row);
      this.messageId = row.message_id;
      this.isCreate = false;
      this.MessageDetail("edit");
    },
    // 点击发布
    handlePublish() {
      this.isCreate = true;
      this.resetForm("announcementForm");
      this.announcementVisible = true;
    },
    // 导出
    handExport() {
      // const token = this.$userDetails.token;
      // const stafferId = this.$userDetails.stafferId;
      // const schoolId = this.$userDetails.schoolId;
      // const companyId = this.$userDetails.companyId;
      // const re_postbe_id = this.$userDetails.re_postbe_id;
      // const dataequity = this.$userDetails.dataequity;
      // const account_class = this.$userDetails.account_class;
      // let url = httpApi.SchoolExport();
      // console.log(url);
      // if (this.tableList.list.length > 0) {
      //   window.open(
      //     `${url}?staffer_id=${stafferId}&token=${token}&dataequity=${dataequity}&account_class=${account_class}&school_id=${schoolId}&company_id=${companyId}&re_postbe_id=${re_postbe_id}&date=${this.filter.time}&schoolId=${this.filter.schoolId}`,
      //     "_blank"
      //   );
      // } else {
      //   this.$message.error(this.$t('Common.export_tips'));
      // }
    },
    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
      this.PcNoticeMessage(); // 后台PC->公告列表-qyh
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.PcNoticeMessage(); // 后台PC->公告列表-qyh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.PcNoticeMessage(); // 后台PC->公告列表-qyh
    },
    // 重置表单
    resetForm(form) {
      if (this.$refs[form]) {
        this.$refs[form].resetFields();
      }
    },
    handleClose(done) {
      this.announcementForm.message_content = "";
      this.announcementForm.message_title = "";
      this.announcementForm.message_object = [];

      console.log(this.announcementForm);
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
// 公告详情
.announcement-pop {
  .announcement-pop-tips {
    padding: 3px 10px;
    display: flex;
    align-items: center;
    color: #00a6ff;
    background: rgba(0, 166, 255, 0.19);
    .icon-tips::before {
      color: #00a6ff;
    }
  }
  .slider-content {
    position: relative;
  }
  .announcement-publish {
    position: absolute;
    top: -40px;
    right: 50px;
  }
}
#edui_fixedlayer {
  z-index: 9999 !important;
}
</style>
