<template>
  <div class="Message-messageBox-system height100 Message-box">
    <!-- 页面右边按钮***start -->
    <div class="right-btn fs14 color-8A9">
      <el-button type="primary" size="mini" @click="handMark">{{ $t("myMessage.btn_text1") }}</el-button>
    </div>
    <div class="content-box bg-white mt8">
      <div class="content-list">
        <div
          ref="auto_height_table"
          class="list-div-auto"
          :style="{ height: content_box_height + 'px' }"
        >
          <div class="class-list" v-if="myMessageList.length>0">
            <router-link
              :to="{ path: '/message/messageDetail' }"
              class="itemOne flex mb24 cur-pointer"
              v-for="(item,index) in myMessageList"
              :key="index"
            >
              <div class="left mr12">
                <span
                  class="icon icon-xitong"
                  :class="{'no-read':!item.is_read,'icon-tongzhi':item.message_type=='1'}"
                ></span>
              </div>
              <div class="right fs14">
                <p>
                  <span class="color-243">{{item.message_type_name}}</span>
                  <span class="time ml16">{{item.time}}</span>
                </p>
                <div class="message-small-cont">{{item.cont}}</div>
              </div>
            </router-link>
          </div>
          <blank v-else :blankCont="tips"></blank>
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
  </div>
</template>

<script>
import progressTableCont from "@/components/tables/progressTableCont.vue";
import popTips from "@/components/common/popTips/popTips.vue";
import blank from "@/components/common/Blank/blank.vue";
import httpApi from "../message";
export default {
  name: "Message-messageBox-system",
  components: {
    progressTableCont,
    popTips,
    blank
  },
  data() {
    let item = {
      message_type: "0", //0是系统通知
      message_type_name: "系统通知",
      time: "2019-10-15  11:50",
      is_read: false, //是否已读
      cont:
        "8-19日19:00发布系统升级，可能短时间内不可使用，请你谅解～，恢复会通知，转采了你的采集app卡片流-app卡片式设计-作品集包装-UI图...到UI卡片；转采了你的采集app卡片流-app卡片式设计-作品集包装-UI图...到UI卡片"
    };
    return {
      content_box_height: 0,
      //筛选
      filter: {
        keyword: "" //关键词
      },
      //我的消息列表
      myMessageList: Array(10).fill(item),
      tips: "暂时没有消息哦",
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    };
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    // 标记已读
    handMark() {},
    // 重置表单
    resetForm(form) {
      this.$refs[form].resetFields();
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
    },
    // pageSize改变
    pageSizeChange() {
      this.paging.curPage = 1;
    },
    handleClose(done) {
      done();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.content_box_height = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top
        );
      }
    });
  }
};
</script>

<style lang="less">
.Message-messageBox-system {
}
</style>
