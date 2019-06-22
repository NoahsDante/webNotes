function MyProimse(fn) {
    var state = null,  // 状态 当然这里是使用 true、false、null表示
        value = null,  // Promise的值
        deferreds = [],
        self = this;

    this.then = function (onResolve,onRject) {
        return new self.constructor(function (resolve,reject) {
            handle(new Handler(onResolve,onRject,resolve,reject));
        });
    }
    function handle(deferred) {
        if (state === null) {
            deferreds.push(deferred);
            return
        }
        var cb = state ? deferred.onResolve : deferred.onReject;
        if(cb === null || cb === undefined) {
            (state ? deferred.resolve : deferred.reject)(value);
            return
        }
        var ret;
        try {
            ret = cb(value);
        } catch (e) {
            deferred.reject(e);
        }
        deferred.resolve(ret);
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
        finale();
    }
    function reject(newValue) {
        state = false;
        value = newValue;
        finale();
    }
    function finale() {
        for (var i = 0, len = deferreds.length; i < len; i++){
            handle(deferreds[i])
        }

        deferreds = null
    }
    doResolve(fn,resolve,reject)
}
function Handler(onResolve, onRejected, resolve, reject){
    this.onResolve = typeof onResolve === 'function' ? onResolve : null
    this.onRejected = typeof onRejected === 'function' ? onRejected : null
    this.resolve = resolve
    this.reject = reject
}
function doResolve(fn, onResolve, onReject) {
    try {
        fn(onResolve, onReject);
    } catch (e) {
        onReject(e);
    }
}