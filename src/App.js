import './App.css';

import HeaderComponent from './components/header/header.component'
import FooterComponent from "./components/footer/footer.component";
import MainComponent from "./components/main/main.component";
import {AuthContext} from "./context/AuthContext";

function App() {

    return (
        <AuthContext.Provider value={{
            isAuthenticated: false
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
