import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const GroupCommentSchema = new Schema({
    groupId:{type:Schema.Types.ObjectId, ref:'Group', required:true},
    postId:{type:Schema.Types.ObjectId, ref:'GroupPosts', required:true},
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    parentId:{type:Schema.Types.ObjectId, ref:'GroupComment'},
    childs:[
        {type:Schema.Types.ObjectId, ref:'GroupComment'}
    ],
    content:{type:String, required:true},
    likes:{type:Number, default:0},
    createdAt:{type:Date, default:new Date()}
})

export default model('GroupComment', GroupCommentSchema)