let timeSpeed = 1000; // in ms
let totalReleasesCount = 0;
let releases = []; // [epochID, Title, Type]
let totalEpochsCount = 0;
let epochs = []; // [bandID, Name, Income, Status, Aggregator]

// ARTISTS
let totalBandCount = 0;
let bandInfo = [];   // [Name(0), Genre(1), Albums(2), Fans(3), currentEpoch(4)]
let bandPoints = []; // [Promo Points(0), Tours(1), Promo Price(2), recordAlbumPrice(3), tourPrice(4)]
let bandCoeffs = []; // [Fan+]

let defaultPPDivideCoefficient = 10;
let defaultAlbumsCount = 0;
let defaultFansCount = 0;
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


// DISTRIBUTORS & PLATFORMS
let distrosAvailable = 4;
let distroNames   = ["TWOspins", "SoundKernel", "DistroGrandpa", "Faith"];
let platformNames = ["Tomato Tunes", "BING-BANG", "Commatose", 
                     "Thesaurus", "MyPipe", "Weehaw Party"];
let distroWebsiteLines = ["<br>TWOspins - <span id='website'>twospins.com</span>",
                          "<br>SoundKernel - no information",
                          "<br>DistroGrandpa - <span id='website'>distrograndpa.cc</span>",
                          "<br>Faith - <span id='website'>faith-distribution.net</span>"];


// OTHER STUFF
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }