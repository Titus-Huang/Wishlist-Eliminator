import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sign_Up.scss';

function SignUp() {
    const navigate = useNavigate();

    const [ submitted, setSubmitted] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ signupForm, onSignupFormChange ] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleUsernameInputChange = event => {
        event.persist();

        onSignupFormChange((inputValue) => ({
            ...inputValue,
            username: event.target.value,
        }));
    };

    const handleEmailInputChange = event => {
        event.persist();

        onSignupFormChange((inputValue) => ({
            ...inputValue,
            email: event.target.value,
        }));
    };

    const handlePasswordInputChange = event => {
        event.persist();

        onSignupFormChange((inputValue) => ({
            ...inputValue,
            password: event.target.value,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        if (signupForm.username && signupForm.email && signupForm.password) {
            setSubmitted(true);
            setValid(true);

            fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupForm)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        renderError(res.error);
                    } else {
                        // console.log(res);
                        console.log("Signed up!");
                        navigate('/users/login');
                    }
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
        <div className='sign-up-page default-content-box row'>
            <div className='sign-up-form-title col-xl-3 col-lg-3 col-12 row'>
                <div className="col-lg-12 col-10">
                    <h2>Sign Up:</h2>
                </div>
                <div className="col-lg-12 col-2 btn-align">
                    <button type="button" className="btn btn-lg btn-secondary" onClick={() => navigate('/')}>Back</button>
                </div>
            </div>

            <div className='sign-up-form-div col-xl-9 col-lg-9 col-12 g-4'>
                <form className='sign-up-form row' onSubmit={handleSubmit}>
                    {submitted && valid && !error && <div className="success-message">Success! Thank you for registering</div>}
                    {submitted && valid && error && <div className="failure-response">Error! {errorMsg}</div>}

                    <div className='row mb-3'>
                        <label htmlFor='username' className="col-sm-3 col-form-label col-form-label-lg">Username: </label>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            <input
                                type="text"
                                className="form-control form-control-lg form-field"
                                id='username'
                                name='username'
                                value={signupForm.username}
                                onChange={handleUsernameInputChange}
                            />
                        </div>
                    </div>
                    
                    {submitted && !signupForm.username && <span id="username-error">Please enter a username</span>}

                    <br />

                    <div className='row mb-3'>
                        <label htmlFor='email' className="col-sm-3 col-form-label col-form-label-lg">Email: </label>
                        <div className="input-group">
                            <input
                                id='email'
                                className='form-control form-control-lg form-field'
                                type='text'
                                name='email'
                                value={signupForm.email}
                                onChange={handleEmailInputChange}
                            />
                        </div>
                    </div>
                    <br />
                    {submitted && !signupForm.email && <span id="email-error">Please enter an email addreess</span>}

                    <br />
                    <br />

                    <div className='row mb-3'>
                        <label htmlFor='password' className="col-sm-3 col-form-label col-form-label-lg">Password: </label>
                        <div className="input-group">
                            <input
                                id='password'
                                className='form-control form-control-lg form-field'
                                type='password'
                                name='password'
                                value={signupForm.password}
                                onChange={handlePasswordInputChange}
                            />
                        </div>
                    </div>
                    <br />
                    {submitted && !signupForm.password && <span id="password-error">Please enter a password</span>}

                    <br />
                    <br />

                    <div className="col-auto">
                        <button type="submit" className="form-field btn btn-lg btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>        
    );
}

export default SignUp;
