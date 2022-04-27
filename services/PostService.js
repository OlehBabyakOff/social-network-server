import PostSchema from "../models/Post.js";
import {validateRefreshToken} from "./TokenService.js";
import CommentSchema from "../models/Comment.js";
import PostLikeSchema from "../models/PostLikes.js";
import CommentLikeSchema from "../models/CommentLikes.js";

export const createPostService = async (refreshToken, text, location, image) => {
    if (!text) throw new Error('Пост повинен містити текст')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken)
    if (!userData) throw new Error('Користувача не знайдено')
    const post = await PostSchema.create({user: userData._id, text})
    if (image) {
        await PostSchema.updateOne({_id: post._id}, {
            image
        })
    }
    if (location) {
        await PostSchema.updateOne({_id: post._id}, {
            location
        })
    }
    return post
}
export const getAllPostsService = async () => {
    const posts = await PostSchema.find().sort({_id: -1})
    if (!posts) throw new Error('Список постів порожній')
    return posts
}
export const getMyPostsService = async (refreshToken) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken)
    if (!userData) throw new Error('Користувача не знайдено')
    const posts = await PostSchema.find({user: userData._id}).sort({_id: -1})
    if (!posts) throw new Error('Список постів порожній')
    return posts
}
export const getUserPostsService = async (id) => {
    const posts = await PostSchema.find({user: id}).sort({_id: -1})
    if (!posts) throw new Error('Список постів порожній')
    return posts
}
export const getOnePostService = async (postId) => {
    const post = await PostSchema.findById(postId)
    if (!post) throw new Error('Пост не знайдено')
    return post
}
export const createCommentService = async (id, refreshToken, content) => {
    const post = await PostSchema.findOne({_id: id})
    if (!post) throw new Error('Пост не знайдено')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const comment = await CommentSchema.create({postId: post._id, userId: userData._id, content, createdAt: new Date()})
    post.comments += 1
    await post.save()
    return comment
}
export const createChildCommentService = async (id, refreshToken, parentId, content) => {
    const post = await PostSchema.findOne({_id: id})
    if (!post) throw new Error('Пост не знайдено')
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const parent = await CommentSchema.findById(parentId)
    if (!parent) throw new Error('Коментар не знайдено')
    const comment = await CommentSchema.create({postId: post._id, userId: userData._id, parentId: parent._id, content, createdAt: new Date()})
    parent.childs.push(comment._id)
    await parent.save()
    post.comments += 1
    await post.save()
    return comment
}
export const getAllCommentsService = async (id) => {
    const post = await PostSchema.findOne({_id: id})
    if (!post) throw new Error('Пост не знайдено')
    const comments = await CommentSchema.find({postId:post._id})
    if (!comments) throw new Error('Коментарі не знайдено')
    return comments
}
export const getParentCommentsService = async (id) => {
    const post = await PostSchema.findOne({_id: id})
    if (!post) throw new Error('Пост не знайдено')
    const comments = await CommentSchema.find({postId:post._id, parentId: {$exists:false}}).sort({_id: -1})
    if (!comments) throw new Error('Коментарі не знайдено')
    return comments
}
export const getChildCommentsService = async (id, parentId) => {
    const post = await PostSchema.findOne({_id: id})
    if (!post) throw new Error('Пост не знайдено')
    const comments = await CommentSchema.find({postId:post._id, parentId: parentId})
    if (!comments) throw new Error('Коментарі не знайдено')
    return comments
}
export const likePostService = async (id, refreshToken) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const post = await PostSchema.findOne({_id: id})
    if (!post) throw new Error('Пост не знайдено')
    const candidate = await PostLikeSchema.findOne({userId:userData._id, postId: post._id})
    if (candidate) {
        const like = await PostLikeSchema.findOneAndDelete({userId:userData._id, postId: post._id})
        const likeCount = post.likes
        post.likes = likeCount - 1
        await post.save()
        return like
    } else {
        const like = await PostLikeSchema.create({userId: userData._id, postId: post._id})
        const likeCount = post.likes
        post.likes = likeCount + 1
        await post.save()
        return like
    }
}
export const likeCommentService = async (commentId, refreshToken) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const comment = await CommentSchema.findById(commentId)
    if (!comment) throw new Error('Коментар не знайдено')
    const candidate = await CommentLikeSchema.findOne({userId:userData._id, commentId: comment._id})
    if (candidate) {
        const like = await CommentLikeSchema.findOneAndDelete({userId:userData._id, commentId: comment._id})
        const likeCount = comment.likes
        comment.likes = likeCount - 1
        await comment.save()
        return like
    } else {
        const like = await CommentLikeSchema.create({userId: userData._id, commentId: comment._id})
        const likeCount = comment.likes
        comment.likes = likeCount + 1
        await comment.save()
        return like
    }
}
export const getPostLikeService = async (postId, refreshToken) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const like = await PostLikeSchema.findOne({postId, userId: userData._id})
    return like
}
export const deletePostService = async (postId, refreshToken) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const post = await PostSchema.findById(postId)
    if (!post) throw new Error('Пост не знайдено')
    if (post.user.toString() === userData._id.toString() || userData.roles.isAdmin) {
        await PostSchema.findOneAndDelete({_id: postId})
        await CommentSchema.deleteMany({postId})
        await PostLikeSchema.deleteMany({postId})
        return {message: 'Пост успішно видалено'}
    } else {
        throw new Error('Ви не можете видалити чужий пост')
    }
}
export const deleteCommentService = async (postId, commentId, refreshToken) => {
    if (!refreshToken) throw new Error('Токен авторизації не дійсний')
    const userData = await validateRefreshToken(refreshToken);
    if (!userData) throw new Error('Користувача не знайдено')
    const post = await PostSchema.findById(postId)
    if (!post) throw new Error('Пост не знайдено')
    const comment = await CommentSchema.findById(commentId)
    if (!comment) throw new Error('Коментар не знайдено')
    if (comment.userId.toString() === userData._id.toString() || userData.roles.isAdmin) {
        await CommentSchema.findOneAndDelete({_id: commentId})
        const deletedComments = await CommentSchema.deleteMany({parentId: commentId})
        await PostSchema.findOneAndUpdate({_id: postId}, {
            comments: post.comments - 1 - deletedComments.deletedCount
        })
        return {message: 'Коментар успішно видалено'}
    } else {
        throw new Error('Ви не можете видалити чужий коментар')
    }
}