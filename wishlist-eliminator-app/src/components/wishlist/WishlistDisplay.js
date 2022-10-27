import WishlistCard from "./WishlistCard";
import { useState, useEffect } from "react";

import './WishlistDisplay.scss';

function WishlistDisplay(props) {

    const [ test, updateTest ] = useState(false)
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
            updateList([])

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

            // debugger
            isInitialized = true;
        }
    }


    const unpackList = (listData) => {
        if (listData !== null) {
            console.log('unpacking');
            // debugger
            // console.log(Object.keys(listData));
            // console.log(Object.values(listData));
            const listKeys = Object.keys(listData);
            const listValues = Object.values(listData);
            if (listValues.indexOf(null) === -1) {
                let returnListArr = [];
                for (let i = 0; i < listValues[0].length; i++) {
                    let newArrData = {}
                    for (let j = 0; j < listKeys.length; j++) {
                        newArrData[listKeys[j]] = listValues[j][i];
                    }
                    // updateList((existingData) => ({
                    //     ...existingData,
                    //     newArrData,
                    // }));
                    returnListArr.push(newArrData);
                }

                // list = returnListArr;
                // updateList(returnListArr);

                // updateList([...list, {gameId: '1231', gameName: 'wow'}])
                // updateList([...list, returnListArr])
                // updateList((existingData) => ({
                //     ...existingData,
                //     // returnListArr[0],
                // }));
                console.log('returnListArrrrrrrrr',returnListArr);
                console.log('list',list);
            }
        }
    }

    const repackList = (list) => {

    }

    
    useEffect(onInitialize, []);

    const editingReferenceRender = () => {
        if (test) return

        // onInitialize()

        return (
            <div className="editingReferenceRender list-render">
                <h2>Reference</h2>
                
                <p>Title: {props.referenceListData.name}</p>
                <p>Description: {props.referenceListData.description}</p>

                <div className="editingReferenceList">
                    {list?.map((cardData, index) => {
                        // if (index > 5) return
                        console.log('rendering card no', index)
                        console.log('card data', cardData)
                        // debugger
                        return <WishlistCard key={index} cardData={cardData} index={index} />
                    })}
                </div>
                
            </div>
        )
    }

    const editingListRender = () => {
        // onInitialize()

        return (
            <div className="editingListRender">
                <h2>Your List</h2>
            </div>
        )
    }

    return (
        <div className="WishlistDisplay">
            {/* <h2>Display Wishlist time</h2> */}
            {props.type === 'editing-reference' && typeof Object.values(props)[1].listId !== 'undefined' && editingReferenceRender()}
            {/* {props.type === 'editing-list' && editingListRender()} */}
        </div>
    );
}

export default WishlistDisplay;
