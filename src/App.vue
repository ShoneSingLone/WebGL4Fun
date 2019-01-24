<template>
  <div id="app">
    <c-resize-container class="aside">
      <el-tree
        :data="routeTree"
        :props="{
          children: 'children',
          label: 'name'
        }"
        @node-click="handleNodeClick"
      ></el-tree>
    </c-resize-container>
    <section class="container">
      <header class="header" style="height: 60px;">Header</header>
      <main class="main">
        <router-view/>
      </main>
      <footer class="footer" style="height: 60px;">Footer</footer>
    </section>
  </div>
</template>

<script>
import { routeTree } from "@/router.js";

export default {
  data() {
    return {
      routeTree
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.$router.push({ name: data.name });
    }
  },
  components: {
    CResizeContainer: () =>
      import(/* webpackChunkName: "ResizeContainer" */ "@c/layout/ResizeContainer.vue")
  }
};
</script>


<style lang="scss">
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

a {
  font-weight: bold;
  color: #2c3e50;
  &.router-link-exact-active {
    color: #42b983;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  overflow: hidden;

  .aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
    > .el-tree {
      width: 100%;
      .el-tree-node__content {
        position: relative;
        &:hover {
          cursor: pointer;
          @include elevation4();
        }
        &:active {
          background-color: #b3c0d1;
          @include elevation2();
        }
        &::before {
          content: " ";
          display: block;
          position: absolute;
          z-index: 1;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
  .container {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    @include elevation2();

    .header {
      flex-basis: 64px;
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
    }
    .main {
      flex: 1;
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      line-height: 160px;
      overflow: hidden;
    }
    .footer {
      flex-basis: 64px;
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
    }
  }
}
</style>
