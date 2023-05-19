console.log('May the Node be with you.')

const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')


function serveHTML (req, res, htmlFile) {
    fs.readFile(`${htmlFile}`, function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function headsOrTails(int) {
    return (int === 0) ? "heads" : "tails"
}

const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);

    console.log(page, params)

    if (page === '/') {
        serveHTML(req, res, 'index.html')
        
    } else if (page === '/api') {
        let resultBinary = getRandomInt(2)
        console.log(resultBinary)
        let headsOrTailsResult = headsOrTails(resultBinary)
        console.log(headsOrTailsResult)
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
            result: headsOrTailsResult,
        }
        res.end(JSON.stringify(objToJson));

    }
    else if (page === '/css/style.css'){
      fs.readFile('css/style.css', function(err, data) {
        res.write(data);
        res.end();
      });
    }else if (page === '/js/main.js'){
      fs.readFile('js/main.js', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(data);
        res.end();
      });
    }else{
      figlet('404!!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        res.write(data);
        res.end();
      });
    }
  });
  
  server.listen(8000);
