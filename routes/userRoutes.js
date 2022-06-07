import {Router} from "express"
import {
    addGalleryController,
    createConversationController,
    deleteGalleryController,
    followToUserController,
    getConversationController,
    getFollowersController,
    getFollowingsController,
    getGalleryController,
    getLimitedUsersController, getOneConversationController,
    getReportsController,
    getUserController,
    getUsersController,
    receiveMessageController,
    sendMessageController,
    sendReportController, updateAvatarController, updateBgController,
    updateInfoController
} from "../controllers/UserController.js";

const router = new Router()

router.post('/user/:id/follow', followToUserController)
router.post('/user/:id/messages/create', createConversationController)
router.post('/user/:id/messages/send', sendMessageController)
router.post('/user/:id/report', sendReportController)
router.post('/user/gallery/add', addGalleryController)

router.get('/users', getUsersController)
router.get('/limitedUsers', getLimitedUsersController)
router.get('/user/:id', getUserController)
router.get('/user/:id/followers', getFollowersController)
router.get('/user/:id/followings', getFollowingsController)
router.get('/user/conversations/get', getConversationController)
router.get('/user/conversation/:conversationId/get', getOneConversationController)
router.get('/user/:id/messages/get', receiveMessageController)
router.get('/user/:id/reports', getReportsController)
router.get('/user/:id/gallery', getGalleryController)

router.put('/user/updateInfo', updateInfoController)
router.put('/user/updateAvatar', updateAvatarController)
router.put('/user/updateBackground', updateBgController)

router.delete('/user/gallery/:id/delete', deleteGalleryController)

export default router