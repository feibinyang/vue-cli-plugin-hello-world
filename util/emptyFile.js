const fs = require('fs')
const path = require('path');

function empty(api, fileList, dir) {
  const files = [].concat(fileList)
  files.forEach(file => {
    let joinPath = file;
    if (dir) {
      joinPath = path.join(dir + '/' + file)
    }
    var resolvePath = api.resolve(joinPath)
    if (fs.statSync(resolvePath).isDirectory()) {
      const resolveFiles = fs.readdirSync(resolvePath)
      empty(api, resolveFiles, resolvePath)
      fs.rmdirSync(resolvePath)
    }
    else {
      fs.unlinkSync(resolvePath)
    }
  })
}

module.exports = empty
