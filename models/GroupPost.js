import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const GroupPostsSchema = new Schema({
    groupId:{type:Schema.Types.ObjectId, ref:'Group', required:true},
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    text:{type:String, required:true},
    image:{data: Buffer,
        contentType: String},
    location:{type:String},
    likes:{type:Number, default:0},
    comments:{type:Number, default:0},
    createdAt:{type:Date, default:new Date()}
})

export default model('GroupPosts', GroupPostsSchema)