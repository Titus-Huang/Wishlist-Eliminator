import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnBoarding.scss';

function Login(props) {
    const navigate = useNavigate();

    const [ submitted, setSubmitted] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ loginForm, onLoginFormChange ] = useState({
        usernameOrEmail: '',
        password: ''
    });

    const handleUsernameOrEmailInputChange = event => {
        event.persist();

        onLoginFormChange((inputValue) => ({
            ...inputValue,
            usernameOrEmail: event.target.value,
        }));
    };

    const handlePasswordInputChange = event => {
        event.persist();

        onLoginFormChange((inputValue) => ({
            ...inputValue,
            password: event.target.value,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (loginForm.usernameOrEmail && loginForm.password) {
            setSubmitted(true);
            setValid(true);

            fetch('/api/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginForm)
            })
                .then(res => res.json())
                .then(userData => {
                    if (userData.error) {
                        renderError(userData.error);
                    } else {
                        fetch('/api/wishlists')
                            .then(res => res.json())
                            .then(loginData => {
                                // console.log('loginData:', loginData);
                                props.updateUserWishlistDataData(loginData.userListData);
                                props.updateUserWishlistsData(loginData.userWishlists);
                                props.updateUserData(userData);
                                console.log('Logged in...');

                                // auto move
                                navigate('/wishlists/edit/2?ref=1');
                            })
                    } // call back hellllllll
                });
        } else {
            setSubmitted(true);
        }
        // console.log(e);
    };

    const renderError = errMsg => {
        setError(true);
        setErrorMsg(errMsg);
    }

    return (
        <div className='login-page default-content-box row'>
            <div className='log-in-form-title col-xl-3 col-lg-3 col-12 row'>
                <div className="col-lg-12 col-6">
                    <h2>Log in:</h2>
                </div>
                <div className="col-lg-12 col-6 btn-align btn-group">
                    <button type="button" className="btn btn-lg btn-secondary" onClick={() => navigate('/users/sign-up')}>Sign Up</button>
                    <button type="button" className="btn btn-lg btn-secondary" onClick={() => navigate('/')}>Home</button>
                </div>
            </div>

            <div className='log-in-form-div col-xl-9 col-lg-9 col-12 g-4'>
                <form className='log-in-form row' onSubmit={handleSubmit}>
                    {submitted && valid && !error && <div className="success-message">Success! Thank you for registering</div>}
                    {submitted && valid && error && <div className="failure-response">Error! {errorMsg}</div>}

                    <div className='row mb-3'>
                        <label htmlFor='usernameOrEmail' className="col-sm-6 col-form-label col-form-label-lg">Username or Email: </label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control form-control-lg form-field"
                                id='usernameOrEmail'
                                name='usernameOrEmail'
                                autoComplete='username email'
                                value={loginForm.usernameOrEmail}
                                onChange={handleUsernameOrEmailInputChange}
                            />
                        </div>
                    </div>
                    <br />
                    {submitted && !loginForm.usernameOrEmail && <span className="failure-response" id='username-error'>Please enter a username or email</span>}

                    <br />

                    <div className='row mb-3'>
                        <label htmlFor='password' className="col-sm-3 col-form-label col-form-label-lg">Password: </label>
                        <div className="input-group">
                            <input
                                id='password'
                                className='form-control form-control-lg form-field'
                                type='password'
                                name='password'
                                autoComplete='current-password'
                                value={loginForm.password}
                                onChange={handlePasswordInputChange}
                            />
                        </div>
                    </div>
                    <br />
                    {submitted && !loginForm.password && <span className="failure-response" id="password-error">Please enter a password</span>}

                    <br />
                    <br />

                    <div className="col-auto">
                        <button type="submit" className="form-field btn btn-lg btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
