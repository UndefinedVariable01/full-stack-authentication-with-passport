import { useState } from "react"
import PasswordInput from "./PasswordInput"

export default function ChangeEmail({ loading, setLoading, user, showAlert }) {
    const [password, setPassword] = useState("")

    async function handleSubmission(e) {
        e.preventDefault()
        if (loading) return

        try {
            setLoading(true)
            let response
            if (user.local)
                response = await fetch("/api/user/delete-account", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ password }),
                })
            else response = await fetch("/api/user/delete-account/oauth", { credentials: "include" })

            const result = await response.json()

            if (result.success) {
                showAlert({
                    type: "success",
                    message: "Your account has been deleted.",
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
            <h1 className="primary-title interface-title">Delete Your Account</h1>
            <div className="interface-large-gap">
                <p className="standard-p">
                    Your Account Will Be Removed Permanently. Think Carefully Before Confirming, All Of Your Personal Data Will Be Gone!
                </p>
            </div>
            <form className="full-width" onSubmit={handleSubmission}>
                {user.local && <PasswordInput title="Password" password={password} setPassword={setPassword} />}
                <button className="primary-btn form-submission-btn" type="submit">
                    Delete Account
                </button>
            </form>
        </div>
    )
}
