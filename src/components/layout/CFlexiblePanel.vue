<template>
  <div :class="['c-flexible-panel-wrapper']" :style="wrapperStyle">
    <div class="search-wrapper">
      <input type="text" name id placeholder="检索菜单..." v-model="searchKeyWord">
    </div>
    <!-- toggle icon button -->
    <div class="toggle" @click="toggleCollapse">
      <el-button type="primary" icon="el-icon-document" circle></el-button>
    </div>
    <!-- toggle icon button -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//有命名空间的事件名

export default {
  name: "CFlexiblePanel",
  mounted() {
    this.setStyle();
    /*
     */
    /*  axios.get("http://172.23.132.113:3000/ajax/test").then(_ => {
      console.log(_);
    });
    axios
      .post("http://172.23.132.113:3000/ajax/test", { hello: "hi" })
      .then(_ => {
        console.log(_);
      }); */
  },
  data() {
    return {
      isOpen: false,
      styleCollection: {
        width: 0,
        height: 0
      },
      wrapperStyle: {}
    };
  },
  methods: {
    setStyle() {
      let { width, height } = document.body.getBoundingClientRect();
      this.styleCollection.width = Math.floor(width * 0.5);
      this.styleCollection.height = Math.floor(height * 0.75);
      this.setWrapperStyle();
    },
    setWrapperStyle() {
      this.wrapperStyle = {
        width: `${this.styleCollection.width}px`,
        height: `${this.styleCollection.height}px`,
        right: this.isOpen ? `0` : `-${this.styleCollection.width}px`
      };
    },
    toggleCollapse() {
      this.isOpen = !this.isOpen;
      this.setWrapperStyle();
    }
  }
};
</script>

<style lang="scss" scoped>
.c-flexible-panel-wrapper {
  position: fixed;
  box-sizing: border-box;
  min-width: 50%;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  @include elevation2();
  transition: all 0.3s ease-in-out;
  > .toggle {
    position: absolute;
    top: 0;
    right: 100%;
  }
}

.search-wrapper {
  input {
    width: 50px;
    height: 24px;
    font-size: 14px;
    padding-left: 14px;
    border-radius: 42px;
    border: 2px solid #324b4e;
    background: #f9f0da;
    outline: none;
    position: relative;
    transition: 0.3s linear;
    &:focus {
      width: 100%;
    }
  }
}
</style>

