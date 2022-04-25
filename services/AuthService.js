import bcrypt from "bcrypt";
import {findToken, generateToken, removeToken, saveToken, validateRefreshToken} from './TokenService.js'
import UserSchema from "../models/User.js";
import {sendActivationMail} from "./MailService.js";


export const registrationService =  async (email, password, username, first_name, second_name, phone, birthday, avatar, background) => {
    if (!email && !password && !username && !first_name && !second_name && !phone && !birthday && !avatar && !background) throw new Error('Дані не можуть бути порожні')
    const candidate = await UserSchema.findOne({email})
    if (candidate) throw new Error('Користувач з даною поштою вже існує')
    const hashPassword = await bcrypt.hash(password, 7)
    const user = await UserSchema.create({email, password: hashPassword, username, first_name, second_name, phone, birthday, activationLink: username})

    await UserSchema.updateOne({_id: user._id}, {
        avatar,
        background
    })

    await sendActivationMail(email, `http://localhost:5000/api/activate/${username}`)
    const tokens = await generateToken({...user})
    await saveToken(user._id, tokens.refreshToken)
    return {
        ...tokens,
        user
    }
}
export const loginService = async (email, password) => {
    const user = await UserSchema.findOne({email})
    if (!user) throw new Error('Користувача не знайдено')
    const comparePass = await bcrypt.compare(password, user.password)
    if (!comparePass) throw new Error('Ви ввели хибний пароль')
    const userData = {
        _id: user._id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        second_name: user.second_name,
        phone: user.phone,
        birthday: user.birthday,
        roles: user.roles
    }
    const tokens = await generateToken(userData)
    await saveToken(user.id, tokens.refreshToken)
    return {
        ...tokens,
        user: user
    }
}
export const logoutService = async (refreshToken) => {
    const token = await removeToken(refreshToken)
    return token
}
export const activateService = async (activationLink) => {

    const candidate = await UserSchema.findOne({activationLink})
    if (candidate.roles.isActivated) throw new Error('Ваш акаунт вже активовано')

    const user = await UserSchema.findOneAndUpdate({activationLink},{"roles.isActivated": true}, {new:true})
    if (!user) throw new Error('Посилання не дійсне')
    await user.save
}
export const refreshService = async (refreshToken) => {
    if (!refreshToken) throw new Error('Токен не існує')
    const userData = await validateRefreshToken(refreshToken)
    const tokenDB = await findToken(refreshToken)
    if (!userData || !tokenDB) throw new Error('Помилка авторизації')
    const user = await UserSchema.findOne({_id: userData._id})
    const userHash = {
        _id: user._id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        second_name: user.second_name,
        phone: user.phone,
        birthday: user.birthday,
        roles: user.roles
    }

    const tokens = await generateToken(userHash)
    await saveToken(user.id, tokens.refreshToken)

    return {
        ...tokens,
        user
    }
}