import './App.css';

import HeaderComponent from './components/header/header.component'
import FooterComponent from "./components/footer/footer.component";
import MainComponent from "./components/main/main.component";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/useAuth";

function App() {
    const {login, logout, userId, isAdmin, isModerator} = useAuth()

    return (
        <AuthContext.Provider value={{
            isAuth: !!localStorage.getItem("userData"),
            login: login,
            logout: logout,
            userId: userId,
            isAdmin: isAdmin,
            isModerator: isModerator,
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
