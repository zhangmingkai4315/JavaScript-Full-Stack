var http = require('http');
var cors = require('cors');
var app = express();

app.get('/products/:id',cors(), function(req, res, next) {
  res.json({
    msg: 'this is a cors-enabled for single origins!'
  });
});

// 配置只能接收特定域名的跨域请求

var corsOptions = {
  origin: 'http://example.com'
};

app.get('/user/:id',cors(corsOptions), function(req, res, next) {
  res.json({
    msg: 'this is a cors-enabled for single origins!'
  });
});

// 配置白名单

var whitelist = ['http://example1.com', 'http://example2.com'];
var corsOptions_whitelist = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};


//配置特定的http服务

app.options('/products/:id', cors()); // enable pre-flight request for DELETE request
//支持del操作
app.del('/products/:id', cors(), function(req, res, next){
  res.json({msg: 'This is CORS-enabled for all origins!'});
});



app.get('/stores/:id',cors(corsOptions_whitelist), function(req, res, next) {
  res.json({
    msg: 'this is a cors-enabled for single origins!'
  });
});



app.listen(80, function() {
  console.log("CORS SERVER FOR SINGLE ORIGIN AT PORT 80");
});
