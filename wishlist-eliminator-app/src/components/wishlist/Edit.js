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

    let lastEditListDataReturn = {}
    let lastRefListDataReturn = {}

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
                        // console.log('editing wishlist check')
                        // console.log(typeof data.game_ids)
                        let checkedListData = {
                            gameId: data.game_ids === null ? [] : data.game_ids,
                            gameName: data.game_name === null ? [] : data.game_name,
                            gameImgBg: data.game_img_bg === null ? [] : data.game_img_bg,
                            dateAddedToOgList: data.date_added === null ? [] : data.date_added,
                            releaseDate: data.release_date === null ? [] : data.release_date,
                            releaseDateStr: data.release_date_str === null ? [] : data.release_date_str,
                            deckCompat: data.deck_compat === null ? [] : data.deck_compat,
                            purchased: data.purchased === null ? [] : data.purchased,
                        }

                        setEditingListData({
                            listId: data.id,
                            name: data.name,
                            description: data.description,
                            mainReference: data.main_reference,
                            createdAt: data.created_at,
                            editedAt: data.edited_at,
                            list_data: checkedListData
                        })

                        // wishlistIdInUserDataList = props
                        //         .appData
                        //         .userWishlists
                        //         .map((localData, index) => {
                        //             if (localData.id === data.id) {
                        //                 return index
                        //             }
                        //         })
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

    const uploadLocalData = () => {
        // upload the data to the database

        // with the returning data
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
            uploadEditDataToDb(transform);
            // console.log(transform);
            // transform
        } else if (currentListType === 'editing-list') {
            // current list is editing list
            // so therefore, need to move the data from the editing list to the reference list
            // setReferenceListData()
            let transform = referenceListData.list_data;
            let tfKeys = Object.keys(referenceListData.list_data)
            tfKeys.forEach(dataName => {
                if (transform[dataName] === null) {
                    transform[dataName] = [ objData[dataName] ]
                } else {
                    transform[dataName].unshift(objData[dataName])
                }
            })
            setReferenceListData((existingData) => ({
                ...existingData,
                list_data: transform,
            }))
        }
    }

    const updateCurrentListData = (currentListType, listData) => {
        console.log('is updated current list')
        console.log(listData)

        if (currentListType === 'editing-reference') {
            // current list is reference list
            // so therefore, should update via setReferenceListData
            setReferenceListData((existingData) => ({
                ...existingData,
                list_data: listData,
            }))
        } else if (currentListType === 'editing-list') {
            // current list is editing list
            // so therefore, should update via setEditingListData
            setEditingListData((existingData) => ({
                ...existingData,
                list_data: listData,
            }))
            uploadEditDataToDb(listData);
        }
    }

    const listActions = { addToOtherList, updateCurrentListData }

    // this should run on initialise
    useEffect(() => {
        onInitialize()
    }, [])
    // useEffect(updateListsData, [editingListData])
    // useEffect(() => {
    //     if (editingListData.listId !== null && typeof props.appData.userWishlists.length !== 'undefined') {
    //         if (editingListData.name?.length > 0 && !isEditListUploadedYet) {
    //             //  && !isEditListUploadedYet
                
    //         }
    //     }
    // }, [editingListData])

    const uploadEditDataToDb = (uploadData) => {
        let userDataTableId = props.appData.userWishlistData.id
        let userWishlistEditId = props
            .appData
            .userWishlists
            .map((localData, index) => {
                if (localData.id === editingListData.listId) {
                    return index
                }
            })
            .filter(num => typeof num === 'number')[0]
        userWishlistEditId++
        console.log('userWishlistEditId:',userWishlistEditId);
        console.log(uploadData)

        let returnData = {
            // name: uploadData.name,
            // description: uploadData.description,
            datatableId: userDataTableId,
            game_ids: uploadData.gameId,
            game_name: uploadData.gameName,
            game_img_bg: uploadData.gameImgBg,
            date_added: uploadData.dateAddedToOgList,
            release_date: uploadData.releaseDate,
            release_date_str: uploadData.releaseDateStr,
            deck_compat: uploadData.deckCompat,
            purchased: uploadData.purchased,
            id: userWishlistEditId
        }

        console.log(lastEditListDataReturn === returnData)
        lastEditListDataReturn = returnData;
        console.log('data uploading', returnData)

        fetch(`/api/wishlists/${userWishlistEditId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(returnData)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
    }

    useEffect(() => {
        // console.log(props.appData.userWishlists.length)
        // console.log(props.appData.userWishlists.id)
        // console.log(typeof props.appData.userWishlists.length)
        if (referenceListData.listId !== null && typeof props.appData.userWishlists.length !== 'undefined') {
            let userWishlistRefId = props
                .appData
                .userWishlists
                .map((localData, index) => {
                    if (localData.id === referenceListData.listId) {
                        return index
                    }
                })
                .filter(num => typeof num === 'number')[0]
            console.log(userWishlistRefId);
        }
    }, [referenceListData])

    const [ manuallyShowReferenceData, setManuallyShowReferenceData ] = useState(false);

    const renderLists = () => {
        return (
            <>
                {(typeof referenceListData.listId !== 'undefined' || manuallyShowReferenceData) &&
                <WishlistDisplay type={'editing-reference'} referenceListData={referenceListData} listActions={listActions} />}
                <WishlistDisplay type={'editing-list'} editingListData={editingListData} listActions={listActions}/>
            </>
        )
    }

    return (
        <div className="WishlistEdit">
            <h2>Edit Wishlist</h2>
            <div className="displayCreateColumns">
                .{props.appData.userWishlists?.length > 0 && renderLists()}
                {/* {console.log(props.appData.userWishlists?.length)} */}
            </div>
        </div>
    );
}

export default Edit;
