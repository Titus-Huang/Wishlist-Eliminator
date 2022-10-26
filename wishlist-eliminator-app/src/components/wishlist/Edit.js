import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import WishlistDisplay from "./WishlistDisplay";
import { DataRowMessage } from "pg-protocol/dist/messages";

function Edit(props) {
    let { wishlistId } = useParams();

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
                    }
                })
            isInitialized = true;
        }
    }

    const getListsData = () => {
        console.log('get lists data is being run');
    }

    const updateListsData = () => {
        console.log('update list data is being run');
    }

    // this should run on initialise
    useEffect(onInitialize, [isInitialized])
    // useEffect(updateListsData, [editingListData])

    return (
        <div className="WishlistEdit">
            <h2>Edit Wishlist time</h2>

            <div className="displayCreateColumns">
                <WishlistDisplay />
                <WishlistDisplay />
            </div>
        </div>
    );
}

export default Edit;
