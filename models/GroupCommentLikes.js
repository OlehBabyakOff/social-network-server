import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const GroupCommentLikeSchema = new Schema({
    groupId:{type:Schema.Types.ObjectId, ref:'Group', required:true},
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    postId:{type:Schema.Types.ObjectId, ref:'GroupPosts', required:true},
    commentId:{type:Schema.Types.ObjectId, ref:'GroupComment', required:true},
    createdAt:{type:Date, default:new Date()}
})

export default model('GroupCommentLikes', GroupCommentLikeSchema)