import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { FormControl, InputLabel, Input, Typography } from '@mui/material'

export default function EditPost() {

    const { id } = useParams()

    return (
        <div className="editpostpage">
            <FormControl>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input id="title" />
            </FormControl>

            <Typography variant="h3" component="h2">Generated Slug: {} </Typography>

            <FormControl>
                <InputLabel htmlFor="img">Image URL</InputLabel>
                <Input id="img" />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="date">Date Published</InputLabel>
                <Input id="date" />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="content">Content</InputLabel>
                <Input id="content" />
            </FormControl>
        </div>
    )
}
