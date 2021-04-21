import { useContext } from "react"
import { UserContext } from "../context/User"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Auth from "./Auth"
import Dashboard from "./Dashboard"
import "../styles/App.scss"

export default function App() {
    const { loading, user } = useContext(UserContext)

    if (loading) return <div />

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {user ? <Redirect to="/dashboard" /> : <Auth />}
                </Route>
                <Route exact path="/dashboard">
                    {!user ? <Redirect to="/" /> : <Dashboard />}
                </Route>
            </Switch>
        </Router>
    )
}
