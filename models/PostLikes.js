import mongoose from "mongoose"

const {model, Schema} = mongoose

const PostLikeSchema = new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    postId:{type:Schema.Types.ObjectId, ref:'Post', required:true},
    createdAt:{type:Date, default:new Date()}
})

export default model('PostLikes', PostLikeSchema)