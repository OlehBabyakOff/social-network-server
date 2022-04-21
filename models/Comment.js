import mongoose from "mongoose"

const {model, Schema} = mongoose

const CommentSchema = new Schema({
    postId:{type:Schema.Types.ObjectId, ref:'Post', required:true},
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    parentId:{type:Schema.Types.ObjectId, ref:'Comment'},
    childs:[
        {type:Schema.Types.ObjectId, ref:'Comment'}
    ],
    content:{type:String, required:true},
    likes:{type:Number, default:0},
    createdAt:{type:Date, default:new Date()}
})

export default model('Comment', CommentSchema)