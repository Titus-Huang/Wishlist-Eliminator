import WishlistCard from "./WishlistCard";
import { useState, useEffect } from "react";

import './WishlistDisplay.scss';

function WishlistDisplay(props) {
    const [ list, updateList ] = useState([])
    // let list = [];

    let isInitialized = false;
    const onInitialize = () => {
        // console.log('props', props)
        // console.log('props', Object.values(props)[1].listId)
        // console.log('props', typeof Object.values(props)[1].listId === 'undefined')
        if (!isInitialized && typeof Object.values(props)[1].listId !== 'undefined') {
            console.log(Object.values(props)[1].listId)
            // temp fix, because react likes to add additional data for some reason
            // updateList([])

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


    const unpackList = (listData) => {
        if (listData !== null) {
            // console.log('unpacking');
            const listKeys = Object.keys(listData);
            const listValues = Object.values(listData);
            if (listValues.indexOf(null) === -1) {
                let returnListArr = [];
                for (let i = 0; i < listValues[0].length; i++) {
                    let newArrData = {}
                    for (let j = 0; j < listKeys.length; j++) {
                        newArrData[listKeys[j]] = listValues[j][i];
                    }
                    returnListArr.push(newArrData);
                }

                updateList(returnListArr);

                // console.log('returnListArrrrrrrrr',returnListArr);
                // console.log('list',list);
            }
        }
    }

    const repackList = (list) => {

    }

    
    useEffect(onInitialize, []);

    const editingReferenceRender = () => {
        return (
            <div className="editingReferenceRender list-render">
                <h2>Reference</h2>

                <p>Title: {props.referenceListData.name}</p>
                <p>Description: {props.referenceListData.description}</p>

                <div className="editingReferenceList">
                    {list?.map((cardData, index) => {
                        // console.log('rendering card no', index)
                        // console.log('card data', cardData)
                        return <WishlistCard key={index} cardData={cardData} index={index} type={'reference'} />
                    })}
                </div>
                
            </div>
        )
    }

    const editingListRender = () => {
        return (
            <div className="editingListRender list-render">
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
