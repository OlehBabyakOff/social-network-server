import {Router} from "express"
import {isActivate, isAdmin, isAuth, isBlocked} from "../middleware/authMiddleware.js";
import {
    getGroupPostsController,
    getGroupsController,
    getPostsController,
    getReportsController,
    getUsersController
} from "../controllers/AdminController.js";

const router = new Router()

router.get('/admin/users', getUsersController)
router.get('/admin/groups', getGroupsController)
router.get('/admin/group/posts', getGroupPostsController)
router.get('/admin/posts', getPostsController)
router.get('/admin/reports', getReportsController)

export default router