import { useState } from "react"
import PasswordInput from "./PasswordInput"

export default function ChangePassword({ loading, setLoading, showAlert }) {
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    async function handleSubmission(e) {
        e.preventDefault()

        if (loading) return
        if (password === newPassword) return showAlert({ type: "fail", message: "Both passwords can not be the same." })

        try {
            setLoading(true)
            const response = await fetch("/api/user/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ newPassword, password }),
            })
            const result = await response.json()

            if (result.success) {
                showAlert({
                    type: "success",
                    message: "Your password has been updated.",
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
            <h1 className="primary-title interface-title">Change Your Password</h1>
            <div className="interface-large-gap">
                <p className="standard-p">
                    Your New Password Could Not Be Same As Your Old Password. Try To Choose A Strong Password Including Various Characters.
                </p>
            </div>
            <form className="full-width" onSubmit={handleSubmission}>
                <PasswordInput title="New Password" password={newPassword} setPassword={setNewPassword} />
                <PasswordInput title="Password" password={password} setPassword={setPassword} />
                <button className="primary-btn form-submission-btn" type="submit">
                    Change Password
                </button>
            </form>
        </div>
    )
}
