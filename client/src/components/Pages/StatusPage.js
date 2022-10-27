import React from 'react'
import { Link, useParams } from 'react-router-dom'

import { Button } from '@mui/material'

export default function StatusPage() {

    const { status } = useParams()
    const { id } = useParams()

    return (
        <div>
            {status === 'success' && <h1 className="msg-success">Success!</h1>}
            {status === 'error' && <h1 className="msg-error">Error</h1>}

            <div className="btn-container">
                <Link to="/">
                    <Button variant="outlined">Home</Button>
                </Link>
                <Link to="/">
                    <Button variant="contained">Submit Another Post</Button>
                </Link>
            </div>
        </div>
    )
}
