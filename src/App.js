import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import DashboardContent from "./Components/JS/Dashboard";



export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="roles" element={<DashboardContent role={true}/>}/>
                <Route path="projects" element={<DashboardContent project={true}/>}/>
                <Route path="projects/:projectId" element={<DashboardContent projectDetail={true}/>}/>
                <Route path="tickets/:ticketId" element={<DashboardContent ticketDetail={true}/>}/>

            </Routes>
        </Router>


    )

}

