import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import SignUp from './components/users/SignUp';

import './App.css';

function App() {
    const [ appData, updateAppData ] = useState({
        wishlist: {},
        userData: {}
    })

    const updateUserData = data => {
        updateAppData((existingAppData) => ({
            ...existingAppData,
            userData: data,
        }));
    };

    return (
        <div className='App'>
            <NavBar />

            <Routes>
                <Route path='/' element={<Home name='Titus' />} />
                <Route path='/users/sign-up' element={<SignUp updateUserData={updateUserData} />} />
                <Route path='/users/login' element={<Login />} />
                <Route path='/users/logout' element={<Logout />} />
            </Routes>
        </div>
    );
}

export default App;
