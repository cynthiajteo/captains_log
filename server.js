const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const logController = require('./controllers/logs.js');
const methodOverride = require('method-override');
require('dotenv').config();

mongoose.connect(process.env.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// mongoose.connect(process.env.mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use('/logs', logController);

app.listen(port, () => {
    console.log('listening');
});
