import './App.css';

import HeaderComponent from './components/header/header.component'
import FooterComponent from "./components/footer/footer.component";
import MainComponent from "./components/main/main.component";
import {AuthContext} from "./context/AuthContext";
import {SnackbarContext} from "./context/SnackbarContext";

import {useAuth} from "./hooks/useAuth";

import {ROLES} from "./index";

import AllianceSnackbar from "./UI/snackbar";
import {useSnackbar} from "./hooks/useSnackbar";

function App() {
    const {login, logout, userId, userRoleCode} = useAuth()
    const {setMessage, open, message, handleClick, handleClose} = useSnackbar()

    const data = JSON.parse(localStorage.getItem("userData"))
    return (
        <AuthContext.Provider value={{
            isAuth: !!localStorage.getItem("userData"),
            login: login,
            logout: logout,
            userId: userId,
            userRoleCode: userRoleCode,
            isAdmin: data?.userRoleCode === ROLES.SUPERADMIN,
            isModerator: data?.userRoleCode === ROLES.MODERATOR,
        }}>
            <SnackbarContext.Provider value={{
                setMessage,
                handleClick,
            }}>
                <div className="App">
                    <HeaderComponent/>
                    <MainComponent/>
                    <FooterComponent/>
                </div>
                <AllianceSnackbar open={open} handleClose={handleClose} message={message}/>
            </SnackbarContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
