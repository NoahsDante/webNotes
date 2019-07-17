# Typescript

## 基本类型

### 布尔值

```javascript
let isDone:boolean = false;
```

### 数字

所有数字都是浮点数。类型是number，除了支持十进制和十六进制，还支持二进制和八进制

```javascript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

### 字符串

可以使用""和''

```javascript
let name: string = "bob";
name = "smith";
```

使用模版字符串

```javascript
let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`;
```

### 数组

 第一种，可以在元素类型后面接上 `[]`，表示由此类型元素组成的一个数组：

```javascript
let list: number[] = [1, 2, 3];
```

第二种方式是使用数组泛型，`Array<元素类型>`：

```javascript
let list: Array<number> = [1, 2, 3];
```

### 元组

允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

```javascript
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```

### 枚举

`enum`类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字

```javascript
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```

枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字

```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2
```

### Any

有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容;

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

let list: any[] = [1, true, "free"];
list[1] = 100;
```

### Void 

某种程度上来说，`void`类型像是与`any`类型相反，它表示没有任何类型

声明一个`void`类型的变量没有什么大用，因为你只能为它赋予`undefined`和`null`：

```typescript
let unusable: void = undefined;
```

### Null 和Undefined

TypeScript里，`undefined`和`null`两者各自有自己的类型分别叫做`undefined`和`null`。 和 `void`相似，它们的本身的类型用处不是很大

```typescript
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

### Never

`never`类型表示的是那些永不存在的值的类型。 例如， `never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never`类型，当它们被永不为真的类型保护所约束时。

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

### Object

`object`表示非原始类型，也就是除`number`，`string`，`boolean`，`symbol`，`null`或`undefined`之外的类型。

```typescript
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
create(false); // Error
create(undefined); // Error
```

### 类型断言

有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。通过*类型断言*这种方式可以告诉编译器

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
let strLength: number = (<someValue as string).length;
```



## 变量声明

### Var变量

```
function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

f(true);  // returns '10'
f(false); // returns 'undefined'
```

`var`声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问

在作用域内的变量，会共享

### let声明

#### 块级作用域

当用`let`声明一个变量，它使用的是*词法作用域*或*块作用域*。 不同于使用 `var`声明的变量那样可以在包含它们的函数外访问，块作用域变量在包含它们的块或`for`循环之外是不能访问

拥有块级作用域的变量的另一个特点是，它们不能在被声明之前读或写。 虽然这些变量始终“存在”于它们的作用域里，但在直到声明它的代码之前的区域都属于 *暂时性死区*。 它只是用来说明我们不能在 `let`语句之前访问它们

#### 重定义及屏蔽

使用`var`声明时，它不在乎你声明多少次；你只会得到1个

`let`声明就不会这么宽松了

```typescript
let x = 10;
let x = 20; // 错误，不能在1个作用域里多次声明`x`
// 并不是要求两个均是块级作用域的声明TypeScript才会给出一个错误的警告。
function f(x) {
    let x = 100; // error: interferes with parameter declaration
}

function g() {
    let x = 100;
    var x = 100; // error: can't have both declarations of 'x'
}
// 并不是说块级作用域变量不能用函数作用域变量来声明。 而是块级作用域变量需要在明显不同的块里声明。

function f(condition, x) {
    if (condition) {
        let x = 100;
        return x;
    }

    return x;
}

f(false, 0); // returns 0
f(true, 0);  // returns 100
```

在一个嵌套作用域里引入一个新名字的行为称做*屏蔽*。 它是一把双刃剑，它可能会不小心地引入新问题，同时也可能会解决一些错误

```typescript
function sumMatrix(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (let i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
```

内层循环的`i`可以屏蔽掉外层循环的`i`

#### 块级作用域变量的获取

当`let`声明出现在循环体里时拥有完全不同的行为。 不仅是在循环里引入了一个新的变量环境，而是针对 *每次迭代*都会创建这样一个新作用域

### const声明

它们与`let`声明相似，但是就像它的名字所表达的，它们被赋值后不能再改变。 换句话说，它们拥有与 `let`相同的作用域规则，但是不能对它们重新赋值

实际上`const`变量的内部状态是可修改的

### let vs const

使用[最小特权原则](https://en.wikipedia.org/wiki/Principle_of_least_privilege)，所有变量除了你计划去修改的都应该使用`const`。 基本原则就是如果一个变量不需要对它写入，那么其它使用这些代码的人也不能够写入它们，并且要思考为什么会需要对这些变量重新赋值。 使用 `const`也可以让我们更容易的推测数据的流动

### 解构

最简单的解构莫过于数组的解构赋值了：

```typescript
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2
// 在数组里使用...语法创建剩余变量
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
```

#### 对象解构

```typescript
let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;
// 可以用没有声明的赋值
({ a, b } = { a: "baz", b: 101 });
// 可以在对象里使用...语法创建剩余变量
let { a, ...passthrough } = o;
let total = passthrough.b + passthrough.c.length;
```

##### 属性重命名

可以给属性以不同的名字

```typescript
let { a: newName1, b: newName2 } = o;
let {a, b}: {a: string, b: number} = o;
```

##### 默认值

```typescript
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}
```

### 函数声明

```typescript
type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}
function f({ a="", b=0 } = {}): void {
    // ...
}
f();
```

### 展开

展开操作符正与解构相反。 它允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象。 例如：

```typescript
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
// 还可以展开对象
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
```

出现在展开对象后面的属性会覆盖前面的属性

首先，它仅包含对象 [自身的可枚举属性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。 大体上是说当你展开一个对象实例时，你会丢失其方法

```typescript
class C {
  p = 12;
  m() {
  }
}
let c = new C();
let clone = { ...c };
clone.p; // ok
clone.m(); // error!
```

## 接口

为了这些类型命名和代码或第三方代码定义契约

### 接口初探

```typescript
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

类型检查器会查看`printLabel`的调用。 `printLabel`有一个参数，并要求这个对象参数有一个名为`label`类型为`string`的属性。 需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配

重写上面的例子，这次使用接口来描述：必须包含一个`label`属性且类型为`string`：

```typescript
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

`abelledValue`接口就好比一个名字，用来描述上面例子里的要求。 它代表了有一个 `label`属性且类型为`string`的对象;类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以

### 可选属性

选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个`?`符号。

可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误

### 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用 `readonly`来指定只读属性

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}
// 以通过赋值一个对象字面量来构造一个Point。 赋值后， x和y再也不能被改变了
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
// typeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```





## 类

## 函数

## 泛型

## 枚举

## 类型推论

## 高级类型

## Symbols

## 迭代器和生成器

## 模块

## 命名空间

## 命名空间与模块

## 模块解析

## 声明合并

## JSX

## 装饰器

## Mixins

## 三斜线指令

