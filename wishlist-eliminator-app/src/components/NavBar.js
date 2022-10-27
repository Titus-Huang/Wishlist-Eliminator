import { Link, useLocation, useNavigate } from 'react-router-dom';

function NavBar(props) {
    const location = useLocation();
    const navigate = useNavigate;

    const userOnboardingRender = () => {
        return (
            <>
                <li className='nav-item'><a className='nav-link' onClick={navigate('/users/sign-up')}>Sign up</a></li>
                <li className='nav-item'><a className='nav-link' onClick={navigate('/users/login')}>Log in</a></li>
            </>
        )
    }

    const userWishlistControlLinks = () => {
        return (
            <>
                <li className='nav-item'><a className='nav-link' onClick={navigate('/wishlists/import')}>Import Wishlist</a></li>
                <li className='nav-item'><a className='nav-link' onClick={navigate('/wishlists/create')}>Create Wishlist</a></li>
            </>
        )
    }
    
    const debuggingWishlistsLinksRender = () => {
        return (
            <>
                {/* <li className='nav-item'><a className='nav-link' onClick={navigate('/wishlists/edit/1'>Edit First Wishlist</a>></li>
                <li className='nav-item'><a className='nav-link' onClick={navigate('/wishlists/view/1'>View First Wishlist</a>></li> */}
                <li className='nav-item'><a className='nav-link' onClick={navigate('/wishlists/')}>View all your (and "public") Wishlists</a></li>
                <li className='nav-item'><a className='nav-link' onClick={navigate('/wishlists/edit/2?ref=1')}>Edit Second Wishlist & Referencing First Wishlist</a></li>
                {/* <li className='nav-item'><a className='nav-link' onClick={navigate('/wishlists/edit/4'>Edit Fourth Wishlist</a>></li>
                <li className='nav-item'><a className='nav-link' onClick={navigate('/wishlists/view/4'>View Fourth Wishlist</a>></li> */}
            </>
        )
    }
    
    return (
        <>
            <nav className="navbar navbar-expand-xxl navbar-dark bg-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" onClick={navigate('/')}>Wishlist Eliminator</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'><a className="nav-link" onClick={navigate('/')}>Home</a></li>
                            {!props.userData.username && userOnboardingRender()}
                            {props.userData.username && userWishlistControlLinks()}
                            {props.userData.username /* && location.pathname.match(/(\/)(?=wishlist)\w+/gi) */&& debuggingWishlistsLinksRender()}
                            {props.userData.username && <li className='nav-item'><a className='nav-link' onClick={navigate('/users/logout')}>Log out</a></li>}
                        </ul>
                    </div>
                </div>
                {console.log('hash', location.hash, '|', 'pathname', location.pathname, '|', 'search', location.search)}
            </nav>
        </>
    )
}

export default NavBar;
