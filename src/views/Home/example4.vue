<template>
  <div class="select-tree-wrapper">
    <div :class="['light',{'red':current===1},{'yellow':current===2},{'green':current===3}]"></div>
    <div>{{order[0]}}</div>
  </div>
</template>

<script>
export default {
  name: "viewsSelectTree",
  mounted() {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.select-tree-wrapper {
  
}
</style>

