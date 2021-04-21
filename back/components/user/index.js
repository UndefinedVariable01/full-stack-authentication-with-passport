const express = require("express")
const connectToDatabase = require("../../utility/mongodb")
const bcrypt = require("bcrypt")
const {
    validateAuthorization,
    validateLocalAccount,
    validatePassword,
    checkForSameUsername,
    checkForSameEmail,
    checkForSamePassword,
} = require("./validationMiddlewares")
const {
    validateChangeUsernameInputs,
    validateChangeEmailInputs,
    validateChangePasswordInputs,
    validateDeleteAccountInputs,
} = require("../validateInputs")

const router = express.Router()

router.get("/", validateAuthorization, (req, res, next) => {
    if (req.user.local) {
        const { username, email, local } = req.user
        return res.json({ success: true, user: { username, email, local } })
    }

    let username, avatar

    if (req.user.googleId) {
        username = req.user._json.name
        avatar = req.user._json.picture
    } else if (req.user.githubId) {
        username = req.user._json.name
        avatar = req.user._json.avatar_url
    } else {
        username = req.user.display_name
        avatar = req.user.profile_image_url
    }

    res.json({ success: true, user: { username, avatar, local: false } })
})

router.post(
    "/change-username",
    validateAuthorization,
    validateLocalAccount,
    validateChangeUsernameInputs,
    checkForSameUsername,
    validatePassword,
    async (req, res, next) => {
        const { db } = await connectToDatabase()
        await db.collection("users").updateOne({ _id: req.user._id }, { $set: { username: req.body.username } })
        return res.json({ success: true })
    }
)

router.post(
    "/change-email",
    validateAuthorization,
    validateLocalAccount,
    validateChangeEmailInputs,
    checkForSameEmail,
    validatePassword,
    async (req, res, next) => {
        const { db } = await connectToDatabase()
        await db.collection("users").updateOne({ _id: req.user._id }, { $set: { email: req.body.email } })
        return res.json({ success: true })
    }
)

router.post(
    "/change-password",
    validateAuthorization,
    validateLocalAccount,
    validateChangePasswordInputs,
    checkForSamePassword,
    validatePassword,
    async (req, res, next) => {
        const salt = await bcrypt.genSalt(10)
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt)

        const { db } = await connectToDatabase()
        await db.collection("users").updateOne({ _id: req.user._id }, { $set: { password: hashedNewPassword } })
        return res.json({ success: true })
    }
)

router.delete(
    "/delete-account",
    validateAuthorization,
    validateLocalAccount,
    validateDeleteAccountInputs,
    validatePassword,
    async (req, res, next) => {
        const { db } = await connectToDatabase()
        await db.collection("users").deleteOne({ _id: req.user._id })
        return res.json({ success: true })
    }
)

router.get("/delete-account/oauth", validateAuthorization, async (req, res, next) => {
    if (req.user.local) return res.status(400).json({ success: false, error: "Invalid operation!" })

    const { db } = await connectToDatabase()
    await db.collection("users").deleteOne({ _id: req.user._id })
    return res.json({ success: true })
})

router.get("/log-out", validateAuthorization, (req, res, next) => {
    req.logout()
    return res.json({ success: true })
})

module.exports = router
