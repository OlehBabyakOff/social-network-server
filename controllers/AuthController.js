import {
    activateService,
    loginService,
    logoutService,
    refreshService,
    registrationService
} from "../services/AuthService.js";

export const registrationController = async (req, res) => {
    try {
        const {email, password, username, first_name, second_name, phone, birthday} = req.body
        const avatar = req.files.avatar
        const background = req.files.background
        const user = await registrationService(email, password, username, first_name, second_name, phone, birthday, avatar.data, background.data)
        res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.status(201).json({user, message: "Ви успішно зареєструвались"})
    } catch (e) {
        return res.status(401).json(e.message)
    }
}
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await loginService(email, password)
        res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.status(201).json({user, message: "Ви успішно увійшли до акаунту"})
    } catch (e) {
        return res.status(401).json(e.message)
    }
}
export const logoutController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const token = await logoutService(refreshToken)
        res.clearCookie('refreshToken')
        res.status(201).json({token, message: "Ви вийшли з акаунту"})
    } catch (e) {
        return res.status(401).json(e.message)
    }
}
export const activateController = async (req, res) => {
    try {
        const activationLink = req.params.link
        await activateService(activationLink)
        return res.status(201).json({message: "Ваш акаунт успішно активований"}).redirect(`http://localhost:3000/`)
    } catch (e) {
        res.status(401).json(e.message)
    }
}
export const refreshController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const user = await refreshService(refreshToken)
        res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.status(201).json(user)
    } catch (e) {
        res.status(400).json(e.message)
    }
}
