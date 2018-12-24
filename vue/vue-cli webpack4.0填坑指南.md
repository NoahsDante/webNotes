## webpack4.0
### 需要安装 webpack-cli

## extract-text-webpack-plugin
**由于webpack4以后对css模块支持的逐步完善和commonchunk插件的移除，在处理css文件提取的计算方式上也做了些调整，之前我们首选使用的extract-text-webpack-plugin也完成了其历史使命，将让位于[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)**

**或者是 extract-text-webpack-plugin升到4.0.0-beta.0版本**


## optimization 移除CommonsChunkPlugin
**Webpack 4 删除了 CommonsChunkPlugin，并默认启用了它的许多功能。因此webpack4可以实现很好的默认优化。但是，对于那些需要自定义的缓存策略，增加了 optimization.splitChunks 和 optimization.runtimeChunk。**
。
## 修改开发环境
build/webpack.dev.conf.js 中添加 mode 配置

**注释掉 webpack.NamedModulesPlugin 及 webpack.NoEmitOnErrorsPlugin 插件，因为 webpack4 开发模式已经内置**
```
module.exports = {
    // ...
    mode: 'development',
    // ...
    plugins: {
        // new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        // new webpack.NoEmitOnErrorsPlugin(),
    }
}
```

## 问题查找
- 代码
- 版本
- 是否安装




## 参考

[vue cli 平稳升级webapck4](https://juejin.im/post/5ac3854af265da237d033606?utm_source=gold_browser_extension#heading-5);