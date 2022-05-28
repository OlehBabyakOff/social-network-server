import {
    allowBanUserService, banUserService, denyBanUserService,
    getGroupPostsService,
    getGroupsService,
    getPostsService,
    getReportsService,
    getUsersService, setAdminService, unAdminService, unbanUserService
} from "../services/AdminService.js";

export const getUsersController = async (req, res) => {
    try {
        const users = await getUsersService()
        return res.status(200).json(users)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getGroupsController = async (req, res) => {
    try {
        const groups = await getGroupsService()
        return res.status(200).json(groups)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getPostsController = async (req, res) => {
    try {
        const posts = await getPostsService()
        return res.status(200).json(posts)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getReportsController = async (req, res) => {
    try {
        const reports = await getReportsService()
        return res.status(200).json(reports)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const getGroupPostsController = async (req, res) => {
    try {
        const groupPosts = await getGroupPostsService()
        return res.status(200).json(groupPosts)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const allowBanUserController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const reporterId = req.params.reporterId
        const accusedId = req.params.accusedId
        const ban = await allowBanUserService(refreshToken, reporterId, accusedId)
        return res.status(200).json(ban)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const denyBanUserController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const reporterId = req.params.reporterId
        const accusedId = req.params.accusedId
        const ban = await denyBanUserService(refreshToken, reporterId, accusedId)
        return res.status(200).json(ban)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const banUserController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const userId = req.params.userId
        const ban = await banUserService(refreshToken, userId)
        return res.status(200).json(ban)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const unbanUserController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const userId = req.params.userId
        const ban = await unbanUserService(refreshToken, userId)
        return res.status(200).json(ban)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const setAdminController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const userId = req.params.userId
        const user = await setAdminService(refreshToken, userId)
        return res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
export const unAdminController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const userId = req.params.userId
        const user = await unAdminService(refreshToken, userId)
        return res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
}