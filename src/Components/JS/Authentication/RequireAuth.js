import { useLocation, Navigate, Outlet } from "react-router";

const RequireAuth = ({allowedRole}) => {

    const currentUser = localStorage.getItem('user')
    const currentUserRole = localStorage.getItem('role')
    const location = useLocation()
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


