<template>
  <div class="example1">
    <button @click="toggleShow">Toggle show{{currentShow}}</button>
    <table>
      <tr>
        <td>
          <transition name="fade-vue" mode="in-out">
            <p v-if="isShow(0)">hello</p>
          </transition>
        </td>
      </tr>
      <tr>
        <td>
          <transition name="bounce" mode="in-out">
            <p
              v-if="isShow(1)"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque habitant morbi tristique senectus et netus.</p>
          </transition>
        </td>
      </tr>
      <tr>
        <td>
          <transition
            name="custom-classes-transition"
            enter-active-class="animated flipInY"
            leave-active-class="animated bounceOutRight"
            mode="in-out"
          >
            <p v-if="isShow(2)">enter-active-class tada bounceOutRight</p>
          </transition>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "viewsChapter2Example1",
  mounted() {},
  data() {
    return {
      showArray: [0, 1, 2],
      currentShow: 0
    };
  },
  methods: {
    toggleShow() {
      this.currentShow =
        this.currentShow >= this.showArray.length - 1
          ? 0
          : this.currentShow + 1;
    },
    isShow(id) {
      return this.currentShow === id;
    }
  }
};
</script>


<style lang="scss" scoped>
table {
  border: 1px solid #d3dce6;
  width: 100%;
  tr {
    td {
      border: 1px solid #d3dce6;
      height: 64px;
    }
  }
}
</style>


