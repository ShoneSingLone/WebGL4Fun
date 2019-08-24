<template>
  <div class="table-example">
    <form-item :options="inputOptions" v-model="modelText"></form-item>
    <form-item :options="textareaOptions" v-model="modelTextarea"></form-item>
    <form-item :options="btnOptions"></form-item>
    <form-item :options="paginationOptions" ref="pagination"></form-item>
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

