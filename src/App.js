import './App.css';
import {DialogProvider} from "muibox";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import DashboardContent from "./Components/JS/Dashboard";
import SignUp from "./Components/JS/SignUp";
import SignIn from "./Components/JS/SignIn";
import {CurrentUserProvider} from "./Components/JS/CurrentUserContext";

export default function App() {

    return (
        <CurrentUserProvider>
            <DialogProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<App/>}/>
                        <Route path="signup" element={<SignUp/>}/>
                        <Route path="signin" element={<SignIn/>}/>
                        <Route path="roles" element={<DashboardContent role={true}/>}/>
                        <Route path="projects" element={<DashboardContent project={true}/>}/>
                        <Route path="projects/:projectId" element={<DashboardContent projectDetail={true}/>}/>
                        <Route path="tickets/:ticketId" element={<DashboardContent ticketDetail={true}/>}/>


                    </Routes>
                </Router>
            </DialogProvider>
        </CurrentUserProvider>
    )

}

