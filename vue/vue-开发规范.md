## 文件名称与文件夹
1. 名词开头
2. 驼峰命名 

## 静态文件(.js/.png/.svg)

文件名必须全部小写，可以包含下划线（_），但不得包含其他标点符号。遵循你的项目使用的约定

## Vue属性书写顺序
```
export default {
  mixins,
  data,
  props,
  store，
  computed，
  route,
  created，
  ready，
  event,
  watch,
  components,
  methods
}
```
## 组件
组件以驼峰命名 
```
<template>
  <my-components></my-components>
</template>
<script>
  import myComponents from './myComponents.vue'

  export default {
  components: {
  	  myComponents
    }
  }
</script>
```
Vue组件的书写顺序 
```
<template></template>
<script></script>
<style></style>
```
