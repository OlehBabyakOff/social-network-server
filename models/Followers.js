import mongoose from 'mongoose'
const {model, Schema} = mongoose

const FollowerSchema = new Schema({
    followerId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    followedId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    followedAt:{type:Date, default:new Date()}
})

export default model('Follower', FollowerSchema)