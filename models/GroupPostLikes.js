import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const GroupPostLikeSchema = new Schema({
    groupId:{type:Schema.Types.ObjectId, ref:'Group', required:true},
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    postId:{type:Schema.Types.ObjectId, ref:'GroupPosts', required:true},
    createdAt:{type:Date, default:new Date()}
})

export default model('GroupPostLikes', GroupPostLikeSchema)