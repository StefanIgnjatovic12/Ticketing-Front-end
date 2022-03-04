import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import DashboardContent from "./Components/JS/Dashboard";
import ProjectList from "./Components/JS/ProjectList";


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="roles" element={<DashboardContent role={true}/>}/>
                <Route path="projects" element={<DashboardContent project={true}/>}/>
                <Route path="projects/1" element={<DashboardContent first={true}/>}/>
            </Routes>
        </Router>


    )

}

