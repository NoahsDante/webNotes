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