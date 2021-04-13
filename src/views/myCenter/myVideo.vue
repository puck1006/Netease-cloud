<template>
  <div class="myCenter-myVideo height100 myCenter-box">
    <div
      class="flex-all pt10 pb10 pl12 pr12 bg-white height50 bottom-line-f2f7"
    >
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-243 fs18">
          {{ $t("myCenter.page_myVideo_title") }}
        </span>
      </div>
      <div class="cr-head-right"></div>
    </div>
    <div class="content-box bg-white mt8">
      <div v-if="isShowTips" class="tips fs14">
        <div class="flex-all">
          <div class="flex">
            <span>
              <i class="el-icon-warning"></i>
              {{ $t("myCenter.tips_title") }}
            </span>
            <div>
              <p>{{ $t("myCenter.tips_cont1") }}</p>
              <p>{{ $t("myCenter.tips_cont2") }}</p>
            </div>
          </div>
          <span class="icon-delete cur-pointer" @click="hideTips"></span>
        </div>
      </div>
      <div class="flex-wrap pt12 flex-warp-line pl12 pr12">
        <div class="flex-al mb12">
          <span class="mr10 fs14 color-4C5"
            >{{ $t("myCenter.labe_text8") }}：</span
          >
          <div class="select-box" style="width: 170px">
            <el-select
              v-model="filter.tempworks_status"
              @change="search"
              clearable
              filterable
              :placeholder="$t('myCenter.placeholder4')"
            >
              <!-- //审核状态 0待审核 1已审核 -1审核驳回 -->
              <el-option
                :label="$t('myCenter.video_status[0]')"
                value="0"
              ></el-option>
              <el-option
                :label="$t('myCenter.video_status[1]')"
                value="1"
              ></el-option>
              <el-option
                :label="$t('myCenter.video_status[2]')"
                value="-1"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="content-list">
        <div
          ref="auto_height_table"
          class="list-div-auto"
          :style="{ height: content_box_height + 'px' }"
        >
          <div class="class-list" v-if="myVideoList.length > 0">
            <div
              class="itemOne"
              v-for="(item, index) in myVideoList"
              :key="index"
            >
              <div v-if="item.tempworks_isPerfect == '1'" class="mark">
                {{ $t("myCenter.video_mark") }}
              </div>
              <div class="video-box">
                <video
                  controls
                  controlslist="nodownload"
                  :src="item.tempworks_videourl"
                ></video>
              </div>
              <div
                class="class-info mt16"
                style="display: flex; justify-content: space-between"
              >
                <div>
                  <span class="fs16 color-243">{{ item.tempworks_name }}</span>
                  <!--审核状态 0待审核 1已审核 -1审核驳回 -->
                  <span
                    v-if="item.tempworks_status == '0'"
                    class="status fs12 status1"
                    >{{ $t("myCenter.video_status[0]") }}</span
                  >
                  <span
                    v-else-if="item.tempworks_status == '1'"
                    class="status fs12 status2"
                    >{{ $t("myCenter.video_status[1]") }}</span
                  >
                  <span v-else class="status fs12 status3">{{
                    $t("myCenter.video_status[2]")
                  }}</span>
                </div>
                <div>
                  <el-button type="text" @click="handleViewDetail(item)"
                    >查看详情</el-button
                  >
                </div>
              </div>
              <p class="fs14 color-8A9 mt16">
                {{ $t("myCenter.labe_text9") }}{{ item.tempworks_createtime }}
              </p>
              <p class="mt16" style="color: #999; font-size: 13px">
                备注：{{ item.tempworks_rejectreason }}
              </p>
              <div class="pos-right" v-if="item.tempworks_status == 1">优秀教学作品</div>
            </div>
          </div>
          <blank v-else :blankCont="tips"></blank>
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
  </div>
</template>

<script>
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import httpApi from "./myCenter";
export default {
  name: "myCenter-myVideo",
  components: {
    progressTableCont,
    popTips,
    blank,
  },
  data() {
    return {
      content_box_height: 0,
      isShowTips: true, //是否显示提示
      //筛选
      filter: {
        tempworks_status: "", //审核状态 0待审核 1已审核 -1审核驳回
        keyword: "", //关键词
      },
      //我的教学视频列表
      myVideoList: [],
      tips: "暂时没有教学视频哦",
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0,
      },
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getVideo(); // 个人中心->我的视频-- wgh
  },
  methods: {
    handleViewDetail(item) {
      console.log(item);
      this.$router.push(
        `/Interesting/prepareLessons/highWork?tempworks_id=${item.tempworks_id}`
      );
    },
    // 个人中心->我的视频-- wgh
    getVideo() {
      httpApi
        .getVideo({
          is_count: "1", //是否需要总数，可以不传
          p: this.paging.curPage,
          num: this.paging.pageSize,
          // 筛选条件
          tempworks_status: this.filter.tempworks_status,
        })
        .then((res) => {
          this.paging.pageTotal = parseInt(res.data.result.allnum);
          if (res.data.error == 0) {
            this.myVideoList = res.data.result.list;
          } else {
            this.myVideoList = [];
          }
          this.tips = res.data.errortip;
        });
    },
    //检索
    search() {
      this.paging.curPage = 1;
      this.getVideo(); // 个人中心->我的视频-- wgh
    },
    // 关闭提示
    hideTips() {
      this.isShowTips = !this.isShowTips;
      this.$nextTick(() => {
        if (this.$refs["auto_height_table"]) {
          this.content_box_height = this.$Tool.getTableHeight(
            this.$refs.auto_height_table.getBoundingClientRect().top + 52
          );
        }
      });
    },
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getVideo(); // 个人中心->我的视频-- wgh
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
      this.getVideo(); // 个人中心->我的视频-- wgh
    },
    handleClose(done) {
      done();
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.content_box_height = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 52
        );
      }
    });
  },
};
</script>

<style lang="less">
@import "./myCenter";
.myCenter-myVideo {
  .itemOne {
    position: relative;
    .pos-right {
      position: absolute;
      right: 0;
      top: 0;
      background: #ff9e02;
      border-radius: 0px 8px 0px 25px;
      font-size: 12px;
      color: #ffffff;
      line-height: 17px;
      padding: 6px 10px;
    }
  }
}
</style>
