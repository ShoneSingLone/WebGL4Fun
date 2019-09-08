
<template>
  <div class="page-json-editor">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div class="window-wrapper">
            <el-button
              @click="window1.isOpenWindow=!window1.isOpenWindow"
            >{{window1.isOpenWindow?"关闭window":"打开window"}}</el-button>
            <el-button
              @click="itemConfigWindow.isOpenWindow=!itemConfigWindow.isOpenWindow"
            >{{itemConfigWindow.isOpenWindow?"关闭window":"打开window"}}</el-button>
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
              <item-editor-pane :model="itemConfigWindow" @change="handleItemChange"></item-editor-pane>
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
                  <div
                    :class="['tr-td-content',{'current':`tr${trI}td${tdI}`===currentSelectItem}]"
                  >
                    <span>{{ item.label }}{{ item.rowspan }}{{item.type}}</span>
                    <el-button
                      size="mini"
                      @click="selectIitem(trI,tdI,item)"
                      class="el-icon-edit-outline"
                    ></el-button>
                  </div>
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
import ItemEditorPane from "./ItemEditorPane";

export default {
  name: "PageJsonEditor",
  data() {
    return {
      formData: mockData.DSLTable,
      window1: { width: 500, isOpenWindow: true, height: 500 },
      itemConfigWindow: {
        width: 500,
        isOpenWindow: true,
        height: 500,
        formData: ""
      },
      currentSelectItem: "",
      currentItem: null
    };
  },
  methods: {
    selectIitem(trI, tdI, item) {
      this.itemConfigWindow.isOpenWindow = true;
      this.currentSelectItem = `tr${trI}td${tdI}`;
      this.currentItem = item;
      this.itemConfigWindow.trI = trI;
      this.itemConfigWindow.tdI = tdI;
      this.itemConfigWindow.formData = cloneDeep(item);
    },
    handleDrop(toItem, fromItem) {
      const _list = cloneDeep(this.formData);
      const toValue = this.formData[toItem.trI][toItem.tdI],
        fromValue = this.formData[fromItem.trI][fromItem.tdI];
      _list[fromItem.trI][fromItem.tdI] = toValue;
      _list[toItem.trI][toItem.tdI] = fromValue;
      this.formData = _list;
    },
    handleItemChange(info) {
      const _list = cloneDeep(this.formData);
      _list[info.trI][info.tdI] = info.item;
      this.formData = _list;
    }
  },
  components: {
    monaco,
    ItemEditorPane
  }
};
</script>

<style lang="scss" src="./PageJsonEditor.scss">
</style>