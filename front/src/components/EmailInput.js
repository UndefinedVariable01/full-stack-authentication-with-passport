export default function EmailInput({ title, email, setEmail }) {
    const unifiedTitle = title.toLowerCase().split(" ").join("-")

    return (
        <div className="form-field-container">
            <label className="form-label" htmlFor={unifiedTitle}>
                {title}
            </label>
            <input
                className="form-input"
                name={unifiedTitle}
                type="email"
                maxLength="256"
                required
                value={email}
                onBlur={(e) =>
                    e.target.value.length > 0 &&
                    e.target.value.length < 3 &&
                    e.target.setCustomValidity("Email should be at least 3 characters long!")
                }
                onChange={(e) => {
                    e.target.setCustomValidity("")
                    setEmail(e.target.value)
                }}
            />
        </div>
    )
}
