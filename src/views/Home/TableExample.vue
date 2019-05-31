<template>
  <div class="table-example">
    <el-input v-model="condition"/>

    <c-table :prefix="'first'" :tableid="'top'" ref="first_top"/>
  </div>
</template>

<script>
import $ from "jquery";
import mock from "@c/table/listFilesTb.js";
let baseURL = "../../";

export default {
  name: "TableExample",
  provide() {
    return {
      dataCollection: this.tableExpandDataCollection,
      functionCollection: this.functionCollection
    };
  },
  mounted() {
    window.vm = this;
    this.tableExpandDataCollection.first_top.getData();
  },
  data() {
    let vm = this;
    /* 被调用时this指向调用的对象 */
    /* 被调用时this指向调用的对象 */
    /* 被调用时this指向调用的对象 */
    function getData() {
      /* 在判断成功之后会将方法赋值给dataCollection，所以this指向实际调用对象，能用this.的形式调用属性值 */
      let currentState = this;
      let loading = vm.$loading();
      function handleSuccess(r) {
        r = mock;
        console.log("getData", r.data);
        for (let i = 0; i < r.data.length; i++) {
          const item = r.data[i];
          let currentLevelConfig = {
            type: "table-expand",
            isPagination: true,
            /* !!!!在编写的时候应该明确数据项主键字段!!! */
            idName: "applyid",
            tableid: String(item.applyid),
            prefix: currentState.prefix + "_" + currentState.tableid,
            /* !!!!在编写的时候应该明确数据项主键字段!!! */
            functionGetData: "getData2",
            getData: getData2,
            functionHandleCudrrentRowChange: "handleCurrentRowChange",
            /* 用来存放checked */
            checkedCollection: {
              first: {} /* first这一列的checked状态 */,
              first_all: false,
              first_indeterminate: false
            },
            /* 这一层有checkbox */
            tableheader: [
              {
                type: "checkbox",
                prop: "first",
                options: {
                  isSingle: true //单选
                },
                label: "全选",
                width: 50
              },
              {
                prop: "filenumber",
                label: "档号",
                width: 50
              },
              {
                prop: "fileclassnumber",
                label: "档案盒地质类别分类号",
                width: 150
              },
              {
                prop: "fileclassname",
                label: "档案盒地质类别分类名称（铁，铬，地质类）",
                width: 150
              },
              {
                prop: "inbuiltwriting",
                label: "内装信息:文(册)"
              },
              {
                prop: "inbuilexamine",
                label: "内装信息:审（份）"
              },
              {
                prop: "inbuilmappieces",
                label: "内装信息：图（张）"
              },
              {
                prop: "inbuilmaptotal",
                label: "内装信息：图总数（张）"
              },
              {
                prop: "inbuilchart",
                label: "内装信息：表（册）"
              },
              {
                prop: "inbuilpiece",
                label: "内装信息：件（册）"
              },
              {
                prop: "inbuilother",
                label: "内装信息：其它（册）"
              }
            ]
          };
          /* 拼接itemCollectionKey */
          let itemCollectionKey =
            currentLevelConfig.prefix + "_" + currentLevelConfig.tableid;
          /* 如果没有这条数据才在数据集合中新增数据 */
          if (!vm.tableExpandDataCollection[itemCollectionKey]) {
            vm.$set(
              vm.tableExpandDataCollection,
              itemCollectionKey,
              currentLevelConfig
            );
          }
        }
        /* 动态的数据与状态分离 */
        vm.$set(currentState, "tabledata", r.data);
        if (currentState.isPagination) {
          vm.$set(currentState, "total", r.count);
        }
        loading.close();
      }
      $.ajax({
        type: "POST",
        url: baseURL + "mark/buioutboxgt/listFilesTb",
        // url: "www.baidu.com",
        contentType: "application/json",
        success: handleSuccess
      });
      // handleSuccess(mock);
    }

    function getData2() {
      /* 在判断成功之后会将方法赋值给dataCollection，所以this指向实际调用对象，能用this.的形式调用属性值 */
      let currentState = this;
      let loading = vm.$loading();
      function handleSuccess(r) {
        r = mock;
        console.log("getData2:\n", r.data);
        for (let i = 0; i < r.data.length; i++) {
          const item = r.data[i];
          let currentLevelConfig = {
            /* 第一层必须同时以props的形式传入，用来拼接collectionKey */
            idName: "docid",
            tableid: String(item.docid),
            prefix: currentState.prefix + "_" + currentState.tableid,
            /* 作为状态State，能够被json字符串化，以实现跨页面共享状态 */
            /* 所以是字符串 */
            /* 通过加载数据的方法名，从 functionCollection获取*/
            /* 规定getData是从服务器加载数据的方法 */
            functionGetData: "getData",
            getData: getData,
            /* 数据主键与prefix拼接成collection里面数据的key */
            type: "table-expand",
            tabledata: [],
            checkedCollection: {
              first: {} /* first这一列的checked状态 */,
              first_all: false,
              first_indeterminate: false
            },

            tableheader: [
              {
                type: "checkbox",
                prop: "first",
                options: {
                  isSingle: true //单选
                },
                label: "全选",
                width: 50
              },
              {
                label: "借阅",
                prop: "borrower"
              },
              {
                label: "借阅单位",
                prop: "workunit"
              },
              {
                label: "借阅单位地址",
                prop: "unitaddress"
              },
              {
                label: "借阅人手机",
                prop: "mobilephone"
              }
            ],
            isPagination: true
          };
          /* 拼接itemCollectionKey */
          let itemCollectionKey =
            currentLevelConfig.prefix + "_" + currentLevelConfig.tableid;
          /* 如果没有这条数据才在数据集合中新增数据 */
          if (!vm.tableExpandDataCollection[itemCollectionKey]) {
            vm.$set(
              vm.tableExpandDataCollection,
              itemCollectionKey,
              currentLevelConfig
            );
          }
        }
        /* 动态的数据与状态分离 */
        vm.$set(currentState, "tabledata", r.data);
        if (currentState.isPagination) {
          vm.$set(currentState, "total", r.count);
        }
        loading.close();
      }
      $.ajax({
        type: "POST",
        url: baseURL + "mark/buioutboxgt/listFilesTb",
        // url: "www.baidu.com",
        contentType: "application/json",
        success: handleSuccess
      });
      // handleSuccess(mock);
    }

    return {
      condition: "",
      functionCollection: {
        handleCurrentRowChange(newValue, oldValue) {
          console.log("handleCurrentRowChange\n", this, newValue, oldValue);
        }
      },
      checkedRowCollection: {},
      tableExpandDataCollection: {
        first_top: {
          /* 第一层必须同时以props的形式传入，用来拼接collectionKey */
          prefix: "first",
          tableid: "top",
          /* 作为状态State，能够被json字符串化，以实现跨页面共享状态 */
          /* 所以是字符串 */
          /* 通过加载数据的方法名，从 functionCollection获取*/
          /* 规定getData是从服务器加载数据的方法 */
          functionGetData: "getData",
          getData: getData,
          /* 数据主键与prefix拼接成collection里面数据的key */
          idName: "applyid",
          subIdName: "docid",
          type: "table-expand",
          tabledata: [],
          checkedCollection: {
            first: {} /* first这一列的checked状态 */,
            first_all: false,
            first_indeterminate: false
          },
          tableheader: [
            {
              type: "checkbox",
              prop: "first",
              options: {
                isSingle: true //单选
              },
              label: "全选",
              width: 50
            },
            {
              label: "借阅人",
              prop: "borrower"
            },
            {
              label: "借阅单位",
              prop: "workunit"
            },
            {
              label: "借阅单位地址",
              prop: "unitaddress"
            },
            {
              label: "借阅人手机",
              prop: "mobilephone"
            }
          ],
          isPagination: true
        }
      }
    };
  },
  methods: {},
  watch: {
    tableExpandDataCollection(newValue) {
      window.tableExpandDataCollection = newValue;
    }
  },
  components: {
    CTable: () =>
      import(/* webpackChunkName: "TableExpand" */ "@c/table/CTable.vue")
  }
};
</script>

<style lang="scss" scoped>
.table-example {
  background: linear-gradient(90deg, white, #b3b3b3 15%, #b3b3b3 70%, white);
}
</style>

