import {Router} from "express"
import {
    createChildCommentController,
    createCommentController,
    createGroupController,
    createGroupPostController,
    followGroupController, getCommentsController,
    getGroupController,
    getMembersController, getOnePostController,
    getPostsController,
    likeGroupCommentController,
    likeGroupPostController
} from "../controllers/GroupController.js";

const router = new Router()

router.post('/group/create', createGroupController)
router.post('/group/:id/follow', followGroupController)
router.post('/group/:id/posts/create', createGroupPostController)
router.post('/group/:id/:postId/comment/create', createCommentController)
router.post('/group/:id/:postId/comment/:parentId/create', createChildCommentController)
router.post('/group/:id/:postId/like', likeGroupPostController)
router.post('/group/:id/:postId/comment/:commentId/like', likeGroupCommentController)

router.get('/group/:id', getGroupController)
router.get('/group/:id/members', getMembersController)
router.get('/group/:id/posts/get', getPostsController)
router.get('/group/:id/posts/:postId', getOnePostController)
router.get('/group/:id/:postId/comments/get', getCommentsController)

export default router