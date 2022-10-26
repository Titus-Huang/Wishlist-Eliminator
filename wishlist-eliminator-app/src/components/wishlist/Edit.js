import { useParams } from "react-router-dom";

function Edit(props) {
    let { wishlistId } = useParams();

    return (
        <div className="WishlistEdit">
            <h2>Edit Wishlist time</h2>
        </div>
    );
}

export default Edit;
