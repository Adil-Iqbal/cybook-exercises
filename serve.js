const http = require('http');
const express = require('express');
const app = express();

app.use("/vendor", express.static('vendor'));
app.use("/static", express.static('static'));

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});

app.listen(3000, () => console.log('Learn Cypress: Exercises\nhttp://localhost:3000/\n'));