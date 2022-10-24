import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
    const navigate = useNavigate();

    const [ submitted, setSubmitted] = useState(false);
    const [ valid, setValid ] = useState(false);
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
            const data = Object.fromEntries(new FormData(e.target));

            fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(userData => {
                    console.log(userData)
                    props.updateUserData(userData)
                    navigate('/')
                });
        } else {
            setSubmitted(true);
        }
        // console.log(e);
    };

    return (
        <div className='sign-up-page'>
            <h2>Sign Up:</h2>

            <div className='sign-up-form-div'>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    {submitted && valid && <div className="success-message">Success! Thank you for registering</div>}

                    <label htmlFor='username'>Username: </label>
                    <input
                        id='username'
                        className='form-field'
                        type='text'
                        name='username'
                        value={signupForm.username}
                        onChange={handleUsernameInputChange}
                    />
                    {submitted && !signupForm.username && <span id="username-error">Please enter a username</span>}

                    <br />

                    <label htmlFor='email'>Email: </label>
                    <input
                        id='email'
                        className='form-field'
                        type='text'
                        name='email'
                        value={signupForm.email}
                        onChange={handleEmailInputChange}
                    />
                    {submitted && !signupForm.email && <span id="email-error">Please enter an email addreess</span>}

                    <br />

                    <label htmlFor='password'>Password: </label>
                    <input
                        id='password'
                        className='form-field'
                        type='password'
                        name='password'
                        value={signupForm.password}
                        onChange={handlePasswordInputChange}
                    />
                    {submitted && !signupForm.password && <span id="password-error">Please enter a password</span>}

                    <br />

                    <button className="form-field" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>        
    );
}

export default SignUp;
