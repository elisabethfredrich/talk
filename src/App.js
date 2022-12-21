import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Registration/ProfileRegistration";
import ChatPage from "./components/Chat/ChatPage";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import { UserStatusContext } from "./components/UserStatusContext";
import { useState } from "react";
import { initializeParse } from "@parse/react";
import getCurrentUser from "./API/UserAPICalls";
import GroupRegistration from "./components/Registration/GroupRegistration";

const PARSE_APPLICATION_ID = "Wzv1x4CROb62HE44l9JbHux2LMZ4AR5DvKitYzQL";
const PARSE_LIVE_QUERY_URL = "https://talkchat.b4a.io/";
const PARSE_JAVASCRIPT_KEY = "8GIc2PHk6VT38QVCDeGegHIcinHXQYeV7nLf75cQ";

initializeParse(
  PARSE_LIVE_QUERY_URL,
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY
);

function App() {
  const pathname = window.location.pathname;

  const [loggedIn, setLoggedIn] = useState(
    getCurrentUser() !== null ? true : false
  );

  return (
    <div className="App">
      <div id="app-main">
        <UserStatusContext.Provider value={{ loggedIn, setLoggedIn }}>
          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route
                path="/login"
                element={loggedIn ? <Navigate to="/home" /> : <Login />}
              />
              <Route
                path="/register"
                element={loggedIn ? <Navigate to="/home" /> : <Register />}
              />
              <Route
                path="/chats/:chatId"
                element={!loggedIn ? <Navigate to="/login" /> : <ChatPage />}
              />

              <Route
                path="/search"
                element={!loggedIn ? <Navigate to="/login" /> : <Search />}
              />

              <Route
                path="/groupregistration"
                element={
                  !loggedIn ? <Navigate to="/login" /> : <GroupRegistration />
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>

          {!pathname.includes("/chats") && <Footer />}
        </UserStatusContext.Provider>
      </div>
    </div>
  );
}

export default App;
