//1. ES6中的Class只是一个语法糖，而JavaScript本身仍是原型继承方式
var o={a:1,b:2};
o.__proto__={b:3,c:4};
o.__proto__.__proto__=null;
console.log(o.a);
console.log(o.b); //2 原型系统中的值不会被访问到“property shadowing”
console.log(o.c);
console.log(o.d); //原型链中不包含该属性


//2. 方法继承

var methodObj={
  a:2,
  b:function(arg) {
    return this.a+1;  //this 指代当前对象
  }
}
console.log(methodObj.b());  //3

var p=Object.create(methodObj);  //创建一个新的对象继承自对象methodObj
p.a=10;
console.log(p.b());   //11 这里的this指代的是继承后的新的对象

// 3。创建对象

var o={a:1};
var a=["yo","whatup","?"];

function f(argument) {
  // body...
  return argument;
}

console.log(o.hasOwnProperty("a"));  //默认情况下继承自Object 拥有了属性hasOwnProperty  //o-->Object.prototype-->null

console.log(a.indexOf("?")); //默认情况下继承自Array(包含一些数组操作的方法) Array 继承自Object //a-->Array.prototype-->Object.prototype-->null

console.log(f.call(null,"hello"));  //默认继承自Function,包含了call bind等方法 //f-->Function.prototype-->Object.prototype-->null


// 4. 构造器

var a=function(argument1,argument2) {
  // body...
  this.name=argument1;
  this.price=argument2;
}

a.prototype={
  addPrice:function (price) {
    this.price+=price;
  }
}


var food=new a("Food",10);
var toy=new a("Toy",20);
food.addPrice(2);
console.log(food.price);


// 5. 使用Object.create创建对象

var a={a:1};
var b=Object.create(a);  //b-->a-->Object.prototype-->null
var c=Object.create(b);   //c-->b-->a-->Object.prototype-->null
var d=Object.create(null); //d-->null

console.log(Object.getPrototypeOf(a));  //获得原型对象
console.log(Object.getPrototypeOf(b));
console.log(Object.getPrototypeOf(c));
// 原型链的存在，导致对于属性的查找将会遍历整个的原型继承关系链中，可以通过查询hasOwnProperty查看当前对象的属性 不进行属性查找


// 6 实例

function A(a){
  this.valA=a;
}

A.prototype={
  varA:null,
  doSomething:function () {
    console.log("A prototype doSomething");
  }
}

function B(a,b) {
  A.call(this,a);
  this.valB=b;
}

B.prototype=Object.create(A.prototype,{
  valB:{
    value:null,
    enumerable:true,
    configurable:true,
    writeable:true
  },
  doSomething:{
    value:function() {
      // body...
      A.prototype.doSomething.apply(this);
    },
    enumerable:true,
    configurable:true,
    writeable:true
  }
});
B.prototype.constructor=B;
var b=new B();
b.doSomething();

// 7. Pseudo-Class Model

function Animal(name) {
  // body...
  this.name=name;
}

Animal.prototype={
  name:"Default name",
  Jump:function () {
    console.log(this.name+" is Jumping");
  }
}

function Rabbit(name) {
  Animal.apply(this,arguments);  //调用Animal构造函数并传递this以及参数集合
}

Rabbit.prototype=Object.create(Animal.prototype);
Rabbit.prototype.run=function () {
  console.log(this.name+" is running");
}
Rabbit.prototype.Jump=function () {    //重载当前对象的父类方法
  console.log(this.name+" is running(Rabbit version)");
}
var rabbit=new Rabbit("Rabbit");
rabbit.Jump();
rabbit.run();



// 8 静态方法和protected方法

function StaticExample(argument) {
  // body...
  StaticExample.count++;
}
StaticExample.count=0
var s1=new StaticExample();
var s2=new StaticExample();
console.log(StaticExample.count);


function ProtectedExample(argument) {
  // body...
}

ProtectedExample.prototype._doProtected = function (arguments) {
  console.log("ProtectedExample FUNCTION");
}

var p1=new ProtectedExample();
p1._doProtected();  //仍然可以访问但是只是做了名称说明
