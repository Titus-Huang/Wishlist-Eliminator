import { useParams } from "react-router-dom";
import { useState } from "react";
import WishlistDisplay from "./WishlistDisplay";

function Edit(props) {
    let { wishlistId } = useParams();

    const [ editingListData, setEditingListData ] = useState({
        name: '',
        description: '',
        list_order: {
            id: 0,
            name: '',
            img_bg: '',
            dateAddedToOgList: '',
            releaseDate: '',
            releaseDateStr: '',
            deckCompat: '',
            purchased: false
        }
    })
    const [ referenceListData, setReferenceListData ] = useState({
        name: '',
        description: '',
        list_order: {
            id: 0,
            name: '',
            img_bg: '',
            dateAddedToOgList: '',
            releaseDate: '',
            releaseDateStr: '',
            deckCompat: '',
            purchased: false
        }
    })

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
