function AppendBand() {
    var coeffBuffer = 1;

    var promoLaunched = false;
    var stillNoAlbumWarning = false;
    var goSocialAlertShown = false;
    var theyGoAwayAlertShown = false;

    var tile = document.createElement("div");
    tile.className = "tile";
    tile.id = "tile";
    $(tile).draggable({
        revert: false
    });
    
    var bandID = totalBandCount;
    totalBandCount++;    
    bandInfo[bandID] = ["", finalGenre, defaultAlbumsCount, defaultFansCount];
    bandPoints[bandID] = [0, 0];
    bandCoeffs[bandID] = [1];

    var bandNameText = document.createElement("p");
    bandNameText.textContent = bandInfo[bandID][0] = bandName.value;
    
    bandNameText.id = "tileheader";
    tile.appendChild(bandNameText);

    var bandGenreText = document.createElement("p");
    bandGenreText.innerHTML = "Genre: " + bandInfo[bandID][1] + 
                               "<br>Albums: " + bandInfo[bandID][2] + 
                               "<br>Fans: " + bandInfo[bandID][3];                               
    tile.appendChild(bandGenreText);

    var bandPromoDataText = document.createElement("p");
    bandPromoDataText.innerHTML = "Promo Points: " + bandPoints[bandID][0] +
                                  "<br> Tours: " + bandPoints[bandID][1];
    tile.appendChild(bandPromoDataText);

    // BUTTONS
    var buttonSection = document.createElement("div");
    buttonSection.className = "tilebuttonsection";

    
        var doPromoButton = document.createElement("div");
        doPromoButton.id = "tilebutton";
        doPromoButton.innerHTML = "Launch Promo";
        doPromoButton.onmouseover = tileButtonHandler;
        doPromoButton.onmouseout = tileButtonHandler;
        doPromoButton.onclick = function() {
            if (!promoLaunched) {
                promoLaunched = true;
                doPromoButton.innerHTML = "Do Promo";
            }
            if (money >= promoPrice) {
                money -= promoPrice;
                bandPoints[bandID][0]++;
                promoPrice *= promoPriceInc;
                UpdateBandData();
            }
        }
        buttonSection.append(doPromoButton);

        var recordAlbumButton = document.createElement("div");
        recordAlbumButton.id = "tilebutton";
        recordAlbumButton.innerHTML = "Record Album";
        recordAlbumButton.onmouseover = tileButtonHandler;
        recordAlbumButton.onmouseout = tileButtonHandler;
        recordAlbumButton.onclick = function() {
            if (money >= recordAlbumPrice) {
                money = money - recordAlbumPrice;
                bandInfo[bandID][2]++;
                bandPoints[bandID][0] += 5;     
                recordAlbumPrice *= recordAlbumPriceInc;          
                UpdateBandData();
            }
        }
        buttonSection.append(recordAlbumButton);

        var goTourButton = document.createElement("div");
        goTourButton.id = "tilebutton";
        goTourButton.innerHTML = "Go Tour";
        goTourButton.onmouseover = tileButtonHandler;
        goTourButton.onmouseout = tileButtonHandler;
        goTourButton.onclick = function() {
            if (money >= tourPrice) {
                money = money - tourPriceInc;
                bandPoints[bandID][1]++;
                bandPoints[bandID][0] += 16;
                tourPrice *= tourPriceInc;
                UpdateBandData();
            }
        }
        buttonSection.append(goTourButton);
    
    tile.append(buttonSection);    

    var workflow = document.getElementById("workflow");
    workflow.appendChild(tile);

    isbandCreatingFinished = true;

    CreateManager(bandID);    

    UpdateBandData();

    function UpdateBandStats() {
        bandInfo[bandID][3] += GetPromoIncr(bandID);
    }

    function UpdateBandData() {            
        bandGenreText.innerHTML = "Genre: " + bandInfo[bandID][1] + 
        "<br>Albums: " + bandInfo[bandID][2] + 
        "<br>Fans: " + GetFans(bandID).toFixed(5) +
        " <span class='tilebrackets'>(+" + 
        GetPromoIncr(bandID).toFixed(5) +
        " per second)</span>";
        bandPromoDataText.innerHTML = "Promo Points: " + bandPoints[bandID][0].toFixed(1) +
                                        "<br>Tours: " + bandPoints[bandID][1];

        BandBasicEvents();
    }

    setInterval(UpdateBandStats, GetTimeSpeed());
    setInterval(UpdateBandData, GetTimeSpeed());   

    function BandBasicEvents() {
        // Go Social
        if (bandInfo[bandID][3] >= 2 &&
            bandInfo[bandID][3] < 3 &&
            !goSocialAlertShown) {
            GoSocialAlert(bandID);
            goSocialAlertShown = true;
        }

        // "Don't stick around" alert
        if (bandInfo[bandID][2] == 0 && bandInfo[bandID][3] > 100 &&
            !stillNoAlbumWarning) {
            StillNoAlbumAlert(bandID);
            coeffBuffer = bandCoeffs[bandID][0];
            bandCoeffs[bandID][0] = 1.00001;
            stillNoAlbumWarning = true;
        }

        // Fans reduce due to no album
        if (bandInfo[bandID][2] == 0 && bandInfo[bandID][3] > 500) {
            if (!theyGoAwayAlertShown) {
                FansDisengage(bandID);
                theyGoAwayAlertShown = true;
            }
        }

        // Fan stats revival
        if (bandInfo[bandID][2] >= 1 && stillNoAlbumWarning) {
            bandCoeffs[bandID][0] = coeffBuffer / 4;
            stillNoAlbumWarning = false;
            RevivalAlert(bandID);
        }
    }
}

function FansDisengage(bandID) {
    bandCoeffs[bandID][0] = 0.99;
    TheyGoAwayAlert(bandID);
}

function GetTimeSpeed() {
    return timeSpeed;
}

function GetFans(bandID) {
    return bandInfo[bandID][3];
}

function GetPromoIncr(bandID) {
    return bandPoints[bandID][0] / 10;
}