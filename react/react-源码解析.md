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

### updateContainer

### scheduleRootUpdate