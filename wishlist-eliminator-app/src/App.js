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
        steamWishlist: {}, // remove this down the line, as the data already exists within userWishlistData
        userWishlists: {},
        userWishlistData: {},
        userData: {}
    });

    let { hasSessionsBeenFetched, hasWishlistsBeenFetched, isInitalized } = false;
    // first run when the components first loads onto the screen
    const fetchUserDataOnStart = () => {
        if (!hasSessionsBeenFetched) {
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
            hasSessionsBeenFetched = true;
        }
        
        if (!hasWishlistsBeenFetched) {
            fetch('/api/wishlists')
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        console.log('user session found, local wishlist data... data being updated');
                        // console.table(data.userListData);
                        // console.log('returndata', data);
                        updateAppData((existingAppData) => ({
                            ...existingAppData,
                            userWishlistData: data.userListData,
                            userWishlists: data.userWishlists
                        }));
                    } else {
                        updateAppData((existingAppData) => ({
                            ...existingAppData,
                            userWishlistData: {},
                            userWishlists: {}
                        }));
                    }
                });
            hasWishlistsBeenFetched = true;
        }

        if (hasWishlistsBeenFetched && hasSessionsBeenFetched && !isInitalized) {
            isInitalized = true;
        }
    }

    useEffect(fetchUserDataOnStart, [isInitalized]);

    const updateUserData = data => {
        updateAppData((existingAppData) => ({
            ...existingAppData,
            userData: data,
        }));
    };

    const updateUserWishlistsData = data => {
        // console.log('wishlists being updated', data);
        updateAppData((existingAppData) => ({
            ...existingAppData,
            userWishlists: data,
        }));
    };

    const updateUserWishlistDataData = data => {
        // console.log('wishlistData being updated', data);
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
                <Route path='/users/login' element={<Login updateUserData={updateUserData} updateUserWishlistDataData={updateUserWishlistDataData} updateUserWishlistsData={updateUserWishlistsData} />} />
                <Route path='/users/logout' element={<Logout />} />
                <Route path='/wishlists/import' element={<Import userData={appData.userData} updateSteamWishlistData={updateSteamWishlistData} />} />
                <Route path='/wishlists/create' element={<WishlistModification type={'create'} appData={appData} updateAppData={updateAppData} />} />
                <Route path='/wishlists/edit/:wishlistId' element={<WishlistModification type={'edit'} appData={appData} updateAppData={updateAppData} />} />
                <Route path='/wishlists/view/:wishlistId' element={<WishlistModification type={'view'} appData={appData} updateAppData={updateAppData} />} />
            </Routes>
        </div>
    );
}

export default App;
