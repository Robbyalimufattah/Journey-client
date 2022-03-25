import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./config/api";

import UserRoute from "./components/privateRoute/UserRoute";
import Navbar from "./components/Navbar";

import Modal from "./components/modal";
// import LoginModal from "./components/modal/LoginModal";
// import RegisterModal from "./components/modal/RegisterModal";

import { Home, AddJourney, Bookmark, Profile, JourneyDetail } from './exports/exportPages'

import { LoginContext, RegisteredContext, RegisteredProvider } from "./context/AuthContext";

import './assets/styles/App.css'
import { Jumbotron } from "./exports";
import { ModalProvider } from "./context/ModalContext";
import { UserContext } from "./context/UserContext";

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {

  let navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)
  const [login, setLogin] = useContext(LoginContext)

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // Redirect Auth
    if (!state.isLogin) {
      setLogin(false);
      navigate("/");
    } else {
      setLogin(true);
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  // const [registered, setRegistered] = useContext(RegisteredContext)

  return (
    <>
      <ModalProvider>
        <RegisteredProvider>
          <Jumbotron/>
          <Modal />
        </RegisteredProvider>
      </ModalProvider>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/journey/add" element={<AddJourney/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog/:id" element={<JourneyDetail />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Routes>
    </>
  )
}

