<template>
  <div class="Educational-commonTeaching">
    <div class="content-box bg-white flex1 mt8">
      <div class="ct-head-left flex-al mt12 ml10">
        <span class="left-line-orange mr10"></span>
        <span
          class="color-333 fs14"
        >{{$t('Educational.circulateRegistrat.callManagement.callRecord')}}</span>
      </div>
      <div class="card mt10 mb10">
        <div class="onecard fs14 color-4C5" v-for="(items, index) in tableList.list" :key="index">
          <div class="record-item">
            <div class="header">
              <div class="title fs16 color-243 flex-al-ce">
                <img v-if="items.staffer_img" :src="items.staffer_img" />
                <img
                  v-else-if="items.staffer_img || items.staffer_sex == '男'"
                  src="@/assets/images/default-new-men.png"
                />
                <img
                  v-else-if="items.staffer_img || items.staffer_sex == '女'"
                  src="@/assets/images/default-img-women.png"
                />
                <span>{{items.staffer_cnname}}</span>
              </div>
              <div class="date color-B8C">{{items.catitrack_createtime}}</div>
            </div>
            <div class="content">
              <div>{{$t('Educational.circulateRegistrat.callManagement.form.commun_name')}}: {{items.student_cnname}}</div>
              <div>{{$t('Educational.circulateRegistrat.callManagement.form.commun_time')}}: {{items.catitrack_day}}</div>
              <div>{{$t('Educational.circulateRegistrat.callManagement.form.commun_content')}}: {{items.catitrack_note}}</div>
            </div>
          </div>
        </div>
      </div>
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
</template>

<script>
import eduHttp from "../../Educational.js";
export default {
  name: "Educational-commonTeaching",
  data() {
    return {
      tableList: {
        list: [],
        options: {
          tableHeight: 0 //表格高度
        }
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0
      }
    };
  },
  components: {},
  created() {
    this.getCatitrackApi();
  },
  methods: {
    //电访记录
    getCatitrackApi() {
      eduHttp
        .getCatitrackApi({
          student_id: this.$route.query.student_id,
          p: this.paging.curPage,
          num: this.paging.pageSize,
          is_count: "1" //是否需要总数
        })
        .then(res => {
          this.paging.pageTotal = parseInt(res.data.allnum);
          if (res.data.error == 0) {
            this.tableList.list = res.data.result.list;
          } else {
            this.tableList.list = [];
          }
        });
    },
    // 页码变化
    curPageChange(v) {
      this.paging.curPage = v;
      this.getCatitrackApi();
    },
    // pageSize改变
    pageSizeChange(v) {
      this.paging.curPage = 1;
      this.paging.pageSize = v;
      this.getCatitrackApi();
    },
    //点击卡片
    handSee() {
      console.log("11");
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.Educational-commonTeaching {
  .card {
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    height: 580px;
    .onecard {
      width: calc(33.33% - 16px);
      margin: 8px;
      height: 200px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px 0px rgba(27, 30, 73, 0.15);
      border-radius: 4px;
      .header {
        margin: 10px 12px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      .content {
        margin-left: 6px;
        > div {
          margin: 12px 20px 12px 50px;
        }
      }
    }
  }
}
</style>
