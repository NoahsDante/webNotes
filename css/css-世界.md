

# 第 1 章 概述 
## 何为“流”
> 成为**文档流**，将窗体自上而下分成一行一行，并在每行中按从左至右依次排放元素 （引导元素排列和定位）

## 什么是流体布局

> 利用元素“流”的特性实现的各类布局效果。因为“流”本身具有自适应特性，所以“流体布局”往往都是具有自适应性。

## table 自己的世界

> <table>有着自己的世界，“流”的特性对<table>并不适用，一些CSS属性的表现，如单元格的vertical-align，也和普通的元素不一样

# 第 2 章 需提前了解的术语和概念

> [CSS的值和单位]: https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Introduction_to_CSS/Values_and_units

## 变量

### currentColor

```css
:root .ico {position: relative; }
.ico-a { color: #333; }
.ico-a:hover { color: #4D77C6; text-decoration: none; }
.ico-list::before { 
    width: 2px;
    height: 2px;
    padding: 3px 0; 
    border-top: 2px solid currentColor; 
    border-bottom: 2px solid currentColor;
    top: 6px; left: 2px;
    background-color: currentColor;
    background-clip: content-box;
}
.ico-list::after {
    width: 11px; 
    height: 1px; 
    padding: 4px 0; 
    border-top: 1px solid currentColor; 
    border-bottom: 1px solid currentColor;
    background-color: currentColor;
    top: 7px; left: 6px; 
    background-clip: content-box; 
}
```

```HTML
<a href="javascript:" class="ico-a">
    <i class="ico ico-list"></i>列表
</a>
```



> **当前的标签所继承的文字颜色** 

## 长度单位

> <number> + 长度单位 = <length>
>
> [css-length]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/length

# 第 3 章 流、元素与基本尺寸

## 块级元素

> 默认情况下，块级元素会新起一行;占据其父元素（容器）的整个空间 

- 块级盒子**负责结构**
- 内联盒子**负责内容**

## 为什么 list-item 元素会出现项目符号 

> list-item（“**附加盒子**”）名“**标记盒子**”

## 深藏不露的 width:auto

### 充分利用可用空间

> <div>、<p>这些元素的宽度默认是100%于父级容器的

### 收缩与包裹

> **浮动、绝对定位、inline-block元素或table元素**

### 收缩到最小

> 出现在table-layout为auto的表格中；当每一列空间都不够的时候，文字能断就断，但中文是随便断的，英文单词不能断

### 超出容器限制

> 容很长的连续的英文和数字，或者内联元素被设置了white-space:nowrap

### 外部尺寸与流体特性

#### 正常流宽度

> <div>、<p>这些元素的宽度默认是100%于父级容器的

> **流动性**：不是看上去的宽度100%显示这么简单，而是一种margin/border/padding和content内容区域自动分配水平空间的机制

#### 格式化宽度

> 格式化宽度仅出现在“绝对定位模（position属性值为absolute或fixed的元素中）；**绝对定位元素的宽度表现是“包裹性”，宽度由内部尺寸决定**

> 当l**eft/top或top/bottom对立方位的属性值同时存在**的时候，元素的宽度表现为“格式化宽度”，其**宽度大小**相对于最近的具有定位特性**（position属性值不是static）的祖先元素计算**

### 内部尺寸与流体特性

#### 包裹性

> 除了“包裹”（max-width:100%），还有“自适应性（元素尺寸由内部元素决定，但永远小于“包含块”容器的尺寸）”

```html
<button>按钮</button>
<input type="button" value="按钮">
```

**著名的“按钮”元素：极具代表性的inline-block元素**

- 按钮上的文字个数比较有限，没机会换行
- <button>标签按钮才会自动换行，<input>标签按钮，默认white-space:pre，是不会换行的，需要将pre值重置为默认的normal

##### 应用：

**文字少的时候居中显示，文字超过一行的时候居左显示**

```css
.box {
   padding: 10px;
   background-color: #cd0000;
　 text-align: center;
}
.content {
　 display: inline-block;
　 text-align: left;
}
```

```html
<div class="box">
    <p id="conMore" class="content">文字内容</p>
</div>
```

#### 首选最小宽度

> 元素最适合的最小宽度

- 东亚文字（如中文）最小宽度为每个汉字的宽度:font-size:14px;
- 西方文字最小宽度由特定的连续的英文字符单元决定（一般会终止于空格（普通空格）、短横线、问号以及其他非英文字符等）

#### 最大宽度

> 是元素可以有的最大宽度（**实际上是最大的连续内联盒子的宽度**）

## 如何评价*{box-sizing:border-box} 

#### 易产生没必要的消耗

- 通内联元素（非图片等替换元素），**box-sizing无论是什么值，对其渲染表现都没有影响**

- search类型的搜索框，其默认的box-sizing就是border-box（如果浏览器支持），因此，*对search类型的<input>而言也是没有必要的消耗

- **如果padding值足够大，那么width也无能为力了**;内容则表现为“首选最小宽度”(**针对块状特性的元素而言的)**

- ```css
  .box {
  　  width: 80px;
  　  padding: 20px 60px;
  　  box-sizing: border-box;
  }
  ```

  

## 关于 height:100%

> 父元素height为auto，只要子元素在文档流中，其百分比值完全就被忽略了;百分比高度值要想起作用，其父级必须有一个可以生效的高度值;

#### 为何height:100%无效

> 包含块的高度没有显式指定（即**高度由内容决定**），并且该元素不是绝对定位，则计算值为auto

#### width:100%效

> width:100%有效包含块的宽度取决于该元素的宽度，那么产生的布局在CSS 2.1中是未定义的

## 如何让元素支持height:100%效果

### 设定显式的高度值

```css
html, body {
　 height: 100%;
}
```

### 使用绝对定位

- 绝对定位的宽高**百分比计算是相对于padding box**；把padding大小值计算在内
- 非绝对定位元素则是相对于**content box计算的**

## CSS min-width/max-width 和 min-height/max-height 
### 与众不同的初始值

#### max-* 初始值是none

> 假如说**max-width初始值是auto,**我们的width永远不能设置为比auto计算值更大的宽度值了

#### min-* 初始值 0（但是为auto）

##### min-wdith/height值为auto合法

##### 数值变化无动画

### 超越!important，超越最大

> max-width会覆盖width,不是普通的覆盖，是超级覆盖;比直接在元素的style属性中设置CSS声明还要高

#### 超越最大

> **min-width和max-width冲突;****遵循“超越最大”规则**（注意不是“后来居上”规则），**min-width覆盖**

### 任意高度元素的展开收起动画技术

> 我们展开的元素内容是动态的，换句话说高度是不固定的

```css
.element {
　 max-height: 0;
　 overflow: hidden;
　 transition: max-height .25s;
}
.element.active {
　 max-height: 666px;　　/* 一个足够大的最大高度值 */
}
```

max-height值比height计算值大的时候，元素的高度就是height属性的计算高度

#### 注意

max-height不能设置很大，如果延迟时间长，会有延迟的感觉。

## 内联元素
### 内联世界深入的基础—内联盒模型
#### 内容区域（content area）

> 围绕**文字看不见的盒子**，其大小仅受字符本身特性控制,本质上是一个**字符盒子（character box）**；

> 但是有些元素，如**图片**这样的替换元素，其内容显然不是文字，不存在字符盒子之类的，因此，对于这些元素，内容区域可以看成元素自身

#### 内联盒子

> 元素的“外在盒子”，用来决定元素是内联还是块级

#### 行框盒子

> 由一个一个“内联盒子”组成的

#### 包含盒子

> 由一行一行的“行框盒子”组成(CSS规范中，并没有“包含盒子”的说法，更准确的称呼应该是“**包含块**”)

### 幽灵空白节点 

> **内联元素的所有解析和渲染会有前面有一个“空白节点”**；不占据任何宽度，看不见也无法通过脚本获取（**文档声明必须是HTML5文档声明**（HTML代码如下））

```css
div {
　 background-color: #cd0000;
}
span {
　 display: inline-block;
}
<div><span></span></div>
```

# 第 4 章 盒尺寸四大家族
## 深入理解 content

### content 与替换元素

#### 替换元素

> 过修**改某个属性值呈现的内容**就可以被替换的元素; 如“img”

##### **内容的外观不受页面上的CSS的影响**

- 浏览器自身暴露的一些样式接口
- ::-ms-check{}

##### **有自己的尺寸**

- **其默认的尺寸（不包括边框）是300像素×150像素**，如`<video>、<iframe>或者<canvas>`

#####**在很多CSS属性上有自己的一套表现规则**

#### 替换元素的尺寸计算规则

1.  固有尺寸指的是替换内容原本的尺寸
   - 有着自己的宽度和高度
2. HTML尺寸
   - HTML原生属性width和height属性、`<input>的size属性、<textarea>`的cols和rows属性等
3. CSS尺寸特指可以通过CSS的width和height或者max-width/min-width和max-height/min-height设置的尺寸

##### 特点

> **CSS尺寸 > HTML尺寸 > 固有尺寸**

1. 如果没有CSS尺寸和HTML尺寸，则使用固有尺寸作为最终的宽高
2. 如果没有CSS尺寸，则使用HTML尺寸作为最终的宽高
3. 如果有CSS尺寸，则最终尺寸由CSS属性决定
4. 如果“固有尺寸”含有固有的宽高比例，同时仅设置了宽度或仅设置了高度，则元素依然按照固有的宽高比例显示
5. 内联替换元素和块级替换元素使用上面同一套尺寸计算规则
   - 是**为何图片以及其他表单类替换元素设置display:block宽度却没有100%容器的原因**

##### 列外

```css
<img>
```

在没有src属性下，各个浏览器表现的各不相同

- IE浏览器下是28×30
- Chrome浏览器下是0×0
- Firefox浏览器下显示的是0×22
  - **src缺省的<img>不是替换元素，而是一个普通的内联元素**,因此设置宽高是无效的

##### 注意

> 提高加载性能以及节约带宽费用，通过滚屏加载的方式异步加载用一张透明的图片占位；

```css
<img src="transparent.png">
// 改成
img { visibility: hidden; }
img[src] { visibility: visible; }
<img> 
// 不是
<img src=''> 

```

- **src=""在很多浏览器下依然会有请求，而且请求的是当前页面数据**
- **当图片的src属性缺省的时候，图片不会有任何请求，是最高效的实现方式**

------

> 设置图片个尺寸不是直接设置图片的固有尺寸，图片的固有尺寸是无法设置；但是设定width和height会影响图片的尺寸

- **因为图片中的content替换内容默认的适配方式是填充（fill）**
- <img>和其他一些替换元素的替换内容的适配方式可以通过**object-fit属性修改了**；（类似于background-size原理）

### 替换元素和非替换元素的距离有多远

#### 替换元素和非替换元素之间只隔了一个src属性

```css
img { 
　 display: block;
　 outline: 1px solid;
}
<img>
```

##### 特点

- Firefox浏览器下,最终的宽度是100%自适应父容器的可用宽度的。其表现和普通的<span>类似，已经完全不是替换元素了
- Chrome浏览器其实也有类似的表现，只是需要特定的条件触发而已,**不为空的alt属性值**

##### 应用

> 基于伪元素的图片内容生成技术

- 不能有src属性
- 不能使用content属性生成图片
- 需要有alt属性并有值
- Firefox下::before伪元素的content值会被无视，::after无此问题

```css
img::after {
　  /* 生成alt信息 */
　  content: attr(alt); 
　  /* 尺寸和定位 */
　  position: absolute; bottom: 0;
　  width: 100%;
　  background-color: rgba(0,0,0,.5);
　  transform: translateY(100%);
　  /* 来点过渡动画效果 */
　  transition: transform .2s;
}
img:hover::after {
　  /* alt信息显示 */
　  transform: translateY(0);
}
```



#### 替换元素和非替换元素之间只隔了一个CSS content属性

> **在Chrome浏览器下，所有的元素都支持content属性**，而**其他浏览器仅在::before/::after伪元素中才有支持**

```css
img { content: url(1.jpg); }
<img>
// 一样的
<img src="1.jpg">
```

##### 应用

**图片切换**

```css
.emoji:hover {
    content: url(laugh-tear.png);
}
```



```html
<img class="emoji" src="laugh.png">
```

##### 注意

> **content属性改变的仅仅是视觉呈现，当我们以右键或其他形式保存这张图片的时候，所保存的还是原来src对应的图片**

#### content与替换元素关系剖析

> **content属性**生成的内容都是**替换元素**

- content生成的文本是**无法选中、无法复制;无法被屏幕阅读设备读取**，也**无法被搜索****引擎抓取**;替换的仅仅是**视觉层**
- **content动态生成值无法获取**

### content 内容生成技术

#### content辅助元素生成

##### 清除浮动

```css
.clear:after {
　 content: '';
　 display: table;　/* 也可以是'block' */
　 clear: both;
}
```

##### 两端对齐、垂直居中/上边缘/下边缘对齐

```css
.box {
　  width: 256px; height: 256px;
　  /* 两端对齐关键 */
　  text-align: justify;
}
.box:before {
　  content: "";
　  display: inline-block;
　  height: 100%;
}
.box:after {
　  content: "";
　  display: inline-block;
　  width: 100%;
}
.bar {
　  display: inline-block;
　  width: 20px;
}
```

```html
// 这里千万不能换行
<div class="box"><i class="bar"></i>
　  <i class="bar"></i>
　  <i class="bar"></i>
　  <i class="bar"></i>
</div>
```

#### content字符内容生成

##### 字体图标

##### 正在加载...动画

```css
dot {
    display: inline-block; 
    height: 1em;
    line-height: 1;
    text-align: left;
    vertical-align: -.25em;
    overflow: hidden;
}
dot::before {
    display: block;
    content: '...\A..\A.';
    white-space: pre-wrap;
    animation: dot 3s infinite step-start both;
}
@keyframes dot {
    33% { transform: translateY(-2em); }
    66% { transform: translateY(-1em); }
}
```

```html
正在加载中<dot>...</dot>
```

#### content attr属性值内容生成

```css
img::after {
　  /* 生成alt信息 */
　  content: attr(alt); 
　  /* 其他CSS略 */
}
.icon:before {
　  content: attr(data-title);
}
```

#### 理解content计数器

##### 属性counter-reset

> **“计数器-重置”**、计数器起个名字；默认是0；
>
> 多个计数器同时命名

##### 属性counter-increment

> "计数器递增"

```css
.counter {
    counter-reset: wangxiaoer 2; 
    counter-increment: wangxiaoer 2;
    font-size: 32px; 
    font-family: Arial black; 
    color: #cd0000; 
}
.counter:before { 
  content: counter(wangxiaoer);
  counter-increment: wangxiaoer;
}
<p class="counter"></p>
```

##### 计数规则

> **普照源（counter-reset）唯一，每普照（counter-increment）一次，普照源增加一次计数值**

## 温和的 padding 属性 
### padding 与元素的尺寸

#### 内联元素的padding在垂直方向同样会影响布局，影响视觉表现

> 内联元素没有**可视宽度和可视高度的说法（clientHeight和clientWidth永远是0）**，**垂直方向的行为表现完全受line-height和vertical-align的影响**;视觉上并没有改变和上一行下一行内容的间距

```css
a {
　  padding: 50px;
　  background-color: #cd0000;
}
```

可以明显看到，尺寸虽有效，但是对**上下元素的原本布局却没有任何影响**，**仅仅是垂直方向发生了层叠**

#### 应用

- 在不影响当前布局的情况下，优雅地增加链接或按钮的点击区域大小

- 利用内联元素的padding实现高度可控的分隔线

- ```css
  a + a:before {
  　  content: "";
  　  font-size: 0;
  　  padding: 10px 3px 1px;
  　  margin-left: 6px;
  　  border-left: 1px solid gray;
  }
  <a href="">登录</a><a href="">注册</a>
  ```

- 元素发生锚点定位;标题距离页面的顶部有一段距离

- ```css
  <h3><span id="hash">标题</span></h3>
  h3 {
  　  line-height: 30px;
  　  font-size: 14px;
  }
  h3 > span {
  　  padding-top: 58px;
  }
  ```

#### 注意

> 对于**非替换元素的内联元素，不仅padding不会加入行盒高度的计算，margin和border也都是如此，都是不计算高度，但实际上在内联盒周围发生了渲染**

### padding 的百分比值

#### 块状特性的元素

> padding百分比值无论是**水平方向还是垂直方向均是相对于宽度计算**

#### 内联元素

- 同样相对于宽度计算
- 默认的高度和宽度细节有差异
- padding会断行

##### 重置padding

```css
button { padding: 0; }
// Firefox浏览器下
button::-moz-focus-inner { padding: 0; }
// IE7浏览器下，文字如果变多，那么左右padding逐渐变大
button { overflow: visible; }
```

```css
<button id="btn"></button>
<label for="btn">按钮</label>

button {
　 position: absolute;
　 clip: rect(0 0 0 0);
}
label { 
　 display: inline-block;
　 line-height: 20px;
　 padding: 10px;
}
```

> 按钮padding与高度计算不同;所有浏览器下的按钮高度都是40像素，而且<button>元素的行为也都保留了

### padding 与图形绘制

> padding属性和background-clip属性配合

```css
.icon-menu {
　  display: inline-block;
　  width: 140px; height: 10px;
　  padding: 35px 0;
　  border-top: 10px solid;
　  border-bottom: 10px solid;
　  background-color: currentColor;
　  background-clip: content-box;
}
```

**移动端菜单“三道杠”**

```css
.icon-dot {
    display: inline-block;
    width: 100px; height: 100px;
    padding: 10px;
    border: 10px solid;    
    border-radius: 50%;
    background-color: currentColor;
    background-clip: content-box;
}
```

**双层圆点图形效果**

## 激进的 margin 属性 
### margin 与元素尺寸以及相关布局 

#### 元素尺寸的相关概念

- 元素尺寸
  - $().width()和$().height()；
  - border box padding和border；
  - DOM API offsetWidth offsetHeight
- 元素内部尺寸
  - $().innerWidth()和$().innerHeight()；
  - padding box  padding
  - DOM API clientWidth clientHeight
- 元素外部尺寸
  - $().outerWidth(true) $().outerHeight(true)
  - margin box padding和border margin

#### margin与元素的内部尺寸

只是针对**块元素**

> 只有元素是**“充分利用可用空间”(宽度自动100%)**状态的时候，**margin才可以改变元素的可视尺寸**

##### 应用

> 一侧定宽的两栏自适应布局效果，假设我们定宽的部分是128像素宽的图片，自适应的部分是文字

```css
.box { overflow: hidden; }
.box > img { float: left; }
.box > p { margin-left: 140px; }
<div class="box">
　  <img src="1.jpg">
　  <p>文字内容...</p>
</div>
```

### 正确看待 CSS 世界里的 margin 合并 

#### margin合并的多种场景

##### 相邻兄弟元素margin合并

```css
p { margin: 1em 0; }
<p>第一行</p>
<p>第二行</p>
```

##### 父级和第一个/最后一个子元素

```css
<div class="father">
　  <div class="son" style="margin-top:80px;"></div>
</div>

<div class="father" style="margin-top:80px;">
　  <div class="son"></div>
</div>
<div class="father" style="margin-top:80px;">
　  <div class="son" style="margin-top:80px;"></div>
</div>
```

**解决margin-top合并**

- 父元素设置为**块状格式化上下文元素**（overflow：hidden）
- 父元素设置border-top值
- 父元素设置padding-top值
- 父元素和第一个子元素之间添加内联元素进行分隔

**解决margin-bottom合并**

- 父元素设置为**块状格式化上下文元素**（overflow：hidden）
- 父元素设置border-bottom值
- 父元素设置padding-bottom值
- 父元素和第一个子元素之间添加内联元素进行分隔
- 父元素设置height、min-height或max-height

#### margin合并的计算规则

##### 正正取大值

##### 正负值相加

##### 负负最负值

### 深入理解 CSS 中的 margin:auto

#### 触发条件

> **width或height为auto时**;元素是具**有对应方向的自动填充特性**

#### 填充规则

> 填充闲置尺寸

- 如果一侧定值，一侧auto，则auto为剩余空间大小
- 如果两侧均是auto，则平分剩余空间

#### 应用

左右对齐

```css
.father {
    width: 300px;
    margin: auto;
    background-color: #f0f3f9;
}
.son {
    width: 200px;
    height: 120px;
    margin-left: auto;
    background-color: #cd0000;
}
<div class="father">
	<div class="son"></div>
</div>
```

## 功勋卓越的 border 属性
### 了解各种 border-style 类型

#### 应用

**三道杠**

```css
.icon-menu {
　 width: 120px;
　 height: 20px;
　 border-top: 60px double;
　 border-bottom: 20px solid;
}
```



### border-color 和 color

> **border-color默认颜色就是color色值**;没有指定**border-color颜色值**的时候，会使用当前元素的**color计算值作为边框色**

### border 与透明边框技巧 

#### 增加点击区域大小

```css
.icon-clear {
　 width: 16px;
　 height: 16px;
　 border: 11px solid transparent;
}
```

# 第 5 章 内联元素与流
## 字母 x—CSS 世界中隐匿的举足轻重的角色 

![x-height](F:\markdown-笔记\css世界\x-height.png)

- ascender height: 上下线高度
- cap height: 大写字母高度
- median: 中线
- descender height: 下行线高度

#### 字母x与CSS中的ex

> ex是CSS中的一个相对单位;**小写字母x的x-height**

http://demo.cssworld.cn/5/1-1.php

#### 注意

- vertical-align:middle
  - 指的是基线往上1/2 x-height高度;**内联元素垂直居中是对文字**

## 内联元素的基石 line-height

### 内联元素的高度之本——line-height

> 定了用来计算行框盒子高度的基础高度;**通过改变“行距”来实现**

http://demo.cssworld.cn/5/2-2.php

![x-height2](F:\markdown-笔记\css世界\x-height2.png)

#### “行距”

> “行距”的作用是可以瞬间明确我们的阅读方向，让我们阅读文字更轻松
>
> **行距 = line-height - font-size** 

- 传统印刷的“行距”
  - 上下两行文字之间预留的间隙
- 在CSS中
  - “行距”分散在当前文字的上方和下方

#### "半行距"

> 当前文字的上方和下方；这个“行距”的高度仅仅是完整“行距”高度的一半

#### 计算公式

> **半行距 = (line-height - font-size )/2;**

### 为什么 line-height 可以让内联元素“垂直居中” 

> **CSS中“行距的上下等分机制”**

#### 近似垂直居中

> 文字字形的垂直中线位置普遍要比真正的“行框盒子”的垂直中线位置低

```css
p {
　 font-size: 80px;
　 line-height: 120px;
　 background-color: #666;
　 font-family: 'microsoft yahei';
　 color: #fff;
}

<p>微软雅黑</p>
```

#### 多行文本垂直居中

```css
.box {
　 line-height: 120px;
　 background-color: #f0f3f9;
}
.content {
　 display: inline-block;
　 line-height: 20px;
　 margin: 0 20px;
　 vertical-align: middle;
}
<div class="box">
　 <div class="content">基于行高实现的...</div>
</div>
```

http://demo.cssworld.cn/5/2-4.php

### 深入 line-height 的各类属性值 

#### line-height:normal

> 是一个变量

![3](F:\markdown-笔记\css世界\3.png)

**不同系统不同浏览器的默认line-height都是有差异**

#### line-height应该重置为多大的值,是使用数值、百分比值还是长度值

##### 数值

> 如line-height:1.5，其最终的计算值是和当前font-size相乘后的值

##### 百分比值

> 如line-height:150%，其最终的计算值是和当前font-size相乘后的值

##### 长度值

> 也就是带单位的值，如line-height:21px或者line-height:1.5em;最终的计算值是和当前font-size相乘后的值

##### 区别

- 使用数值；所有的子元素继承的**都是这个值**
- 使用百分比值或者长度值；所有的子元素继承的是**最终的计算值**

#### 应用

##### 重图文内容展示的网页或者网站

> 考虑到文章阅读的舒适度，line-height值可以设置在1.6～1.8

##### 偏重布局结构精致的网站

> 长度值或者数值

### 内联元素 line-height 的“大值特性”

> 终父级元素的高度都是由**数值大的那个line-height决定**

## line-height 的好朋友 vertical-align 
### vertical-align 家族基本认识

#### 线类

> 如baseline（默认值）、top、middle、bottom

#### 文本类

> 如text-top、text-bottom；

#### 上标下标类

> 如sub、super

#### 数值百分比类

> 如20px、2em、20%等

### vertical-align 作用的前提

> 只能作用在display计算值为**inline、inline- block，inline-table或table-cell**的元素上

### vertical-align 和 line-height 之间的关系

```css
.box { line-height: 32px; }
.box > span { font-size: 24px; }
<div class="box">
　 x<span>文字</span>
</div>
```

> 对字符而言，**font-size越大字符的基线位置越往下，因为文字默认全部都是基线对齐，所以当字号大小不一样的两个文字在一起的时候，彼此就会发生上下位移，如果位移距离足够大，就会超过行高的限制，而导致出现意料之外的高度**

### 深入理解 vertical-align 线性类属性值 

#### inline-block与baseline

> 一个i**nline-block元素，如果里面没有内联元素，或者overflow不是visible，则该元素的基线就是其margin底边缘；否则其基线就是元素里面最后一行内联元素的基线**.

#### vertial-align:top/bottom

- 内联元素：元素底部和当前行框盒子的顶部对齐
- table-cell元素：元素底padding边缘和表格行的顶部对齐

#### vertial-align:middle

- 内联元素：元素的垂直中心点和行框盒子基线往上1/2 x-height处对齐
- table-cell元素：单元格填充盒子相对于外面的表格行居中对齐

### 深入理解 vertical-align 文本类属性值 

#### vertical-align:text-top

> 盒子的顶部和父级内容区域的顶部对齐

#### vertical-align:text-bottom

> 盒子的底部和父级内容区域的底部对齐

### 简单了解 vertical-align 上标下标类属性值 

#### vertical-align:super

> 提高盒子的基线到父级合适的上标基线位置

#### vertical-align:sub

> 降低盒子的基线到父级合适的下标基线位置。

### 无处不在的 vertical-align
### 基于 vertical-align 属性的水平垂直居中弹框 
# 第 6 章 流的破坏与保护
##  魔鬼属性 float
### float 的本质与特性 

> 浮动的本质就是为了**实现文字环绕效果**。**而这种文字环绕，主要指的就是文字环绕图片显示的效果**

#### 特性

##### 包裹性

##### 块状化并格式化上下文

> 元素一旦float的属性值不为none，则其display计算值就是block或者table

##### 破坏文档流

##### 没有任何margin合并

### float 的作用机制 

> **行框盒子如果和浮动元素的垂直高度有重叠，**
>
> **则行框盒子在正常定位状态下只会跟随浮动元素，而不会发生重叠**
>
> **由于浮动元素的塌陷，块状盒子是和图片完全重叠;**
>
> **块状盒子中的“行框盒子”却被浮动元素限制，没有任何的重叠**

```css
.father { width: 200px; }
.float { float: left; }
.float img { width: 128px; }
<div class="father">
	　  <div class="float">
	　　 <img src="https://demo.cssworld.cn/images/common/m/1.jpg">
	　 </div>
</div>
<p class="animal">小猫1，小猫2，...</p>
```



### float 更深入的作用机制

#### 浮动锚点

> 是float元素所在的“流”中的一个点，这个点本身并不浮动，就表现而言更像一个没有margin、border和padding的空的内联元素

#### 浮动参考

> 是浮动元素对齐参考的实体:**float元素的“浮动参考”是“行框盒子”，也就是float元素在当前“行框盒子”内定位**

### float 与流体布局 

```css
<div class="father">
　 <img src="me.jpg">
　 <p class="animal">小猫1，小猫2，...</p>
</div>
.father {
　 overflow: hidden;
}
.father > img {
　 width: 60px; height: 64px;
　 float: left;
}
.animal {
　 margin-left: 70px;
}
```

> .animal元素没有浮动，也没有设置宽度，**因此，流动性保持得很好，设置margin-left、border-left或者padding-left都可以自动改变content box的尺寸，继而实现了宽度自适应布局效果**

## float 的天然克星 clear
### 什么是 clear 属性 

> **clear属性是让自身不能和前面的浮动元素相邻，注意这里“前面的”3个字的”浮动元素是不闻不问的**

### 成事不足败事有余的 clear

> clear属性只有块级元素才有效;

```css
.clear:after {
　 content: '';
　 display: table;　 // 也可以是'block'，或者是'list-item'
　 clear: both;
}
```

> **由于clear:both的作用本质是让自己不和float元素在一行显示，并不是真正意义上的清除浮动**

## CSS 世界的结界—BFC 
### BFC 的定义

> “CSS世界的结界”;通过一些特定的手段形成的封闭空间，里面的人出不去，外面的人进不来，具有极强的防御力

#### 表现原则

- BFC元素是不可能发生margin重叠
- BFC元素清除浮动

#### 触发BFC条件

- <html>根元素
- float的值不为none
- overflow的值为auto、scroll或hidden
- display的值为table-cell、table-caption和inline-block中的任何一个
- position的值absolute

### BFC 与流体布局

```css
img { float: left; }
.animal { overflow: hidden; }
<div class="father">
　 <img src="me.jpg">
　 <p class="animal">小猫1，小猫2，...</p>
</div>
```

> 通流体元素在设置了overflow:hidden后，会自动填满容器中除了浮动元素以外的剩余空间，形成自适应布局效果，而且这种自适应布局要比纯流体自适应更加智能

## 最佳结界 overflow 
### overflow 剪裁界线 border box

> 当子元素内容超出容器宽度高度限制的时候，剪裁的边界是**border box的内边缘**

#### 注意

> 要尽量避免滚动容器设置padding-bottom值，除了样式表现不一致外，还会导致scrollHeight值不一样

- Chrome:如果容器可滚动（假设是垂直滚动），则**padding-bottom也算在滚动尺寸之内**
- IE和Firefox浏览器**忽略padding-bottom**

### overflow 与锚点定位 

#### 触发条件

- URL地址中的锚链与锚点元素对应并有交互行为
  - **由”内而外”的锚点定位会触发窗体的重定位，也就是说，如果页面也是可以滚动的，则点击选项卡按钮后页面会发生跳动**
- **可focus的锚点元素处于focus状态**
  - 类似链接或者按钮、输入框等可以被focus的元素在被focus时发生的页面重定位现
  - 页面窗体就有滚动条，绝大多数情况下，也都不会发生跳动现象

#### 锚点定位作用的本质

> 通过改变容器滚动高度或者宽度来实现;容器的滚动高度，而不是浏览器的滚动高度;**而且定位行为的发生是由内而外**

##### 定位行为的发生是由内而外

> **普通元素和窗体同时可滚动的时候，会由内而外触发所有可滚动窗体的锚点定位行为**

##### overflow:hidden跟overflow:auto和overflow：scroll

> 别就在于有没有那个滚动条。元素设置了overflow:hidden声明，**里面内容高度溢出的时候，滚动依然存在，仅仅滚动条不存在**

## float 的兄弟 position:absolute

> 当a**bsolute和float同时存在的时候**，f**loat属性是无任何效果的**

### absolute 的包含块 

> **元素用来计算和定位的一个框**

#### 计算规则

1. **根元素（很多场景下可以看成是<html>）**被称为“**初始包含块**”，其尺寸等同于浏览器可视窗口的大小

2. position是relative或者static，则“**包含块”由其最近的块容器祖先盒的content box边界形成**

3. position:fixed,是“初始包含块”

4. position:absolute，则“包含块”由最近的position不为static的祖先元素建立

   1. 内联元素也可以作为“包含块”所在的元素

      > 内联元素的“包含块”是由“生成的”前后内联盒子决定的，与里面的内联盒子细节没有任何关系

   2. 包含块”所在的元素不是父块级元素，而是最近的position不为static的祖先元素或根元素

      1. 绝对定位元素默认的最大宽度就是“包含块”的宽度

   3. 边界是**padding box而不是content box**

      > 增加了我们日后开发维护的成本，因为绝对定位元素的定位值和列表容器的padding值耦合在一起了:我们对padding间距进行调整的时候，绝对定位元素的right、top值也一定要跟着一起调整，否则就会出现样式问题

### 具有相对特性的无依赖 absolute 绝对定位

> 一个绝对定位元素，没有任何left/top/right/bottom属性设置，并且其祖先元素全部都是非定位元素:**当前位置**

#### 特性

- 代码更简洁
- **相对定位特性:仅仅是不占据CSS流的尺寸空间而已**

## absolute 与 overflow

> 如果**overflow不是定位元素**，**同时绝对定位元素和overflow容器之间也没有定位元素**，则overflow无法对absolute元素进行剪裁

> 如果overflow的属性值不是hidden而是auto或者scroll，即使绝对定位元素高宽比overflow元素高宽还要大，也都不会出现滚动条

#### 作用

- 局部滚动的容器中模拟近似position:fixed的效果

## absolute 与 clip

> clip属性要想起作用，元素必须是**绝对定位或者固定定位**

### 重新认识的 clip 属性

#### fixed固定定位的剪裁

> overflow属性往往就力不能及了，因为fixed固定定位元素的包含块是根元素，除非是根元素滚动条，普通元素的overflow是根本无法对其进行剪裁的;**但是clip可以**

#### 最佳可访问性隐藏

> 它具**有更强的普遍适应性，任何元素、任何场景都可以无障碍使用**

### 深入了解 clip 的渲染

- **clip隐藏仅仅是决定了哪部分是可见的**，**非可见部分无法响应点击事件等**
- 视觉上隐藏，但是元素的**尺寸依然是原本的尺寸**，在IE浏览器和Firefox浏览器下抹掉了不可见区域尺寸对布局的影响，Chrome浏览器却保留了

## absolute 的流体特性
### 当 absolute 遇到 left/top/right/bottom 属性 

> absolute元素才真正变成绝对定位元素

> 如果我们仅设置了一个方向的绝对定位,没有设置方向依然保持了相对特性

### absolute 的流体特性 

> **流体特性:对立方向同时发生定位的时候**

> 设置了对立定位属性的绝对定位元素的**表现神似普通的<div>元素，无论设置padding还是margin，其占据的空间一直不变，变化的就是content box的尺寸**

### absolute 的 margin:auto 居中 

```css
.element {
　 width: 300px; height: 200px;
　 position: absolute; 
　 left: 0; right: 0; top: 0; bottom: 0;
　 margin: auto;
}
```



## position:relative 才是大哥  
### relative 与定位 

#### 相对自身

#### 无侵入

> **当relative进行定位偏移的时候，一般情况下不会影响周围元素的布局**

### relative 的最小化影响原则 

1. 尽量不使用relative，如果想定位某些元素，看看能否使用“无依赖的绝对定位”
2. 如果场景受限，一定要使用relative，则该relative务必最小化

## 强悍的 position:fixed 固定定位
### position:fixed 不一样的“包含块”

> 唯一可以限制固定定位元素的就是<html>根元素

# 第 7 章 CSS 世界的层叠规则 
## 理解 CSS 世界的层叠上下文和层叠水平 
### 什么是层叠上下文 

> **自成一个小世界。这个小世界中可能有其他的“层叠结界”，而自身也可能处于其他“层叠结界”中**

### 什么是层叠水平 

> 同一个层叠上下文中元素在z轴上的显示顺序

## 理解元素的层叠顺序

> 元素发生层叠时有着特定的垂直显示顺序

![css3](F:\markdown-笔记\css世界\css3.png)

## 务必牢记的层叠准则

### 谁大谁上

> 当具有明显的层叠水平标识的时候，如生效的z-index属性值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个

### 后来居上

> 当元素的层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素

## 深入了解层叠上下文

### 层叠上下文的特性 

- **层叠上下文的层叠水平**要比**普通元素高**
- **层叠上下文可以阻断元素的混合模式**
- **层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的“层叠上下文”**
- **每个层叠上下文和兄弟元素独立，也就是说，当进行层叠变化或渲染的时候，只需要考虑后代元素**
- **每个层叠上下文是自成体系的，当元素发生层叠的时候，整个元素被认为是在父层叠上下文的层叠顺序中**

### 层叠上下文的创建 

#### 天生派

> 页面根元素天生具有层叠上下文，称为根层叠上下文。

#### 正统派

> **z-index值为数值的定位元素的传统“层叠上下文”**。

> **position值为relative/absolute以及Firefox/IE浏览器（不包括Chrome浏览器）下含有position:fixed声明的定位元素，当其z-index值不是auto的时候，会创建层叠上下文**

#### 扩招派

> 其他CSS3属性

- 元素为flex布局元素（父元素display:flex|inline-flex），同时z-index值不是auto
- 元素的opacity值不是1
- 元素的transform值不是none
- 元素mix-blend-mode值不是norma
- 元素的filter值不是none
- 元素的isolation值是isolate
- 元素的will-change属性值为上面2～6的任意一个（如will-change:opacity、will-chang:transform等）
- 元素的-webkit-overflow-scrolling设为touch

### 层叠上下文与层叠顺序 

- **如果层叠上下文元素不依赖z-index数值，则其层叠顺序是z-index:auto，可看成z:index:0级别**
- **如果层叠上下文元素依赖z-index数值，则其层叠顺序由z-index值决定**

## z-index 负值深入理解 

> **z-index负值渲染的过程就是一个寻找第一个层叠上下文元素的过程，然后层叠顺序止步于这个层叠上下文元素**

## z-index“不犯二”准则 

### 定位元素一旦设置了z-index值

> 从普通定位元素变成了层叠上下文元素，相互间的层叠顺序就发生了根本的变化，很容易出现设置了巨大的z-index值也无法覆盖其他元素的问题

### 避免z-index“一山比一山高”的样式混乱问题

# 第 8 章 强大的文本处理能力
## line-height 的另外一个朋友 font-size 
### font-size 和 vertical-align 的隐秘故事

> line-height的部分类别属性值是相对于font-size计算的，vertical-align百分比值属性值又是相对于line-height计算的

### 理解 font-size 与 ex、 em 和 rem 的关系

> font-size值越大，自然ex对应的大小也就大

> em相对于当前元素，rem相对于根元素，本质差别在于当前元素是多变的，根元素是固定的，也就是说，如果使用rem，我们的计算值不会受当前元素font-size大小的影响

### 理解 font-size 的关键字属性值 

> font-size默认值是medium，而medium计算值仅与浏览器设置有关

### font-size:0 与文本的隐藏 

> **并不是所有小于12px的font-size都会被当作12px处理，有一个值例外，那就是0，也就是说，如果font-size:0的字号表现就是0，那么文字会直接被隐藏掉，并且只能是font-size:0，哪怕设置成font-size:0.0000001px，都还是会被当作12px处理的**

## 字体属性家族的大家长 font-family
### 了解衬线字体和无衬线字体

#### 衬线字体

> 笔画开始、结束的地方有额外装饰而且笔画的粗细会有所不同的字体

#### 无衬线字体

> 没有这些额外的装饰，而且笔画的粗细差不多

### 等宽字体的实践价值 

> font-family: Consolas, Monaco, monospace; 

#### 等宽字体与代码呈现

> 利于代码呈现

#### ch单位与等宽字体布局

> ch相关的字符是0，就是阿拉伯数字0;1ch表示一个0字符的宽度，所以6个0所占据的宽度就是6ch

## 字体家族其他成员
### 貌似粗犷、实则精细无比的 font-weight

> **用数值作为font-weight属性值，必须是100～900的整百数**

### 具有近似姐妹花属性值的 font-style

#### italic

> 用当前字体的斜体字体

#### oblique

> 单纯地让文字倾斜

## font 属性 
### 作为缩写的 font 属性

> font-size和font-family是必需的

### 使用关键字值的 font 属性

> 使用关键字作为属性值的时候必须是独立的，不能添加font-family或者font-size之类

### font 关键字属性值的应用价值

> 希望非Windows系统下不要使用“微软雅黑”字体，而是使用其系统字体

```css
html { font: menu; }
body { font-size: 16px; }

html { font: small-caption; }
body { font-size: 16px; }

html { font: status-bar; }
body { font-size: 16px; }
```

**让网页的字体跟系统走**

## 真正了解@font face 规则
### @font face 的本质是变量

```css
@font-face {
　font-family: 'example';
　src: url(example.ttf);
　font-style: normal;
　font-weight: normal;
　unicode-range: U+0025-00FF;
}
```

#### font-family

> font-family可以看成是**一个字体变量**;
>
> **原本系统就有的字体名称,不能随便设置**

#### src

> 引入的字体资源可以是系统字体，也可以是外链字体

- 使用系统安装字体
  - local()
- 使用外链字体
  - url()

#### font-style

> **重置对应字体样式或字重下该使用什么字体**

#### font-weight

> **它定义了不同字重、使用不同字体**

#### unicode-range

> 让特定的字符或者特定范围的字符使用指定的字体

## 文本的控制
### text-indent 与内联元素缩进 

> 对文本进行缩进控制



- text-indent的百分比值是相对于当前元素的“包含块”计算的，而不是当前元素
- 仅对第一行内联盒子内容有效
- 非替换元素以外的display计算值为inline的内联元素设置text-indent值无效，如果计算值是inline-block/inline-table则会生
- `<input>`标签按钮text-indent值无效
- `<button>`标签按钮text-indent值有效(有兼容问题)
- `<input>和<textarea>`输入框的text-indent在低版本IE浏览器下有兼容问题

### letter-spacing 与字符间距

> 控制字符之间的间距，这里说的“字符”包括英文字母、汉字以及空格等

#### 特性

- 继承性
- 默认值是normal而不是0
- 支持负值，且值足够大的时候，会让字符形成重叠，甚至反向排列（非IE浏览器）
- 和text-indent属性一样，无论值多大或多小，第一行一定会保留至少一个字符
- 支持小数值，即使0.1px也是支持的，但并不总能看到效果，这与屏幕的密度有关
- 暂不支持百分比值

### word-spacing 与单词间距

> 增加空格的间隙宽度;**是作用在“空格”上**

### 了解 word-break 和 word-wrap 的区别 

#### word-break

> 是所有的都换行，毫不留情，一点儿空隙都不放过

#### word-wrap

> 如果这一行文字有可以换行的点，如空格或CJK（中文/日文/韩文）之类的，就不打英文单词或字符的主意了，在这些换行点换行，至于对不对齐、好不好看则不关心

### white-space 与换行和空格的控制 

#### white-space的处理模型

> 如何处理元素内的空白字符

#### white-space与最大可用宽度

> 当white-space设置为nowrap的时候，元素的宽度此时表现为“最大可用宽度”，换行符和一些空格全部合并，文本一行显示

### 如何解决 text-decoration 下划线和文本重叠的问题

>  border

```css
a {
　text-decoration: none;
　border-bottom: 1px solid;
}
```

# 第 9 章 元素的装饰与美化
##  CSS 世界的 background 很单调
### 隐藏元素的 background-image 到底加不加载 
#### 一个元素如果display计算值为none

- 在IE浏览器下（IE8～IE11，更高版本不确定）依然会发送图片请求
- Firefox浏览器不会
- 至于Chrome和Safari浏览器则似乎更加智能一点
  - 如果隐藏元素同时又设置了background-image，则图片依然会去加载
  - 如果父元素的display计算值为none，则背景图不会请求，此时浏览器或许放心地认为这个背景图暂时是不会使用的

# 第 10 章 元素的显示与隐藏 

## 隐藏实践

### 元素不可见，同时不占据空间；辅助设备无法访问，同时不渲染

```html
<script type="text/html">
　<img src="1.jpg">
</script>
```

### 元素不可见，同时不占据空间；辅助设备无法访问，但资源有加载，DOM可访问

```css
.dn {
　display: none;
}
```

### 元素不可见，同时不占据空间；辅助设备无法访问，但显隐的时候可以有transition淡入淡出效果

```css
.hidden {
　position: absolute;
　visibility: hidden;
}
```

### 元素不可见，不能点击，辅助设备无法访问，但占据空间保留

```css
.vh {
　visibility: hidden;
}
```

### 元素不可见，不能点击，不占据空间，但键盘可访问

```css
.clip {
　position: absolute; 
　clip: rect(0 0 0 0);
}
.out {
　position: relative; 
　left: -999em;
}
```

### 元素不可见，不能点击，但占据空间，且键盘可访问

```css
.lower {
  position: relative;
　z-index: -1;
}
```

### 元素不可见，但可以点击，而且不占据空间

```css
.opacity {
　position: absolute;
　opacity: 0;
　filter: Alpha(opacity=0);
}
```

### 元素看不见，但位置保留，依然可以点可以选

```css
.opacity {
　opacity: 0;
　filter: Alpha(opacity=0);
}
```

## display 与元素的显隐 

### display:none元素的background-image图片不加载

- **Firefox浏览器下不加载；包括父元素display:none也是如此**
- Chrome和Safari浏览器
  - **父元素display:none，图片不加载**
  - **本身背景图所在元素隐藏，则图片依旧会去加载**
- **对IE浏览器而言**，**无论怎样都会请求图片资源**

### display:none元素的image图片所有浏览器下依旧都会请求图片资源

### 一些属性也是天然display:none

#### hidden类型的<input>输入框

### 动画实现

- **display:none显隐控制并不会影响CSS3 animation**
- **会影响CSS3 transition过渡效果执行**（**transition往往和visibility属性走得比较近**）

## visibility 与元素的显隐
### 不仅仅是保留空间这么简单

### visibility的继承性

> 父元素设置visibility:hidden，子元素也会看不见

### visibility与CSS计数器

> visibility:hidden不会影响计数器的计数

### visibility与transition

> CSS3 transition支持的CSS属性中有visibility，但是并没有display

# 第 11 章 用户界面样式
## 和 border 形似的 outline 属性 

> 语法和border属性非常类似，分宽度、类型和颜色，支持的关键字和属性值与border属性一模一样

### 万万不可在全局设置 outline:0 none 

> 在默认状态下，对处于focus状态的元素，浏览器会通过虚框或者外发光的形式进行区分和提示;
>
> 这种虚框或者外发光效果是非常有必要的，否则用户根本就不知道自己当前聚焦在哪个元素上，甚至因此而迷失

### 真正的不占据空间的 outline 及其应用 

> outline属性确实不占据任何空间，轮廓宽度设置得再宽广，也不会影响任何元素的任何布局，并且outline轮廓是可穿透的

#### 应用

##### 头像剪裁的矩形镂空效果

```css
.crop-area {
    position: absolute;
    left: 88px; top: 56px;
    outline: 256px solid #000;
    outline: 256px solid rgba(0,0,0,.5);
    background: url(about:blank);
    background: linear-gradient(to top, transparent, transparent);
    filter: alpha(opacity=50);
    cursor: move;
}
```

https://demo.cssworld.cn/11/1-1.php

##### 自动填满屏幕剩余空间的应用技巧

```css
.footer {
　height: 50px;
}
.footer > p {
　position: absolute;
　left: 0; right: 0;
　text-align: center;
　padding: 15px 0;
　background-color: #a0b3d6;
　outline: 9999px solid #a0b3d6;
　clip: rect(0 9999px 9999px 0);
}
```

# 第 12 章 流向的改变 
## 改变水平流向的 direction 
### direction 简介

```css
.direction {
    direction: ltr;　 // 默认值
    direction: rtl;
}
```

#### 应用

##### 如何处理这种不同设备、不同按钮顺序的问题

```css
@media screen and (max-width: 480px) {
　.dialog-footer { direction: rtl; }
}
```

##### directionL:rtl还可以让text-justify两端对齐元素，最后一行落单的元素右对齐显示

> 只要是**内联元素，只要与书写流相关，都可以试试direction属性**

##  改变 CSS 世界纵横规则的 writing-mode 
### writing-mode 原本的作用

> **用来实现文字竖向呈现**

```css
.writing-mode {
    writing-mode: lr-tb | tb-rl | tb-lr (IE8+);
	writing-mode: horizontal-tb | vertical-rl | vertical-lr;
}
```

### writing-mode 不经意改变了哪些规则

#### 普通块元素可以使用margin:auto实现垂直居中

- 图片元素 http://demo.cssworld.cn/12/2-2.php
- 普通块状元素

#### 水平方向也能margin合并

#### 使用text-align:center实现图片垂直居中

#### 使用text-indent实现文字下沉效果

```css
.btn:active {
　text-indent: 2px;
}
.verticle-mode {
　writing-mode: tb-rl;　　
　writing-mode: vertical-rl;
}
```

http://demo.cssworld.cn/12/2-5.php

#### 实现全兼容的icon fonts图标的旋转效果

http://demo.cssworld.cn/12/2-6.php

#### 利用高度的高度自适应布局

> **当文档变成垂直流的时候，height高度天然自适应**

### writing-mode 和 direction 的关系 

#### writing-mode

> 改变**文档流为垂直方向**

#### direction 

> 改变的是**垂直方向的内联元素的文本方向**