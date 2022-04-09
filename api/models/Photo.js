const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const config = require('../config');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: async value => {
                if (!value) {
                    return true;
                }

                const extName = path.extname(value);
                if (config.imageAllowedTypes.length === 0 || config.imageAllowedTypes.includes(extName)) {
                    return true;
                }

                const filePath = config.avatarsPath + '/' + value;
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }

                return false;
            },
            message: 'Image with this extension cannot be uploaded'
        }
    }
});

const Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;