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

    // To-do:
    // When arrow is clicked on EITHER end, request data is sent back up through the waterfall
    // reaches here and then it PUT onto the other side of the list

    // actions include:
    // transfering to the OTHER list
    // moving up/down the list
    // deleting data from the list
    // updating data within the list

    // then will need to send data BACK to the server
    // send back to server on each action


    // editingListData
    // referenceListData
    // const transferObjectToOtherList = (currentListType, gameId) => {
    //     if (currentListType === 'reference') {
    //         // current list is reference list
    //         // so therefore, need to move the data from the reference list to the editing list
            
    //     } else if (currentListType === 'list') {
    //         // current list is editing list
    //         // so therefore, need to move the data from the editing list to the reference list
    //     }
    // }

    // setEditingListData, setReferenceListData

    const addToOtherList = (currentListType, objData) => {
        if (currentListType === 'editing-reference') {
            // current list is reference list
            // so therefore, need to move the data from the reference list to the editing list
            // setEditingListData()
            let transform = editingListData.list_data;
            let tfKeys = Object.keys(editingListData.list_data)
            tfKeys.forEach(dataName => {
                // console.log(dataName)
                // console.log(transform[dataName])
                // console.log(transform[dataName] === null)
                if (transform[dataName] === null) {
                    transform[dataName] = [ objData[dataName] ]
                } else {
                    transform[dataName].unshift(objData[dataName])
                }
            })
            setEditingListData((existingData) => ({
                ...existingData,
                list_data: transform,
            }))
            // console.log(transform);
            // transform
        } else if (currentListType === 'editing-list') {
            // current list is editing list
            // so therefore, need to move the data from the editing list to the reference list
            // setReferenceListData()
        }
    }

    const updateCurrentListData = (currentListType, listData) => {
        if (currentListType === 'editing-reference') {
            // current list is reference list
            // so therefore, should update via setReferenceListData
            setReferenceListData(listData)
        } else if (currentListType === 'editing-list') {
            // current list is editing list
            // so therefore, should update via setEditingListData
            setEditingListData(listData)
        }
    }

    const listActions = { addToOtherList, updateCurrentListData }

    // this should run on initialise
    useEffect(onInitialize, [isInitialized])
    // useEffect(updateListsData, [editingListData])

    const [ manuallyShowReferenceData, setManuallyShowReferenceData ] = useState(false);

    const renderLists = () => {
        return (
            <>
                {(typeof referenceListData.listId !== 'undefined' || manuallyShowReferenceData) && <WishlistDisplay type={'editing-reference'} referenceListData={referenceListData} listActions={listActions} />}
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
