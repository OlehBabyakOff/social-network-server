import {activateService, loginService, logoutService, registrationService} from "../services/AuthService.js";

export const registrationController = async (req, res) => {
    try {
        const {email, password, username, first_name, second_name, phone, birthday} = req.body
        const avatar = req.files.avatar
        const background = req.files.background
        const user = await registrationService(email, password, username, first_name, second_name, phone, birthday, avatar.data, background.data)
        res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
        return res.status(201).json(user)
    } catch (e) {
        res.status(401).json(e.message)
    }
}
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await loginService(email, password)
        res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.status(201).json(user)
    } catch (e) {
        res.status(401).json(e.message)
    }
}
export const logoutController = async (req, res) => {
    try {
        const {refreshToken} = req.cookies
        const token = await logoutService(refreshToken)
        res.clearCookie('refreshToken')
        res.status(201).json(token)
    } catch (e) {
        res.status(401).json(e.message)
    }
}
export const activateController = async (req, res) => {
    try {
        const activationLink = req.params.link
        await activateService(activationLink)
        return res.status(201).redirect(`http://localhost:3000/`)
    } catch (e) {
        res.status(401).json(e.message)
    }
}
    // async refresh(req, res) {
    //     try {
    //
    //     } catch (e) {
    //         console.log(e.message)
    //     }
    // }
