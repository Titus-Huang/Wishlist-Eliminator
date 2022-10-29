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
            <div className='Home col-12'>
                <div className='home-page default-content-box row'>
                    <div className="col-lg-6 col-12">
                        <h1>Welcome to Wishlist Eliminator</h1>
                    </div>
                    <div className="col-lg-6 col-12">
                        <p>Hi <i>{props.userData.username}</i>, hope you're enjoying your time on this site {'<3'}</p>
                    </div>
                    
                    <div className="col-12 text-center footer">
                        <p>Made with &hearts; in Adelaide</p>
                        <p>Created by <a href="https://github.com/Titus-Huang">Titus Huang</a></p>
                        <p>&copy; 2022, General Assembly SEiR 61, MIT Licence</p>
                    </div>
                    {/* <p>Counter: {counter}</p>
                    <button onClick={increaseCounter}>Count</button> */}
                </div>
            </div>
        );
    }
    
    const loggedOutView = () => {
        // Note to future self
        // make sure ALL ELEMENTS TILL home-buffer needs to BE 100% height
        return (
            <div className='Home col-12 home-buffer'>
                <div className='landing-page default-content-box row'>
                    <div className="landing-page-intro col-lg-8 col-sm-12">
                        <h1>Welcome to Wishlist Eliminator</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis perspiciatis soluta deleniti quae dignissimos recusandae, eligendi odit officia, aut esse, at quam maiores? Autem nulla officia perferendis temporibus, reprehenderit qui!</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus id odit voluptatem beatae repellat quos nihil iste aut quo. Fuga vitae culpa iusto ipsam molestiae recusandae? Adipisci dolor necessitatibus reprehenderit! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro facilis sit quos facere exercitationem ut quidem voluptate distinctio natus deserunt laborum alias, error voluptatibus delectus, repudiandae soluta reiciendis ad temporibus.</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center landing-page-user-links col-lg-4 col-sm-12">
                        <div className="btn-group btn-group-lg" role="user-onboarding" aria-label="Sign up and Log in buttons">
                            <button className='btn btn-primary' onClick={() => navigate('/users/sign-up')}>Sign up</button>
                            <button className='btn btn-primary' onClick={() => navigate('/users/login')}>Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <>
            {props.userData.username && loggedInView()}
            {!props.userData.username && loggedOutView()}
        </>
    )
}

export default Home;
