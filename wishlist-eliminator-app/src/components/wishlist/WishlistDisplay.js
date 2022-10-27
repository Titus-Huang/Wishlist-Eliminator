import WishlistCard from "./WishlistCard";
import { useState, useEffect } from "react";

import './WishlistDisplay.scss';

function WishlistDisplay(props) {
    const [ list, updateList ] = useState([])
    const [ isUpdateTime, setIsUpdateTime ] = useState(false)
    const [ isInitialized, setIsInitialized ] = useState(false);
    const [ isListUnpacking, setIsListUnpacking ] = useState(false);
    const [ isListUnpacked, setIsListUnpacked ] = useState(false);
    const [ isListRepacking, setIsListRepacking ] = useState(false);
    const [ isListRepacked, setIsListRepacked ] = useState(false);

    const onInitialize = () => {
        // console.log('props', props)
        // console.log('props', Object.values(props)[1].listId)
        // console.log('props', typeof Object.values(props)[1].listId === 'undefined')
        if (!isInitialized && !isListUnpacking && typeof Object.values(props)[1].listId !== 'undefined') {
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

            setIsInitialized(true);
        }
    }

    const onListDataUpdated = () => {
        // console.log(isInitialized)
        //     console.log(isListUnpacked)
        //     console.log(isListUnpacking)
        if (isInitialized && isListUnpacked && !isListUnpacking && !isListRepacking && isUpdateTime) {
            // console.log(isInitialized)
            // console.log(isListUnpacked)
            // console.log(isListUnpacking)
            props.listActions.updateCurrentListData(props.type, repackList(list))
        }
    }


    const unpackList = (listData) => {
        if (listData !== null) {
            console.log('unpacking');
            console.log(listData)
            const listKeys = Object.keys(listData);
            const listValues = Object.values(listData);
            if (listValues.indexOf(null) === -1) {
                setIsListUnpacking(true);
                let returnListArr = [];
                for (let i = 0; i < listValues[0].length; i++) {
                    let newArrData = {}
                    for (let j = 0; j < listKeys.length; j++) {
                        newArrData[listKeys[j]] = listValues[j][i];
                    }
                    returnListArr.push(newArrData);
                }
                updateList(returnListArr);
                setIsListUnpacking(false);
                setIsListUnpacked(true);
                // console.log('returnListArrrrrrrrr',returnListArr);
                // console.log('list',list);
            }
        }
    }

    const repackList = (listData) => {
        if (listData !== null) {
            console.log('repacking');
            setIsListRepacking(true);
            const listKeys = Object.keys(listData[0]);
            const listValues = Object.values(listData);

            console.log(listKeys);
            console.log(listValues);

            if (listKeys.indexOf(null) === -1) {
                let returnListObj = {};
                for (let i = 0; i < listKeys[0].length; i++) {
                    let newArrData = []
                    for (let j = 0; j < listValues.length; j++) {
                        // console.log(listValues[j][listKeys[i]])
                        newArrData[j] = listValues[j][listKeys[i]];
                    }
                    returnListObj[listKeys[i]] = newArrData;
                }
                // props.listActions.
                // setIsListUnpacked(false);
                console.log('returnListObj',returnListObj);
                setIsListRepacking(false);
                setIsListRepacked(true);
                return returnListObj;
                // console.log('list',list);
            }
        }
    }

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

                <p>Title: {props.editingListData.name}</p>
                <p>Description: {props.editingListData.description}</p>

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

    const moveToOtherList = () => {
        
    }

    // useEffect(onInitialize, []);
    useEffect(onListDataUpdated, [isUpdateTime]);
    useEffect(onInitialize, [props.referenceListData?.list_data, props.editingListData?.list_data]);

    // commands that the cards are allowed to have
    const cardCommands = { moveToOtherList }

    return (
        <div className="WishlistDisplay">
            {/* <h2>Display Wishlist time</h2> */}
            {props.type === 'editing-reference' && editingReferenceRender()}
            {props.type === 'editing-list' && editingListRender()}
        </div>
    );
}

export default WishlistDisplay;
