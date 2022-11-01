import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button } from '@mui/material'
import BlogPost from '../BlogPost'
import { getBlogPosts } from '../../hooks/utils/getBlogPosts'
import LoadingAnimation from '../LoadingAnimation'
import axios from 'axios'
import { LoadingContext } from '../../context/LoadingContext'

export default function PostListPage() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useContext(LoadingContext)

    useEffect(() => {
        setLoading(true)
        getBlogPosts().then(res => {
            setPosts([...res])
            setLoading(false)
        })
      }, [setLoading])    


    function handleDelete(id) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Are you sure you want to delete post with id ${id}?`)) { 
            setLoading(true)
            axios.post(`/delete/${id}`).then(() => {
                setPosts(prevPosts => {
                    let newPosts = []
                    prevPosts.forEach(post => {
                        if (post.slug !== id) {
                            newPosts.push(post)
                        }
                    })
    
                    return newPosts
                })
                setLoading(false)
            })
        }

    }

    return (
    <>
        <div className="bloglist-header">
            <Typography variant="h2" component="h2">Blog Posts</Typography>
            <Link to="/publish">
                <Button variant="contained">New Post</Button>
            </Link>
        </div>
        {!loading && <div className="bloglist-container">
            {posts.map(post => {
                return(
                    <BlogPost
                        key={post.slug}
                        title={post.title}
                        slug={post.slug}
                        description={post.content}
                        pubdate={post.pupdate}
                        handleDelete={handleDelete}
                    />
                )
            })}
        </div>}
        {loading && <LoadingAnimation />}
    </>

    )
}
