import { createContext, useState } from "react"

export const AlertContext = createContext()

export function AlertProvider(props) {
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)
    const [alertAnimation, setAlertAnimation] = useState({})

    function showAlert(nextAlert) {
        if (alertAnimation.first) return
        setAlert(nextAlert)

        const executeFirstLevel = setTimeout(() => {
            clearTimeout(executeFirstLevel)
            setAlertAnimation({ first: true })
        }, 50)

        const executeSecondLevel = setTimeout(() => {
            clearTimeout(executeSecondLevel)
            setAlertAnimation((previousState) => ({ ...previousState, second: true }))
        }, 2500)

        const executeThirdLevel = setTimeout(() => {
            clearTimeout(executeThirdLevel)
            setAlert(null)
            setAlertAnimation({})
            setLoading(false)
        }, 3050)
    }

    return (
        <AlertContext.Provider
            value={{
                loading,
                setLoading,
                alert,
                alertAnimation,
                showAlert,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}
