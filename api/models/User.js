const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const path = require("path");
const fs = require("fs");
const config = require('../config');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: async function(value) {
        if (!this.isModified('email')) return true;

        const checkUser = await User.findOne({email: value});
        if (checkUser) return false;
      },
      message: 'User with this email is already registered'
    }
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: async value => {
        if (!value) {
          return true;
        }

        const extName = path.extname(value);
        if (config.avatarAllowedTypes.length === 0 || config.avatarAllowedTypes.includes(extName)) {
          return true;
        }

        const filePath = config.avatarsPath + '/' + value;
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }

        return false;
      },
      message: 'An avatar with this extension cannot be uploaded'
    }
  },
  displayName: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
  },
  googleId: String,
  facebookId: String
});

const SALT_WORK_FACTOR = 10;

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.generateToken = function() {
  this.token = nanoid();
};

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;