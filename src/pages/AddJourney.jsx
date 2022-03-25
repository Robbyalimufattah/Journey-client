import React, { useState } from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


import { API } from '../config/api'

export default function AddJourney() {

  const [message, setMessage] = useState(null)
  const [form, setForm] = useState({
    title: "",
    desc: "",
    image: "",
  })

  const {title, desc, image} = form;
  
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: 
      event.target.type === "file" ? event.target.files : event.target.value
    });
  };

  const handleChangeEditor = (event, editor) => {
    const data = editor.getData();
    setForm({
      ...form,
      desc: data,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data"
        },
      };

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("desc", form.desc);
      formData.set("image", form.image[0], form.image[0].name);

      // const response = await API.post("/blog", formData, config);

      const response = await API.post('/blog', formData, config)

      console.log(response);

      if (response.data.status === "Success") {
        const alert = (
          <div
            className="flex items-center bg-green-600 rounded-md text-white text-sm px-4 py-3"
            role="alert"
          >
            <p>New Journey posted.</p>
          </div>
        );
        setMessage(alert);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
        setForm({
          title: "",
          desc: "",
          image: "",
        });
      } else {
        const alert = (
          <div
            className="flex justify-center items-center bg-red-600 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <p>Error. Try Again</p>
          </div>
        );
        console.log(response);
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
      }
    };

  return (
    <>
        <div className='relative mx-5 my-4 md:mx-24 md:my-8'>
          <h1 className='text-3xl md:text-4xl font-bold font-["Avenir-Book"] tracking-wider mb-10 md:mx-3'>
            New Journey
          </h1>

          <div className='mx-20'>
            {message && message}
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="title"
                className="flex flex-col md:mt-5 text-xl md:mb-8 font-['Avenir-Book'] text-gray-500"
              >
                Title Journey
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={title}
                  required
                  className="border-2 py-1 px-3 mt-2"
                />
              </label>

              <CKEditor editor={ClassicEditor} onChange={handleChangeEditor}/>

              <label htmlFor="thumbnail" className="flex flex-col mt-4 text-gray-500">
                Upload Image
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="md:mt-1 text-black"
                />
              </label>

              <div className="flex justify-end mt-16">
                <button type='submit' className="text-center text-white w-48 px-5 py-2 bg-blue-700 rounded-md">
                  Post
                </button>
              </div>   
            </form>
          </div>
        </div>
    </>
  )
}
