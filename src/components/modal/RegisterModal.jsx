import React, { useState, useContext } from 'react'
import { RegisteredContext } from '../../context/AuthContext'

import { API } from "../../config/api";

import {leaf, pin} from "../../exports/exportImages"

export default function RegisterModal() {

  const [registered, setRegistered] = useContext(RegisteredContext)

  const [message, setMessage] = useState(null);
  
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  const { fullname, email, phone, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);

      // Notification
      if (response.data.status === "Success...") {
        const alert = (
          <div
            className="flex items-center bg-green-600 rounded-md text-white text-sm px-4 py-3"
            role="alert"
          >
            <p>
              Successfully registered. Click{" "}
              <button
                className="font-bold"
                onClick={() => setRegistered(!registered)}
              >
                here
              </button>{" "}
              to login.
            </p>
          </div>
        );
        setMessage(alert);
        setForm({
          fullname: "",
          email: "",
          phone: "",
          password: "",
        });
      } else if (response?.status === 400) {
        const alert = (
          <div
            className="flex justify-center items-center rounded-md text-blue-600 border border-blue-600 text-sm font-bold px-4 py-3"
            role="alert"
          >
            <p>{response.message}</p>
          </div>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <div
          className="flex justify-center items-center rounded-md text-red-600 border border-red-600 text-sm font-bold px-4 py-3"
          role="alert"
        >
          <p>Register Failed. Try Again</p>
        </div>
      );
      console.log(error);
      setMessage(alert);
    }
  };

  return (
    <div>
      <img src={pin} className="top-0 left-0 absolute" />
      <img src={leaf} className="top-0 right-0 absolute" />
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-red">
          Register
        </h2>
      </div>
      {message && message}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px">
          <div>
            <label htmlFor="fullname" className="sr-only">
              Full Name
            </label>
            <input
              id="fullname"
              name="fullname"
              type="text"
              value={fullname}
              onChange={handleChange}
              required
              className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm mb-4"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              required
              className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm mb-4"
              placeholder="Email"
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="number"
              value={phone}
              onChange={handleChange}
              required
              className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm mb-4"
              placeholder="Phone"
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
              required
              className="appearance-none rounded-md shadow-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-600 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-brand-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            </span>
            Sign Up
          </button>
          <p className="font-['Avenir-Book'] mt-3">
            Already have an account? Click{" "}
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
