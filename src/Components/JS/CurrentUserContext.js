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
                localStorage.setItem('user', data['user'])
                localStorage.setItem('role', data['role'])
                // setCurrentUser(data['user'])
                // setCurrentUserRole(data['role'])
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