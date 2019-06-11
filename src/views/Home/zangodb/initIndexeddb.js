import zango from "zangodb";
import idb from 'idb-keyval';
window.idb = idb;

export default function () {
    var self = this;

    /*
     * 每次登陆成功都会发请求检测是否需要更新
     * 如果
     * isNeedUpdate，total
     */

    var limit = 1000;
    var db, oldDBVersion, newDBversion;
    Promise.all([
            window.idb.get('zango-version'),
            self.$http.get('/sys/dict/loadStatu')
        ])
        .then(function (results) {
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
            var total = Number(res.quantity);
            debugger;
            if (true || isNeedUpdate) {
                window.idb.set('zango-version', newDBversion);
                /* 分批次 */
                return Promise.all(
                    Array.apply(null, Array(Math.ceil(total / 1000)))
                    .map(function (_, index) {
                        /* index从0开始， */
                        var page = index + 1;
                        /* 分页查询 */
                        return self.$http.get('/sys/dict/loadDict', {
                            params: {
                                order: '',
                                orderField: '',
                                page: page,
                                limit: limit
                            }
                        });
                    })
                );
            } else {
                return Promise.reject('已是最新');
            }

        })
        .then(function (resArray) {
            if (resArray.length > 0) {
                db = new zango.Db('idb', oldDBVersion, {
                    sys_dict: {
                        id: true,
                        pid: true,
                        dictType: true
                    }
                });
                return db.drop()
                    .then(function () {
                        db = new zango.Db('idb', newDBversion, {
                            sys_dict: {
                                id: true,
                                pid: true,
                                dictType: true
                            }
                        });
                        var tableSysDict = db.collection('sys_dict');
                        return resArray.map(function (res) {
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
        .then(function () {
            if (db) {
                db.close();
            }
        })
        .catch(function (error) {
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