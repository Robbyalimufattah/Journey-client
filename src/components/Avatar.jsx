import React, { Fragment, useContext } from 'react'
import { Menu, Transition } from "@headlessui/react";

import { bookmark, addJourney, logoutIcon, user, myProfile  } from '../exports/exportImages'
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';

export default function Avatar() {

  const [login, setLogin] = useContext(LoginContext)
  const [state, dispatch] = useContext(UserContext)

  let navigate = useNavigate()

  const logout = () => {
    setLogin(false);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <div>
      <Menu as="div" className="relative z-10">
        <div>
          <Menu.Button>
          <span className="sr-only">Open user menu</span>
            <img
              src={myProfile}
              alt="user"
              className="max-h-14 w-14 object-cover rounded-full border-2 border-blue-500"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <>
                <Menu.Item>
                  <Link to="/profile" className="p-4 flex items-center hover:bg-gray-100 cursor-pointer font-['Avenir-Book']">
                    <img
                      src={user}
                      className="w-5 mr-2"
                      alt="proflie"
                    />
                    My Profile
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/journey/add" className="p-4 flex items-center hover:bg-gray-100 cursor-pointer font-['Avenir-Book']">
                    <img
                      src={addJourney}
                      className="w-5 mr-2"
                      alt="journey"
                    />
                    New Journey
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/bookmark" className="p-4 flex items-center hover:bg-gray-100 cursor-pointer font-['Avenir-Book']">
                    <img
                      src={bookmark}
                      className="w-5 mr-2"
                      alt="bookmark"
                    />
                    Bookmark
                  </Link>
                </Menu.Item>
                <hr />
                <Menu.Item>
                  <div onClick={logout} className="p-4 flex items-center hover:bg-gray-100 cursor-pointer font-['Avenir-Book']">
                    <img src={logoutIcon} className="w-5 mr-2" alt="logout" />
                    Logout
                  </div>
                </Menu.Item>
              </>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
