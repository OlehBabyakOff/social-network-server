import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const ReportsSchema = new Schema({
    reporterId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    accusedId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    violation:{type:String, required:true},
    reportedAt:{type:Date, default:new Date()}
})

export default model('Reports', ReportsSchema)