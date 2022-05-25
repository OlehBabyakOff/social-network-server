import UserSchema from "../models/User.js";
import GroupSchema from "../models/Group.js";
import PostSchema from "../models/Post.js";
import ReportsSchema from "../models/Report.js";
import GroupPostsSchema from "../models/GroupPost.js";

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