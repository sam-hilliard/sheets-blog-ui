import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import { getBlogPost } from '../../hooks/utils/getBlogPosts';
import { Button, TextField, Typography } from '@mui/material'

export default function EditPost() {

    const { id } = useParams()
    const [post, setPost] = useState({})
    
    useEffect(() => {
        getBlogPost(id).then(res => setPost(res))
    }, [id])

    return (
        <div className="edit-post-page">
            <div className="input-field">
                <Typography variant="body2" component="p">Title</Typography>
                <TextField id="title" variant="outlined" value={post.title}/>
            </div>

            <Typography variant="body1" component="p">Generated Slug: {post.slug} </Typography>
            
            <div className="input-field">
                <Typography variant="body2" component="p">Image URL</Typography>
                <TextField id="img" variant="outlined" value={post.img}/>
            </div>

            <img src={post.img} alt={post.slug}/>

            <div className="input-field">
                <Typography variant="body2" component="p">Date Published</Typography>
                <TextField id="date" variant="outlined" value={post.pubdate}/>
            </div>

            <div className="input-field">
                <Typography variant="body2" component="p">Content</Typography>
                <TextField multiline minRows={20} id="content" variant="outlined" value={post.content}/>
            </div>

            <div className="edit-options-container">
                <Link to="/">
                    <Button variant="outlined">Cancel</Button>
                </Link>
                <Button variant="contained">{id ? 'Save' : 'Publish'}</Button>
            </div>
        </div>
    )
}
