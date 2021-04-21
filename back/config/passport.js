const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
const GitHubStrategy = require("passport-github2")
const connectToDatabase = require("../utility/mongodb")
const mongodb = require("mongodb")
const bcrypt = require("bcrypt")

module.exports.passportConfig = function (app) {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(
        new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
            try {
                const { db } = await connectToDatabase()
                const user = await db.collection("users").findOne({ email: username })

                if (!user) return done(null, false, { message: "Invalid email or password!" })

                const result = await bcrypt.compare(password, user.password)
                if (!result) return done(null, false, { message: "Invalid email or password!" })
                return done(null, user)
            } catch (err) {
                return done(err)
            }
        })
    )

    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/api/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const { db } = await connectToDatabase()
                    const result = await db
                        .collection("users")
                        .findOneAndUpdate({ googleId: profile.id }, { $set: { ...profile } }, { upsert: true, returnOriginal: false })
                    const user = result.value
                    done(null, user)
                } catch (err) {
                    done(err)
                }
            }
        )
    )

    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: "/api/auth/github/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const { db } = await connectToDatabase()
                    const result = await db
                        .collection("users")
                        .findOneAndUpdate({ githubId: profile.id }, { $set: { ...profile } }, { upsert: true, returnOriginal: false })
                    const user = result.value
                    done(null, user)
                } catch (err) {
                    done(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async function (id, done) {
        try {
            const { db } = await connectToDatabase()
            const user = await db.collection("users").findOne({ _id: new mongodb.ObjectId(id) })
            done(null, user)
        } catch (err) {
            done(err)
        }
    })
}

module.exports.passport = passport
