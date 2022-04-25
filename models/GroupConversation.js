import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const GroupConversationSchema = new Schema({
    groupId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    messages: [{
        text:{type:String, max: 2000},
        image:{data: Buffer,
            contentType: String},
        sender:{type:Schema.Types.ObjectId, ref:'User'}
    }],
})

export default model('GroupConversation', GroupConversationSchema)