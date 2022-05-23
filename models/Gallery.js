import mongoose from "mongoose"

const {model, Schema} = mongoose

const GallerySchema = new Schema({
    userId:{type:Schema.Types.ObjectId, ref:'User', required:true},
    image: {
        data: Buffer,
        contentType: String
    },
    createdAt:{type:Date, default:new Date()}
})

export default model('Gallery', GallerySchema)