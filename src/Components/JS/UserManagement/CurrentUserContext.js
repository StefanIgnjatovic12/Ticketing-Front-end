import {useState, useContext, createContext} from "react";

const CurrentUserContext = createContext({});

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [currentUserRole, setCurrentUserRole] = useState(null)

    const fetchCurrentUser = () => {
        const requestOption = {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        }
        return fetch('https://drf-react-chat-backend.herokuapp.com/api/users-current/', requestOption)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('user', data[0]['user'])
                localStorage.setItem('role', data[0]['role'])
                localStorage.setItem('id', data[0]['id'])
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