import './App.css';
import {DialogProvider} from "muibox";
import {
    BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import DashboardContent from "./Components/JS/Dashboard";
import SignUp from "./Components/JS/Authentication/SignUp";
import SignIn from "./Components/JS/Authentication/SignIn";
import DemoSignIn from "./Components/JS/Authentication/DemoSignIn";
import SignOut from "./Components/JS/Authentication/SignOut";
import {CurrentUserProvider} from "./Components/JS/UserManagement/CurrentUserContext";
import RequireAuth from "./Components/JS/Authentication/RequireAuth";
import Unauthorized from "./Components/JS/Authentication/Unauthorized";

export default function App() {
    return (
        <CurrentUserProvider>
            <DialogProvider>
                <Router>
                    <Routes>
                        <Route element={<RequireAuth allowedRole={'Admin'}/>}>
                            <Route path="manage" element={<DashboardContent role={true}/>}/>
                            <Route path="projects" element={<DashboardContent project={true}/>}/>
                            <Route path="alltickets" element={<DashboardContent allTickets={true}/>}/>
                        </Route>

                        <Route path="/" element={<SignIn/>}/>
                        <Route path="signin" element={<SignIn/>}/>
                        <Route path="signup" element={<SignUp/>}/>
                        <Route path="signout" element={<SignOut/>}/>

                        <Route path="maindash" element={<DashboardContent mainDash={true}/>}/>
                        <Route path="tickets/:ticketId" element={<DashboardContent ticketDetail={true}/>}/>
                        <Route path="projects/:projectId" element={<DashboardContent projectDetail={true}/>}/>
                        <Route path="unauthorized" element={<DashboardContent unauthorized={true}/>}/>


                    </Routes>
                </Router>
            </DialogProvider>
        </CurrentUserProvider>
    )
}

