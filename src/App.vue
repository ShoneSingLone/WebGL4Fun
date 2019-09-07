<template>
  <div id="app">
    <el-button
      id="navigation-toggle"
      v-show="!window1.isOpenWindow"
      @click="window1.isOpenWindow=!window1.isOpenWindow"
    >Open Navigation</el-button>
    <hsc-window-style-metal v-show="window1.isOpenWindow" style="position:fixed;z-index:6;">
      <hsc-window
        title="Navigation"
        :closeButton="true"
        :isOpen.sync="window1.isOpenWindow"
        :resizable="true"
        :width.sync="window1.width"
        :height.sync="window1.height"
      >
        <div class="window-content">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          <el-scrollbar style="height:100%;" class="nav-contents">
            <el-tree
              ref="tree"
              :data="routeTree"
              :props="{ children: 'children', label: 'name' }"
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
            ></el-tree>
          </el-scrollbar>
        </div>
      </hsc-window>
    </hsc-window-style-metal>
    <transition name="fade">
      <router-view />
    </transition>
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
      asideWidth: 300,
      filterText: "",
      window1: {
        isOpenWindow: true,
        width: 300,
        height: 500
      }
    };
  },
  methods: {
    filterNode(value, data) {
      debugger;
      if (!value) return true;
      debugger;
      return data.name.indexOf(value) !== -1 || data.path.indexOf(value) !== -1;
    },
    handleWidthChange(width) {
      console.log(width);
      this.asideWidth = width;
    },
    handleNodeClick(data) {
      console.log(data);
      this.$router.push({ name: data.name });
    }
  },
  watch: {
    filterText(val) {
      debugger;
      this.$refs.tree.filter(val);
    }
  },
  components: {
    CResizeContainer: () =>
      import(
        /* webpackChunkName: "ResizeContainer" */ "@c/layout/ResizeContainer.vue"
      )
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

#navigation-toggle {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 6;
}
#window-201909055405 {
  position: relative;
  z-index: 2;
  .titlebar {
    cursor: move;
    padding: 4px 10px;
    display: flex;
    background: linear-gradient(rgb(215, 215, 215), rgb(191, 191, 191));
    justify-content: space-between;
    > .button {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .content {
    .window-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column nowrap;
      overflow: hidden;
      .nav-contents {
        flex: 1;
      }
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
}
</style>
