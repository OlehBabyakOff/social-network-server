import mongoose from "mongoose"

const {model, Schema} = mongoose

const PostSchema = new Schema({
    user:{type:Schema.Types.ObjectId, ref:'User', required:true},
    text:{type:String, require: true},
    image:{data: Buffer,
        contentType: String},
    location:{type:String},
    likes:{type:Number, default:0},
    comments:{type:Number, default:0},
    createdAt:{type:Date, default:new Date()}
})

export default model('Post', PostSchema)