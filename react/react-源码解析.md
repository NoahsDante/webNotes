# 首次渲染（组件）

## React.createElement()

所有由JSX写的语法都会被Babel转译成`React.createElement()`调用

```javascript
class App extends Component {
  render() {
    return (
      <div className=”App”> 
      </div>
    );
  }
}

```

