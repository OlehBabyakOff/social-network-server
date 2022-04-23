import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const GroupSchema = new Schema({
    title:{type:String, required:true},
    creatorId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    avatar: {
        data: Buffer,
        contentType: String
    },
    background: {
        data: Buffer,
        contentType: String
    },
    admins: [{
        adminId:{type:Schema.Types.ObjectId, ref:'User'}
    }],
    createdAt:{type:Date, default:new Date()}
})

export default model('Group', GroupSchema)