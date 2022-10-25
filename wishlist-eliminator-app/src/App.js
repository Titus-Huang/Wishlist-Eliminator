import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import SignUp from './components/users/Sign_Up';
import Import from './components/wishlist/Import';

function App() {
    const location = useLocation();

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
            {/* {console.log(location.pathname === '/')}
            {console.log(typeof appData.userData.username === 'undefined')}
            {console.log(location.pathname === '/' || typeof appData.userData.username === 'undefined')} */}
            {!(location.pathname === '/' && typeof appData.userData.username === 'undefined') && <NavBar userData={appData.userData} />}

            <Routes>
                <Route path='/' element={<Home userData={appData.userData} />} />
                <Route path='/users/sign-up' element={<SignUp />} />
                <Route path='/users/login' element={<Login updateUserData={updateUserData} />} />
                <Route path='/users/logout' element={<Logout />} />
                <Route path='/wishlists/import' element={<Import />} />
            </Routes>
        </div>
    );
}

export default App;
