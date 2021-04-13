<template>
  <div class="Educational-jingleAssistant-classReviews">
    <div class="content-box bg-white class-reviews-box flex1">
      <div class="pl10 pt12">
        <p
          class="fs14 color-333 mb10"
        >{{ $t("Educational.JingleAssistant.educationWork.child1.labe1") }}</p>
        <div class="swiperDiv">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(onehour, index) in hourList" :key="index">
              <div class="one-swiper cur-pointer" @click="clickSwiper(onehour, index)">
                <div class="status ml10">
                  <div
                    class="circle mr8"
                    :class="{
                      'bg-red': onehour.hour_ischecking == 1,
                      'bg-blue': onehour.hour_ischecking == 2,
                      'bg-8A9': onehour.hour_ischecking == 0
                    }"
                  ></div>
                  <span class="fs12 color-243">
                    {{
                    onehour.hour_ischeckingname
                    }}
                  </span>
                </div>
                <div class="lesson fs14 flex" :class="{ activeswiper: onehour.active }">
                  <span>{{ onehour.hour_name }}</span>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <i v-show="hourList.length>0" class="el-icon-arrow-left"></i>
          <i v-show="hourList.length>0" class="el-icon-arrow-right"></i>
        </div>
        <div class="content-row pt10">
          <p
            class="fs14 color-333 mb10"
          >{{ $t("Educational.JingleAssistant.educationWork.child1.labe2") }}</p>
          <div class="content-row-box">
            <template v-if="courseContent=='' &&!isHaveEdit">
              <div class="add-content fs14 color-aaa mt12 mb10 flex-al">
                <span @click="handAddCont" class="add-icon flex-al-ce mr5 cur-pointer mr8">
                  <i class="icon-tianjia"></i>
                </span>
                <span
                  @click="handAddCont"
                  class="cur-pointer"
                >{{ $t("Educational.JingleAssistant.educationWork.child1.labe3") }}</span>
              </div>
            </template>
            <template v-else-if="isHaveEdit">
              <div class="input-content flex-al mb10">
                <el-input
                  v-model.lazy="courseContent"
                  :placeholder="$t('Educational.JingleAssistant.educationWork.child1.placeholder1')"
                  style="width: 600px;"
                  type="textarea"
                  class="mr20"
                ></el-input>
                <el-button
                  @click="updateHourContentAction"
                  type="primary"
                  size="small"
                >{{ $t("Common.btn_sure") }}</el-button>
                <el-button
                  @click="hourContentApi"
                  type="default"
                  size="small"
                  class="mr20"
                >{{ $t("Common.btn_cancel") }}</el-button>
              </div>
            </template>
            <template v-else>
              <div class="edit-content flex-al mb10">
                <div class="course_cont">{{courseContent}}</div>
                <span
                  @click="handEditCont"
                  class="edit-btn flex-al cur-pointer ml15 color-blue fs12"
                >
                  <em class="edit-icon icon-bianji fs20 mr5"></em>
                  {{ $t("Common.btn_edit2") }}
                </span>
              </div>
            </template>
          </div>
        </div>
        <div class="top-operate fs14 color-333 flex-all pr20">
          <div v-if="hourDetail!='{}'" class="left-operate status-row">
            <span class="flex-al mb10">
              {{$t('Educational.JingleAssistant.educationWork.child1.labe4')}}
              <span
                class="flex-al fs12 ml5"
              >
                <em
                  class="status mr5"
                  :class="{
                      'bg-red': hourDetail.hour_ischecking == 1,
                      'bg-blue': hourDetail.hour_ischecking == 2,
                      'bg-8A9': hourDetail.hour_ischecking == 0
                    }"
                ></em>
                {{
                hourDetail.hour_ischeckingname
                }}
              </span>
            </span>
            <div v-if="selectTableList.length>1" class="muti-choose-row mb10 fs12 color-333">
              <el-button
                type="default"
                size="small"
                @click="handleMutiComment"
              >{{$t('Educational.JingleAssistant.educationWork.child1.title1')}}</el-button>
              <span
                class="ml10"
              >{{$t('Educational.JingleAssistant.educationWork.child1.labe5')}}{{selectTableList.length}}{{$t('Educational.JingleAssistant.educationWork.child1.labe6')}}</span>
            </div>
          </div>
          <div class="status_tabs fs12 mb10">
            <span
              v-for="(item,index) in TabList"
              :key="index"
              :class="{'active':currentIndex==index}"
              @click="handeTab(index)"
            >{{item}}</span>
          </div>
        </div>
      </div>
      <div class="tableDiv" ref="auto_height_table">
        <div :style="{'min-height':tablePageHeight+'px'}">
          <normalTableCont :tableData="tableList" @handleSelectionChange="handleSelectionChange">
            <!-- 按钮操作组********start -->
            <el-table-column
              ref="fixedColumn"
              :label="$t('Common.table_operate')"
              align="center"
              width="200px"
              fixed="right"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.sturemark_status!=-1"
                  type="text"
                  size="small"
                  @click.native.prevent="handleSee(scope.row)"
                >{{$t('Educational.JingleAssistant.educationWork.child1.btn_text1')}}</el-button>
                <!-- sturemark_status  0  已点评 1 保存 -1 未点评 -->
                <el-button
                  type="text"
                  v-if="scope.row.sturemark_status!=-1"
                  size="small"
                  @click.native.prevent="handleEdit(scope.row)"
                >{{$t('Educational.JingleAssistant.educationWork.child1.btn_text2')}}</el-button>
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.sturemark_status==-1"
                  @click.native.prevent="handleComment(scope.row)"
                >{{$t('Educational.JingleAssistant.educationWork.child1.btn_text3')}}</el-button>
                <el-button
                  v-if="scope.row.sturemark_status==0"
                  type="text"
                  size="small"
                  @click.native.prevent="handleRevoke(scope.row)"
                >{{$t('Educational.JingleAssistant.educationWork.child1.btn_text4')}}</el-button>
              </template>
            </el-table-column>
            <!-- 按钮操作组********end -->
          </normalTableCont>
        </div>
        <!-- 分页 -->
        <!-- <el-pagination
          style="margin: 10px;"
          :current-page.sync="paging.curPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="paging.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paging.pageTotal"
          @current-change="curPageChange"
          @size-change="pageSizeChange"
        ></el-pagination>-->
      </div>
    </div>
    <!-- 点评 弹框 -->
    <el-drawer
      :title="commentPopData.title"
      :visible.sync="commentPopData.isShow"
      direction="rtl"
      size="700px"
      :modal="false"
      custom-class="pop-slider--box commentSlider-box"
      :before-close="handleClose"
    >
      <div v-if="commentPopData.popupType!='see'" class="slider-btn">
        <el-button
          type="default"
          size="mini"
          @click="handClear"
        >{{$t('Educational.JingleAssistant.educationWork.child1.btn_text5')}}</el-button>
        <el-button
          type="default"
          size="mini"
          @click="handSave"
        >{{$t('Educational.JingleAssistant.educationWork.child1.btn_text6')}}</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="onSubmit"
        >{{$t('Educational.JingleAssistant.educationWork.child1.btn_text7')}}</el-button>
      </div>
      <div class="slider-content comment-pop-container pAll10">
        <!-- <p
          class="fs14 color-333 mb10"
        >{{$t('Educational.JingleAssistant.educationWork.child1.labe7')}}{{commentPopData.selectStudJson.length}}{{$t('Educational.JingleAssistant.educationWork.child1.labe10')}}</p>-->
        <div class="comment-stu-list mb10 flex-wrap">
          <div
            class="item flex-al mr10 mb5"
            v-for="(item, index) in commentPopData.selectStudJson"
            :key="index"
          >
            <img v-if="item.student_img &&item.student_img!=''" :src="item.student_img" alt />
            <img
              v-else-if="item.student_sex==$t('Common.woman')"
              src="@/assets/images/woman.png"
              alt
            />
            <img v-else src="@/assets/images/default-new-men.png" alt />
            <span class="ml4">{{item.student_cnname}}</span>
            <em
              v-if="commentPopData.popupType!='see' &&commentPopData.selectStudJson.length>1"
              @click="onDelPerson(item,index)"
              class="el-icon-circle-close color-red cur-pointer ml5"
            ></em>
          </div>
        </div>
        <div class="comment-behavior">
          <!-- 暂时隐藏 -->
          <!-- <div class="flex-al mb10">
            <p>出勤状态：</p>
            <div>
              <el-radio
                :disabled="commentPopData.popupType=='see'"
                :label="0"
                v-model="commentPopData.attendance"
              >签到</el-radio>
              <el-radio
                :disabled="commentPopData.popupType=='see'"
                :label="1"
                v-model="commentPopData.attendance"
              >缺勤</el-radio>
            </div>
          </div>
          <div class="flex-al mb15" v-if="commentPopData.attendance == 1">
            <p class="fs-12 color-aaa">
              <em class="color-red">*</em> 出勤状态：
            </p>
            <el-select
              :disabled="commentPopData.popupType=='see'"
              v-model="commentPopData.reason"
              placeholder="请选择缺勤原因"
            >
              <el-option label="堵车1" value="0"></el-option>
              <el-option label="堵车2" value="1"></el-option>
            </el-select>
          </div>-->
          <div v-for="(item,index) in commentPopData.remarkstar_list" :key="index" class="flex-al">
            <p class="mb10">{{item.sturemarktemp_title}}：</p>
            <el-rate
              :disabled="commentPopData.popupType=='see'"
              :icon-classes="['icon-shixingxing', 'icon-shixingxing', 'icon-shixingxing']"
              disabled-void-icon-class="icon-kongxingxing"
              :colors="['#ddd', '#00A6FF', '#00A6FF']"
              v-model="item.rateValue"
            ></el-rate>
          </div>
        </div>
        <div class="comment-input">
          <textarea
            :readonly="commentPopData.popupType=='see'"
            v-model="commentPopData.sturemark_comment"
            :placeholder="$t('Educational.JingleAssistant.educationWork.child1.placeholder2')"
          ></textarea>
          <div class="pic-upload-container">
            <div class="pic-list pl10 flex1">
              <previewMedia
                :isEditImg="commentPopData.isEditImg"
                :fileList="commentPopData.sturemark_picturejson"
                @delMedia="delMedia"
              ></previewMedia>
            </div>
            <el-upload
              v-if="commentPopData.popupType!='see'"
              class="upload_pic"
              name="ossfile"
              :show-file-list="false"
              :action="`${$urls.easxApiUrl}/PersonalCenter/Picture`"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :data="Uploadimg"
            >
              <div class="upload-content">
                <i class="icon-shangchuan icon"></i>
                <span
                  class="el-upload__text"
                >{{$t('Educational.JingleAssistant.educationWork.child1.btn_text8')}}</span>
              </div>
            </el-upload>
          </div>
        </div>
        <p
          v-if="commentPopData.popupType!='see'"
          class="fs14 color-blue mt10 cur-pointer"
          @click="chooseTemplate"
        >{{$t('Educational.JingleAssistant.educationWork.child1.btn_text9')}}</p>
      </div>
    </el-drawer>
    <!-- 选择点评模板弹框 -->
    <div class="small-dialog popTips" v-if="temp.templateVisable">
      <el-dialog
        :title="$t('Educational.JingleAssistant.educationWork.child1.title5')"
        :visible="temp.templateVisable"
        width="700px"
        class="choose-temp-popTips"
        @close="temp.templateVisable = false"
        :modal-append-to-body="false"
      >
        <div class="dialog-content choose-temp-box" type="card">
          <el-checkbox-group class="template-list-box" v-model="temp.chooseArray">
            <el-tabs v-model="temp.tabValue" type="border-card" tab-position="left">
              <el-tab-pane
                v-for="(tempOne,Index) in temp.RemarkTempList"
                :key="Index"
                :label="tempOne.title"
              >
                <p
                  class="sort-title fs14 color-aaa mb10"
                >{{$t('Educational.JingleAssistant.educationWork.child1.labe8')}}{{tempOne.list.length}}{{$t('Educational.JingleAssistant.educationWork.child1.labe9')}}</p>

                <el-checkbox v-for="(item,index) in tempOne.list" :label="item" :key="index">
                  <p>{{item.reeamrktemp_title}}</p>
                  <span>{{ item.remarktemp_content }}</span>
                </el-checkbox>
              </el-tab-pane>
            </el-tabs>
          </el-checkbox-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            size="mini"
            @click="confirmChooseTemp"
          >{{ $t("Common.btn_sure") }}</el-button>
          <el-button size="mini" @click="temp.templateVisable = false">{{ $t("Common.btn_cancel") }}</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 撤销点评 -->
    <popTips
      :dialogVisable="popTipsRevoke.revokeVisable"
      :popTipsCont="popTipsRevoke"
      @handConfirm="withdrawStuHourRemarkAction"
      @handCancel="popTipsRevoke.revokeVisable=false"
      @handleCloseTip="popTipsRevoke.revokeVisable=false"
    ></popTips>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import normalTableCont from "@/components/tables/normalTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import previewMedia from "@/components/previewMedia/previewMedia.vue";
import httpApi from "../../Educational.js";

export default {
  name: "Educational-jingleAssistant-classReviews",
  components: {
    popTips,
    normalTableCont,
    swiper,
    previewMedia,
    swiperSlide
  },
  data() {
    return {
      tablePageHeight: 0,
      // 上课课时列表
      hourList: [],
      // 上课课时的swiper配置
      swiperOption: {
        navigation: {
          nextEl: ".el-icon-arrow-right",
          prevEl: ".el-icon-arrow-left"
        },
        slidesPerView: 11,
        // slidesPerGroup: 6,
        initialSlide: 0
      },
      TabList: this.$t(
        "Educational.JingleAssistant.educationWork.child1.TabList"
      ),
      currentIndex: 0,
      hourDetail: {}, //课时详情
      hourId: "", //课时id
      sturemarkId: "", //点评id
      isHaveEdit: false, //是否显示添加或编辑输入框
      courseContent: "", //上课内容
      selectTableList: [], //选择表格的数据
      // 删除提示弹窗
      popTipsRevoke: {
        revokeVisable: false,
        btn_text1: this.$t("Common.btn_sure"),
        btn_text2: this.$t("Common.btn_cancel"),
        title: this.$t("Common.popTips"),
        context: this.$t(
          "Educational.JingleAssistant.educationWork.child1.popTipsRevoke"
        )
      },
      // 上传图片
      Uploadimg: {
        ossfile: "",
        company_id: this.$userDetails.companyId
      },
      // 点评
      commentPopData: {
        isEditImg: false, //是否可以编辑图片
        isShow: false, // 弹框是否显示
        title: "", // 标题
        popupType: "", //see是查看点评，edit是编辑，add是点评
        selectStudJson: [], //选择的学员
        sturemark_picturejson: [], // 上传图片
        sturemark_comment: "",
        remarkstar_list: [] //评星模板
        // attendance: 0, // 0 签到，1 缺勤
        // reason: "", // 缺勤原因
      },
      // 模板
      temp: {
        templateVisable: false,
        tabValue: "",
        chooseArray: [],
        RemarkTempList: []
      },
      // 表格数据
      tableList: {
        // 表格的列
        columns: [],
        // 表格数据
        list: [],
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: true, //是否显示多选
          issetting: false, //是否可以编辑列
          // tableHeight: 400, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "jingleAssistant_classReviews_classReviews" //当前页面的名称，通常与路由名称一致
        }
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 30,
        pageTotal: 0
      }
    };
  },
  created() {
    this.timetableOneApi();
  },
  watch: {},
  computed: {},
  methods: {
    // 获取课时
    timetableOneApi() {
      httpApi
        .timetableOneApi({
          class_id: this.$route.query.class_id
        })
        .then(res => {
          if (res.data.error == 0) {
            this.hourList = res.data.result.list.classhourlist;
            this.clickSwiper(this.hourList[0], 0);
          } else {
            this.hourList = [];
          }
        });
    },
    // 课表->获取课时内容(网课通用)-zjb
    hourContentApi() {
      httpApi
        .hourContentApi({
          class_id: this.$route.query.class_id,
          hour_id: this.hourId
        })
        .then(res => {
          this.courseContent = res.data.result.list.hour_content
            ? res.data.result.list.hour_content
            : "";
          this.isHaveEdit = false;
        });
    },
    // 101->上课点名->获取能够点评的学生列表-lujing
    getHourStudent() {
      let is_sturemark = "";
      if (this.currentIndex == 0) {
        is_sturemark = "";
      } else if (this.currentIndex == 1) {
        is_sturemark = "1";
      } else {
        is_sturemark = "0";
      }
      httpApi
        .getHourStudent({
          // p: this.paging.curPage,
          // num: this.paging.pageSize,
          // is_count: "1", //是否需要总数
          hour_id: this.hourId,
          is_sturemark: is_sturemark //0   未点评 11已点评
        })
        .then(res => {
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
    //课表->新增或修改课时内容(网课通用)-zjb
    updateHourContentAction() {
      httpApi
        .updateHourContentAction({
          class_id: this.$route.query.class_id,
          hour_id: this.hourId,
          hour_content: this.courseContent
        })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.hourContentApi(); // 101->上课点名->获取能够点评的学生列表-lujing
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //上课点名->撤回点评-lujing
    withdrawStuHourRemarkAction() {
      httpApi
        .withdrawStuHourRemarkAction({
          class_id: this.$route.query.class_id,
          hour_id: this.hourId,
          sturemark_id: this.sturemarkId
        })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.popTipsRevoke.revokeVisable = false;
            this.getHourStudent(); // 101->上课点名->获取能够点评的学生列表-lujing
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 上课点评->获取学生信息-lujing
    getStudentApi() {
      let student_list = [];
      this.selectTableList.forEach(item => {
        student_list.push(item.student_id);
      });
      httpApi
        .getStudentApi({
          student_list: JSON.stringify(student_list)
        })
        .then(res => {
          if (res.data.error == "0") {
            this.commentPopData.selectStudJson = res.data.result.list;
          } else {
            this.commentPopData.selectStudJson = [];
          }
        });
    },
    // 103->上课点名->获取点名的评论模板-lujing
    getRemarkTemp() {
      httpApi
        .getRemarkTemp({
          class_id: this.$route.query.class_id,
          hour_id: this.hourId
        })
        .then(res => {
          if (res.data.error == "0") {
            this.temp.RemarkTempList = res.data.result.list;
          } else {
            this.temp.RemarkTempList = [];
          }
          this.temp.templateVisable = true;
        });
    },
    // 102->上课点名->获取评星模板->lujing
    getRemarkTempStart() {
      httpApi
        .getRemarkTempStart({
          class_id: this.$route.query.class_id,
          hour_id: this.hourId
        })
        .then(res => {
          if (res.data.error == "0") {
            this.commentPopData.remarkstar_list = res.data.result.list;
          } else {
            this.commentPopData.remarkstar_list = [];
          }
          if (this.commentPopData.remarkstar_list) {
            this.commentPopData.remarkstar_list.forEach((item, index) => {
              this.$set(
                this.commentPopData.remarkstar_list[index],
                "rateValue",
                0
              );
            });
          }

          if (this.commentPopData.popupType != "add") {
            //不是发布点评
            this.getStuHourRemarkOne();
          } else {
            this.commentPopData.isShow = true;
          }
        });
    },
    //上课点名->提交点评-lujing
    submitHourRemarkAction(sturemark_status) {
      let student_list = [],
        remarkstar_list = [];
      this.selectTableList.forEach(item => {
        student_list.push({
          student_id: item.student_id,
          student_branch: item.student_branch
        });
      });
      if (this.commentPopData.remarkstar_list) {
        this.commentPopData.remarkstar_list.forEach(item => {
          remarkstar_list.push({
            sturemarkstar_name: item.sturemarktemp_title,
            sturemarkstar_score: item.rateValue,
            sturemarktemp_id: item.sturemarktemp_id
          });
        });
      }

      httpApi
        .submitHourRemarkAction({
          class_id: this.$route.query.class_id,
          hour_id: this.hourId,
          sturemark_status: sturemark_status, //提交或保存 0直接提交 1保存
          sturemark_id: this.sturemarkId, //点评的id 编辑时,传此字段
          student_list: JSON.stringify(student_list),
          remarkstar_list: JSON.stringify(remarkstar_list),
          sturemark_comment: this.commentPopData.sturemark_comment,
          sturemark_picturejson: JSON.stringify(
            this.commentPopData.sturemark_picturejson
          )
        })
        .then(res => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.commentPopData.isShow = false;
            this.getHourStudent(); // 101->上课点名->获取能够点评的学生列表-lujing
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 上课点名-查看点评详情-lujing
    getStuHourRemarkOne() {
      httpApi
        .getStuHourRemarkOne({
          sturemark_id: this.sturemarkId
        })
        .then(res => {
          let result = res.data.result;
          if (res.data.error == "0") {
            this.commentPopData.remarkstar_list = result.star_list;
            this.commentPopData.sturemark_comment = result.sturemark_comment;
            this.commentPopData.sturemark_picturejson = result.sturemark_picturejson
              ? JSON.parse(result.sturemark_picturejson)
              : [];
          } else {
            this.commentPopData.remarkstar_list = [];
          }
          if (this.commentPopData.remarkstar_list) {
            this.commentPopData.remarkstar_list.forEach((item, index) => {
              this.$set(
                this.commentPopData.remarkstar_list[index],
                "rateValue",
                item.sturemarkstar_score
                  ? parseInt(item.sturemarkstar_score)
                  : 0
              );
              this.$set(
                this.commentPopData.remarkstar_list[index],
                "sturemarktemp_title",
                item.sturemarkstar_name
              );
            });
          }

          this.commentPopData.isShow = true;
        });
    },
    //点击单个课时
    clickSwiper(hour, index) {
      this.hourList.map(v => {
        this.$set(v, "active", false);
      });
      console.log(hour, index);
      hour.active = true;
      this.hourDetail = hour;
      this.hourId = hour.hour_id;
      this.currentIndex = 0;
      this.hourContentApi(); // 课表->获取课时内容(网课通用)-zjb
      this.getHourStudent(); // 101->上课点名->获取能够点评的学生列表-lujing
    },
    // tab切换
    handeTab(index) {
      this.currentIndex = index;
      this.getHourStudent(); // 101->上课点名->获取能够点评的学生列表-lujing
    },
    // 点击添加上课内容
    handAddCont() {
      this.isHaveEdit = true;
    },
    // 点击编辑上课内容
    handEditCont() {
      this.isHaveEdit = true;
    },
    // 点击批量点评
    handleMutiComment() {
      this.handclearComment(); // 清除点评数据
      this.commentPopData.popupType = "add";
      this.commentPopData.title = this.$t(
        "Educational.JingleAssistant.educationWork.child1.title1"
      );
      this.getRemarkTempStart();
      this.getStudentApi(); // 上课点评->获取学生信息-lujing
    },
    // 点击点评
    handleComment(row) {
      this.handclearComment(); // 清除点评数据
      this.sturemarkId = row.sturemark_id;
      this.selectTableList = [];
      this.selectTableList.push(row);
      this.commentPopData.popupType = "add";
      this.commentPopData.title = this.$t(
        "Educational.JingleAssistant.educationWork.child1.title2"
      );
      this.commentPopData.isEditImg = true;
      this.getRemarkTempStart();
      this.getStudentApi(); // 上课点评->获取学生信息-lujing
    },
    // 点击查看
    handleSee(row) {
      this.handclearComment(); // 清除点评数据
      this.sturemarkId = row.sturemark_id;
      this.selectTableList = [];
      this.selectTableList.push(row);
      this.commentPopData.popupType = "see";
      this.commentPopData.title = this.$t(
        "Educational.JingleAssistant.educationWork.child1.title3"
      );
      this.commentPopData.isEditImg = false;
      this.getRemarkTempStart();
      this.getStudentApi(); // 上课点评->获取学生信息-lujing
    },
    // 点击重新编辑
    handleEdit(row) {
      this.handclearComment(); // 清除点评数据
      this.sturemarkId = row.sturemark_id;
      this.selectTableList = [];
      this.selectTableList.push(row);
      this.commentPopData.popupType = "edit";
      this.commentPopData.title = this.$t(
        "Educational.JingleAssistant.educationWork.child1.title4"
      );
      this.commentPopData.isEditImg = true;
      this.getRemarkTempStart();
      this.getStudentApi(); // 上课点评->获取学生信息-lujing
    },
    // 点击撤销点评
    handleRevoke(row) {
      console.log(row);
      this.sturemarkId = row.sturemark_id;
      this.popTipsRevoke.revokeVisable = true;
    },
    // 选择模版
    chooseTemplate() {
      this.getRemarkTemp();
    },
    // 确定选择评价模板
    confirmChooseTemp() {
      let str = "";
      this.temp.chooseArray.forEach((item, index) => {
        if (index == 0) {
          str = item.remarktemp_content;
        } else {
          str = str + "," + item.remarktemp_content;
        }
      });
      this.commentPopData.sturemark_comment = str;
      this.temp.templateVisable = false;
    },
    // 点击清空
    handClear() {
      this.commentPopData.sturemark_picturejson = [];
      // this.commentPopData.remarkstar_list = [];
      this.temp.chooseArray = [];
      if (this.commentPopData.remarkstar_list) {
        this.commentPopData.remarkstar_list.forEach((item, index) => {
          this.$set(this.commentPopData.remarkstar_list[index], "rateValue", 0);
        });
      }
      this.commentPopData.sturemark_comment = ''

    },
    // 点击保存草稿
    handSave() {
      this.submitHourRemarkAction(1);
    },
    // 点击提交
    onSubmit() {
      this.submitHourRemarkAction(0);
    },
    // 删除选择的学员
    onDelPerson(item, index) {
      this.commentPopData.selectStudJson.splice(index, 1);
    },
    // 删除预览文件
    delMedia(item, index) {
      console.log(item, index);
      this.commentPopData.sturemark_picturejson.splice(index, 1);
      console.log(this.commentPopData.sturemark_picturejson);
    },
    // 选择表格复选框
    handleSelectionChange(val) {
      this.selectTableList = val;
    },
    // 清除点评数据
    handclearComment() {
      this.commentPopData.selectStudJson = [];
      this.commentPopData.sturemark_picturejson = [];
      this.commentPopData.remarkstar_list = [];
      this.temp.chooseArray = [];
      this.commentPopData.sturemark_comment = "";
    },
    // 上传图片或者视频--start
    handleAvatarSuccess(res) {
      if (res.error == "0") {
        this.commentPopData.sturemark_picturejson.push({
          url: res.result.picture_imgurl,
          type: "img"
        });
      }
    },
    beforeAvatarUpload(file) {
      console.log(file, "这是图片数据");
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isImg = isJPG || isPNG || isGIF;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error(
          this.$t("Educational.JingleAssistant.educationWork.child1.imgTips1")
        );
      }
      if (!isLt2M) {
        this.$message.error(
          this.$t("Educational.JingleAssistant.educationWork.child1.imgTips2")
        );
      }

      return isImg && isLt2M;
    },
    // 上传图片或者视频--end
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.PcClassMessage(); // 后台PC->班级通知列表-qyh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.PcClassMessage(); // 后台PC->班级通知列表-qyh
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    handleClose(done) {
      done();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tablePageHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 152
        );
      }
    });
  }
};
</script>

<style lang="less">
.Educational-jingleAssistant-classReviews {
  .class-reviews-box {
    .add-content {
      .add-icon {
        width: 40px;
        height: 40px;
        border: 1px solid #ddd;
        width: 40px;
        background: rgba(251, 251, 251, 1);
        border-radius: 4px;
      }
    }
    .status-row {
      & > span {
        color: #24356a;
      }
      .status {
        width: 10px;
        height: 10px;
        border-radius: 5px;
      }
    }
    .top-operate {
      align-items: flex-end;
      .status_tabs {
        span {
          display: inline-block;
          padding: 4px 0;
          cursor: pointer;
          border-bottom: 2px solid #fff;
        }
        span + span {
          margin-left: 40px;
        }
        .active {
          color: #00a6ff;
          border-bottom: 2px solid #00a6ff;
        }
      }
    }
    .edit-content {
      .course_cont {
        max-width: 700px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 20px;
        line-height: 20px;
      }
    }
  }

  .template-list-box {
    display: flex;
    flex-direction: column;

    .el-checkbox {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      .el-checkbox__input {
        margin-top: 3px;
      }
      p {
        color: #333;
        font-size: 14px;
      }

      span {
        color: #aaa;
        font-size: 14px;
      }
    }
  }
  .swiperDiv {
    position: relative;
    .el-icon-arrow-left {
      color: #7d7d7d;
      font-size: 35px;
      z-index: 3;
      cursor: pointer;
      position: absolute;
      bottom: 30px;
      left: -5px;
      outline: none;
    }
    .el-icon-arrow-right {
      color: #7d7d7d;
      font-size: 35px;
      z-index: 3;
      cursor: pointer;
      position: absolute;
      bottom: 30px;
      right: 0px;
      outline: none;
    }
    .swiper-button-prev,
    .swiper-button-next {
      background-image: none;
    }
    .one-swiper {
      .status {
        .circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
      }
      .lesson {
        align-items: center;
        justify-content: center;
        margin: 10px;
        height: 54px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
      }
      .activeswiper {
        background: linear-gradient(
          225deg,
          rgba(0, 210, 255, 1) 0%,
          rgba(0, 166, 255, 1) 100%
        );
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
        color: #ffffff;
      }
    }
    .swiper-container {
      width: calc(100% - 60px);
    }
  }
  // 选择点评模板样式
  .choose-temp-popTips {
    .el-dialog__body {
      padding: 10px 20px;
    }
    .el-tabs--left.el-tabs--border-card .el-tabs__header.is-left {
      height: 300px;
      border: none;
      .el-tabs__item {
        color: #24356a;
        border-left: 4px solid #f5f7fa;
      }
    }
    .el-tabs--left.el-tabs--border-card .el-tabs__item.is-left.is-active {
      // color: #00A6FF;
      border: none;
      border-left: 4px solid #00a6ff;
    }
    .choose-temp-box {
      .sort-title {
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
      }
      .el-tabs__content {
        max-height: 300px;
        overflow-y: auto;
      }
    }
  }
}
// 点评 弹框---样式
.commentSlider-box {
  .cont {
    line-height: 20px;
  }
  .comment-pop-container {
    .comment-behavior {
      p {
        width: 100px;
      }
    }

    .comment-stu-list {
      .item {
        padding: 5px 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #24356a;
        font-size: 12px;
        img {
          width: 26px;
          height: 26px;
          border-radius: 50%;
        }
      }
    }

    .comment-input {
      border: 1px solid #ddd;
      border-radius: 5px;
      textarea {
        width: 100%;
        min-height: 200px;
        padding: 10px;
        border: none;
        border-radius: 5px;
        color: #666;
        font-size: 14px;
        outline: none;
        resize: none;
      }

      .pic-upload-container {
        display: flex;
        align-items: flex-end;
        .pic-list {
        }
      }
    }
  }
  .upload_pic {
    padding: 10px;
    .upload-content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        color: #aaa;
        font-size: 25px;
      }
    }
    .el-upload__text {
      text-align: center;
      color: #aaa;
    }
    .el-upload {
      position: relative;
    }
  }
}
</style>
