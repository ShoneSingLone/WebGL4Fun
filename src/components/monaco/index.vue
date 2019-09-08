<template>
  <div ref="container" style="height:100%;"></div>
</template>
<script>
// import "monaco-editor/min/vs/basic-languages/javascript/javascript.js";
// import "monaco-editor/esm/vs/editor/editor.all.js";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import zango from "zangodb";
const db = new zango.Db("json-data", { form: ["id"] });
const form = db.collection("form");

export default {
  name: "monaco",
  model: {
    prop: "value",
    event: "change"
  },
  mounted() {
    this.init();
    this.emitValue();
  },
  props: ["value"],
  data() {
    let model = this.value;
    this.setValue(model);
    return { id: "JsonDataForm", monacoInstance: null, model };
  },
  watch: {
    value: {
      handler: function(val, oldVal) {
        this.model = val;
        this.setValue(val);
      },
      deep: true
    }
  },
  methods: {
    async emitValue() {
      try {
        const modelJSON = JSON.parse(this.monacoInstance.getValue());
        this.$emit("change", modelJSON);
      } catch (error) {
        this.setValue(this.model);
        const h = this.$createElement;
        this.$message({
          message: h("p", null, [
            h("span", null, `JSON 有问题，不转换`),
            h("i", { style: "color: teal" })
          ])
        });
      }
    },
    setValue(model) {
      form.update(
        {
          id: this.id
        },
        { content: model }
      );
      this.monacoInstance &&
        this.monacoInstance.setValue(JSON.stringify(model, null, 2));
    },
    getValue() {},
    async init() {
      try {
        const record = await form.find({
          id: this.id
        });
        if (record && record.toArray) {
          const res = await record.toArray();
          if (res.length !== 1) {
            form.insert({
              id: this.id,
              content: ""
            });
          }
        }
        //得到支持的语言
        /* var modesIds = monaco.languages
        .getLanguages()
        .map(function(lang) {
          return lang.id;
        })
        .sort(); */
        //创建编辑器
        this.monacoInstance = monaco.editor.create(this.$refs.container, {
          //内容
          // value: 'console.log("Hello world!");',
          //语言
          language: "javascript",
          //自适应调整
          automaticLayout: true,
          //主题，三款：vs、vs-dark、hc-black
          theme: "vs-dark",
          //代码略缩图
          minimap: {
            enabled: true
          }
        });
        //内容改变事件
        /*       this.monacoInstance.onDidChangeModelContent(e => { });
         */
        //添加按键监听
        this.monacoInstance.addCommand(
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S,
          this.emitValue.bind(this)
        );
      } catch (error) {}
    }
  }
};
</script>
<style lang="scss">
</style>