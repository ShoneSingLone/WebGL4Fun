<template>
  <div class="wrapper201905073325">
    <el-button @click="toggle">toggle</el-button>
    <el-carousel height="200px" :autoplay="true"  direction="vertical" :loop="true">
      <el-carousel-item v-for="item in 3" :key="item">
        asasdf
        <h3 class="medium" v-for="(hehe, index) in 2" :key="index">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-carousel height="200px" :autoplay="false" indicator-position="outside">
      <el-carousel-item v-for="item in 2" :key="item">
        <h3 class="medium" v-for="(hehe, index) in 2" :key="index">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  mounted() {},
  methods: {
    toggle() {
      this.toggle.count = !this.toggle.count;
    if(this.toggle.count){
      $(".el-carousel__item").animate({ height: "300px" });
    }else{
      $(".el-carousel__item").animate({ height: "100px" });

    }
    }
  }
};
</script>

<style lang="scss" >
.wrapper201905073325 {
  display: block;

  .el-carousel__item h3 {
    color: #050607;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    // background-color: #0a3c83;
  }

  .el-carousel__item:nth-child(2n + 1) {
    // background-color: #2c0442;
  }
}
</style>
