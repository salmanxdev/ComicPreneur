import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom" ;
import LandingPage from './page/landing-page/LandingPage';

function App(){

  return (
    <div className="App">
      
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
        </Routes>
        </BrowserRouter>
      
    </div>
      
  );
}
export default App;