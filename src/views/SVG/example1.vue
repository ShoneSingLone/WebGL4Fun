<template>
  <div class="example1">
    <h1>椭圆</h1>
    <svg-h></svg-h>
    <h1>椭圆</h1>
    <br />
    <svg-cat></svg-cat>
    <svg-cat2></svg-cat2>
  </div>
</template>

 <script>
import components from "./svgComponent";
export default {
  name: "viewsChapter2Example1",
  mounted() {},
  data() {
    return {};
  },
  methods: {
    handleClick() {
      console.log("handleClick");
    }
  },
  components
};
</script> <style lang="scss" scoped>
.example1 {
  width: 100%;
  height: 100%;
  background: url(./assets/svgdemo.svg) center center/contain no-repeat;
}
.hahah {
  &:hover {
    cursor: pointer;
  }
}
text {
  fill: rgb(170, 21, 21);
  font-size: 24;
}
rect {
  fill: none;
  stroke: black;
}
</style>