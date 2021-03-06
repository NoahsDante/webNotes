# 块级绑定

## var 声明与变量提升

使用var关键声明的变量，无论其实际声明位置在何处，都会被视为声明于所在函数的顶部

## 块级声明

让所声明的变量在指定的作用域外无法被访问

被创建的情况

1. 在函数内部
2. 在一个代码块（由一对花括号包裹）内部

### let声明

let声明会将变量的作用域限制在当前的代码块中；由于let声明并不会被提升到当前代码块的顶部，因此需要手动将let声明放置到顶部，以便让变量在整个代码块内部可用

#### 禁止重复声明

如果一个标识符已经在**代码块内部被定义，在此代码块内使用同一个标识符进行let声明就会导致抛出错误**

### 常量声明

使用const声明的变量会被认为是常量，意味着它们的值被设置完成后就不能再被改变。

#### 对比常量声明于let声明

常量声明与let声明一样，都是块级声明。

试图对之前用const声明的常量进行赋值会抛出错误，无论在严格模式还是非严格模式。

JS的常量如果是一个对象，它所包含的值是可以被修改的。

#### 使用const声明对象

const声明会阻止对**变量绑定与变量自身值的修改**，这意味着const声明并不会阻止对变量成员的修改

### 暂时性死区

**使用let或const声明的常量，在达到声明之处都是无法访问**的，试图访问会导致一个引用错误，即使在通常是安全的操作，也是如此。

当JS引擎检视接下的代码块并发现变量声明时，它会面对var的情况下将声明变量提升到函数或全局作用域的顶部，而面对let或const时会将声明放在暂时性死区。任何在暂时性死区内访问变量的企图都会导致"运行"时错误。只有执行到变量的声明语句时，该变量才会从暂时性死区内被移除并可以安全使用。

使用let或const声明的变量，若试图在定义位置之前使用它，无论如何都不能避免暂时性死区。

## 循环中的块级绑定

开发者需要使用变量的块级作用域的场景，想让一次性循环计数器仅能在循环内部使用。

### 循环的函数

在for循环中去调函数调用，但达到的预期却不一致；这是因为变量i在循环的每次迭代中都被共享了，意味着循环内创建的那些函数都拥有对同一变量的引用。

### 循环内的常量声明

ES6规范没有明确禁止在循环中使用const声明，然而它会根据循环方式的不同有不同行为，在常规的for循环中，初始化时使用const，循环在你试图变量的值时抛出错误。

## 全局块级绑定

在全局作用域上使用let或const，虽然在全局作用域上会创建新的绑定，但不会有任何属性被添加到全局对象上。这也意味着你不能使用const或let来覆盖一个全局变量，只能将其屏蔽。

## 块级绑定新的最佳实践

默认情况下应当使用let而不是var；当对需要受到保护的变量使用const

# 字符串

## 更好的Unicode支持

### UTF - 16 代码点

用一个数字来代表一个字符。字符编码要求将代码点转换为内部一致的码元，而对于 UTF-16 来说，代码点可以由多个码元组成

### codePoinAt()方法

codePointAt() ，它可以在给定字符串中按位置提取 Unicode 代码点；该方法接受的是码元位置而非字符位置，并返回一个整数值

### String.fromCodePoint() 方法

给定的代码点来产生包含单个字符的字符串

### normalize() 方法

Unicode 另一个有趣之处是，不同的字符在排序或其它一些比较操作中可能会被认为是相同的；比较字符串时，它们必须被标准化为同一种形式

### 正则表达式U标志

使用正则表达式来完成字符串的很多通用操作。但要记住，正则表达式假定单个字符使用一个 16 位的码元来表示。为了解决这个问题， ES6 为正则表达式定义了用于处理Unicode 的   u 标志。

#### U标志如何运作

当一个正则表达式设置了 u 标志时，它的工作模式将切换到针对字符，而不是针对码元；

```js
var text = "" ;
console.log(text.length); // 2
console.log(/^.$/.test(text)); // false
console.log(/^.$/u.test(text)); // true
```

正则表达式   /^.$/ 会匹配只包含单个字符的任意输入字符串。当不使用   u 标志时，该正则
表达式只匹配码元，所以不能匹配由两个码元表示的这个日文字符。启用   u 标志后，正则表
达式就会比较字符而不是码元，所以这个日文字符就会被匹配到

#### 计算代码数量

```js
function codePointLength(text) {
var result = text.match(/[\s\S]/gu);
return result ? result.length : 0;
}
```

调用了   match() 方法来检查   text 中的空白字符与非空白字符（使用   [\s\S] 以确保该模式能匹配换行符），所用的正则表达式启用了全局与 Unicode 特性

#### 判断是否支持U标志

```js
function hasRegExpU() {
try {
var pattern = new RegExp(".", "u"); return true;
} catch (ex) {
function hasRegExpU() {
try {
var pattern = new RegExp(".", "u"); return true;
} catch (ex) {
```

此函数将   u 作为一个参数来调用   RegExp 构造器，该语法即使在旧版 JS 引擎中都是有效的，而构造器在   u 未被支持的情况下会抛出错误

## 字符串的其他改动

此函数将   u 作为一个参数来调用   RegExp 构造器，该语法即使在旧版 JS 引擎中都是有效的，而构造器在   u 未被支持的情况下会抛出错误

### 识别子字符串的方法

includes() 方法，在给定文本存在于字符串中的任意位置时会返回 true ，否则返回false ；

startsWith() 方法，在给定文本出现在字符串起始处时返回 true ，否则返回 false ；

endsWith() 方法，在给定文本出现在字符串结尾处时返回 true ，否则返回 false 。

每个方法都接受两个参数：需要搜索的文本，以及可选的搜索起始位置索引。

**当提供了第二个参数时，   includes() 与   startsWith() 方法会从该索引位置开始尝试匹配；**

而endsWith() 方法会将字符串长度减去该参数，以此为起点开始尝试匹配。当第二个参数未提

供时，  

 includes() 与   startsWith() 方法会从字符串起始处开始查找，而   endsWith() 方法

则从尾部开始。实际上，第二个参数减少了搜索字符串的次数

如果向   startsWith() 、   endsWith() 或   includes() 方法传入了**正则表达式而不是字符串**，会抛出错误。这与   i**ndexOf() 以及   lastIndexOf() 方法的表现形成了反差，**它们会将正则表达式转换为字符串并搜索它。

### repeat() 方法

它接受一个参数作为字符串的重复次数，返回一个将初始字符串重复指定次数的新字符串

此方法比相同目的的其余方法更加方便，在操纵文本时特别有用，尤其是在需要产生缩进的代码格式化工具中

## 正则表达式的其他改动

### 正则表达式Y标志

在 Firefox 实现了对正则表达式   y 标志的专有扩展之后，ES6 将该实现标准化。

   y 标志影响正则表达式搜索时的粘连（   sticky ）属性，它表示从正则表达式的   lastIndex 属性值的位置开始检索字符串中的匹配字符。如果在该位置没有匹配成功，那么正则表达式将停止检索

### 复制正则表达式

### flags属性

## 模版字面量

### 基本语法

使用反引号（   ` ）来包裹普通字符串，而不是用双引号或单引号;

想在字符串中包含反引号，只需使用反斜杠（   \ ）转义即可;

在模板字面量中无需对双引号或单引号进行转义。

### 多行字符串

S6 的模板字面量使多行字符串更易创建，因为它不需要特殊的语法。只需在想要的位置包含换行即可，而且它会显示在结果中

### 制造替换位

替换位允许你将任何有效的 JS 表达式嵌入到模板字面量中，并将其结果输出为字符串的一部分;

替换位由起始的   ${ 与结束的   } 来界定，之间允许放入任意的 JS 表达式

模板字面量能访问到作用域中任意的可访问变量。试图使用未定义的变量会抛出错误;

**模板字面量本身也是 JS 表达式，意味着你可以将模板字面量嵌入到另一个模板字面量内部**

### 标签化模版

模板字面量进行转换并返回最终的字符串值，标签在模板的起始处被指定，即在第一个   ` 之前模板字面量进行转换并返回最终的字符串值，标签在模板的起始处被指定，即在第一个   ` 之前

#### 定义标签

一个标签（ tag ）仅是一个函数，它被调用时接收需要处理的模板字面量数据。标签所接收的数据被划分为独立片段，并且必须将它们组合起来以创建结果

#### 使用模版字面量中原始值

板标签也能访问字符串的原始信息，主要指的是可以访问字符在转义之前的形式。获取原始字符串值的最简单方式是使用内置的   String.raw() 标签。

# 函数

## 带参数默认值的函数

JS 函数的独特之处是可以接受任意数量的参数，而无视函数声明处的参数数量。这让你定义的函数可以使用不同的参数数量来调用，调用时未提供的参数经常会使用默认值来代替。

### 在ES5中模拟参数默认值

```javascript
function makeRequest(url, timeout, callback) {
timeout = timeout || 2000;
callback = callback || function() {};
// 函数的剩余部分
}
```

逻辑或运算符（   || ）在左侧的值为假的情况下总会返回右侧的操作数;由于函数的具名参数在未被明确提供时会是   undefined ，逻辑或运算符就经常被用来给缺失的参数提供默认值;

此处的   timeout 的有效值实际上有可能是   0 ，但因为   0 是假值，就会导致   timeout 的值在这种情况下会被替换为   2000;

```javascript
function makeRequest(url, timeout, callback) {
timeout = (typeof timeout !== "undefined") ? timeout : 2000; callback = (typeof callback !== "undefined") ? callback : function() {};
// 函数的剩余部分
}
```

### ES6中的参数默认值

使用初始化形式，以便在参数未被正式传递进来时；

```javascript
function makeRequest(url, timeout = 2000, callback = function() {}) {
// 函数的剩余部分
}
```

### 参数默人值如何影响arguments对象

在 ES5 的非严格模式下，   **arguments 对象会反映出具名参数的变化**;在非严格模式下，   a**rguments 对象总是会被更新以反映出具名参数的变化**;

在 ES5 的严格模式下，关于   arguments 对象的这种混乱情况被消除了，**它不再反映出具名参数的变化**;

ES6 参数默认值的函数中，   **arguments 对象的表现总是会与 ES5 的严格模式一致**，无论此时函数是否明确运行在严格模式下。参数默认值的存在触发了   arguments 对象与具名参数的分离

### 参数默认值表达式

默认值并不要求一定是基本类型的值。例如，你可以执行一个函数来产生参数的默认值一个新的标识符绑定，它在初始化之前不允许被访问，否则会抛出错误

### 参数默认值的暂时性死区

函数每个参数都会创建

## 使用不具名参数

### ES5中的不具名参数

JS 提供了arguments 对象用于查看传递给函数的所有参数;

### 剩余参数

剩余参数（ rest parameter ）由三个点（   ... ）与一个紧跟着的具名参数指定，**它会是包含传递给函数的其余参数的一个数组**，名称中的“剩余”也由此而来

#### 剩余参数的限制条件

第一是函数只能有一个剩余参数，并且它必须被放在最后

第二个限制是剩余参数不能在对象字面量的 setter 属性中使用

#### 剩余参数如何影响arguments对象

arguments 对象在函数被调用时反映了传入的参数，与剩余参数能协同工作

## 函数构造器的增强能力

允许使用默认参数以及剩余参数

## 扩展运算符

而扩展运算符则允许将一个数组分割，并**将各个项作为分离的参数传给函数**

## ES6的名称属性

ES6 给所有函数添加了   name 属性选择合适的名称；ES6 中所有函数都有适当的   name 属性值。为了理解其实际运作

## 明确函数的双重用途

JS 为函数提供了两个不同的内部方法：   [[Call]] 与   [[Construct]] 。当函数未使用   new 进行调用时，   [[call]] 方法会被执行，运行的是代码中显示的函数体。

而当函数使用   new 进行调用时，   [[Construct]] 方法则会被执行，**负责创建一个被称为新目标的新的对象**，并且使用该**新目标作为   this 去执行函数体。拥有   [[Construct]] 方法的函数被称为构造器。**



### 在ES5中判断函数如何被使用

最流行的方式是使用**instanceof**

```javascript
function Person(name) {
if (this instanceof Person) {
this.name = name; // 使用 new
} else {
throw new Error("You must use new with Person.")
}
}

```

可惜的是，该方法并不绝对可靠，因为在不使用   new 的情况下   this 仍然可能是   Person 的实例

```javascript
Person.call(person, "Michael"); // 奏效了！
```

### new.target 元属性

当函数的   [[Construct]] 方法被调用时，   new.target 会被填入   new 运算符的作用目标，该目标通常是新创建的对象实例的构造器，并且会成为函数体内部的   this 值。而若   [[Call]] 被执行，   new.target 的值则会是

undefined ;

通过检查   new.target 是否被定义，这个新的元属性就让你能安全地判断函数是否被使用new 进行了调用

## 块级函数

在代码块中声明函数（即块级函数）严格来说应当是一个语法错误;最佳实践就是不要在代码块中声明函数（**更好的选择是使用函数表达式**）

为了控制这种不兼容行为， **ES5 的严格模式为代码块内部的函数声明引入了一个错误**

ES6 会将doSomething() 函数视为块级声明;并允许它在定义所在的代码块内部被访问;块级函数会被提升到定义所在的代码块的顶部

### 决定何时使用块级函数

级函数与   let 函数表达式相似，在执行流跳出定义所在的代码块之后，函数定义就会被移除;

块级函数会被提升到所在代码块的顶部；而使用   let 的函数表达式则不会

### 非严格模式的块级函数

在非严格模式下同样允许使用块级函数，但行为有细微不同。块级函数的作用域会被提升到所在函数或全局环境的顶部，而不是代码块的顶部

## 箭头函数

使用一个“箭头”（   => ）来定义，但它的行为在很多重要方面与传统的 JS 函数不同：没有   this 、   super 、  arguments ，

  没有new.target 绑定：   this 、   super 、arguments 、以及函数内部的   new.target 的值由所在的、最靠近的非箭头函数来决定不能被使用  

 new 调用： 箭头函数没有   [[Construct]] 方法，因不能被用为构造函数，使用   new 调用箭头函数会抛出错误。

没有原型： 既然不能对箭头函数使用   new ，那么它也不需要原型，也就是没有prototype 属性。

不能更改   this ：   this 的值在函数内部不能被修改，在函数的整个生命周期内其值会保持不变。

没有   arguments 对象： 既然箭头函数没有   arguments 绑定，你必须依赖于具名参数或剩余参数来访问函数的参数。

不允许重复的具名参数： 箭头函数不允许拥有重复的具名参数，无论是否在严格模式下

### 箭头函数语法

### 创建立即调用函数表达式

将其包裹在括号内括号既可以连函数定义与参数调用一起包裹，也可以只用于包裹函数定义

使用传统函数时，   (function(){/*函数体*/})(); 与   (function(){/*函数体*/}()); 这两种方式都是可行的

使用箭头函数，则只有下面的写法是有效的：   **(() => {/*函数体*/})();** 

### 没有this 绑定

箭头函数没有   this 绑定，意味着箭头函数内部的   this 值只能通过查找作用域链来确定；

箭头函数没有   this 绑定，意味着箭头函数内部的   this 值只能通过查找作用域链来确定。如果箭头函数被包含在一个非箭头函数内，那么   this 值就会与该函数的相等；

否则，this 值就会是全局对象（在浏览器中是   window ，在 nodejs 中是   global ）；

### 箭头函数与数组

```javascript
var result = values.sort((a, b) => a - b);
```

### 没有arguments绑定

尽管箭头函数没有自己的   arguments 对象，但仍然能访问包含它的函数的   arguments 对象

### 识别箭头函数

尽管语法不同，但箭头函数依然属于函数，并能被照常识别

## 尾调用优化

调用函数的语句是另一个函数的最后语句

```javascript
function doSomething() {
return doSomethingElse(); // 尾调用
}
```

1. 尾调用不能引用当前栈帧中的变量（意味着该函数不能是闭包）；

2. 进行尾调用的函数在尾调用返回结果后不能做额外操作；

3. 尾调用的结果作为当前函数的返回值。

调用优化是你在书写任意递归函数时都需要考虑的因素，因为它能提供显著的性能提升，尤其是被应用到计算复杂度很高的函数时

# 扩展的对象功能

## 对象的类别

普通对象：拥有 JS 对象所有默认的内部行为。

奇异对象：其内部行为在某些方面有别于默认行为。

标准对象：在 ES6 中被定义的对象，例如   Array 、   Date ，等等。标准对象可以是普通的，也可以是奇异的。

内置对象：在脚本开始运行时由 JS 运行环境提供的对象。所有的标准对象都是内置对象

## 对象字面量语法的扩展

### 属性初始化器的速记法

以使用属性初始化器的速记法来消除对象名称与本地变量的重复情况。**当对象的一个属性名称与本地变量名相同时，你可以简单书写名称而省略冒号与值**

### 方法简写

通过省略冒号与   function 关键字

### 需计算属性名

需计算属性名是对象字面量语法的一部分，它用的也是方括号表示法，与此前在对象实例上的用法一致；对象字面量内的方括号表明该属性名需要计算，其结果是一个字符串

使用方括号表示法，任何能放在对象实例方括号内的东西，都可以作为需计算属性名用在对象字面量中。

## 新的方法

### Object.is() 方法

ES6 引入了   Object.is() 方法来弥补严格相等运算符残留的怪异点；

此方法接受两个参数，并会在二者的值相等时返回   true ，此时要求二者类型相同并且值也相等；

### Object.assign()方法

在一次混入中，一个对象会从另一个对象中接收属性与方法；该方法接受一个接收者，以及任意数量的供应者，并会返回接收者；

接受任意数量的供应者，而接收者会按照供应者在参数中的顺序来依次接收它们的属性。这意味着在接收者中，第二个供应者的属性可能会覆盖第一个供应者；

由于   Object.assign() 使用赋值运算符，供应者的访问器属性就会转变成接收者的数据属性；

## 重复的对象字面量属性

ES5 严格模式为重复的对象字面量属性引入了一个检查，若找到重复的属性名，就会抛出错误

ES6 这是赋给该属性的最后一个值。不会出错

## 自有属性的枚举顺序

自有属性枚举时基本顺序如下：

1. 所有的数字类型键，按升序排列。

2. 所有的字符串类型键，按被添加到对象的顺序排列。

3. 所有的符号类型（详见第六章）键，也按添加顺序排列。

注意，数值类型的键会被合并并排序，即使这未遵循在对象字面量中的顺序。字符串类型的键会跟在数值类型的键之后，按照被添加到   obj 对象的顺序，在对象字面量中定义的键会首先出现，接下来是此后动态添加到对象的键。

## 更强大的原型

ES6 通过添加   Object.setPrototypeOf() 方法而改变了这种假定，此方法允许你修改任意指

定对象的原型。它接受两个参数：需要被修改原型的对象，以及将会成为前者原型的对象修改对象的原型

### 使用super引用的简单原型访问

# 解构：更方便的数据访问

ES6 新增了解构（destructuring ），这是将一个数据结构分解为更小的部分的过程

## 解构为何有用？

把数据结构分解为更小的部分时，从中提取你要的数据会变得容易许多。很多语言都能用精简的语法来实现解构，让它更易使用

## 对象解构

对象解构语法在**赋值语句的左侧使用了对象字面量；**

### 解构赋值

在变量声明之后改变它们的值；注意你必须用圆括号包裹解构赋值语句，这是因为暴露的花括号会被解析为代码块语句，而块语句不允许在赋值操作符（即等号）左侧出现。圆括号标示了里面的花括号并不是块语句、而应该被解释为表达式，从而允许完成赋值操作

### 默认值

当你使用解构赋值语句时，如果所指定的本地变量在对象中没有找到同名属性，那么该变量会被赋值为   undefined；若要这么做，需要在属性名后面添加一个等号并指定默认值

### 赋值给不同的本地变量名

```javascript
let { type: localType, name: localName } = node; console.log(localType); // "Identifier"
console.log(localName); // "foo"
```

```javascript
let { type: localType, name: localName = "bar" } = node; console.log(localType); // "Identifier"
console.log(localName); // "bar"
```

### 嵌套的对象解构

每当有一个冒号在解构模式中出现，就意味着冒号之前的标识符代表需要检查的位置，而冒号右侧则是赋值的目标。当冒号右侧存在花括号时，表示目标被嵌套在对象的更深一层中

## 数组解构

解构作用在数组内部的位置上，而不是作用在对象的具名属性上;**是由于它们在数组中的位置，实际的变量名称是任意的（与位置无关）**

### 解构赋值

### 默认值

数组解构赋值同样允许在数组任意位置指定默认值。当指定位置的项不存在、或其值为undefined ，那么该默认值就会被使用

### 嵌套的解构

与解构嵌套的对象相似，可以用类似的方式来解构嵌套的数组

### 剩余项

它使用   ... 语法来**将剩余的项目赋值给一个指定的变量**

## 参数解构

提供了更清楚地标明函数期望输入的替代方案。它使用对象或数组解构的模式替代了具名参数

### 解构的参数是必需的

默认情况下调用函数时未给参数解构传值会抛出错误;可以给解构的参数提供默认值来处理这种行为

```javascript
function setCookie(name, value, options) {
let { secure, path, domain, expires } = options;
// 设置 cookie 的代码
}
```

### 参数解构的默认值

参数解构给每个属性都提供了默认值，所以你可以避免检查指定属性是否已被传入（以便在未传入时使用正确的值）。而整个解构的参数同样有一个默认值，即一个空对象

# 符号与符号属性

符号起初是被设计用于创建对象私有成员，"私有名称"意味着开发者可以创建非字符串类型的属性名称，由此防止使用常规手段来探查这些名称。

## 创建符号值

**符号没有字面量形式，这在JS的基本类型中是独一无二的，可以使用全局Symbol函数来创建一符号值;**

Symbol函数还可以接受一个额外的参数用于描述符号值，该描述并不能用来访问对应属性，但它能用于调试；

符号的描述信息被存储在内部属性[[description]]中，当符号的符号的toString()方法被显示或隐式调用时，该属性都会被读取。没有任何办法可以从代码中直接访问[[description]]属性。

## 使用符号值

可以在任意能使用"需计算属性名"的场合使用符号；Object.defineProperty() 或   Object.defineProperties() 调用中使用它

## 共享符号值

跨越文件或代码来追踪符号值是很困难并且易错的；S6 提供了“全局符号注册表”供你在任意时间点进行访问。想创建共享符号值，应使用   Symbol.for() 方法而不是   Symbol() 方法。   Symbol.for() 方法仅接受单个字符串类型的参数，作为目标符号值的标识符，同时此参数也会成为该符号的描述信息。

Symbol.for() 方法首先会搜索全局符号注册表，看是否存在一个键值为   "uid" 的符号值。若是，该方法会返回这个已存在的符号值；否则，会创建一个新的符号值，并使用该键值将其记录到全局符号注册表中，然后返回这个新的符号值；

Symbol.keyFor() 方法在全局符号注册表中根据符号值检索出对应的键值；

## 符号值的转换

符号类型在进行转换时非常不灵活，因为其他类型缺乏与符号值的合理等价，尤其是符号值无法被转换为字符串值或数值

## 检索符号属性

Object.keys() 与   Object.getOwnPropertyNames() 方法可以检索对象的所有属性名称，前者返回所有的可枚举属性名称，而后者则返回所有属性名称而无视其是否可枚举。然而两者都不能返回符号类型的属性，以保持它们在 ES5 中的功能不发生变化。

ES6 新增了Object.getOwnPropertySymbols() 方法，以便让你可以检索对象的符号类型属性；

Object.getOwnPropertySymbols() 方法会返回一个数组，包含了对象自有属性名中的符号值，

## 使用知名符号暴露内部方法

### Symbol.haslnstance 属性

于判断指定对象是否为本函数的一个实例。这个方法定义在   Function.prototype 上，因此所有函数都继承了面对   instanceof 运算符时的默认行为

### Symbol.isConcalSpreadable

一个布尔类型值，在集合对象作为参数传递给Array.prototype.concat() 方法时，指示是否要将该集合的元素扁平化

### Symbol.match

供String.prototype.match() 函数使用的一个方法，用于比较字符串

### Symbol.replace

供String.prototype.replace() 函数使用的一个方法，用于替换子字符串

### Symbol.search

供String.prototype.search() 函数使用的一个方法，用于定位子字符

### Symbol.split

供String.prototype.split() 函数使用的一个方法，用于分割字符串

### Symbol.toPrimitve

供String.prototype.split() 函数使用的一个方法，用于分割字符串

### Symbol.toStringTag

供String.prototype.toString() 函数使用的一个方法，用于创建对象的描述信息

#### 识别问题的变通解决方法

#### ES6给出的答案

### Symbol.unscopables

# Set和Map

## ES5中的Set和Map

```javascript
let set = Object.create(null);
set.foo = true;
// 检查属性的存在性
if (set.foo) {
// 一些操作
}
```

 set 变量是一个原型为   null 的对象，确保在此对象上没有继承属性。使用对象

的属性作为需要检查的唯一值在 ES5 中是很常用的方法。当一个属性被添加到   set 对象

时，它的值也被设为   true ，因此条件判断语句（例如本例中的   if 语句）就可以简单判断

出该值是否存在;

```javascript
let map = Object.create(null);
map.foo = "bar";
// 提取一个值
let value = map.foo;
console.log(value); // "bar"
```

 Set 不同， Map 多数被用来提取数据，而\不是仅检查键的存在性

## 变通方法的问题

由于对象属性的类型必须为字符串，你就必须保证任意两个键不能被转换为相同的字符串

键如果使用了不同对象，它们就应当是不同的键。将对象转换为默认的字符串表现形式

## ES6的Set

 Set 类型，这是一种无重复值的有序列表; Set 允许对它包含的数据进行快速访问，从而增加了一个追踪离散值的更有效方式。

## 创建Set并添加项目

Set 使用   new Set() 来创建，而调用   add() 方法就能向 Set 中添加项目，检查   size 属性还能查看其中包含有多少项

```javascript
let set = new Set();
set.add(5);
set.add("5");
console.log(set.size); // 2
```

Set 不会使用强制类型转换来判断值是否重复。这意味着 Set 可以同时包含数值   5 与 字符

串   "5" ，将它们都作为相对独立的项Object.is() 方法，来判断两个值是否相等，唯一的例外是 +0 与 -0 在 Set 中被判断为是相等的）。你还可以向 Set 添加多个对象，它们不会被合并为同一项

如果   **add() 方法用相同值进行了多次调用**，那么在**第一次之后的调用实际上会被忽略**可以使用数组来初始化一个 Set ，并且   Set 构造器**会确保不重复地使用这些值**

Set 构造器实际上可以接收任意可迭代对象作为参数。能使用数组是因为它们默认就是可迭代的， Set 与 Map 也是一样。   Set 构造器会使用迭代器来提取参数中的值

可以使用   has() 方法来测试某个值是否存在于 Set 中

## 移除值

从 Set 中将值移除。你可以使用   delete() 方法来移除单个值，或调用   clear() 方法来将所有值从 Set 中移除

## set上的forEach()方法

forEach() 方法会被传递一个回调函数，该回调接受三个参数：

1. Set 中下个位置的值；

2. 与第一个参数相同的值；

3. 目标 Set 自身。

## 将Set转换为数组

扩展运算符能将数组中的项分割开并作为函数的分离参数;

## Weak Set

由于   Set 类型存储对象引用的方式，它也可以被称为 Strong Set 。对象存储在   Set 的一个实例中时，实际上相当于把对象存储在变量中。只要对于   Set 实例的引用仍然存在，所存储\的对象就无法被垃圾回收机制回收，从而无法释放内存

## 创建WeakSet

## Set类之间的关键差异

Weak Set 与正规 Set 之间最大的区别是对象的弱引用

## ES6的Map	

ES6 的   Map 类型是键值对的有序列表，而键和值都可以是任意类型。键的比较使用的是Object.is()

# 迭代器与生成器

## 循环的问题

使用for循环虽然这个循环非常直观，然而当它被嵌套使用并要追踪多个变量时，情况就会变得非常复杂。额外的复杂度会引发错误，而for循环的样板性也增加了自身出错的可能性，因为相似的代码会被写在多个地方。迭代器正是用来解决此问题的。

## 何为迭代器？

迭代器是被设计专用于迭代的对象，带有特定接口。所有的迭代器对象都拥有   next() 方法，会返回一个结果对象。该结果对象有两个属性：对应下一个值的   value ，以及一个布尔类型的   done ，其值为   true 时表示没有更多值可供使用。迭代器持有一个指向集合位置的内部指针，每当调用了   next() 方法，迭代器就会返回相应的下一个值。若你在最后一个值返回后再调用   next() ，所返回的   done 属性值会是   true ，并且value 属性值会是迭代器自身的返回值（ return value ，即使用 return 语句明确返回的值）

```javascript
function createIterator(items) {
var i = 0;
return {
next: function() {
var done = (i >= items.length);
var value = !done ? items[i++] : undefined;
return {
done: done,
value: value
  };
}
};
}
```

## 何为生成器？

生成器（ generator ）是**能返回一个迭代器的函数**。生成器函数由放在   function 关键字之后的一个星号（   * ）来表示，并能使用新的   yield 关键字。将星号紧跟在   function 关键字之后;

yield 关键字只能用在生成器内部，**用于其他任意位置都是语法错误，即使在生成器内部的函数中也不行**

## 生成器函数表达式

可以使用函数表达式来创建一个生成器，只要在   function 关键字与圆括号之间使用一个星号（   * ）即可;

## 生成器对象方法

由于生成器就是函数，因此也可以被添加到对象中;

## 可迭代对象与for-of循环

 ES6 中，所有的集合对象（数组、 Set 与 Map ）以及字符串都是可迭代对象;它们都被指定了默认的迭代器；可迭代对象被设计用于与 ES 新增的   for-of 循环配合使用。

生成器创建的所有迭代器都是可迭代对象；

它完全删除了追踪集合索引的需要，让你无拘束地专注于操作集合内容；

for-of 循环一般不易出错，**因为需要留意的条件更少；传统的   for 循环被保留用于处理更复杂的控制条件**

## 访问默人迭代器

可以使用   Symbol.iterator 来访问对象上的默认迭代器

```javascript
let values = [1, 2, 3];
let iterator = values[Symbol.iterator]();
console.log(iterator.next()); // "{ value: 1, done: false }"
console.log(iterator.next()); // "{ value: 2, done: false }"
console.log(iterator.next()); // "{ value: 3, done: false }"
console.log(iterator.next()); // "{ value: undefined, done: true }"
```

## 创建可迭代对象

## 内置的迭代器

## 集合的迭代器

# JS类

与大多数正规的面向对象编程语言不同， JS 从创建之初就不支持类，也没有把类继承作为定义相似对象以及关联对象的主要方式，这让不少开发者感到困惑

## ES5中的仿类结构

与类最接近的是：创建一个构造器，然后将方法指派到该构造器的原型上。这种方式通常被称为创建一个自定义类型;

```javascript
function PersonType(name) {
this.name = name;
}
PersonType.prototype.sayName = function() {
console.log(this.name);
};
let person = new PersonType("Nicholas"); person.sayName(); // 输出 "Nicholas"
```

## 类的声明

类在 ES6 中最简单的形式就是类声明，它看起来很像其他语言中的类

### 基本的类声明

类声明以   class 关键字开始，其后是类的名称；剩余部分的语法看起来就像对象字面量中的方法简写，并且在方法之间不需要使用逗号

```javascript
class PersonClass {
// 等价于 PersonType 构造器
constructor(name) {
this.name = name;
}
  // 等价于 PersonType.prototype.sayName
sayName() {
console.log(this.name);
}
}
let person = new PersonClass("Nicholas"); person.sayName(); // 输出 "Nicholas"
console.log(person instanceof PersonClass); // true console.log(person instanceof Object); // true console.log(typeof PersonClass); // "function"
console.log(typeof PersonClass.prototype.sayName); // "function"
```

1. 类声明不会被提升，这与函数定义不同。类声明的行为与   let 相似，因此在程序的执行

到达声明处之前，类会存在于暂时性死区内。

2. 类声明中的所有代码会自动运行在严格模式下，并且也无法退出严格模式。
3. 类的所有方法都是不可枚举的，这是对于自定义类型的显著变化，后者必须用Object.defineProperty() 才能将方法改变为不可枚举。
4. 类的所有方法内部都没有   [[Construct]] ，因此使用   new 来调用它们会抛出错误
5. 调用类构造器时不使用   new ，会抛出错误。
6. 试图在类的方法内部重写类名，会抛出错误

### 为何要使用类的语法

类语法显著简化了所有功能的代码

## 类表达式

函数声明与类声明都以适当的关键词为起始（分别是   function 与   class ），随后是标识符（即函数名或类名）。函数具有一种表达式形式，无须在   function 后面使用标识符；类似的，类也有不需要标识符的表达式形式。类表达式被设计用于变量声明，或可作为参数传递给函数。

### 基本的类表达式

```javascript
let PersonClass = class {
// 等价于 PersonType 构造器
constructor(name) {
  this.name = name;
}
// 等价于 PersonType.prototype.sayName
sayName() {
console.log(this.name);
}
};
let person = new PersonClass("Nicholas"); person.sayName(); // 输出 "Nicholas"
console.log(person instanceof PersonClass); // true console.log(person instanceof Object); // true console.log(typeof PersonClass); // "function"
console.log(typeof PersonClass.prototype.sayName); // "function"
```

类表达式不需要在   class 关键字后使用标识符。除了语法差异，类表达式的功能等价于类声明;

类声明与类表达式都不会被提升

### 具名类表达式

可以为类表达式命名。为此需要在   class 关键字后添加标识符

```javascript
let PersonClass = class PersonClass2 {
// 等价于 PersonType 构造器
constructor(name) {
this.name = name;
}
// 等价于 PersonType.prototype.sayName
sayName() {
  console.log(this.name);
}
};
console.log(typeof PersonClass); // "function"
console.log(typeof PersonClass2); // "undefined"
```

此例中的类表达式被命名为   PersonClass2 。   PersonClass2 标识符只在类定义内部存在，因此只能用在类方法内部（例如本例的   sayName() 内）。在类的外部，   typeof PersonClass2 的结果为   "undefined" ，这是因为外部不存在   PersonClass2 绑定;

## 作为一级公民

能被当作值来使用的就称为一级公民（ first-class citizen ），意味着它能作为参数传给函数、能作为函数返回值、能用来给变量赋值

## 访问器属性

类还允许你在原型上定义访问器属性。为了创建一个getter ，要使用   get 关键字，并要与后方标识符之间留出空格；创建 setter 用相同方式，只是要换用   set 关键字

```javascript
class CustomHTMLElement {
constructor(element) {
this.element = element;
  }
get html() {
return this.element.innerHTML;
}
set html(value) {
this.element.innerHTML = value;
}
}
var descriptor = Object.getOwnPropertyDescriptor(CustomHTMLElement.prototype, "html"); console.log("get" in descriptor); // true console.log("set" in descriptor); // true console.log(descriptor.enumerable); // false
```



## 需要计算的成员名

类方法与类访问器属性也都能使用需计算的名称。语法相同于对象字面量中的需计算名称：无须使用标识符，而是用方括号来包裹一个表达式

访问器属性能以相同方式使用需计算的名称

```javascript
let methodName = "sayName";
class PersonClass {
constructor(name) {
this.name = name;
}
[methodName]() {
console.log(this.name);
  }
 get [methodName]() {
console.log(this.name);
  }
}
let me = new PersonClass("Nicholas"); me.sayName(); // "Nicholas"
```



## 生成器的方法

只要在方法名称前附加一个星号（   * ）

## 静态成员

直接在构造器上添加额外方法来模拟静态成员;只要在方法与访问器属性的名称前添加正式的   static 标注;

只多了一个   static 关键字。你能在类中的任何方法与访问器属性上使用   static 关键字，唯一限制是不能将它用于   constructor 方法的定义。静态成员不能用实例来访问

## 使用派生类进行继承

```javascript
class Rectangle {
constructor(length, width) {
this.length = length;
this.width = width;
}
getArea() {
return this.length * this.width;
}
}
class Square extends Rectangle {
  constructor(length) {
// 与 Rectangle.call(this, length, length) 相同
super(length, length);
}
}
var square = new Square(3);
console.log(square.getArea()); // 9
console.log(square instanceof Square); // true console.log(square instanceof Rectangle); // true 此次   Square 类使用了   extends 关键字继承了   Rectangle
```

Square 构造器使用了super() 配合指定参数调用了   Rectangle 的构造器;继承了其他类的类被称为派生类（ derived classes ）。如果派生类指定了构造器，就需要使用   super() ，否则会造成错误。若你选择不使用构造器，super() 方法会被自动调用，并会使用创建新实例时提供的所有参数

使用   super() 时需牢记以下几点

1. 你只能在派生类中使用   super() 。若尝试在非派生的类（即：没有使用   extends 关键字的类）或函数中使用它，就会抛出错误。

2. 在构造器中，你必须在访问   this 之前调用   super() 。由于   super() 负责初始化this ，因此试图先访问   this 自然就会造成错误。

3. 唯一能避免调用   super() 的办法，是从类构造器中返回一个对象。

### 屏蔽类方法

派生类中的方法总是会屏蔽基类的同名方法

### 继承静态成员

如果基类包含静态成员，那么这些静态成员在派生类中也是可用的

### 从表达式中派生类

可以对其使用   extends;**extends 后面能接受任意类型的表达式**;

表达式类型会导致错误

null ；

生成器函数

试图使用结果为上述值的表达式来创建一个新的类实例，都会抛出错误，因为不存在[[Construct]] 可供调用

### 继承内置对象

```javascript
class MyArray extends Array {
// 空代码块
  }
var colors = new MyArray();
colors[0] = "red";
console.log(colors.length); // 1
colors.length = 0;
```

### Symbol.species 属性

任意能返回内置对象实例的方法，在派生类上却会自动返回派生类的实例;

Symbol.species 知名符号被用于定义一个能返回函数的静态访问器属性。每当类实例的方法（构造器除外）必须创建一个实例时，前面返回的函数就被用为新实例的构造器

## 在类构造器中使用new.target

因为构造器能根据如何被调用而有不同行为，并且这给了更改这种行为的能力

# 增强的数组功能

## 创建数组

在 ES6 之前创建数组主要存在两种方式：   Array 构造器与数组字面量写法；需要将数组的项分别列出，并且还要受到其他限制。将“类数组对象”（即：拥有数值类型索引与长度属性的对象）转换为数组也并不自由，经常需要书写额外的代码；

### Array.of()方法

为数组新增创建方法的目的之一，是帮助开发者在使用   Array 构造器时避开 JS 语言的一个怪异点。使用**单个数值参数的时候并不会导致特殊结果**

Array.of() 方法总会创建一个包含所有传入参数的数组，而不管参数的数量与类型

### Array.from() 方法

来提供一种明确清晰的方式以解决这方面的需求。**将可迭代对象或者类数组对象作为第一个参数传入，   Array.from() 就能返回一个数组**

#### 映射转换

可以向   Array.from() 方法传递一个映射用的函数作为第二个参数。此函数会将类数组对象的每一个值转换为目标形式，并将其存储在目标数组的对应位置上

```javascript
function translate() {
return Array.from(arguments, (value) => value + 1);
}
let numbers = translate(1, 2, 3);
console.log(numbers); // 2,3,4
```

#### 在可迭代对象上使用

果映射函数需要在对象上工作，你可以手动传递第三个参数给Array.from() 方法，从而指定映射函数内部的   this 值;

```javascript
let helper = {
diff: 1,
add(value) {
return value + this.diff;
}
};
function translate() {
return Array.from(arguments, helper.add, helper);
}
let numbers = translate(1, 2, 3);
console.log(numbers); // 2,3,4
```

## 所有数组上的新方法

### find()与findindex()方法

均接受两个参数：一个回调函数、一个可选值用于指定回调函数内部的   this 。

该回调函数可接收三个参数：数组的某个元素、该元素对应的索引位置、以及该数组自身，这与   map() 和   forEach() 方法的回调函数所用的参数一致。该回调函数应当在给定的元素满足你定义的条件时返回   true ，而   find() 与   findIndex() 方法均会在回调函数第一次返回   true 时停止查找。二者唯一的区别是：   

**find() 方法会返回匹配的值，而   findIndex() 方法则会返回匹配位置的索引**

### fill()方法

使用特定值填充数组中的一个或多个元素。当只使用一个参数的时候，该方法会用该参数的值填充整个数组;

若你不想改变数组中的所有元素，而只想改变其中一部分，那么可以使用可选的起始位置参数与结束位置参数（不包括结束位置的那个元素）

### copyWithin方法

你在数组内部复制自身元素。为此你需要传递两个参数给   copyWithin() 方法：从什么位置开始进行填充，以及被用来复制的数据的起始位置索引;

## 类型化数组

被设计用来处理数值类型数据

### 数值数据类型

在 JS 中被同时用来表示整数与浮点数；当值改变时，可能会频繁发生整数与浮点数之间的格式转换

### 数组缓冲区

内存中包含一定数量字节的区域，而所有的类型化数组都基于数组缓冲区;

### 使用视图操作数组缓冲区

数组缓冲区代表了一块内存区域，而视图（views）则是你操作这块区域的接口。视图工作在

数组缓冲区或其子集上，可以读写某种数值数据类型的数据。   DataView 类型是数组缓冲区

的通用视图获取视图信息

#### 读取与写入数据

#### 类型化数组即为试图

#### 创建特定类型视图

## 类型化数组与常规数组的相似点

### 公共方法

### 相同的迭代器

### of() 与from 方法

## 类型化数组与常规数组的区别

### 行为差异

### 遗漏的方法

### 附加方法

# Promise 与异步编程

## 异步编程的背景

JS 引擎建立在单线程事件循环的概念上。单线程（ Single-threaded ）意味着同一时刻只能执行一段代码；

JS 引擎在同一时刻只能执行一段代码，所以引擎无须留意那些“可能”运行的代码。代码会被放置在作业队列（ job queue ）中，每当一段代码准备被执行，它就会被添加到作业队列。当 JS 引擎结束当前代码的执行后，事件循环就会执行队列中的下一个作业。事件循环（event loop ）是 JS 引擎的一个内部处理线程，能监视代码的执行并管理作业队列。要记住既然是一个队列，作业就会从队列中的第一个开始，依次运行到最后一个

### 事件模式

当用户点击一个按钮或按下键盘上的一个键时，一个事件（ event ）——例如   onclick ——就被触发了。该事件可能会对此交互进行响应，从而将一个新的作业添加到作业队列的尾部

### 回调模式

需要调用的函数（即回调函数）是作为参数传入

## Promise 基础

为异步操作的结果所准备的占位符。函数可以返回一个 Promise，而不必订阅一个事件或向函数传递一个回调参数

### Promise 的生命周期

每个 Promise 都会经历一个短暂的生命周期，初始为挂起态（ pending state），这表示异步操作尚未结束。一个挂起的 Promise 也被认为是未决的（ unsettled ）一旦异步操作结束， Promise 就会被认为是已决的（ settled ），并进入两种可能状态之一：

1. 已完成（ fulfilled ）： Promise 的异步操作已成功结束；

2. 已拒绝（ rejected ）： Promise 的异步操作未成功结束，可能是一个错误，或由其他原因导致

内部的   [[PromiseState]] 属性会被设置为   "pending" 、   "fulfilled" 或   "rejected" ，以反映 Promise 的状态。该属性并未在 Promise 对象上被暴露出来，因此你无法以编程方式判断 Promise 到底处于哪种状态。不过你可以使用   then() 方法在 Promise 的状态改变时执行一些特定操作

### 创建未决的Promise

一个被称为执行器（executor ）的函数，包含初始化 Promise 的代码。该执行器会被；

传递两个名为   resolve() 与   reject() 的函数作为参数。   resolve() 函数在执行器成功结束时被调用，用于示意该Promise 已经准备好被决议（ resolved ），而   reject() 函数则表明执行器的操作已失败。

### 创建已决的Promise

基于 Promise 执行器行为的动态本质，   Promise 构造器就是创建未决的 Promise 的最好方式。但若你想让一个 Promise 代表一个已知的值，那么安排一个单纯传值给   resolve() 函数

#### 使用Promise.resolve()

#### 使用Promise.reject()

#### 非Promise的Thenable

### 执行器错误

## 全局的Promise 拒绝处理

### Node.js的拒绝处理

### 浏览器的拒绝处理

## 串联Promise

### 捕获错误

### 在Promise链中返回值

### 在Promise链中返回Promise

## 响应多个Promise

### Promise.all()方法

### Promise.race()方法

## 继承Promise

## 异步任务运行

# 代理与反射接口

## 数组的问题

给数组元素赋值时，数组的   length 属性会受到影响，同时你也可以通过修改length 属性来变更数组的元素

## 代理与反射是什么

通过调用 new Proxy() ，你可以创建一个代理用来替代另一个对象（被称为目标），这个代理对目标对象进行了虚拟，因此该代理与该目标对象表面上可以被当作同一个对象来对待；

代理允许你拦截在目标对象上的底层操作，而这原本是 JS 引擎的内部能力。拦截行为使用了一个能够响应特定操作的函数被   Reflect 对象所代表的反射接口，是给底层操作提供默认行为的方法的集合，这些操作是能够被代理重写的。每个代理陷阱都有一个对应的反射方法，每个方法都与对应的陷阱函数同名，并且接收的参数也与之一致

## 创建一个简单的代理

```javascript
let target = {};
let proxy = new Proxy(target, {});
proxy.name = "proxy";
console.log(proxy.name); // "proxy"
console.log(target.name); // "proxy"
target.name = "target";
console.log(proxy.name); // "target"
console.log(target.name); // "target"
```



## 使用set陷阱函数验证属性性值

```javascript
let proxy = new Proxy(target, {
set(trapTarget, key, value, receiver) {
// 忽略已有属性，避免影响它们
if (!trapTarget.hasOwnProperty(key)) {
if (isNaN(value)) {
throw new TypeError("Property must be a number.");
}
}
// 添加属性
return Reflect.set(trapTarget, key, value, receiver);
}
});
```

允许你在写入属性值的时候进行拦截

## 使用get陷阱函数进行对象外形验证

get 代理陷阱则允许你在读取属性

```javascript
let proxy = new Proxy({}, {
get(trapTarget, key, receiver) {
if (!(key in receiver)) {
throw new TypeError("Property " + key + " doesn't exist.");
}
return Reflect.get(trapTarget, key, receiver);
}
});
// 添加属性的功能正常
proxy.name = "proxy";
console.log(proxy.name); // "proxy"
// 读取不存在属性会抛出错误
console.log(proxy.nme); // 抛出错误
```



## 使用has陷阱函数隐藏属性

has 陷阱函数会在使用   in 运算符的情况下被调用

## 使用deleteProperty陷阱函数避免属性被删除

delete 运算符能够从指定对象上删除一个属性，在删除成功时返回   true ，否则返回false 。如果试图用   delete 运算符去删除一个不可配置的属性，在严格模式下将会抛出错误；而非严格模式下只是单纯返回   false 

## 原型代理的陷阱函数

代理允许你通过   setPrototypeOf 与getPrototypeOf 陷阱函数来对这两个方法的操作进行拦截

### 原型代理的陷阱函数如何工作

### 为何存在两组方法

## 对象可扩展性的陷阱函数

### 两个基本范例

### 可扩展的重复方法

## 属性描述符的陷阱函数

### 阻止Object.defineProperty()

### 描述符对象的限制

### 重复的描述方法

#### defineProperty()方法

#### getOwnPropertyDescriptor()方法

## ownKeys陷阱函数

## 使用apply与construct陷阱函数的函数代理

只有 apply 与   construct 要求代理目标对象必须是一个函数

```javascript
let target = function() { return 42 },
proxy = new Proxy(target, {
apply: function(trapTarget, thisArg, argumentList) {
return Reflect.apply(trapTarget, thisArg, argumentList);
  },
construct: function(trapTarget, argumentList) {
return Reflect.construct(trapTarget, argumentList);
}
});
console.log(typeof proxy); // "function"
console.log(proxy()); // 42
var instance = new proxy();
```



### 验证函数的参数

### 调用构造器而无须使用new

```javascript
function Numbers(...values) {
if (typeof new.target === "undefined") {
throw new TypeError("This function must be called with new.");
  }
this.values = values;
}
let NumbersProxy = new Proxy(Numbers, {
apply: function(trapTarget, thisArg, argumentsList) {
return Reflect.construct(trapTarget, argumentsList);
}
});
let instance = NumbersProxy(1, 2, 3, 4);
console.log(instance.values); // [1,2,3,4]
```

### 重写抽象基础类的构造器

### 可被调用的类构造器

## 可被撤销的代理

revoke() 函数被调用后，就不能再对该   proxy 对象进行更多操作，任何与该代理对象交互的意图都会触发代理的陷阱函数，从而抛出一个错误

## 解决数组的问题

### 检测数组的索引

### 在添加新元素时增加长度属性

### 在减少长度属性时移除元素

### 实现MyArray类

## 将代理对象作为原型使用

### 在原型上使用get陷阱函数

### 在原型上使用set陷阱函数

### 在原型上使用has陷阱函数

### 将代理作为类的原型

# 用模块封装代码

JS “共享一切”的代码加载方式是该语言混乱且最易出错的方面之一；ES6 的设计目标之一就是要解决作用域问题，并让 JS 应用变得更有条理

## 何为模块？

模块（ Modules ）是使用不同方式加载的 JS 文件（与 JS 原先的脚本加载方式相对）这

种不同模式很有必要，因为它与脚本（ script ）有大大不同的语义

1. 模块代码自动运行在严格模式下，并且没有任何办法跳出严格模式；

2. 在模块的顶级作用域创建的变量，不会被自动添加到共享的全局作用域，它们只会在模块顶级作用域的内部存在；

3. 模块顶级作用域的   this 值为   undefined ；

4. 模块不允许在代码中使用 HTML 风格的注释（这是 JS 来自于早期浏览器的历史遗留特

   性）；

5. 对于需要让模块外部代码访问的内容，模块必须导出它们；

6. 允许模块从其他模块导入绑定

模块的真实力量是**按需导出与导入代码的能力**，**而不用将所有内容放在同一个文件内**。对于导出与导入的清楚理解，是辨别模块与脚本差异的基础

## 基本的导出

可以使用   export 关键字将已发布代码部分公开给其他模块。最简单方法就是将   export 放置在任意**变量、函数或类声明**之前，从模块中将它们公开出去；

除了   export 关键字之外，**每个声明都与正常形式完全一样。**

每个被导出的函数或类都有名称，这是因为**导出的函数声明与类声明必须要有名称**。你不能使用这种语法来导出匿名函数或匿名类，除非使用了default 关键字

## 基本的导入

有了包含导出的模块，就能在其他模块内使用   import 关键字来访问已被导出的功能

import 语句有两个部分，一是需要导入的标识符，二是需导入的标识符的来源模块

import { identifier1, identifier2 } from "./example.js"; 在   import 之后的**花括号指明了从给定模块导入对应的绑定，   from 关键字则指明了需要导入的模块**。模块由一个表示模块路径的字符串（被称为模块说明符， module specifier ）来指定

当从模块导入了一个绑定时，**该绑定表现得就像使用了 const 的定义**。这意味着你不能再定义另一个同名变量（包括导入另一个同名绑定），也不能在对应的   import 语句之前使用此标识符（也就是要受暂时性死区限制），更不能修改它的值

### 导入单个绑定

```javascript
// 单个导入
import { sum } from "./example.js";
console.log(sum(1, 2)); // 3
sum = 1; // 出错
```



### 导入多个绑定

```javascript
// 多个导入
import { sum, multiply, magicNumber } from "./example.js";
```

### 完全导入一个模块

```javascript
// 完全导入
import * as example from "./example.js"; console.log(example.sum(1,
example.magicNumber)); // 8
console.log(example.multiply(1, 2)); // 2
```

这种导入格式被称为命名空间导入（ namespace import ），这是因为该   example 对象并不

存在于example.js 文件中，而是作为一个命名空间对象被创建使用，其中包含了example.js 的所有导出成员

无论你对同一个模块使用了多少次   import 语句，该模块都只会被执行一次。在导出模块的代码执行之后，已被实例化的模块就被保留在内存中，并随时都能被其他import 所引用

若同一个应用中的其他模块打算从   example.js 导入绑定，则那些模块都会使用这段代码中所用的同一个模块实例。

export 与   import 都有一个重要的限制，那就是**它们必须被用在其他语句或表达式的外部**

原因之一是模块语法需要让 JS 能静态判断需要导出什么，正因为此，你只能在模块的顶级作用域使用export 

出于与不能动态导出绑定相同的原因，你也不能动态导入绑定。   **export 与   import 关键字被设计为静态的，以便让诸如文本编辑器之类的工具能轻易判断模块有哪些信息可用**

### 导入绑定的一个微妙性怪异点

ES6 的   import 语句为变量、函数与类创建了只读绑定，而不像普通变量那样简单引用了原始绑定。尽管导入绑定的模块无法修改绑定的值，但负责导出的模块却能做到这一点

## 重命名导出与导入

可以使用   as 关键字来指定新的名称，以便在模块外部用此名称指代目标函数

```javascript
function sum(num1, num2) {
return num1 + num2;
  }
export { sum as add };
import { add as sum } from "./example.js"; console.log(typeof add); // "undefined"
console.log(sum(1, 2)); // 3
```

此处的   sum() 函数被作为   add() 导出，前者是本地名称（ local name ），后者则是导出名称（ exported name ）。这意味着当另一个模块要导入此函数时，它必须改用   add 这个名称

## 模块的默认值

使用   default 关键字所指定的单个变量、函数或类，而你在每个模块中只能设置一个默认导出，将   default 关键字用于多个导出会是语法错误

### 导出默人值

```javascript
export default function(num1, num2) {
return num1 + num2;
  }
```

此模块将一个函数作为默认值进行了导出，   default 关键字标明了这是一个默认导出。此函数并不需要有名称，因为它就代表这个模块自身。你也能在export default 后面放置一个标识符，以指定默认的导出

default 标识符有特别含义，既作为重命名导出，又标明了模块需要使用的默认值。由于default 在 JS 中是一个关键字，它就不能被用作变量、函数或类的名称（但它可以被用作属性名称

### 导入默认值

```javascript
// 导入默认值
import sum from "./example.js";
console.log(sum(1, 2)); // 3

export let color = "red";
export default function(num1, num2) {
return num1 + num2;
}
import sum, { color } from "./example.js"; console.log(sum(1, 2)); // 3
console.log(color); // "red"
```

未使用花括号，与之前在非默认的导入中看到的不同。本地名称   sum 被用于代表目标模块所默认导出的函数。

这种语法是最简洁的，而 ES6 的标准制定者也期待它成为在网络上进行导入的主要形式，这样你就能导入已存在的对象

## 绑定的再导出

可以选择将一个值用不同名称导出

想将来自另一个模块的所有值完全导出，可以使用星号（   * ）模式使用完全导出，就可以导出目标模块的默认值及其所有具名导出，但这可能影响你从当前模块所能导出的值

## 无绑定的导入

有些模块也许没有进行任何导出，相反只是修改全局作用域的对象。尽管这种模块的顶级变量、函数或类最终并不会自动被加入全局作用域，但这并不意味着该模块无法访问全局作用域

```javascript
没有导出与导入的模块
Array.prototype.pushAll = function(items) {
// items 必须是一个数组
if (!Array.isArray(items)) {
throw new TypeError("Argument must be an array.");
}
// 使用内置的 push() 与扩展运算符
return this.push(...items);
};
import "./example.js";
let colors = ["red", "green", "blue"]; let items = [];
items.pushAll(colors);
```

## 加载模块

ES6 未选择给所有 JS 环境努力创建一个有效的单一规范，而只对一个未定义的内部操作   HostResolveImportedModule 指定了语法以及抽象的加载机制。 web 浏览器与 Node.js 可以自行决定用什么方式实现   HostResolveImportedModule ，以便更好契合各自的环境

### 在web浏览器中使用模块

1. 使用   <script> 元素以及   src 属性来指定代码加载的位置，以便加载 JS 代码文件；

2. 使用   <script> 元素但不使用   src 属性，来嵌入内联的 JS 代码；

3. 加载 JS 代码文件并作为 Worker （例如 Web Worker 或 Service Worker ）来执行。

#### 在script标签中使用模块

<script> 元素默认以脚本方式（而非模块）来加载 JS 文件，只要   type 属性缺失，或者
type 属性含有与 JS 对应的内容类型（例如   "text/javascript" ）。  

 <script> 元素能够执行内联脚本，也能加载在   src 中指定的文件。为了支持模块，添加了   "module" 值作为type 的选项。
   
 </script>将   type 设置为   "module" ，就告诉浏览器要将内联代码或是指定文件中的

模块 JS文件的内容类型与脚本 JS 文件相同，因此不可能依据文件的内容类型将它们完全区别开来。此外，当   type 属性无法辨认时，浏览器就会忽略   <script> 元素，因此不支持模块的浏览器也就会自动忽略   <script type="module"> 声明，从而提供良好的向下兼容性代码当作模块，而不是当作脚本

#### web浏览器中的模块加载次序

当 HTML 解析到拥有   src 属性的   <script type="module"> 标签时，就会立即开始下载模块文件，但并不会执行它，直到整个网页文档全部解析完为止。模块也会按照它们在 HTML 文件中出现的顺序依次执行，这意味着第一个   <script type="module"> 总是保证在第二个之前执行，即使其中有些模块不是用   src 指定而是包含了内联脚本

#### web浏览器中的异步模块加载

带有   async 的脚本在文档中的顺序却并不会影响脚本执行的次序，脚本总是会在下载完成后就立即执行，而无须等待包含它的文档解析完毕。async 属性也能同样被应用到模块上。在   <script type="module"> 上使用   async 会导致模块的执行行为与脚本相似。唯一区别是模块中所有   import 导入的资源会在模块自身被执行前先下载

#### 将模块作为worker加载

let worker = new Worker("module.js", { type: "module" }); 此例通过传递   type 属性值为   "module" 的第二个参数，将   module.js 作为模块而不是脚本

进行了加载（   type 属性也就是模拟了   <script> 标签在模块与脚本之间的   type 区别）

worker 脚本被限制只能从同源的网页进行加载，而 worker 模块可以不受此限制

### 浏览器模块说明符方案

明符应当为下列格式之一：

以   / 为起始，表示从根目录开始解析；

以   ./ 为起始，表示从当前目录开始解析；

以   ../ 为起始，表示从父级目录开始解析







