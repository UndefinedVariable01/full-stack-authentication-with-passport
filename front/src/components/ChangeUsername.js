import { useState } from "react"
import PasswordInput from "./PasswordInput"
import UsernameInput from "./UsernameInput"

export default function ChangeUsername({ loading, setLoading, user, showAlert }) {
    const [username, setUsername] = useState(user.username)
    const [password, setPassword] = useState("")

    async function handleSubmission(e) {
        e.preventDefault()

        if (loading) return
        if (user.username === username) return showAlert({ type: "fail", message: "Please enter a new username." })

        try {
            setLoading(true)
            const response = await fetch("/api/user/change-username", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            })
            const result = await response.json()

            if (result.success) {
                showAlert({
                    type: "success",
                    message: "Your username has been updated.",
                })

                const switchToSignIn = setTimeout(async () => {
                    clearTimeout(switchToSignIn)
                    window.location.replace("/dashboard")
                }, 3000)
            } else showAlert({ type: "fail", message: result.error })
        } catch (err) {
            showAlert({ type: "fail", message: "Unable to make the request!" })
        }
    }

    return (
        <div className="info-container">
            <h1 className="primary-title interface-title">Change Username</h1>
            <div className="interface-large-gap">
                <p className="standard-p">
                    This New Username Does Not Have To Be Unique. Feel Free To Choose What Ever Username You Like The Most.
                </p>
            </div>
            <form className="full-width" onSubmit={handleSubmission}>
                <UsernameInput title="New Name" username={username} setUsername={setUsername} />
                <PasswordInput title="Password" password={password} setPassword={setPassword} />
                <button className="primary-btn form-submission-btn" type="submit">
                    Change Username
                </button>
            </form>
        </div>
    )
}
