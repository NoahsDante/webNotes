function asap(task) {
    task();
};
function Proimse(fn) {
    var state = null
    var value = null
    var deferreds = []
    var self = this

    this.then = function(onFulfilled, onRejected) {
        return new self.constructor(function(resolve, reject) {
            handle(new Handler(onFulfilled, onRejected, resolve, reject))
        })
    }

    function handle(deferred) {
        if (state === null) {
            deferreds.push(deferred)
            return
        }
        asap(function() {
            var cb = state ? deferred.onFulfilled : deferred.onRejected
            if (cb === null) {
                (state ? deferred.resolve : deferred.reject)(value)
                return
            }
            var ret
            try {
                ret = cb(value)
            }
            catch (e) {
                deferred.reject(e)
                return
            }
            deferred.resolve(ret)
        })
    }

    function resolve(newValue) {
        try { //Proimse Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
            if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.')
            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                var then = newValue.then
                if (typeof then === 'function') {
                    doResolve(then.bind(newValue), resolve, reject)
                    return
                }
            }
            state = true
            value = newValue
            finale()
        } catch (e) { reject(e) }
    }

    function reject(newValue) {
        state = false
        value = newValue
        finale()
    }

    function finale() {
        for (var i = 0, len = deferreds.length; i < len; i++)
            handle(deferreds[i])
        deferreds = null
    }

    doResolve(fn, resolve, reject)
}


function Handler(onFulfilled, onRejected, resolve, reject){
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null
    this.onRejected = typeof onRejected === 'function' ? onRejected : null
    this.resolve = resolve
    this.reject = reject
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, onFulfilled, onRejected) {
    var done = false;
    try {
        fn(function (value) {
            if (done) return
            done = true
            onFulfilled(value)
        }, function (reason) {
            if (done) return
            done = true
            onRejected(reason)
        })
    } catch (ex) {
        if (done) return
        done = true
        onRejected(ex)
    }
}

/* Static Functions */

function ValueProimse(value) {
    this.then = function (onFulfilled) {
        if (typeof onFulfilled !== 'function') return this
        return new Proimse(function (resolve, reject) {
            asap(function () {
                try {
                    resolve(onFulfilled(value))
                } catch (ex) {
                    reject(ex);
                }
            })
        })
    }
}
ValueProimse.prototype = Proimse.prototype

var TRUE = new ValueProimse(true)
var FALSE = new ValueProimse(false)
var NULL = new ValueProimse(null)
var UNDEFINED = new ValueProimse(undefined)
var ZERO = new ValueProimse(0)
var EMPTYSTRING = new ValueProimse('')

Proimse.resolve = function (value) {
    if (value instanceof Proimse) return value

    if (value === null) return NULL
    if (value === undefined) return UNDEFINED
    if (value === true) return TRUE
    if (value === false) return FALSE
    if (value === 0) return ZERO
    if (value === '') return EMPTYSTRING

    if (typeof value === 'object' || typeof value === 'function') {
        try {
            var then = value.then
            if (typeof then === 'function') {
                return new Proimse(then.bind(value))
            }
        } catch (ex) {
            return new Proimse(function (resolve, reject) {
                reject(ex)
            })
        }
    }

    return new ValueProimse(value)
}

Proimse.all = function (arr) {
    var args = Array.prototype.slice.call(arr)

    return new Proimse(function (resolve, reject) {
        if (args.length === 0) return resolve([])
        var remaining = args.length
        function res(i, val) {
            try {
                if (val && (typeof val === 'object' || typeof val === 'function')) {
                    var then = val.then
                    if (typeof then === 'function') {
                        then.call(val, function (val) { res(i, val) }, reject)
                        return
                    }
                }
                args[i] = val
                if (--remaining === 0) {
                    resolve(args);
                }
            } catch (ex) {
                reject(ex)
            }
        }
        for (var i = 0; i < args.length; i++) {
            res(i, args[i])
        }
    })
}

Proimse.reject = function (value) {
    return new Proimse(function (resolve, reject) {
        reject(value);
    });
}

Proimse.race = function (values) {
    return new Proimse(function (resolve, reject) {
        values.forEach(function(value){
            Proimse.resolve(value).then(resolve, reject);
        })
    });
}

/* Prototype Methods */

Proimse.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
}