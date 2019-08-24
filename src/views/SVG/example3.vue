<template>
  <div class="example1">
    <div style="width:100%;height:1000px;">
      <svg-text></svg-text>
    </div>
    <div style="width:100%;height:1000px;">
      <svg-h></svg-h>
    </div>
    <br />
  </div>
</template>

 <script>
import components from "./svgComponent";
export default {
  name: "svgD3",
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