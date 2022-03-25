import React, { useContext, useEffect, useState } from 'react'

import { myProfile } from '../exports/exportImages'
import {BlogCard} from '../exports'

import { Blogs } from '../tempDatabase/Blogs'
import { UserContext } from '../context/UserContext'
import { API } from '../config/api'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'

export default function Profile() {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState([])

  const [state, dispatch] = useContext(UserContext)

  const getBlogUser = async () => {
    try {
      const response = await API.get(`/blogUser/${state.user.id}`);
      setBlogs(response.data.data.posts);
      setUser(response.data.data.posts.user)
      console.log(response);
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlogUser([])
  }, [])

  return (
    <div>
      <div className="flex items-center justify-center md:mt-16">
        <img src={myProfile} alt="" className="w-56 h-56 rounded-full object-cover" />
      </div>
      <div className="flex items-center justify-center flex-col md:mt-4">
        <h1 className="text-xl">{state.user.fullname}</h1>
        <p>{state.user.email}</p>
        <p>{state.user.phone}</p>
      </div>

      <div>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="mb-2 text-2xl font-bold font-['Avenir-Black']">My Post</h2>
        </div>

        <div className='mx-2 lg:mx-12 product-list flex flex-wrap justify-center lg:justify-start mb-20 '>
        {blogs.map((items, index) => (
          <Link to={`/blog/${items.id}`} key={index}>
            <BlogCard 
                title={items.title}
                name={items.user.fullname}
                date={dateFormat(items.createdAt, "mediumDate")}
                image={items.image}
                desc={items.desc}
            />
          </Link>
        ))}
        </div>
      </div>
    </div>
  )
}
