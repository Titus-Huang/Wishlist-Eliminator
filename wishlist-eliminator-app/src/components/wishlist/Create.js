import WishlistDisplay from "./WishlistDisplay";

function Create(props) {
    return (
        <div className="WishlistCreate">
            <h2>Create Wishlist time</h2>
            <p>the left would show the "main" wishlist, imported from Steam. While the right would show the "new" wishlist that is being created.</p>
            <p>The top would allow the addition of wishlist name/description and so on.</p>
            <div className="displayCreateColumns">
                <WishlistDisplay />
                <WishlistDisplay />
            </div>
        </div>
    );
}

export default Create;
