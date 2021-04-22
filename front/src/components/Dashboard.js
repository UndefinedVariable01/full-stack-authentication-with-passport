import { useState, useContext } from "react"
import { UserContext } from "../context/User"
import { AlertContext } from "../context/Alert"
import Introduction from "./Introduction"
import ChangeUsername from "./ChangeUsername"
import ChangeEmail from "./ChangeEmail"
import ChangePassword from "./ChangePassword"
import DeleteAccount from "./DeleteAccount"
import userPanelBackground from "../assets/user-panel-background.jpg"
import DefaultUserImg from "../assets/default-user-img.jpg"
import toggleIcon from "../assets/toggle.svg"
import "../styles/Dashboard.scss"

export default function Dashboard() {
    const { user } = useContext(UserContext)
    const { loading, setLoading, alert, alertAnimation, showAlert } = useContext(AlertContext)

    const [currentStep, setCurrentStep] = useState("Dashboard")
    const [navOpen, setNavOpen] = useState(false)
    const [navAnimation, setNavAnimation] = useState({})
    const [interfaceAnimation, setInterfaceAnimation] = useState({})

    function openNav() {
        if (navAnimation.openingNav) return

        setNavAnimation({ openingNav: true, first: true })

        const executeSecondStep = setTimeout(() => {
            clearTimeout(executeSecondStep)
            setNavAnimation((previousState) => ({ ...previousState, second: true }))
        }, 0)

        const executeThirdStep = setTimeout(() => {
            clearTimeout(executeThirdStep)
            setNavAnimation((previousState) => ({ ...previousState, third: true }))
        }, 500)

        const finishAnimation = setTimeout(() => {
            clearTimeout(finishAnimation)
            setNavOpen(true)
            setNavAnimation((previousState) => ({ ...previousState, openingNav: false }))
        }, 1000)
    }

    function closeNav() {
        if (navAnimation.closingNav) return

        setNavAnimation((previousState) => ({ ...previousState, closingNav: true, third: false }))

        const executeSecondStep = setTimeout(() => {
            clearTimeout(executeSecondStep)
            setNavAnimation((previousState) => ({ ...previousState, second: false }))
        }, 300)

        const executeThirdStep = setTimeout(() => {
            clearTimeout(executeThirdStep)
            setNavAnimation({})
            setNavOpen(false)
        }, 1000)
    }

    function changeInterface(nextStep) {
        closeNav()
        setInterfaceAnimation((previousState) => ({ ...previousState, nextStep, first: true }))

        const executeSecondStep = setTimeout(() => {
            clearTimeout(executeSecondStep)
            setInterfaceAnimation((previousState) => ({ ...previousState, first: false, second: true }))
            setCurrentStep(nextStep)
        }, 600)

        const executeThirdStep = setTimeout(() => {
            clearTimeout(executeThirdStep)
            setInterfaceAnimation((previousState) => ({ ...previousState, nextStep: null, second: false }))
        }, 650)
    }

    async function handleLogOut() {
        if (loading) return

        try {
            setLoading(true)
            const response = await fetch("/api/user/log-out", { credentials: "include" })
            const result = await response.json()

            if (result.success) {
                showAlert({
                    type: "success",
                    message: "You are loged out sucessfully. Reloading the page...",
                })

                const reloadPage = setTimeout(async () => {
                    clearTimeout(reloadPage)
                    window.location.replace("/")
                }, 3000)
            } else showAlert({ type: "fail", message: result.error })
        } catch (err) {
            showAlert({ type: "fail", message: "Unable to make the request!" })
        }
    }

    return (
        <div className="dashboard">
            <img className="dashboard__background" src={userPanelBackground} alt="Dashboard Background" />

            <div className="primary-nav">
                <div
                    className="nav-interface"
                    onClick={() => {
                        if (navOpen) return closeNav()
                        return openNav()
                    }}
                >
                    <img className="nav-interface__toggle-icon" src={toggleIcon} alt="Navbar Icon" />
                    <p className="nav-interface__text">{interfaceAnimation.nextStep ? interfaceAnimation.nextStep : currentStep}</p>
                    <div className="nav-interface__user-img">
                        <img src={!user.local ? user.avatar : DefaultUserImg} alt="User" />
                    </div>
                </div>

                <div className={`nav-toggle ${navAnimation.first ? "show-nav" : ""}`}>
                    <div className={`nav-toggle__background ${navAnimation.second ? "expand-nav-bg" : ""}`} />
                    {currentStep !== "Dashboard" && (
                        <p
                            className={`nav-toggle__btn ${navAnimation.third ? "show-nav-btns" : ""}`}
                            onClick={() => changeInterface("Dashboard")}
                        >
                            Dashboard
                        </p>
                    )}
                    {user.local && currentStep !== "Change Username" && (
                        <p
                            className={`nav-toggle__btn ${navAnimation.third ? "show-nav-btns" : ""}`}
                            onClick={() => changeInterface("Change Username")}
                        >
                            Change Username
                        </p>
                    )}
                    {user.local && currentStep !== "Change Email" && (
                        <p
                            className={`nav-toggle__btn ${navAnimation.third ? "show-nav-btns" : ""}`}
                            onClick={() => changeInterface("Change Email")}
                        >
                            Change Email
                        </p>
                    )}
                    {user.local && currentStep !== "Change Password" && (
                        <p
                            className={`nav-toggle__btn ${navAnimation.third ? "show-nav-btns" : ""}`}
                            onClick={() => changeInterface("Change Password")}
                        >
                            Change Password
                        </p>
                    )}
                    {currentStep !== "Delete Account" && (
                        <p
                            className={`nav-toggle__btn ${navAnimation.third ? "show-nav-btns" : ""}`}
                            onClick={() => changeInterface("Delete Account")}
                        >
                            Delete Account
                        </p>
                    )}
                    {currentStep !== "Log Out" && (
                        <p className={`nav-toggle__btn ${navAnimation.third ? "show-nav-btns" : ""}`} onClick={handleLogOut}>
                            Log Out
                        </p>
                    )}
                </div>
            </div>

            <div
                className={`dashboard__info ${interfaceAnimation.first ? "hide-interface-out" : ""} ${
                    interfaceAnimation.second ? "slide-interface-in" : ""
                }`}
            >
                {currentStep === "Dashboard" && <Introduction user={user} />}
                {currentStep === "Change Username" && (
                    <ChangeUsername user={user} showAlert={showAlert} loading={loading} setLoading={setLoading} />
                )}
                {currentStep === "Change Email" && (
                    <ChangeEmail user={user} showAlert={showAlert} loading={loading} setLoading={setLoading} />
                )}
                {currentStep === "Change Password" && <ChangePassword showAlert={showAlert} loading={loading} setLoading={setLoading} />}
                {currentStep === "Delete Account" && (
                    <DeleteAccount user={user} showAlert={showAlert} loading={loading} setLoading={setLoading} />
                )}
            </div>

            {alert && (
                <div
                    className={`alert dashboard-alert ${alertAnimation.first ? "show-dashboard-alert" : ""} ${
                        alertAnimation.second ? "hide-dashboard-alert" : ""
                    }`}
                >
                    {alert.type === "success" && <p className="standard-p">{alert.message}</p>}
                    {alert.type === "fail" && <p className="standard-p">{alert.message}</p>}
                </div>
            )}
        </div>
    )
}
