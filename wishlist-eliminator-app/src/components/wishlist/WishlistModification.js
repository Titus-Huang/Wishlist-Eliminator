import Create from "./Create";
import Edit from "./Edit";

function WishlistModification(props) {
    return (
        <div className="WishlistModifications">
            {/* Would be an overarching page to modify wishlists */}
            {/* This would include... Creating, Editing, Deleting */}
            <h2>Wishlist Modifications</h2>
            {props.type === 'create' && <Create appData={props.appData} updateAppData={props.updateAppData} />}
            {props.type === 'edit' && <Edit appData={props.appData} updateAppData={props.updateAppData} />}
        </div>
    );
}

export default WishlistModification;
