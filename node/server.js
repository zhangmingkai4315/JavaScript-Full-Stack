var http = require('http');
var util = require('util');
var querystring = require('querystring');

var messages=[];
messages.push({
  "name":"jone",
  "message":"hi"
});

exports.server=http.createServer(function (req,res) {
  if(req.method=='POST'&&req.url=="/messages/creat.json"){
    var message='';
    req.on('data',function (data,msg) {
      console.log(data.toString('utf-8'));
      message=exports.addMessage(data.toString('utf-8'));

    });
    req.on('end',function () {
      console.log('message',util.inspect(message,true,null));
      console.log('messages',util.inspect(message,true,null));
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(message);
    })
  }else if(req.method=='GET'&&req.url=="/messages/creat.json"){
    var body=exports.getMessages();
    res.writeHead(200,{
      'Content-Length':body.length,
      'Content-Type':'text/plain'
    });
    res.end(body);
  }else{
     res.writeHead(200, {'Content-Type': 'text/plain'});
     res.end("hello");
  }
}).listen(process.env.PORT||1337);
console.log("server IS Runing under port :"+process.env.PORT||1337);

exports.getMessages=function () {
  return JSON.stringify(messages);
}
exports.addMessage=function (data) {
  messages.push(querystring.parse(data));
  return JSON.stringify(querystring.parse(data));
}
