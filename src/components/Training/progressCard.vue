<template>
  <div
    class="margin-container"
    v-if="
      itemData.progress == 2 || itemData.progress == 3 || itemData.progress == 1
    "
  >
    <template>
      <div class="progress-card" v-if="itemData.progress == 2">
        <div class="card-container">
          <div class="card-header"></div>
          <div class="card-body">
            <div class="title">{{ itemData.career_cnname }}</div>
            <div class="progress-item mt40">
              <ul class="ul-container">
                <li
                  class="circle"
                  v-for="(item, index) in itemData.stage_list"
                  :key="index"
                >
                  <div v-if="item.progress == 1">
                    <span class="description">{{
                      $t("Training.progressCard.progressTitle[0]")
                    }}</span>
                    <img src="../../assets/images/Congratulations.png" alt />
                    <!-- <p class="mt5">{{$t("Training.progressCard.progressItem[0]")}}</p> -->
                    <p class="mt5">{{ item.stage_cnname }}</p>
                  </div>
                  <div v-if="item.progress == 2">
                    <span class="description">{{
                      $t("Training.progressCard.progressTitle[1]")
                    }}</span>
                    <img src="../../assets/images/learning.png" alt />
                    <!-- <p class="mt5">{{$t("Training.progressCard.progressItem[1]")}}</p> -->
                    <p class="mt5">{{ item.stage_cnname }}</p>
                  </div>
                  <div v-if="item.progress == 3">
                    <span class="description third">{{
                      $t("Training.progressCard.progressTitle[2]")
                    }}</span>
                    <img src="../../assets/images/waitlearning.png" alt />
                    <!-- <p class="mt5">{{$t("Training.progressCard.progressItem[2]")}}</p> -->
                    <p class="mt5">{{ item.stage_cnname }}</p>
                  </div>
                </li>
              </ul>
              <div class="complete-progress">
                <div>
                  <p class="zero">0</p>
                  <div
                    class="complete-progress-child"
                    :style="{ width: circleLeft }"
                  ></div>
                  <div class="circle-progress" :style="{ left: circleLeft }">
                    <img
                      src="../../assets/images/progressicon.png"
                      alt
                      class="progressicon"
                    />
                    <span class="percent">{{ itemData.completedNum }}</span>
                  </div>
                </div>
                <div>
                  <p class="completed">100%</p>
                  <div class="circle-completed"></div>
                </div>
              </div>
              <div class="button-container">
                <div class="template">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleLearning"
                    >{{ $t("Training.progressCard.study") }}</el-button
                  >
                  <el-button type="warning" size="mini" @click="handletoExam">{{
                    $t("Training.progressCard.exam")
                  }}</el-button>
                </div>
              </div>
            </div>
            <div
              class="outside-circle-right"
              v-if="itemData.direction == 'right'"
            >
              <img
                src="../../assets/images/direction.png"
                alt
                class="right-direction"
              />
            </div>
            <div
              class="outside-circle-bottom"
              v-if="itemData.direction == 'bottom'"
            >
              <img
                src="../../assets/images/direction.png"
                alt
                class="right-direction"
              />
            </div>
            <div
              class="outside-circle-left"
              v-if="itemData.direction == 'left'"
            >
              <img
                src="../../assets/images/direction.png"
                alt
                class="right-direction"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="itemData.progress == 3">
        <div class="progress-card">
          <div class="card-container">
            <div class="card-header card-header2"></div>
            <div class="card-body">
              <div class="title title2">{{ itemData.career_cnname }}</div>
              <div class="progress-item mt40">
                <ul class="ul-container">
                  <li
                    class="circle"
                    v-for="(item2, index2) in itemData.stage_list"
                    :key="index2"
                  >
                    <span class="description third">{{
                      $t("Training.progressCard.progressTitle[2]")
                    }}</span>
                    <img src="../../assets/images/waitlearning.png" alt />
                    <!-- <p class="mt5">{{$t(`Training.progressCard.progressItem[${index2}]`)}}</p> -->
                    <p class="mt5">{{ item2.stage_cnname }}</p>
                  </li>
                  <!-- <li class="circle">
                    <span class="description third">{{$t("Training.progressCard.progressTitle[2]")}}</span>
                    <img src="../../assets/images/waitlearning.png" alt />
                    <p class="mt5">{{$t("Training.progressCard.progressItem[1]")}}</p>
                  </li>
                  <li class="circle">
                    <span class="description third">{{$t("Training.progressCard.progressTitle[2]")}}</span>
                    <img src="../../assets/images/waitlearning.png" alt />
                    <p class="mt5">{{$t("Training.progressCard.progressItem[2]")}}</p>
                  </li> -->
                </ul>
                <div class="complete-progress">
                  <div>
                    <p class="zero">0</p>
                    <div
                      class="complete-progress-child"
                      :style="{ width: circleLeft2 }"
                    ></div>
                    <div class="circle-progress" :style="{ left: circleLeft2 }">
                      <img
                        src="../../assets/images/progressicon.png"
                        alt
                        class="progressicon"
                      />
                      <span class="percent">{{ circleLeft2 }}%</span>
                    </div>
                  </div>
                  <div>
                    <p class="completed">100%</p>
                    <div class="circle-completed"></div>
                  </div>
                </div>
                <div class="button-container">
                  <div class="template">
                    <el-button type="primary" size="mini" @click="handleExam">{{
                      $t("Training.progressCard.viewClass")
                    }}</el-button>
                  </div>
                </div>
              </div>
              <div
                class="outside-circle-right"
                v-if="itemData.direction == 'right'"
              >
                <img
                  src="../../assets/images/direction.png"
                  alt
                  class="right-direction"
                />
              </div>
              <div
                class="outside-circle-bottom"
                v-if="itemData.direction == 'bottom'"
              >
                <img
                  src="../../assets/images/direction.png"
                  alt
                  class="right-direction"
                />
              </div>
              <div
                class="outside-circle-left"
                v-if="itemData.direction == 'left'"
              >
                <img
                  src="../../assets/images/direction.png"
                  alt
                  class="right-direction"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="itemData.progress == 1">
        <div class="progress-card">
          <div class="card-container">
            <div class="card-header card-header2"></div>
            <div class="card-body">
              <div class="title title2">{{ itemData.career_cnname }}</div>
              <div class="progress-item mt40">
                <ul class="ul-container">
                  <li class="circle">
                    <span class="description third">{{
                      $t("Training.progressCard.progressTitle[2]")
                    }}</span>
                    <img src="../../assets/images/waitlearning.png" alt />
                    <p class="mt5">
                      {{ $t("Training.progressCard.progressItem[0]") }}
                    </p>
                  </li>
                  <li class="circle">
                    <span class="description third">{{
                      $t("Training.progressCard.progressTitle[2]")
                    }}</span>
                    <img src="../../assets/images/waitlearning.png" alt />
                    <p class="mt5">
                      {{ $t("Training.progressCard.progressItem[1]") }}
                    </p>
                  </li>
                  <li class="circle">
                    <span class="description third">{{
                      $t("Training.progressCard.progressTitle[2]")
                    }}</span>
                    <img src="../../assets/images/waitlearning.png" alt />
                    <p class="mt5">
                      {{ $t("Training.progressCard.progressItem[2]") }}
                    </p>
                  </li>
                </ul>
                <div class="complete-progress">
                  <div>
                    <p class="zero">0</p>
                    <div
                      class="complete-progress-child"
                      :style="{ width: circleLeft2 }"
                    ></div>
                    <div class="circle-progress" :style="{ left: circleLeft2 }">
                      <img
                        src="../../assets/images/progressicon.png"
                        alt
                        class="progressicon"
                      />
                      <span class="percent">{{ circleLeft2 }}%</span>
                    </div>
                  </div>
                  <div>
                    <p class="completed">100%</p>
                    <div class="circle-completed"></div>
                  </div>
                </div>
                <div class="button-container">
                  <div class="template">
                    <el-button type="primary" size="mini" @click="handleExam">{{
                      $t("Training.progressCard.viewClass")
                    }}</el-button>
                  </div>
                </div>
              </div>

              <div
                class="outside-circle-bottom"
                v-if="itemData.direction == 'bottom'"
              >
                <img
                  src="../../assets/images/direction.png"
                  alt
                  class="right-direction"
                />
              </div>
              <div
                class="outside-circle-left"
                v-if="itemData.direction == 'left'"
              >
                <img
                  src="../../assets/images/direction.png"
                  alt
                  class="right-direction"
                />
              </div>
              <div
                class="outside-circle-right"
                v-if="itemData.direction == 'right'"
              >
                <img
                  src="../../assets/images/direction.png"
                  alt
                  class="right-direction"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["itemData"],
  data() {
    return {
      circleLeft: "40%",
      circleLeft2: 0,
    };
  },
  created() {
    console.log(this.itemData);
  },
  mounted() {
    this.$nextTick(() => {
      this.circleLeft = this.itemData.completedNum;
    });
  },
  methods: {
    handletoExam() {
      this.$emit("handletoExam");
    },
    handleLearning() {
      this.$emit("handleLearning");
    },
    handleExam() {
      this.$emit("handleExam");
    },
  },
};
</script>

<style lang="less">
.progress-card {
  background-color: #fff;
  border-radius: 15px;
  position: relative;
  width: 100%;
  .card-container {
    width: 100%;
    height: 450px;
    border-radius: 15px;
    box-shadow: 0px 0px 15px 0px rgba(27, 30, 73, 0.15);
    .card-header {
      height: 15px;
      background-color: #00a6ff;
      border-radius: 30px 30px 0 0;
    }
    .card-body {
      z-index: 999;
      .button-container {
        background-color: #fff;
        .template {
          margin-top: 25px;
          text-align: right;
          margin-right: 25px;
        }
      }
      background-color: white;
      .ul-container {
        display: flex;
        justify-content: space-around;
      }
      position: relative;
      .title {
        width: 150px;
        height: 66px;
        background-color: #00a6ff;
        text-align: center;
        color: white;
        line-height: 66px;
        font-size: 24px;
        border-radius: 5px;
        box-shadow: 0px 2px 10px 0px rgba(27, 30, 73, 0.2);
        margin-left: 28px;
      }
      .circle {
        width: 88px;
        height: 88px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 20px 0px rgba(27, 30, 73, 0.1);
        border-radius: 50%;
        text-align: center;
        position: relative;
        .description {
          position: absolute;
          top: 69px;
          right: 24px;
          font-size: 6px;
          color: white;
        }
        img {
          display: block;
          width: 100%;
          margin-top: 12px;
        }
      }
      .complete-progress {
        width: 80%;
        height: 12px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 6px 0px rgba(27, 30, 73, 0.15);
        border-radius: 6px;
        margin: 150px auto 0;
        position: relative;
        .complete-progress-child {
          background-color: #ff9e02;
          width: 42px;
          height: 12px;
          border-radius: 6px 0 0 6px;
        }
        .circle-progress {
          width: 22px;
          height: 22px;
          background: rgba(255, 244, 226, 1);
          border: 1px solid rgba(255, 158, 2, 1);
          border-radius: 50%;
          position: absolute;
          //   left: 40px;
          top: -6px;
          .percent {
            position: absolute;
            top: -54px;
            left: -5px;
            color: #ff9e02;
          }
          .progressicon {
            position: absolute;
            left: -2px;
            top: -30px;
          }
        }
        .zero {
          color: #ff9e02;
          left: 0;
          top: -30px;
          position: absolute;
        }
        .completed {
          color: #00a6ff;
          position: absolute;
          right: 0;
          top: -30px;
        }
        .circle-completed {
          width: 22px;
          height: 22px;
          background: rgba(228, 241, 255, 1);
          border: 1px solid rgba(0, 166, 255, 1);
          border-radius: 50%;
          position: absolute;
          right: 0;
          top: -6px;
        }
      }
    }
  }
  .outside-circle-right {
    width: 50px;
    height: 100px;
    background-color: white;
    border-radius: 0 100px 100px 0;
    position: absolute;
    right: -50px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 8px 0px 23px 0px rgba(27, 30, 73, 0.2);
    .right-direction {
      margin-top: 35px;
    }
  }
  .outside-circle-bottom {
    width: 100px;
    height: 50px;
    background-color: white;
    border-radius: 0 0 100px 100px;
    position: absolute;
    left: 50%;
    bottom: -70px;
    transform: translateX(-50%);
    box-shadow: 1px 4px 11px 0px rgba(27, 30, 73, 0.2);
    .right-direction {
      margin-left: 35px;
      transform: rotate(90deg);
    }
  }
  .outside-circle-left {
    width: 50px;
    height: 100px;
    background-color: white;
    border-radius: 100px 0 0 100px;
    position: absolute;
    left: -50px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: -10px 3px 23px -7px rgba(27, 30, 73, 0.2);
    .right-direction {
      margin-top: 35px;
      transform: rotate(180deg);
    }
  }
}
.margin-container {
  width: calc(32% - 100px);
  margin-left: 10px;
  margin-right: 140px;
  margin-top: 50px;
  margin-bottom: 50px;
}
.margin-container:nth-child(3n) {
  margin-right: 0;
}
.third {
  color: #8a96bc !important;
}
.card-header.card-header2 {
  background-color: #8a96bc !important;
}
.title2 {
  background-color: #8a96bc !important;
}
</style>