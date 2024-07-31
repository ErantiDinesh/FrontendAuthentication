import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/SignupPage/Signup';
import DashboardPage from './components/DashboardPage/DashboardPage'
import Login from './components/LoginPage/Login'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path = "/dashboard" element={<DashboardPage />} />
                <Route path = "/login" element={ <Login /> } />
            </Routes>
        </Router>
    );
}

export default App;


