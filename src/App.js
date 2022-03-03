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
            </Routes>
        </Router>


    )

}

