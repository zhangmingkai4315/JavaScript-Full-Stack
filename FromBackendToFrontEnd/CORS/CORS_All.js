var http = require('http');
var cors = require('cors');
var app = express();

app.use(cors());
app.get('/products/:id', function(req, res, next) {
  res.json({
    msg: 'this is a cors-enabled for all origins!'
  });
});


app.listen(80, function() {
  console.log("CORS SERVER FOR ALL ORIGINS AT PORT 80");
});
