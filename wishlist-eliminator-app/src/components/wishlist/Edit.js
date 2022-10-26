import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import WishlistDisplay from "./WishlistDisplay";

function Edit(props) {
    let { wishlistId } = useParams();

    const [ editingListData, setEditingListData ] = useState({})
    const [ referenceListData, setReferenceListData ] = useState({})

    // what the list data should look like
    // {
    //     name: '',
    //     description: '',
    //     list_data: [{
    //         id: 0,
    //         name: '',
    //         img_bg: '',
    //         dateAddedToOgList: '',
    //         releaseDate: '',
    //         releaseDateStr: '',
    //         deckCompat: '',
    //         purchased: false
    //     }]
    // }

    const getListsData = () => {
        console.log('get lists data is being run');
    }

    const updateListsData = () => {
        console.log('update list data is being run');
    }

    // this should run on initialise
    useEffect(getListsData, [])
    useEffect(updateListsData, [editingListData])

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
