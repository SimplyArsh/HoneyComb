const User = require("../models/user-model");
const Token = require("../models/token-model");
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const validator = require("validator")

const clientURL = process.env.CLIENT_URL;

//Password Reset Request Method
const requestPasswordReset = async (email) => {
    //Get the user from email provided
    const user = await User.findOne({email});
        //Check if the user exists
    if (!user) {
        throw Error("User does not exist");
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
    const resetURL = `${clientURL}/resetPass?token=${resetToken}&id=${user._id}`;
    const requestURL = `${clientURL}/requestResetPass`;
    //Will send POST request with email in the request body
    //sendEmail(email, subject, content, template)
    sendEmail(user.email, "Password Reset Request", {name: user.username, resetURL: resetURL, requestURL: requestURL},"./template/requestResetpassword.handlebars");

    return resetURL;
};

//Password Reset Method
const resetPassword = async (userID, newPassword, currentPassword, token) => {
    const user = await User.findById(userID);

    // console.log(userID)
    // console.log(newPassword)
    // console.log(currentPassword)
    // console.log(token)

    if (!user) {
        throw Error("User not found")
    }

    let passwordResetToken;

    //For logged-in users
    if (!token) {
        const isCurrentValid = await bcrypt.compare(currentPassword, user.password)
        if (!isCurrentValid) {
            throw Error("Current password is incorrect")
        }

    } else {    //For logged-out users (forgot password route)
        //Look for a web token associated with the userID
        passwordResetToken = await Token.findOne({ userID })
        //If no token found, prompt error message
        if (!passwordResetToken) {
            throw Error("Invalid or expired password reset token")
        }
        //Use bcrypt to compare the token in the database with the one received by the server
        const isValid = await bcrypt.compare(token, passwordResetToken.token)
        if (!isValid) {
            throw Error("Invalid or expired password reset token")
        }
    }

    const sameAsOld = await bcrypt.compare(newPassword, user.password)
    if (sameAsOld) {
        throw Error("New password must be different from the current password")
    }

    //Confirm password strength
    //Password requirements: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    if (!validator.isStrongPassword(newPassword)) {
        throw Error('Password is not strong enough')
    }

    //If password follows strength requirements, hash
    const hash = await bcrypt.hash(newPassword, Number(10));
    
    //Update password to new one
    await User.updateOne(
        { _id: userID },
        { $set: { password: hash }},
        { new: true}
    );
    
    //Send an email to the user to notify them that their password has been successfully reset
    const loginURL = `${clientURL}/login`;
    sendEmail(
        user.email,
        "Password Reset Successfully",
        {
            name: user.username, loginURL: loginURL
        },
        "./template/resetPassword.handlebars"
    );
    if (token && passwordResetToken){
        //Delete the reset token (so that multiple resets cannot be made with the same request)
        await passwordResetToken.deleteOne();
    }
    
    return true;
}

module.exports = {requestPasswordReset, resetPassword};