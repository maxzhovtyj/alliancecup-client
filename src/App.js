import './App.css';

import HeaderComponent from './components/header/header.component'
import FooterComponent from "./components/footer/footer.component";
import MainComponent from "./components/main/main.component";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";

function App() {
    const {token, login, logout, userId} = useAuth()
    let isAuth = !!token
    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuth,
            login, logout, userId
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
