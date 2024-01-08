const express = require('express');
const basicAuth = require('basic-auth');

const app = express();
const port = 3000;

// Define your username and password
const username = 'testuser';
const password = 'testpassword';

// Middleware for basic authentication
const auth = (req, res, next) => {
  const credentials = basicAuth(req);

  if (!credentials || credentials.name !== username || credentials.pass !== password) {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).send('Authentication required.');
  }

  return next();
};

// Use the authentication middleware for all routes
app.use(auth);

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static('public'));

// Define your routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/broadcast/1', (req, res) => {
  res.json({ country: 'India' });
});

app.get('/broadcast/2', (req, res) => {
  res.json({ country: 'China' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
