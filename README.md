# zip-clear-webpack-plugin

插件用于将 `dist` 目录打包成 `zip` 包。再压缩之前，会把之前生成的 `zip` 包清除。

## 安装

`yarn add zip-clear-wepback-plugin -D`


## 使用

```javascript

const ClearPlugin = require('zip-clear-webpack-plugin')

module.exports = {
  plugins:[
    new ClearPlugin({
    pathname: `./app.zip`
  }),
  ]
}


```

### 配置

#### pathname

- 指定 `zip` 的输出路径，这里要求是一个完整的**带文件名称的路径**。
- 默认情况下，会将压缩包输出到**项目的根目录下**。如果想要修改，则可以指定相对于项目根目录的路径即可
