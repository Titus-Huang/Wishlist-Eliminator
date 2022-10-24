import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/users/sign-up'>Sign up</Link>
            <Link to='/users/login'>Log in</Link>
            <Link to='/users/logout'>Log out</Link>
        </nav>
    )
}

export default NavBar;
