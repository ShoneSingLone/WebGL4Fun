<template>
  <div class="register">
    <el-input v-model="inputtext"></el-input>
    <el-button @click="insert">insert</el-button>
    <el-button @click="find">find</el-button>
  </div>
</template>

<script>
// import { select as selectData } from "./pockjs/data";
import zango from "zangodb";
import { get, set } from "idb-keyval";
import axios from "axios";
window.idb = { get, set };
import IDBStorage from "./pockjs/IDBStorage";
export default {
  created() {
    this.initPockjs();
  },
  data() {
    return { inputtext: "", pocket: {} };
  },
  methods: {
    initPockjs() {
      // Create a new Pocket
      var pocket = new IDBStorage();

      // Add a collection
      var staffs = pocket.collection("staff");

      // Add a item to the collection
      staffs.insert({ name: "Foo Bar", age: 18 });
      staffs.insert({ name: "Baz Foo", age: 34 });

      // Add an array of items
      staffs.insert([
        { name: "Pete Johnson", age: 44 },
        { name: "Joe Bloggs", age: 19 }
      ]);

      // Get all items from a collection
      staffs.find().length; //2

      // Query for specific items
      staffs.find({ age: { $gt: 18 } }); //[{ _id:'...', name:'Baz Foo', age:34 }]

      // Get one item
      staffs.findOne({ name: "Foo Bar" }).age; //18

      // Remove all items from a collection
      staffs.remove();

      // Remove item
      staffs.remove({ name: "Foo Bar" });

      // Update item
      staffs.update({ name: "Foo Bar" }, { age: 19 });

      // Commit collection to database
      staffs.commit();

      // Restore from database
      pocket.restore();
    },
    insert(formName) {
      this.$refs[formName].resetFields();
    },
    find() {
      var _this = this;
      var db = new zango.Db("idb", window.dbVersion, {
        sys_dict: {
          id: true,
          pid: true,
          dictType: true
        }
      });
      var tableSysDict = db.collection("sys_dict");
      debugger;
      tableSysDict
        .find({
          dictType: {
            $eq: "GENDER"
          },
          pid: {
            $ne: 0
          }
        })
        .toArray()
        .then(function(res) {
          _this.inputtext = JSON.stringify(res, null, 2);
        })
        .catch(console.error.bind(console));
    },
    init() {
      var self = this;

      /*
       * 每次登陆成功都会发请求检测是否需要更新
       * 如果
       * isNeedUpdate，total
       */

      var limit = 1000;
      var db, oldDBVersion, newDBversion;
      Promise.all([
        window.idb.get("zango-version"),
        axios.get("/sys/dict/loadStatu")
      ])
        .then(function(results) {
          oldDBVersion = String(results[0]);
          var res = results[1] && results[1].data;
          if (res.code !== 0) {
            self.$message.error(res.msg);
            return Promise.reject(res.msg);
          }
          res = res.data;
          /* res = { id: "", name: "", quantity: "", remarks: "", status: ""} */
          /* 根据res的信息得出isNeedUpdate，total */
          newDBversion = String(res.status);
          var isNeedUpdate = oldDBVersion !== newDBversion;
          window.dbVersion = newDBversion;
          var total = Number(res.quantity);
          if (true || isNeedUpdate) {
            window.idb.set("zango-version", newDBversion);
            /* 分批次 */
            var countArray = Array.apply(null, Array(Math.ceil(total / 1000)));
            return Promise.all(
              countArray.map(function(_, index) {
                /* index从0开始， */
                var page = index + 1;
                /* 分页查询 */
                return axios.get("/sys/dict/loadDict", {
                  params: {
                    order: "",
                    orderField: "",
                    page: page,
                    limit: limit
                  }
                });
              })
            );
          } else {
            return Promise.reject("已是最新");
          }
        })
        .then(function(resArray) {
          if (resArray.length > 0) {
            db = new zango.Db("idb", oldDBVersion, {
              sys_dict: {
                id: true,
                pid: true,
                dictType: true
              }
            });
            return db.drop().then(function() {
              db = new zango.Db("idb", newDBversion, {
                sys_dict: {
                  id: true,
                  pid: true,
                  dictType: true
                }
              });
              var tableSysDict = db.collection("sys_dict");
              return resArray.map(function(res) {
                res = res.data;
                if (res.code !== 0) {
                  self.$message.error(res.msg);
                  return Promise.reject(res.msg);
                }
                res = res.data;
                /* res = {list:[], total:number} */
                /* return tableSysDict.insert(tableSysDictDataArray); */
                return tableSysDict.insert(res.list);
              });
            });
          } else {
            return Promise.reject();
          }
        })
        .then(function() {
          if (db) {
            db.close();
          }
        })
        .catch(function(error) {
          console.error.bind(error);
          if (db) {
            db.close();
          }
        });
      /*  .catch(console.error.bind(console)).finally(function () {
       if (db) {
         db.close();
       }
     }); */
      /*

    tableSysDict
    .find({
    dictType: {
    $eq: 'gender'
    },
    pid: {
    $ne: 0
    }
    })
    .toArray()
    .then(function (res) {
    console.log('res', res);
    console.timeEnd('find');
    })
    .catch(console.error.bind(console)); */
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
