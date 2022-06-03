import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const ConversationSchema = new Schema({
    participant1:{type:Schema.Types.ObjectId, ref:'User', required:true},
    participant2:{type:Schema.Types.ObjectId, ref:'User', required:true}
})

export default model('Conversation', ConversationSchema)