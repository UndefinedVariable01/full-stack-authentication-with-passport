import { useState } from "react"
import EmailInput from "./EmailInput"
import PasswordInput from "./PasswordInput"

export default function ChangeEmail({ loading, setLoading, user, showAlert }) {
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("")

    async function handleSubmission(e) {
        e.preventDefault()

        if (loading) return
        if (user.email === email) return showAlert({ type: "fail", message: "Please enter a new email." })

        try {
            setLoading(true)
            const response = await fetch("/api/user/change-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            })
            const result = await response.json()

            if (result.success) {
                showAlert({
                    type: "success",
                    message: "Your email has been updated.",
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
            <h1 className="primary-title interface-title">Change Email</h1>
            <div className="interface-large-gap">
                <p className="standard-p">
                    An Email Would Be Send To This New Email Address For Your To Verify By Clicking On The Link In The Email
                </p>
            </div>
            <form className="full-width" onSubmit={handleSubmission}>
                <EmailInput title="New Email" email={email} setEmail={setEmail} />
                <PasswordInput title="Password" password={password} setPassword={setPassword} />
                <button className="primary-btn form-submission-btn" type="submit">
                    Change Email
                </button>
            </form>
        </div>
    )
}
