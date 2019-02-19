<template>
  <el-table :data="tableData" style="width: 100%" :height="500" border stripe>
    <el-table-column type="expand" @expand-change="handleExpandChange">
      <template slot-scope="props">
        <div v-if="props&&props.column">{{c("columen",props.columne)}}{{getColumnValueFrom(props)}}</div>
        <div v-else>
          <table-expand></table-expand>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      :label="tbHeader.label"
      :prop="tbHeader.prop"
      v-for="(tbHeader, index) in tableHeader"
      :key="index"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "TableExpand",
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
    handleExpandChange(row, expandedRows) {
      console.log(`${expandedRows}行展开或者关闭${row}`);
    },
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
  }
};
</script>
