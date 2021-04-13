<template>
  <div class="Interesting-prepareLessons-editLessonPlans height100">
    <!-- 页面右边按钮***start -->
    <div class="right-btn fs14 flex-all">
      <el-button
        type="warning"
        @click="previewComments"
        size="mini"
        class="fs14"
      >
        {{ $t("Interesting.preLessonDetais.btn_text1") }}
      </el-button>
      <!-- <el-button type="primary" size="mini" class="fs14">
        {{$t(
        'Interesting.preLessonDetais.btn_text2'
        )}}
      </el-button>-->
      <i class="btn-close icon-gb ml10 cur-pointer" @click="handBack()"></i>
    </div>
    <div class="content-box bg-white flex">
      <div class="center-detail pAll16">
        <div class="flex-all mb16">
          <span></span>
          <el-button
            @click="EditLessonPlanAction"
            type="primary"
            size="mini"
            class="fs14"
          >
            {{ $t("Common.btn_edit2") }}
          </el-button>
        </div>
        <div class="editor-area" v-if="isShowNeditor">
          <!-- <div class="cover"></div> -->
          <VueNeditorWrap
            v-if="LessonPlanInfoData.prepare_wordcontent"
            ref="ueditor"
            readonly
            v-model.trim="LessonPlanInfoData.prepare_wordcontent"
            :config="config"
            @ready="loadUeditor"
          ></VueNeditorWrap>
          <VueNeditorWrap
            v-else
            ref="ueditor"
            v-model.trim="LessonPlanInfoData.teachplan_wordcontent"
            :config="config"
            @ready="loadUeditor"
          ></VueNeditorWrap>
        </div>
        <div class="btn-container">
          <!-- <el-button type="success" size="small">上传我的教学视频</el-button> -->
          <el-button type="primary" size="small" @click="handlePersonalized"
            >上传我的个性化教案</el-button
          >
          <!-- <el-button type="primary" size="small">保存</el-button> -->
        </div>
        <!-- <div class="flex-all mt16 mb16">
          <span class="flex-al">
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs18">
              {{$t(
              'Interesting.preLessonDetais.small_title1'
              )}}
            </span> 
          </span>
          <el-button @click="PersonPostilAction" type="primary" size="mini" class="fs14">
            <template v-if="LessonPlanInfoData.is_cunzai">
              {{$t(
              'Common.btn_edit'
              )}}
            </template>
            <template v-else>
              {{$t(
              'Common.btn_save'
              )}}
            </template>
          </el-button>
        </div>
        <div class="person-form">
          <el-input
            type="textarea"
            :rows="5"
            :placeholder="$t(
            'Interesting.preLessonDetais.placeholder1'
            )"
            maxlength="500"
            @input="descInput"
            v-model="LessonPlanInfoData.prepare_postil"
          ></el-input>
          <span class="xianzhi fs14 color-8A9">{{ remnant }}/500</span>
        </div> -->
      </div>
      <div class="right-message pAll16">
        <div class="flex-al mb16">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs18">
            {{ $t("Interesting.preLessonDetais.small_title2") }}
          </span>
        </div>
        <div
          v-if="isshowplayer && LessonPlanInfoData.teachplan_videourl"
          class="video-box"
          id="editplayer-con-right"
          ref="editplayer-con-right"
        ></div>
        <blank
          v-else
          blankCont="暂时没有视频~"
        ></blank>

        <!-- <div v-if="LessonPlanInfoData.teachplan_postil!=''" class="flex-al mt16 mb16">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs18">
            {{$t(
            'Interesting.preLessonDetais.small_title4'
            )}}
          </span>
        </div>
        <div
          v-if="LessonPlanInfoData.teachplan_postil!=''"
          class="comment comment1"
          v-html="LessonPlanInfoData.teachplan_postil"
        ></div> -->

        <div v-if="tempvideo.length > 0" class="flex-sb mt16 mb16">
          <div class="flex-al">
            <span class="left-line-orange mr10"></span>
            <span class="color-243 fs18">
              {{ $t("Interesting.preLessonDetais.high_work") }}
            </span>
          </div>
          <router-link
            :to="{
              path: `/Interesting/prepareLessons/allWork?teachplan_id=${teachplan_id}&classcode_branch=${classcode_branch}&teachhour_branch=${teachhour_branch}`,
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
            ></workOne>
          </template>
        </div>
        <!-- <div class="flex-al mt16 mb16">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs18">
            {{$t(
            'Interesting.preLessonDetais.small_title5'
            )}}
          </span>
        </div>
        <div class="comment comment2 flex-all">
          <img src="../../../../assets/images/note-icon.png" alt />
          <router-link
            :to="{ path: `/Interesting/prepareLessons/highRecommend?classcode_branch=${classcode_branch}&teachhour_branch=${teachhour_branch}` }"
            class="color-blue"
          >
            {{$t(
            'Interesting.preLessonDetais.small_title6'
            )}}
            <i
              class="el-icon-caret-right"
            ></i>
          </router-link>
        </div>
        <div class="flex-al mt16 mb16">
          <span class="left-line-orange mr10"></span>
          <span class="color-243 fs18">
            {{$t(
            'Interesting.preLessonDetais.small_title7'
            )}}
          </span>
        </div>
        <div class="comment comment3 flex-all">
          <img src="../../../../assets/images/video-icon.png" alt />
          <router-link
            :to="{ path: `/Interesting/prepareLessons/highVideo?classcode_branch=${classcode_branch}&teachhour_branch=${teachhour_branch}` }"
            class="color-blue"
          >
            {{$t(
            'Interesting.preLessonDetais.small_title8'
            )}}
            <i
              class="el-icon-caret-right"
            ></i>
          </router-link>
        </div> -->
      </div>
    </div>

    <el-dialog
      title="上传我的教学作品"
      :visible.sync="dialogVisible"
      width="700px"
    >
      <el-form label-width="170px" ref="formData" :model="formData">
        <el-form-item
          label="教案名称："
          prop="Lesson_cnname"
          :rules="[{ required: true, message: '请输入教案名称' }]"
        >
          <el-input
            placeholder="请输入教案名称"
            style="width: 360px"
            v-model="formData.Lesson_cnname"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="上传个性化教案视频："
          prop="tempworks_videourl"
          :rules="[{ required: true, message: '请选择视频' }]"
        >
          <el-upload
            accept=".mp3, .mp4, .wma, .avi, .rm, .rmvb, .flv, .mpg, .mov, .mkv"
            ref="uploadRef"
            class="upload-demo"
            :limit="1"
            drag
            :action="`${$urls.easxApiUrl}/PersonalCenter/Picture`"
            name="ossfile"
            :show-file-list="true"
            :data="Uploadimg"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
          >
            <video
              width="100%"
              v-if="formData.tempworks_videourl"
              controls
              :src="formData.tempworks_videourl"
            ></video>
            <template v-else>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>上传视频</em>
              </div>
            </template>
          </el-upload>
          <input
            type="text"
            v-show="false"
            v-model="formData.tempworks_videourl"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handConfirm"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 1、引入VueUeditorWrap组件
import VueNeditorWrap from "vue-neditor-wrap";
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import workOne from "@/components/highWork/workOne.vue"; //优质作品
import httpApi from "../../Interesting";
export default {
  name: "Interesting-prepareLessons-editLessonPlans",
  components: {
    VueNeditorWrap,
    progressTableCont,
    workOne,
    popTips,
    blank,
  },
  data() {
    return {
      Uploadimg: {
        ossfile: "",
        company_id: this.$userDetails.companyId,
      },
      formData: {
        Lesson_cnname: "",
        tempworks_videourl: "",
        tempworks_videoname: "",
      },
      dialogVisible: false,
      classcode_branch: "", //班别编号
      teachhour_branch: "", //课时编号
      prepare_postil: "", //个人批注
      prepare_id: "", //备课id
      prepare_watchtime: "", //观看时长
      remnant: 0,
      player: {}, //播放参数
      isshowplayer: true,
      LessonPlanInfoData: {}, //对应的教案信息
      tempvideo: [], //优秀教学作品
      isShowNeditor: false, //是否加载编辑器
      config: {
        UEDITOR_HOME_URL: "/NEditor/",
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        readonly: false,
        // 初始容器高度
        initialFrameHeight: 500,
        disabled: true,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: `${this.$urls.crmApiUrl}/Uploading/Picture`,
        toolbars: [
          [
            // "insertimage",
            // "insertvideo",
            // 'insertcode',
            "source",
            "justifyleft",
            "justifyright",
            "justifycenter",
            "justifyjustify",
            "fontfamily",
            "fontsize",
            "link",
            "inserttable",
            "fullscreen",
            "forecolor",
            "backcolor",
          ],
        ],
      },
    };
  },
  watch: {},
  computed: {},
  created() {
    this.class_id = this.$route.query.class_id;
    this.course_branch = this.$route.query.course_branch;
    this.hour_lessontimes = this.$route.query.hour_lessontimes;
    this.teachplan_id = this.$Tool.getStorage("teachplan_id")
      ? this.$Tool.getStorage("teachplan_id")
      : "";
    this.EditLessonPlan(); //备课->在线编辑教案信息页面 -- wgh
  },
  methods: {
    handleRemove() {
      this.formData.tempworks_videourl = "";
    },
    AddTeachplanAction() {
      httpApi
        .AddTeachplanAction({
          tempworks_name: this.formData.Lesson_cnname,
          tempworks_videourl: this.formData.tempworks_videourl,
          tempworks_videoname: this.formData.tempworks_videoname,
          teachplan_id: this.LessonPlanInfoData.teachplan_id,
          class_id: this.$route.query.class_id,
          course_branch: this.$route.query.course_branch,
          hour_lessontimes: this.$route.query.hour_lessontimes,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({
              type: "success",
              message: res.data.errortip,
            });
            this.dialogVisible = false;
            this.EditLessonPlan(); //备课->个性化教案 -- wgh
          } else {
            this.$message({
              type: "error",
              message: res.data.errortip,
            });
          }
        });
    },
    handConfirm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.AddTeachplanAction();
        } else {
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.formData.tempworks_videourl = res.result.picture_imgurl;
      this.formData.tempworks_videoname = file.name;
    },
    handlePersonalized() {
      this.dialogVisible = true;
    },
    //备课->在线编辑教案信息页面 -- wgh
    EditLessonPlan() {
      httpApi
        .EditLessonPlan({
          class_id: this.class_id,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          teachplan_id: this.teachplan_id,
        })
        .then((res) => {
          const { list, info, tempvideo } = res.data.result.list;
          this.classcode_branch = info.classcode_branch;
          this.teachhour_branch = info.teachhour_branch;
          this.tempvideo = tempvideo;
          if (res.data.error == 0) {
            this.LessonPlanInfoData = list;
          } else {
            this.LessonPlanInfoData = {};
          }
          this.isShowNeditor = true;
          this.prepare_watchtime = this.LessonPlanInfoData.prepare_watchtime;
          if (this.LessonPlanInfoData.prepare_watchfinish == "1") {
            // 视频是否已经播放完成
            this.$nextTick(() => {
              this.newAliplayerUIsOver(); //视频初始化
            });
          } else {
            this.$nextTick(() => {
              this.newAliplayerIsbegin(); //视频初始化
            });
          }
          let prepareId = this.LessonPlanInfoData.prepare_id;
          if (prepareId == "" || prepareId == null) {
            // 判断是否已经创建备案信息
            this.AddLessonPlanInfoAction(); //备课->教案备案信息创建 -- wgh
          } else {
            this.prepare_id = prepareId;
          }
        });
    },
    //备课->在线编辑教案信息 -- wgh
    EditLessonPlanAction() {
      httpApi
        .EditLessonPlanAction({
          class_id: this.class_id,
          classcode_branch: this.classcode_branch,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          prepare_id: this.prepare_id,
          prepare_wordcontent: this.LessonPlanInfoData.prepare_wordcontent
            ? this.LessonPlanInfoData.prepare_wordcontent
            : this.LessonPlanInfoData.teachplan_wordcontent, //个人批注
          teachplan_id: this.LessonPlanInfoData.teachplan_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.EditLessonPlan(); //备课->在线编辑教案信息页面 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    //备课->添加个人批注 -- wgh
    PersonPostilAction() {
      httpApi
        .PersonPostilAction({
          class_id: this.class_id,
          classcode_branch: this.classcode_branch,
          course_branch: this.course_branch,
          hour_lessontimes: this.hour_lessontimes,
          prepare_id: this.prepare_id,
          prepare_postil: this.LessonPlanInfoData.prepare_postil, //个人批注
          teachplan_id: this.LessonPlanInfoData.teachplan_id,
        })
        .then((res) => {
          if (res.data.error == 0) {
            this.$message({ message: res.data.errortip, type: "success" });
            this.EditLessonPlan(); //备课->在线编辑教案信息页面 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
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
          teachplan_id: this.LessonPlanInfoData.teachplan_id,
        })
        .then((res) => {
          this.prepare_id = res.data.result.prepare_id; //备课id
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
          teachplan_id: this.LessonPlanInfoData.teachplan_id,
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
            this.EditLessonPlan(); //备课->在线编辑教案信息页面 -- wgh
          } else {
            this.$message.error(res.data.errortip);
          }
        });
    },
    // 输入个人批注
    descInput() {
      var txtVal = this.LessonPlanInfoData.prepare_postil.length;
      console.log(this.LessonPlanInfoData.prepare_postil.length);
      this.remnant = 500 - txtVal;
    },
    // 预览批注
    previewComments() {
      let teachplan_id = this.LessonPlanInfoData.teachplan_id;
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
        id_str = "editplayer-con-right";
      }
      this.player = new Aliplayer(
        {
          id: id_str,
          source: this.LessonPlanInfoData.teachplan_videourl,
          width: "100%",
          // height: "600px",
          autoplay: false,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: "hover",
          useH5Prism: true,
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
          console.log("The player is created");
        }
      );
      this.player.on("pause", function () {
        console.log("播放暂停");
        _this.prepare_watchtime = _this.player.getCurrentTime().toFixed(2);
      });
      this.player.on("ended", function () {
        console.log("播放完毕");
        let input_text = _this.LessonPlanInfoData.prepare_postil.toString();
        _this.prepare_watchtime = _this.player.getCurrentTime().toFixed(2);
        let prepare_status = input_text != "" && input_text != null ? "1" : "0";
        _this.ProcessAction(prepare_status, "1"); //备课->教案备案进程 -- wgh
      });
    },
    // 不可以拖动的视频播放器配置
    newAliplayerIsbegin() {
      let id_str = "",
        _this = this;
      if (this.$refs["player-con"]) {
        id_str = "player-con";
      } else {
        id_str = "editplayer-con-right";
      }
      this.player = new Aliplayer(
        {
          id: id_str,
          source: this.LessonPlanInfoData.teachplan_videourl,
          width: "100%",
          autoplay: false,
          // cover: this.LessonPlanInfoData
          //   .teachplan_coverimg,
          isLive: false,
          rePlay: false,
          playsinline: true,
          preload: true,
          controlBarVisibility: "hover",
          useH5Prism: true,
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
        console.log("播放开始");
      });
      this.player.on("pause", function () {
        console.log("播放暂停");
        _this.prepare_watchtime = _this.player.getCurrentTime().toFixed(2);
      });
      this.player.on("ended", function () {
        console.log("播放完毕");
        let input_text = _this.LessonPlanInfoData.prepare_postil.toString();
        _this.prepare_watchtime = _this.player.getCurrentTime().toFixed(2);
        let prepare_status = input_text != "" && input_text != null ? "1" : "0";
        _this.ProcessAction(prepare_status, "1"); //备课->教案备案进程 -- wgh
      });
      if (this.LessonPlanInfoData.prepare_watchfinish == "0") {
        this.player.on("ready", function () {
          _this.player.seek(_this.LessonPlanInfoData.prepare_watchtime);
        });
      }
    },
    // 视频播放器设置--end
    // 切换跳转到更多视频页面
    handVideoPlay(item) {
      console.log(item);
      // this.$router.push(
      //   `/Interesting/prepareLessons/highWork?teachplan_id=${this.teachplan_id}&classcode_branch=${this.classcode_branch}&teachhour_branch=${this.teachhour_branch}`
      // );
    },
    // 富文本编辑器
    loadUeditor(p) {
      console.log(p);
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
    // 离开页面
    // let input_text = this.LessonPlanInfoData.prepare_postil.toString();
    // let prepare_status = input_text != "" && input_text != null ? "1" : "0";
    // this.ProcessAction(prepare_status, "1"); //备课->教案备案进程 -- wgh
  },
};
</script>

<style lang="less">
.Interesting-prepareLessons-editLessonPlans {
  .btn-container {
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: right;
  }
  .editor-area {
    .cover {
      width: 100%;
      height: 100%;
      background-color: pink;
    }
  }
}
</style>
