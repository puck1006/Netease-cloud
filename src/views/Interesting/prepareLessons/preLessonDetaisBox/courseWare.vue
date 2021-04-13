<template>
  <div class="Interesting-prepareLessons-courseWare height100">
    <!-- 页面右边按钮***start -->
    <div class="right-btn fs14 flex-all">
      <!-- <el-button
        v-if="LessonPlanInfoData.length>0"
        type="warning"
        @click="previewComments"
        size="mini"
        class="fs14"
      >
        {{$t(
        'Interesting.preLessonDetais.btn_text1'
        )}}
      </el-button>-->
      <!-- <el-button v-if="LessonPlanInfoData.length>0" type="primary" size="mini" class="fs14">
        {{$t(
        'Interesting.preLessonDetais.btn_text2'
        )}}
      </el-button>-->
      <i class="btn-close icon-gb ml10 cur-pointer" @click="handBack()"></i>
    </div>
    <div class="content-box bg-white flex">
      <!-- 左侧菜单 -->
      <div
        class="left-menu"
        ref="left_menu_height"
        :style="{ height: left_menu_height + 'px' }"
      >
        <div v-if="!isCollapse" class="tabs fs14 mr10 mb20">
          <span class="tc cur-pointer active">教案目录</span>
        </div>
        <el-menu
          default-active="1"
          class="el-menu-classList"
          @open="handleOpen"
          @close="handleMenuClose"
          :collapse="isCollapse"
        >
          <el-menu-item
            v-for="(item, index) in LessonPlanInfoData"
            :key="index"
            :index="(index + 1).toString()"
            @click="handClickMenu(item, index)"
          >
            <p class="flex-all" slot="title">
              {{ item.teachplan_name }}
              <i class="el-icon-circle-check color-green"></i>
            </p>
          </el-menu-item>
        </el-menu>
        <!-- <div class="collapse-btn cur-pointer" @click="toggleCollapse">
          <i class="icon-menu"></i>
        </div> -->
      </div>
      <div
        class="flex flex1 right-div"
        :style="{ height: left_menu_height + 'px' }"
      >
        <div class="center-detail pAll16" v-if="LessonPlanInfoData.length > 0">
          <div class="top-wrapper">
            <div class="left">
              <span class="left-line-orange mr10"></span>
              <span class="color-243 fs18">{{
                currentIndex == 1 ? "教学视频" : "教学教案"
              }}</span>
            </div>
            <div class="right">
              <span
                class="mr10 fs14"
                @click="handClckTabs(1, 0)"
                v-if="currentIndex == 1"
                >切换教案<i
                  class="icon icon_1 ml10"
                  style="transform: translateY(2px)"
                ></i
              ></span>
              <span
                class="mr10 fs14"
                @click="handClckTabs(1, 1)"
                v-if="currentIndex == 0"
                >切换视频<i
                  class="icon icon_1 ml10"
                  style="transform: translateY(2px)"
                ></i
              ></span>
            </div>
          </div>
          <div class="fs16 color-243 tc">
            {{ LessonPlanInfoData[LessonPlanIndex].teachplan_name }}
          </div>
          <div class="tr color-orange mt16">
            <i
              v-if="LessonPlanInfoData[LessonPlanIndex].is_collect"
              class="icon-collected cur-pointer"
              @click="handCollect()"
            ></i>
            <i
              v-else
              class="icon-uncollect cur-pointer"
              @click="handCollect()"
            ></i>
            <span class="fs14 ml4">
              {{ $t("Common.collect_text") }}
            </span>
          </div>
          <template v-if="LessonPlanInfoData[LessonPlanIndex]">
            <!--是否图片模式 -->
            <div v-if="currentIndex == 0" class="PPT-box mt16">
              <Lessonplan
                v-if="
                  (courseMenuList && courseMenuList.length != 0) ||
                  this.LessonPlanInfoData[this.LessonPlanIndex]
                    .teachplan_class != 0
                "
                :courseMenuList="courseMenuList"
                :LessonPlanInfoOneData="LessonPlanInfoData[LessonPlanIndex]"
                :LessonImgIndex="LessonImgIndex"
                @prev="prev"
                @next="next"
                @handCourseMenu="handCourseMenu"
              ></Lessonplan>
              <iframe
                :src="`https://idocv.kidcastle.com.cn/view/url?url=${
                  this.LessonPlanInfoData[this.LessonPlanIndex]
                    .teachplan_fileurl.url
                }`"
                width="100%"
                height="600"
                v-else
              ></iframe>
              <!-- <div v-else style="color:red;cursor: pointer;" @click="handleOpenFile">一只小龙人.docx</div> -->
            </div>
            <div v-else>
              <div
                v-if="
                  isshowplayer &&
                  LessonPlanInfoData[LessonPlanIndex].teachplan_videourl
                "
                class="video-box mt16"
                ref="player-con"
                id="player-con"
              ></div>
              <blank
                v-else
                blankCont="
                  暂时没有视频~
                "
              ></blank>
            </div>
          </template>
          <div
            v-if="LessonPlanInfoData[LessonPlanIndex].teachplan_matters != ''"
            class="flex-al mt16 mb16"
          >
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs18">
              {{ $t("Interesting.preLessonDetais.small_title9") }}
            </span>
          </div>
          <div
            v-if="LessonPlanInfoData[LessonPlanIndex].teachplan_matters != ''"
            class="message-item fs14 pb16"
            style="border-bottom: 1px solid #ddd; word-break: break-word"
            v-html="LessonPlanInfoData[LessonPlanIndex].teachplan_matters"
          ></div>

          <div
            v-if="LessonPlanInfoData[LessonPlanIndex].teachplan_postil != ''"
            class="flex-al mt16 mb16"
            style="word-break: break-word"
          >
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs18">
              {{ $t("Interesting.preLessonDetais.small_title4") }}
            </span>
          </div>
          <div
            v-if="LessonPlanInfoData[LessonPlanIndex].teachplan_postil != ''"
            class="comment comment1 pb16"
            style="border-bottom: 1px solid #ddd; word-break: break-word"
            v-html="LessonPlanInfoData[LessonPlanIndex].teachplan_postil"
          ></div>

          <div class="flex-all mt16 mb16">
            <span class="flex-al">
              <span class="left-line-orange mr10"></span>
              <span class="color-243 fs18">
                {{ $t("Interesting.preLessonDetais.small_title1") }}
              </span>
            </span>
            <!-- <el-button @click="PersonPostilAction" type="primary" size="mini" class="fs14">
              <template
                v-if="LessonPlanInfoData[LessonPlanIndex].is_cunzai"
              >{{$t('views.Interesting.prepareLessons.preLessonDetaisBox.courseWare.526wte05xws0')}}</template>
              <template v-else>
                {{$t(
                'Common.btn_save'
                )}}
              </template>
            </el-button>-->
          </div>
          <div class="person-form mb20">
            <el-input
              type="textarea"
              :rows="5"
              :placeholder="$t('Interesting.preLessonDetais.placeholder1')"
              maxlength="500"
              @input="descInput"
              v-model="LessonPlanInfoData[LessonPlanIndex].prepare_postil"
            ></el-input>
            <span class="xianzhi fs14 color-8A9">{{ remnant }}/500</span>
          </div>
          <div class="tr">
            <!-- <el-button type="success" size="mini" @click="PersonPostilAction(1)"
              >上传优秀批注</el-button
            > -->
            <el-button
              type="warning"
              size="mini"
              @click="previewComments"
              v-if="LessonPlanInfoData.length > 0"
              >批注预览</el-button
            >
            <el-button
              @click="PersonPostilAction"
              type="primary"
              size="mini"
              class="fs14"
            >
              <template v-if="LessonPlanInfoData[LessonPlanIndex].is_cunzai">{{
                $t(
                  "views.Interesting.prepareLessons.preLessonDetaisBox.courseWare.526wte05xws0"
                )
              }}</template>
              <template v-else>
                {{ $t("Common.btn_save") }}
              </template>
            </el-button>
            <!-- <el-button type="primary" size="mini" @click="PersonPostilAction">提交</el-button> -->
          </div>
        </div>
        <div class="course-line"></div>
        <div class="right-message pAll16" v-if="LessonPlanInfoData.length > 0">
          <div class="flex-al mb16">
            <span class="left-line-orange mr10"></span>
            <span v-if="currentIndex == 0" class="color-243 fs18">
              {{ $t("Interesting.preLessonDetais.small_title3") }}
            </span>
            <span v-else class="color-243 fs18">
              {{ $t("Interesting.preLessonDetais.small_title2") }}
            </span>
          </div>
          <!--是否图片模式 -->
          <div v-if="currentIndex == 1" class="PPT-box mt16">
            <Lessonplan
              :courseMenuList="courseMenuList"
              v-if="
                (courseMenuList && courseMenuList.length != 0) ||
                this.LessonPlanInfoData[this.LessonPlanIndex].teachplan_class !=
                  1
              "
              :LessonPlanInfoOneData="LessonPlanInfoData[LessonPlanIndex]"
              :LessonImgIndex="LessonImgIndex"
              @prev="prev"
              @next="next"
              @handCourseMenu="handCourseMenu"
            ></Lessonplan>
            <iframe
              :src="`https://idocv.kidcastle.com.cn/view/url?url=${
                this.LessonPlanInfoData[this.LessonPlanIndex].teachplan_fileurl
                  .url
              }`"
              width="100%"
              height="300"
              v-else
            ></iframe>
          </div>
          <div v-else>
            <div
              v-if="
                isshowplayer &&
                LessonPlanInfoData[LessonPlanIndex].teachplan_videourl
              "
              class="video-box"
              id="player-con-right"
              ref="player-con-right"
            ></div>
            <blank
              v-else
              blankCont="
                暂时没有视频~
              "
            ></blank>
          </div>

          <div v-if="tempvideo.length > 0" class="flex-sb mt16 mb16">
            <div class="flex-al">
              <span class="left-line-orange mr10"></span>
              <span class="color-243 fs18">
                {{ $t("Interesting.preLessonDetais.high_work") }}
              </span>
            </div>
            <router-link
              :to="{
                path: `/Interesting/prepareLessons/allWork?teachplan_id=${LessonPlanInfoData[LessonPlanIndex].teachplan_id}&classcode_branch=${classcode_branch}&course_branch=${course_branch}&teachhour_branch=${teachhour_branch}&tempworks_id=${tempvideo[0].tempworks_id}`,
              }"
              class="color-blue fs14 cur-pointer"
            >
              {{ $t("Interesting.preLessonDetais.see_more") }}
              <i class="el-icon-caret-right"></i>
            </router-link>
          </div>
          <div v-if="tempvideo.length > 0" class="high-work">
            <template v-for="(item, index) in tempvideo">
              <workOne
                :key="index"
                :workInfo="item"
                :currentIndex="index"
                @viewVideo="handVideoPlay(item)"
                @updateData="updateData()"
                @handVate="handVate"
              ></workOne>
            </template>
          </div>

          <!-- <div
            v-if="LessonPlanInfoData[LessonPlanIndex].teachplan_postil!=''"
            class="flex-al mt16 mb16"
            style="justify-content:space-between"
          >
            <div class="flex-al">
              <span class="left-line-orange mr10"></span>
              <span class="color-243 fs18">优秀批注推荐</span>
            </div>
            <router-link
              :to="{ path: `/Interesting/prepareLessons/highWork?teachplan_id=${LessonPlanInfoData[LessonPlanIndex]
            .teachplan_id}&classcode_branch=${classcode_branch}&course_branch=${course_branch}&teachhour_branch=${teachhour_branch}` }"
              class="color-blue fs14 cur-pointer"
            >
              {{$t(
              'Interesting.preLessonDetais.see_more'
              )}}
              <i
                class="el-icon-caret-right"
              ></i>
            </router-link>
          </div> -->
          <!-- <div>
            <div class="comment comment2" v-for="(item, index) in perfectList" :key="index">
              <div>{{item.temppostil_details}}</div>
              <div class="tr" style="color:#4C5E95">批注作者： {{item.temppostil_author}}</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!-- 展开课件目录弹框 -->
    <div class="small-dialog popTips" v-if="showCourseMenu">
      <el-dialog
        :title="LessonPlanInfoData[LessonPlanIndex].teachplan_name"
        :visible.sync="showCourseMenu"
        width="1200px"
        class="showCourseMenu"
        :before-close="handleClose"
        :modal-append-to-body="false"
      >
        <div class="dialog-content">
          <ul class="menu-list">
            <li
              @click="selectCourseMenu(item, index)"
              v-for="(item, index) in courseMenuList"
              :key="index"
              class="fs14 color-4C5 tc"
            >
              <img :src="item.teachpics_url" alt />
              <p class="mb8 mt8">
                {{ $t("Common.page[0]") }}{{ item.teachpics_sort
                }}{{ $t("Common.page[1]") }}
              </p>
            </li>
          </ul>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini">{{$t('views.Interesting.prepareLessons.preLessonDetaisBox.courseWare.526wte05zvg0')}}</el-button>
          <el-button size="mini">{{$t('views.Interesting.prepareLessons.preLessonDetaisBox.courseWare.526wte0606o0')}}</el-button>
        </span>-->
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import progressTableCont from "@/components/tables/progressTableCont.vue";
// import popTips from "@/components/common/popTips/popTips.vue";
import Lessonplan from "@/components/LessonPlan/Lessonplan.vue";
import blank from "@/components/common/Blank/blank.vue";
import workOne from "@/components/highWork/workOne.vue"; //优质作品
import httpApi from "../../Interesting";
export default {
  name: "Interesting-prepareLessons-courseWare",
  components: {
    // progressTableCont,
    // popTips,
    workOne,
    Lessonplan,
    blank,
  },
  data() {
    return {
      perfectList: [],
      left_menu_height: 0,
      isCollapse: false,
      currentIndex: 0,
      classcode_branch: "", //班别编号
      teachhour_branch: "", //课时编号
      LessonPlanIndex: 0, //当前显示的教案
      LessonImgIndex: 0, //当前显示的教案--图片
      prepare_postil: "", //个人批注
      prepare_id: "", //备课id
      prepare_watchtime: "", //观看时长
      remnant: 0,
      player: {}, //播放参数
      isshowplayer: true,
      showCourseMenu: false, //展开课件目录弹框
      LessonPlanInfoData: [], //对应的教案信息
      tempvideo: [], //优秀教学作品
      courseMenuList: [], //展开课件目录列表
    };
  },
  watch: {},
  computed: {},
  created() {
    this.class_id = this.$route.query.class_id;
    this.course_branch = this.$route.query.course_branch;
    this.hour_lessontimes = this.$route.query.hour_lessontimes;
    this.getLessonPlan(); //备课->获取教案信息 -- wgh
  },
  methods: {
    handleOpenFile() {
      window.open(
        "https://idocv.kidcastle.com.cn/view/url?url=" +
          this.LessonPlanInfoData[this.LessonPlanIndex].teachplan_fileurl.url
      );
    },
    //备课->添加/取消点赞 -- wgh
    AddCancelPraiseAction(tempworks_id, code, index, type, item) {
      httpApi
        .AddCancelPraiseAction({
          tempworks_id: tempworks_id, //视频点赞/取消点赞时需传
          temppostil_id: "", //批注点赞/取消点赞时需传
          code: code, //是否点赞 0取消点赞 1点赞
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            console.log(item);
            item.is_zan = !item.is_zan;
            item = JSON.parse(JSON.stringify(item));
            this.getLessonPlan(); //备课->获取优秀批注/视频 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 是否点赞
    handVate(item, index, type) {
      console.log(item, index, type);
      let code = "";
      //是否点赞 0取消点赞 1点赞
      if (item.is_zan) {
        code = "0";
      } else {
        code = "1";
      }
      this.AddCancelPraiseAction(item.tempworks_id, code, index, type, item);
    },

    updateData() {
      this.getLessonPlan();
    },
    getExcellentPostil() {
      httpApi
        .getExcellentPostil({
          teachhour_branch: this.teachhour_branch,
        })
        .then((res) => {
          this.perfectList = res.data.result.list.perfect;
        });
    },
    //备课->获取教案信息 -- wgh
    getLessonPlan() {
      httpApi
        .getLessonPlan({
          class_id: this.class_id,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          // teachplan_class: "1",
          // teachplan_class: teachplan_class //教案模式 0-文件模式(视频模式) 1-图片模式(教案模式)
        })
        .then((res) => {
          let tempList = res.data.result.list.list;
          if (tempList && tempList.length != 0) {
            this.$Tool.setStorage(
              "teachplan_class",
              tempList[this.LessonPlanIndex].teachplan_class
            );
            this.resetSetItem(
              "teachplan_class",
              tempList[this.LessonPlanIndex].teachplan_class
            );
          }

          this.$Tool.setStorage(
            "prepareClassName",
            res.data.result.list.classname.class_cnname
          );
          this.resetSetItem(
            "hour_name",
            res.data.result.list.classname.hour_name
          );
          this.classcode_branch =
            res.data.result.list.classname.classcode_branch;
          this.teachhour_branch =
            res.data.result.list.classname.teachhour_branch;
          let classcode_isopen =
            res.data.result.list.classname.classcode_isopen; //用来判断是否开启个性化教案的字段
          this.tempvideo = res.data.result.list.temppostil || [];
          if (res.data.error == 0) {
            this.LessonPlanInfoData = res.data.result.list.list;
            this.LessonPlanInfoData.forEach((item) => {
              if (item.teachplan_fileurl) {
                item.teachplan_fileurl = JSON.parse(item.teachplan_fileurl);
              }
            });
          } else {
            this.LessonPlanInfoData = [];
          }
          // 存在教案
          if (this.LessonPlanInfoData.length > 0) {
            if (classcode_isopen == "1") {
              this.$Tool.setStorage("isLessonPlan", true);
              this.$store.dispatch("setIsLessonPlan", true);
            } else {
              this.$Tool.setStorage("isLessonPlan", false);
              this.$store.dispatch("setIsLessonPlan", false);
            }
            this.prepare_watchtime = this.LessonPlanInfoData[
              this.LessonPlanIndex
            ].prepare_watchtime;
            if (
              this.LessonPlanInfoData[this.LessonPlanIndex]
                .prepare_watchfinish == "1"
            ) {
              // 视频是否已经播放完成
              this.$nextTick(() => {
                this.newAliplayerUIsOver(); //视频初始化
              });
            } else {
              this.$nextTick(() => {
                this.newAliplayerIsbegin(); //视频初始化
              });
            }
            // 存储个性化教案对应的教案id teachplan_id
            this.$Tool.setStorage(
              "teachplan_id",
              this.LessonPlanInfoData[this.LessonPlanIndex].teachplan_id
            );
            let prepareId = this.LessonPlanInfoData[this.LessonPlanIndex]
              .prepare_id;
            if (prepareId == "" || prepareId == null) {
              // 判断是否已经创建备案信息
              this.AddLessonPlanInfoAction(); //备课->教案备案信息创建 -- wgh
            } else {
              this.prepare_id = prepareId;
            }
            this.AddCollectAction(); //备课->添加收藏信息 -- wgh
            this.getTeachpics("one"); //备课->课件模式->展开课件目录 -- wgh
          } else {
            this.$Tool.setStorage("isLessonPlan", false);
            this.$store.dispatch("setIsLessonPlan", false);
          }

          // this.getExcellentPostil();
        });
    },
    //备课->课件模式->展开课件目录 -- wgh
    getTeachpics(type) {
      httpApi
        .getTeachpics({
          teachplan_id: this.LessonPlanInfoData[this.LessonPlanIndex]
            .teachplan_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.courseMenuList = res.data.result.list;
          } else {
            this.courseMenuList = [];
          }
          if (type == "more") {
            this.showCourseMenu = true;
          }
        });
    },
    //备课->添加个人批注 -- wgh
    PersonPostilAction(flag) {
      console.log(flag);
      httpApi
        .PersonPostilAction({
          temppostil_isPerfect: flag == 1 ? "1" : "0",
          class_id: this.class_id,
          classcode_branch: this.classcode_branch,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          prepare_id: this.prepare_id,
          prepare_postil: this.LessonPlanInfoData[this.LessonPlanIndex]
            .prepare_postil, //个人批注
          teachplan_id: this.LessonPlanInfoData[this.LessonPlanIndex]
            .teachplan_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            if (flag == 1) {
              this.$message({ message: "上传优秀批注成功~", type: "success" });
            } else {
              this.$message({ message: res.data.errortip, type: "success" });
            }
            this.getLessonPlan(); //备课->获取教案信息 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //备课->添加收藏信息 -- wgh
    AddCollectAction() {
      httpApi
        .AddCollectAction({
          class_id: this.class_id,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          teachplan_id: this.LessonPlanInfoData[this.LessonPlanIndex]
            .teachplan_id,
        })
        .then((res) => {
          console.log(res);
          // if (res.data.error == 0) {
          // } else {
          // }
        });
    },
    //备课->教案备案信息创建 -- wgh
    AddLessonPlanInfoAction() {
      httpApi
        .AddLessonPlanInfoAction({
          class_id: this.class_id,
          course_branch: this.course_branch,
          classcode_branch: this.classcode_branch,
          hour_lessontimes: this.hour_lessontimes,
          teachplan_id: this.LessonPlanInfoData[this.LessonPlanIndex]
            .teachplan_id,
        })
        .then((res) => {
          this.prepare_id = res.data.result.prepare_id; //备课id
        });
    },
    //备课->添加/取消收藏 -- wgh
    AddCancelCollectAction(collect_status) {
      httpApi
        .AddCancelCollectAction({
          class_id: this.class_id,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          teachplan_id: this.LessonPlanInfoData[this.LessonPlanIndex]
            .teachplan_id,
          collect_status: collect_status, //是否收藏 0取消收藏 1添加收藏
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.LessonPlanInfoData[this.LessonPlanIndex].is_collect = !this
              .LessonPlanInfoData[this.LessonPlanIndex].is_collect;
            this.getLessonPlan(); //备课->获取教案信息 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //备课->教案备案进程 -- wgh
    ProcessAction(prepare_status, prepare_watchfinish) {
      console.log(this.prepare_id, 12123313);
      httpApi
        .ProcessAction({
          class_id: this.class_id,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          teachplan_id: this.LessonPlanInfoData[this.LessonPlanIndex]
            .teachplan_id,
          prepare_id: this.prepare_id,
          prepare_status: prepare_status, //备课状态 0进行中 1已完成
          prepare_watchfinish: prepare_watchfinish, //是否看完视频 0否 1是
          prepare_watchtime: this.prepare_watchtime, //观看时长
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.isshowplayer = false;
            this.$nextTick(() => {
              this.isshowplayer = true;
            });
            // this.$message({ message: res.data.errortip, type: "success" });
            this.getLessonPlan(); //备课->获取教案信息 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 是否收藏
    handCollect() {
      let code = "";
      //是否收藏 0取消收藏 1添加收藏
      if (this.LessonPlanInfoData[this.LessonPlanIndex].is_collect) {
        code = "0";
      } else {
        code = "1";
      }
      this.AddCancelCollectAction(code); //备课->添加/取消收藏 -- wgh
    },
    // 侧边栏折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 侧边栏展开
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    // 侧边栏折叠
    handleMenuClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 切换模式
    handClckTabs(item, index) {
      this.currentIndex = index;
      // this.LessonPlanIndex = 0;
      this.LessonImgIndex = 0;
      this.getLessonPlan(); //备课->获取教案信息 -- wgh
    },
    //展开课件目录弹框
    handCourseMenu() {
      this.getTeachpics("more"); //备课->课件模式->展开课件目录 -- wgh
    },
    // 目录中每项点击
    handClickMenu(item, index) {
      this.LessonPlanIndex = index;
      this.LessonImgIndex = 0;
      // 存储个性化教案对应的教案id teachplan_id
      this.$Tool.setStorage(
        "teachplan_id",
        this.LessonPlanInfoData[this.LessonPlanIndex].teachplan_id
      );
      let input_text = this.LessonPlanInfoData[
        this.LessonPlanIndex
      ].prepare_postil.toString();
      this.prepare_watchtime =
        this.player.getCurrentTime().toFixed(2) != 0.0
          ? this.player.getCurrentTime().toFixed(2)
          : this.LessonPlanInfoData[this.LessonPlanIndex].prepare_watchtime;
      let prepare_status = input_text != "" && input_text != null ? "1" : "0";
      console.log(
        this.$t(
          "views.Interesting.prepareLessons.preLessonDetaisBox.courseWare.526wte060ec0"
        )
      );
      this.ProcessAction(
        prepare_status,
        this.LessonPlanInfoData[this.LessonPlanIndex].prepare_watchfinish
      ); //备课->教案备案进程 -- wgh
      // this.getTeachpics("one"); //备课->课件模式->展开课件目录 -- wgh
      // this.AddCollectAction(); //备课->添加收藏信息 -- wgh
    },
    // 展开的课件目录点击
    selectCourseMenu(item, index) {
      this.LessonImgIndex = index;
      this.LessonPlanInfoData[this.LessonPlanIndex].teachpics_url =
        item.teachpics_url;
      this.showCourseMenu = false;
    },
    // 上一张图片
    prev() {
      if (this.LessonImgIndex > 0) {
        this.LessonImgIndex = this.LessonImgIndex - 1;
      }
    },
    // 下一张图片
    next() {
      if (
        this.LessonImgIndex <
        parseInt(this.LessonPlanInfoData[this.LessonPlanIndex].teachpics_num) -
          1
      ) {
        this.LessonImgIndex = this.LessonImgIndex + 1;
      }
    },
    // 输入个人批注
    descInput() {
      var txtVal = this.LessonPlanInfoData[this.LessonPlanIndex].prepare_postil
        .length;
      console.log(
        this.LessonPlanInfoData[this.LessonPlanIndex].prepare_postil.length
      );
      this.remnant = 500 - txtVal;
    },
    // 预览批注
    previewComments() {
      let teachplan_id = this.LessonPlanInfoData[this.LessonPlanIndex]
        .teachplan_id;
      this.$router.push(
        `/Interesting/prepareLessons/previewCont?teachplan_id=${teachplan_id}&type=0`
      );
    },
    // 视频播放器设置--start
    // 可以拖动的视频播放器配置
    newAliplayerUIsOver() {
      let id_str = "",
        _this = this;
      if (this.$refs["player-con"]) {
        id_str = "player-con";
      } else {
        id_str = "player-con-right";
      }
      this.player = new Aliplayer(
        {
          id: id_str,
          source: this.LessonPlanInfoData[this.LessonPlanIndex]
            .teachplan_videourl,
          width: "100%",
          // height: "600px",
          autoplay: false,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: "hover",
          useH5Prism: true,
          cover: this.LessonPlanInfoData[this.LessonPlanIndex]
            .teachplan_coverimg,
          // components: [
          //   {
          //     name: "PlaylistComponent",
          //     type: AliPlayerComponent.PlaylistComponent,
          //     args: [
          //       [
          //         {
          //           name: "阿里云播放器介绍",
          //           source: "//player.alicdn.com/video/editor.mp4"
          //         },
          //         {
          //           name: "趣拍演示视频",
          //           source: "//player.alicdn.com/resource/player/qupai.mp4"
          //         },
          //         {
          //           name: "云栖大会",
          //           source: "http://player.pier39.cn/video/yunxi.mp4"
          //         },
          //         {
          //           name: "4K 阿里视频云介绍",
          //           source: "https://player.alicdn.com/video/apsaravideo4k.mp4"
          //         }
          //       ]
          //     ]
          //   }
          // ],
          skinLayout: [
            {
              name: "bigPlayButton",
              align: "blabs",
              x: 30,
              y: 80,
            },
            {
              name: "H5Loading",
              align: "cc",
            },
            {
              name: "errorDisplay",
              align: "tlabs",
              x: 0,
              y: 0,
            },
            {
              name: "infoDisplay",
            },
            {
              name: "tooltip",
              align: "blabs",
              x: 0,
              y: 56,
            },
            {
              name: "thumbnail",
            },
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 0,
              children: [
                {
                  name: "progress",
                  align: "blabs",
                  x: 0,
                  y: 44,
                },
                {
                  name: "playButton",
                  align: "tl",
                  x: 15,
                  y: 12,
                },
                {
                  name: "timeDisplay",
                  align: "tl",
                  x: 10,
                  y: 7,
                },
                {
                  name: "fullScreenButton",
                  align: "tr",
                  x: 10,
                  y: 12,
                },
                {
                  name: "setting",
                  align: "tr",
                  x: 15,
                  y: 12,
                },
                {
                  name: "volume",
                  align: "tr",
                  x: 5,
                  y: 10,
                },
              ],
            },
          ],
        },
        function (player) {
          console.log(player, "The player is created");
        }
      );
      this.player.on("pause", function () {
        console.log(
          _this.$t(
            "views.Interesting.prepareLessons.preLessonDetaisBox.courseWare.526wte061dg0"
          )
        );
        _this.prepare_watchtime = _this.player.getCurrentTime().toFixed(2);
      });
      this.player.on("ended", function () {
        console.log(
          _this.$t(
            "views.Interesting.prepareLessons.preLessonDetaisBox.courseWare.526wte061kg0"
          )
        );
        let input_text = _this.LessonPlanInfoData[
          _this.LessonPlanIndex
        ].prepare_postil.toString();
        _this.prepare_watchtime = _this.player.getCurrentTime().toFixed(2);
        let prepare_status = input_text != "" && input_text != null ? "1" : "0";
        _this.ProcessAction(prepare_status, "1"); //备课->教案备案进程 -- wgh
      });
    },
    // 不可以拖动的视频播放器配置
    newAliplayerIsbegin() {
      console.log(this.$refs["player-con"]);
      let id_str = "",
        _this = this;
      if (this.$refs["player-con"]) {
        id_str = "player-con";
      } else {
        id_str = "player-con-right";
      }
      this.player = new Aliplayer(
        {
          id: id_str,
          source: this.LessonPlanInfoData[this.LessonPlanIndex]
            .teachplan_videourl,
          width: "100%",
          autoplay: false,
          // cover: this.LessonPlanInfoData[this.LessonPlanIndex]
          //   .teachplan_coverimg,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: "hover",
          useH5Prism: true,
          cover: this.LessonPlanInfoData[this.LessonPlanIndex]
            .teachplan_coverimg,
          skinLayout: [
            {
              name: "bigPlayButton",
              align: "blabs",
              x: 30,
              y: 80,
            },
            {
              name: "H5Loading",
              align: "cc",
            },
            {
              name: "errorDisplay",
              align: "tlabs",
              x: 0,
              y: 0,
            },
            {
              name: "infoDisplay",
            },
            {
              name: "tooltip",
              align: "blabs",
              x: 0,
              y: 56,
            },
            {
              name: "thumbnail",
            },
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 0,
              children: [
                {
                  name: "playButton",
                  align: "tl",
                  x: 15,
                  y: 12,
                },
                {
                  name: "timeDisplay",
                  align: "tl",
                  x: 10,
                  y: 7,
                },
                {
                  name: "fullScreenButton",
                  align: "tr",
                  x: 10,
                  y: 12,
                },
                {
                  name: "volume",
                  align: "tr",
                  x: 5,
                  y: 10,
                },
              ],
            },
          ],
        },
        function (player) {}
      );
      this.player.on("play", function () {
        console.log(
          _this.$t(
            "views.Interesting.prepareLessons.preLessonDetaisBox.courseWare.526wte061qk0"
          )
        );
      });
      this.player.on("pause", function () {
        console.log(
          _this.$t(
            "views.Interesting.prepareLessons.preLessonDetaisBox.courseWare.526wte061dg0"
          )
        );
        _this.prepare_watchtime = _this.player.getCurrentTime().toFixed(2);
      });
      this.player.on("ended", function () {
        console.log(
          _this.$t(
            "views.Interesting.prepareLessons.preLessonDetaisBox.courseWare.526wte061kg0"
          )
        );
        let input_text = _this.LessonPlanInfoData[
          _this.LessonPlanIndex
        ].prepare_postil.toString();
        _this.prepare_watchtime = _this.player.getCurrentTime().toFixed(2);
        let prepare_status = input_text != "" && input_text != null ? "1" : "0";
        _this.ProcessAction(prepare_status, "1"); //备课->教案备案进程 -- wgh
      });
      if (
        this.LessonPlanInfoData[this.LessonPlanIndex].prepare_watchfinish == "0"
      ) {
        this.player.on("ready", function () {
          _this.player.seek(
            _this.LessonPlanInfoData[_this.LessonPlanIndex].prepare_watchtime
          );
        });
      }
    },
    // 视频播放器设置--end
    // 切换跳转到更多视频页面
    handVideoPlay(item) {
      console.log(item);
      this.$router.push(
        `/Interesting/prepareLessons/highWork?tempworks_id=${item.tempworks_id}&teachhour_branch=${item.teachhour_branch}`
      );
    },
    // 返回关闭
    handBack() {
      this.$router.go(-1);
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    handleClose(done) {
      done();
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["left_menu_height"]) {
        this.left_menu_height = this.$Tool.getTableHeight(
          this.$refs.left_menu_height.getBoundingClientRect().top
        );
      }
    });
  },
  beforeDestroy() {
    if (this.LessonPlanInfoData[this.LessonPlanIndex]) {
      // 离开页面
      let input_text = this.LessonPlanInfoData[
        this.LessonPlanIndex
      ].prepare_postil.toString();
      let prepare_status = input_text != "" && input_text != null ? "1" : "0";
      this.ProcessAction(prepare_status, "1"); //备课->教案备案进程 -- wgh
    }
  },
};
</script>

<style lang="less">
.Interesting-prepareLessons-courseWare {
  .center-detail {
    // max-width: 75vw;
  }
  .left-menu {
    border-right: 1px solid #f2f4f7;
  }
  .comment {
    // padding: 12px;
    font-size: 14px;
    // color: #4c5e95;
    // border: 1px solid rgba(218, 221, 233, 1);
    p {
      line-height: 20px;
    }
    img {
      width: 110px;
    }
  }
  .comment.comment2 {
    padding: 12px 12px;
    border: 1px dashed rgba(218, 221, 233, 1);
    margin-bottom: 10px;
  }
  .comment2,
  .comment3 {
    // padding: 12px 50px;
  }
  .top-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      display: inline-block;
    }
    .icon_1 {
      display: inline-block;
      width: 20px;
      height: 17px;
      background-image: url(../../../../assets/images/sliderNav/nav_1_icon.png);
    }
    .left {
      display: flex;
      align-items: center;
    }
    .right {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
