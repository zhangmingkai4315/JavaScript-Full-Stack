var obj=JSON.parse('{"a":1,"b":"Hello"}');
var stringObj=JSON.stringify({a:1,b:"Hello"});

console.log(obj);
console.log(stringObj);

var obj = {
  foo: 'foo',
  toJSON: function () {
    return 'bar';
  }
};

//toJSON方法在stringfy时候被调用后再序列化为JSON对象

console.log(JSON.stringify(obj));      // '"bar"'
console.log(JSON.stringify({x: obj})); // '{"x":"bar"}'
