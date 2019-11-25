<template>
  <div class="class201911253714">
    <div class="one">
      <svg-taga></svg-taga>
    </div>
    <svg-elastic>
      <template slot="header">
        <h1>Elastic Draggable SVG Header</h1>
        <p>
          with
          <a href="https://vuejs.org" target="_blank">Vue.js</a> +
          <a href="http://dynamicsjs.com" target="_blank">dynamics.js</a>
        </p>
      </template>
    </svg-elastic>
  </div>
</template>

 <script>
import components from "./svgComponent";
console.log(components);

export default {
  name: "viewsChapter2Example4",
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
.class201911253714 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
</style>