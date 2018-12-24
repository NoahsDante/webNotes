[toc]
# package.json配置文件解析
## package.json

```
{
  "name": "vue-project",
  "version": "1.0.0",
  "description": "1.0",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "jest --config test/unit/jest.conf.js --coverage",
    "e2e": "node test/e2e/runner.js",
    "test": "npm run unit && npm run e2e",
    "lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs",
    "build": "node build/build.js"
  },
  "dependencies": {
    "vue": "^2.5.2",
    "vue-router": "^3.0.1"
  },
  "devDependencies": {
    //自动补全css 兼容性样式
    "autoprefixer": "^7.1.2",
    // 某些代码需要调用Babel的API进行转码
    "babel-core": "^6.22.1",
    // 静态检查代码的语法和风格
    "babel-eslint": "^7.1.1",
    //  vue  jsx 语法编译
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    // 用jest 测试vue组件
    "babel-jest": "^21.0.2",
    // ES6  代码转换器， webpack 插件
    "babel-loader": "^7.1.1",
    // 过Babel使用import
    "babel-plugin-dynamic-import-node": "^1.2.0",
    //  vue  jsx 语法编译
    "babel-plugin-syntax-jsx": "^6.18.0",
    // 将 ES2015 模块转换成 CommonJS 格式的，然后再统一处理
    "babel-plugin-transform-es2015-modules-commonjs": "^6.26.0",
    // 所有的助手都会引用该模块babel-runtime以避免在编译后的输出中出现重复。运行时将被编译到您的版本中
    "babel-plugin-transform-runtime": "^6.22.0",
    //   vue  jsx 语法编译
    "babel-plugin-transform-vue-jsx": "^3.5.0",
    // 通过自动根据您的目标浏览器或运行时环境确定所需的Babel插件和填充，从而将ES2015 +编译为ES5的Babel预设
    "babel-preset-env": "^1.3.2",
    // ES6  ES7 要使用的语法阶段
    "babel-preset-stage-2": "^6.22.0",
    // 模块改写require命令，为它加上一个钩子。使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码
    "babel-register": "^6.22.0",
    // 命令行彩色输出
    "chalk": "^2.0.1",
    // 调试浏览器
    "chromedriver": "^2.27.2",
    // 拷贝资源
    "copy-webpack-plugin": "^4.0.1",
    // 跨平台解决js调用 npm 命令
    "cross-spawn": "^5.0.1",
    // 用于在js中加载css
    "css-loader": "^0.28.0",
    
    "eslint": "^3.19.0",
    "eslint-config-standard": "^10.2.1",
    "eslint-friendly-formatter": "^3.0.0",
    "eslint-loader": "^1.7.1",
    "eslint-plugin-html": "^3.0.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-node": "^5.2.0",
    "eslint-plugin-promise": "^3.4.0",
    "eslint-plugin-standard": "^3.0.1",
    
    // 要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
    "extract-text-webpack-plugin": "^3.0.0",
    // 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
    "file-loader": "^1.1.4",
    // webpack错误信息提示插
    "friendly-errors-webpack-plugin": "^1.6.1",
    // 简化了HTML文件的创建，生成一个HTML5文件,以便为您的 webpack bundle 提供服务
    "html-webpack-plugin": "^2.30.1",
    
    "jest": "^21.2.0",
    "jest-serializer-vue": "^0.3.0",
    
    // 功能测试 自动测试框架
    "nightwatch": "^0.9.12",
    // 发送桌面消息,包括应用状态改变以及错误信息.
    "node-notifier": "^5.1.2",
    // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题
    "optimize-css-assets-webpack-plugin": "^3.2.0",
    // 主要用来实现node.js命令行环境的loading效果，和显示各种状态的图标等
    "ora": "^1.2.0",
    // 一个自动检索端口的包
    "portfinder": "^1.0.13",
    // 遵循@import规则，将引入的样式合并到主样式
    "postcss-import": "^11.0.0",
    // 定制化css，增强css功能
    "postcss-loader": "^2.0.8",
    // 替换资源文件路径
    "postcss-url": "^7.2.1",
    // 以包的形式包装rm-rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除
    "rimraf": "^2.6.0",
    // 该软件包会导出一个包含selenium服务器二进制/可执行文件路径的路径字符串。
    "selenium-server": "^3.0.1",
    // 语义化版本号 控制
    "semver": "^5.3.0",
    // 可以在shell 命令行下执行js脚本的命令
    "shelljs": "^0.7.6",
    // 压缩你的JavaScript代码
    "uglifyjs-webpack-plugin": "^1.1.1",
    // 文档加载器
    "url-loader": "^0.5.8",
    // 用于测试*.vue 文件 jest 
    "vue-jest": "^1.0.2",
    // 将.vue格式组件文件转化为Javascript
    "vue-loader": "^13.3.0",
    // 许使用其它 webpack loader 处理 Vue 组件的某一部分。它会根据 lang 属性自动推断出要使用的 loader
    "vue-style-loader": "^3.0.1",
    // 模板编译装载机
    "vue-template-compiler": "^2.5.2",
    // 打包工具
    "webpack": "^3.6.0",
    // 查看 webpack 打包后所有组件与组件间的依赖关系，针对多余的包文件过大 视化视图查看器
    "webpack-bundle-analyzer": "^2.9.0",
    // 是一个小型的Node.js Express服务器,它使用webpack-dev-middleware来服务于webpack的包
    "webpack-dev-server": "^2.9.1",
    // 混合配置项合并
    "webpack-merge": "^4.1.0"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}

```

## 归纳
### webpack插件
```
"webpack": "^3.6.0",
// 查看 webpack 打包后所有组件与组件间的依赖关系，针对多余的包文件过大 视化视图查看器
"webpack-bundle-analyzer": "^2.9.0",
// 是一个小型的Node.js Express服务器,它使用webpack-dev-middleware来服务于webpack的包
"webpack-dev-server": "^2.9.1",
// 混合配置项合并
"webpack-merge": "^4.1.0",
 // 要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
"extract-text-webpack-plugin": "^3.0.0",
// 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
"file-loader": "^1.1.4",
// 文档加载器
"url-loader": "^0.5.8",
// webpack错误信息提示插
"friendly-errors-webpack-plugin": "^1.6.1",
// 简化了HTML文件的创建，生成一个HTML5文件,以便为您的 webpack bundle 提供服务
"html-webpack-plugin": "^2.30.1",
// 压缩你的JavaScript代码
"uglifyjs-webpack-plugin": "^1.1.1",
```
### 单元测试与功能测试
```
"jest": "^21.2.0",
"jest-serializer-vue": "^0.3.0",
// 功能测试 自动测试框架
"nightwatch": "^0.9.12",
// 用于测试*.vue 文件 jest 
"vue-jest": "^1.0.2",
```
### npm 工具包
```
// 命令行彩色输出
"chalk": "^2.0.1",
// 发送桌面消息,包括应用状态改变以及错误信息.
"node-notifier": "^5.1.2",
// 跨平台解决js调用 npm 命令
"cross-spawn": "^5.0.1",
// 以包的形式包装rm-rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除
"rimraf": "^2.6.0",
// 该软件包会导出一个包含selenium服务器二进制/可执行文件路径的路径字符串。
"selenium-server": "^3.0.1",
// 语义化版本号 控制
"semver": "^5.3.0",
// 可以在shell 命令行下执行js脚本的命令
"shelljs": "^0.7.6",
// 主要用来实现node.js命令行环境的loading效果，和显示各种状态的图标等
"ora": "^1.2.0",
 // 一个自动检索端口的包
"portfinder": "^1.0.13",
```
### 语法解析ES6、JSX、VUE

```
// 某些代码需要调用Babel的API进行转码
"babel-core": "^6.22.1",
// 静态检查代码的语法和风格
"babel-eslint": "^7.1.1",
//  vue  jsx 语法编译
"babel-helper-vue-jsx-merge-props": "^2.0.3",
// 用jest 测试vue组件
"babel-jest": "^21.0.2",
// ES6  代码转换器， webpack 插件
"babel-loader": "^7.1.1",
// 过Babel使用import
"babel-plugin-dynamic-import-node": "^1.2.0",
//  vue  jsx 语法编译
"babel-plugin-syntax-jsx": "^6.18.0",
// 将 ES2015 模块转换成 CommonJS 格式的，然后再统一处理
"babel-plugin-transform-es2015-modules-commonjs": "^6.26.0",
// 所有的助手都会引用该模块babel-runtime以避免在编译后的输出中出现重复。运行时将被编译到您的版本中
"babel-plugin-transform-runtime": "^6.22.0",
//   vue  jsx 语法编译
"babel-plugin-transform-vue-jsx": "^3.5.0",
// 通过自动根据您的目标浏览器或运行时环境确定所需的Babel插件和填充，从而将ES2015 +编译为ES5的Babel预设
"babel-preset-env": "^1.3.2",
// ES6  ES7 要使用的语法阶段
"babel-preset-stage-2": "^6.22.0",
// 模块改写require命令，为它加上一个钩子。使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码
"babel-register": "^6.22.0",
// 将.vue格式组件文件转化为Javascript
"vue-loader": "^13.3.0",
// 许使用其它 webpack loader 处理 Vue 组件的某一部分。它会根据 lang 属性自动推断出要使用的 loader
"vue-style-loader": "^3.0.1",
// 模板编译装载机
"vue-template-compiler": "^2.5.2",
```
### 代码格式化

```
"eslint": "^3.19.0",
"eslint-config-standard": "^10.2.1",
"eslint-friendly-formatter": "^3.0.0",
"eslint-loader": "^1.7.1",
"eslint-plugin-html": "^3.0.0",
"eslint-plugin-import": "^2.7.0",
"eslint-plugin-node": "^5.2.0",
"eslint-plugin-promise": "^3.4.0",
"eslint-plugin-standard": "^3.0.1",
```
### css与postcss

```
// 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题
"optimize-css-assets-webpack-plugin": "^3.2.0",
// 用于在js中加载css
"css-loader": "^0.28.0",
// 自动补全css 兼容性样式
"autoprefixer": "^7.1.2",
// 遵循@import规则，将引入的样式合并到主样式
"postcss-import": "^11.0.0",
// 定制化css，增强css功能
"postcss-loader": "^2.0.8",
// 替换资源文件路径
"postcss-url": "^7.2.1",

```
# config文件夹下文件解析

## dev.env.js - 设置开发环境变量
```
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})

```
## prod.env.js - 设置生产环境变
```
'use strict'
module.exports = {
  NODE_ENV: '"production"'
}

```
## test.env.js - 设置测试环境变量
```
'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
```

## index.js
```
'use strict'
// Template version: 1.2.8
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // 编译输出的二级目录
    assetsSubDirectory: 'static',
    // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',
    // 需要 proxyTable 代理的接口（可跨域）
    proxyTable: {},

    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, 
    // 自动打开浏览器
    autoOpenBrowser: false,
    // 浏览器错误提示 devServer.overlay
    errorOverlay: true,
    // 配合 friendly-errors-webpack-plugin
    notifyOnErrors: true,
    // 使用文件系统(file system)获取文件改动的通知devServer.watchOptions
    poll: false,
    //使用Eslint加载器？
    //如果为true，你的代码将在绑定和绑定期间被删除
    // linting错误和警告将显示在控制台中。
    useEslint: true,
    //如果为true，Eslint错误和警告也会显示在错误覆盖中
    //在浏览器中。
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true,
  },

  build: {
    // index模板文件
    index: path.resolve(__dirname, '../dist/index.html'),

    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
    *源地图
    */
    productionSourceMap: true,
    
    devtool: '#source-map',
    //默认Gzip为许多流行的静态主机，如
    // Surge或Netlify已经为您提供所有静态资产的gzip。
    //在设置为“true”之前，请确保：
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    //用一个额外的参数运行build命令
    //构建完成后查看包分析器报告：
    //`npm run build --report`
    //设置为“true”或“false”以始终打开或关闭它
    bundleAnalyzerReport: process.env.npm_config_report
  }
}


```
## 归纳index.js
- dev

在dev中配置了静态路径、本地服务器配置项、Eslint、Source Maps等参数。如果我们需要在开发中，改动静态资源文件、服务器端口等设置，可以在这个文件中进行修改

- build

模版文件的修改，打包完目录之后的一些路径设置，gzip压缩等。


# build文件夹文件解析
## build.js

```
'use strict'
// 执行检查版本号
require('./check-versions')()
// 定义环境变量为 生产环境
process.env.NODE_ENV = 'production'

// 主要用来实现node.js命令行环境的loading效果，和显示各种状态的图标等
const ora = require('ora')
// 以包的形式包装rm-rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除
const rm = require('rimraf')
const path = require('path')
// 命令行彩色输出
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

// 在node命令环境写出开始构建提示文字
const spinner = ora('building for production...')

spinner.start()
// 删除config.build.assetsRoot 与 config.build.assetsSubDirectory 目录下的文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 删除成功回调执行构建 webpack.prod 配置文件
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    // 指向标准输出样式
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      // 退出当前线程
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})



```
**执行检查版本号->>删除config.build.assetsRoot 与 config.build.assetsSubDirectory 目录下的文件
->>按照webpack.prod.conf配置文件构建**

## check-versions.js

```
'use strict'
const chalk = require('chalk')
// 语义化版本号 控制
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')

function exec (cmd) {
    // 创建同步进程并且执行cmd命令 运行“npm --version”返回版本号
  return require('child_process').execSync(cmd).toString().trim()
}
// 版本要求
const versionRequirements = [
  {
    name: 'node',
    // 现在版本
    currentVersion: semver.clean(process.version),
    // node 配置版本
    versionRequirement: packageConfig.engines.node
  }
]
// 用shell在环境变量$PATH设置的目录里查找符合条件的文件是否存在npm
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    // 判断版本是否满足范围
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}

```
**根据npm与node版本号，通过semver.satisfies，判断npm与node版本号是否在正确版本范围内**

## utils.js
```
'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
// 返回assetsPath 路径
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }
 // 生成cssloaders
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    // 是否需要单独提取css文件
    if (options.extract) {
      return ExtractTextPlugin.extract({
        // 需要什么样的loader去编译源文件
        use: loaders,
        // 编译后用什么来提取文件
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
```
**生成cssLoad与styleLoad规则**

## vue-loader.conf.js
```
'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}

```
**配置vue-loaderCssLoad规则**

## webpack.base.conf.js
```
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// 返回指定文件夹路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 配置模块如何解析
  resolve: {
   // 自动解析确定的扩展
    extensions: ['.js', '.vue', '.json'],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}


```

**配置打包文件入口、文件输出、.vue、.js、静态资源的配置项**

## webpack.dev.conf.js
```
'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // 在开发工具的控制台显示log
    clientLogLevel: 'warning',
    // 使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    // 启用 webpack 的模块热替换特性
    hot: true,
    // 告诉服务器从哪里提供内容
    contentBase: false,
    // 一切服务都启用gzip 压缩
    compress: true,
    // 指定使用一个 host
    host: HOST || config.dev.host,
    // 指定端口
    port: PORT || config.dev.port,
    // 启动服务器自动打开浏览器
    open: config.dev.autoOpenBrowser,
    // 当存在编译器错误或警告时，在浏览器中显示全屏叠加
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    // 此路径下的打包文件可在浏览器中访问  
    publicPath: config.dev.assetsPublicPath,
    // 代理调试后台api
    proxy: config.dev.proxyTable,
    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
    quiet: true,
    // 使用文件系统(file system)获取文件改动的通知
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
    new webpack.NamedModulesPlugin(),
    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // webpack错误信息提示插
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

```
## webpack.prod.conf.js
```
'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // 作用域提升 scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig

```
















