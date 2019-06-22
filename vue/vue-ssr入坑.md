# 前端请求接口地址，与node请求地址不一致

> 不需要手动设置api 链接

## 设置成全局变量
> 但是有环境区分，node与browser 区分

## 使用 vuex 实现 

> 通过 express 获取host、protocol

> domain 通过renderToStream 传入上下文

```
function requesttDomain(req) {
    const protocol = req.protocol;
    const host = req.headers.host;
    const proxyApi = isProd ? '/' : '/api/';
    return protocol + '://' + host + proxyApi;
}

express.get('*',(req, res) => {
    renderer.renderToStream({title, url: req.url, domain: requesttDomain(req)})
});

```

> entry-server文件中 设置 store 

```
import apiUrl from './server/apiUrl';
 // 设置api请求链接地址
Object.keys(apiUrl).forEach((key) => {
    store.state[key] = context.domain + apiUrl[key]
});

```
# 无法异步加载组件
```
const product = () => import("../page/product.vue");

```
> 报错 unexpected token 'import'

## 源代码
```
{
    test: /\.js$/,
    loader: 'buble-loader',
    exclude: /node_modules/,
    options: {
      objectAssign: 'Object.assign'
    }
},
```
## 修改
> webpack.base.config文件

```

{
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
}
```
> 添加 .babelrc

```
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": [],
  "env": {
    "test": {
      "presets": ["env", "stage-2"]
    }
  }
}

```
# css样式提取文件

> 需要在配置文件 webpack.client.config, webpack.server.config;添加

```
plugins: [
    new ExtractTextPlugin({
        filename: "css/[name].[contenthash].css",
        allChunks: true,
    }),
]
```
> utils文件添加

```
if (extract) {
    return ExtractTextPlugin.extract({
        use: loaders,
        // 编译后用什么来提取文件
        fallback: "vue-style-loader",
    });
} else {
    return ["vue-style-loader"].concat(loaders);
}

```

# 页面加载数据过渡动画
> 方案一： 使用骨架屏

> 方案二： 页面动画加载