import WishlistCard from "./WishlistCard";
import { useState, useEffect } from "react";


function WishlistDisplay(props) {

    const [ list, updateList ] = useState([])

    let isInitialized = false;
    const onInitialize = () => {
        // console.log('props', props)
        // console.log('props', Object.values(props)[1].listId)
        // console.log('props', typeof Object.values(props)[1].listId === 'undefined')
        if (!isInitialized && typeof Object.values(props)[1].listId !== 'undefined') {
            switch (props.type) {
                case 'editing-reference':
                    // console.log(props.referenceListData.list_data)
                    unpackList(props.referenceListData.list_data)
                    console.log('unpacking reference list');
                    break;
                case 'editing-list':
                    unpackList(props.editingListData.list_data)
                    console.log('unpacking editing list');
                    break;
                default:
                    break;
            }
            console.log('Wishlist Display is initialized!');

            isInitialized = true;
        }
    }
    // useEffect(onInitialize, [isInitialized]);

    const unpackList = (list) => {
        if (list !== null) {
            console.log('unpacking');
            // debugger
            console.log(Object.keys(list));
            console.log(Object.values(list));
            const listKeys = Object.keys(list);
            const listValues = Object.values(list);
            let returnArr = []

            // listValues.forEach((value, i) => {
            //     console.log(value);
            //     // listKeys.forEach((key, j) => {
                    
            //     // });
            // });
        }
    }

    const repackList = (list) => {

    }

    const editingReferenceRender = () => {
        // onInitialize()

        return (
            <div className="editingReferenceRender">
                <h2>Reference</h2>
                <br />
                <p>Title: {props.referenceListData.name}</p>
                <p>Description: {props.referenceListData.description}</p>
                <br />
                <div className="editingReferenceList">
                    <WishlistCard />
                </div>
                
            </div>
        )
    }

    const editingListRender = () => {
        onInitialize()

        return (
            <div className="editingListRender">
                <h2>Your List</h2>
            </div>
        )
    }

    return (
        <div className="WishlistDisplay">
            {/* <h2>Display Wishlist time</h2> */}
            {props.type === 'editing-reference' && editingReferenceRender()}
            {props.type === 'editing-list' && editingListRender()}
        </div>
    );
}

export default WishlistDisplay;
