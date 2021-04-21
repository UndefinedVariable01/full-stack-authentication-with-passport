import { useState, useContext } from "react"
import { AlertContext } from "../context/Alert"
import UsernameInput from "./UsernameInput"
import EmailInput from "./EmailInput"
import PasswordInput from "./PasswordInput"
import OAuthButtons from "./OAuthButtons"

export default function SignUpForm({ handleAuthFormChange }) {
    const { loading, setLoading, showAlert } = useContext(AlertContext)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmission(e) {
        e.preventDefault()
        if (loading) return

        try {
            setLoading(true)
            const response = await fetch("/api/auth/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            })
            const result = await response.json()

            if (result.success) {
                showAlert({
                    type: "success",
                    message: "Your Account has been created successfully! now you can sign in.",
                })

                const switchToSignIn = setTimeout(() => {
                    clearTimeout(switchToSignIn)
                    handleAuthFormChange()
                }, 3000)
            } else showAlert({ type: "fail", message: result.error })
        } catch (err) {
            showAlert({ type: "fail", message: "Unable to make the request!" })
        }
    }

    return (
        <div className="full-width">
            <form className="full-width auth__form" onSubmit={handleSubmission}>
                <UsernameInput title="Name" username={username} setUsername={setUsername} />
                <EmailInput title="Email" email={email} setEmail={setEmail} />
                <PasswordInput title="Password" password={password} setPassword={setPassword} />
                <button className="primary-btn form-submission-btn" type="submit">
                    Sign Up
                </button>
            </form>
            <OAuthButtons />
        </div>
    )
}
