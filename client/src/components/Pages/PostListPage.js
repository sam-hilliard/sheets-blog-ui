import React from 'react'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import BlogPost from '../BlogPost';
import { getBlogPosts } from '../../hooks/utils/getBlogPosts';

export default function PostListPage() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        getBlogPosts().then(res => setPosts([...res]))
      }, [])    

    return (
    <>
        <Typography variant="h2" component="h2">Blog Posts</Typography>
        <div className="bloglist-container">
            {posts.map(post => {
                return(
                    <BlogPost
                        key={post.slug}
                        title={post.title}
                        slug={post.slug}
                        pubdate={post.pupdate}
                    />
                )
            })}
        </div>
    </>

    )
}
