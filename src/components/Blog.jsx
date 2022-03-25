import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { API } from "../config/api";

import dateformat from 'dateformat';
import Snackbar from "@mui/material/Snackbar"

import {BlogCard} from '../exports'
import { bookmarkLight } from '../exports/exportImages'


export default function Blog() {

    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState([])

    const [searchTerm, setSearchTerm] = useState('')
    const [view, setView] = useState("")

    const [open, setOpen] = useState(false)

    const handleClick = async () => {
        setOpen(true)
    };

    const handleClose = (event, reason) => {
        if(reason === "clickaway"){
            return;
        };
        setOpen(false)
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const action = (
        <React.Fragment>
            <button onClick={handleClose}c>lose</button>
        </React.Fragment>
    )


    const getBlogs = async () => {
        try {
        const response = await API.get("/blogs");
        
        // Store product data to useState variabel
        setBlogs(response.data.data.blogs);
        setUser(response.data.data.blogs.user)
        } catch (error) {
        console.log(error);
        }
    };

    const handleBookmark = async(postId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            var id = {
                idPost: postId
            };

            const body = JSON.stringify(id);
            const response = await API.post("bookmark", body, config)

        } catch (error) {
            console.log(error);
        }
    }

    const showMore = () => {
        setView(preview => preview + 4)
    }

    useEffect(() => {
        getBlogs([]);
    }, []);

    return (
        <div>
            <div className="md:mt-10">
            <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Saved to bookmark."
            action={action}
            />
                <div className="my-2 lg:my-10 relative">
                    <h1 className="mx-2 lg:mx-16 text-5xl mb-10 lg:mb-10 text-brand-red font-extrabold font-['Avenir-Book']">
                        Journey
                    </h1>
                    <div className='mx-10'>
                        <form className="w-full flex justify-center pb-10">
                        <input onChange={handleChange}
                            type="text"
                            className="w-10/12 p-3 rounded-md focus:outline-none"
                            placeholder="Find Journey"
                        />
                        </form>
                    </div>
                    <div className='mx-2 lg:mx-12 product-list flex flex-wrap justify-center lg:justify-start mb-20 '>  
                        {blogs
                        .slice(0, view )
                        .filter((items) => {
                            if (searchTerm === "") {
                            return items;
                            } else if (
                            items.title.toLowerCase().includes(searchTerm.toLowerCase())
                            ) {
                            return items;
                            } else if (
                            items.user.fullname
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            ) {
                            return items;
                            } else if (
                            items.desc.toLowerCase().includes(searchTerm.toLowerCase())
                            ) {
                            return items;
                            }
                        }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((items, index) => (
                            <div className='relative'>
                                <div onClick={() => handleBookmark(items.id)}>
                                    <img onClick={handleClick} src={bookmarkLight} className='absolute z-30 right-8 top-3 cursor-pointer'/>
                                </div>
                                <Link to={`/blog/${items.id}`} key={index}>
                                    <BlogCard 
                                        title={items.title}
                                        name={items.user.fullname}
                                        date={dateformat(items.createdAt, "mediumDate")}
                                        image={items.image}
                                        desc={items.desc}
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center'>
                        <button
                        onClick={showMore} 
                        className='px-8 py-1 bg-blue-900 text-white rounded'>
                            Show More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
