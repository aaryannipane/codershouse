import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/shared/Navigation/Navigation";
import Home from "./pages/Home/Home";
import Authenticate from "./pages/Authenticate/Authenticate";
import GuestRoute from "./ProtectedRoutes/GuestRoute/GuestRoute";
import SemiProtectedRoute from "./ProtectedRoutes/SemiProtectedRoute/SemiProtectedRoute";
import Activate from "./pages/Activate/Activate";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute/ProtectedRoute";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import { Loader } from "./components/shared/Loader/Loader";
import Room from "./pages/Room/Room";

function App() {
  const auth = useSelector((state) => state.auth);
  const { user, isAuth } = auth;

  const { loading } = useLoadingWithRefresh();
  // let loading = false;

  return loading ? (
    <Loader message="Loading, please wait..." />
  ) : (
    <BrowserRouter>
      {/* common component on all pages */}
      <Navigation />

      <Routes>
        {/* GUESTROUTE START */}
        {/* for home page route  */}
        <Route
          exact
          path="/"
          element={<GuestRoute isAuth={isAuth} Component={Home} />}
        />

        {/* authenticate page */}
        <Route
          path="/authenticate"
          element={<GuestRoute isAuth={isAuth} Component={Authenticate} />}
        />

        {/* <Route element={<GuestRoute isAuth={isAuth}/>}>
          <Route path='/' exact element={<Home/>} />
          <Route path='/authenticate' exact element={<Authenticate/>} />
        </Route> */}
        {/* GUESTROUTE END */}

        {/* SEMIPROTECTEDROUTE START */}
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute
              isAuth={isAuth}
              activated={user.activated}
              Component={Activate}
            />
          }
        />
        {/* SEMIPROTECTEDROUTE END */}

        {/* PROTECTED ROUTE START */}
        <Route
          path="/rooms"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              activated={user.activated}
              Component={Rooms}
            />
          }
        />
        <Route
          path="/room/:id"
          element={
            <ProtectedRoute
              isAuth={isAuth}
              activated={user.activated}
              Component={Room}
            />
          }
        />
        {/* PROTECTED ROUTE END */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
