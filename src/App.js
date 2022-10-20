import './App.css';

import HeaderComponent from './components/header/header.component'
import FooterComponent from "./components/footer/footer.component";
import MainComponent from "./components/main/main.component";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/useAuth";

function App() {
    const {login, logout, userId, userRoleId} = useAuth()

    const data = JSON.parse(localStorage.getItem("userData"))
    return (
        <AuthContext.Provider value={{
            isAuth: !!localStorage.getItem("userData"),
            login: login,
            logout: logout,
            userId: userId,
            userRoleId: userRoleId,
            isAdmin: data?.userRoleId === 3 ,
            isModerator: data?.userRoleId === 2 || data?.userRoleId === 3,
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
