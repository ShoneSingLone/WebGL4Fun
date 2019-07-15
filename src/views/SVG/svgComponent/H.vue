<template>
  <svg style="width:100%;height:100%;background:black" viewBox="0 0 1000 1000">
    <defs>
      <line id="gridLine-horizon" style="fill:none;stroke:green;" x1="0" y1="0" x2="1000" y2="0" />
      <line id="gridLine-vertical" style="fill:none;stroke:green;" x1="0" y1="0" x2="0" y2="1000" />
      <g id="g" style="fill:none;stroke:green">
        <!-- 大写都是绝对 小写是相对 Z 是close 闭合 -->
        <path d="M 30 30 L 55 5 L 80 30 L 55 55 Z" />
      </g>
    </defs>
    <g style="fill:none;stroke:red">
      <path d="M 125,95 A100,50 0 0,0 225,125" />
      <path d="M 225,95 A100,50 90 1,1 225,125" />
      <path d="M 325,95 A100,50 270 0,0 225,125" />
      <path d="M 425,95 A50,50 0 1,0 225,125" />
      <path d="M 525,95 A100,50 0 0,0 225,125" />
    </g>
    <use xlink:href="#g" x="50" y="50" />
    <g v-for="(index) in 100" :key="index">
      <use xlink:href="#gridLine-horizon" :y="index*10" />
      <use xlink:href="#gridLine-vertical" :x="index*10" />
    </g>
    <ellipse cx="400" cy="400" rx="150" ry="200" style="stroke:red;fill:none;" />
    <path d="M0 300 Q80 30 100 300 T 120 300" style="stroke:red;fill:none;" />
  </svg>
</template> 

<script>
export default {
  name: "H",
  mounted() {},
  data() {
    return {};
  },
  methods: {
    handleClick() {
      console.log("handleClick");
    }
  }
};
</script> <style lang="scss" scoped>
</style>