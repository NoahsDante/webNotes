# 模版语法

## 插值
### 文本

使用“Mustache”语法 (双大括号) 的文本插值

```html
<span>Message: {{ msg }}</span>
```
通过使用 [v-once 指令](https://cn.vuejs.org/v2/api/#v-once)，你也能执行一次性地插值，**当数据改变时，插值处的内容不会更新**
### 原始html

双大括号会将数据解释为**普通文本**，而非 HTML 代码。为了输出真正的 HTML，你需要使用**v-html 指令**。

但是直接作为 HTML——会**忽略解析属性值中的数据绑定**。

### 特性

“Mustache”语法**不能用于HTML属性上**，使用**v-bind指令**

在布尔特性的情况下，它们的存在即暗示为 `true`，`v-bind` 工作起来略有不同，在这个例子中：

```html
<button v-bind:disabled="isButtonDisabled">Button</button>
```

如果 `isButtonDisabled` 的值是 `null`、`undefined` 或 `false`，则 **`disabled` 特性甚至不会被包含在渲染出来的 `<button>` 元素中**

### 使用javascript表达式

对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。
表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。
有个限制就是，每个绑定都只能包含**单个表达式**

## 指令

 

带有-v前缀的，值预期是**单个JavaScript表达式**（v-for是例外情况）。
指令的指责是，当表达式的值改变时，**将影响作用于DOM**。

### 参数

一些指令能够接受“参数”，在指令名称之后添加冒号

```html
<a v-bind:href="url">...</a>
<a v-on:click="doSomething">...</a>
```

### 修饰符

以半圆角句号.指明特色后缀

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

.prevent` 修饰符告诉 `v-on` 指令对于触发的事件调用 `event.preventDefault()

## 缩写

 

`v-` 前缀作为一种视觉提示，用来识别模板中 Vue 特定的特性。然而，对于一些频繁用到的指令来说，就会感到使用繁琐

### v-bind缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
```

### v-on缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
```

# 计算属性和侦听器

## 计算属性

 

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```javascript
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

### 计算属性缓存vs方法

通过在表达式中调用方法达到同样的效果

```javascript
// 在组件中
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

不同的是计算属性是基于它们的**依赖进行缓存**的。只在**相关依赖发生改变时**它们才会重新求值；就不会再次执行函数。

但通过方法调用时，**每当触发重新渲染时，调用方法总会再次执行函数**。

### 计算属性vs侦听属性

更通用的方法来观察和响应实例数据变动：当**有一些数据需要随着其他数据变动而变动时**，但很容易滥用watch；建议使用**computed**

### 计算属性的setter

计算属性时有**getter、setter**

```
computed:{
    fullName:{
        get:function () {
            return this.firstName + '' + this.lastName;
        },
        set:function (newValue) {
            console.log(newValue);
        }
    }
}
```

## 侦听器

当需要自定义侦听器，**当需要数据变化时执行异步或开销比较大的操作时**

## computed vs watch

1. 从属性名上，`computed`是**计算属性，也就是依赖其它的属性计算所得出最后的值**。`watch`是去**监听一个值的变化，然后执行相对应的函数**。
2. 从返回值
   1. computed **必有返回值 return**
   2. Watch 不一定
3. 从实现上，
   1. `computed`的值在`getter`执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取`computed`的值时才会重新调用对应的`getter`来计算。如果一个值依赖**多个属性（多对一），用`computed`肯定是更加方便的**
   2. `watch`在每次监听的值变化时，都会执行回调。其实从这一点来看，都是在依赖的值变化之后，去执行回调。很多功能本来就很多属性都可以用，只不过有更适合的。如果一个值变化后会引起一系列操作，或者**一个值变化会引起一系列值的变化（一对多），用`watch`更加方便一些。**
4. watch的回调里面会传入监听属性的新旧值，通过这两个值可以做一些特定的操作。computed`通常就是**简单的计算。**

# Class与Style绑定

操作元素的class进行数据绑定，它们都是属性，可以用**v-bind**来处理：通过表达式计算出字符串结果；并且专门增强了，除**字符串之外，还可以是对象或数组**。

## 绑定HTMLClass

 

### 对象语法

```javascript
<div v-bind:class="{active: isActive, 'text-danger': hasError}">
<div v-bind:class="classObject">
    data: {
        classObject: {
            active:true,
            'text-danger':false
        }
    }
computed: {
    classObject:function () {
        return {
              active: this.isActive && !this.error,
              'text-danger': this.error && this.error.type === 'fatal'
        }
    }
}
```

### 数组语法

```javascript
<div v-bind:class="[activeClass,errorClass]">
data:{
  activeClass: 'active',
  errorClass: 'text-danger'
}
<div v-bind:class="[isActive ? activeClass : '', errorClass]">
<div v-bind:class="[{ active: isActive }, errorClass]">

```

### 用在组件上

```javascript
Vue.component('my-component',{
    template:'<p class="foo bar">Hi</p>'
})
<my-component class="baz boo"></my-component>
// output
<p class="foo bar baz boo"></p>
```

## 绑定内联样式

 

### 对象语发

```javascript
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">
data:{
  activeColor: 'red',
  fontSize: 30
}
<div v-bind:style="styleObject">
data:{
    styleObject:{
        color:'red',
        fontSize:'13px'
    }
}
<div v-bind:style="[baseStyles, overridingStyles]"></div>

```

# 条件渲染

## v-if

 

```
<h1 v-if="ok"></h1>
```

### 在<template>元素上使用v-if条件渲染分组

```javascript
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### v-else

```javascript
<div v-if="Math.randow() > 0.5">
 Now you see me
</div>
<div v-else>
  Now you don't'
</div>
```

V-else 元素必须紧跟在带v-if或者v-else-if的元素的后面，否则它将不会识别。

### v-else-if

```javascript
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```

类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

### 用key管理可复用的元素

vue会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。

想要达到“元素完全独立的，不要复用它们”，添加一个具有唯一值的**key**属性

```javascript
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

## v-show

 

带有v-show的元素始终会被渲染并保留在DOM中。**v-show只是简地切换元素的css属性display**

**注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`。**

## v-if vs v-show

 

V-if是**真正的条件渲染，**他会确保在切换过程中**条件块内的事件监听器和子组件适当地被销毁和重建**

v-if是惰性的：如果在**初始渲染条件为假，则是什么也不做一直到条件变为真时，才开始渲染条件块**。

v-show 不管初始条件时什么，**元素总是被渲染，并且只是简单地进行css切换。**

一般来说，**v-if有更高的切换开销，**v-show有更高的初始渲染开销。因此，**如果需要非常频繁地切换，则使用v-show**；**如果时运行时条件很少改变，则使用v-if**

# 列表渲染

## 用v-for把数组对应为一组元素

 

v-for指令需要使用**item in items**形式的特殊语法，**items是源数据数组并且item是数组元素迭代的别名。**

```javascript
<ul id="example-1">
	<li v-for="item in items"></li>
</ul>
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

## 一个对象的v-for

 

```javascript
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
<div v-for="(valu,key) in object">
	{{key}}:{{value}}    
</div>
<div v-for="(value,key,index) in object">
	{{index}}.{{key}}:{{value}}    
</div>
```

在遍历对象是时，是按object.keys()的结果遍历，但是不能保证它的结果不同的javascript 引擎是一致的。

## key

 

用v-for更新已渲染过的元素列表时，它时默认“就地复用的”，为了已便跟踪每个节点的身份，从而重用和重新排序现有元素，需要为每项提供唯一的key属性

```javascript
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

## 数组更新检测

 

### 替换数组

变异方法 (mutation method)，顾名思义，会改变被这些方法调用的原始数组。相比之下，也有非变异 (non-mutating method) 方法，例如：`filter()`, `concat()` 和 `slice()` 。这些不会改变原始数组，但**总是返回一个新数组**。当使用非变异方法时，可以用新数组替换旧数组

### 注意事项

vue不能检测一下变动的数组

1. 利用索引直接设置一个项：vm.items[indexOfItem] = newValue
2. 修改数组的长度：vm.items.length = newLength;

#### 解决

```javascript
// Vue.set
Vue.set(vm.items, indexOfItem, newValue);
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
vm.items.splice(newLength)
```

## 对象更改检测注意事项

 

**不能检测对象属性的添加或删除**

```javascript
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

#### 解决

```javascript
Vue.set(vm.userProfile, 'age', 27)
vm.$set(vm.userProfile, 'age', 27)
vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

## 显示过滤/排序结果

 

有时想要显示一个数组的过滤或者排序副本，而不实际改变或重置原始数据

```javascript
<li v-for="n in evenNumbers">{{ n }}</li>
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
// 在计算属性不适用的情况下 (例如，在嵌套 v-for 循环中) 你可以使用一个 method 方法
<li v-for="n in even(numbers)">{{ n }}</li>
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

## 一段取值范围的v-for

 

v-for取整数。

```javascript
<div>
	<span v-for="n in 10"></span>
</div>
```

## V-for on a <tenplate>

 

`v-if`，你也可以利用带有 `v-for` 的 `<template>` 渲染多个元素

```javascript
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## V-for with v-if

 

当它们处于同一节点。v-for的优先级比v-if更高，这意味着v-if将分别重复运行每个v-for循环中。

```javascript
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

## 一个组件的v-for

 

**任何数据都不会被自动传递到组件里，因为组件有自己独立的作用域。**未来吧迭代数据传递到组件里，我们要用props

```javascript
<my-component
  v-for="(item, index) in items"
  v-bind:item="item"
  v-bind:index="index"
  v-bind:key="item.id"
></my-component>
```

# 事件处理

## 监听事件

 

用**v-on指令监听DOM事件**，并触发时运行一些JavaScript代码。代码写在指令中。

## 事件处理方法

 

还可以接受**调用的方法名称**

## 内联处理器中的方法

 

在内联JavaScript语句中调用方法；还可以处理访问DOM事件，用特殊变量$event把它传入方法：

```javascript
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```

## 事件修饰符

 

```javascript
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>

```

## 按键修饰符

 

```javascript
<!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
<input v-on:keyup.13="submit">
 <!-- 同上 -->
<input v-on:keyup.enter="submit">

<!-- 缩写语法 -->
<input @keyup.enter="submit">
```

# 表单输入绑定

## 基础用法

用v-model指令在表单输入绑定`<input>、<textarea>及<select>`元素上创建双向绑定数据。它会根据控件类型自动选取正确的方法来更新元素。
### 注意

v-model会**忽略所有表单元素的value、checked、selected特性的初始值**而总是**将Vue实例的数据作为数据来源。应该通过javascript在组件的data选项中声明初始值**。

对于需要输入法的语言，需要在**组合文字过程中得到更新。请使用input**

### 文本

```javascript
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

### 多行文本

```javascript
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

**在文本区域插值并不会生效，因用v-model来代替。**

### 复选框

```javascript
// 单个复选框
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checked">{{checked}}</label>
// 多个复选框内
<div id='example-3'>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>
new Vue({
  el: '#example-3',
  data: {
    checkedNames: []
  }
})

```

### 单选按钮

```javascript
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>
new Vue({
  el: '#example-4',
  data: {
    picked: ''
  }
})
```

### 选择框

```javascript
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
new Vue({
  el: '...',
  data: {
    selected: ''
  }
})
```

## 值绑定

 

```javascript
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

对于单选按钮，复选框及选择框的选项，v-model绑定的值通常是静态字符串。

有时想把值绑定到Vue实例的一个动态属性上，用v-bind来实现，并且这个属性的值可以不是字符串。

```javascript
<input type="radio" v-model="pick" v-bind:value="a">
vm.pick === vm.a
```

## 修饰符

 

### .lazy

v-model在每次input事件触发后将输入框的值与数据同步，可以添加lazy修饰符，从而转变为使用change事件进行同步

```javascript
<input v-model.lazy="msg">
```

### .number

自动将用户的输入值转为数值类型

```javascript
<input v-model.number="age" type="number">
```

如果这个值无法被parseFloat()解析，则会返回原始值。

### .trim

自动过滤用户输入的收尾空白字符

```javascript
<input v-model.trim="msg">
```

# 组件基础

## 基本示例

 

组件是可复用的Vue实例，所以它与new Vue接受相同的选项，`data`、`computed`、`watch`、`methods` 以及生命周期钩子等。

## 组件的复用

 

可以将组件复用任意数次，每个组件都会各自独立维护它的数据。

### data必须是一个函数

一个组件必的data必须是一个函数，每个实例可以维护一份被返回对象的独立的拷贝：

```javascript
data:function () {
    return {}
}
```

**如果没有使用，多个相同的组件实例会共享同一份数据。**

## 通过prop向子组件传递数据

 

Prop可以在组件上注册的一些自定义特性。**当一个值传递给一个prop特性的时候，**它就变成那个组件实例的一个属性。

一个组件默认是可以**拥有任意数量的prop，**任何值都可以传递给任何prop，**能够在组件实例中访问这个值，就像访问data中的值一样。**

```javascript
Vue.component('blog-post',{
  props:['title'],
    template:'<h3>{{title}}</h3>'
})
```

## 单个根元素

 

**每个组件必须只有一个根元素。**

## 通过事件向父级组件发送消息

 

```javascript
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [/* ... */],
    postFontSize: 1
  }
})
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
      v-on:enlarge-text="postFontSize += 0.1"
    ></blog-post>
  </div>
</div>
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button v-on:click="$emit('enlarge-text')">
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})
```

可以调用内建的 [**$emit** 方法](https://cn.vuejs.org/v2/api/#vm-emit)并传入事件的名字，来向父级组件触发一个事件

### 使用事件抛出一个值

用一个事件来抛出一个特定的值，可以使用$emit的第二参数来提供

```javascript
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
// 可以通过 $event 访问到被抛出的这个值
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
// 这个事件处理函数是一个方法
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### 在组件上使用v-model

自定义事件可以用于创建支持**v-model的自定义输入组件**

```javascript
<input v-model="searchText">
// 等价于
<input v-bind:value="searchText" v-on:input="searchText = $event.target.value">
//等价于  在组件上
 <custom-input v-bind:value="searchText" v-on:input="searchText=$event">
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
// 最后
<custom-input v-model="searchText"></custom-input>
```

# 组件注册

## 组件名

 

推荐遵循w3c规范中的自定义组件名（字母小写并且必须包含一个连字符）

### 组件名大小写

#### 使用kebab-case

```javascript
Vue.component('my-component-name',{});
```

#### 使用PascalCase

```javascript
Vue.component('MyComponentName',{});
```

## 全局注册

 

**Vue.component**

## 局部注册

 

使用 Babel 和 webpack 使用 ES2015 模块

```javascript
import ComponentA from './ComponentA.vue'
export default {
    components:{
        ComponentA
    }
}
```

# Prop

## Prop的大小写

 

HTML中的特性名大小写不敏感，浏览器会把所有大写解释为小写字符。这意味着当你使用DOM中的模版时，camelCase(驼峰命名法)的prop名需要使其等价的kebab-case(短横线分隔命名)：

```javascript
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```

## Prop类型

 

数组

```javascript
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

希望每个prop都有指定的值类型，可以对象形式列出prop

```javascript
props:{
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object
}
```

## 传递静态或动态Prop

 

静态

```javascript
<blog-post title="My journey with Vue"></blog-post>
```

动态赋值

```javascript
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post v-bind:title="post.title + ' by ' + post.author.name"></blog-post>
```

### 传入一个数字

```javascript
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:likes="post.likes"></blog-post>
```

### 传入一个布尔

```javascript
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>\
```

### 传入一个数组

```javascript
<!-- 即便数组是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:comment-ids="post.commentIds"></blog-post>
```

### 传入一个对象

```javascript
<!-- 即便对象是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:author="{ name: 'Veronica', company: 'Veridian Dynamics' }"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:author="post.author"></blog-post>
```

### 传入一个对象所有属性

```javascript
post: {
  id: 1,
  title: 'My Journey with Vue'
}
<blog-post v-bind="post"></blog-post>
// 等价于
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

## 单向数据流

 

所有的prop都使得其父子之间形成一个**单向下行绑定**：**父级prop的更新会向下流动到组件中**，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致应用的数据流向难以理解。

**每次父级组件发生更新时，子组件中所有的prop都将刷新最新的值**。这意味着你不应该在一个子组件内部改变prop。

### 试图改变一个prop的情形

1. **prop用来传递一个初始值；这个子组件希望将其作为一个本地的prop数据来使用**。在这种情况下，最好**定义一个本地的data属性并将这个prop用作其初始值：**

```javascript
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

2. **prop以一种原始的值传入并且需要进行转换。**在这种情况下，最好定义一个计算属性

```javascript
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变这个对象或数组本身**将会**影响到父组件的状态。

## Prop验证

 -

```javascript
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 匹配任何类型)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

类型检测还可以是一个自定义构造函数

```javascript
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
Vue.component('blog-post', {
  props: {
    author: Person
  }
})
```

## 非Prop特性

 

一个**非prop特性是指向一个组件**，但是该组件并没有相应prop定义的特性。

组件可以接受任意的特性，而这些**特性会被添加到这个组件的根元素上***。

### 替换/合并已有的特性

**class于style特性会将两边的值合并起来，从而得到最终的值。**

### 禁止特性继承

**不希望组件的根元素继承特性，可以在组件的选项中设置inheritAttrs:false。**

可以结合实例$sttrs属性使用,该属性包含传递给一个组件的特性名和特性值

```javascript
{
  class: 'username-input',
  placeholder: 'Enter your username'
}
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})
<base-input
  v-model="username"
  class="username-input"
  placeholder="Enter your username"
></base-input>
```

# 自定义事件

## 事件名

 

事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称。

## 自定义组件的v-model

 

一个组件上的v-model默认会利用名为value的prop和名为input事件，但是像单选框、复选框等类型的输入控件可能会将value用于不同目的。

```javascript
Vue.component('base-checkbox',{
    model:{
        prop:'checked',
        event:'change'
    },
    props:{
        checked:Boolean,
    },
    template:`
    	<input 
    		type='checked'
    		v-bind:checked='checked'
    		v-on:change='$emit("change",$event.target.checked)
    	>
    `
});
<base-checkbox v-model="lovingVue"></base-checkbox>
```

这里的lovingVue的值将会传入这个名为checked的prop。同时当<base-checkbox>触发一个change事件并附带一个新的值的时候，这个lovingVue的属性将会被更新。

## 将原生事件绑定到组件

 

想要在一个组件的**根元素上直接监听一个原生事件**,可以使用**v-on的.native修饰符**:

```JavaScript
<base-input v-on:focus.native="onFocus"></base-input>
```

但是有时的根元素并不是input元素，而是<label>元素。这时，父级的.native监听器将时默认失败。事件处理函数不会预期调用。

为了解决这个问题，Vue提供了一个$listeners属性，它是一个对象，里面包含了作用这个组件上的所有监听器。

```javascript
{
    focus:function(event) {}
    input:function(event) {}
}
```

```javascript
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

## .sync修饰符

 

有些情况下，真正的双向绑定会带来维护上的问题，**子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源。**

推荐update:myPropName的模式触发事件:

```javascript
this.$emit('update:title',newTitle);
<text-document 
v-bind:title="doc.title"
v-on:update:title="doc.title=$event"
></text-document>
// 简写成
<text-document v-bind:title.sync="doc.title"></text-document>
// 当我们用一个对象同时设置多个prop的时候，也可以将这个.sync修饰符和v-bind配合使用：
<text-document v-bind.sync="doc"></text-document>
```

.sync修饰符的v-bind**不能和表示式使用（v-bind:title.sync="doc.title+'!'"）**;类似**v-model**

# 插槽

## 插槽内容

 

内容分发，将<slot>元素作为承载分发内容的出口。

```javascript
<navigation-link url="/profile">
哈哈
</navigation-link>
// 模版
<a 
v-bind:href="url"
class="nav-link"
>
    <slot></slot>
</a>
```

插槽内容可以包含**任何模版代码，包括HTML。**

## 具名插槽

 

对于这样的情况，<slot>元素有一个特性：name，这个特性可以用来定义额外的插槽:

```javascript
// 模版
<div class="contaniner">
	<header>
	<slot name="header"></slot>	
	</header>
	<main>
	<slot></slot>
	</main>
	<footer>
		<slot name="footer"></slot>
	</footer>
</div>
// 
<base-layout>
	<h1 slot="header"></h1>
	<p>A paragraph for the main content.</p>
	<p>And another one.</p>
 	<p slot="footer">Here</p>
</base-layout>
```

## 插槽的默认内容

 

希望**有默认内容，同时允许用户覆盖内容。**

```javascript
<button>
	<slot>哈哈</slot>
</button>
```

## 编译作用域

 

当想在插槽内使用数据是，插槽可以访问这个模版的其他地方相同的实例属性，但是插槽不能访问组件里的作用域，

父级模版的**所有东西都会在父级作用域内编译；** 子组件模版的所有东西都会在**子级作用域内编译。**

## 作用域插槽

 

有时候希望在组件带有一个子组件获取数据可复用的插槽。

需要将待办内容包裹一个<slot>元素上，然后将所有和其上下文相关的数据传递给这个插槽：

```javascript
<ul>
  <li
    v-for="todo in todos"
    v-bind:key="todo.id"
  >
    <!-- 我们为每个 todo 准备了一个插槽，-->
    <!-- 将 `todo` 对象作为一个插槽的 prop 传入。-->
    <slot v-bind:todo="todo">
      <!-- 回退的内容 -->
      {{ todo.text }}
    </slot>
  </li>
</ul>
```

当我们使用<todo-list>组件的时候，在任何元素上，并且通过slot-scope特性从子组件获取数据:

```javascript
<todo-list v-bind:todos="todos">
  <!-- 将 `slotProps` 定义为插槽作用域的名字 -->
  <template slot-scope="slotProps">
    <!-- 为待办项自定义一个模板，-->
    <!-- 通过 `slotProps` 定制每个待办项。-->
    <span v-if="slotProps.todo.isComplete">✓</span>
    {{ slotProps.todo.text }}
  </template>
</todo-list>
```

# 动态组件&异步组件

## 在动态组件上使用keep-alive

 

在一个多个标签中使用is特性来切换不同的组件；当这些组件之间切换的时候，有时会想保持这些组件的状态，以避免反复重复渲染导致的性能问题。

希望那些**标签的组件实例能够被在它们第一次被创建的时候缓存下来**。可以使用**<keep-alive>元素将其动态组件包裹起来。**

## 异步组件

 

```javascript
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

# 处理边界情况

## 访问元素&组件

 

### 访问根实例

在每个new Vue实例的子组件中，其根实例可以通过$root属性进行访问。

```javascript
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar: function () { /* ... */ }
  },
  methods: {
    baz: function () { /* ... */ }
  }
})
// 所有子组件都可以将这个实例作为一个全局store来访问与使用
// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()
```

### 访问父级组件实例

**$parent可以用来从一个子组件访问父组件的实例**。它提供了一种机会，可以后期随时触达父级组件，以代替将数据以prop方式传入子组件的方式。

但是触达父级组件会使得你的应用更**难调试和理解，**尤其是当你变更父级组件数据的时候。从而很难找到出从哪里变更发起的。

并且当**父级组件嵌套多个时，会形成this.$parent.$parent.XXX等这样容易失控。**

### 访问子组件实例或元素

可以通过ref特性为这个子组件赋予一个ID引用。

```javascript
<base-input ref="usernameInput"></base-input>
// 在父级组件内使用
this.$refs.usernameInput;
```

### 依赖注入

**跨多层父级组件，从子组件里调用父级组件方法**；用到两个实例选项：provide和inject;

**provide 选项允许我们想要提供给后代组件的数据和方法**。

```javascripts
provide:function() {
    return {
        getMap:this.getMap
    }
}
```

在任何后代组件里，可以使用**inject选项来接收指定我们想要添加在这个实例上的属性**：

```javascript
inject:['getMap']
```

这些组件之间的接口时始终确定的，就和prop一样。

实际上，可以把**依赖注入**看作一部分**“大范围有效的prop”**

- 祖先组件**不需要知道哪些后代组件使用它提供的属性**
- 后代组件**不需要知道被注入的属性来自哪里***

## 程序化的事件侦听器

 

当你需要在一个组件实例上手动侦听事件时，就会用到

```javascript
通过 $on(eventName, eventHandler) 侦听一个事件
通过 $once(eventName, eventHandler) 一次性侦听一个事件
通过 $off(eventName, eventHandler) 停止侦听一个事件
```

## 控制更新

 

[`$forceUpdate`](https://cn.vuejs.org/v2/api/#vm-forceUpdate)

# 混入

## 基础

 

混入是一种分法Vue组件中可**复用功能的灵活的方式**。混入对象可以**包含任意组件选项**。当组件使用混入对象时，**所有混入对象的选项将被混入该组件本身的选项。**

```javascript
var myMixin= {
    created:function(){
        this.hello();
    },
    methods:function() {
        hello:funciton() {
            console.log('hello from mixin')
        }
    }
}
var Component = Vue.extend({
    mixins:[myMixin]
})
var component = new Component();
```

## 选项合并

 

当组件和混入对象含有**同名选项时，这些选项将以恰当的方式混合。**

**数据对象**在内部**会进行浅合并（一层属性深度）**，在和组件的**数据发生冲突时以组件数据优先**

**同名钩子函数**将**混合为一个数组**，都将会被调用，混入对象的**钩子函数将在组件自身钩子函数之前调用**。

值为对象的选项，将被**混入为同一个对象**；**两个对象键名冲突时，取组件对象的键值对。**

## 全局混入

 

可以全局注册混入对象。**注意使用，一旦使用全局混入对象，将会影响到所有之后创建的Vue实例。**

```javascript
Vue.mixin({
    created:function() {
        var myOption= this.$options.myOption
        if(myOption) {
            console.log(myOption)
        }
    }
});
new Vue({
    myOption:'hello!'
});
```

谨慎使用全局混入对象，会**影响到每个单独创建的Vue实例。**

## 自定义选项合并策略

 

自定义选项将使用默认策略，即简单地覆盖已有值。如果想让自定义选项以自定义逻辑合并。可使用

Vue.config.optionMergeStrategies.myOption = function (toVal,fromVal) {

return mergedVal

}

# 自定义指令

## 简介

 

注册自定义指令。代码复用和抽象的主要形式时是组件。需要对**普通DOM元素进行底层操作**。

```javascript
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
// 局部注册一个指令
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}

```

## 钩子函数

 

一个指令定义对象可以提供以下钩子函数

- bind：只调用一次，指令第一次绑定到元素时调用。这里可以进行一次性初始化设置。
- inserted：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）
- update：所组件的VNode更新时调用，但是可能发生在其子VNode更新之前。指令的值可能发生改变，也可能没有。但是可以通过比较更新前后的值来忽略不必要的模版更新
- componentUpdated：指令所在组件的VNode及其子VNode全部更新后调用。
- unbind：只调用一次，指令与元素解绑时调用。

## 钩子函数参数

 

指令钩子函数会传入一下参数：

- el：指令所绑定的元素，可以用来直接操作DOM。
- binding：一个对象，包含一下属性：
  - name：指令名，不包括v-前缀
  - value：指令绑定值
  - oldValue：指令绑定的前一个值，仅在update和componentUpdate 钩子中可用。无论值是否改变都可用。
  - expression：字符串形式的指令表达式
  - arg：传给指令的参数
  - modifiers：一个包含修饰符的对象。
- vnode：vue编译生成的虚拟节点
- oldVnode：上一个虚拟节点，仅在update和componentUpdate钩子中可用。

```javascript
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})

new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```

## 函数简写

 

想在bind和update时触发相同行为，而不关心其他的钩子。

```javascript
Vue.directive('color-swatch',function(el,binding) {
    el.style.backgroundColor=binding.value
})
```

## 对象字面量

 

如果需要多个值，可以传入一个javascript对象字面量。指令函数能够接受所有合法的javascript表达式。

```javascript
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```

# 渲染函数&JSX

## 基础

 

需要JavaScript的完全编程的能力，可以用render函数，比template更接近编译器。

## 节点、树以及虚拟DOM

 -

当浏览器读到html代码时，它会建立“DOM节点”树来保持追踪。

每个元素都是一个节点。每个文字是一个节点，注释也是一样。就像家谱树一样，每个节点都可以有孩子节点。

### 虚拟DOM

```javascript
return createElement('h1',this.blogTitle);
```

createElement不是一个实际的DOM元素。它更准确的名字可能时createNodeDescription，它所包含的信息会告诉Vue页面上需要渲染什么样的节点。及其子节点。把这样的节点描述为“虚拟节点”。

## createElement参数

 

```javascript
createElement(
// {String | Object | Function}
// 一个 HTML 标签字符串，组件选项对象，或者
// 解析上述任何一种的一个 async 异步函数。必需参数。
'div',
// {Object}
// 一个包含模板相关属性的数据对象
// 你可以在 template 中使用这些特性。可选参数。
{},
// {String | Array}
// 子虚拟节点 (VNodes)，由 `createElement()` 构建而成，
// 也可以使用字符串来生成“文本虚拟节点”。可选参数。
[
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
]


);
```

### 深入data对象

```javascript
{
  // 和`v-bind:class`一样的 API
  // 接收一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 和`v-bind:style`一样的 API
  // 接收一个字符串、对象或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML 特性
  attrs: {
    id: 'foo'
  },
  // 组件 props
  props: {
    myProp: 'bar'
  },
  // DOM 属性
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器基于 `on`
  // 所以不再支持如 `v-on:keyup.enter` 修饰器
  // 需要手动匹配 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽格式
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其他组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其他特殊顶层属性
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中向多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}

```

### 约束

组件树中的**所有VNode必须是唯一的。**

```javascript
// 无效
render: function (createElement) {
  var myParagraphVNode = createElement('p', 'hi')
  return createElement('div', [
    // 错误-重复的 VNodes
    myParagraphVNode, myParagraphVNode
  ])
}
// 有效
render: function (createElement) {
  return createElement('div',
    Array.apply(null, { length: 20 }).map(function () {
      return createElement('p', 'hi')
    })
  )
}
```

## 使用Javascript代替模版功能

 

### v-if和v-for

这些都会在render函数中被javascript的if/else/map重写。

### v-model

```javascript
props: ['value'],
render: function (createElement) {
  var self = this
  return createElement('input', {
    domProps: {
      value: self.value
    },
    on: {
      input: function (event) {
        self.$emit('input', event.target.value)
      }
    }
  })
}
```

### 事件&按键修饰符

| Modifier(s)                        | Prefix |
|            - |    |
| `.passive`                         | `&`    |
| `.capture`                         | `!`    |
| `.once`                            | `~`    |
| `.capture.once` or `.once.capture` | `~!`   |

```javascript
on: {
  '!click': this.doThisInCapturingMode,
  '~keyup': this.doThisOnce,
  '~!mouseover': this.doThisOnceInCapturingMode
}
```

| Modifier(s)                                        | Equivalent in Handler                                        |
|                 -- |                      |
| `.stop`                                            | `event.stopPropagation()`                                    |
| `.prevent`                                         | `event.preventDefault()`                                     |
| `.self`                                            | `if (event.target !== event.currentTarget) return`           |
| Keys: `.enter`, `.13`                              | `if (event.keyCode !== 13) return` (change `13` to [another key code](http://keycode.info/) for other key modifiers) |
| Modifiers Keys: `.ctrl`, `.alt`, `.shift`, `.meta` | `if (!event.ctrlKey) return` (change `ctrlKey` to `altKey`, `shiftKey`, or `metaKey`, respectively) |

```javascript
on: {
  keyup: function (event) {
    // 如果触发事件的元素不是事件绑定的元素
    // 则返回
    if (event.target !== event.currentTarget) return
    // 如果按下去的不是 enter 键或者
    // 没有同时按下 shift 键
    // 则返回
    if (!event.shiftKey || event.keyCode !== 13) return
    // 阻止 事件冒泡
    event.stopPropagation()
    // 阻止该元素默认的 keyup 事件
    event.preventDefault()
    // ...
  }
}
```

### 插槽

通过this.$slots访问静态插槽内容

```javascript
render: function (createElement) {
  // `<div><slot></slot></div>`
  return createElement('div', this.$slots.default)
}
```

通过this.$scopedSlots访问作用域插槽

```javascript
props: ['message'],
render: function (createElement) {
  // `<div><slot :text="message"></slot></div>`
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.message
    })
  ])
}
```

想要在渲染函数向子组件中传递作用域插槽，可以利用scopedSlots

```javascript
render: function (createElement) {
  return createElement('div', [
    createElement('child', {
      // 在数据对象中传递 `scopedSlots`
      // 格式：{ name: props => VNode | Array<VNode> }
      scopedSlots: {
        default: function (props) {
          return createElement('span', props.text)
        }
      }
    })
  ])
}
```

## 函数式组件

 

没有管理或者监听任何传递的状态，意味它是无状态的，没有响应数据，没有实例（没有this上下文）。

组件需要的一切通过上下文传递，包括：

- props：提供所有prop对象
- children：VNode子节点数组
- slots：返回所有插槽的对象的函数
- data：传递给组件的数据对象，作为createElement的第二个参数传入组件
- parent：对父组件的引用
- listeners：一个包含了所有在父组件上注册的事件侦听器的对象，这只是一个指向data.on的别名
- injections：如果使用inject选项，则该对象包含了应当被注入的属性

在添加functional：true之后，组件的render函数之间增加了conrext参数。

### slots()和children对比

children会包含所有子元素，而slots().default只会传递匿名子元素，而slots().XX会传递具名元素

# 插件

插件通常会为Vue添加全局功能，一般会有一下几种：

1. 添加全局方法或者属性
2. 添加全局资源：指令/过滤器/过渡等
3. 通过全局mixin方法添加一些组件选项
4. 添加Vue实例方法，通过把它们添加到Vue.prototype上
5. 一个库，提供自己API,同时提供上面提到一个或者多个功能

## 使用插件

 

通过全局Vue.use()，需要在调用new Vue()启动应用之前完成

```javascript
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  //... options
})

```

## 开发插件

 

Vue提供一个公开方法install，第一参数是Vue构造器，第二个参数是一个可选的选项对象：

```javascript
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

# 过滤器

可用于一些常见的文本格式化，可以用在两个地方：双发括号插值和v-bind表达式；添加在表达式的尾部，有“管道”符号表示：

```javascript
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
// 局部组件注册
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
// 全局注册
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
```

过滤器函数总是**接受表达式的值，作为第一个参数，并且还可以进行串联**

```javascript
{{message | filterA | filterB }}
{{ message | filterA('arg1', arg2) }}
```

