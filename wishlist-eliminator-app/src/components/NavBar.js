import { Link, useLocation } from 'react-router-dom';

function NavBar(props) {
    const location = useLocation();

    const userOnboardingRender = () => {
        return (
            <>
                <li><Link to='/users/sign-up'>Sign up</Link></li>
                <li><Link to='/users/login'>Log in</Link></li>
            </>
        )
    }

    const userWishlistControlLinks = () => {
        return (
            <>
                <li><Link to='/wishlists/import'>Import Wishlist</Link></li>
                <li><Link to='/wishlists/create'>Create Wishlist</Link></li>
            </>
        )
    }
    
    const debuggingWishlistsLinksRender = () => {
        return (
            <>
                <li><Link to='/wishlists/edit/1'>Edit First Wishlist</Link></li>
                <li><Link to='/wishlists/view/1'>View First Wishlist</Link></li>
                <li><Link to='/wishlists/edit/2?ref=1'>Edit Second Wishlist & Referencing First Wishlist</Link></li>
                <li><Link to='/wishlists/edit/4'>Edit Fourth Wishlist</Link></li>
                <li><Link to='/wishlists/view/4'>View Fourth Wishlist</Link></li>
            </>
        )
    }
    
    return (
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                {!props.userData.username && userOnboardingRender()}
                {props.userData.username && userWishlistControlLinks()}
                {props.userData.username /* && location.pathname.match(/(\/)(?=wishlist)\w+/gi) */&& debuggingWishlistsLinksRender()}
                {props.userData.username && <li><Link to='/users/logout'>Log out</Link></li>}
            </ul>
            {console.log('hash', location.hash, '|', 'pathname', location.pathname, '|', 'search', location.search)}
        </nav>
    )
}

export default NavBar;
