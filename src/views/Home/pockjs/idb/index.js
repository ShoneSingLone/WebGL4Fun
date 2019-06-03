var db;

function DB(db) {
    this.db = this.db || db;
}

DB.prototype.upsertStore = function (name, options) {
    if (!this.db.objectStoreNames.contains(name)) {
        this.db.createObjectStore(name, options);
    }
    return this;
}

export default function () {
    var openRequest = indexedDB.open("idb", Date.now());
    openRequest.onupgradeneeded = function (e) {
        db = new DB(e.target.result)
            .upsertStore('sys_dict');
        console.log(db);
    }
    openRequest.onsuccess = function (e) {
        console.log("onsuccess");
        db = e.target.result;
        console.dir(db.objectStoreNames);
    }
    openRequest.onerror = function (e) {
        console.log("onerror!");
        console.dir(e);
    }
}