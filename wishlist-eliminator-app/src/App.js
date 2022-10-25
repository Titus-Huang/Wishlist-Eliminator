import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import SignUp from './components/users/Sign_Up';
import Import from './components/wishlist/Import';

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const [ appData, updateAppData ] = useState({
        wishlist: {},
        userData: {}
    });

    // first run when the components first loads onto the screen
    const fetchUserDataOnStart = () => {
        fetch('/api/sessions')
            .then(res => res.json())
            .then(data => {
                // console.log('data blep');
                // console.log(data);

                if (!data.error) {
                    console.log('data being updated');
                    updateAppData((existingAppData) => ({
                        ...existingAppData,
                        userData: data,
                    }));
                } else {
                    // you are not logged in, kick back to home page
                    console.log('not logged in, back to landing page')
                    navigate('/');
                }
            });
    }

    useEffect(fetchUserDataOnStart, []);

    const updateUserData = data => {
        updateAppData((existingAppData) => ({
            ...existingAppData,
            userData: data,
        }));
    };

    return (
        <div className='App'>
            {!(location.pathname === '/' && typeof appData.userData.username === 'undefined') && <NavBar userData={appData.userData} />}

            <Routes>
                <Route path='/' element={<Home userData={appData.userData} />} />
                <Route path='/users/sign-up' element={<SignUp />} />
                <Route path='/users/login' element={<Login updateUserData={updateUserData} />} />
                <Route path='/users/logout' element={<Logout />} />
                <Route path='/wishlists/import' element={<Import userData={appData.userData} />} />
            </Routes>
        </div>
    );
}

export default App;
