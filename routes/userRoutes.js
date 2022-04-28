import {Router} from "express"
import {
    followToUserController,
    getFollowersController,
    getFollowingsController, getLimitedUsersController, getReportsController,
    getUserController, getUsersController, receiveMessageController, sendMessageController, sendReportController
} from "../controllers/UserController.js";
import {isActivate, isAdmin, isAuth, isBlocked} from "../middleware/authMiddleware.js";

const router = new Router()

router.post('/user/:id/follow', followToUserController)
router.post('/user/:id/messages/send', sendMessageController)
router.post('/user/:id/report', sendReportController)

router.get('/users', getUsersController)
router.get('/limitedUsers', getLimitedUsersController)
router.get('/user/:id', getUserController)
router.get('/user/:id/followers', getFollowersController)
router.get('/user/:id/followings', getFollowingsController)
router.get('/user/:id/messages/get', receiveMessageController)
router.get('/user/:id/reports', getReportsController)
export default router