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
        // console.log('import form submitted');

        if (steamId) {
            setSubmitted(true);
            setValid(true);

            // console.log('import form is valid');
            let userId = props.userData.id
            const formData = { userId, steamId }

            fetch('/api/users/steamid', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.error) {
                        throw res.error;
                    } else {
                        // grab wishlist to see if there is a wishlist

                        // console.log("steam id is valid and can fetch the darn thing")
                        // console.log('res', res)
                        fetch(`/api/wishlists/import/${res}`)
                            .then(res => res.json())
                            .then(steamWishlistData => {
                                // update local data with downloaded info
                                // console.table(steamWishlistData)
                                props.updateSteamWishlistData(steamWishlistData)
                                // console.log("end of fetch");
                            });
                    }
                })
                // .then(wishlist => {
                //     console.table(wishlist)
                // })
                .catch((error) => renderError(error));
        } else {
            setSubmitted(true);
        }
    };

    const renderError = errMsg => {
        // if errMsg is inputted with an object instead of string, write a check for that later
        // typeof error === "string"
        setError(true);
        setErrorMsg(errMsg);
    };

    return (
        <div className='wishlist-import-page default-content-box row'>
            <div className="col-12">
                <h2>Wishlist import</h2>
            </div>
            
            <div className="col-12">
                <p>You will be importing your Steam Wishlist, this will be your Main Reference list to add/remove/delete/edit of off.</p>

                <p>Find your Steam Id here: <a href='https://steamdb.info/calculator/' alt='Steam Calculator' title='Steam Calculator' target='_blank' rel='noreferrer'>Steam Calculator</a></p>

                <div className="row">
                    <div className="col-md-6 col-12">
                        <img src="https://files.treblesketch.com/2022/10/4aad8a5d79ff52b3_2022-10-25.png" alt="Show where to put in your Steam profile link" />
                        <p>Find what is your Steam Profile URL and paste the link into the website.</p> 
                    </div>
                    <div className="col-md-6 col-12">
                        <img src="https://files.treblesketch.com/2022/10/f4664f5935a95ea4_2022-10-25.png" alt="Shows which Steam Id to input below" />
                        <p>Click on the button highlighted in the image below to copy your Steam Id.</p>
                    </div>
                </div>

                <div className='import-form-div col-xl-9 col-lg-9 col-12 g-4'>
                    <form className='import-form row' onSubmit={handleSubmit}>
                        {submitted && valid && !error && <div className='success-message'>Success! Importing wishlist...</div>}
                        {submitted && valid && error && <div className='failure-response'>Error! {errorMsg}</div>}

                        <div className='row mb-3'>
                            <label htmlFor='steam-id' className="col-sm-6 col-form-label col-form-label-lg">Steam Id: </label>
                            <div className="input-group">
                                <input 
                                    id='steam-id'
                                    className='form-control form-control-lg form-field'
                                    type='text'
                                    name='steam-id'
                                    value={steamId}
                                    onChange={handleSteamIdInputChange}
                                />
                            </div>
                        </div>

                        <br />

                        {submitted && !steamId && <span className="failure-response" id='steam-id-error'>Please enter your Steam Id</span>}

                        <br />
                        <br />

                        <div className="col-auto">
                            <button className='form-field btn btn-lg btn-primary' type='submit'>
                                Import Wishlist
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
}

export default Import;
