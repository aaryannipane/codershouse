import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';

function App() {
  return (
    <BrowserRouter>

      {/* common component on all pages */}
      <Navigation/>

      <Routes>
        {/* for home page route  */}
        <Route exact path='/' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
