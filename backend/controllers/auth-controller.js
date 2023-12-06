const {
    requestPasswordReset,
    resetPassword,
} = require("../services/auth-service");
const User = require('../models/user-model')
const jwt = require('jsonwebtoken')


const resetPasswordRequestController = async (req, res, next) => {
    const email = req.body.email
    try {
        const resetURL = await requestPasswordReset(email);
        return res.status(200).json({
            message: "Password reset link sent to email",
            resetURL: resetURL
        });
    }
    catch (error){
        res.status(400).json({ error: error.message })
    }
};

const resetPasswordController = async (req, res, next) => {
    let { userID, newPassword, currentPassword, token } = req.body
    try {
        if (!userID) {   //Logged-in (no userID and token from link): need to get userID
            const authorization = req.headers.authorization
            if (!authorization) {
                return res.status(401).json({ error: 'Authorization token required' })
            }
            
            const authToken = authorization.split(' ')[1] // Authorization is made of two parts. We want to grab the token which is the second part

            try {
                const { _id } = jwt.verify(authToken, process.env.SECRET) // jwt.verify returns the token. We want to grab the id part of the token for future use
            
                const user = await User.findOne({ _id }).select('_id')
                if (!user){
                    return res.status(401).json({ error: 'User not found' })
                }
                userID = user._id
            } catch (error) {
                return res.status(401).json({ error: 'Request is not Authorized' })
            }
        }
        if (!userID) {
            throw Error("No userID given.")
        }
        const resetPasswordService = await resetPassword(userID, newPassword, currentPassword, token);
        return res.json({
            message: "Password reset successful",
            resetPasswordService: resetPasswordService
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = {
    resetPasswordRequestController,
    resetPasswordController,
};