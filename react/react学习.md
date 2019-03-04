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

怎样解决使用 

**react-addons-update**



