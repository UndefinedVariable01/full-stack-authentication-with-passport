import { useState } from "react"
import eyeIcon from "../assets/eye-icon.svg"

export default function PasswordInput({ title, password, setPassword }) {
    const [showPassword, setShowPassword] = useState(false)

    const unifiedTitle = title.toLowerCase().split(" ").join("-")

    return (
        <div className="form-field-container">
            <label className="form-label" htmlFor={unifiedTitle}>
                {title}
            </label>
            <div className="password-input-container">
                {password.length > 0 && (
                    <img
                        src={eyeIcon}
                        className="show-hide-btn"
                        onClick={() => setShowPassword((previousState) => (previousState ? false : true))}
                        alt="Toggle"
                    />
                )}
                <input
                    className="form-input password-input"
                    name={unifiedTitle}
                    type={showPassword ? "text" : "password"}
                    maxLength="64"
                    required
                    value={password}
                    onBlur={(e) => {
                        if (e.target.value.length > 0 && e.target.value.length < 8)
                            e.target.setCustomValidity("Password should be at least 8 characters long!")
                        else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,64}$/.test(e.target.value))
                            e.target.setCustomValidity(
                                "Your password is too weak. it should include numbers, lowercase and upercase letters"
                            )
                    }}
                    onChange={(e) => {
                        e.target.setCustomValidity("")
                        setPassword(e.target.value)
                    }}
                />
            </div>
        </div>
    )
}
