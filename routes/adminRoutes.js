import {Router} from "express"
import {
    allowBanUserController, banUserController, denyBanUserController,
    getGroupPostsController,
    getGroupsController,
    getPostsController,
    getReportsController,
    getUsersController, setAdminController, unAdminController, unbanUserController
} from "../controllers/AdminController.js";

const router = new Router()

router.post('/admin/:reporterId/:accusedId/ban', allowBanUserController)
router.post('/admin/:reporterId/:accusedId/deny', denyBanUserController)
router.post('/admin/:userId/ban', banUserController)
router.post('/admin/:userId/unban', unbanUserController)
router.post('/admin/:userId/setAdmin', setAdminController)
router.post('/admin/:userId/unAdmin', unAdminController)

router.get('/admin/users', getUsersController)
router.get('/admin/groups', getGroupsController)
router.get('/admin/group/posts', getGroupPostsController)
router.get('/admin/posts', getPostsController)
router.get('/admin/reports', getReportsController)

export default router