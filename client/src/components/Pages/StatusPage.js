import React from 'react'

import { Button } from '@mui/material'

export default function StatusPage(props) {


    return (
        <div>
            {!props.error && <h1 className="msg-success">Success!</h1>}
            {props.error && <h1 className="msg-error">Error</h1>}

            <p>{props.error}</p>

            <div className="btn-container">
                <Button variant="outlined">Home</Button>
                <Button variant="contained">{props.id ? 'Continue Editing' : 'Submit Another Post'}</Button>
            </div>
        </div>
    )
}
