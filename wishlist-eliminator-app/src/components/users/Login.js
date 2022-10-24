import { useState } from 'react'

function Login() {
    const [ submitted, setSubmitted] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ loginForm, onLoginFormChange ] = useState({
        usernameOrEmail: '',
        username: '',
        email: '',
        password: ''
    });

    const handleUsernameOrEmailInputChange = event => {
        event.persist();
        let newEmailInput = ''
        let newUsernameInput = ''

        if (/@{1}/g.test(event.target.value)) {
            newEmailInput = event.target.value
        } else {
            newUsernameInput = event.target.value
        }

        onLoginFormChange((inputValue) => ({
            ...inputValue,
            usernameOrEmail: event.target.value,
            username: newUsernameInput,
            email: newEmailInput,
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

        if ((loginForm.username || loginForm.email) && loginForm.password) {
            setSubmitted(true);
            setValid(true);
        } else {
            setSubmitted(true);
        }
        console.log(e);
    };

    return (
        <div className='login-page'>
            <h2>Log in:</h2>

            <div className='login-form-div'>
                <form className='login-form' onSubmit={handleSubmit}>
                    {submitted && valid && <div className="success-message">Success! Logging in...</div>}

                    <label htmlFor='usernameOrEmail'>Username or Email: </label>
                    <input
                        id='usernameOrEmail'
                        className='form-field'
                        type='text'
                        name='usernameOrEmail'
                        value={loginForm.usernameOrEmail}
                        onChange={handleUsernameOrEmailInputChange}
                    />
                    {submitted && !(loginForm.username || loginForm.email) && <span id="username-error">Please enter a username or email</span>}

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
                    {submitted && !loginForm.password && <span id="password-error">Please enter a password</span>}

                    <br />

                    <button className="form-field" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;
