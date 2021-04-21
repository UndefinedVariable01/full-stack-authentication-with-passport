import React from "react"
import ReactDOM from "react-dom"
import { UserProvider } from "./context/User"
import { AlertProvider } from "./context/Alert"
import App from "./components/App"

ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <AlertProvider>
                <App />
            </AlertProvider>
        </UserProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
