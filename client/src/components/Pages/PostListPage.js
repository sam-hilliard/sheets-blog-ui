import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material'
import BlogPost from '../BlogPost';
import { getBlogPosts } from '../../hooks/utils/getBlogPosts';

export default function PostListPage() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        getBlogPosts().then(res => setPosts([...res]))
      }, [])    

    return (
    <>
        <div className="bloglist-header">
            <Typography variant="h2" component="h2">Blog Posts</Typography>
            <Link to="/new-post">
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
    </>

    )
}
