import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navigation from './components/shared/Navigation/Navigation';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>

      {/* common component on all pages */}
      <Navigation/>

      <Routes>
        
        {/* for home page route  */}
        <Route exact path='/' element={<Home/>} />

        {/* for register page */}
        <Route path='/register' element={<Register/>} />

        {/* for login page */}
        <Route path='/login' element={<Login/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
