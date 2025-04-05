const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.ico': 'image/x-icon',
};

// Create a simple HTTP server that serves static files
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Default to index.html for root requests
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Resolve the file path relative to the public directory
  filePath = path.resolve('./public' + filePath);
  
  // Determine the file extension and corresponding MIME type
  const extname = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Check if the file exists
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If the file doesn't exist, return 404
      if (err.code === 'ENOENT') {
        console.error(`File not found: ${filePath}`);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested resource was not found on this server.</p>');
        return;
      }
      
      // For other errors, return 500
      console.error(`Server error: ${err.code}`);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<h1>500 Internal Server Error</h1><p>Sorry, there was a problem processing your request.</p>');
      return;
    }
    
    // If the file exists, serve it with the appropriate content type
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
  console.log(`Serving static files from ${path.resolve('./public')}`);
});