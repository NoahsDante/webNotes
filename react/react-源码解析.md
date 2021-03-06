# 首次渲染（组件）

[React@16.8.2](https://unpkg.com/react@16.8.2/umd/react.development.js)

[React-dom@16.8.2](https://unpkg.com/react-dom@16.8.2/umd/react-dom.development.js)

## React.createElement()

所有由JSX写的语法都会被Babel转译成`React.createElement()`调用

```javascript
class Hello extends Component {
  render() {
    return (
      <div className=”App”> 
        Welcome to React
      </div>
    );
  }
}
// 转译
class Hello extends Component {
  render() {
    return React.createElement(
        ‘div’,
      { className: ‘App’ },
     ‘Welcome to React’
    );
  }
}
```

### React.createElement创建reactElement

```javascript
 class Hello extends React.Component {
     render() {
         return <div>Hello {this.props.name}</div>;
     }
 }
console.log(<Hello name="World" />);
ReactDOM.render(
    <Hello name="World" />,
    document.getElementById('container')
);
```

**调用栈是**

```javascript
React.createElement 
|=> createElement 
|=> ReactElement return element; 
element = {
    $$typeof: Symbol(react.element) // 元素类型
    key: null
    props: {name: "World"}
    ref: null
    type: ƒ Hello()
    _owner: null // 负责记录创建此组件的信息
    _store: {validated: false} // 便于比较ReactElements以进行测试
    // self和source是仅DEV的属性。
    _self: null
    _source: null // 考虑在两个不同的地方创建的两个元素
    __proto__: Object	
}
```

#### React.createElement

```JavaScript
// 3078
var React = {
  ...
  createElement: createElementWithValidation,
  ...
};
// 2988
function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type);
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString = void 0;
    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }
// 关键在这
  var element = createElement.apply(this, arguments);

  //如果使用模拟或自定义函数，结果可能为null。
  // TODO：当不再允许这些作为类型参数时删除它。
  if (element == null) {
    return element;
  }

  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}
```

#### createElement

```javascript
// 1936
// 创建并返回给定类型的新ReactElement
function createElement(type, config, children) {
  var propName = void 0;

  ...
 // 把 config里的数据一项一项拷入props
  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // 剩余的属性将添加到新的props对象中
    for (propName in config) {
      if (hasOwnProperty$1.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

 // 返回的参数不止一个,把参数除第2个往后的参数,当作字元素
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  ...
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
```

ReactElement.createElement(type, config, children)

1. 把 `config`里的数据一项一项拷入props
2. 拷贝 `children` 到 props.children
3. 拷贝 `type.defaultProps` 到 props

#### ReactElement

```javascript
// 1876
// 创建一个新的React元素
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // 此标记将其唯一标识为React元素
    $$typeof: REACT_ELEMENT_TYPE,

    // 属于元素的内置属性
    type: type,
    key: key,
    ref: ref,
    props: props,

    // 记录负责创建此元素的组件
    _owner: owner
  };

 ...

  return element;
};
```

## 渲染入口 - ReactDOM.render

react-dom是浏览器端渲染React应用的模块，通过ReactDOM.render(component, mountNode)可以对自定义组件/原生DOM/字符串进行挂载

```javascript
// 21079
var ReactDOM = {
     hydrate: function (element, container, callback) {
   	...
    // TODO: throw or warn if we couldn't hydrate?
    return legacyRenderSubtreeIntoContainer(null, element, container, true, callback);
  },
    // 渲染方法
  render: function (element, container, callback) {
    ...
    return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
  },
  unstable_renderSubtreeIntoContainer: function (parentComponent, element, containerNode, callback) {
   ...
    return legacyRenderSubtreeIntoContainer(parentComponent, element, containerNode, false, callback);
  },
}


```

**调用栈是**

```javascript
ReactDOM.render 
|=> legacyRenderSubtreeIntoContainer 
|=> var root = legacyCreateRootFromDOMContainer 
	|=> return new ReactRoot();
		|=> createContainer 
            |=> createFiberRoot return root;
				|=> createHostRootFiber
					|=> createFiber 
                    	|=> return new FiberNode
|=> root.render 
	|=> updateContainer 
    	|=> return updateContainerAtExpirationTime
        	|=> return scheduleRootUpdate
        		|=> scheduleWork
        			|=> requestWork
        				|=> performSyncWork(|scheduleCallbackWithExpirationTime)
        					|=> performWork
        						|=> performWorkOnRoot
        							|=> completeRoot
        								|=> commitRoot
        									|=> invokeGuardedCallback
        										|=> invokeGuardedCallbackImpl$1
        											|=> fakeNode.addEventListener(evtType, callCallback, false)
														|=> callCallback
															|=> func.apply(commitAllHostEffects.apply)
																|=> commitPlacement
																	|=> appendChildToContainer
																		|=> parentNode.appendChild(child)

```

### legacyRenderSubtreeIntoContainer

```javascript
function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  {
    topLevelUpdateWarnings(container);
  }

  var root = container._reactRootContainer;
  if (!root) {
    // 初始化安装
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
    if (typeof callback === 'function') {
      var originalCallback = callback;
      callback = function () {
        var instance = getPublicRootInstance(root._internalRoot);
        originalCallback.call(instance);
      };
    }
    // 不进行批量安装 初次渲染，需要尽快完成.
    unbatchedUpdates(function () {
      if (parentComponent != null) {
        root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
      } else {
        root.render(children, callback);
      }
    });
  } else {
    if (typeof callback === 'function') {
      var _originalCallback = callback;
      callback = function () {
        var instance = getPublicRootInstance(root._internalRoot);
        _originalCallback.call(instance);
      };
    }
    // 更新内容
    if (parentComponent != null) {
      root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
    } else {
      root.render(children, callback);
    }
  }
  return getPublicRootInstance(root._internalRoot);
}
```

legacyRenderSubtreeIntoContainer 把虚拟的dom树渲染到真实的dom容器中;

**root：**由`legacyCreateRootFromDOMContainer`生成，该函数会生成一个`FiberRoot`对象挂载到真实的dom根节点上，有了这个对象，执行该对象上的一些方法可以将虚拟dom变成dom树挂载到根节点上。
**unbatchedUpdates：**`DOMRenderer.unbatchedUpdates`的回调执行`root.legacy_renderSubtreeIntoContainer`或`root.render`。
**root.legacy_renderSubtreeIntoContainer 和 root.render：**如果有`parentComponent`，就执行`root.render`否则执行`root.legacy_renderSubtreeIntoContainer`

### legacyCreateRootFromDOMContainer

```javascript
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  var shouldHydrate = forceHydrate || shouldHydrateDueToLegacyHeuristic(container);
  // 首先清除任何现有内容
  if (!shouldHydrate) {
    var warned = false;
    var rootSibling = void 0;
    while (rootSibling = container.lastChild) {
      {
        if (!warned && rootSibling.nodeType === ELEMENT_NODE && rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)) {
          warned = true;
          warningWithoutStack$1(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.');
        }
      }
      container.removeChild(rootSibling);
    }
  }
  {
    if (shouldHydrate && !forceHydrate && !warnedAboutHydrateAPI) {
      warnedAboutHydrateAPI = true;
      lowPriorityWarning$1(false, 'render(): Calling ReactDOM.render() to hydrate server-rendered markup ' + 'will stop working in React v17. Replace the ReactDOM.render() call ' + 'with ReactDOM.hydrate() if you want React to attach to the server HTML.');
    }
  }
  // 默认情况下，传统根不是异步的.
  var isConcurrent = false;
  return new ReactRoot(container, isConcurrent, shouldHydrate);
}
```

该函数实际上返回的是由**构造函数`ReactRoot`创建的对象。其中如果在非ssr的情况下，将dom根节点清空;**

### ReactRoot

```javascript
function ReactRoot(container, isConcurrent, hydrate) {
  var root = createContainer(
      container, // ReactDOM.render(<div/>, container)的第二个参数，也就是一个元素节点
      isConcurrent, // 是否异步模式，默认false
      hydrate // 服务器端渲染标识 这里为false
  );
  this._internalRoot = root;
}
// 渲染
ReactRoot.prototype.render = function (children, callback) {
  var root = this._internalRoot;
  var work = new ReactWork();
  callback = callback === undefined ? null : callback;
  {
    warnOnInvalidCallback(callback, 'render');
  }
  if (callback !== null) {
    work.then(callback);
  }
  updateContainer(children, root, null, work._onCommit);
  return work;
};
// 销毁
ReactRoot.prototype.unmount = function (callback) {
  var root = this._internalRoot;
  var work = new ReactWork();
  callback = callback === undefined ? null : callback;
  {
    warnOnInvalidCallback(callback, 'render');
  }
  if (callback !== null) {
    work.then(callback);
  }
  updateContainer(null, root, null, work._onCommit);
  return work;
};
// 渲染 有父级组件的
ReactRoot.prototype.legacy_renderSubtreeIntoContainer = function (parentComponent, children, callback) {
  var root = this._internalRoot;
  var work = new ReactWork();
  callback = callback === undefined ? null : callback;
  {
    warnOnInvalidCallback(callback, 'render');
  }
  if (callback !== null) {
    work.then(callback);
  }
  updateContainer(children, root, parentComponent, work._onCommit);
  return work;
};
// 在createBatch中有调用，但是没发现createBatch在哪里被调用，所以，目前没发现什么作用
ReactRoot.prototype.createBatch = function () {
  var batch = new ReactBatch(this);
  var expirationTime = batch._expirationTime;

  var internalRoot = this._internalRoot;
  var firstBatch = internalRoot.firstBatch;
  if (firstBatch === null) {
    internalRoot.firstBatch = batch;
    batch._next = null;
  } else {
    // 插入按到期时间排序，然后按插入顺序排序
    var insertAfter = null;
    var insertBefore = firstBatch;
    while (insertBefore !== null && insertBefore._expirationTime >= expirationTime) {
      insertAfter = insertBefore;
      insertBefore = insertBefore._next;
    }
    batch._next = insertBefore;
    if (insertAfter !== null) {
      insertAfter._next = batch;
    }
  }

  return batch;
};
```

构造函数`ReactRoot`有render、unmount、legacy_renderSubtreeIntoContainer等原型方法外，同时还声明了一个和fiber相关的`_internalRoot`属性。

render 和 legacy_renderSubtreeIntoContainer原型方法都会去执行DOMRenderer.updateContainer方法更新容器内容，唯一差别就是第三个参数一个传`null`，一个传`parentComponent`。_internalRoot是由DOMRenderer.createContainer生成

### createContainer

```javascript
function createContainer(containerInfo, isConcurrent, hydrate) {
  return createFiberRoot(containerInfo, isConcurrent, hydrate);
}
function createFiberRoot(containerInfo, isConcurrent, hydrate) {
  var uninitializedFiber = createHostRootFiber(isConcurrent);
  var root = void 0;
  if (enableSchedulerTracing) {
    root = {
      current: uninitializedFiber,
      containerInfo: containerInfo,
      pendingChildren: null,

      earliestPendingTime: NoWork,
      latestPendingTime: NoWork,
      earliestSuspendedTime: NoWork,
      latestSuspendedTime: NoWork,
      latestPingedTime: NoWork,

      pingCache: null,

      didError: false,

      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      timeoutHandle: noTimeout,
      context: null,
      pendingContext: null,
      hydrate: hydrate,
      nextExpirationTimeToWorkOn: NoWork,
      expirationTime: NoWork,
      firstBatch: null,
      nextScheduledRoot: null,

      interactionThreadID: unstable_getThreadID(),
      memoizedInteractions: new Set(),
      pendingInteractionMap: new Map()
    };
  } else {
    root = {
      current: uninitializedFiber,
      containerInfo: containerInfo,
      pendingChildren: null,

      pingCache: null,

      earliestPendingTime: NoWork,
      latestPendingTime: NoWork,
      earliestSuspendedTime: NoWork,
      latestSuspendedTime: NoWork,
      latestPingedTime: NoWork,

      didError: false,

      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      timeoutHandle: noTimeout,
      context: null,
      pendingContext: null,
      hydrate: hydrate,
      nextExpirationTimeToWorkOn: NoWork,
      expirationTime: NoWork,
      firstBatch: null,
      nextScheduledRoot: null
    };
  }

  uninitializedFiber.stateNode = root;

  return root;
}
function createHostRootFiber(isConcurrent) {
  var mode = isConcurrent ? ConcurrentMode | StrictMode : NoContext;

  if (enableProfilerTimer && isDevToolsPresent) {

    mode |= ProfileMode;
  }

  return createFiber(HostRoot, null, null, mode);
}
var createFiber = function (tag, pendingProps, key, mode) {

  return new FiberNode(tag, pendingProps, key, mode);
};
function FiberNode(tag, pendingProps, key, mode) {

  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;


  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = null;
  this.memoizedState = null;
  this.contextDependencies = null;

  this.mode = mode;

  // Effects
  this.effectTag = NoEffect;
  this.nextEffect = null;

  this.firstEffect = null;
  this.lastEffect = null;

  this.expirationTime = NoWork;
  this.childExpirationTime = NoWork;

  this.alternate = null;

  if (enableProfilerTimer) {
   
    this.actualDuration = Number.NaN;
    this.actualStartTime = Number.NaN;
    this.selfBaseDuration = Number.NaN;
    this.treeBaseDuration = Number.NaN;

    this.actualDuration = 0;
    this.actualStartTime = -1;
    this.selfBaseDuration = 0;
    this.treeBaseDuration = 0;
  }

  {
    this._debugID = debugCounter++;
    this._debugSource = null;
    this._debugOwner = null;
    this._debugIsCurrentlyTiming = false;
    if (!hasBadMapPolyfill && typeof Object.preventExtensions === 'function') {
      Object.preventExtensions(this);
    }
  }
}
```

createContainer`创建`FiberRoot;

`react-dom`渲染模块调用`createContainer`创建容器、根fiber实例、FiberRoot对象等。所有`Fiber`对象都是`FiberNode`的实例，它有许多种类型，通过tag来标识，其中内部有很多方法来生成Fiber对象

- createFiberFromElement：type为类，无状态函数，元素标签名
- createFiberFromFragment：type为React.Fragment
- createFiberFromText：在JSX中表现为字符串，数字
- createFiberFromPortal：用于 createPortal
- createFiberRoot：用于ReactDOM.render的根节点

createFiberRoot就是创建了一个普通对象，里面current属性引用fiber对象，containerInfo属性引用ReactDOM.render(<div/>, container)的第二个参数，也就是一个元素节点，然后fiber对象的stateNode引用普通对象root

### root.render 

```javascript
ReactRoot.prototype.render = function (children, callback) {
  var root = this._internalRoot;
  var work = new ReactWork();
  callback = callback === undefined ? null : callback;
  {
    warnOnInvalidCallback(callback, 'render');
  }
  if (callback !== null) {
    work.then(callback);
  }
  updateContainer(children, root, null, work._onCommit);
  return work;
};
```

### updateContainer

```javascript
function updateContainer(element, container, parentComponent, callback) {
  var current$$1 = container.current;
  var currentTime = requestCurrentTime();
  var expirationTime = computeExpirationForFiber(currentTime, current$$1);
  return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback);
}
// 计算fiber超时时间
function computeExpirationForFiber(currentTime, fiber) {
  var priorityLevel = unstable_getCurrentPriorityLevel();
// 显示设置过期上下文
  var expirationTime = void 0;
  if ((fiber.mode & ConcurrentMode) === NoContext) {
     // 在提交阶段的更新任务
      // 需要明确设置同步优先级（Sync Priority）
    expirationTime = Sync;
  } else if (isWorking && !isCommitting$1) {
    // 在渲染阶段发生的更新任务
    // 需要设置为下一次渲染时间的到期时间优先级
    expirationTime = nextRenderExpirationTime;
  } else {
      // 不在任务执行阶段，需要计算新的过期时间
    switch (priorityLevel) {
      case unstable_ImmediatePriority:
        expirationTime = Sync;
        break;
      case unstable_UserBlockingPriority:
        expirationTime = computeInteractiveExpiration(currentTime);
        break;
      case unstable_NormalPriority:
        // This is a normal, concurrent update
        expirationTime = computeAsyncExpiration(currentTime);
        break;
      case unstable_LowPriority:
      case unstable_IdlePriority:
        expirationTime = Never;
        break;
      default:
        invariant(false, 'Unknown priority level. This error is likely caused by a bug in React. Please file an issue.');
    }

    // If we're in the middle of rendering a tree, do not update at the same
    // expiration time that is already rendering.
    if (nextRoot !== null && expirationTime === nextRenderExpirationTime) {
      expirationTime -= 1;
    }
  }

  // Keep track of the lowest pending interactive expiration time. This
  // allows us to synchronously flush all interactive updates
  // when needed.
  // TODO: Move this to renderer?
  if (priorityLevel === unstable_UserBlockingPriority && (lowestPriorityPendingInteractiveExpirationTime === NoWork || expirationTime < lowestPriorityPendingInteractiveExpirationTime)) {
    lowestPriorityPendingInteractiveExpirationTime = expirationTime;
  }

  return expirationTime;
}
```

**requestCurrentTime**获取当前已经花费的时间， 然后调用computeExpirationForFiber来确定我们的优先级;

**computeExpirationForFiber**会根据我们当前的工作类型，比如isWorking, isCommit, isAsync 等等来返回对应的优先级，第一次渲染默认都是Sync的情况。如果不是同步渲染的情况，既Interactive 或者 Async，这时候会根据我们 **前面requestCurrentTime获取的已花费时间** 调用相应的算法来确定优先级

### updateContainerAtExpirationTime

```javascript
// 根据渲染优先级更新dom
function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback) {
  // TODO: If this is a nested container, this won't be the root.
  // 引用fiber对象
  var current$$1 = container.current;

  {
    if (ReactFiberInstrumentation_1.debugTool) {
      if (current$$1.alternate === null) {
        ReactFiberInstrumentation_1.debugTool.onMountContainer(container);
      } else if (element === null) {
        ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);
      } else {
        ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);
      }
    }
  }
 // 获得上下文对象
  var context = getContextForSubtree(parentComponent);
  if (container.context === null) {
    container.context = context;
  } else {
    container.pendingContext = context;
  }

  return scheduleRootUpdate(current$$1, element, expirationTime, callback);
}

```

updateContainerAtExpirationTime其实相当于什么都没做，通过getContextForSubtree（这里getContextForSubtree因为一开始parentComponent是不存在的，**于是返回一个空对象**。注意，**这个空对象可以重复使用**，不用每次返回一个新的空对象，这是一个很好的优化）获得上下文对象，然后分配给container.context或container.pendingContext，最后一起丢给scheduleRootUpdate

### scheduleRootUpdate

```javascript
function scheduleRootUpdate(current$$1, element, expirationTime, callback) {
  {
    if (phase === 'render' && current !== null && !didWarnAboutNestedUpdates) {
      didWarnAboutNestedUpdates = true;
      warningWithoutStack$1(false, 'Render methods should be a pure function of props and state; ' + 'triggering nested component updates from render is not allowed. ' + 'If necessary, trigger nested updates in componentDidUpdate.\n\n' + 'Check the render method of %s.', getComponentName(current.type) || 'Unknown');
    }
  }
// 返回一个包含以上属性的update对象
  var update = createUpdate(expirationTime);
  // Caution: React DevTools currently depends on this property
 // 将虚拟dom树放入payload 
  update.payload = { element: element };

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    !(typeof callback === 'function') ? warningWithoutStack$1(false, 'render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback) : void 0;
    update.callback = callback;
  }

  flushPassiveEffects();
    // 开始队列更新
  enqueueUpdate(current$$1, update);
  // 调用调度器API：scheduleWork(...)来调度fiber任务
  scheduleWork(current$$1, expirationTime);

  return expirationTime;
}
function enqueueUpdate(fiber, update) {
  // alternate 主要用来保存更新过程中各版本更新队列，方便崩溃或冲突时回退.
  var alternate = fiber.alternate;
   // 创建两个独立的更新队列
  var queue1 = void 0;
  var queue2 = void 0;
  if (alternate === null) {
    //只存在一个 fiber.
    queue1 = fiber.updateQueue;
    queue2 = null;
    if (queue1 === null) {
        // 如果不存在，则创建一个更新队列
      queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
    }
  } else {
    // 两个所有者
    queue1 = fiber.updateQueue;
    queue2 = alternate.updateQueue;
    if (queue1 === null) {
      if (queue2 === null) {
        // 如果两个都不存在，则创建两个新的
        queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState);
      } else {
        // 如果两个都不存在，则创建两个新的
        queue1 = fiber.updateQueue = cloneUpdateQueue(queue2);
      }
    } else {
      if (queue2 === null) {
        // queue2 不存在，queue1 存在，queue2 根据 queue1 创建
        queue2 = alternate.updateQueue = cloneUpdateQueue(queue1);
      } else {
         // 全都有
      }
    }
  }
  if (queue2 === null || queue1 === queue2) {
    // 只存在一个更新队列
    appendUpdateToQueue(queue1, update);
  } else {
    // 如果任意更新队列为空，则需要将更新添加至两个更新队列
    if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
      // One of the queues is not empty. We must add the update to both queues.
      appendUpdateToQueue(queue1, update);
      appendUpdateToQueue(queue2, update);
    } else {
      // 如果任意更新队列为空，则需要将更新添加至两个更新队列
      appendUpdateToQueue(queue1, update);
      queue2.lastUpdate = update;
    }
  }

  {
    if (fiber.tag === ClassComponent && (currentlyProcessingQueue === queue1 || queue2 !== null && currentlyProcessingQueue === queue2) && !didWarnUpdateInsideUpdate) {
      warningWithoutStack$1(false, 'An update (setState, replaceState, or forceUpdate) was scheduled ' + 'from inside an update function. Update functions should be pure, ' + 'with zero side-effects. Consider using componentDidUpdate or a ' + 'callback.');
      didWarnUpdateInsideUpdate = true;
    }
  }
}
```

scheduleRootUpdate`是将用户的传参封装成一个`update`对象, 其中`update`对象有`payload对象，它就是相当于React15中 的setState的第一个state传参，但现在payload中把children也放进去了。然后添加更新任务至fiber：enqueueUpdate(...)

`enqueueUpdate`是一个链表，**然后根据`fiber`的状态创建一个或两个列队对象，再接下来调用调度器**API：`**scheduleWork(...)`来调度fiber任务**

### scheduleWork

```javascript
function scheduleWork(fiber, expirationTime) {
     
  var root = scheduleWorkToRoot(fiber, expirationTime);
  if (root === null) {
    {
      switch (fiber.tag) {
        case ClassComponent:
          warnAboutUpdateOnUnmounted(fiber, true);
          break;
        case FunctionComponent:
        case ForwardRef:
        case MemoComponent:
        case SimpleMemoComponent:
          warnAboutUpdateOnUnmounted(fiber, false);
          break;
      }
    }
    return;
  }

  if (!isWorking && nextRenderExpirationTime !== NoWork && expirationTime > nextRenderExpirationTime) {
    interruptedBy = fiber;
    resetStack();
  }
  markPendingPriorityLevel(root, expirationTime);
  if (
  // If we're in the render phase, we don't need to schedule this root
  // for an update, because we'll do it before we exit...
  !isWorking || isCommitting$1 ||
  // ...unless this is a different root than the one we're rendering.
  nextRoot !== root) {
    var rootExpirationTime = root.expirationTime;
    requestWork(root, rootExpirationTime);
  }
  if (nestedUpdateCount > NESTED_UPDATE_LIMIT) {
    // Reset this back to zero so subsequent updates don't throw.
    nestedUpdateCount = 0;
    invariant(false, 'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');
  }
}
function scheduleWorkToRoot(fiber, expirationTime) {
   // 记录调度器的执行状态
  recordScheduleUpdate();

  {
    if (fiber.tag === ClassComponent) {
      var instance = fiber.stateNode;
      warnAboutInvalidUpdates(instance);
    }
  }

  // 更新 fiber实例的过期时间
  if (fiber.expirationTime < expirationTime) {
    fiber.expirationTime = expirationTime;
  }
  var alternate = fiber.alternate;
  if (alternate !== null && alternate.expirationTime < expirationTime) {
    alternate.expirationTime = expirationTime;
  }
  // 将父路径遍历到根目录并更新子过期时间
  var node = fiber.return;
  var root = null;
  if (node === null && fiber.tag === HostRoot) {
    root = fiber.stateNode;
  } else {
    while (node !== null) {
      alternate = node.alternate;
      if (node.childExpirationTime < expirationTime) {
        node.childExpirationTime = expirationTime;
        if (alternate !== null && alternate.childExpirationTime < expirationTime) {
          alternate.childExpirationTime = expirationTime;
        }
      } else if (alternate !== null && alternate.childExpirationTime < expirationTime) {
        alternate.childExpirationTime = expirationTime;
      }
      if (node.return === null && node.tag === HostRoot) {
        root = node.stateNode;
        break;
      }
      node = node.return;
    }
  }

  if (enableSchedulerTracing) {
    if (root !== null) {
      var interactions = __interactionsRef.current;
      if (interactions.size > 0) {
        var pendingInteractionMap = root.pendingInteractionMap;
        var pendingInteractions = pendingInteractionMap.get(expirationTime);
        if (pendingInteractions != null) {
          interactions.forEach(function (interaction) {
            if (!pendingInteractions.has(interaction)) {
              // Update the pending async work count for previously unscheduled interaction.
              interaction.__count++;
            }

            pendingInteractions.add(interaction);
          });
        } else {
          pendingInteractionMap.set(expirationTime, new Set(interactions));

          // Update the pending async work count for the current interactions.
          interactions.forEach(function (interaction) {
            interaction.__count++;
          });
        }

        var subscriber = __subscriberRef.current;
        if (subscriber !== null) {
          var threadID = computeThreadID(expirationTime, root.interactionThreadID);
          subscriber.onWorkScheduled(interactions, threadID);
        }
      }
    }
  }
  return root;
}
function recordScheduleUpdate() {
  if (enableUserTimingAPI) {
    if (isCommitting) {
      hasScheduledUpdateInCurrentCommit = true;
    }
    if (currentPhase !== null && currentPhase !== 'componentWillMount' && currentPhase !== 'componentWillReceiveProps') {
      hasScheduledUpdateInCurrentPhase = true;
    }
  }
}
```

`scheduleWork`**主要进行虚拟DOM（fiber树）的更新**;

**recordScheduleUpdate主要用来记录调度器的执行状态，如注释所示，它现在相当于什么都没有做**

### requestWork

```javascript
function requestWork(root, expirationTime) {
  addRootToSchedule(root, expirationTime);
  if (isRendering) {
    // 防止重入。其余工作将安排在
    // 当前呈现批处理
    return;
  }

  if (isBatchingUpdates) {
    // 批处理结束时的刷新工作
    if (isUnbatchingUpdates) {
      nextFlushedRoot = root;
      nextFlushedExpirationTime = Sync;
      performWorkOnRoot(root, Sync, false);
    }
    return;
  }

  // 摆脱同步并使用当前时间
  if (expirationTime === Sync) {
    performSyncWork();
  } else {
    scheduleCallbackWithExpirationTime(root, expirationTime);
  }
}
```

### performWork

```javascript
function performSyncWork() {
  performWork(Sync, false);
}
function performWork(minExpirationTime, isYieldy) {
  // 继续工作的根, 直到有没有更多的工作, 或直到有一个更高的
  // 优先级事件
  findHighestPriorityRoot();

  if (isYieldy) {
    recomputeCurrentRendererTime();
    currentSchedulerTime = currentRendererTime;

    if (enableUserTimingAPI) {
      var didExpire = nextFlushedExpirationTime > currentRendererTime;
      var timeout = expirationTimeToMs(nextFlushedExpirationTime);
      stopRequestCallbackTimer(didExpire, timeout);
    }

    while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && minExpirationTime <= nextFlushedExpirationTime && !(didYield && currentRendererTime > nextFlushedExpirationTime)) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, currentRendererTime > nextFlushedExpirationTime);
      findHighestPriorityRoot();
      recomputeCurrentRendererTime();
      currentSchedulerTime = currentRendererTime;
    }
  } else {
    while (nextFlushedRoot !== null && nextFlushedExpirationTime !== NoWork && minExpirationTime <= nextFlushedExpirationTime) {
      performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, false);
      findHighestPriorityRoot();
    }
  }

  // We're done flushing work. Either we ran out of time in this callback,
  // or there's no more work left with sufficient priority.

  // If we're inside a callback, set this to false since we just completed it.
  if (isYieldy) {
    callbackExpirationTime = NoWork;
    callbackID = null;
  }
  // 如果还有工作要做, 请安排新的回调.
  if (nextFlushedExpirationTime !== NoWork) {
    scheduleCallbackWithExpirationTime(nextFlushedRoot, nextFlushedExpirationTime);
  }

  // 清除.
  finishRendering();
}
```

### performWorkOnRoot

```javascript
function performWorkOnRoot(root, expirationTime, isYieldy) {
  !!isRendering ? invariant(false, 'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.') : void 0;

  isRendering = true;

  // Check if this is async work or sync/expired work.
  if (!isYieldy) {
    // Flush work without yielding.
    // TODO: Non-yieldy work does not necessarily imply expired work. A renderer
    // may want to perform some work without yielding, but also without
    // requiring the root to complete (by triggering placeholders).

    var finishedWork = root.finishedWork;
    if (finishedWork !== null) {
      // This root is already complete. We can commit it.
      completeRoot(root, finishedWork, expirationTime);
    } else {
      root.finishedWork = null;
      // If this root previously suspended, clear its existing timeout, since
      // we're about to try rendering again.
      var timeoutHandle = root.timeoutHandle;
      if (timeoutHandle !== noTimeout) {
        root.timeoutHandle = noTimeout;
        // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
        cancelTimeout(timeoutHandle);
      }
      renderRoot(root, isYieldy);
      finishedWork = root.finishedWork;
      if (finishedWork !== null) {
        // We've completed the root. Commit it.
        completeRoot(root, finishedWork, expirationTime);
      }
    }
  } else {
    // Flush async work.
    var _finishedWork = root.finishedWork;
    if (_finishedWork !== null) {
      // This root is already complete. We can commit it.
      completeRoot(root, _finishedWork, expirationTime);
    } else {
      root.finishedWork = null;
      // If this root previously suspended, clear its existing timeout, since
      // we're about to try rendering again.
      var _timeoutHandle = root.timeoutHandle;
      if (_timeoutHandle !== noTimeout) {
        root.timeoutHandle = noTimeout;
        // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
        cancelTimeout(_timeoutHandle);
      }
      renderRoot(root, isYieldy);
      _finishedWork = root.finishedWork;
      if (_finishedWork !== null) {
        // We've completed the root. Check the if we should yield one more time
        // before committing.
        if (!shouldYieldToRenderer()) {
          // Still time left. Commit the root.
          completeRoot(root, _finishedWork, expirationTime);
        } else {
          // There's no time left. Mark this root as complete. We'll come
          // back and commit it later.
          root.finishedWork = _finishedWork;
        }
      }
    }
  }

  isRendering = false;
}
```

### completeRoot

```javascript
function completeRoot(root, finishedWork, expirationTime) {
  // Check if there's a batch that matches this expiration time.
  var firstBatch = root.firstBatch;
  if (firstBatch !== null && firstBatch._expirationTime >= expirationTime) {
    if (completedBatches === null) {
      completedBatches = [firstBatch];
    } else {
      completedBatches.push(firstBatch);
    }
    if (firstBatch._defer) {
      // This root is blocked from committing by a batch. Unschedule it until
      // we receive another update.
      root.finishedWork = finishedWork;
      root.expirationTime = NoWork;
      return;
    }
  }

  // Commit the root.
  root.finishedWork = null;

  // Check if this is a nested update (a sync update scheduled during the
  // commit phase).
  if (root === lastCommittedRootDuringThisBatch) {
    // If the next root is the same as the previous root, this is a nested
    // update. To prevent an infinite loop, increment the nested update count.
    nestedUpdateCount++;
  } else {
    // Reset whenever we switch roots.
    lastCommittedRootDuringThisBatch = root;
    nestedUpdateCount = 0;
  }
  unstable_runWithPriority(unstable_ImmediatePriority, function () {
    commitRoot(root, finishedWork);
  });
}

```

### commitRoot

```javascript
function commitRoot(root, finishedWork) {
  isWorking = true;
  isCommitting$1 = true;
  startCommitTimer();

  !(root.current !== finishedWork) ? invariant(false, 'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  var committedExpirationTime = root.pendingCommitExpirationTime;
  !(committedExpirationTime !== NoWork) ? invariant(false, 'Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.') : void 0;
  root.pendingCommitExpirationTime = NoWork;

  // Update the pending priority levels to account for the work that we are
  // about to commit. This needs to happen before calling the lifecycles, since
  // they may schedule additional updates.
  var updateExpirationTimeBeforeCommit = finishedWork.expirationTime;
  var childExpirationTimeBeforeCommit = finishedWork.childExpirationTime;
  var earliestRemainingTimeBeforeCommit = childExpirationTimeBeforeCommit > updateExpirationTimeBeforeCommit ? childExpirationTimeBeforeCommit : updateExpirationTimeBeforeCommit;
  markCommittedPriorityLevels(root, earliestRemainingTimeBeforeCommit);

  var prevInteractions = null;
  if (enableSchedulerTracing) {
    // Restore any pending interactions at this point,
    // So that cascading work triggered during the render phase will be accounted for.
    prevInteractions = __interactionsRef.current;
    __interactionsRef.current = root.memoizedInteractions;
  }

  // Reset this to null before calling lifecycles
  ReactCurrentOwner$2.current = null;

  var firstEffect = void 0;
  if (finishedWork.effectTag > PerformedWork) {
    // A fiber's effect list consists only of its children, not itself. So if
    // the root has an effect, we need to add it to the end of the list. The
    // resulting list is the set that would belong to the root's parent, if
    // it had one; that is, all the effects in the tree including the root.
    if (finishedWork.lastEffect !== null) {
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    // There is no effect on the root.
    firstEffect = finishedWork.firstEffect;
  }

  prepareForCommit(root.containerInfo);

  // Invoke instances of getSnapshotBeforeUpdate before mutation.
  nextEffect = firstEffect;
  startCommitSnapshotEffectsTimer();
  while (nextEffect !== null) {
    var didError = false;
    var error = void 0;
    {
      invokeGuardedCallback(null, commitBeforeMutationLifecycles, null);
      if (hasCaughtError()) {
        didError = true;
        error = clearCaughtError();
      }
    }
    if (didError) {
      !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      captureCommitPhaseError(nextEffect, error);
      // Clean-up
      if (nextEffect !== null) {
        nextEffect = nextEffect.nextEffect;
      }
    }
  }
  stopCommitSnapshotEffectsTimer();

  if (enableProfilerTimer) {
    // Mark the current commit time to be shared by all Profilers in this batch.
    // This enables them to be grouped later.
    recordCommitTime();
  }

  // Commit all the side-effects within a tree. We'll do this in two passes.
  // The first pass performs all the host insertions, updates, deletions and
  // ref unmounts.
  nextEffect = firstEffect;
  startCommitHostEffectsTimer();
  while (nextEffect !== null) {
    var _didError = false;
    var _error = void 0;
    {
      invokeGuardedCallback(null, commitAllHostEffects, null);
      if (hasCaughtError()) {
        _didError = true;
        _error = clearCaughtError();
      }
    }
    if (_didError) {
      !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      captureCommitPhaseError(nextEffect, _error);
      // Clean-up
      if (nextEffect !== null) {
        nextEffect = nextEffect.nextEffect;
      }
    }
  }
  stopCommitHostEffectsTimer();

  resetAfterCommit(root.containerInfo);

  // The work-in-progress tree is now the current tree. This must come after
  // the first pass of the commit phase, so that the previous tree is still
  // current during componentWillUnmount, but before the second pass, so that
  // the finished work is current during componentDidMount/Update.
  root.current = finishedWork;

  // In the second pass we'll perform all life-cycles and ref callbacks.
  // Life-cycles happen as a separate pass so that all placements, updates,
  // and deletions in the entire tree have already been invoked.
  // This pass also triggers any renderer-specific initial effects.
  nextEffect = firstEffect;
  startCommitLifeCyclesTimer();
  while (nextEffect !== null) {
    var _didError2 = false;
    var _error2 = void 0;
    {
      invokeGuardedCallback(null, commitAllLifeCycles, null, root, committedExpirationTime);
      if (hasCaughtError()) {
        _didError2 = true;
        _error2 = clearCaughtError();
      }
    }
    if (_didError2) {
      !(nextEffect !== null) ? invariant(false, 'Should have next effect. This error is likely caused by a bug in React. Please file an issue.') : void 0;
      captureCommitPhaseError(nextEffect, _error2);
      if (nextEffect !== null) {
        nextEffect = nextEffect.nextEffect;
      }
    }
  }

  if (firstEffect !== null && rootWithPendingPassiveEffects !== null) {
    // This commit included a passive effect. These do not need to fire until
    // after the next paint. Schedule an callback to fire them in an async
    // event. To ensure serial execution, the callback will be flushed early if
    // we enter rootWithPendingPassiveEffects commit phase before then.
    var callback = commitPassiveEffects.bind(null, root, firstEffect);
    if (enableSchedulerTracing) {
      // TODO: Avoid this extra callback by mutating the tracing ref directly,
      // like we do at the beginning of commitRoot. I've opted not to do that
      // here because that code is still in flux.
      callback = unstable_wrap(callback);
    }
    passiveEffectCallbackHandle = unstable_runWithPriority(unstable_NormalPriority, function () {
      return schedulePassiveEffects(callback);
    });
    passiveEffectCallback = callback;
  }

  isCommitting$1 = false;
  isWorking = false;
  stopCommitLifeCyclesTimer();
  stopCommitTimer();
  onCommitRoot(finishedWork.stateNode);
  if (true && ReactFiberInstrumentation_1.debugTool) {
    ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);
  }

  var updateExpirationTimeAfterCommit = finishedWork.expirationTime;
  var childExpirationTimeAfterCommit = finishedWork.childExpirationTime;
  var earliestRemainingTimeAfterCommit = childExpirationTimeAfterCommit > updateExpirationTimeAfterCommit ? childExpirationTimeAfterCommit : updateExpirationTimeAfterCommit;
  if (earliestRemainingTimeAfterCommit === NoWork) {
    // If there's no remaining work, we can clear the set of already failed
    // error boundaries.
    legacyErrorBoundariesThatAlreadyFailed = null;
  }
  onCommit(root, earliestRemainingTimeAfterCommit);

  if (enableSchedulerTracing) {
    __interactionsRef.current = prevInteractions;

    var subscriber = void 0;

    try {
      subscriber = __subscriberRef.current;
      if (subscriber !== null && root.memoizedInteractions.size > 0) {
        var threadID = computeThreadID(committedExpirationTime, root.interactionThreadID);
        subscriber.onWorkStopped(root.memoizedInteractions, threadID);
      }
    } catch (error) {
      // It's not safe for commitRoot() to throw.
      // Store the error for now and we'll re-throw in finishRendering().
      if (!hasUnhandledError) {
        hasUnhandledError = true;
        unhandledError = error;
      }
    } finally {
      // Clear completed interactions from the pending Map.
      // Unless the render was suspended or cascading work was scheduled,
      // In which case– leave pending interactions until the subsequent render.
      var pendingInteractionMap = root.pendingInteractionMap;
      pendingInteractionMap.forEach(function (scheduledInteractions, scheduledExpirationTime) {
        // Only decrement the pending interaction count if we're done.
        // If there's still work at the current priority,
        // That indicates that we are waiting for suspense data.
        if (scheduledExpirationTime > earliestRemainingTimeAfterCommit) {
          pendingInteractionMap.delete(scheduledExpirationTime);

          scheduledInteractions.forEach(function (interaction) {
            interaction.__count--;

            if (subscriber !== null && interaction.__count === 0) {
              try {
                subscriber.onInteractionScheduledWorkCompleted(interaction);
              } catch (error) {
                // It's not safe for commitRoot() to throw.
                // Store the error for now and we'll re-throw in finishRendering().
                if (!hasUnhandledError) {
                  hasUnhandledError = true;
                  unhandledError = error;
                }
              }
            }
          });
        }
      });
    }
  }
}
```

处理完更新后需要确认提交更新至渲染模块，然后渲染模块才能将更新渲染至DOM

### commitWork

```javascript
function commitWork(current$$1, finishedWork) {
  if (!supportsMutation) {
    switch (finishedWork.tag) {
      case FunctionComponent:
      case ForwardRef:
      case MemoComponent:
      case SimpleMemoComponent:
        {
          // Note: We currently never use MountMutation, but useLayout uses
          // UnmountMutation.
          commitHookEffectList(UnmountMutation, MountMutation, finishedWork);
          return;
        }
    }

    commitContainer(finishedWork);
    return;
  }

  switch (finishedWork.tag) {
    case FunctionComponent:
    case ForwardRef:
    case MemoComponent:
    case SimpleMemoComponent:
      {
        // Note: We currently never use MountMutation, but useLayout uses
        // UnmountMutation.
        commitHookEffectList(UnmountMutation, MountMutation, finishedWork);
        return;
      }
    case ClassComponent:
      {
        return;
      }
    case HostComponent:
      {
        var instance = finishedWork.stateNode;
        if (instance != null) {
          // Commit the work prepared earlier.
          var newProps = finishedWork.memoizedProps;
          // For hydration we reuse the update path but we treat the oldProps
          // as the newProps. The updatePayload will contain the real change in
          // this case.
          var oldProps = current$$1 !== null ? current$$1.memoizedProps : newProps;
          var type = finishedWork.type;
          // TODO: Type the updateQueue to be specific to host components.
          var updatePayload = finishedWork.updateQueue;
          finishedWork.updateQueue = null;
          if (updatePayload !== null) {
            commitUpdate(instance, updatePayload, type, oldProps, newProps, finishedWork);
          }
        }
        return;
      }
    case HostText:
      {
        !(finishedWork.stateNode !== null) ? invariant(false, 'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        var textInstance = finishedWork.stateNode;
        var newText = finishedWork.memoizedProps;
        // For hydration we reuse the update path but we treat the oldProps
        // as the newProps. The updatePayload will contain the real change in
        // this case.
        var oldText = current$$1 !== null ? current$$1.memoizedProps : newText;
        commitTextUpdate(textInstance, oldText, newText);
        return;
      }
    case HostRoot:
      {
        return;
      }
    case Profiler:
      {
        return;
      }
    case SuspenseComponent:
      {
        var newState = finishedWork.memoizedState;

        var newDidTimeout = void 0;
        var primaryChildParent = finishedWork;
        if (newState === null) {
          newDidTimeout = false;
        } else {
          newDidTimeout = true;
          primaryChildParent = finishedWork.child;
          if (newState.timedOutAt === NoWork) {
            // If the children had not already timed out, record the time.
            // This is used to compute the elapsed time during subsequent
            // attempts to render the children.
            newState.timedOutAt = requestCurrentTime();
          }
        }

        if (primaryChildParent !== null) {
          hideOrUnhideAllChildren(primaryChildParent, newDidTimeout);
        }

        // If this boundary just timed out, then it will have a set of thenables.
        // For each thenable, attach a listener so that when it resolves, React
        // attempts to re-render the boundary in the primary (pre-timeout) state.
        var thenables = finishedWork.updateQueue;
        if (thenables !== null) {
          finishedWork.updateQueue = null;
          var retryCache = finishedWork.stateNode;
          if (retryCache === null) {
            retryCache = finishedWork.stateNode = new PossiblyWeakSet$1();
          }
          thenables.forEach(function (thenable) {
            // Memoize using the boundary fiber to prevent redundant listeners.
            var retry = retryTimedOutBoundary.bind(null, finishedWork, thenable);
            if (enableSchedulerTracing) {
              retry = unstable_wrap(retry);
            }
            if (!retryCache.has(thenable)) {
              retryCache.add(thenable);
              thenable.then(retry, retry);
            }
          });
        }

        return;
      }
    case IncompleteClassComponent:
      {
        return;
      }
    default:
      {
        invariant(false, 'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');
      }
  }
}
```

## 小结

首次渲染的执行流程为：
`**ReactDOM.render`（渲染入口） => `legacyRenderSubtreeIntoContainer`（把虚拟的dom树渲染到真实的dom容器中） => `DOMRenderer.updateContainer`（更新容器内容） => `scheduleRootUpdate`（开始更新） => `scheduleWork`（处理更新） => `commitWork`（提交更新**）

