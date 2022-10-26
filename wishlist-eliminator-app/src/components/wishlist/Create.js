import { useState } from "react";

function Create(props) {
    // const [ readyToCreate, setReadyToCreate ] = useState(false)
    // const [ newListData, setNewListData ] = useState({
    //     name: '',
    //     description: '',
    //     list_order: {
    //         id: 0,
    //         name: '',
    //         img_bg: '',
    //         dateAddedToOgList: '',
    //         releaseDate: '',
    //         releaseDateStr: '',
    //         deckCompat: '',
    //         purchased: false
    //     }
    // })
    // const [ referenceListData, setReferenceListData ] = useState({
    //     name: '',
    //     description: '',
    //     list_order: {
    //         id: 0,
    //         name: '',
    //         img_bg: '',
    //         dateAddedToOgList: '',
    //         releaseDate: '',
    //         releaseDateStr: '',
    //         deckCompat: '',
    //         purchased: false
    //     }
    // })
    // Form states
    const [ submitted, setSubmitted] = useState(false);
    const [ valid, setValid ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState('');
    const [ newListForm, onNewListFormChange ] = useState({
        title: '',
        description: '',
        // For now, auto set it to user "a"'s Main Reference list
        referenceListId: 1
        // default in the future will automatically find user's Main Reference within appData.userWishlists
        // referenceListId: -1
    });


    const handleTitleInputChange = event => {
        event.persist();

        onNewListFormChange((inputValue) => ({
            ...inputValue,
            title: event.target.value,
        }));
    };

    const handleDescriptionInputChange = event => {
        event.persist();

        onNewListFormChange((inputValue) => ({
            ...inputValue,
            description: event.target.value,
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (newListForm.title && newListForm.referenceListId) {
            setSubmitted(true);
            setValid(true);

            // What happens now?
            // Data gets uploaded to the server
            // A new id is "created" with the name/description of the list (user input)
            // Once a new entry is added, the data is returned from the server and added to appData.userWishlists & appData.userWishlistData.lists
            // Using the returned data's id to redirect to /wishlists/edit/:wishlistId
            // Once in Edit.js, fill out the form with the data
            // Fill up the left hand side based from userWishlists id that
        } else {
            setSubmitted(true);
        }
    };

    const renderError = errMsg => {
        setError(true);
        setErrorMsg(errMsg);
    }


    return (
        <div className="WishlistCreate">
            <h2>Create Wishlist time</h2>
            <p>the left would show the "main" wishlist, imported from Steam. While the right would show the "new" wishlist that is being created.</p>
            <p>The top would allow the addition of wishlist name/description and so on.</p>

            <div className="createNewWishlistPrompt">
                <h2>Create New List</h2>
                <form className='login-form' onSubmit={handleSubmit}>
                    {submitted && valid && !error && <div className='success-message'>Success! Creating new list...</div>}
                    {submitted && valid && error && <div className='failure-response'>Error! {errorMsg}</div>}

                    <label htmlFor='title'>Title: </label>
                    <input
                        id='title'
                        className='form-field'
                        type='text'
                        name='title'
                        value={newListForm.title}
                        onChange={handleTitleInputChange}
                    />
                    {submitted && !newListForm.title && <span id='title-error'>Please enter a list title</span>}

                    <br />

                    <label htmlFor='description'>Description: </label>
                    <textarea
                        id='description'
                        className='form-field'
                        type='textfield'
                        name='description'
                        value={newListForm.description}
                        onChange={handleDescriptionInputChange}
                    />

                    <br />

                    <button className='form-field' type='submit'>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Create;
