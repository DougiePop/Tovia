const mongoose = require('mongoose');
const crypto = require('crypto');
const encrypt = require('mongoose-encryption');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://tovia:tovia1234@ds135382.mlab.com:35382/tovia', (err) => {
    if (err) return console.log(err);
    console.log('connected to tovia\'s mlab\'s mongoDB')
})

const userSchema = new Schema({
    user: String,
    message: String,
    passPhrase: String,
})

let encKey = crypto.randomBytes(32).toString('base64');
let sigKey = crypto.randomBytes(64).toString('base64');

userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey, encryptedFields: ['message'] });


module.exports = mongoose.model('user', userSchema);