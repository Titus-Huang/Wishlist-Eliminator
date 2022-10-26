import { Link, useLocation } from 'react-router-dom';

function NavBar(props) {
    const location = useLocation();
    
    return (
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                {!props.userData.username && <li><Link to='/users/sign-up'>Sign up</Link></li>}
                {!props.userData.username && <li><Link to='/users/login'>Log in</Link></li>}
                {props.userData.username && <li><Link to='/wishlists/import'>Import Wishlist</Link></li>}
                {props.userData.username && <li><Link to='/wishlists/create'>Create Wishlist</Link></li>}
                {props.userData.username && location.pathname.match(/(\/)(?=wishlist)\w+/gi) && <li><Link to='/wishlists/edit/1'>Edit First Wishlist</Link></li>}
                {props.userData.username && location.pathname.match(/(\/)(?=wishlist)\w+/gi) && <li><Link to='/wishlists/view/1'>View First Wishlist</Link></li>}
                {props.userData.username && location.pathname.match(/(\/)(?=wishlist)\w+/gi) && <li><Link to='/wishlists/edit/1'>Edit Third Wishlist</Link></li>}
                {props.userData.username && location.pathname.match(/(\/)(?=wishlist)\w+/gi) && <li><Link to='/wishlists/view/1'>View Third Wishlist</Link></li>}
                {props.userData.username && <li><Link to='/users/logout'>Log out</Link></li>}
            </ul>
            {console.log('hash', location.hash, '|', 'pathname', location.pathname, '|', 'search', location.search)}
        </nav>
    )
}

export default NavBar;
