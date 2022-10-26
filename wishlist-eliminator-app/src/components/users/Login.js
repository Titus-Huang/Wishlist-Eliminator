import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                                props.updateUserWishlistDataData(loginData.userListdata);
                                props.updateUserWishlistsData(loginData.userWishlists);
                                props.updateUserData(userData);
                                console.log('Logged in...');

                                // auto move
                                navigate('/wishlists/create');
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
        <div className='login-page'>
            <h2>Log in:</h2>

            <div className='login-form-div'>
                <form className='login-form' onSubmit={handleSubmit}>
                    {submitted && valid && !error && <div className='success-message'>Success! Logging in...</div>}
                    {submitted && valid && error && <div className='failure-response'>Error! {errorMsg}</div>}

                    <label htmlFor='usernameOrEmail'>Username or Email: </label>
                    <input
                        id='usernameOrEmail'
                        className='form-field'
                        type='text'
                        name='usernameOrEmail'
                        value={loginForm.usernameOrEmail}
                        onChange={handleUsernameOrEmailInputChange}
                    />
                    {submitted && !loginForm.usernameOrEmail && <span id='username-error'>Please enter a username or email</span>}

                    <br />

                    <label htmlFor='password'>Password: </label>
                    <input
                        id='password'
                        className='form-field'
                        type='password'
                        name='password'
                        value={loginForm.password}
                        onChange={handlePasswordInputChange}
                    />
                    {submitted && !loginForm.password && <span id='password-error'>Please enter a password</span>}

                    <br />

                    <button className='form-field' type='submit'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;
