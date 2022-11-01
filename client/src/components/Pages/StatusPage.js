import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'


export default function StatusPage(props) {

    function handleClick() {
        props.setSubmitState(false)
    }

    return (
        <div>
            {!props.error && <h1 className="msg-success">Success!</h1>}
            {props.error && <h1 className="msg-error">Error</h1>}

            <p>{props.error}</p>

            <div className="btn-container">
                <Link to="/" >
                    <Button variant="outlined">Home</Button>
                </Link>
                <Button onClick={handleClick} variant="contained">{props.id ? 'Continue Editing' : 'Submit Another Post'}</Button>
            </div>
        </div>
    )
}
