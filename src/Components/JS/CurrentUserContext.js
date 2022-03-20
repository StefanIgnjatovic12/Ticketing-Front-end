import {useState, useContext, createContext} from "react";

export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const requestOption = {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }
    const fetchCurrentUser = () => {
        fetch('http://127.0.0.1:8000/api/users-current/', requestOption)
            .then(response => response.json())
            .then(data => {

                setCurrentUser(data)
            })
            .catch(error => console.log(error))
    }

    return (
        <CurrentUserContext.Provider value={{currentUser, fetchCurrentUser}}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export const useCurrentUser = () => useContext(CurrentUserContext)



