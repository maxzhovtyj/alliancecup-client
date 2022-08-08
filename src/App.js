import './App.css';

import HeaderComponent from './components/header/header.component'
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HeaderComponent/>
        <Routes>
            <Route path="/"/>
        </Routes>
    </div>
  );
}

export default App;
