<template>
  <div class="light-wrapper">
    <div :class="['light',{'red':current===1},{'yellow':current===2},{'green':current===3}]"></div>
    <div>{{order[0]}}</div>
  </div>
</template>

<script>
export default {
  name: "viewsChapter2red",
  mounted() {
    let vm = this;
    let change = () => {
      setTimeout(() => {
        /*   debugger;
        let removed = vm.order.splice(0, 1);
        console.log("pop", removed[0]);
        vm.order.splice(length - 1, 0, removed[0]);
        console.log("push", removed[length - 1]);
        vm.current = vm.order[0]; */
        vm.order.push(vm.order.shift());
        vm.current = vm.order[0];
        change();
      }, 1000);
    };
    change();
  },
  data() {
    return { current: 1, order: [1, 2, 2, 3, 3, 3, 2, 2] };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.light-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  .light {
    border-radius: 50%;
    @include elevation4();
    height: 50px;
    width: 50px;
    &.red {
      background-color: red;
    }
    &.yellow {
      background-color: yellow;
    }
    &.green {
      background-color: greenyellow;
    }
  }
}
</style>

