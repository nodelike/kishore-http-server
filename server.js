const http = require("http");
const { v4: uuidv4 } = require('uuid');

const server = http.createServer((request, response) => {
    try {
        const { url } = request;
    
        if (url == "/html"){
            response.writeHead(200, { 'Content-Type': 'text/html'});
            response.write(`
                <!DOCTYPE html>
                <html>
                <head>
                </head>
                <body>
                    <h1>Any fool can write code that a computer can understand. Good programmers write code that humans can understand.</h1>
                    <p> - Martin Fowler</p>
                </body>
                </html>
            `);
            response.end();
    
        } else if (url == "/json"){
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(
                {
                    "slideshow": {
                    "author": "Yours Truly",
                    "date": "date of publication",
                    "slides": [
                        {
                        "title": "Wake up to WonderWidgets!",
                        "type": "all"
                        },
                        {
                        "items": [
                            "Why <em>WonderWidgets</em> are great",
                            "Who <em>buys</em> WonderWidgets"
                        ],
                        "title": "Overview",
                        "type": "all"
                        }
                    ],
                    "title": "Sample Slide Show"
                    }
                }
            ));
            response.end();
    
        } else if (url == "/uuid"){
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify({ uuid: uuidv4() }));
            response.end();
        } else if (url.startsWith('/status/')){
            const statusCode = parseInt(url.split('/')[2]);
            if(statusCode){
                response.writeHead(statusCode);
                response.end();
            }
        } else if ( url.startsWith("/delay/")){
            const delaySeconds = parseInt(url.split("/")[2]);
            setTimeout(() => {
                response.writeHead(200);
                response.end();
            }, delaySeconds * 1000);
        } else {
            response.writeHead(404);
            response.end();
        }
    } catch (error) {
        console.log(`Internal Server Error ${error}`)
        response.writeHead(500);
        response.end();
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});