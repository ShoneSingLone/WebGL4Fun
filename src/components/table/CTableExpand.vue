<template>
  <el-table :data="tableData" style="width: 100%" :height="500" border stripe>
    <el-table-column type="expand" @expand-change="handleExpandChange">
      <slot>default</slot>
      <slot name="expand">
        <template slot-scope="props">
          <div
            v-if="props&&props.column"
          >{{c("columen",props.columne)}}{{getColumnValueFrom(props)}}</div>
          <div v-else>
            <table-expand></table-expand>
          </div>
        </template>
      </slot>
    </el-table-column>
    <el-table-column
      :label="tbHeader.label"
      :prop="tbHeader.prop"
      v-for="(tbHeader, index) in dslHeader"
      :key="index"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "CTableExpand",
  model: {
    prop: "tableData",
    event: "input"
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableHeader: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      model: this.tableData,
      dslHeader: this.tableHeader,
      currentPage: 1
    };
  },
  methods: {
    handleExpandChange(row, expandedRows) {
      console.log(`${expandedRows}行展开或者关闭${row}`);
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
