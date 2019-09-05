
<template>
  <div class="page-json-editor">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div class="window-wrapper">
            <el-button
              @click="window1.isOpenWindow=!window1.isOpenWindow"
            >{{window1.isOpenWindow?"关闭window":"打开window"}}</el-button>
            <hsc-window-style-metal>
              <hsc-window
                title="JSON数据 Ctrl + S 保存"
                :closeButton="true"
                :isOpen.sync="window1.isOpenWindow"
                :resizable="true"
                :width.sync="window1.width"
                :height.sync="window1.height"
              >
                <div class="window-content">
                  <monaco v-model="formData"></monaco>
                </div>
              </hsc-window>
            </hsc-window-style-metal>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <table>
            <tr tag="tr" class="list" v-for="(list, trI) in formData" :key="trI">
              <drop
                @drop="handleDrop({ trI:trI,tdI:tdI},...arguments)"
                tag="td"
                v-for="(item,tdI) in list"
                :key="item.prop"
                width="300px"
                class="item"
                :colspan="item.colspan"
                :rowspan="item.rowspan"
              >
                <drag tag="div" :transfer-data="{ trI:trI,tdI:tdI}">
                  <div>{{ item.label }}{{ item.rowspan }}{{item.type}}</div>
                </drag>
              </drop>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import mockData from "./DSLTable";
import monaco from "@/components/monaco";
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "PageJsonEditor",
  data() {
    return {
      formData: mockData.DSLTable,
      window1: { width: 500, isOpenWindow: true, height: 500 }
    };
  },
  methods: {
    handleDrop(toItem, fromItem) {
      const _list = cloneDeep(this.formData);
      const toValue = this.formData[toItem.trI][toItem.tdI],
        fromValue = this.formData[fromItem.trI][fromItem.tdI];
      _list[fromItem.trI][fromItem.tdI] = toValue;
      _list[toItem.trI][toItem.tdI] = fromValue;
      this.formData = _list;
    }
  },
  components: {
    monaco
  }
};
</script>

<style lang="scss" src="./PageJsonEditor.scss">
</style>