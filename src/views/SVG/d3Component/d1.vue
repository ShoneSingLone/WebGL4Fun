<template>
  <div class="example-d3" ref="d3"></div>
</template>

 <script>
let runD3 = () => import('d3');
export default {
  name: "D3-1",
  mounted() {
    runD3().then(d3 => {
      let svg = d3.select(".example-d3");
      svg
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

      svg
        .append("circle")
        .attr("cx", "50")
        .attr("cy", "50")
        .attr("r", "50")
        .attr("fill", "red");
        
    }, 3000);
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      console.log("handleClick");
    }
  }
};
</script>
 <style lang="scss" scoped>
</style>
