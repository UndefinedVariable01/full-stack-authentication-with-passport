export default function UsernameInput({ title, username, setUsername }) {
    const unifiedTitle = title.toLowerCase().split(" ").join("-")

    return (
        <div className="form-field-container">
            <label className="form-label" htmlFor={unifiedTitle}>
                {title}
            </label>
            <input
                className="form-input"
                name={unifiedTitle}
                type="text"
                maxLength="64"
                required
                value={username}
                onBlur={(e) =>
                    e.target.value.length > 0 &&
                    e.target.value.length < 3 &&
                    e.target.setCustomValidity("Name should be at least 3 characters long!")
                }
                onChange={(e) => {
                    e.target.setCustomValidity("")
                    setUsername(e.target.value)
                }}
            />
        </div>
    )
}
