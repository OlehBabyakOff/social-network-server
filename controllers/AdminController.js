import {
    getGroupPostsService,
    getGroupsService,
    getPostsService,
    getReportsService,
    getUsersService
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