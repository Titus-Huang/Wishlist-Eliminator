import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import WishlistDisplay from "./WishlistDisplay";
import './Edit.scss';

function Edit(props) {
    let { wishlistId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [ editingListData, setEditingListData ] = useState({})
    const [ referenceListData, setReferenceListData ] = useState({})

    // what the list data should look like
    // {
    //     name: '',
    //     description: '',
    //     list_data: {
    //         id: 0,
    //         name: '',
    //         img_bg: '',
    //         dateAddedToOgList: '',
    //         releaseDate: '',
    //         releaseDateStr: '',
    //         deckCompat: '',
    //         purchased: false
    //     }
    // }

    let isInitialized = false;
    const onInitialize = () => {
        if (!isInitialized) {
            // fetch wishlist to edit
            fetch(`/api/wishlists/${wishlistId}`)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setEditingListData({
                            listId: data.id,
                            name: data.name,
                            description: data.description,
                            mainReference: data.main_reference,
                            createdAt: data.created_at,
                            editedAt: data.edited_at,
                            list_data: {
                                gameId: data.game_ids,
                                gameName: data.game_name,
                                gameImgBg: data.game_img_bg,
                                dateAddedToOgList: data.date_added,
                                releaseDate: data.release_date,
                                releaseDateStr: data.release_date_str,
                                deckCompat: data.deck_compat,
                                purchased: data.purchased
                            }
                        })
                    } else {
                        console.error("list not found, try again");
                        navigate('/wishlists/create');
                    }
                })

            // if there is a reference id provided, use it!
            // location.search
            let refListId = location.search.includes('ref') ? location.search.split('=')[1] : ''
            // console.log(refListId);
            if (location.search && typeof (refListId * 1) === 'number') {
                fetch(`/api/wishlists/${refListId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (!data.error) {
                            setReferenceListData({
                                listId: data.id,
                                name: data.name,
                                description: data.description,
                                mainReference: data.main_reference,
                                createdAt: data.created_at,
                                editedAt: data.edited_at,
                                list_data: {
                                    gameId: data.game_ids,
                                    gameName: data.game_name,
                                    gameImgBg: data.game_img_bg,
                                    dateAddedToOgList: data.date_added,
                                    releaseDate: data.release_date,
                                    releaseDateStr: data.release_date_str,
                                    deckCompat: data.deck_compat,
                                    purchased: data.purchased
                                }
                            })
                        } else {
                            console.error("list not found, try again");
                        }
                    })
            }
            isInitialized = true;
        }
    }

    const updateListsData = () => {
        console.log('update list data is being run');
    }

    // this should run on initialise
    useEffect(onInitialize, [isInitialized])
    // useEffect(updateListsData, [editingListData])

    const [ manuallyShowReferenceData, setManuallyShowReferenceData ] = useState(false);

    const renderLists = () => {
        return (
            <>
                {(typeof referenceListData.listId !== 'undefined' || manuallyShowReferenceData) && <WishlistDisplay type={'editing-reference'} referenceListData={referenceListData} />}
                <WishlistDisplay type={'editing-list'} editingListData={editingListData} />
            </>
        )
    }

    return (
        <div className="WishlistEdit">
            <h2>Edit Wishlist time</h2>

            <div className="displayCreateColumns">
                {props.appData.userWishlists?.length > 0 && renderLists()}
                {/* {console.log(props.appData.userWishlists?.length)} */}
            </div>
        </div>
    );
}

export default Edit;
