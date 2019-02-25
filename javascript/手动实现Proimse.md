# Promise标准

1. 只有一个`then`方法，没有`catch`，`race`，`all`等方法，甚至没有构造函数
2. then方法返回一个新的Promise

```javascript
promise2 = promise1.then();
promise2 === promise1
```

3. promise的初始状态为pending，它可以由此状态转换为fulfilled（本文为了一致把此状态叫做resolved）或者rejected，一旦状态确定，就不可以再次转换为其它状态，状态确定的过程称为settle



