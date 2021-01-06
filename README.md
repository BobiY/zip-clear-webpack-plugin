# zip-clear-webpack-plugin

插件用于将 `webpack` 构建输出目录进行压缩处理。在压缩之前，会把之前生成的 `zip` 包清除。

## 安装

使用 `yarn`:
```
yarn add zip-clear-wepback-plugin -D
```

使用 `npm`:
```
npm install zip-clear-wepback-plugin -D
```


## 使用

```javascript

const ClearPlugin = require('zip-clear-webpack-plugin')

// 零配置使用
module.exports = {
  plugins:[
    new ClearPlugin(),
  ]
}

// 可以指定配置
module.exports = {
  plugins:[
    new ClearPlugin({
      outpath: path.join(__dirmname), // 打包文件输出目录 
      filename: 'app.zip',  // 打包文件名称，后缀仅支持 zip | tag | tgz
      sourcePath: path.join(__dirname, 'dist'), // 默认是webpack 的输出目录
      compress:{
        type: 'zip', // 仅支持 zip | tag | tgz 三选一。 filename 的后缀会覆盖此选项
        suceseeHandle(){},  // 打包成功回调
        errorHandle(){}, // 打包失败回调
      }
    }),
  ]
}

```

### 配置

#### path

压缩文件存放目录，默认是项目的根目录

#### filename

压缩文件名称，默认是 `path.basename(process.cwd())` 也就是项目名称

#### sourcePath

需要压缩的**文件夹**，这里只接受文件夹。默认值是**webpack**打包的输出目录

#### compress

这个配置项是配置依赖项 [compressing](https://www.npmjs.com/package/compressing)的配置，由于只使用了 `compressDir` 进行文件夹压缩。提供的配置项如下：

##### type

表示压缩文件的类型，支持 `zip | tar | tgz` 三种类型。需要注意的是，如果 `filename` 包含文件后缀，则会使用**文件后缀覆盖此选项**。


##### sucessHandle

压缩成功后的回调，一般不需要设置

##### errorHandle

压缩失败的回调，默认出错会直接抛出错误。可以指定用来处理错误行为。



