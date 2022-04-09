const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { nanoid } = require('nanoid');
const path = require('path');

const config = require('../config');
const Photo = require('../models/Photo');
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.photoPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});

const router = express.Router();
const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        let byUser = null;
        if (req.query.byUser) {
            byUser = {user: req.query.byUser};
        }

        const photos = await Photo.find(byUser).populate('user', 'displayName');
        return res.send(photos);
    } catch(e) {
        return next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        const photo = new Photo({
            user: req.user._id,
            title: req.body.title,
            image: req.file ? req.file.filename : null
        });

        await photo.save();
        return res.send(photo);
    } catch(e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        return next(e);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            return res.send({message: 'ok'});
        }

        if (!photo.user.equals(req.user._id)) {
            return res.status(403).send({error: 'Insufficient rights to execute'});
        }

        await photo.remove();
        return res.send({message: 'ok'});
    } catch(e) {
        return next(e);
    }
});

module.exports = router;
