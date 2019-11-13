const fsextra = require('fs-extra');
const path = require('path');

let sourceDir = path.resolve(__dirname, './../../dist/');
let deployStaticsDir = path.resolve("G:/GitHub/ShoneSingLone.github.io/webgl4fun");
// Sync:
if (process.env.NODE_ENV === 'production' || !process.env.NODE_ENV) {
    console.log('__dirname:', __dirname, '\nfrom:', sourceDir, '\nto:', deployStaticsDir)
    fsextra.emptyDir(deployStaticsDir)
        .then(() => fsextra.copy(sourceDir, deployStaticsDir))
        .then(() => {
            console.log('copied! 1', deployStaticsDir)
        })
        .catch(err => {
            console.error(err)
        })
}