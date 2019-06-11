const path = require('path');

module.exports = {
    entry: path.resolve('./IDBStorage.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'IDBStorage.js',
        library: 'IDBStorage',
        libraryTarget: 'umd'
    }
};