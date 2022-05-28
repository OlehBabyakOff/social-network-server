import UserSchema from "../models/User.js";
import GroupSchema from "../models/Group.js";
import PostSchema from "../models/Post.js";
import ReportsSchema from "../models/Report.js";
import GroupPostsSchema from "../models/GroupPost.js";
import {validateRefreshToken} from "./TokenService.js";

export const getUsersService = async () => {
    const users = await UserSchema.find().sort({_id: -1})
    return users
}
export const getGroupsService = async () => {
    const groups = await GroupSchema.find().sort({_id: -1})
    return groups
}
export const getPostsService = async () => {
    const posts = await PostSchema.find().sort({_id: -1})
    return posts
}
export const getReportsService = async () => {
    const reports = await ReportsSchema.find().sort({_id: -1})
    return reports
}
export const getGroupPostsService = async () => {
    const groupPosts = await GroupPostsSchema.find().sort({_id: -1})
    return groupPosts
}
export const allowBanUserService = async (refreshToken, reporterId, accusedId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken)
    if (!userData) throw new Error('Користувача не знайдено')
    if (!accusedId && !reporterId) throw new Error('Користувача не знайдено')

    if (userData.roles.isAdmin) {
        const banUser = await UserSchema.findOneAndUpdate({_id: accusedId}, {"roles.isBlocked":true}, {new:true})
        await ReportsSchema.findOneAndDelete({reporterId, accusedId})
        return banUser
    } else {
        throw new Error('Ви не маєте права адміністратора')
    }
}
export const denyBanUserService = async (refreshToken, reporterId, accusedId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken)
    if (!userData) throw new Error('Користувача не знайдено')
    if (!accusedId && !reporterId) throw new Error('Користувача не знайдено')

    if (userData.roles.isAdmin) {
        const denyBan = await ReportsSchema.findOneAndDelete({reporterId, accusedId})
        return denyBan
    } else {
        throw new Error('Ви не маєте права адміністратора')
    }
}
export const banUserService = async (refreshToken, userId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken)
    if (!userData) throw new Error('Користувача не знайдено')
    if (!userId) throw new Error('Користувача не знайдено')

    if (userData.roles.isAdmin) {
        const banUser = await UserSchema.findOneAndUpdate({_id: userId}, {"roles.isBlocked":true}, {new:true})
        return banUser
    } else {
        throw new Error('Ви не маєте права адміністратора')
    }
}
export const unbanUserService = async (refreshToken, userId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken)
    if (!userData) throw new Error('Користувача не знайдено')
    if (!userId) throw new Error('Користувача не знайдено')

    if (userData.roles.isAdmin) {
        const unbanUser = await UserSchema.findOneAndUpdate({_id: userId}, {"roles.isBlocked":false}, {new:true})
        return unbanUser
    } else {
        throw new Error('Ви не маєте права адміністратора')
    }
}
export const setAdminService = async (refreshToken, userId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken)
    if (!userData) throw new Error('Користувача не знайдено')
    if (!userId) throw new Error('Користувача не знайдено')

    if (userData.roles.isAdmin) {
        const user = await UserSchema.findOneAndUpdate({_id: userId}, {"roles.isAdmin":true}, {new:true})
        user.save()
        return user
    } else {
        throw new Error('Ви не маєте права адміністратора')
    }
}
export const unAdminService = async (refreshToken, userId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken)
    if (!userData) throw new Error('Користувача не знайдено')
    if (!userId) throw new Error('Користувача не знайдено')

    if (userData.roles.isAdmin) {
        const user = await UserSchema.findOneAndUpdate({_id: userId}, {"roles.isAdmin":false}, {new:true})
        user.save()
        return user
    } else {
        throw new Error('Ви не маєте права адміністратора')
    }
}

