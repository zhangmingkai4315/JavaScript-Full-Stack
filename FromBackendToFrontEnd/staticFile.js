var http = require('http'),
  url = require('url'),
path = require('path');
fs = require('fs');
port = process.argv[2] || 8888;
http.createServer(function(req, res) {
  var uri = url.parse(req.url).pathname,
    filename = path.join(process.cwd(), uri);
    console.log(uri);
    console.log(filename);
  fs.exists(filename, function(exists) {
    if (!exists) {
      res.writeHead(404, {
        "Content-Type": 'text/plain'
      });
      res.write("404 Not Found\n");
      res.end();
      return;
    }
    if (fs.statSync(filename).isDirectory()) {
      filename += '/index.html';
      fs.readFile(filename, "binary", function(err, file) {
        if (err) {
          res.writeHead(500, {
            "Content-Type": "text/plain"
          });
          res.write(err + "\n");
          res.end();
          return;
        }
      })
    }
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        res.write(file, "binary");
        res.end();
      })
    }
  })
}).listen(parseInt(port, 10));
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
