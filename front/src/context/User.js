import { createContext, useState, useEffect } from "react"

export const UserContext = createContext()

export function UserProvider(props) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        ;(async () => {
            try {
                const response = await fetch("/api/user", { credentials: "include" })
                const result = await response.json()
                if (result.success) setUser(result.user)
                setLoading(false)
            } catch (err) {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <UserContext.Provider
            value={{
                loading,
                user,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}
