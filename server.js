const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const userController = require('./server-side/userController');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/client/public')));

app.post('/', userController.createMessage)
app.get('/', userController.getMessage)

app.listen(3000)

