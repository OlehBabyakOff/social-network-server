import {validateAccessToken} from "../services/tokenService.js"

export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return next(res.status(401).json('Ви не авторизовані'))

        const accessToken = authHeader.split(' ')[1]
        if (!accessToken) return next(res.status(401).json('Ви не авторизовані'))

        const userData = await validateAccessToken(accessToken)
        if (!userData) return next(res.status(401).json('Ви не авторизовані'))

        req.user = userData
        next()
    } catch (e) {
        return next(res.status(401).json('Ви не авторизовані'))
    }
}

export const isActivate = async (req, res, next) => {
    try {
        if (req.user.roles.isActivated) {
            console.log('activated')
            next()
        } else {
            return next(res.status(400).json('Ваш акаунт не активований'))
        }
    } catch (e) {
        console.log(e.message)
        return next(res.status(400).json('Ваш акаунт не активований'))
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        if (req.user.roles.isAdmin) {
            console.log('admin')
            next()
        } else {
            return next(res.status(400).json('Ви на маєте права адміністратора'))
        }
    } catch (e) {
        console.log(e.message)
        return next(res.status(400).json('Ви на маєте права адміністратора'))
    }
}

export const isBlocked = async (req, res, next) => {
    try {
        if (req.user.roles.isBlocked !== true) {
            console.log('not blocked')
            next()
        } else {
            return next(res.status(400).json('Ваш акаунт заблоковано'))
        }
    } catch (e) {
        console.log(e.message)
        return next(res.status(400).json('Ваш акаунт заблоковано'))
    }
}

