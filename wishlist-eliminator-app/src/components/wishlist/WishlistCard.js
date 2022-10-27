import { useEffect, useState } from "react";

function WishlistCard(props) {

    const [ isOpen, setIsOpen ] = useState(false)
    const [ domObject, setDomObject ] = useState(undefined)

    const clicked = e => {
        if (typeof domObject === 'undefined') {
            setDomObject(e.target.offsetParent);
        }
        if (e.target.nodeName !== 'A' && !e.target.classList.contains('game-header-icons')) {
            setIsOpen(!isOpen);
        } else if (e.target.classList.contains('game-header-icons')) {
            // console.log('action button clicked on')
            props.cardCommands.moveToOtherList(props.index)
        }
    }

    const toggleCardSize = () => {
        if (typeof domObject !== 'undefined') {
            // if (isOpen) {
            //     console.log('dom object', domObject, 'is going top open')
            // } else {
            //     console.log('dom object', domObject, 'is going to close')
            // }
            domObject.classList.toggle('WishlistCard-height');
        }
    }

    const renderGameHeader = () => {
        return (
            <div className="game-header">
                {props.type === 'editing-list' && <div className="game-header-controls">
                    <div className="material-symbols-outlined game-header-icons purchased">check_box_outline_blank</div>
                    <div className="material-symbols-outlined game-header-icons">edit</div>
                    <div className="material-symbols-outlined game-header-icons">delete</div>
                </div>}
                <div className="game-header-image">
                    <img src={props.cardData.gameImgBg} alt={props.cardData.gameName} />
                </div>
                {props.type === 'editing-reference' && <div className="game-header-controls">
                    <div className="material-symbols-outlined game-header-icons">arrow_forward</div>
                </div>}
            </div>
        )
    }

    useEffect(toggleCardSize, [isOpen])

    return (
        <div className="WishlistCard" onClick={clicked}>
            {renderGameHeader()}
            <div className="game-content">
                <div className="game-title">
                    <p>{props.index + 1}. <a href={'https://store.steampowered.com/app/' + props.cardData.gameId} title={props.cardData.gameName} target='_blank'  rel='noreferrer'>{props.cardData.gameName}</a></p>
                </div>

                <div className="gameInformation">
                    <p>{props.cardData.releaseDate}</p>
                    <p>{props.cardData.releaseDateStr}</p>
                    <p>{props.cardData.dateAddedToOgList}</p>
                    <p>{props.cardData.deckCompat}</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur minima ullam placeat provident est similique, numquam ipsum accusamus, repellendus aperiam ex, explicabo asperiores. Nisi accusantium eum eius assumenda earum esse!</p>
                </div>
            </div>
        </div>
    );
}

export default WishlistCard;
