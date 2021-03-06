/**
 * Description: Create https server and show lifecycle-events.
 * You need write in your browser: https://localhost:443/
 */

/** Import generics dependences */
import https from 'https';
import fs from 'fs';
import path from 'path';
import 'pretty-console-colors';

/** Define configuration */
const config = {
  port: 443,
};

const __dirname = path.resolve();

// Create server instance.
const server = https.createServer({
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
  console.log('---------- | -------------');
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
  console.log('๐ Server   | Request โคต๏ธ');

  request.on('resume', () => {
    console.log('๐ Request  | Resume โคต๏ธ');
  });
  request.on('data', () => {
    console.log('๐ Request  | Data โคต๏ธ');
  });
  request.on('end', () => {
    console.log('๐ Request  | End โคต๏ธ');

    // Set statusCode and data for end response.
    response.end(null, 'utf8', () => {
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
