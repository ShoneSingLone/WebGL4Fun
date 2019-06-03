<template>
  <div class="register">
    <el-button @click="insert"></el-button>
  </div>
</template>

<script>
// import { select as selectData } from "./pockjs/data";
import zangodb from "zangodb";
export default {
  created() {
    let db = new zangodb.Db("idb", {
      sys_dict: { age: false, id: true }
    });
    let select = db.collection("sys_dict");
    console.time("insert");
    /*     select
      .insert(selectData)
      .then(() => console.timeEnd("insert"))
      .catch(console.error.bind(console)); */

    console.time("find");
    select
      .find({
        DICT_TYPE: { $eq: "gender" },
        PID: { $ne: 0 }
      })
      .toArray()
      .then(res => {
        console.log("res", res);
        console.timeEnd("find");
      })
      .catch(console.error.bind(console));
  },
  data() {
    return {
      pocket: {}
    };
  },
  methods: {
    insert(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" >
.register {
  @include elevation2();
  width: 500px;
  background-color: white;
  padding: 20px;
  margin: 10px auto;
  border-radius: 4px;
}
</style>
