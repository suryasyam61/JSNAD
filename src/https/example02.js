/**
 * Description: Request to url with method GET and port 443 and received JSON object.
 */

/** Import generics dependences */
import https from 'https';
import 'pretty-console-colors';

// Create request method.
const req = https.request({
  hostname: 'jsonplaceholder.typicode.com',
  port: 443,
  path: '/todos/1',
  method: 'GET',
}, (res) => {
  console.log('๐ Request   | Response โคต๏ธ ');
  console.log('๐ Response  | statusCode โคต๏ธ ', res.statusCode);
  console.log('๐ Response  | statusMessage โคต๏ธ ', res.statusMessage);

  // Get received content.
  res.on('data', (content) => {
    console.log('๐ Response  | data โคต๏ธ ', JSON.parse(content));
  });
  // Event close.
  res.on('close', () => {
    console.log('๐ช Response  | close ๐');
  });
});

// Event error.
req.on('error', (e) => {
  console.log('โ Request   | error', e.message);
});
// Event close.
req.on('close', () => {
  console.log('๐ช Request   | close ๐');
});

// Send request.
req.end();
