import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button } from '@mui/material'
import BlogPost from '../BlogPost'
import { getBlogPosts } from '../../hooks/utils/getBlogPosts'
import LoadingAnimation from '../LoadingAnimation'

export default function PostListPage() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getBlogPosts().then(res => setPosts([...res]))
        setLoading(false)
      }, [])    

    return (
    <>
        <div className="bloglist-header">
            <Typography variant="h2" component="h2">Blog Posts</Typography>
            <Link to="/publish">
                <Button variant="contained">New Post</Button>
            </Link>
        </div>
        <div className="bloglist-container">
            {posts.map(post => {
                return(
                    <BlogPost
                        key={post.slug}
                        title={post.title}
                        slug={post.slug}
                        description={post.content}
                        pubdate={post.pupdate}
                    />
                )
            })}
        </div>
        {loading && <LoadingAnimation />}
    </>

    )
}
