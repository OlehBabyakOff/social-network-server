import {Router} from "express"
import {
    createChildCommentController,
    createCommentController,
    createPostController, deleteCommentController, deletePostController,
    getAllCommentsController,
    getAllPostsController, getChildCommentsController, getMyPostsController,
    getOnePostController, getParentCommentsController, getPostLikeController, getUserPostsController,
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
router.get('/post/getMy', getMyPostsController)
router.get('/:id/posts/get', getUserPostsController)
router.get('/post/get/:id', getOnePostController)

router.get('/:id/like/get', getPostLikeController)

router.get('/:id/comments/get', getAllCommentsController)
router.get('/:id/comments/get/parent', getParentCommentsController)
router.get('/:id/comments/get/:commentId/child', getChildCommentsController)

router.delete('/post/delete/:id', deletePostController)
router.delete('/:id/comment/:commentId/delete', deleteCommentController)

export default router