import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Home.scss';
// import Button from 'react-bootstrap/Button';

function Home(props) {
    const [ counter, setCounter ] = useState(0);
    const increaseCounter = () => {
        setCounter(counter + 1);
    };

    const navigate = useNavigate();

    const loggedInView = () => {
        return (
            <div className='home-page'>
                <h1>Welcome <i>{props.userData.username}</i> to my App</h1>
                {/* <p>Counter: {counter}</p>
                <button onClick={increaseCounter}>Count</button> */}
            </div>
        );
    }

    const btnLink = (link) => {
        navigate(link);
    }

    const loggedOutView = () => {
        return (
            <div className='landing-page default-content-box row'>
                <div className="landing-page-intro col-lg-8 col-sm-12">
                    <h1>Welcome to Wishlist Eliminator</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis soluta deleniti quae dignissimos recusandae, eligendi odit officia, aut esse, at quam maiores? Autem nulla officia perferendis temporibus, reprehenderit qui!</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus id odit voluptatem beatae repellat quos nihil iste aut quo. Fuga vitae culpa iusto ipsam molestiae recusandae? Adipisci dolor necessitatibus reprehenderit! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro facilis sit quos facere exercitationem ut quidem voluptate distinctio natus deserunt laborum alias, error voluptatibus delectus, repudiandae soluta reiciendis ad temporibus.</p>
                </div>
                <div className="landing-page-user-links col-lg-4 col-sm12">
                    <div className="btn-group btn-group-lg" role="user-onboarding" aria-label="Sign up and Log in buttons">
                        <button className='btn btn-primary' onClick={() => btnLink('/users/sign-up')}>Sign up</button>
                        <button className='btn btn-primary' onClick={() => btnLink('/users/login')}>Log in</button>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className='Home col-12'>
            {props.userData.username && loggedInView()}
            {!props.userData.username && loggedOutView()}
        </div>
    )
}

export default Home;
