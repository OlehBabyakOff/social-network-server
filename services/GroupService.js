import GroupSchema from "../models/Group.js";
import GroupMembersSchema from "../models/GroupMembers.js";
import GroupPostsSchema from "../models/GroupPost.js";
import GroupCommentSchema from "../models/GroupComment.js";
import GroupPostLikesSchema from '../models/GroupPostLikes.js';
import GroupCommentLikesSchema from '../models/GroupCommentLikes.js';
import UserSchema from "../models/User.js";
import GroupConversationSchema from "../models/GroupConversation.js";
import {validateRefreshToken} from "./TokenService.js";

export const createGroupService = async (title, refreshToken, avatar, background) => {
    if (!title && !avatar && !background) throw new Error('Поля не можуть бути порожніми')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const group = await GroupSchema.create({title, creatorId:userData._id, avatar: avatar, background: background})
    group.admins.push({adminId: userData._id})
    await group.save()
    const admin = await GroupMembersSchema.create({groupId:group._id, memberId:group.creatorId})
    return {
        group,
        admin
    }
}
export const setAdminService = async (groupId, userId, refreshToken) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    const user = await UserSchema.findById(userId)
    if (!user) throw new Error('Користувача не знайдено')
    if (userData._id === group.creatorId.toString()) {
        group.admins.forEach(admin => {
            if (admin.adminId.toString() !== userId.toString()) {
                group.admins.push({adminId: userId})
            } else {
                throw new Error('Користувач вже має права адміністратора')
            }
        })
        await group.save()
        return {message: "Права користувача змінено"}
    } else {
        throw new Error('Ви не маєте права назначати адміністраторів спільноти')
    }
}
export const followGroupService = async (refreshToken, groupId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    const memberCheck = await GroupMembersSchema.findOne({groupId:groupId, memberId:userData._id})
    if (!memberCheck) {
        const follow = await GroupMembersSchema.create({groupId, memberId:userData._id})
        return follow
    } else {
        const unfollow = await GroupMembersSchema.findOneAndDelete({groupId:groupId, memberId:userData._id})
        return unfollow
    }

}
export const createGroupPostService = async (groupId, refreshToken, text, image) => {
    if (!text) throw new Error('Поля не можуть бути порожніми')
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    if (group.creatorId != userData._id) throw new Error('Ви не маєте права для створення нового поста')
    const groupPost = await GroupPostsSchema.create({groupId, userId: userData._id, text, image})
    return groupPost
}
export const getGroupService = async (groupId) => {
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    return group
}
export const getMembersService = async (groupId) => {
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    const members = await GroupMembersSchema.find({groupId})
    if (!members) throw new Error('В спільноті немає учасників')
    return members
}
export const getPostsService = async (groupId) => {
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    const posts = await GroupPostsSchema.find({groupId})
    if (!posts) throw new Error('В спільноті немає постів')
    return posts
}
export const getOnePostService = async (groupId, postId) => {
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    const post = await GroupPostsSchema.findOne({_id: postId, groupId})
    if (!post) throw new Error('Пост не знайдено')
    return post
}
export const createCommentService = async (groupId, refreshToken, postId, content) => {
    if (!content) throw new Error('Поля не можуть бути порожніми')
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const post = await GroupPostsSchema.findOne({_id: postId, groupId})
    if (!post) throw new Error('Пост не знайдено')
    const comment = await GroupCommentSchema.create({groupId, postId:post._id, userId: userData._id, content})
    post.comments += 1
    post.save()
    return comment
}
export const createChildCommentService = async (groupId, refreshToken, postId, parentId, content) => {
    if (!content) throw new Error('Поля не можуть бути порожніми')
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const post = await GroupPostsSchema.findOne({_id: postId, groupId})
    if (!post) throw new Error('Пост не знайдено')
    const parent = await GroupCommentSchema.findById(parentId)
    if (!parent) throw new Error('Батьківський коментар не знайдено')
    const comment = await GroupCommentSchema.create({groupId,  postId:post._id, userId: userData._id, parentId, content})
    parent.childs.push(comment._id)
    await parent.save()
    post.comments += 1
    post.save()
    return comment
}
export const likeGroupPostService = async (groupId, postId, refreshToken) => {
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const post = await GroupPostsSchema.findOne({_id: postId})
    if (!post) throw new Error('Пост не знайдено')
    const candidate = await GroupPostLikesSchema.findOne({groupId, userId: userData._id, postId: post._id})
    if (candidate) {
        const like = await GroupPostLikesSchema.findOneAndDelete({groupId, userId: userData._id, postId: post._id})
        const likeCount = post.likes
        post.likes = likeCount - 1
        await post.save()
        return like
    } else {
        const like = await GroupPostLikesSchema.create({groupId, userId: userData._id, postId: post._id})
        const likeCount = post.likes
        post.likes = likeCount + 1
        await post.save()
        return like
    }
}
export const likeGroupCommentService = async (groupId, postId, commentId, refreshToken) => {
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const post = await GroupPostsSchema.findOne({_id: postId})
    if (!post) throw new Error('Пост не знайдено')
    const comment = await GroupCommentSchema.findById(commentId)
    if (!comment) throw new Error('Коментар не знайдено')
    const candidate = await GroupCommentLikesSchema.findOne({groupId, userId: userData._id, postId, commentId})
    if (candidate) {
        const like = await GroupCommentLikesSchema.findOneAndDelete({groupId, userId: userData._id, postId, commentId})
        const likeCount = comment.likes
        comment.likes = likeCount - 1
        await comment.save()
        return like
    } else {
        const like = await GroupCommentLikesSchema.create({groupId, userId: userData._id, postId, commentId})
        const likeCount = comment.likes
        comment.likes = likeCount + 1
        await comment.save()
        return like
    }
}
export const getCommentsService = async (groupId, postId) => {
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    const post = await GroupPostsSchema.findOne({_id: postId})
    if (!post) throw new Error('Пост не знайдено')
    const comments = await GroupCommentSchema.find({groupId, postId: post._id})
    return comments
}
export const sendGroupMessageService = async (refreshToken, groupId, text, image) => {
    if (!text) throw new Error('Поле не може бути порожнім')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    const conversation = await GroupConversationSchema.findOne({groupId})
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
            const newConversation = await GroupConversationSchema.create({groupId})
            newConversation.messages.push({text:text, image: image, sender:userData._id})
            await newConversation.save()
            return newConversation
        } else {
            const newConversation = await GroupConversationSchema.create({groupId})
            newConversation.messages.push({text:text, sender:userData._id})
            await newConversation.save()
            return newConversation
        }
    }
}
export const receiveGroupMessagesService = async (refreshToken, groupId) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const group = await GroupSchema.findById(groupId)
    if (!group) throw new Error('Спільноту не знайдено')
    const groupConversation = await GroupConversationSchema.findOne({groupId})
    if (!groupConversation) throw new Error('Такого чату не існує')
    return groupConversation
}