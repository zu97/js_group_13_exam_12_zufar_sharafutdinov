const mongoose = require('mongoose');
const config = require('./config');

const Photo = require('./models/Photo');
const User = require('./models/User');
const {nanoid} = require("nanoid");

const run = async () => {
    await mongoose.connect(config.mongo.url, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();
    for (let coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [anna, john] = await User.create({
        email: 'anna@gmail.com',
        password: '123',
        displayName: 'Anna',
        avatar: 'anna.jpg',
        token: nanoid()
    }, {
        email: 'john@gmail.com',
        password: '123',
        displayName: 'John',
        avatar: 'john.jpg',
        token: nanoid()
    });

    await Photo.create({
        user: anna,
        title: 'Dog posing',
        image: 'dog.jpg'
    }, {
        user: anna,
        title: 'Camera',
        image: 'camera.jpg'
    }, {
        user: john,
        title: 'Sunset',
        image: 'sunset.jpg'
    }, {
        user: john,
        title: 'Motorbike',
        image: 'moto.jpg'
    }, {
        user: anna,
        title: 'Beautiful landscape',
        image: 'landscape.jpg'
    }, {
        user: john,
        title: 'Sea',
        image: 'sea.jpg'
    }, {
        user: john,
        title: 'Sunset on sea',
        image: 'sea-2.jpg'
    }, {
        user: anna,
        title: 'Beautiful landscape',
        image: 'landscape-2.jpg'
    }, {
        user: john,
        title: 'Rolling mountains',
        image: 'mountains.jpg'
    });

    await mongoose.connection.close();
};

run().catch((e) => console.error(e));
