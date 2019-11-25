<template>
  <div class="example4">
    <svg-taga></svg-taga>
    <svg-elastic>
      <template slot="header">
        <h1>Elastic Draggable SVG Header</h1>
        <p>
          with
          <a href="https://vuejs.org" target="_blank">Vue.js</a> +
          <a href="http://dynamicsjs.com" target="_blank">dynamics.js</a>
        </p>
      </template>
      <template slot="content">
        <p>
          Note this is just an effect demo - there are of course many additional details if you want to use this in
          production, e.g. handling responsive sizes, reload threshold and content scrolling. Those are out of scope
          for this quick little hack. However, the idea is that you can hide them as internal details of a Vue.js
          component and expose a simple Web-Component-like interface.
        </p>
        <p>
          <a
            href="https://github.com/vuejs/vue/tree/dev/examples/elastic-header"
            target="_blank"
          >[Source]</a>
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
.example4 {
  width: 100%;
  height: 100%;
  // background: url(./assets/svgdemo.svg) center center/contain no-repeat;
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