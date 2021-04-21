const validateUsername = (username) => !typeof username === "string" || username.length < 3 || username.length > 64
const validateEmail = (email) => !typeof email === "string" || email.length < 3 || email.length > 256
const validatePassword = (password) => !typeof password === "string" || password.length < 8 || password.length > 64
const validateStrongPassword = (password) => !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,64}$/.test(password)

module.exports.validateSignUpInputs = (req, res, next) => {
    const missingInputs = !req.body.username || !req.body.email || !req.body.password
    const hasInvalidInputs =
        validateUsername(req.body.username) ||
        validateEmail(req.body.email) ||
        validatePassword(req.body.password) ||
        validateStrongPassword(req.body.password)
    if (missingInputs || hasInvalidInputs) return res.status(400).json({ success: false, error: "Invalid inputs!" })
    next()
}

module.exports.validateSignInInputs = (req, res, next) => {
    const missingInputs = !req.body.email || !req.body.password
    const hasInvalidInputs = validateEmail(req.body.email) || validatePassword(req.body.password)
    if (missingInputs || hasInvalidInputs) return res.status(400).json({ success: false, error: "Invalid inputs!" })
    next()
}

module.exports.validateChangeUsernameInputs = (req, res, next) => {
    const missingInputs = !req.body.username || !req.body.password
    const hasInvalidInputs = validateUsername(req.body.username) || validatePassword(req.body.password)
    if (missingInputs || hasInvalidInputs) return res.status(400).json({ success: false, error: "Invalid inputs!" })
    next()
}

module.exports.validateChangeEmailInputs = (req, res, next) => {
    const missingInputs = !req.body.email || !req.body.password
    const hasInvalidInputs = validateEmail(req.body.email) || validatePassword(req.body.password)
    if (missingInputs || hasInvalidInputs) return res.status(400).json({ success: false, error: "Invalid inputs!" })
    next()
}

module.exports.validateChangePasswordInputs = (req, res, next) => {
    const missingInputs = !req.body.newPassword || !req.body.password
    const hasInvalidInputs = validatePassword(req.body.newPassword) || validatePassword(req.body.password)
    if (missingInputs || hasInvalidInputs) return res.status(400).json({ success: false, error: "Invalid inputs!" })
    next()
}

module.exports.validateDeleteAccountInputs = (req, res, next) => {
    const missingInputs = !req.body.password
    const hasInvalidInputs = validatePassword(req.body.password)
    if (missingInputs || hasInvalidInputs) return res.status(400).json({ success: false, error: "Invalid inputs!" })
    next()
}
