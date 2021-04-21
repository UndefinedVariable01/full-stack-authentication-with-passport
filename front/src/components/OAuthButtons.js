import googleIcon from "../assets/google-icon.svg"
import githubIcon from "../assets/github-icon.svg"

export default function OAuthButtons() {
    return (
        <div>
            <div className="oauth-title">
                <span className="oauth-title__line" />
                <span className="oauth-title__text">Or sign up with</span>
            </div>
            <div className="oauth-links">
                <button className="oauth-links__btn" onClick={() => window.open("/api/auth/google", "_self")}>
                    <img className="google-icon" src={googleIcon} alt="Google" title="Google" />
                </button>
                <button className="oauth-links__btn" onClick={() => window.open("/api/auth/github", "_self")}>
                    <img className="github-icon" src={githubIcon} alt="Github" title="Github" />
                </button>
            </div>
        </div>
    )
}
