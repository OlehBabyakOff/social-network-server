import {
    createChildCommentService,
    createCommentService,
    createGroupPostService,
    createGroupService,
    followGroupService, getAllGroupsService, getCommentsService,
    getGroupService,
    getMembersService, getMyGroupsService,
    getOnePostService,
    getPostsService,
    likeGroupCommentService,
    likeGroupPostService, receiveGroupMessagesService, sendGroupMessageService, setAdminService
} from "../services/GroupService.js";

export const createGroupController = async (req, res) => {
    try {
        const {title} = req.body
        const {refreshToken} = req.cookies
        const avatar = req.files.avatar
        const background = req.files.background
        const group = await createGroupService(title, refreshToken, avatar.data, background.data)
        return res.status(200).json(group)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const setAdminController = async (req, res) => {
    try {
        const groupId = req.params.id
        const userId = req.params.userId
        const {refreshToken} = req.cookies
        const admin = await setAdminService(groupId, userId, refreshToken)
        return res.status(200).json(admin)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const followGroupController = async(req, res) => {
    try {
        const {refreshToken} = req.cookies
        const groupId = req.params.id
        const follow = await followGroupService(refreshToken, groupId)
        return res.status(200).json(follow)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const createGroupPostController = async (req, res) => {
    try {
        const {text} = req.body
        const image = req?.files?.image
        const {refreshToken} = req.cookies
        const groupId = req.params.id
        const groupPost = await createGroupPostService(groupId, refreshToken, text, image)
        return res.status(200).json(groupPost)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const getAllGroupsController = async (req, res) => {
    try {
        const groups = await getAllGroupsService()
        return res.status(200).json(groups)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const getMyGroupsController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const groups = await getMyGroupsService(refreshToken)
        return res.status(200).json(groups)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const getGroupController = async (req, res) => {
    try {
        const groupId = req.params.id
        const group = await getGroupService(groupId)
        return res.status(200).json(group)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const getMembersController = async (req, res) => {
    try {
        const groupId = req.params.id
        const members = await getMembersService(groupId)
        return res.status(200).json(members)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const getPostsController = async (req, res) => {
    try {
        const groupId = req.params.id
        const posts = await getPostsService(groupId)
        return res.status(200).json(posts)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const getOnePostController = async (req, res) => {
    try {
        const groupId = req.params.id
        const postId = req.params.postId
        const post = await getOnePostService(groupId, postId)
        return res.status(200).json(post)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const createCommentController = async (req, res) => {
    try {
        const groupId = req.params.id
        const {refreshToken} = req.cookies
        const postId = req.params.postId
        const {content} = req.body
        const comment = await createCommentService(groupId, refreshToken, postId, content)
        return res.status(200).json(comment)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const createChildCommentController = async (req, res) => {
    try {
        const groupId = req.params.id
        const {refreshToken} = req.cookies
        const postId = req.params.postId
        const parentId = req.params.parentId
        const {content} = req.body
        const comment = await createChildCommentService(groupId, refreshToken, postId, parentId, content)
        return res.status(200).json(comment)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const likeGroupPostController = async (req, res) => {
    try {
        const groupId = req.params.id
        const {refreshToken} = req.cookies
        const postId = req.params.postId
        const like = await likeGroupPostService(groupId, postId, refreshToken)
        return res.status(200).json(like)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const likeGroupCommentController = async (req, res) => {
    try {
        const groupId = req.params.id
        const {refreshToken} = req.cookies
        const postId = req.params.postId
        const commentId = req.params.commentId
        const like = await likeGroupCommentService(groupId, postId, commentId, refreshToken)
        return res.status(200).json(like)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const getCommentsController = async (req, res) => {
    try {
        const groupId = req.params.id
        const postId = req.params.postId
        const comments = await getCommentsService(groupId, postId)
        return res.status(200).json(comments)
    } catch (e) {
        return res.status(400).json(e.message)
    }
}
export const sendGroupMessageController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const groupId = req.params.id
        const {text} = req.body
        const image = req?.files?.image
        const groupConversation = await sendGroupMessageService(refreshToken, groupId, text, image)
        return res.status(200).json(groupConversation)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const receiveGroupMessagesController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const groupId = req.params.id
        const groupConversation = await receiveGroupMessagesService(refreshToken, groupId)
        return res.status(200).json(groupConversation)
    } catch (e) {
        res.status(400).json(e.message)
    }
}