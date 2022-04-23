import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const GroupMembersSchema = new Schema({
    groupId:{type:Schema.Types.ObjectId, ref:'Group', required:true},
    memberId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    joinedAt:{type:Date, default:new Date()}
})

export default model('GroupMembers', GroupMembersSchema)