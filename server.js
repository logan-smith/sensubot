// Get dependencies
const express = require('express');
// const path = require('path');
const app = express();

// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// app.use(express.static(path.join(path.resolve(), 'assets'))
app.get('*', function(req, res) { res.redirect('https://www.sensubot.chat/index.html');});
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 80);
