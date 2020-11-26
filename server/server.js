const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

// console.log that your server is up and running
app.listen(port, () => console.log(`Server is up and running.`));

// use body-parser middleware json
app.use(bodyParser.json());

// routes//
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/index'));

// Default response for any other request (error handling)
app.use(function(req, res){
    res.status(404);
});