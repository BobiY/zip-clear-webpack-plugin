// 入口文件
const fs = require('fs')
const compressing = require('compressing')
const path = require('path')
class ClearPlugin {
  constructor ({ pathname }) {
    this.pathname = pathname
  }
  apply (compiler) {
    // 构建完毕先清除指定文件
    compiler.hooks.done.tap('clear-and-zip-Plugin', (_) => {
      const { pathname } = this
      // 相对于工作目录放置 zip 包
      const zipPath = path.join(process.cwd(), pathname)
      const outputPath = compiler.options.output.path
      try {
        const isExist = fs.existsSync(zipPath)
        if (isExist) {
          // 存在就先删除旧的压缩包
          fs.unlinkSync(zipPath)
        }
        // 生成新的压缩文件
        compressing.zip
          .compressDir(outputPath, zipPath)
          .then(() => {
            console.log('success'); // self output
          })
      } catch (e) {
        throw Error(e)
      }
    })
  }
}

module.exports = ClearPlugin
