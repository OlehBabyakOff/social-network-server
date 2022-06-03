import TokenSchema from "../models/Token.js";
import jwt from "jsonwebtoken";

export const generateToken = async (payload) => {
    const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS, {expiresIn: '1h'})
    const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH, {expiresIn: '30d'})
    return {
        accessToken,
        refreshToken
    }
}
export const saveToken = async (userId, refreshToken) => {
    const tokenData = await TokenSchema.findOne({user:userId})
    if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }
    const token = await TokenSchema.create({user: userId, refreshToken})
    return token
}
export const removeToken = async (refreshToken) => {
    const token = await TokenSchema.deleteOne({refreshToken})
    return token
}
export const findToken = async (refreshToken) => {
    const token = await TokenSchema.findOne({refreshToken})
    return token
}
export const validateAccessToken = async (token) => {
    try {
        const user = await jwt.verify(token, process.env.JWT_ACCESS)
        return user
    } catch (e) {
        return null
    }
}

export const validateRefreshToken = async (token) => {
    try {
        const user = await jwt.verify(token, process.env.JWT_REFRESH)
        return user
    } catch (e) {
        return null
    }
}