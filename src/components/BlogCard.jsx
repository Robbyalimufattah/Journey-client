import React from 'react'

import DOMPurify from 'dompurify'


export default function BlogCard(props) {

  let clean = DOMPurify.sanitize(props.desc);

  return (
    <div className="blog-card rounded-md relative mb-10 w-72 mr-6 h-96 bg-white shadow-lg">
      <img
        src={props.image}
        alt="blog-1"
        className="w-full h-44 rounded-md mb-3 relative object-cover"/>

      <div>
        <p className="font-bold mx-2 h-12 line-clamp-3">{props.title}</p>
      </div>


      <div className='flex py-1 px-2 text-gray-400 gap-2'>
        <p>{props.date},</p>
        <p>{props.name}</p>
      </div>

      <div className="px-2 py-3">
        <p dangerouslySetInnerHTML={{ __html: clean }} className="line-clamp-3"></p>
      </div>
    </div>
  )
}
