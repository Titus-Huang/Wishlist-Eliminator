import { useState } from "react";

import Create from "./Create";
import Edit from "./Edit";

function WishlistModification(props) {
    // For now, auto set it to user a's Main Reference list
    // default in the future will automatically find user's Main Reference within appData.userWishlists
    // referenceListId: -1
    const [ referenceListId, setReferenceListId ] = useState(1)
    
    

    return (
        <div className="WishlistModifications">
            {/* Would be an overarching page to modify wishlists */}
            {/* This would include... Creating, Editing, Deleting */}
            {/* <h2>Wishlist Modifications</h2> */}
            {props.type === 'create' && <Create appData={props.appData} updateAppData={props.updateAppData} referenceListId={referenceListId} setReferenceListId={setReferenceListId} />}
            {props.type === 'edit' && <Edit appData={props.appData} updateAppData={props.updateAppData} />}
        </div>
    );
}

export default WishlistModification;
