<template>
  <div class="templates pAll20">
    <el-button>默认按钮</el-button>
    <div style="margin-bottom:20px;"></div>
    <!-- 线 -->
    <div class="lines"></div>
    <div style="margin-bottom:20px;"></div>
    <!-- select 框 -->
    <div class="flex-al">
      <span class="mr10 fs14 color-666">特殊申请</span>
      <div class="select-box" style="width:170px;">
        <el-select v-model="value" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div style="margin-bottom:20px;"></div>
    <!-- input -->
    <div class="flex-al Inquire-box">
      <div class="ipt-box" style="width:250px;">
        <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" size="mini" class="search-btn fs14">查询</el-button>
    </div>
    <div style="margin-bottom:20px;"></div>
    <!-- 查询 -->
    <div class="flex-wrap">
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">特殊申请</span>
        <div class="select-box" style="width:170px;">
          <el-select v-model="value" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">发布起始时间：</span>
        <div class="time-box flex-al">
          <el-date-picker
            type="date"
            placeholder="开始时间"
            value-format="yyyy-MM-dd"
            v-model="value"
            style="width:130px;"
          ></el-date-picker>
          <span class="ml10 mr10">至</span>
          <el-date-picker
            type="date"
            placeholder="结束时间"
            value-format="yyyy-MM-dd"
            v-model="value"
            style="width:130px;"
          ></el-date-picker>
        </div>
      </div>
      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">报名日期</span>
        <div class="select-box" style="width:260px;">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>

      <div class="flex-al mb12">
        <span class="mr10 fs14 color-666">特殊申请</span>
        <div class="select-box" style="width:170px;">
          <el-select v-model="value" clearable filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al Inquire-box mb12">
        <div class="ipt-box" style="width:250px;">
          <el-input v-model="input" clearable placeholder="请输入内容"></el-input>
        </div>
        <el-button type="primary" size="mini" class="search-btn fs14">查询</el-button>
      </div>
    </div>
    <div style="margin-bottom:20px;"></div>
    <!--表单 -->
    <el-form label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="input框" prop="postpart_name">
        <el-input clearable placeholder="请输入民族" v-model="ruleForm.info_nation" style="width:320px;"></el-input>
      </el-form-item>
      <el-form-item label="select框" prop="region">
        <el-select
          v-model="ruleForm.region"
          clearable
          filterable
          placeholder="请选择活动区域"
          style="width:320px;"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文本框" prop="desc">
        <el-input type="textarea" clearable v-model="ruleForm.desc" autosize style="width:320px;"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" required>
        <el-row style="width:320px">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="ruleForm.date1"
                style="width:100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line tc" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                value-format="HH-ss-mm"
                v-model="ruleForm.date2"
                style="width:100%;"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          v-model="ruleForm.date"
          style="width:320px;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div style="margin-bottom:20px;"></div>
    <!-- 内容页-头部 左右布局 -->
    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50">
      <div class="ct-head-left flex-al">
        <span class="left-line-orange mr10"></span>
        <span class="color-333 fs14">园所收入明细</span>
      </div>
      <div class="cr-head-right">
        <el-button type="primary" size="mini">导出报表</el-button>
      </div>
    </div>
    <div style="margin-bottom:20px;"></div>
    <!-- 中间弹窗 小弹窗 -->
    <div @click="clickSmallProp">中间弹窗 小弹窗</div>
     <!-- 我要跟进弹框-->
    <popTips
      :dialogVisable="dialogVisible"
      :popTipsCont="popTips_fllow"
      @handConfirm="dialogVisible=false"
      @handCancel="dialogVisible=false"
      @handleCloseTip="dialogVisible=false"
    ></popTips>
    <!-- <div class="small-dialog" v-if="dialogVisible">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
        <div class="dialog-content">
          <span>内容区域</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="dialogVisible = false">确 定</el-button>
          <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div> -->
    
    <div style="margin-bottom:20px;"></div>
    <!-- 侧边栏-右边弹窗 小弹窗 -->
    <div @click="clickSmallProp1">右边弹窗 小弹窗</div>
    <div style="margin-bottom:20px;"></div>

    <div class="flex-all pt10 pb10 pl12 pr12 bg-white height50">
      <div class="ct-head-left flex-al">
        <div class="page-head__navlist">
          <router-link class="page-head__navlist-item" tag="div" :to="{path: '/templates'}">已报名名单</router-link>
          <router-link class="page-head__navlist-item" tag="div" :to="{path: '/'}">预报名名单</router-link>
        </div>
      </div>
      <div class="cr-head-right">
        <el-button type="primary" size="mini">导出报表</el-button>
      </div>
    </div>

    <el-drawer
      title="我是标题"
      :visible.sync="cancelVisible"
      direction="rtl"
      size="500px"
      :modal="false"
      custom-class="pop-slider--box"
      :before-close="handleClose"
    >
      <div class="slider-btn">
        <el-button type="primary" size="mini">确定</el-button>
      </div>
      <div class="slider-content pAll20">侧边栏内容区域</div>
    </el-drawer>

    <!-- <SliderBox :showSliderBox="cancelVisible" width="500px" @hideSliderBox="hideSliderBox">
      <div class="pop-slider--box">
        <div class="pop-slider--title">
          <a href="javascript:;" class="call fs16 color-333">
            侧边栏名称
            <em></em>
          </a>
          <div class="flex-al">
            <el-button type="primary" size="mini" @click="confirmProp">确定</el-button>
            <span class="close ml20 el-icon-close" @click="hideSliderBox"></span>
          </div>
        </div>
      </div>
      <div class="slider-content pAll20">侧边栏内容区域</div>
    </SliderBox>-->
  </div>
</template>

<script>
// import SliderBox from "../components/SliderBox";
import popTips from "@/components/common/popTips/popTips.vue";
export default {
  name: "templates",
  components: {
    popTips
  },
  data() {
    return {
      // 提示弹窗
      popTips_fllow: {
        btn_text1: "确定",
        btn_text2: "取消",
        title: "提示",
        context: "内容区域"
      },
      // select
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      value: "",
      // input
      input: "",
      // 表单
      ruleForm: {
        postpart_name: "",
        region: "",
        desc: "",
        date1: "",
        date2: "",
        date: "",
        resource: ""
      },
      // 表单验证
      rules: {
        postpart_name: [
          {
            required: true,
            message: "请输入角色名",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "请选择活动区域",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请填写活动形式",
            trigger: "blur"
          }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "请选择活动资源",
            trigger: "change"
          }
        ]
      },
      //中间弹窗 - 小弹窗
      dialogVisible: false,
      //侧边栏-右边弹窗 小弹窗
      cancelVisible: false,
      //便捷筛选时间段
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2:'',
    };
  },
  methods: {
    //点击小弹窗显示
    clickSmallProp() {
      this.dialogVisible = !this.dialogVisible;
    },
    handleClose(done) {
      done();
    },
    //侧边栏-右边弹窗 小弹窗
    clickSmallProp1() {
      this.cancelVisible = !this.cancelVisible;
    },
    // //侧边栏-右边弹窗 - 关闭
    // hideSliderBox() {
    //   this.cancelVisible = !this.cancelVisible;
    // },
    // //侧边栏-右边弹窗 - 确定
    // confirmProp() {
    //   this.cancelVisible = !this.cancelVisible;
    // }

  }
};
</script>

<style lang="less">
@import url("../assets/less/reset.less");
@import url("../assets/less/common.less");
</style>
