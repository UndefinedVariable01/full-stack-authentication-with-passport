const bcrypt = require("bcrypt")

module.exports.validateAuthorization = (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, error: "Unauthorized!" })
    next()
}

module.exports.validateLocalAccount = (req, res, next) => {
    if (!req.user.local) return res.status(400).json({ success: false, error: "Invalid operation!" })
    next()
}

module.exports.checkForSameUsername = (req, res, next) => {
    if (req.user.username === req.body.username) return res.status(400).json({ success: false, error: "No new username was provided!" })
    next()
}

module.exports.checkForSameEmail = (req, res, next) => {
    if (req.user.email === req.body.email) return res.status(400).json({ success: false, error: "No new email was provided!" })
    next()
}

module.exports.checkForSamePassword = (req, res, next) => {
    if (req.user.password === req.body.newPssword) return res.status(400).json({ success: false, error: "No new password was provided!" })
    next()
}

module.exports.validatePassword = async (req, res, next) => {
    const result = await bcrypt.compare(req.body.password, req.user.password)
    if (!result) return res.status(401).json({ success: false, error: "Incorrect password!" })
    next()
}
