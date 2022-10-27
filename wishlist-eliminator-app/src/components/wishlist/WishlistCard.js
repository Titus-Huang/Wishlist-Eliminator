
function WishlistCard(props) {

    const backgroundImg = {
        // backgroundImage: `url(${props.cardData.gameImgBg})`,
        // backgroundSize: '100%',
        // backgroundRepeat: 'no-repeat',
        backgroundColor: '#224',
        color: 'white'
    }
    
    // https://code.tutsplus.com/tutorials/how-to-code-a-random-color-generator-in-javascript--cms-39861
    function randomInteger(max) {
        return Math.floor(Math.random()*(max + 1));
    }
    function randomRgbColor() {
        let r = randomInteger(255);
        let g = randomInteger(255);
        let b = randomInteger(255);
        return [r,g,b];
    }
    // https://awik.io/determine-color-bright-dark-using-javascript/
    function brightnessChecker(r, g, b) {
        let hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
        );
        
        // Using the HSP value, determine whether the color is light or dark
        if (hsp > 127.5) return '#000';
        else return '#FFF';
    }
    let fontColour = ''
    function randomHexColor() {
        let [r,g,b] = randomRgbColor();
        fontColour = brightnessChecker(r, g, b)
        let hr = r.toString(16).padStart(2, '0');
        let hg = g.toString(16).padStart(2, '0');
        let hb = b.toString(16).padStart(2, '0');
        return "#" + hr + hg + hb;
    }

    const backgroundColor = {
        backgroundColor: `${randomHexColor()}`,
        color: fontColour
    }

    return (
        <div className="WishlistCard" style={backgroundImg}>
            <div className="game-header-image">
                <img src={props.cardData.gameImgBg} alt={props.cardData.gameName} />
            </div>
            <div className="gameTitle">
                <p>{props.index + 1}. <a href={'https://store.steampowered.com/app/' + props.cardData.gameId}>{props.cardData.gameName}</a></p>

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
