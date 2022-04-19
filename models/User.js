import mongoose from "mongoose"

const {model, Schema} = mongoose

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, unique: true, required: true},
    first_name: {type: String, required: true},
    second_name: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, unique: true, required: true},
    birthday: {type: Date, required: true},
    activationLink: {type: String},
    avatar: {
        data: Buffer,
        contentType: String
    },
    background: {
        data: Buffer,
        contentType: String
    },
    roles: {
        isActivated: {type: Boolean, default: false},
        isAdmin: {type: Boolean, default: false},
        isBlocked: {type: Boolean, default: false}
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export default model('User', UserSchema)