import './App.css';

import HeaderComponent from './components/header/header.component'
import FooterComponent from "./components/footer/footer.component";
import MainComponent from "./components/main/main.component";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/useAuth";

function App() {
    const {token, login, logout} = useAuth()

    return (
        <AuthContext.Provider value={{
            isAuth: !!token,
            login: login,
            logout: logout
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
