import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navigation from './components/shared/Navigation/Navigation';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from "./pages/Login/Login";
import Authenticate from './pages/Authenticate/Authenticate';


const isAuth = false;


function App() {
  return (
    <BrowserRouter>

      {/* common component on all pages */}
      <Navigation/>

      <Routes>
        
        {/* for home page route  */}
        <Route exact path='/' element={<Home/>} />

        {/* authenticate page */}
        <GuestRoute path='/authenticate' element={<Authenticate/>} />

        {/* <Route path='/authenticate' element={<Authenticate/>} /> */}

        {/* for register page */}
        {/* <Route path='/register' element={<Register/>} /> */}

        {/* for login page */}
        {/* <Route path='/login' element={<Login/>} /> */}

      </Routes>
    </BrowserRouter>
  );
}

// to apply checks we created this component and inside it we have a route
const GuestRoute = ({element, ...rest})=>{
  return (
    <Route {...rest} render={({location})=>{
      return isAuth ?
      (<Navigate to={
        {
          path: "/rooms",
          state: {from: location}
        }
      } />)
      :
      (
        element
      )
    }} />
  )
}

export default App;
