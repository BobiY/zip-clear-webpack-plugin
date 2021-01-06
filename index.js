// 入口文件
const fs = require('fs')
const compressing = require('compressing')
const path = require('path')
class ClearPlugin {
  constructor(
    options = {
      outpath: process.cwd(),
      filename: path.basename(process.cwd()),
      compress: {
        type: 'zip',
        sucessHandle () {
          console.log('sucess')
        }, // 压缩成功的回调函数
        errorHandle (e) {
          throw Error(e)
        }, // 压缩失败的回调函数
      }
    }
  ) {
    const extName = path.extname(options.filename)
    if (extName) {
      options.compress.type = extName
    } else {
      options.filename += "."+options.compress.type
    }
    this.options = options
  }
  apply (compiler) {
    // 构建完毕先清除指定文件
    compiler.hooks.done.tap('clear-and-zip-Plugin', (_) => {
      const { outpath, filename, compress, sourcePath } = this.options
      // 相对于工作目录放置 zip 包
      const zipPath = path.join(outpath, filename)
      const entryPath = sourcePath || compiler.options.output.path
      try {
        const isDirExist = fs.existsSync(entryPath)
        if (isDirExist) {
          const status = fs.statSync(entryPath)
          if (!status.isDirectory()) {
            // 源文件不是文件夹，抛出错误
            throw Error(`${entryPath} 不是一个文件夹，请确认内容，修改配置后重试~~~`)
          }
        }
        const isExist = fs.existsSync(zipPath)
        if (isExist) {
          // 存在就先删除旧的压缩包
          fs.unlinkSync(zipPath)
        }
        // 生成新的压缩文件
        compressing[compress.type]
          .compressDir(entryPath, zipPath)
          .then(() => {
            compress.sucessHandle()
          }).catch(e => {
            compress.errorHandle(e)
          })
      } catch (e) {
        // 也可以加上 errorHandle
        compress.errorHandle(e)
        // throw Error(e)
      }
    })
  }
}

module.exports = ClearPlugin
