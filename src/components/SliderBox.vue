<template>
  <div class="sliderBox"
    v-if="showSliderBox"
    @click="hideSliderBox">
    <div class="slider"
      :style="{ width: width }"
      :class="{ 'active': animate }"
      @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sliderBox',
    props: ['showSliderBox', 'width'],
    data () {
      return {
        animate: false
      }
    },
    created () {
      console.log(this.showSliderBox)
    },
    methods: {
      hideSliderBox () {
        this.$emit('hideSliderBox')
      }
    },
    watch: {
      showSliderBox (newVal, oldVal) {
        console.log(newVal, oldVal)
        if (newVal) {
          let timer = setTimeout(() => {
            this.animate = true
            clearTimeout(timer)
          }, 10)
        } else {
          this.animate = false
        }
      }
    }
  }
</script>
<style lang="less">
.sliderBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
  .slider {
    // width: 550px;
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateX(100%);
    height: calc(100% - 60px);
    overflow-y: auto;
    transition: .13s linear;
    background-color: #fff;
    box-shadow: 0 0 18px rgba(53, 53, 53,.15);
    font-size: 14px;
    &.active {
       transform: translateX(0);
    }
  }
}
</style>
