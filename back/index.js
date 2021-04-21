const path = require("path")
const express = require("express")
const session = require("express-session")
require("dotenv").config()
const { passportConfig } = require("./config/passport")
const routes = require("./components/_routes")

const app = express()

app.use(express.json())
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)
passportConfig(app)

app.use("/api", routes)

app.use(express.static(path.join(__dirname, "../front/build")))
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../front/build/index.html")))

app.use((err, req, res, next) => {
    if (err) {
        return res.status(500).json({
            success: false,
            error: "Something went wrong in our side!",
        })
    }
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on port ${port}...`))
