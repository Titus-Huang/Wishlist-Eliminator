import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/users/Login';
import Logout from './components/users/Logout';
import SignUp from './components/users/Sign_Up';
import Import from './components/wishlist/Import';
import WishlistModification from './components/wishlist/WishlistModification';

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const [ appData, updateAppData ] = useState({
        wishlists: {},
        steamWishlist: {},
        userWishlistData: {},
        userData: {}
    });

    // first run when the components first loads onto the screen
    const fetchUserDataOnStart = () => {
        // grab user data on load
        fetch('/api/sessions')
            .then(res => res.json())
            .then(data => {
                // console.log('data blep');
                // console.log(data);

                if (!data.error) {
                    console.log('user session found, local data being updated');
                    updateAppData((existingAppData) => ({
                        ...existingAppData,
                        userData: data,
                    }));
                } else {
                    // you are not logged in, kick back to home page
                    console.log('not logged in, back to landing page')
                    updateAppData((existingAppData) => ({
                        ...existingAppData,
                        userData: {},
                    }));
                    navigate('/');
                }
            });
        
        // grab wishlist data on load
        fetch('/api/wishlists')
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    console.log('user session found, local wishlist data... data being updated');
                    updateAppData((existingAppData) => ({
                        ...existingAppData,
                        userWishlistData: data,
                    }));
                } else {
                    updateAppData((existingAppData) => ({
                        ...existingAppData,
                        userWishlistData: {},
                    }));
                }
            })

        // grab user's wishlists
    }

    useEffect(fetchUserDataOnStart, []);

    const updateUserData = data => {
        updateAppData((existingAppData) => ({
            ...existingAppData,
            userData: data,
        }));
    };

    const updateWishlistData = data => {
        updateAppData((existingAppData) => ({
            ...existingAppData,
            wishlist: data,
        }));
    };

    const updateUserWishlistDataData = data => {
        updateAppData((existingAppData) => ({
            ...existingAppData,
            userWishlistData: data,
        }));
    };

    const updateSteamWishlistData = data => {
        updateAppData((existingAppData) => ({
            ...existingAppData,
            steamWishlist: data,
        }));

        navigate('/');
    };

    return (
        <div className='App'>
            {!(location.pathname === '/' && typeof appData.userData.username === 'undefined') && <NavBar userData={appData.userData} />}

            <Routes>
                <Route path='/' element={<Home userData={appData.userData} />} />
                <Route path='/users/sign-up' element={<SignUp />} />
                <Route path='/users/login' element={<Login updateUserData={updateUserData} updateUserWishlistDataData={updateUserWishlistDataData} />} />
                <Route path='/users/logout' element={<Logout />} />
                <Route path='/wishlists/import' element={<Import userData={appData.userData} updateSteamWishlistData={updateSteamWishlistData} />} />
                <Route path='/wishlists/create' element={<WishlistModification type={'create'} />} />
                <Route path='/wishlists/edit' element={<WishlistModification type={'edit'} />} />
            </Routes>
        </div>
    );
}

export default App;
