# 函数式编程

## 函数式编程功能意味

JavaScript支持函数式编程，**因为JavaScript函数是一等公民**。这意味着函数可以执行变量可以执行的操作；
函数可以表示应用程序中的数据；**功能就是数据。它们可以像变量一样保存，检索或流经应用程序**

## 命令编程与函数编程

### 函数式编程

```javascript
const string = "This is the mid day show with Cheryl Waters" const urlFriendly = string.replace(/ /g, "-")
console.log(urlFriendly)
```



是更大的编程范式的一部分：**声明性编程**。声明性编程是一种编程风格，

- 其中**应用程序的结构优先于描述在定义应该如何发生时应该发生的事情**;
- 语法本身**描述了应该发生的事情以及事情发生的细节被抽象出来**;
- 具**可读性，因此更容易推理**

### 命令式程序

```javascript
var string = "This is the midday show with Cheryl Waters"; var urlFriendly = "";
for (var i=0; i<string.length; i++) 
{ 
   if (string[i] === " ") {
       urlFriendly += "-"; }else{
       urlFriendly += string[i];
   }
}
    console.log(urlFriendly);
```

需要**大量注释才能理解正在发生的事情**

## 函数式编程概念

### 不变性

变异是要改变，所以不可改变是不可改变的。在功能程序中，数据是不可变的。它永远不会改变。
。我们**不是更改原始数据结构**，而是构建**这些数据结构的更改副本并使用它们**。

```javascript
let color_lawn = { 
    title: "lawn",
    color: "#00FF00",
    rating: 0
}
function rateColor(color, rating) { 
    color.rating = rating
return color
}
console.log(rateColor(color_lawn, 5).rating) // 5
console.log(color_lawn.rating) // 5
// 或者
var rateColor = function(color, rating) {
return Object.assign({}, color, {rating:rating})
}
console.log(rateColor(color_lawn, 5).rating) // 5
console.log(color_lawn.rating)
```

在JavaScript中，函数参数是对**实际数据的引用**。像这样设置颜色的评级是不好的，**因为它会改变或改变原始颜色对象。** 

使用Object.assign来更改颜色评级。 Object.assign是复制机器;它需要一个空白对象，将颜色复制到该对象，**并覆盖副本上的评级**。现在我们可以**拥有一个新评级的颜色对象，而无需更改原始颜色。**

### 纯函数

纯函数是一个函数，**它返回一个基于其参数计算的值**

```javascript
var frederick = {
    name: "Frederick Douglass", 
    canRead: false,
    canWrite: false
}
function selfEducate() { 
    frederick.canRead = true 
    frederick.canWrite = true 
    return frederick
}
selfEducate()
console.log( frederick )
// {name: "Frederick Douglass", canRead: true, canWrite: true}
```

selfEducate函数不是纯函数。**它不接受任何参数，也不返回值或函数。它还改变了范围之外的变量**

```javascript
const frederick = {
    name: "Frederick Douglass", canRead: false,
    canWrite: false
}
const selfEducate = (person) => { 
    person.canRead = true person.canWrite = true
    return person
}
console.log( selfEducate(frederick) )
console.log( frederick )
// {name: "Frederick Douglass", canRead: true, canWrite: true}
// {name: "Frederick Douglass", canRead: true, canWrite: true}
```

这种selfEducate功能也是不纯的：它会引起副作用。调用此函数会**改变发送给它的对象**

```javascript
const frederick = {
	name: "Frederick Douglass", 
    canRead: false,
    canWrite: false
}
const selfEducate = person => ({
	...person, canRead: true, canWrite: true
})
console.log( selfEducate(frederick) )
console.log( frederick )
// {name: "Frederick Douglass", canRead: true, canWrite: true}
// {name: "Frederick Douglass", canRead: false, canWrite: false}
```

它根据发送给它的参数计算一个值：person。**它返回一个新的person对象，而不会改变发送给它的参数，因此没有副作用**

#### 在编写函数时，请尝试遵循这三个规则

1. **该函数应至少包含一个参数**
2. **该函数应返回一个值或另一个函数**
3. 该函数**不应更改或改变其任何参数**

# React中的数据和数据流

## 介绍状态

### 什么是state

**程序在给定时刻可以访问的所有信息**

### 可变和不可变的状态

在React组件中与状态进行**通信**和**交互**的方式属于这两个类别。在React中，这些被称为**state（在组件中更改的数据）**和**props（组件接收的数据不应被组件更改）**

以稍微扩展我们的可变和不可变的概念，以包括它们相应的数据结构类型

- 不可变 - 不可变的持久数据结构**随着时间的推移支持多个版本**，但**不能直接覆盖;不可变数据结构通常是持久**
- 可变 - 一个可变的，**短暂的数据结构**随着时间的**推移只支持一个版**本;**可变数据结构在更改时会被覆盖**，并且**不支持其他版本**

不可变和可变数据结构中的**持久性和短暂性**。**不可变或持久的数据结构通常记录历史记录并且不会改变**，而是创建随时间变化的版本。另一方面，**短暂的数据结构通常不记录历史并被消灭**

React以**可变的方式（可通过setState更改）**和**props以只读方式公开组件状态**

## state 在 react中

### React中的可变状态：组件状态

永远不要在React组件中直接**修改this.state**；必须**通过this.setState修改**；

**this.setState()不会立即改变this.state**,**State的更新是异步**;等到一定的时间，在全部一起执行；

```javascript
setState( 
    updater,
[callback] )
 callback = (prevState, props) => stateChange
```

使用过去的React版本，您可以**将对象而不是函数作为setState的第一个参数传递**。与当前版本的React（16及更高版本）的一个主要区别在于它可能意味着setState本质上是同步

如果需要根据**当前state或props进行状态更新**，可以通过prevState和props参数访问它们;当您想要**执行诸如切换布尔值以及在执行更新之前需要知道确切的最后一个值之类的操作时**

使用updater函数返回的对象，它执行浅合并到当前状态。这意味着您可以生成一个对象;**但只是浅合并**

```javascript
this.state = {
    user: {
    name: 'Mark', // 1 
    colors: {
        favorite: '', 
        }
    } 
};
this.setState({
    user: { // 2
    colors: { 
        	favorite: 'blue'
        } 
    }
});	
{this.state.name} // ''
```

**怎样解决使用** 

**react-addons-update**

### React中的不可变状态：props

**在React中，props是传递不可变数据的主要方式**。任何组件都可以接收道具（不仅仅是那些从React.Component继承的道具）并在构造函数，渲染和生命周期方法中使用它们.

React中的props或多或少是不可变的。您可以使用库和其他工具来模拟组件中的不可变数据结构， **React使用本机JavaScript Object.freeze**

**Props是从父组件或组件本身的defaultProps静态方法传递给React组件的数据**。

props可能会随着时间而变化，但不会从组件内部变化。这是单向数据流的一部分；

#### 在render方法中调用setState

会无限循环下去，一直更新dom，到最后就会报错

### 使用PropTypes and default props

**PropTypes提供了一个类型检查功能**，您可以在其中指定组件在使用时期望接收的props类型。您可以指定数据类型，甚至告诉组件使用者他们需要提供哪种类型的数据（例如，具有某些键的用户属性的对象）

它也不是React特有的 - 您可以在另一个想要对输入进行类型检查的库中轻松使用它；

请注意，您在组件类上设置的**静态属性的名称是小写**，而从**proptypes库访问的对象的名称是大写（PropTypes）**

**defaultProps的属性，用于为组件提供默认props**。使用默认**props**有助于确保您的组件具有运行所需的内容，即使使用该组件的某人忘记为其提供**props**也是如此

```javascript
class Counter extends React.Component {
    static propTypes = {
    incrementBy: PropTypes.number,
    onIncrement: PropTypes.func.isRequired 
  };
  static defaultProps = {
    incrementBy: 1
  };
}
```

### 无状态功能组件

如Flux和Redux。在这些情况下，您通常希望**将状态保持在集中位置，而不是分布在组件中**;

**可以创建一种仅使用props的组件：无状态功能组件**

无状态功能组件只是：一个**无法访问或使用React状态API的组件（或从React.Component继承的其他方法）**。它**是无状态的，不是因为它没有任何类型的（通用）状态**，而是因为它没有得到React将为您管理的支持实例

无状态功能组件**是功能性的**，因为它们可以**写为命名函数或分配给变量的匿名函数表达式**。它们**只接受props**，因为它们根据**给定的输入返回相同的输出**，基本上被认为是纯粹的。这使得它们更快，因为React可能通过**避免不必要的生命周期检查或内存分配来进行优化**

**即使在无状态功能组件上，您仍然可以defaultProps和propTypes**

```javascript
import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
function Greeting(props) {
  return <div>Hello {props.for}!</div>;
}

Greeting.propTypes = {
  for: PropTypes.string.isRequired
};

Greeting.defaultProps = {
  for: "friend"
};

render(<Greeting name="Mark" />, document.getElementById("root"));

```

将propTypes和defaultProps指定为**函数或变量的属性**

## 组件通信

让组件相互通信，你传递props，当你传递props时，你做了两件简单的事情

1. **访问父级数据（state或props）**
2. **将该数据传递给子组件**

## 单向数据流

每个实体都可以更新另一个，而是建立层次结构；可以通过组件传递数据，但**不能传递和修改其他组件的状态或props**而**不传递props。您也无法修改父级中的数据**

**但是您可以通过回调将数据传回层次结构**

单向流在构建UI时特别有用，因为它可以更容易地**考虑数据在应用程序中的移动方式**。由于组件的层次结构以及props和state本地化为组件的方式，通常更容易预测数据在应用程序中的移动方式

# React中的渲染和生命周期方法

## 渲染过程

### 介绍生命周期方法

生命周期是一种思考组件的方式。具有生命周期的组件具有隐喻的“生命” - 至少具有开始，中间和结束

**mounting, updating, and unmounting**

### 生命周期方法的类型

**生命周期方法可以分为两大类**

- **Will methods**—**事情发生之前调用**
- **Did methods** - **事情发生后立即调用**

组件的生命周期有四个主要部分，每个部分都有相应的生命周期方法

- **Initialization** - 正在**实例化组件类时**
- **Mounting** - 正在**将一个组件插入DOM中**
- **Updating** - 正在通过state或props使用新数据更新组件
- **Unmounting** - 正在**从DOM中删除组件**

在初始化期间以及**组件安装，更新和卸载之前和之后都会调用生命周期方法**。

![lifecycle_in_React.](https://raw.githubusercontent.com/NoahsDante/webNotes/master/react/image/1.png)

## 生命周期方法

### Initial and “will” methods

两个属性：defaultProps和state（initial）。这些属性有助于为组件提供初始数据

- defaultProps - 为组件提供默认道具
- state - 当您需要提供占位符内容，设置默认值等时

### Mounting安装组件

挂载是**React将组件插入真实DOM的过程**。完成后，您的组件“准备就绪”，**通常是执行HTTP调用或读取cookie等操作的好时机**。此时，您还可以通过名为ref的东西访问DOM元素

- **componentWillMount**
  - **它将提供在组件安装之前设置状态或执行其他操作的机会;**
  - **此方法中的状态所做的任何更改都不会触发重新渲染**
- componentDidMount 
  - **可以对DOM进行操作，这个函数之后ref变成实际的DOM**
  - **可以使用setState()方法触发重新渲染(re-render)**

### Updating 方法

Updating" 方法与与Mounting相关的方法之间的另一个区别是, 它**们为props和state提供了参数。您可以使用这些来确定是否应进行更新或对更改做出反应**

- **componentWillReceiveProps(nextProps)**
  - 在已经挂在的组件(mounted component)接收到新props时触发;
  - 只是**调用this.setState()而不是从外部传入props, 那么不会触发componentWillReceiveProps(nextProps)函数**；这就意味着: this.setState()方法不会触发componentWillReceiveProps()
- **shouldComponentUpdate(nextProps, nextState)**
  - 在接收到新props或state时；**在接收新的props或state时确定是否发生重新渲染，默认情况返回true，表示会发生重新渲染**
  - 方法如果**返回false**, 那么props或state发生改变的时候会**阻止子组件发生重新渲染**
- **componentWillUpdate(nextProps, nextState)**
  - **props或state发生改变**
  - **千万不要在这个函数中调用this.setState()方法.**
- **componentDidUpdate(prevProps, prevState)**
  - 在发生更新或componentWillUpdate(nextProps, nextState)后
  - **方法可以对组件中的DOM进行操作**

### Unmounting 方法

当在**不同的页面之间移动时, 将对删除组件进行分离**，**会调用componentWillUnmount**

