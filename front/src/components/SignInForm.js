import { useState, useContext } from "react"
import { AlertContext } from "../context/Alert"
import EmailInput from "./EmailInput"
import PasswordInput from "./PasswordInput"
import OAuthButtons from "./OAuthButtons"

export default function SignUpForm() {
    const { loading, setLoading, showAlert } = useContext(AlertContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmission(e) {
        e.preventDefault()
        if (loading) return

        try {
            setLoading(true)
            const response = await fetch("/api/auth/sign-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })
            const result = await response.json()

            if (result.success) {
                showAlert({
                    type: "success",
                    message: "You are signed in. Navigating to the dashboard...",
                })

                const switchToSignIn = setTimeout(async () => {
                    clearTimeout(switchToSignIn)
                    window.location.replace("/")
                }, 3000)
            } else showAlert({ type: "fail", message: result.error })
        } catch (err) {
            showAlert({ type: "fail", message: "Unable to make the request!" })
        }
    }

    return (
        <div className="full-width">
            <form className="full-width auth__form" onSubmit={handleSubmission}>
                <EmailInput title="Email" email={email} setEmail={setEmail} />
                <PasswordInput title="Password" password={password} setPassword={setPassword} />
                <button className="primary-btn form-submission-btn" type="submit">
                    Sign In
                </button>
            </form>
            <OAuthButtons />
        </div>
    )
}
