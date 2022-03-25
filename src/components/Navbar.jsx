import React, { useContext } from 'react'

import {Avatar} from "../exports/index"

import { logoJourney } from '../exports/exportImages'
import { LoginContext } from '../context/AuthContext'

import { Link } from 'react-router-dom'

export default function Navbar() {

  const [login, setLogin] = useContext(LoginContext)

  return (
    <>

      <nav className='shadow-xl'>
        <div className="mx-4 lg:mx-20 mt-4 flex justify-between items-center" >
          <Link to="/">
            <a>
                <img src={logoJourney} />   
            </a>
          </Link>
            <div className="space-x-5 justify-end flex items-center relative">
              <Avatar />
            </div>  
        </div>
     </nav>

    </>
      
  )
}
