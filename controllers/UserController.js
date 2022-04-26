import {
    followToUserService,
    getFollowersService,
    getFollowingsService, getReportsService,
    getUserService, getUsersService, receiveMessageService, sendMessageService, sendReportService
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
export const sendMessageController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const receiverId = req.params.id
        const {text} = req.body
        const image = req?.files?.image
        const conversation = await sendMessageService(refreshToken, receiverId, text, image)
        return res.status(200).json(conversation)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const receiveMessageController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const receiverId = req.params.id
        const conversation = await receiveMessageService(refreshToken, receiverId)
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