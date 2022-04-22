import UserSchema from "../models/User.js";
import FollowerSchema from "../models/Followers.js";
import ConversationSchema from "../models/Conversation.js";
import ReportsSchema from "../models/Report.js";
import {validateRefreshToken} from "./TokenService.js";

export const getUserService = async (userId) => {
    const user = await UserSchema.findById(userId)
    if (!user) throw new Error('Користувача не знайдено')
    return user
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
export const sendMessageService = async (refreshToken, receiverId, text, image) => {
    if (!text) throw new Error('Поле не може бути порожнім')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    if (userData._id === receiverId) throw new Error('Ви не можете надсилати повідомлення самому собі')
    const conversation = await ConversationSchema.findOne({
        $or:[{participant1:userData._id, participant2: receiverId}, {participant2: userData._id, participant1:receiverId}]
    })
    if (conversation) {
        if (image) {
            conversation.messages.push({text:text, image:image, sender:userData._id})
            await conversation.save()
            return conversation
        } else {
            conversation.messages.push({text:text, sender:userData._id})
            await conversation.save()
            return conversation
        }
    } else {
        if (image) {
            const newConversation = await ConversationSchema.create({participant1:userData._id, participant2:receiverId})
            newConversation.messages.push({text:text, image: image, sender:userData._id})
            await newConversation.save()
            return newConversation
        } else {
            const newConversation = await ConversationSchema.create({participant1:userData._id, participant2:receiverId})
            newConversation.messages.push({text:text, sender:userData._id})
            await newConversation.save()
            return newConversation
        }
    }
}
export const receiveMessageService = async (refreshToken, receiverId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const conversation = await ConversationSchema.findOne({$or:[{participant1:receiverId, participant2: userData._id}, {participant1:userData._id, participant2:receiverId}]})
    if (!conversation) throw new Error('Такого чату не існує')
    return conversation
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
    if (reportedBefore) throw new Error('Ви вже скаржилися на даного користувача')
    const report = await ReportsSchema.create({reporterId:userData._id, accusedId, violation})
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