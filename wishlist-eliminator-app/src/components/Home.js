import { Link } from 'react-router-dom';
import { useState } from 'react';

function Home(props) {
    const [ counter, setCounter ] = useState(0);
    const increaseCounter = () => {
        setCounter(counter + 1);
    };

    const loggedInView = () => {
        return (
            <>
                <h1>Welcome <i>{props.userData.username}</i> to my App</h1>
                <p>Counter: {counter}</p>
                <button onClick={increaseCounter}>Count</button>
            </>
        );
    }

    const loggedOutView = () => {
        return (
            <>
                <h1>Welcome to Wishlist Eliminator</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis soluta deleniti quae dignissimos recusandae, eligendi odit officia, aut esse, at quam maiores? Autem nulla officia perferendis temporibus, reprehenderit qui!</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus id odit voluptatem beatae repellat quos nihil iste aut quo. Fuga vitae culpa iusto ipsam molestiae recusandae? Adipisci dolor necessitatibus reprehenderit! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro facilis sit quos facere exercitationem ut quidem voluptate distinctio natus deserunt laborum alias, error voluptatibus delectus, repudiandae soluta reiciendis ad temporibus.</p>
                <div className="landing-page-user-links">
                    <Link to='/users/sign-up'><button>Sign up</button></Link>
                    <Link to='/users/login'><button>Log in</button></Link>
                </div>
            </>
        )
    };

    return (
        <div className='Home'>
            {props.userData.username && loggedInView()}
            {!props.userData.username && loggedOutView()}
        </div>
    )
}

export default Home;
