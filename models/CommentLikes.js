import mongoose from "mongoose"

const {model, Schema} = mongoose

const CommentLikeSchema = new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    commentId:{type:Schema.Types.ObjectId, ref:'Comment', required:true},
    createdAt:{type:Date, default:new Date()}
})

export default model('CommentLikes', CommentLikeSchema)