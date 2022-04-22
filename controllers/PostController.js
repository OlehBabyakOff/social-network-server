import {
    createChildCommentService,
    createCommentService,
    createPostService, getAllCommentsService,
    getAllPostsService, getChildCommentsService,
    getOnePostService, getParentCommentsService, likeCommentService, likePostService
} from "../services/PostService.js";

export const createPostController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const {text} = req.body
        const image = req?.files?.image
        const post = await createPostService(refreshToken, text, image)
        return res.status(201).json({post, message: "Пост успішно створено"})
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getAllPostsController = async (req, res) => {
    try {
        const posts = await getAllPostsService()
        return res.status(201).json(posts)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getOnePostController = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await getOnePostService(postId)
        return res.status(201).json(post)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const createCommentController = async (req, res) => {
    try {
        const id = req.params.id
        const {refreshToken} = req.cookies
        const {content} = req.body
        const comment = await createCommentService(id, refreshToken, content)
        return res.status(200).json(comment)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const createChildCommentController = async (req, res) => {
    try {
        const id = req.params.id
        const parentId = req.params.commentId
        const {refreshToken} = req.cookies
        const {content} = req.body
        const comment = await createChildCommentService(id, refreshToken, parentId, content)
        return res.status(200).json(comment)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getAllCommentsController = async (req, res) => {
    try {
        const id = req.params.id
        const comments = await getAllCommentsService(id)
        return res.status(200).json(comments)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getParentCommentsController = async (req, res) => {
    try {
        const id = req.params.id
        const comments = await getParentCommentsService(id)
        return res.status(200).json(comments)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getChildCommentsController = async (req, res) => {
    try {
        const id = req.params.id
        const parentId = req.params.commentId
        const comments = await getChildCommentsService(id, parentId)
        return res.status(200).json(comments)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const likePostController = async (req, res) => {
    try {
        const id = req.params.id
        const {refreshToken} = req.cookies
        const like = await likePostService(id, refreshToken)
        return res.status(200).json(like)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const likeCommentController = async (req, res) => {
    try {
        const commentId = req.params.commentId
        const {refreshToken} = req.cookies
        const like = await likeCommentService(commentId, refreshToken)
        return res.status(200).json(like)
    } catch (e) {
        res.status(400).json(e.message)
    }
}