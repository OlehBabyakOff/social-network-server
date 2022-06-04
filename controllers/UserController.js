import {
    addGalleryService,
    createConversationService,
    deleteGalleryService,
    followToUserService,
    getConversationService,
    getFollowersService,
    getFollowingsService,
    getGalleryService,
    getLimitedUsersService, getOneConversationService,
    getReportsService,
    getUserService,
    getUsersService,
    receiveMessageService,
    sendMessageService,
    sendReportService,
    updateAvatarService, updateBgService,
    updateInfoService
} from "../services/UserService.js";

export const getUserController = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await getUserService(userId)
        return res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getUsersController = async (req, res) => {
    try {
        const user = await getUsersService()
        return res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getLimitedUsersController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const users = await getLimitedUsersService(refreshToken)
        return res.status(200).json(users)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const followToUserController = async (req, res) => {
    try {
        const followedId = req.params.id
        const {refreshToken} = req.cookies
        const {follow, message} = await followToUserService(followedId, refreshToken)
        return res.status(200).json({follow, message})
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getFollowersController = async (req, res) => {
    try {
        const userId = req.params.id
        const followers = await getFollowersService(userId)
        return res.status(200).json(followers)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getFollowingsController = async (req, res) => {
    try {
        const userId = req.params.id
        const followings = await getFollowingsService(userId)
        return res.status(200).json(followings)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const createConversationController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const receiverId = req.params.id
        const conversation = await createConversationService(refreshToken, receiverId)
        return res.status(200).json(conversation)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const sendMessageController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const conversationId = req.params.id
        const {text} = req.body
        const image = req?.files?.image
        const conversation = await sendMessageService(refreshToken, conversationId, text, image?.data)
        return res.status(200).json(conversation)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getConversationController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const conversation = await getConversationService(refreshToken)
        return res.status(200).json(conversation)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getOneConversationController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const conversationId = req.params.conversationId
        const conversation = await getOneConversationService(refreshToken, conversationId)
        return res.status(200).json(conversation)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const receiveMessageController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const conversationId = req.params.id
        const conversation = await receiveMessageService(refreshToken, conversationId)
        return res.status(200).json(conversation)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const sendReportController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const accusedId = req.params.id
        const {violation} = req.body
        const report = await sendReportService(refreshToken, accusedId, violation)
        return res.status(200).json(report)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getReportsController = async (req, res) => {
    try {
        const accusedId = req.params.id
        const reports = await getReportsService(accusedId)
        return res.status(200).json(reports)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const addGalleryController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const image = req.files.image
        const gallery = await addGalleryService(refreshToken, image.data)
        return res.status(200).json(gallery)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getGalleryController = async (req, res) => {
    try {
        const id = req.params.id
        const gallery = await getGalleryService(id)
        return res.status(200).json(gallery)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const deleteGalleryController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const id = req.params.id
        const gallery = await deleteGalleryService(refreshToken, id)
        return res.status(200).json(gallery)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const updateInfoController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const {email, username, first_name, second_name, phone, birthday} = req.body
        const user = await updateInfoService(refreshToken, email, username, first_name, second_name, phone, birthday)
        return res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const updateAvatarController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const avatar = req.files.avatar
        const user = await updateAvatarService(refreshToken, avatar.data)
        return res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const updateBgController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const background = req.files.background
        const user = await updateBgService(refreshToken, background.data)
        return res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
}