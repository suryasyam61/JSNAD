/**
 * Description: Create http server with custom routers and reponses for POST or GET methods.
 */

/** Import generics dependences */
import http from 'http';
import 'pretty-console-colors';
import RouteMain from './routes/main.js';
import RouteArticles from './routes/articles.js';
import RouteNotFound from './routes/notfound.js';

// Register all routes from class.
const routes = [
  RouteMain,
  RouteArticles,
];

// Instance NoFound
const notfound = new RouteNotFound();

// Create array with only urls from routes.
const urls = routes.map((e) => { console.log(e); return e.url(); });

/** Define configuration and response object */
const config = {
  host: '127.0.0.1',
  port: 3000,
};

// Create server instance.
const server = http.createServer();

// Set listen function and set config.
server.listen(config, () => {
  console.log(`๐ Server   | Running on: ${config.host} and port: ${config.port}`);
});
// [1] Server Event for show listening server.
server.on('listening', () => {
  console.log('๐ Server   | Listening\n');
});
// [2] Server Event for show connection http.
server.on('connection', () => {
  console.log('๐ Server   | Connection โคต๏ธ');
  console.log('----------- | -------------');
});
// [-] Server Event if server has an error.
server.on('close', () => {
  console.log('๐ช Server   | Close');
});
// [-] Server Event if server has an error.
server.on('error', (err) => {
  console.log('โ Server   | Error', err);
});
// [3] Server Event when received and request http.
server.on('request', (request, response) => {
  console.log(`๐ Server   | Request โคต๏ธ  ๐ฆ Method: ${request.method} Url: ${request.url}`);

  request.on('resume', () => {
    console.log('๐ Request  | Resume โคต๏ธ');
  });
  request.on('data', () => {
    console.log('๐ Request  | Data โคต๏ธ');
  });
  request.on('end', () => {
    console.log('๐ Request  | End โคต๏ธ');

    // Search into urls array if exists the request url.
    const index = urls.indexOf(request.url);
    switch (index) {
      case -1:
        // If not found Route response with default 404 status and JSON data.
        notfound.all(request, response);
        break;
      default:
        routes[index][String(request.method).toLowerCase()](request, response);
        break;
    }
  });
  request.on('close', () => {
    console.log('๐ช Request  | Close โคต๏ธ');
  });
  request.on('error', () => {
    console.log('โ Request  | Error');
  });

  response.on('close', () => {
    console.log('๐ช Response | Close ๐');
  });
  response.on('finish', () => {
    console.log('๐ Response | Finish โคต๏ธ');
  });
});
