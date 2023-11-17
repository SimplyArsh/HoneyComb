const User = require("../models/user-model");
const Token = require("../models/token-model");
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const clientURL = process.env.CLIENT_URL;

//Password Reset Request Method
const requestPasswordReset = async (email) => {
    //Get the user from email provided
    const user = await User.findOne({email});
        //Check if the user exists
    if (!user) {
        throw new Error("User does not exist");
    }

    //If user exists, check if there is an existing token created for the user found
    let token = await Token.findOne({userID: user._id});
    
    //If token found, delete it
    if (token) {
        await token.deleteOne();
    }
    
    //Generate a new random token and hash
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(10));

    //Create new token object
    await new Token({
        userID: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    //Construct url for password reset, which uses the client url
    const reset_url = `${clientURL}/resetPass?token=${resetToken}&id=${user._id}`;
    //Will send POST request with email in the request body
    //sendEmail(email, subject, content, template)
    sendEmail(user.email, "Password Reset Request", {name: user.username, reset_url: reset_url},"./template/requestResetpassword.handlebars");

    return reset_url;
};

//Password Reset Method
const resetPassword = async (userID, token, password) => {
    //Look for a web token associated with the userID
    let passwordResetToken = await Token.findOne({ userID });
    //If no token found, prompt error message
    if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token");
    }
    //Use bcrypt to compare the token in the database with the one received by the server
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
        throw new Error("Invalid or expired password reset token");
    }
    //If tokens match, hash new password
    const hash = await bcrypt.hash(password, Number(10));
    
    //Update password to new one
    await User.updateOne(
        { _id: userID },
        { $set: { password: hash}},
        { new: true}
    );
    
    //Send an email to the user to notify them that their password has been successfully reset
    const user = await User.findById({ _id: userID });
    sendEmail(
        user.email,
        "Password Reset Successfully",
        {
            name: user.name,
        },
        "./template/resetPassword.handlebars"
    );
    //Delete the reset token (so that multiple resets cannot be made with the same request)
    await passwordResetToken.deleteOne();
    
    return true;
}

module.exports = {requestPasswordReset, resetPassword};