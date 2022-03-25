import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../config/api'

import dateformat from 'dateformat'

import DOMPurify from 'dompurify'

export default function JourneyDetail() {

  let { id } = useParams()

  const [data, setData] = useState({})
  const [user, setUser] = useState([])
  
  let clean = DOMPurify.sanitize(data.desc)
  
  const getBlog = async(id) => {
    try {
      const response = await API.get('/blog/' + id)
      setData(response.data.data.blog)
      setUser(response.data.data.blog.user)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlog(id);
    return() => {
      setData({})
      setUser([])
    }
  },[])

  return (
    <div>
      <div className="md:w-9/12 md:m-auto md:mt-10">
        <div className="flex flex-col  md:my-10">
          <div>
            <h1 className="text-5xl">{data.title}</h1>
          </div>
          <div className='flex justify-between items-center mt-8' >
            <p className="text-lg text-gray-500">{dateformat(data.createdAt, "mediumDate")}</p>
            <p className="text-md text-gray-500">{user.fullname}</p>
          </div>
        </div>

        <div>
          <img src={data.image} alt="" />
        </div>

        <div>
          <p className='font-bold text-2xl mt-8 text-center'>
            {data.title}
          </p>
        </div>

        <div className="mt-10 text-justify mb-10">
          <p dangerouslySetInnerHTML={{ __html: clean }}></p>
        </div>
      </div>
    </div>
  )
}
