import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { API } from '../config/api'

import {BlogCard} from '../exports'
import { bookmarkDark } from '../exports/exportImages'

import dateformat from 'dateformat'

export default function Bookmark() {

  const path = "http://localhost:5000/uploads/"

  const [bookmarks, setBookmarks] = useState([])

  const getUserBookmarks = async() => {
    try {
      const response = await API.get('/user-bookmarks')
      // console.log(response);
      setBookmarks(response.data.user.data)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteBookmark = async (id) => {
    try {
      const response = await API.delete("/bookmark/" + id);
      console.log(response);
      getUserBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBookmarks()
  },[])



  return (
    <div>
        <div>
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="mb-2 text-2xl font-bold font-['Avenir-Black']">My Bookmark</h2>
          </div>

          <div className='mx-2 lg:mx-12 product-list flex flex-wrap justify-center lg:justify-start mb-20 '>
          {bookmarks.map((items, index) => (
            <div className='relative'>
              <div type='button' onClick={() => deleteBookmark(items.id)}>
                  <img src={bookmarkDark} alt="" className='absolute z-30 right-8 top-3 cursor-pointer'/>
              </div>
              <Link to={`/blog/${items.idPost}`} key={index}>
                <BlogCard 
                  title={items.post.title}
                  name={items.post.user.fullname}
                  date={dateformat(items.createdAt, "mediumDate")}
                  image={path + items.post.image}
                  desc={items.post.desc}
                />
              </Link>
            </div>
          ))}
          </div>
        </div>
    </div>
  )
}
