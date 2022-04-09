const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');
const users = require('./app/users');
const photos = require('./app/photos');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', users);
app.use('/photos', photos);

const run = async () => {
    await mongoose.connect(config.mongo.url, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
}

run().catch((e) => console.error(e));
