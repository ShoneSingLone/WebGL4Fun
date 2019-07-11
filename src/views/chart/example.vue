<template>
  <div class="example1201907114106">
    <div id="chart-example">
      <svg class="svg" viewBox="0 0 1920 1080">
        <rect
          :style="dataset&&rectStyle(item,index)"
          @click="log(item)"
          v-for="(item, index) in dataset"
          :key="index"
        />
      </svg>
      <h1>other</h1>
    </div>
  </div>
</template>

 <script>
export default {
  name: "viewsChapter2Example1",
  mounted() {
    var _this = this;
    setInterval(() => {
      _this.dataset = String(Math.ceil((Date.now() + Date.now()) / 3)).split(
        ""
      );
    }, 1000);
  },
  data() {
    return {
      dataset: [12, 31, 22, 17, 25, 18, 29, 14, 9]
    };
  },
  computed: {},
  methods: {
    rectStyle(item, index) {
      let height = item * 10;
      let y = 100 - height;
      return {
        fill: "green",
        stroke: "red",
        strokeWidth: "1",
        x: index * 30 + 10,
        y,
        height,
        width: "20"
      };
    },
    log(item) {
      console.log("example", item);
    }
  },
  components: {}
};
</script> <style lang="scss">
.example1201907114106 {
  .svg {
    width: 100%;
  }
  .bar {
    width: 25px;
    height: 100px;
    margin: 2px;
    display: inline-block;
    background-color: blue;
  }
}
</style>