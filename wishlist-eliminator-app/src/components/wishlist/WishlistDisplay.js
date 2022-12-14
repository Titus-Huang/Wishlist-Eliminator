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
        console.log("initialize ran from", props.type)
        // // console.log('props', props)
        // // console.log('props', Object.values(props)[1].listId)
        // console.log('is it not initialize', !isInitialized)
        // console.log('is list not unpacking or repacking', !isListUnpacking && !isListRepacking);
        console.log('islist empty', typeof Object.values(props)[1].listId !== 'undefined')
        if (!isInitialized && !isListUnpacking && !isListRepacking && typeof Object.values(props)[1].listId !== 'undefined') {
            console.log(Object.values(props)[1].listId)
            // temp fix, because react likes to add additional data for some reason
            // updateList([])

            grabbingDataFromUpstream()
            console.log('Wishlist Display is initialized!');

            setIsInitialized(true);
        }
    }

    useEffect(() => {
        if (!isInitialized && typeof Object.values(props)[1].listId !== 'undefined') {
            onInitialize();
        }
    }, [Object.values(props)[1].listId]);

    const grabbingDataFromUpstream = () => {
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
    }

    const onListDataUpdated = (newList) => {
        console.log((isInitialized, isListUnpacking, isListRepacking))
        if (isInitialized && !isListUnpacking && !isListRepacking) {
            console.log('should be repacking');
            // debugger
            props.listActions.updateCurrentListData(props.type, repackList(newList))
        }
    }

    const onUpstreamListDataUpdated = () => {
        grabbingDataFromUpstream();
    }

    useEffect(() => {
        if (props.type === 'editing-reference' && isInitialized && isListUnpacked) {
            setIsUpdateTime(true);
            console.log('updated occured to reference data within,', props.type)
            onUpstreamListDataUpdated();
            setIsUpdateTime(false);
        }
    }, [props.referenceListData]);

    useEffect(() => {
        if (props.type === 'editing-list' && isInitialized && isListUnpacked) {
            setIsUpdateTime(true);
            console.log('updated occured to reference data within,', props.type)
            onUpstreamListDataUpdated();
            setIsUpdateTime(false);
        }
    }, [props.editingListData]);

    const unpackList = (listData) => {
        if (listData !== null) {
            console.log('unpacking');
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
                console.log('returnListArrrrrrrrr',returnListArr);
                // console.log('list',list);
            }
        }
        setIsListUnpacked(true);
    }

    const repackList = (listData) => {
        if (listData !== null) {
            console.log('repacking');
            // console.log(listData);
            // console.log(listData[0])
            setIsListRepacking(true);
            console.log(listData.length)
            if (listData.length > 0) {
                const listKeys = Object.keys(listData[0]);
                const listValues = Object.values(listData);
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
                    // console.log('returnListObj',returnListObj);
                    setIsListRepacking(false);
                    setIsListRepacked(true);
                    return returnListObj;
                    // console.log('list',list);
                }
            } else {
                // console.log('now an empty list again, now what?');
                setIsListRepacking(false);
                setIsListRepacked(true);
                return {
                    gameId: [],
                    gameName: [],
                    gameImgBg: [],
                    dateAddedToOgList: [],
                    releaseDate: [],
                    releaseDateStr: [],
                    deckCompat: [],
                    purchased: []
                }
            }
        } 
    }

    const moveToOtherList = (listIndex) => {
        console.log('move', listIndex, 'to the other list');
        setIsUpdateTime(true);

        if (props.type === 'editing-reference') {
            // grabs the data to copy it
            const dataToMove = {}
            const listKeys = Object.keys(list[0]);
            listKeys.forEach(dataName => {
                // console.log(list[listIndex])
                dataToMove[dataName] = list[listIndex][dataName]
            })

            // meanwhile, uploads the data into the other list
            // console.log(dataToMove)
            props.listActions.addToOtherList(props.type, dataToMove);
        } else if (props.type === 'editing-list') {
            // find local data and delete it form local, this should enable repack to send back up
            const updatedListData = Object.values(list);
            updatedListData.splice(listIndex, 1)
            console.table(updatedListData);
            updateList(updatedListData);

            // upload list to update
            onListDataUpdated(updatedListData);
        }
        setIsUpdateTime(false);
    }
    
    const deleteFromCurrentList = (listIndex) => {
        setIsUpdateTime(true);

        // find local data and delete it form local, this should enable repack to send back up
        const updatedListData = Object.values(list);
        updatedListData.splice(listIndex, 1)
        console.table(updatedListData);
        updateList(updatedListData);

        // upload list to update
        onListDataUpdated(updatedListData);

        setIsUpdateTime(false);
    }

    const updatePurchasedItem = (listIndex) => {
        // list[listIndex][purchased]
        // console.log('purchased');
        // console.log(listIndex);
        // console.log(list[listIndex].purchased);

        const updatedListData = Object.values(list);
        updatedListData[listIndex].purchased = !updatedListData[listIndex].purchased;
        updateList(updatedListData)
    }

    // commands that the cards are allowed to have
    const cardCommands = { moveToOtherList, deleteFromCurrentList, updatePurchasedItem }

    const editingReferenceRender = () => {
        return (
            <div className="editingReferenceRender list-render">
                <div className="list-details">
                    <h2>Reference</h2>
                    <p>Title: {props.referenceListData.name}</p>
                    <p>Description: {props.referenceListData.description}</p>
                </div>
                <div className="editingReferenceList">
                    {list?.map((cardData, index) => {
                        return <WishlistCard key={index} cardData={cardData} index={index} type={props.type} cardCommands={cardCommands} />
                    })}
                </div>
            </div>
        )
    }

    const editingListRender = () => {
        return (
            <div className='editingListRender list-render'>
                <div className="list-details">
                    <h2>Your List</h2>
                    <p>Title: {props.editingListData.name}</p>
                    <p>Description: {props.editingListData.description}</p>
                </div>
                <div className="editingReferenceList">
                    {list?.map((cardData, index) => {
                        return <WishlistCard key={index} cardData={cardData} index={index} type={props.type} cardCommands={cardCommands} />
                    })}
                </div>
            </div>
        )
    }

    useEffect(() => {
        console.log('initialized from', props.type);
        onInitialize()
    }, []);

    return (
        <div className={
                props.type === 'editing-list' ?
                    props.listActions.doesRefListExist() ?
                    'WishlistDisplay col-6' : 'WishlistDisplay col-12 alone' : 'WishlistDisplay col-6'
            }>
            {/* <h2>Display Wishlist time</h2> */}
            {props.type === 'editing-reference' && editingReferenceRender()}
            {props.type === 'editing-list' && editingListRender()}
        </div>
    );
}

export default WishlistDisplay;
