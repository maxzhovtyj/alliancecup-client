import './App.css';

import HeaderComponent from './components/header/header.component'
import FooterComponent from "./components/footer/footer.component";
import MainComponent from "./components/main/main.component";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/useAuth";
import {ROLES} from "./index";

function App() {
    const {login, logout, userId, userRoleCode} = useAuth()

    const data = JSON.parse(localStorage.getItem("userData"))
    return (
        <AuthContext.Provider value={{
            isAuth: !!localStorage.getItem("userData"),
            login: login,
            logout: logout,
            userId: userId,
            userRoleCode: userRoleCode,
            isAdmin: data?.userRoleCode === ROLES.SUPERADMIN ,
            isModerator: data?.userRoleCode === ROLES.MODERATOR,
        }}>
            <div className="App">
                <HeaderComponent/>
                <MainComponent/>
                <FooterComponent/>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
