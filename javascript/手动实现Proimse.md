# Promise标准

1. 只有一个`then`方法，没有`catch`，`race`，`all`等方法，甚至没有构造函数
2. then方法返回一个新的Promise

```javascript
promise2 = promise1.then();
promise2 === promise1
```

3. promise的初始状态为pending，它可以由此状态转换为fulfilled（本文为了一致把此状态叫做resolved）或者rejected，一旦状态确定，就不可以再次转换为其它状态，状态确定的过程称为settle

# 实现Proimse

## 构造函数

```javascript
function MyProimse(fn) {
    var state = null,  // 状态 当然这里是使用 true、false、null表示
        value = null,  // Promise的值
        self = this;
}
```

上述代码基本实现Proimse构造函数的主要部分,接下来分别调用传值

1. 给构造函数传值
2. 同时传值时,捕获异常

```javascript
new MyProimse(function (resolve,reject) {
    throw 9
});
```

具体实现

```javascript
function MyProimse(fn) {
    var state = null,  // 状态 当然这里是使用 true、false、null表示
        value = null,  // Promise的值
        self = this;
    function resolve(newValue) {
      
    }
    function reject(newValue) {
      
    }
    doResolve(fn,resolve,reject)
}
function doResolve(fn, onResolve, onReject) {
    try {
        fn(onResolve, onReject);
    } catch (e) {
        onReject(e);
    }
}

```

接下来是**resolve,reject**

```javascript
function resolve(newValue) {
    state = true;
    value = newValue;

}
function reject(newValue) {
    state = false;
    value = newValue;

}
```

## then方法

Promise对象有一个then方法，用来注册在这个Promise状态确定后的回调;**then方法需要写在原型链上**。then方法会返回一个Promise;按照规范确规定了**then要返回一个新的对象，**目前的Promise实现中then几乎都是返回一个新的Promise([详情](https://promisesaplus.com/differences-from-promises-a#point-5))对象，所以在我们的实现中，也让then返回一个新的Promise对象

```javascript
function MyProimse(fn) {
    var state = null,  // 状态 当然这里是使用 true、false、null表示
        value = null,  // Promise的值
        self = this;

    this.then = function (onResolve,onRject) {
        return new self.constructor(function (resolve,reject) {
            handle(onResolve,onRject,resolve,reject);
        });
    }
    function handle(onResolve,onReject,resolve,reject) {
        var cb = state ? onResolve : onReject;
        var ret;
        try {
            ret = cb(value);
        } catch (e) {
            reject(e);
        }
        resolve(ret);
    }

    function resolve(newValue) {
        state = true;
        value = newValue;
    }
    function reject(newValue) {
        state = false;
        value = newValue;
    }
    doResolve(fn,resolve,reject)
}

function doResolve(fn, onResolve, onReject) {
    try {
        fn(onResolve, onReject);
    } catch (e) {
        onReject(e);
    }
}
```

现在我们基本实现了Promise标准中所涉及到的内容;

## 问题

### Promise值的穿透

```javascript
var myProimse =new MyProimse(function (resolve,reject) {
    resolve(2)
})
myProimse.then().then(function (val) {
    console.log(val); // 2
})
```

实现

```javascript
function handle(onResolve,onReject,resolve,reject) {
    var cb = state ? onResolve : onReject;
    // 加入判断
    if(cb === null || cb === undefined) {
        (state ? resolve : reject)(value);
        return 
    }
    var ret;
    try {
        ret = cb(value);
    } catch (e) {
        reject(e);
    }
    resolve(ret);
}
```

### then返回一个promise 

```javascript
var myProimse =new MyProimse(function (resolve,reject) {
        resolve(2)
    })
    myProimse.then(function (val) {
        console.log(val);
        return new MyProimse(function (resolve,reject) {
        	resolve(4)
    	})
    }).then(function (val) {
        console.log(val); // 4
    })
```

实现

```javascript
function resolve(newValue) {
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then
        if (typeof then === 'function') {
            doResolve(then.bind(newValue), resolve, reject)
            return
        }
    }
    state = true;
    value = newValue;

}
```

## 最后完整代码

```javascript
function MyProimse(fn) {
    var state = null,  // 状态 当然这里是使用 true、false、null表示
        value = null,  // Promise的值
        self = this;

    this.then = function (onResolve,onRject) {
        return new self.constructor(function (resolve,reject) {
            handle(onResolve,onRject,resolve,reject);
        });
    }
    function handle(onResolve,onReject,resolve,reject) {
        var cb = state ? onResolve : onReject;
        if(cb === null || cb === undefined) {
            (state ? resolve : reject)(value);
            return 
        }
        var ret;
        try {
            ret = cb(value);
        } catch (e) {
            reject(e);
        }
        resolve(ret);
    }

    function resolve(newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then
            if (typeof then === 'function') {
                doResolve(then.bind(newValue), resolve, reject)
                return
            }
        }
        state = true;
        value = newValue;
    }
    function reject(newValue) {
        state = false;
        value = newValue;
    }
    doResolve(fn,resolve,reject)
}

function doResolve(fn, onResolve, onReject) {
    try {
        fn(onResolve, onReject);
    } catch (e) {
        onReject(e);
    }
}
```

