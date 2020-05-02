let timeSpeed = 1000; // in ms

// ARTISTS
let totalBandCount = 0;
let bandInfo = [];
let bandPoints = []; // [Promo Points, Tours, Promo Price, recordAlbumPrice, tourPrice]
let bandCoeffs = []; // [Fan+]

let defaultAlbumsCount = 0;
let defaultFansCount = 1;
let money = 10000;
let defaultRecordAlbumPrice = 1000
let defaultTourIncome = 10000;

let promoPrice = 50, promoPriceInc = 1.2;
let recordAlbumPrice = defaultRecordAlbumPrice, recordAlbumPriceInc = 1.9, albumIncome = 2;
let tourPrice = 100000, tourPriceInc = 2.5, tourIncome = defaultTourIncome;

// MANAGERS
let totalManagerCount = 0;
let managerInfo = []; // [Name, BandID, Exp]
let managerCoeffs = []; // [PP+, money-]

let defaultManagerExp = 1;


// OTHER STUFF
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}