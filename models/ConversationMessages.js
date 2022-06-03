import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const ConversationMessagesSchema = new Schema({
    conversation: {type:Schema.Types.ObjectId, ref:'Conversation', required:true},
    text:{type:String, max: 2000},
    image:{data: Buffer,
        contentType: String},
    sender:{type:Schema.Types.ObjectId, ref:'User'},
    createdAt: {type:Date, default:new Date()}
})

export default model('ConversationMessages', ConversationMessagesSchema)