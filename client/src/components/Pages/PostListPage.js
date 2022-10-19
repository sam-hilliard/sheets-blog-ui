import React from 'react'
import { Typography } from '@mui/material'
import BlogPost from '../BlogPost';

export default function PostListPage() {
  return (
    <>
        <Typography variant="h2" component="h2">Blog Posts</Typography>
        <div className="bloglist-container">
            <BlogPost title="some title" description="some description" />
        </div>
    </>
    
  )
}
