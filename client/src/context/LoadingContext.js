import { createContext, useState } from 'react'

export const LoadingContext = createContext()

const UserDetailsProvider = (props) => {

    const [loading, setLoading] = useState()

    return (
        <LoadingContext.Provider value={[loading, setLoading]}>
            {props.children}
        </LoadingContext.Provider>
    )
}

export default UserDetailsProvider