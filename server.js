const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const logController = require('./controllers/logs.js');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/basiccrud', {
    useNewUrlParser: true,
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use('/logs', logController);

app.listen(port, () => {
    console.log('listening');
});
