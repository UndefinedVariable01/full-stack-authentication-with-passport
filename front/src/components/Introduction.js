export default function Introduction({ user }) {
    return (
        <div className="info-container">
            <h1 className="primary-title interface-title">Best Way To Personalize Your Experience</h1>
            <div>
                <p className="standard-p interface-standard-gap">
                    Its Great To Have You Here {user.username}.{" "}
                    {user.local && "Now You Can Modify Your Account By Changing Your Username, Email Or Password."}You Can{" "}
                    {user.local && "Also "}Delete Or Logout Of Your Account From Navbar Menu.
                </p>
                <p className="standard-p">
                    Warm Beer On A Cold Day Is Not Exactally My Idea Of Fun. She Saw The Brake Lights, But Not In Time. Too Many Prisons
                    Have Become Early Coffins.
                </p>
            </div>
        </div>
    )
}
