import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./views/home/Home";
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./views/home/loginAndRegister/Login";
import Register from "./views/home/loginAndRegister/Register";
import RouteAdmin from "./views/admin/RouteAdmin";
import RenderToken from "./custom/renderToken";
import { useEffect, useState } from "react";

function App() {
  const [showToken, setShowToken] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState("");
  const [time, setTime] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("decodedToken"));
    if (isLogin && token) {
      const tokenParser = JSON.parse(token);
      const timeOut = (tokenParser.exp - tokenParser.iat - 60) * 1000;
      setTime(timeOut);
      const timer = setTimeout(() => {
        setShowToken(true);
      }, [timeOut]);
      return () => clearTimeout(timer);
    }
  }, [isLogin, token, time, showToken]);
  return (
    <>
      {showToken && <RenderToken showToken={showToken}
        setIsLogin={setIsLogin}
        setShowToken={setShowToken}
      />}
      <Routes >
        <Route path="/" element={<Home setIsLogin={setIsLogin} />} />
        <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<RouteAdmin setIsLogin={setIsLogin} />} />
      </Routes >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;