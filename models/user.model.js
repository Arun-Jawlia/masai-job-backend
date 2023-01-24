const mongoose= require('mongoose');

const userScheme = mongoose.Schema({
    name: {type: 'string', required: true},
    email: {type: 'string', required: true},
    password: {type: 'string', required: true}
})

const UserModel = mongoose.model('jobusers', userScheme)
module.exports={
    UserModel
}