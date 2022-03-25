import React, { useContext, useState } from 'react'

import {API} from "../../config/api"
import { LoginContext, RegisteredContext } from '../../context/AuthContext';
import { ModalContext } from '../../context/ModalContext';
import {UserContext} from '../../context/UserContext'

import {leaf, pin} from "../../exports/exportImages"


export default function LoginModal() {

    const [ login, setLogin ] = useContext(LoginContext)

    // State for Opening Modal
    const [ open, setOpen ] = useContext(ModalContext)

    // State to Switch between Login & Register Modal
    const [ registered, setRegistered ] = useContext(RegisteredContext)
    
    // State to Call UserContext
    const [ state, dispatch ] = useContext(UserContext);

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { email, password } = form;

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);

      // Checking process
      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });
        
        setLogin(!login)
        setOpen(!open)
      }
    } catch (error) {
      const alert = (
        <div
          class="flex items-center text-red-500 border border-red-500 rounded-lg py-2 text-md justify-center font-bold"
          role="alert"
        >
          <p>Failed to login. Try Again</p>
        </div>
      );
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <div>
        <img src={pin} className="top-0 left-0 absolute" />
        <img src={leaf} className="top-0 right-0 absolute" />
        <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-red">
            Login
        </h2>
        </div>
        {message && message}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} >
        <div className="-space-y-px">
            <div className="mb-4">
            <label htmlFor="email" className="sr-only">
                Email address
            </label>
            <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
                placeholder="Email"
            />
            </div>
            <div>
            <label htmlFor="password" className="sr-only">
                Password
            </label>
            <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
                placeholder="Password"
            />
            </div>
        </div>

        <div className="text-center">
            <button type='submit' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-brand-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                Login
            </button>
            <p className="font-['Avenir-Book'] mt-3">
            Don't have an account? Click {" "}
            <button
                onClick={() => setRegistered(!registered)}
                type="button"
                className="font-bold"
            >
                Here
            </button>
            </p>
        </div>
        </form>
    </div>
  )
}
