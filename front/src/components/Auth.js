import { useState, useContext } from "react"
import { AlertContext } from "../context/Alert"
import SignUpForm from "./SignUpForm"
import SignInForm from "./SignInForm"
import authImg from "../assets/auth.jpg"
import "../styles/Auth.scss"

export default function Auth() {
    const { alert, alertAnimation } = useContext(AlertContext)

    const [step, setStep] = useState("sign-up")
    const [animationLevel, setAnimationLevel] = useState({})

    function handleAuthFormChange() {
        if (window.innerWidth < 780)
            return setStep((previousState) => {
                if (previousState === "sign-up") return "sign-in"
                return "sign-up"
            })

        if (animationLevel.first) return
        setAnimationLevel((previousState) => ({ ...previousState, first: true }))

        const executeAnimationSecondLevel = setTimeout(() => {
            clearTimeout(executeAnimationSecondLevel)
            setAnimationLevel((previousState) => ({ ...previousState, second: { lastStep: step } }))
        }, 100)

        const executeAnimationThirdLevel = setTimeout(() => {
            clearTimeout(executeAnimationThirdLevel)
            setAnimationLevel((previousState) => ({ ...previousState, third: true }))
            setStep((previousState) => {
                if (previousState === "sign-up") return "sign-in"
                return "sign-up"
            })
        }, 500)

        const executeAnimationForthLevel = setTimeout(() => {
            clearTimeout(executeAnimationForthLevel)
            setAnimationLevel((previousState) => ({ ...previousState, forth: true }))
        }, 550)

        const executeAnimationFifthhLevel = setTimeout(() => {
            clearTimeout(executeAnimationFifthhLevel)
            setAnimationLevel((previousState) => ({ ...previousState, fifth: true }))
        }, 850)

        const finishAnimation = setTimeout(() => {
            clearTimeout(finishAnimation)
            setAnimationLevel({})
        }, 1050)
    }

    return (
        <div className="auth">
            {step === "sign-in" && (
                <button
                    className={`primary-btn auth__nav-btn auth__nav-btn--sign-up ${animationLevel.first ? "zoom-out-btn" : ""} ${
                        animationLevel.fifth ? "zoom-in-btn" : ""
                    }`}
                    onClick={handleAuthFormChange}
                >
                    Sgin Up
                </button>
            )}
            {step === "sign-up" && (
                <button
                    className={`primary-btn auth__nav-btn auth__nav-btn--sign-in ${animationLevel.first ? "zoom-out-btn" : ""} ${
                        animationLevel.fifth ? "zoom-in-btn" : ""
                    }`}
                    onClick={handleAuthFormChange}
                >
                    Sgin In
                </button>
            )}

            <div
                className={`auth__img ${!animationLevel.second && step === "sign-up" ? "auth__img--sign-up" : "auth__img--sign-in"} ${
                    animationLevel.second && animationLevel.second.lastStep === "sign-up" ? "slide-to-left" : ""
                } ${animationLevel.second && animationLevel.second.lastStep === "sign-in" ? "slide-to-right" : ""}`}
            >
                <img src={authImg} alt="Auth" />
            </div>

            {step === "sign-up" && (
                <div
                    className={`auth__info-container ${animationLevel.third ? "hide-form" : ""} ${animationLevel.forth ? "show-form" : ""}`}
                >
                    <div className="full-width">
                        <h1 className="primary-title auth__title">Make An Account</h1>
                        <SignUpForm handleAuthFormChange={handleAuthFormChange} />
                    </div>
                </div>
            )}

            {step === "sign-in" && (
                <div
                    className={`auth__info-container auth__info-container--sign-in ${animationLevel.third ? "hide-form" : ""} ${
                        animationLevel.forth ? "show-form" : ""
                    }`}
                >
                    <div className="full-width">
                        <h1 className="primary-title auth__title">Sign In</h1>
                        <SignInForm />
                    </div>
                </div>
            )}

            {alert && (
                <div
                    className={`alert auth-alert ${step === "sign-up" ? "auth-alert--sign-up" : "auth-alert--sign-in"} ${
                        alertAnimation.first ? "show-auth-alert" : ""
                    } ${alertAnimation.second && step === "sign-up" ? "hide-alert-in-sign-up" : ""} ${
                        alertAnimation.second && step === "sign-in" ? "hide-alert-in-sign-in" : ""
                    }`}
                >
                    {alert.type === "success" && <p className="standard-p">{alert.message}</p>}
                    {alert.type === "fail" && <p className="standard-p">{alert.message}</p>}
                </div>
            )}
        </div>
    )
}
