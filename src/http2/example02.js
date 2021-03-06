/**
 * Description: Create http2 server and show lifecycle-events.
 * You need write in your browser: https://localhost:8443/
 */

/** Import generics dependences */
import http2 from 'http2';
import fs from 'fs';
import path from 'path';
import 'pretty-console-colors';

const __dirname = path.resolve();

/** Define configuration and response object */
const config = {
  host: '127.0.0.1',
  port: 8443,
};

// Create server instance.
const server = http2.createSecureServer({
  key: fs.readFileSync(`${__dirname}/src/http2/localhost-privkey.pem`),
  cert: fs.readFileSync(`${__dirname}/src/http2/localhost-cert.pem`),
});

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
  console.log('-----------| -------------');
});
// [-] Server Event for show session http.
server.on('session', () => {
  console.log('๐ Server   | Session โคต๏ธ');
});
// [-] Server Event for show session http.
server.on('stream', () => {
  console.log('๐ Server   | Stream โคต๏ธ');
});
// [-] Server Event for show connect http.
server.on('connect', () => {
  console.log('๐ Server   | Connect');
});
// [-] Server Event if server has an error.
server.on('close', () => {
  console.log('๐ช Server   | Close');
});
// [-] Server Event if server has an error.
server.on('error', (err) => {
  console.log('โ Server   | Error', err);
});
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

    // Set statusCode and data for end response.
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    const result = JSON.stringify({
      status: 'OK',
      result: 'GET Endpoint /',
    });
    response.end(result, 'utf8', () => {
      console.log('๐ Response | End โคต๏ธ');
    });
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
