import React, {useContext} from 'react'

import { logo } from '../exports/exportImages'

import { LoginContext, RegisteredContext } from '../context/AuthContext'
import { ModalContext } from '../context/ModalContext'
import { Navbar } from '../exports'


export default function Jumbotron() {

  const [open, setOpen] = useContext(ModalContext)
  const [registered, setRegistered] = useContext(RegisteredContext)
  const [login, setLogin] = useContext(LoginContext)

  const openRegister = () => {
    setOpen(true)
    setRegistered(false)
  }

  const openLogin = () => {
    setOpen(true)
    setRegistered(true)
  }

  return (
    <>
    {login ? (
      <Navbar />
    ) : (
      <header className='relative'>
        <div className='bg-jumbotron h-96 brightness-75'/>
        <div className="w-full md:px-20 md:py-4 top-0 absolute">
          <nav className="flex justify-between items-center w-full z-20">
            <div className="navLogo">
              <img src={logo} alt="logo" className='cursor-pointer'/>
            </div>

            <div className="buttonGroup space-x-5">
              <button onClick={openLogin} className="rounded px-3 lg:px-5 py-1 text-white border-2 
              text-[Product-Sans] box-border">Login</button>
              <button onClick={openRegister} className="rounded px-3 lg:px-5 py-1 text-white border-2 
              border-blue-600 bg-blue-600">Register</button>
            </div>
          </nav>
        </div>

        <div>
          <div className="text-white absolute top-24 left-2 lg:left-14 ">
            <h3 className="font-['Avenir-Book'] font-bold text-4xl lg:text-6xl mb-1 lg:mb-4 ">
              The Journey
            </h3>
            <h3 className="font-['Avenir-Book'] font-bold text-4xl lg:text-6xl mb-1 lg:mb-8 ">
              you ever dreamed of.
            </h3>
            <p className="font-['Avenir-Book'] text-lg lg:text-2xl ">
              We made a tool so you can easily keep & share your travel memories.
            </p>
            <p className="font-['Avenir-Book'] text-lg lg:text-2xl">
              But there is a lot more
            </p>
          </div>
        </div>
      </header>
    )}
    </>
  )
}
