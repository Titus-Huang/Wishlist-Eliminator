import { useState } from "react";
import WishlistDisplay from "./WishlistDisplay";

function Create(props) {
    const [ readyToCreate, setReadyToCreate ] = useState(false)
    const [ newListData, setNewListData ] = useState({
        name: '',
        desciprtion: '',
        list_order: {
            id: [0],
            name: [''],
            img_bg: [''],
            dateAddedToOgList: [''],
            releaseDate: [''],
            releaseDateStr: [''],
            deckCompat: [''],
            purchased: [false]
        }
    })

    return (
        <div className="WishlistCreate">
            <h2>Create Wishlist time</h2>
            <p>the left would show the "main" wishlist, imported from Steam. While the right would show the "new" wishlist that is being created.</p>
            <p>The top would allow the addition of wishlist name/description and so on.</p>

            <div className="createNewWishlistPrompt">

            </div>

            {readyToCreate &&
            <div className="displayCreateColumns">
                <WishlistDisplay />
                <WishlistDisplay />
            </div>}
        </div>
    );
}

export default Create;
