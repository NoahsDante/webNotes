# 动机

随着JavaScript单页面应用程序的要求变得越来越复杂,**代码必须管理比以往更多的状态**,此状态可以包括服务器响应和缓存数据，以及尚未持久保存到服务器的本地创建的数据。UI状态的复杂性也在增加，因为我们需要管理活动路径，选定选项卡，微调器，分页控件等;

管理这个不断变化的状态很难。如果**模型可以更新另一个模型，则视图可以更新模型，该模型会更新另一个模型，而这反过来可能会导致另一个视图更新**。在某些时候，您不再理解您的应用中发生了什么，因为您已经**失去了对其状态的时间，原因和方式的控制。**当系统不透明且不确定时，很难重现错误或添加新功能。

考虑**新要求在前端产品开发中变得普遍**。作为开发人员，我们期望处理乐观更新，服务器端呈现，在执行路由转换之前获取数据等等。我们发现自己试图管理以前从未处理过的复杂性;

这种复杂性很难处理，因为**我们混合**了人类思维难以推理的**两个概念**：**变异和异步性。**

在[Flux](http://facebook.github.io/flux)，[CQRS](http://martinfowler.com/bliki/CQRS.html)和[Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html)的步骤之后,Redux尝试**通过对更新发生的方式和时间施加某些限制**来使状态突变可预测**。这些限制反映在Redux 的[三个原则](https://redux.js.org/introduction/three-principles)

# 三个基本原则

## 唯一的事实来源

**整个应用程序都存储在一个对象树上的一个内store**

```javascript
var store = {
    visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
```



## State是只读的

**改变状态的唯一方法是发出一个动作，一个描述发生的事情的对象**

```javascript
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
```



## 使用纯函数进行更改

**要指定状态树如何通过操作转换**

```javascript
function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

import { combineReducers, createStore } from 'redux'
const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)
```

