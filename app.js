var http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs"),
  port = process.argv[2] || 8081;

http.createServer(function (request, response) {

  var uri = url.parse(request.url).pathname, filename = path.join(process.cwd(), 'www', uri);

  fs.exists(filename, function (exists) {

    if (!exists) {
      //3/15/2018 (Mas): Pass everything to index.html and let Angular handle the 404 errors
      filename = path.join(process.cwd(), 'www', '/index.html');
    } else {
      if (fs.statSync(filename).isDirectory()) filename += '/index.html';
    }



    fs.readFile(filename, "binary", function (err, file) {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.write(err + "\n");
        response.end();
        return;
      }


      if (request.url.indexOf('.css') > -1) {


      }
      //console.log('SET CACHE');
      //response.setHeader("Cache-Control", "public, max-age=2592000");
      //response.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));