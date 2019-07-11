<template>
  <div id="app">
    <c-resize-container class="aside" @widthChange="handleWidthChange">
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
      <span class="icon iconfont icon-huafei"></span>
      <header class="header">Header</header>
      <el-scrollbar class="main">
        <main>
          <transition name="fade">
            <router-view/>
          </transition>
        </main>
      </el-scrollbar>
      <footer class="footer">Footer</footer>
    </section>
  </div>
</template>

<script>
import { routeTree } from "@/router";


export default {
  provide() {
    return {
      APP: this
    };
  },
  data() {
    return {
      routeTree,
      asideWidth: 300
    };
  },
  methods: {
    handleWidthChange(width) {
      console.log(width);
      this.asideWidth = width;
    },
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

  > .aside {
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
  > .container {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
    @include elevation2();

    .header {
      flex-basis: 64px;
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      @include elevation4();
    }
    .main {
      flex: 1;
      background-color: #e9eef3;
      overflow: hidden;
      &.el-scrollbar {
        height: 100%;
        .el-scrollbar__wrap {
          height: 100%;
          overflow-x: hidden;
          .el-scrollbar__view {
            height: 100%;
            > main {
              height: 100%;
            }
          }
        }
      }
    }
    .footer {
      flex-basis: 64px;
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      @include elevation4();
    }
  }
}
</style>
