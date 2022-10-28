import { useParams } from "react-router-dom";

function View(props) {
    let { wishlistId } = useParams();

    return (
        <div className="WishlistView default-content-box row">
            <div className="col-12">
                <h2>View Wishlist</h2>
            </div>
            <div className="col-12">
                <p>View type: {props.type}</p>
                <br />
                <p>If type is "logged-in", then a wishlist will be shown if there is an id. Otherwise, if ther is no Id given, user will be sent to see all "public" lists. <i>WIP</i>!!!</p>
                <p>Wishlist Id: {wishlistId}</p>
            </div>
        </div>
    );
}

export default View;
