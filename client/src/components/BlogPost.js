import React from 'react'
import { Link } from 'react-router-dom'
import { Paper, Typography, Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function BlogPost(props) {

  return (
    <Paper className="blogpost">
        <div className="details-container">
            <Typography variant="h5" component="h2">{props.title}</Typography>
            <Typography variant="body1" component="p">{props.description}</Typography>
        </div>

        <div className="btn-container">
            <Link to={`/edit-post/${props.slug}`}>
                <IconButton aria-label="edit">
                    <EditIcon />
                </IconButton>
            </Link>
            <Button aria-label="delete" variant="contained" color="error">
                <DeleteIcon />
            </Button>
        </div>
    </Paper>
  )
}
