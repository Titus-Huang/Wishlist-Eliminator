import WishlistCard from "./WishlistCard";
import { useState, useEffect } from "react";


function WishlistDisplay(props) {

    const [ test, updateTest ] = useState(false)
    // const [ list, updateList ] = useState([])
    let list = [];

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

                list = returnListArr;
                // updateList(returnListArr);
                console.log('returnListArrrrrrrrr',returnListArr);
                console.log('list',list);
            }
        }
    }

    const repackList = (list) => {

    }

    
    // useEffect(editingReferenceRender, [test]);

    const editingReferenceRender = () => {
        if (!test) return

        onInitialize()

        return (
            <div className="editingReferenceRender">
                <h2>Reference</h2>
                <br />
                <p>Title: {props.referenceListData.name}</p>
                <p>Description: {props.referenceListData.description}</p>
                <br />
                <div className="editingReferenceList">
                    {console.log(list.length)}
                    {list.map((cardData, i) => {
                        return <WishlistCard key={i} />
                    })}
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
