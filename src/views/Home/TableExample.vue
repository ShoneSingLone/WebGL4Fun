<template>
  <div>
    <c-table-expand></c-table-expand>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "TableExample",
  data() {
    let tableData = [...new Array(100)].map((v, i) => {
      let type = i % 4 === 0 ? "expand" : "no";
      let index = i;
      return {
        index,
        id: "12987122" + i,
        name: "好滋好味鸡蛋仔",
        category: "江浙小吃、小吃零食",
        desc: "荷兰优质淡奶，奶香浓而不腻",
        address: "上海市普陀区真北路",
        shop: "王小虎夫妻店",
        shopId: "10333",
        type
      };
    });
    return {
      tableData,
      tableHeader: [
        {
          label: "商品 ID",
          prop: "id"
        },
        { label: "商品名称", prop: "name" },
        { label: "描述", prop: "desc" }
      ],
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getColumnValueFrom(props) {
      let prop = props.column.property;
      let data = props.row;
      return data[prop] || "no data";
    },
    c(...args) {
      console.log.apply(console, args);
    }
  },
  components: {
    CTableExpand: () =>
      import(/* webpackChunkName: "TableExpand" */ "@c/table/TableExpand.vue")
  }
};
</script>
