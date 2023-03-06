import './App.css';

import {useSnackbar} from "./hooks/useSnackbar";
import {useAuth} from "./hooks/useAuth";
import useBurgerMenu from "./hooks/useBurgerMenu";

import HeaderComponent from './components/header/header.component'
import MainComponent from "./components/main/main.component";
import AllianceSnackbar from "./UI/snackbar";
import FooterComponent from "./components/footer/footer.component";

import {AuthContext} from "./context/AuthContext";
import {SnackbarContext} from "./context/SnackbarContext";

import {ROLES} from "./index";
import {BurgerContext} from "./context/BurgerContext";

function App() {
    const {login, logout, userId, userRoleCode} = useAuth()
    const {setMessage, open, message, handleClick, handleClose} = useSnackbar()
    const {showBurger, setShowBurger, toggleBurger} = useBurgerMenu()

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
            <BurgerContext.Provider value={{
                showBurger, setShowBurger, toggleBurger
            }}>
                <SnackbarContext.Provider value={{
                    setMessage,
                    handleClick,
                }}>
                    <div className={"App"}>
                        <HeaderComponent/>
                        <MainComponent/>
                        <FooterComponent/>
                    </div>
                    <AllianceSnackbar open={open} handleClose={handleClose} message={message}/>
                </SnackbarContext.Provider>
            </BurgerContext.Provider>
        </AuthContext.Provider>
    );
}

export default App;
