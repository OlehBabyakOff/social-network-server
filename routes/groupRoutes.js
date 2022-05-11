import {Router} from "express"
import {
    createChildCommentController,
    createCommentController,
    createGroupController,
    createGroupPostController,
    followGroupController, getAllGroupsController, getCommentsController,
    getGroupController,
    getMembersController, getMyGroupsController, getOnePostController,
    getPostsController,
    likeGroupCommentController,
    likeGroupPostController, receiveGroupMessagesController, sendGroupMessageController, setAdminController
} from "../controllers/GroupController.js";

const router = new Router()

router.post('/group/create', createGroupController)
router.post('/group/:id/setAdmin/:userId', setAdminController)
router.post('/group/:id/follow', followGroupController)
router.post('/group/:id/posts/create', createGroupPostController)
router.post('/group/:id/:postId/comment/create', createCommentController)
router.post('/group/:id/:postId/comment/:parentId/create', createChildCommentController)
router.post('/group/:id/:postId/like', likeGroupPostController)
router.post('/group/:id/:postId/comment/:commentId/like', likeGroupCommentController)
router.post('/group/:id/messages/send', sendGroupMessageController)

router.get('/groups', getAllGroupsController)
router.get('/myGroups', getMyGroupsController)
router.get('/group/:id', getGroupController)
router.get('/group/:id/members', getMembersController)
router.get('/group/:id/posts/get', getPostsController)
router.get('/group/:id/posts/:postId', getOnePostController)
router.get('/group/:id/:postId/comments/get', getCommentsController)
router.get('/group/:id/messages/get', receiveGroupMessagesController)

export default router