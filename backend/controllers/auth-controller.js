const {
    requestPasswordReset,
    resetPassword,
} = require("../services/auth-service");

const resetPasswordRequestController = async (req, res, next) => {
    const requestPasswordResetService = await requestPasswordReset(req.body.email);
    return res.json(requestPasswordResetService);
};

const resetPasswordController = async (req, res, next) => {
    const resetPasswordService = await resetPassword(
        req.body.userID,
        req.body.token,
        req.body.password
    );
    return res.json(resetPasswordService);
};

module.exports = {
    resetPasswordRequestController,
    resetPasswordController,
};