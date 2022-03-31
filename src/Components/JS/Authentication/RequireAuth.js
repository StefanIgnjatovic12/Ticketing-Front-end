import { useLocation, Navigate, Outlet } from "react-router";
import { useAuth } from "../UserManagement/CurrentUserContext"

const RequireAuth = ({allowedRole}) => {

    // const { currentUser, currentUserRole } = useAuth()
    const currentUser = localStorage.getItem('user')
    const currentUserRole = localStorage.getItem('role')
    // const { currentUser, currentUserRole } = useAuth();
    const location = useLocation()
    // console.log(currentUserRole)
    return (

        // if allowedRole for that route is current role, ok
        // if not but is logged in user, redirect to unauthorized page
        // if not logged in,

        allowedRole.includes(currentUserRole)
        ? <Outlet />
        : currentUser
            ?<Navigate
                to="unauthorized"
                state={{ from: location }}
                replace
            />
            :<Navigate
                to="/"
                state={{ from: location }}
                replace
            />
    )
}

export default RequireAuth;


