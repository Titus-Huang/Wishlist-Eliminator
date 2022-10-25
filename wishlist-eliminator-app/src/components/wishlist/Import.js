import { useState } from 'react';
import './Import.scss'

function Import(props) {
    const [ submitted, setSubmitted] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ steamId, setSteamId ] = useState('');

    const handleSteamIdInputChange = event => {
        event.persist();

        setSteamId(event.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log('import form submitted');

        if (steamId) {
            setSubmitted(true);
            setValid(true);

            console.log('import form is valid');
            let userId = props.userData.id
            console.log('userData:', props.userData)
            const formData = { userId, steamId }
            console.log('formData:', formData)

            // fetch('/api/wishlists', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
            //     .then(res => res.json())
        } else {
            setSubmitted(true);
        }
    };

    const renderError = errMsg => {
        setError(true);
        setErrorMsg(errMsg);
    };

    return (
        <div className='wishlist-import-page'>
            <h2>Wishlist import</h2>

            <p>Find your Steam Id here: <a href='https://steamdb.info/calculator/' alt='Steam Calculator' title='Steam Calculator' target='_blank'>Steam Calculator</a></p>

            <p>Find what is your Steam Profile URL and paste the link into the website.</p> 
            
            <img src="https://files.treblesketch.com/2022/10/4aad8a5d79ff52b3_2022-10-25.png" alt="Show where to put in your Steam profile link" />
            
            <p>Click on the button highlighted in the image below to copy your Steam Id.</p>

            <img src="https://files.treblesketch.com/2022/10/f4664f5935a95ea4_2022-10-25.png" alt="Shows which Steam Id to input below" />

            <div className='import-form-div'>
                <form className='import-form' onSubmit={handleSubmit}>
                    {submitted && valid && !error && <div className='success-message'>Success! Importing wishlist...</div>}
                    {submitted && valid && error && <div className='failure-response'>Error! {errorMsg}</div>}

                    <label htmlFor='steam-id'>Steam Id: </label>
                    <input 
                        id='steam-id'
                        className='form-field'
                        type='number'
                        name='steam-id'
                        value={steamId}
                        onChange={handleSteamIdInputChange}
                    />
                    {submitted && !steamId && <span id='steam-id-error'>Please enter your Steam Id</span>}

                    <br />

                    <button className='form-field' type='submit'>
                        Import Wishlist
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Import;