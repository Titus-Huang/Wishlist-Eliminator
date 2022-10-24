import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/users/sign-up'>Sign up</Link></li>
                <li><Link to='/users/login'>Log in</Link></li>
                <li><Link to='/users/logout'>Log out</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;
