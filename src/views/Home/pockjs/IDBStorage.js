import Utils from "./IDBStorage.Utils";
import Query from "./IDBStorage.Query";
/* import {
    get as idbGet,
    set as idbSet,
    Store as idbStore
} from "idb-keyval"; */
var idbGet = window.idb.get;
var idbSet = window.idb.set;
var idbStore = window.idb.Store;
/* export let idb = {
    idbGet,
    idbSet,
    idbStore
} */



/**
 * Pocket.js v2.2.0
 *
 * @file A blazing fast lightweight storage library
 * @author Vincent Racine vincentracine@hotmail.co.uk
 * @license MIT
 */
let Pocket = function (options) {
    'use strict';
    var dbname = options && options.dbname || 'GK';
    var tableName = options && options.tableName || 'dict';
    var dbStore = new idbStore(dbname, tableName);
    /*   idbSet("heheheh", 'hahahahah', dbStore)
          .then(_ => {
              debugger;
              return idbGet("heheheh", dbStore);
          })
          .then(_ => {
              console.log(_);
          }); */
    Pocket.Drivers = {
        'DEFAULT': window.localStorage,
        'SESSION_STORAGE': window.sessionStorage,
    };


    /**
     * Store Object
     *
     * @example
     * var store = new Store();
     *
     * @returns {Store}
     */
    function Store(options) {
        this.version = '2.2.0';
        this.collections = {};
        this.options = Utils.merge({
            dbname: dbname,
            driver: 'idb'
        }, options || {});

        if (!this.options.driver) throw new Error('Storage driver was not found');
    }
    /**
     * Collection Object
     * @param name Collection name
     * @param options Options additional options
     * @returns {Collection}
     */
    function Collection(name, options) {
        if (!name)
            throw new Error('Collection requires a name');
        this.name = name;
        this.documents = [];
        this.options = options || {};
        this.length = 0;
        return this;
    }

    /**
     * Document Object
     * @param {object} object Document data
     * @returns {object} Document data
     */
    function Document(object) {
        if (!Utils.isObject(object))
            throw new Error('Invalid argument. Expected an Object.');
        if (object.hasOwnProperty('_id') === false)
            object._id = Utils.uuid();
        this.object = object;
        return this.object;
    }

    Store.prototype = {
        /**
         * Retrieve a collection from the store.
         * If the collection does not exist, one will be created
         * using the name passed to the function
         *
         * @example
         * var Examples = Store.collection('example');
         *
         * @param {string} name Collection name
         * @param {object} [options] Options when creating a new collection
         * @returns {Collection}
         */
        collection: function (name, options) {
            if (!name)
                throw new Error('Invalid argument. Expected a collection name.');
            var collection = this.collections[name];
            if (!collection) {
                collection = new Collection(name, options || this.options);
                this.collections[name] = collection;
            }
            return collection;
        },

        /**
         * Removes a collection from the store
         *
         * @example
         * Store.removeCollection('example');
         *
         * @param {string} name Collection name
         * @returns {Store}
         */
        removeCollection: function (name) {
            if (!name)
                return this;
            var collection = this.collections[name];
            if (collection) {
                collection.destroy();
                delete this.collections[name];
            }
            return this;
        },

        /**
         * Stores a collection into local storage
         *
         * @param {Collection} [name] Collection name to store into local storage
         * @param {Function} [callback] Async callback
         */
        commit: function (name, callback) {
            if (!name)
                throw new Error('Invalid arguments. Expected collection name');
            var collection = this.collections[name];
            if (collection) {
                collection.commit(callback);
            }
            return this;
        },

        /**
         * Restore previous version of the store.
         * @param options
         * @param callback
         */
        restore: function (options, ) {
            var driver = this.options.driver;

            if (typeof options === 'function') {
                options = {};
            }



            if (this.options.driver === Pocket.Drivers.DEFAULT || this.options.driver === Pocket.Drivers.SESSION_STORAGE) {
                var storage = this.options.driver;
                var len = storage.length;
                for (; len--;) {
                    var key = storage.key(len);
                    if (key.indexOf(this.options.dbname) == 0) {
                        var row = storage.getItem(key);

                        if (typeof row === 'string') {
                            var data = JSON.parse(row),
                                collection;
                            collection = new Collection(data.name, data.options);
                            collection.options.driver = driver;
                            collection.documents = data.documents;
                            collection.length = data.documents.length;
                            this.collections[collection.name] = collection;
                        }
                    }
                }
            }

            return this;
        },

        /**
         * Clean-up after ourselves
         */
        destroy: function () {
            for (var collection in this.collections) {
                if (this.collections.hasOwnProperty(collection)) {
                    if (collection instanceof Collection) {
                        collection.destroy();
                        delete this.collections[collection];
                    }
                }
            }
            this.collections = [];
        }
    };
    Collection.prototype = {
        /**
         * Inserts data into a collection
         *
         * @example
         * var Examples = Store.addCollection('example');
         * Examples.insert({ forename: 'Foo', surname: 'Bar' });
         * Examples.insert([{ forename: 'Pete', surname: 'Johnson' }, { forename: 'Joe', surname: 'Bloggs' }])
         *
         * @param {object|Array} doc Data to be inserted into the collection. Can also be array of data.
         * @param {Function} [callback] Async callback
         * @returns {Document|Array}
         */
        insert: function (doc, callback) {
            var document;

            if (Utils.isArray(doc)) {
                document = doc.map(function (document) {
                    document = new Document(document);
                    this.documents.push(document);
                    return document;
                }, this);
            } else {
                document = new Document(doc);
                this.documents.push(document);
            }

            this.length = this.documents.length;

            return this.commit(callback);
        },

        /**
         * Returns an array of documents which satisfy the query given
         *
         * @example
         * var Examples = Store.addCollection('example');
         * Examples.insert({ _id: '1', forename: 'Foo', surname: 'Bar' });
         * Examples.insert({ _id: '2', forename: 'Bar', surname: 'Foo' });
         * Examples.insert({ _id: '3', forename: 'Foo', surname: 'Bar' });
         * console.log(Examples.length) // 2
         *
         * var results = Examples.find({ forename: 'Foo' });
         * console.log(results) // [{ _id: '1', forename: 'Foo', surname: 'Bar' }, { _id: '3', forename: 'Foo', surname: 'Bar' }]
         *
         * @param {object|number|string} [query] Query which tests for valid documents
         * @return {Collection[]}
         */
        find: function (query) {
            var keys,
                results;
            var _this = this;
            // Get clone of documents in collection
            return (_this.documents.length === 0 ?
                    idbGet(_this.options.dbname + "." + _this.name, dbStore) :
                    Promise.resolve(_this))
                .then(function (collection) {
                    _this.documents = collection.documents;
                    _this.length = collection.length;
                    results = _this.documents.slice(0);
                    query = Query.format(query);
                    // Get query keys
                    keys = Object.keys(query);
                    while (keys.length > 0) {
                        // Break out of loop if we have 0 documents in result
                        if (results.length === 0) {
                            break;
                        }
                        results = results.filter(function (document) {
                            var part = {};
                            part[keys[0]] = query[keys[0]];
                            return Query.compare(document, part)
                        });

                        // Remove query key
                        keys.splice(0, 1);
                    }
                    // Return results to caller
                    return Promise.resolve(results);
                })
        },

        /**
         * Returns the first document which satisfied the query given
         *
         * @example
         * var Examples = Store.addCollection('example');
         * Examples.insert({ _id: '1', forename: 'Foo', surname: 'Bar' });
         * Examples.insert({ _id: '2', forename: 'Foo', surname: 'Bar' });
         * console.log(Examples.length) // 2
         *
         * var result = Examples.findOne({ forename: 'Foo', surname: 'Bar' });
         * console.log(result) // { _id: '1', forename: 'Foo', surname: 'Bar' }
         *
         * @param {object|number|string} [query] Query which tests for valid documents
         * @return {Collection}
         */
        findOne: function (query) {
            return this.find(query)[0] || null;
        },

        /**
         * Updates an existing document inside the collection
         * Supports partial updates
         *
         * @example
         * var Examples = Store.addCollection('example');
         * Examples.insert({ _id: 0, forename: 'Foo', surname: 'Bar' });
         * Examples.update({ _id: 0 },{ title: 'Mrs' });
         *
         * var result = Examples.findOne({ _id:0 });
         * console.log(result) // { _id: '0', forename: 'Foo', surname: 'Bar', title: 'Mrs' }
         *
         * @param {object|number|string} [query] Query which tests for valid documents
         * @param {object} doc Data to be inserted into the collection
         * @param {Function} [callback] Async callback
         * @returns {Collection}
         */
        update: function (query, doc, callback) {
            var documents = this.find(Query.format(query));

            // Iterate through query results and update
            documents.forEach(function (document) {
                // Get index of document in the collection
                var index = this.documents.indexOf(document);

                // If index is not -1 (means it wasn't found in the array)
                if (index !== -1) {
                    //  Merge currently record with update object
                    this.documents[index] = new Document(Utils.merge(this.documents[index], doc));
                }
            }, this);

            return this.commit(callback);
        },

        /**
         * Removes documents which satisfy the query given
         *
         * @example
         * var Examples = Store.addCollection('example');
         * Examples.insert({ _id: '394', forename: 'Foo', surname: 'Bar' });
         * console.log(Examples.length) // 1
         * Examples.remove({ _id: '394' });
         * console.log(Examples.length) // 0
         *
         * @example
         * var Examples = Store.addCollection('example');
         * Examples.insert({ _id: '394', forename: 'Foo', surname: 'Bar' });
         * console.log(Examples.length) // 1
         * Examples.remove({ forename: 'Foo' });
         * console.log(Examples.length) // 0
         *
         * @param {object|number|string} [query] Query which tests for valid documents
         * @param {Function} [callback] Async callback
         * @return {Collection}
         */
        remove: function (query, callback) {
            var documents = this.find(Query.format(query));

            // Iterate through query results
            documents.forEach(function (document) {
                // Get index of document in the collection
                var index = this.documents.indexOf(document);

                // If index is not -1 (means it wasn't found in the array)
                if (index !== -1) {
                    // If found in the array, remove it
                    this.documents.splice(index, 1);
                    // Update the length of the collection
                    this.length--;
                }
            }, this);

            return this.commit(callback);

        },

        /**
         * Stores the collection into local storage
         *
         * @return {Collection}
         */
        commit: function () {
            var collection = JSON.parse(JSON.stringify(this));
            if (this.options.driver === 'idb') {
                console.log('commit', collection.name, collection);
                return idbSet(this.options.dbname.concat("." + collection.name), collection, dbStore)
            } else {
                return Promise.reject('commit fail')
            }
        },

        /**
         * Returns the size of the collection
         * @returns {Number} size of collection
         */
        size: function () {
            return this.documents.length;
        },

        /**
         * Delete collection contents
         */
        destroy: function () {
            var _this = this;
            return _this.remove().then(function () {
                _this.documents = _this.options = _this.name = null;
                return Promise.resolve();
            })
        }
    };

    return new Store(options);
}


if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Pocket
    }
    exports.Pocket = Pocket
}

export default Pocket;