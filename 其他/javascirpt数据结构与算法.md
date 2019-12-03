## 数组

### 创建和初始化数组

```js
var daysOfWeek = [];
```

### 访问元素和迭代数组

```js
for (var i=0; i<daysOfWeek.length; i++){
  console.log(daysOfWeek[i]);
}
```

### 添加元素

```js
var numbers = [0,1,2,3,4,5,6,7,8,9];
// 添加
numbers[numbers.length] = 10;

```

#### push 

> 能把元素添加到数组的末尾

```js
numbers.push(11);
numbers.push(12, 13);
```

#### unshift

> 把数值插入数组的首位

```js
numbers.unshift(-2);
numbers.unshift(-4, -3);
```

### 删除元素

#### pop

> 要删除数组里最靠后的元素

```js
numbers.pop();
```

#### shift

> 删除数组的第一个元素

```js
numbers.shift();
```

### 在任意位置添加或删除元素

#### splice

> 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会**改变原数组**

```js
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]
```

### 二维和多维数组

```js
// 二维 迭代
function printMatrix(myMatrix) {
  for (var i=0; i<myMatrix.length; i++){
    for (var j=0; j<myMatrix[i].length; j++){
      console.log(myMatrix[i][j]);
    }
  }
}
// 多维 数组
function printMatrix(myMatrix) {
  for (var i=0; i<matrix3x3x3.length; i++){
    for (var j=0; j<matrix3x3x3[i].length; j++){
      for (var z=0; z<matrix3x3x3[i][j].length; z++){
        console.log(matrix3x3x3[i][j][z]);
      }
    }
  }
}
```

### 数据多种方法

#### 数组合并

> 有多个数组，需要合并起来成为一个数组

```js
var zero = 0;
var positiveNumbers = [1,2,3];
var negativeNumbers = [-3,-2,-1];
var numbers = negativeNumbers.concat(zero, positiveNumbers); // -3、-2、-1、0、1、2、3
```

#### 迭代器函数

##### every

> 方法会迭代数组中的每个元素，该函数对每一项都返回`true`，则返回`true`

##### some

> 对数组中的每一项运行给定函数，如果任一项返回`true`，则返回`true`

##### forEach

> 要迭代整个数组，可以用`forEach`方法。它和使用`for`循环的结果相同

##### map

> 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组

```js
var myMap = numbers.map(isEven);
// 数组myMap里的值是：[false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]。它保存了传入map方法的isEven函数的运行结果。这样就很容易知道一个元素是否是偶数。比如，myMap[0]是false，因为1不是偶数；而myMap[1]是true，因为2是偶数。
```

##### filter

> 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素

```js
var evenNumbers = numbers.filter(isEven);
// evenNumbers数组中的元素都是偶数：[2, 4, 6, 8, 10, 12, 14]。
```

##### reduce

> 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值

**reducer** 函数接收4个参数:

1. Accumulator (acc) (累计器)
2. Current Value (cur) (当前值)
3. Current Index (idx) (当前索引)
4. Source Array (src) (源数组)

```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

#### 排序元素

##### reverse

> 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会**改变原数组**

```js
numbers.reverse();// [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

```

##### sort

> 默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的；由于它取决于具体实现，因此无法保证排序的时间和空间复杂性

```js
numbers.sort(function(a, b){
  return a-b;
});
function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // a必须等于b
  return 0;
}

numbers.sort(compare);
// 这段代码，在b大于a时，会返回负数，反之则返回正数。如果相等的话，就会返回0。也就是说返回的是负数，就说明a比b小，这样sort就根据返回值的情况给数组做排序

// 自定义排序
var friends = [
  {name: 'John', age: 30},
  {name: 'Ana', age: 20},
  {name: 'Chris', age: 25}
];
　
function comparePerson(a, b){
  if (a.age < b.age){
    return -1
  }
  if (a.age > b.age){
    return 1
  }
  return 0;
}
console.log(friends.sort(comparePerson));
```

#### 搜索

##### indexOf

> 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1

```js
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));
// expected output: -1
```

##### find

> 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回undefined

```js
const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);
// expected output: 12
```



##### findIndex

> 方法返回数组中满足提供的测试函数的第一个元素的**索引**。否则返回-1

```js
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
```

##### includes

> 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false

```js
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('cat'));
// expected output: true

console.log(pets.includes('at'));
// expected output: false
```

#### 输出数组为字符串

##### toString

> 返回一个字符串，表示指定的数组及其元素

```js
const array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());
// expected output: "1,2,a,1a"
```

##### join

> 方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符

```js
const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(''));
// expected output: "FireAirWater"

console.log(elements.join('-'));
// expected output: "Fire-Air-Water"
```



## 栈

> 遵从后进先出原则的集合。新添加的或待删除的元素都保存在同一端，称作栈顶；在另一端就叫做栈底。

```js
let items = [];
function Stack() {
  //各种属性和方法的声明
}
this.push = function(element){
  items.push(element);
};
this.pop = function(){
  return items.pop();
}
this.peek = function(){
  return items[items.length-1];
};
this.isEmpty = function(){
  return items.length == 0;
};
this.size = function(){
  return items.length;
};
this.clear = function(){
  items = [];
};
```

### 解决问题

> 它可以存储访问过的任务或路径、撤销的操作

## 队列

> 遵循FIFO（First In First Out，**先进先出**，也称为**先来先服务**）原则的一组有序的项;队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾

```js
function Queue() {
  //这里是属性和方法
}
let items = [];
this.enqueue = function(element){
  items.push(element);
};
this.dequeue = function(){
  return items.shift();
};
this.front = function(){
  return items[0];
};
this.isEmpty = function(){
  return items.length == 0;
};
this.size = function(){
  return items.length;
};
this.print = function(){
  console.log(items.toString());
};
```





## 链表

## 集合

## 字典和散列表

## 树

## 图

## 排序和搜索算法

## 算法模式

## 算法复杂度