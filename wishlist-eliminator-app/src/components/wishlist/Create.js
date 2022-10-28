import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Create(props) {
    const navigate = useNavigate();
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
        referenceListId: props.referenceListId
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
            // insert that data in for the data required to create a new wishlist

            console.log('newListForm:', newListForm);

            fetch('/api/wishlists', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newListForm)
            })
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    // update the local data with this new wishlit
                    updateLocalData(response);
                    // navigate to edit the wishlist
                    navigate(`/wishlists/edit/${response.id}?ref=${newListForm.referenceListId}`);
                })
            // response here should be the new list in object form
        } else {
            setSubmitted(true);
        }
    };

    const updateLocalData = data => {
        let updatedUserWishlists = props.appData.userWishlists;
        let updatedUserWishlistData = props.appData.userWishlistData;
        updatedUserWishlists.push(data);
        updatedUserWishlistData.lists.push(data.id);

        props.updateAppData((existingAppData) => ({
            ...existingAppData,
            userWishlistData: updatedUserWishlistData,
            userWishlists: updatedUserWishlists,
        }));
    };

    const renderError = errMsg => {
        setError(true);
        setErrorMsg(errMsg);
    }

    let isInitializedWithValues = false;
    const onInitialize = () => {
        if (!isInitializedWithValues) {
            onNewListFormChange((inputValue) => ({
                ...inputValue,
                userDataTableId: props.appData.userWishlistData.id,
            }));
            if (props.appData.userWishlistData.id) isInitializedWithValues = true;
        }
    }

    useEffect(onInitialize, [props.appData.userWishlistData]);

    return (
        <div className="WishlistCreate row">
            <div className="col-lg-6 col-12">
                <h2>Create Wishlist</h2>
                <p>The top would allow the addition of wishlist name/description and so on.</p>
            </div>

            <div className="col-lg-6 col-12">
                <div className="createNewWishlistPrompt">
                    <div className='new-list-form-title col-12'>
                        <h2>Create New List</h2>
                    </div>

                    <div className='create-list-form-div col-12'>
                        <form className='create-list-form row' onSubmit={handleSubmit}>
                            {submitted && valid && !error && <div className='success-message'>Success! Creating new list...</div>}
                            {submitted && valid && error && <div className='failure-response'>Error! {errorMsg}</div>}

                            <div className='row mb-3'>
                                <label htmlFor='title' className="col-sm-6 col-form-label col-form-label-lg">Title: </label>
                                <div className="input-group">
                                    <input
                                        id='title'
                                        className='form-control form-control-lg form-field'
                                        type='text'
                                        name='title'
                                        value={newListForm.title}
                                        onChange={handleTitleInputChange}
                                    />
                                </div>
                            </div>
                            <br />
                            {submitted && !newListForm.title && <span className='failure-response' id='title-error'>Please enter a list title</span>}

                            <br />
                            <br />

                            <div className='row mb-3'>
                                <label htmlFor='description' className="col-sm-6 col-form-label col-form-label-lg">Description: </label>
                                <div className="input-group">
                                    <textarea
                                        id='description'
                                        className='form-field form-control form-control-lg'
                                        type='textfield'
                                        name='description'
                                        rows="5"
                                        value={newListForm.description}
                                        onChange={handleDescriptionInputChange}
                                    />
                                </div>
                            </div>

                            <br />
                            <br />

                            <div className="col-auto">
                                <button className='form-field btn btn-lg btn-primary' type='submit'>
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;
