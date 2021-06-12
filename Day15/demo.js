const http = require('http');
const url = require('url');
const hostname = "127.0.0.1";
const port = "3000";

const queryString = require('querystring');

const server = http.createServer((req, res) => {
    const urlparse = url.parse(req.url, true);
    console.log(urlparse);

    if (urlparse.pathname == "/about" && req.method == 'GET') {
        res.statusCode = 200;
        res.setHeader("content-type", "application/JSON");
        res.end(JSON.stringify({ name: "Deepak karnani", collage: "JIET" }));
    }
    else if(urlparse.pathname == "/Login" && req.method == 'POST') {
        res.statusCode = 200;
        res.setHeader("content-type", "application/JSON");
        res.end(JSON.stringify({ name: "Deepak karnani", collage: "JIET" }));
    }
    else {
        res.statusCode = 200;
        res.setHeader("content-type", "application/JSON");
        res.end(JSON.stringify({ message: "Generic response" }));
    }
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});