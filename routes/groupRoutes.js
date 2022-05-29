import {Router} from "express"
import {
    createChildCommentController,
    createCommentController,
    createGroupController,
    createGroupPostController, deleteGroupController,
    followGroupController,
    getAllGroupsController,
    getChildGroupCommentsController,
    getCommentsController,
    getGroupController,
    getGroupPostLikeController,
    getLimitedGroupsController,
    getMembersController,
    getMyGroupsController,
    getOnePostController,
    getParentGroupCommentsController,
    getPostsController,
    likeGroupCommentController,
    likeGroupPostController,
    receiveGroupMessagesController,
    sendGroupMessageController,
    setAdminController, updateGroupAvatarController, updateGroupBgController,
    updateGroupInfoController
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
router.get('/limitedGroups', getLimitedGroupsController)
router.get('/myGroups', getMyGroupsController)
router.get('/group/:id', getGroupController)
router.get('/group/:id/members', getMembersController)
router.get('/group/:id/posts/get', getPostsController)
router.get('/group/:id/posts/:postId', getOnePostController)
router.get('/group/:id/post/:postId/like/get', getGroupPostLikeController)
router.get('/group/:id/:postId/comments/get', getCommentsController)
router.get('/group/:id/post/:postId/comments/parent', getParentGroupCommentsController)
router.get('/group/:id/post/:postId/comments/:commentId/child', getChildGroupCommentsController)
router.get('/group/:id/messages/get', receiveGroupMessagesController)

router.put('/group/:groupId/updateInfo', updateGroupInfoController)
router.put('/group/:groupId/updateAvatar', updateGroupAvatarController)
router.put('/group/:groupId/updateBackground', updateGroupBgController)

router.delete('/group/:groupId/delete', deleteGroupController)

export default router