function AppendBand() {
    var localTimeSpeed = timeSpeed;
    var goSocialAlertShown = false;
    var coeffBuffer = 1;

    var stillNoAlbumWarning = false;
    
    var tile = document.createElement("div");
    tile.className = "tile";
    tile.id = "tile";
    $(tile).draggable({
        revert: false
    });
    
    totalBandCount++;
    var bandID = totalBandCount;
    bandInfo[bandID] = ["", genreName.value, defaultAlbumsCount, defaultFansCount];
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
        doPromoButton.innerHTML = "Do Promo";
        doPromoButton.onmouseover = tileButtonHandler;
        doPromoButton.onmouseout = tileButtonHandler;
        doPromoButton.onclick = function() {
            if (money >= promoPrice) {
                money -= promoPrice;
                bandCoeffs[bandID][0] = bandCoeffs[bandID][0] + 0.0001;
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
                bandCoeffs[bandID][0] += 0.0005;
                bandInfo[bandID][2]++;
                bandPoints[bandID][0] += 4;     
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
                bandCoeffs[bandID][0] += 0.0016;
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

    CreateManager(bandID);

    function UpdateBandStats() {
        bandInfo[bandID][3] = bandInfo[bandID][3] * bandCoeffs[bandID][0];
    }

    function UpdateBandData() {            
        bandGenreText.innerHTML = "Genre: " + bandInfo[bandID][1] + 
        "<br>Albums: " + bandInfo[bandID][2] + 
        "<br>Fans: " + bandInfo[bandID][3].toFixed(0);
        bandPromoDataText.innerHTML = "Promo Points: " + bandPoints[bandID][0].toFixed(1) +
                                        "<br>Tours: " + bandPoints[bandID][1];

        if (bandInfo[bandID][3] >= 2 && 
            bandInfo[bandID][3] < 3 &&
            !goSocialAlertShown) {
            GoSocialAlert(bandID);
            goSocialAlertShown = true;
        }

        if (bandInfo[bandID][2] == 0 && bandInfo[bandID][3] > 100 && 
            !stillNoAlbumWarning) {
            StillNoAlbumAlert(bandID);
            coeffBuffer = bandCoeffs[bandID][0];
            bandCoeffs[bandID][0] = 1.00001;
            stillNoAlbumWarning = true;
        }

        if (bandInfo[bandID][2] == 0 && bandInfo[bandID][3] > 500) {
            FansDisengage(bandID);
        }

        if (bandInfo[bandID][2] >= 1 && stillNoAlbumWarning) {
            bandCoeffs[bandID][0] = coeffBuffer;
            stillNoAlbumWarning = false;
            RevivalAlert(bandID);
        }
    }

    setInterval(function() {
        localTimeSpeed = timeSpeed;
    }, 10);

    setInterval(UpdateBandStats, localTimeSpeed * 1.5);
    setInterval(UpdateBandData, localTimeSpeed);
    closeDialog();
}

function FansDisengage(bandID) {
    bandCoeffs[bandID][0] = 0.999;
    TheyGoAwayAlert(bandID);
}