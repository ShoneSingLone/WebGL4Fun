<template>
  <svg
    preserveAspectRatio="xMinYMin meet"
    viewBox="0 0 90 90"
    width="45"
    height="135"
    @click="handleClick"
  >
    <circle cx="42" cy="57" r="30" stroke="black" fill="none"></circle>
    <circle cx="33" cy="48" r="3" style="stroke:none; fill:#339933;"></circle>
    <circle cx="51" cy="48" r="3" style="stroke:none; fill:#339933;"></circle>
    <g id="whiskers2">
      <line x1="45" y1="57" x2="81" y2="51" stroke="black"></line>
      <line x1="45" y1="57" x2="81" y2="62" stroke="black"></line>
    </g>
    <use xlink:href="#whiskers2" transform="scale(-1 1) translate(-84 0)"></use>
    <!-- ears -->
    <polyline stroke="black" fill="none" points="64.8 37.2, 54 6, 42 27, 30 6, 19.2 37.2"></polyline>
    <!-- mouth -->
    <polyline stroke="black" fill="none" points="21 66, 27 72, 57 72, 62 66"></polyline>
    <path stroke="black" fill="#ffcccc" d="M 45 54 L 39 54 A 3 6 0  0 0 45 54"></path>
  </svg>
</template> 

<script>
export default {
  name: "Cat",
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