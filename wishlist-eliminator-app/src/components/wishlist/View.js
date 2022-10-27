import { useParams } from "react-router-dom";

function View(props) {
    let { wishlistId } = useParams();

    return (
        <div className="WishlistView">
            <h2>View Wishlist time</h2>
        </div>
    );
}

export default View;
