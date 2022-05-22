import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const ConversationSchema = new Schema({
    participant1:{type:Schema.Types.ObjectId, ref:'User', required:true},
    participant2:{type:Schema.Types.ObjectId, ref:'User', required:true},
    messages: [{
        text:{type:String, max: 2000},
        image:{data: Buffer,
            contentType: String},
        sender:{type:Schema.Types.ObjectId, ref:'User'},
        createdAt: {type:Date, default:new Date()}
    }],
})

export default model('Conversation', ConversationSchema)