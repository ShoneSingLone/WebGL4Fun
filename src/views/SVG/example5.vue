<template>
  <div class="class201911253714">
    <svg-corner />
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