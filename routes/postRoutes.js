import {Router} from "express"
import {
    createChildCommentController,
    createCommentController,
    createPostController,
    getAllCommentsController,
    getAllPostsController, getChildCommentsController,
    getOnePostController, getParentCommentsController,
    likeCommentController,
    likePostController
} from "../controllers/PostController.js";

const router = new Router()

router.post('/post/create', createPostController)

router.post('/:id/comment/create', createCommentController)
router.post('/:id/comment/:commentId/create', createChildCommentController)

router.post('/:id/like', likePostController)
router.post('/:id/comment/:commentId/like', likeCommentController)

router.get('/post/get', getAllPostsController)
router.get('/post/get/:id', getOnePostController)

router.get('/:id/comments/get', getAllCommentsController)
router.get('/:id/comments/get/parent', getParentCommentsController)
router.get('/:id/comments/get/:commentId/child', getChildCommentsController)

export default router