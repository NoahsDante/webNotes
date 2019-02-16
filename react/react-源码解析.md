# 首次渲染（组件）

版本@16.8.2

## React.createElement()

所有由JSX写的语法都会被Babel转译成`React.createElement()`调用

```javascript
class App extends Component {
  render() {
    return (
      <div className=”App”> 
        Welcome to React
      </div>
    );
  }
}
// 转译
class App extends Component {
  render() {
    return React.createElement(
        ‘div’,
      { className: ‘App’ },
     ‘Welcome to React’
    );
  }
}
```

