const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    avatarsPath: path.join(rootPath, 'public/uploads/avatars'),
    photoPath: path.join(rootPath, 'public/uploads/photos'),
    mongo: {
        url: 'mongodb://localhost/cw12_zush',
        options: { useNewUrlParser: true }
    },
    facebook: {
        appId: '',
        appSecret: ''
    },
    google: {
        appId: '',
        appSecret: ''
    },
    avatarAllowedTypes: ['.png', '.gif', '.jpg', '.jpeg'],
};