import {useState, useContext, createContext} from "react";

const CurrentUserContext = createContext({});

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [currentUserRole, setCurrentUserRole] = useState('default_role')

    const fetchCurrentUser = () => {
        const requestOption = {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
        fetch('http://127.0.0.1:8000/api/users-current/', requestOption)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('user', data[0]['user'])
                localStorage.setItem('role', data[0]['role'])
                localStorage.setItem('id', data[0]['id'])
                // setCurrentUser(data[0]['user'])
                // setCurrentUserRole(data[0]['role'])
            })
            .catch(error => console.log(error))

    }

    return (
        <CurrentUserContext.Provider value={{
            setCurrentUser,
            setCurrentUserRole,
            currentUser,
            currentUserRole,
            fetchCurrentUser
        }}>
            {children}
        </CurrentUserContext.Provider>
    )
}


export const useAuth = () => useContext(CurrentUserContext)