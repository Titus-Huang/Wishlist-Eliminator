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
                {/* <li><Link to='/wishlists/edit/1'>Edit First Wishlist</Link></li>
                <li><Link to='/wishlists/view/1'>View First Wishlist</Link></li> */}
                <li><Link to='/wishlists/'>View all your (and "public") Wishlists</Link></li>
                <li><Link to='/wishlists/edit/2?ref=1'>Edit Second Wishlist & Referencing First Wishlist</Link></li>
                {/* <li><Link to='/wishlists/edit/4'>Edit Fourth Wishlist</Link></li>
                <li><Link to='/wishlists/view/4'>View Fourth Wishlist</Link></li> */}
            </>
        )
    }
    
    return (
        <>
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-dark p-4">
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        {!props.userData.username && userOnboardingRender()}
                        {props.userData.username && userWishlistControlLinks()}
                        {props.userData.username /* && location.pathname.match(/(\/)(?=wishlist)\w+/gi) */&& debuggingWishlistsLinksRender()}
                        {props.userData.username && <li><Link to='/users/logout'>Log out</Link></li>}
                    </ul>
                </div>
            </div>
            <nav className="navbar navbar-dark bg-dark bg-primary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                {console.log('hash', location.hash, '|', 'pathname', location.pathname, '|', 'search', location.search)}
            </nav>
        </>
    )
}

export default NavBar;
