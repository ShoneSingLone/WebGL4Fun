<template>
  <div class="d3-example">
    <div class="tree-fixed">
      <el-scrollbar style="height:100%">
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-scrollbar>
    </div>
    <div :is="currentView"></div>
  </div>
</template>

 <script>
import _components from "./d3Component/index";
import getTreeList from "./d3Component/mixins/treeList";

export default {
  mixins: [getTreeList(_components)],
  components: _components
};
</script>

 <style lang="scss" scoped>
.tree-fixed {
  position: absolute;
  width: 200px;
  height: 100px;
  background: white;
  border-radius: 4px;
  @include elevation2();
}
</style>