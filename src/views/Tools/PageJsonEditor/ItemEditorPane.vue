<template>
  <hsc-window
    v-if="model"
    class="item-editor-pane"
    title="Item JSON数据 Ctrl + S 保存"
    :closeButton="true"
    :isOpen.sync="model.isOpenWindow"
    :resizable="true"
    :width.sync="model.width"
    :height.sync="model.height"
    :top.sync="model.top||50"
    :left.sync="model.left||500"
  >
    <div class="window-content">
      <monaco v-model="formData" class="monaco"></monaco>
      <div class="form-editor">
        <el-scrollbar style="heigt:100%;">
          <div class="prop-tem" v-for="(value,key, index) in model.formData" :key="index">
            <div class="el-form-item">
              <label class="el-form-item__label" style="width: 80px;">{{key}}</label>
              <div class="el-form-item__content" style="margin-left: 80px;">
                <el-input-number
                  v-if="checkNumberType(key)"
                  v-model="formData[key]"
                  :min="1"
                  :max="10"
                  label="描述文字"
                ></el-input-number>
                <el-input v-else size="mini" v-model="formData[key]"></el-input>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </hsc-window>
</template>
<script>
import monaco from "@/components/monaco";
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "ItemEditorPane",
  props: ["model"],
  mounted() {},
  data() {
    return {
      formData: {}
    };
  },
  watch: {
    "model.formData": function(value) {
      this.formData = cloneDeep(value);
    },
    formData: function(value) {
      this.$emit("change", {
        trI: this.model.trI,
        tdI: this.model.tdI,
        item: value
      });
    }
  },
  methods: {
    handleInputChange(key, value) {
      console.log(key, value);
    },
    checkNumberType(key) {
      return ~["colspan", "rowspan"].indexOf(key);
    }
  },
  components: {
    monaco
  }
};
</script>
<style lang="scss" scoped>
.item-editor-pane {
  .window-content {
    display: flex;
  }
  .monaco {
    flex: 1;
  }
  .form-editor {
    flex: 2;
  }
}
</style>