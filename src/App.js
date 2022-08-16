import './App.css';

import HeaderComponent from './components/header/header.component'
import FooterComponent from "./components/footer/footer.component";
import MainComponent from "./components/main/main.component";

function App() {
    return (
        <div className="App">
            <HeaderComponent/>
            <MainComponent/>
            <FooterComponent/>
        </div>
    );
}

export default App;
