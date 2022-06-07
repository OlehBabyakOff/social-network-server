import UserSchema from "../models/User.js";
import FollowerSchema from "../models/Followers.js";
import ConversationSchema from "../models/Conversation.js";
import ReportsSchema from "../models/Report.js";
import {validateRefreshToken} from "./TokenService.js";
import GallerySchema from "../models/Gallery.js";
import ConversationMessagesSchema from "../models/ConversationMessages.js";

export const getUserService = async (userId) => {
    const user = await UserSchema.findById(userId)
    if (!user) throw new Error('Користувача не знайдено')
    return user
}
export const getUsersService = async () => {
    const users = await UserSchema.find()
    if (!users) throw new Error('Користувачів не знайдено')
    return users
}
export const getLimitedUsersService = async (refreshToken) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')

    const users = await UserSchema.find({_id: {$ne: userData._id}}).limit(5).sort({_id: -1})
    if (!users) throw new Error('Користувачів не знайдено')
    return users
}
// follow
export const followToUserService = async (followedId, refreshToken) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const followerUser = await validateRefreshToken(refreshToken);
    if (!followerUser) throw new Error('Користувача не знайдено')
    const followedUser = await UserSchema.findById(followedId)
    if (!followedUser) throw new Error('Користувача не знайдено')
    if (followerUser._id === followedUser._id) throw new Error('Ви не можете підписатися на самого себе')
    const candidate = await FollowerSchema.findOne({followerId: followerUser._id, followedId:followedUser._id})
    if (candidate) {
        const follow = await FollowerSchema.findOneAndDelete({followerId: followerUser._id, followedId:followedUser._id})
        return {
            follow,
            message: "Ви відписалися від користувача"
        }
    } else {
        const follow = await FollowerSchema.create({followerId: followerUser._id, followedId:followedUser._id})
        return {
            follow,
            message: "Ви підписалися на користувача"
        }
    }
}
export const getFollowersService = async (userId) => {
    const followers = await FollowerSchema.find({followedId:userId})
    if (!followers) throw new Error('Підписників не знайдено')
    return followers
}
export const getFollowingsService = async (userId) => {
    const followings = await FollowerSchema.find({followerId:userId})
    if (!followings) throw new Error('Підписки не знайдені')
    return followings
}
// messages
export const createConversationService = async (refreshToken, receiverId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    if (userData._id === receiverId) throw new Error('Ви не можете надсилати повідомлення самому собі')
    const conversation = await ConversationSchema.findOne({
        $or:[{participant1:userData._id, participant2: receiverId}, {participant2: userData._id, participant1:receiverId}]
    })
    if (conversation) {
        return conversation
    } else {
        const newConversation = await ConversationSchema.create({participant1:userData._id, participant2:receiverId})
        return newConversation
    }
}

export const sendMessageService = async (refreshToken, conversationId, text, image) => {
    if (!text && !image) throw new Error('Повідомлення не може бути порожнім')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const conversation = await ConversationSchema.findOne({_id: conversationId})
    const message = await ConversationMessagesSchema.create({conversation: conversation._id, text: text, sender: userData._id, createdAt: Date.now()})
    if (image) {
        await ConversationMessagesSchema.findOneAndUpdate({_id: message._id}, {image})
        const imageMsg = await ConversationMessagesSchema.findOne({_id: message._id})
        return imageMsg
    } else {
        return message
    }
}
export const getConversationService = async (refreshToken) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const conversation = await ConversationSchema.find({$or:[{participant2: userData._id}, {participant1:userData._id}]})
    if (!conversation) throw new Error('Такого чату не існує')
    return conversation
}
export const getOneConversationService = async (refreshToken, conversationId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const conversation = await ConversationSchema.findOne({_id: conversationId})
    if (!conversation) throw new Error('Такого чату не існує')
    return conversation
}
export const receiveMessageService = async (refreshToken, conversationId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const conversation = await ConversationSchema.findOne({_id: conversationId})
    if (!conversation) throw new Error('Такого чату не існує')
    const messages = await ConversationMessagesSchema.find({conversation: conversation._id})
    return messages
}
// reports
export const sendReportService = async (refreshToken, accusedId, violation) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const accused = await UserSchema.findById(accusedId)
    if (!accused) throw new Error('Користувача не знайдено')
    if (userData._id == accusedId) throw new Error('Ви не можете поскаржитись на самого себе')
    if (accused.roles.isAdmin) throw new Error('Ви не можете поскаржитись на адміністратора')
    const reportedBefore = await ReportsSchema.find({reporterId: userData._id, accusedId})
    if (reportedBefore.length > 0) throw new Error('Ви вже скаржилися на даного користувача')
    const report = await ReportsSchema.create({reporterId:userData._id, accusedId, violation, reportedAt: Date.now()})
    const autoCheck = await ReportsSchema.find({accusedId})
    if (autoCheck.length >= 5) {
        const autoBan = await UserSchema.findOneAndUpdate({_id:accusedId},{"roles.isBlocked":true}, {new:true})
        await autoBan.save()
    }
    return report
}
export const getReportsService = async (accusedId) => {
    if (!accusedId) throw new Error('Користувача не знайдено')
    const reports = await ReportsSchema.find({accusedId})
    return reports
}
export const addGalleryService = async (refreshToken, image) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const gallery = await GallerySchema.create({userId: userData._id})
    const photo = await GallerySchema.updateOne({_id: gallery._id}, {
        image
    })
    return photo
}
export const getGalleryService = async (id) => {
    const gallery = await GallerySchema.find({userId: id}).sort({_id: -1})
    return gallery
}
export const deleteGalleryService = async (refreshToken, id) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const gallery = await GallerySchema.findOneAndDelete({_id: id, userId: userData._id})
    return gallery
}
export const updateInfoService = async (refreshToken, email, username, first_name, second_name, phone, birthday) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const user = await UserSchema.findOneAndUpdate({_id: userData._id}, {
        email,
        username,
        first_name,
        second_name,
        phone,
        birthday
    })
    return user
}
export const updateAvatarService = async (refreshToken, avatar) => {
    if (!avatar) throw new Error('Дані порожні')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const user = await UserSchema.findOneAndUpdate({_id: userData._id}, {
        avatar
    })
    return user
}
export const updateBgService = async (refreshToken, background) => {
    if (!background) throw new Error('Дані порожні')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const user = await UserSchema.findOneAndUpdate({_id: userData._id}, {
        background
    })
    return user
}