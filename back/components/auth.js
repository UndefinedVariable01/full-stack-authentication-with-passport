const express = require("express")
const connectToDatabase = require("../utility/mongodb")
const { passport } = require("../config/passport")
const bcrypt = require("bcrypt")
const { validateSignUpInputs, validateSignInInputs } = require("./validateInputs")

const router = express.Router()

router.post("/sign-up", validateSignUpInputs, async (req, res, next) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }

    try {
        const { db } = await connectToDatabase()
        const searchedUser = await db.collection("users").findOne({ email: user.email })
        if (searchedUser) return res.status(409).json({ success: false, error: "An user with this email address already exists!" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword

        await db.collection("users").insertOne({ ...user, local: true })
        res.json({ success: true })
    } catch (err) {
        next(err)
    }
})

router.post("/sign-in", validateSignInInputs, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err)
        if (!user) return res.status(401).json({ success: false, error: info.message })

        req.logIn(user, (err) => {
            if (err) return next(err)
            return res.json({ success: true })
        })
    })(req, res, next)
})

router.get("/google", passport.authenticate("google", { scope: ["profile"] }))
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/")
})

router.get("/github", passport.authenticate("github", { scope: ["profile"] }))
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
    res.redirect("/")
})

module.exports = router
