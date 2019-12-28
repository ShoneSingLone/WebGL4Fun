<template>
  <div class="table-example">
    <pre>
      {{cascadValue}}
    </pre>
    <form-item :options="inputOptions" v-model="modelText"></form-item>
    <form-item :options="textareaOptions" v-model="modelTextarea"></form-item>
    <form-item :options="btnOptions"></form-item>
    <form-item :options="paginationOptions" ref="pagination"></form-item>

    <div class="block">
      <span class="demonstration">默认显示所有Tag</span>
      <el-cascader v-model="cascadValue" :options="options" :props="props" clearable></el-cascader>
    </div>
    <div class="block">
      <span class="demonstration">折叠展示Tag</span>
      <el-cascader v-model="cascadValue" :options="options" :props="props" collapse-tags clearable></el-cascader>
    </div>

    <ul>
      <li>
        <!-- <li v-for="i in 1000" :key="i"> -->
        <el-button>{{modelText}}</el-button>
        <el-button>{{modelTextarea}}</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import RFormItem from "./render/RenderFormItem";
import flattenDeep from "lodash/flattenDeep";


export default {
  name: "TableExample",
  provide() {
    return {};
  },
  mounted() {
    window.thisvm = this;
  },
  data() {
    let handleClick = function(event) {
      console.log("handleBlur", event, this);
    };
    handleClick.bind(this);
    return {
      cascadValue:"",
      props: { multiple: true },
      options: [
        {
          value: 1,
          label: "东南",
          children: [
            {
              value: 2,
              label: "上海",
              children: [
                { value: 3, label: "普陀" },
                { value: 4, label: "黄埔" },
                { value: 5, label: "徐汇" }
              ]
            },
            {
              value: 7,
              label: "江苏",
              children: [
                { value: 8, label: "南京" },
                { value: 9, label: "苏州" },
                { value: 10, label: "无锡" }
              ]
            },
            {
              value: 12,
              label: "浙江",
              children: [
                { value: 13, label: "杭州" },
                { value: 14, label: "宁波" },
                { value: 15, label: "嘉兴" }
              ]
            }
          ]
        },
        {
          value: 17,
          label: "西北",
          children: [
            {
              value: 18,
              label: "陕西",
              children: [
                { value: 19, label: "西安" },
                { value: 20, label: "延安" }
              ]
            },
            {
              value: 21,
              label: "新疆维吾尔族自治区",
              children: [
                { value: 22, label: "乌鲁木齐" },
                { value: 23, label: "克拉玛依" }
              ]
            }
          ]
        }
      ],
      show: false,
      modelText: "",
      modelTextarea: "",
      paginationOptions: {
        _type: "ElPagination",
        small: true,
        "current-page": 2,
        layout: "prev, pager, next",
        total: 50,
        handleCurrentChange: function(current) {
          console.log("current-page", current);
        }
      },
      btnOptions: {
        _type: "ElButton",
        type: "primary",
        icon: "el-icon-edit",
        handleClick: handleClick
      },
      inputOptions: {
        _type: "ElInput",
        disabled: false,
        placeholder: "请选择日期",
        "suffix-icon": "el-icon-date",
        handleBlur: function() {
          console.log("handleBlur", arguments);
          debugger;
        }
      },
      textareaOptions: {
        _type: "ElInput",
        type: "textarea",
        "show-word-limit": true,
        disabled: false,
        maxlength: "100",
        placeholder: "请选择日期",
        "suffix-icon": "el-icon-date",
        handleBlur: function() {
          console.log("handleBlur", arguments);
          debugger;
        }
      }
    };
  },
  methods: {
    showText() {
      console.log("showText", arguments);
    },
    toggle() {
      this.show = !this.show;
    }
  },
  watch: {},
  components: {
    "form-item": RFormItem
    //  CTable: () => import(/* webpackChunkName: "TableExpand" */ "@c/table/CTable.vue")
  }
};
</script>

<style lang="scss" scoped>
.table-example {
  background: linear-gradient(90deg, white, #b3b3b3 15%, #b3b3b3 70%, white);
}
</style>

