var ppDivideCoefficientBuffer = defaultPPDivideCoefficient;

function AppendBand() {
    var ppDivideCoefficient = ppDivideCoefficientBuffer;
    var coeffBuffer = 1;

    var promoLaunched = false;
    var stillNoAlbumWarning = false;
    var goSocialAlertShown = false;
    var theyGoAwayAlertShown = false;
    var revival = true;

    var tile = new DraggableElement();
    tile.draggable = true;
    tile.className = "artist_tile";

    var tileHeader = document.createElement("p");
    var tileArtistBrief = document.createElement("p");
    var tileArtistPromoData = document.createElement("p");
    tileHeader.id = "tileheader";

    var tileElements = [tileHeader, tileArtistBrief, tileArtistPromoData];
    tileElements.forEach(element => tile.appendChild(element));
    
    var bandID = totalBandCount;  
    var incomeNow = 0;  
    bandInfo[bandID] = [bandName.value, finalGenre, defaultAlbumsCount, defaultFansCount, 0];
    bandPoints[bandID] = [0, 0, promoPrice, recordAlbumPrice, tourIncome, 0];
    bandCoeffs[bandID] = [1];

    // RESET
    totalBandCount++;
    recordAlbumPrice = defaultRecordAlbumPrice;
    tourIncome = defaultTourIncome;
    tileHeader.innerHTML = bandInfo[bandID][0];
    UpdateBandData();

    // BUTTONS
    ButtonSection();

    document.getElementById("workflow").appendChild(tile);
    isbandCreatingFinished = true;

    setInterval(UpdateBandStats, GetTimeSpeed());
    setInterval(UpdateBandData, GetTimeSpeed());

    function ButtonSection() {
        var buttonSection = document.createElement("div");
        buttonSection.className = "tilebuttonsection";

        var doPromoButton = ArtistTileButton("doPromo");
        var epochsButton = ArtistTileButton("epochs");        
        var statsButton = ArtistTileButton("stats");
        var tileButtonSectionElements = [doPromoButton, epochsButton, statsButton];
        tileButtonSectionElements.forEach(element => buttonSection.appendChild(element));
        tile.appendChild(buttonSection);
    }

    function ArtistTileButton(type) {
        var button = document.createElement("div");
        button.id = "artist_tile_button";
        button.onmouseover = button.onmouseout = tileButtonHandlerToBlack;

        switch (type) {
            case "doPromo":
                button.innerHTML = "Launch Promo";
                button.onclick = function() {
                    if (!promoLaunched) {
                        promoLaunched = true;
                        button.innerHTML = "Do Promo";
                    }
                    if (money >= promoPrice) {
                        money -= promoPrice;
                        bandPoints[bandID][0]++;
                        promoPrice *= promoPriceInc;
                        UpdateBandData();
                    }
                    else {
                        if (!lackOfMoneyAlertShown) {
                            LackOfMoneyAlert();
                            lackOfMoneyAlertShown = true;
                        }
                    }
                    moneyUpdate();
                }
                break;
            case "epochs":
                button.innerHTML = "Epochs";
                button.onclick = function() {
                    EpochsWindow(bandID);
                    UpdateBandData();
                }
                break;
            case "stats":
                button.innerHTML = "Stats";
                // временно
                button.onclick = function() {
                    console.log("in progress, sorry!");
                }
                button.onmouseover = button.onmouseout = null;
                break;
        }
        
        return button;
    }

    function UpdateBandStats() {
        bandInfo[bandID][3] += bandPoints[bandID][0] / ppDivideCoefficient;
        if (bandInfo[bandID][2] >= 1) {
            incomeNow = IncomeRandomizer();
            money += incomeNow;
        }

        function IncomeRandomizer() {
            var incomeRandom = GetFans(bandID).toFixed(0) * getRandomArbitrary(0.00001, 0.001);
            return incomeRandom;
        }
    }

    function UpdateBandData() {            
        tileArtistBrief.innerHTML = "Genre: " + bandInfo[bandID][1] + 
        "<br>Albums: " + bandInfo[bandID][2] + 
        "<br>Fans: " + GetFans(bandID).toFixed(0) +
        " <span class='tilebrackets'>(" + 
        GetPromoIncr() +
        " per second)</span>";
        tileArtistPromoData.innerHTML = "Promo Points: " + bandPoints[bandID][0].toFixed(1) +
                                        "<br>Tours: " + bandPoints[bandID][1] +
                                        "<br><br>Income per sec: $" + incomeNow.toFixed(2);

        BandBasicEvents();
    }     

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
            revival = false;
            if (!theyGoAwayAlertShown) {
                TheyGoAwayAlert(bandID);                
                theyGoAwayAlertShown = true;
            }
            setInterval(FansDisengage(bandID), 1000);
        }

        // Fan stats revival
        if (bandInfo[bandID][2] >= 1 && stillNoAlbumWarning) {
            bandCoeffs[bandID][0] = coeffBuffer / 4;
            stillNoAlbumWarning = false;
            revival = true;
            RevivalAlert(bandID);
        }

        // Hello From Us
        if (bandInfo[bandID][3] >= helloFromUsFanLaunch && !helloFromUsHappened) {
            helloFromUsHappened = true;
            helloFromUsTargetID = bandID;
            HelloFromUs();
        }
    }

    function GetPromoIncr() {
        if (bandPoints[bandID][0] / 10 >= 0) {
            return "+" + (bandPoints[bandID][0] / ppDivideCoefficient).toFixed(1);
        }
        else {
            return (bandPoints[bandID][0] / ppDivideCoefficient).toFixed(1);
        }
    }

    function FansDisengage(bandID) {
        if (!revival) {
            bandPoints[bandID][0] -= 0.5;
        }
    }
}

function GetTimeSpeed() {
    return timeSpeed;
}

function GetFans(bandID) {
    return bandInfo[bandID][3];
}

function EpochsWindow(bandID) {
    var epochsWindow = new DraggableElement();
    epochsWindow.className = "epochsdialog";
    epochsWindow.style.visibility = "visible";

    var epochsHeader = document.createElement("div");
    epochsHeader.className = "dialogheader";
    epochsHeader.style.backgroundColor = "black";
    epochsHeader.style.color = "white";
    epochsHeader.innerHTML = "Epochs of " + bandInfo[bandID][0];

    var epochsContent = document.createElement("div");
    
    var epochsButtonSection = document.createElement("div");
    epochsButtonSection.style.display = "flex";
    epochsButtonSection.style.flexWrap = "wrap";
    var newEpochButton = new ButtonAcceptDecline("accept", "New Epoch");
    newEpochButton.onclick = function() {
        CreateEpochWindow();
    }
    ShowAllEpochs();

    var closeEpochsWindowButton = new ButtonAcceptDecline("decline", "Close");
    closeEpochsWindowButton.onclick = function() {
        document.getElementById("workflow").removeChild(epochsWindow);
    }
    closeEpochsWindowButton.style.width = "fit-content";

    epochsContent.appendChild(newEpochButton);
    epochsContent.appendChild(epochsButtonSection);

    var epochsWindowElements = [epochsHeader, epochsContent, closeEpochsWindowButton];
    epochsWindowElements.forEach(element => epochsWindow.appendChild(element));
    document.getElementById("workflow").appendChild(epochsWindow);

    function EpochButton(epochID) {
        var button = document.createElement("div");
        button.style.border = "1px solid black";
        button.style.cursor = "pointer";
        button.style.width = "fit-content";
        button.style.margin = button.style.padding = "5px";
        button.onmouseover = button.onmouseout = tileButtonHandlerToBlack;
        button.innerHTML = epochs[epochID][1] + "<br>" + IncomeOutput();
        button.onclick = function() {
            ShowEpoch(epochID);
        }

        function IncomeOutput() {
            if (epochs[epochID][2] >= 0) {
                return "$" + epochs[epochID][2] + " income";
            }
            else {
                return "-$" + Math.abs(epochs[epochID][2]) + " loss";
            }
        }
        return button;
    }

    function ShowAllEpochs() {
        for (var i = 0; i < epochs.length; i++) {
            if (epochs[i][0] == bandID) {
                epochsButtonSection.appendChild(new EpochButton(i));
            }
        }
    }

    function CreateEpochWindow() {
        var createEpochWindow = new DraggableElement();
        createEpochWindow.className = "epochsdialog";
        createEpochWindow.style.width = "fit-content";
        
        var epochNameText = document.createElement("p");
        epochNameText.innerHTML = "Epoch Name: ";
        var epochName = document.createElement("input");
        epochNameText.appendChild(epochName);
        createEpochWindow.appendChild(epochNameText);

        var epochNumber = totalEpochsCount;
        totalEpochsCount++;
        var createButton = new ButtonAcceptDecline("accept", "Create!");
        createButton.onclick = function() {
            epochs[epochNumber] = [bandID, epochName.value, 0, "active", "(none)"];
            document.getElementById("workflow").removeChild(createEpochWindow);
            epochsButtonSection.appendChild(new EpochButton(epochNumber));
            bandInfo[bandID][4] = epochNumber;
        }
        var closeButton = new ButtonAcceptDecline("decline", "Close");
        closeButton.onclick = function() {
            document.getElementById("workflow").removeChild(createEpochWindow);
        }
        createEpochWindow.appendChild(createButton);
        createEpochWindow.appendChild(closeButton);
        document.getElementById("workflow").appendChild(createEpochWindow);
    }

    function ShowEpoch(epochID) {
        var showEpochWindow = new DraggableElement();
        showEpochWindow.className = "epochsdialog";
        showEpochWindow.style.width = "600px";

        var showEpochHeader = document.createElement("div");
        showEpochHeader.className = "dialogheader";
        showEpochHeader.style.backgroundColor = "black";
        showEpochHeader.style.color = "white";
        showEpochHeader.innerHTML = "[" + epochs[epochID][1] + "]: " + bandInfo[epochs[epochID][0]][0] + "'s epoch";

        var showEpochContent = document.createElement("div");
        
        var showEpochInfoText = document.createElement("p");
        showEpochContent.innerHTML = "<br>Belongs to: " + bandInfo[epochs[epochID][0]][0] +
                                     "<br>Global ID: #" + epochID +
                                     "<br>Current distribution service: " + epochs[epochID][4] + " ";

        var changeDistributorButton = document.createElement("span");
        changeDistributorButton.id = "changedistributorbutton";
        changeDistributorButton.innerHTML = "Change";
        changeDistributorButton.onmouseover = function() {
            changeDistributorButton.style.backgroundColor = "black";
        }
        changeDistributorButton.onmouseout = function() {
            changeDistributorButton.style.backgroundColor = "mediumblue";
        }
        changeDistributorButton.onclick = ChangeDistributor;
        showEpochContent.append(changeDistributorButton)


        var showEpochReleases = document.createElement("div");
        var showEpochReleasesHeader = document.createElement("p");
        showEpochReleasesHeader.innerHTML = "Releases in this epoch:";
        var showEpochReleasesSection = document.createElement("div");;      
        ShowReleases();

        showEpochReleases.appendChild(showEpochReleasesHeader);
        showEpochReleases.appendChild(showEpochReleasesSection);       

        showEpochContent.appendChild(showEpochInfoText);
        showEpochContent.appendChild(showEpochReleases);

        var newReleaseButton = new ButtonAcceptDecline("accept", "New Release");
        newReleaseButton.style.position = "absolute";
        newReleaseButton.style.top = "50px";
        newReleaseButton.style.right = "10px";
        newReleaseButton.onclick = function() {
            NewRelease();
        }
        
        var closeButton = new ButtonAcceptDecline("decline", "Close");
        closeButton.onclick = function() {
            document.getElementById("workflow").removeChild(showEpochWindow);
        }
        closeButton.style.width = "fit-content";

        var showEpochElements = [showEpochHeader, showEpochContent, newReleaseButton, closeButton];
        showEpochElements.forEach(element => showEpochWindow.appendChild(element));

        document.getElementById("workflow").appendChild(showEpochWindow);

        function ShowReleases() {
            for (var i = 0; i < releases.length; i++) {
                if (releases[i][0] == epochID) {                    
                    showEpochReleasesSection.appendChild(new ReleaseButton(i));
                }
            }
        }

        function ReleaseButton(releaseID) {
            var button = document.createElement("div");
            button.style.display = "flex";
            button.style.border = "1px solid black";
            button.style.padding = "5px";
            button.style.alignContent = "center";
            button.style.width = "fit-content";
            
            var releaseName = new ReleaseTypeTag("general-release");
            releaseName.innerHTML = releases[releaseID][1];
            var releaseType = new ReleaseTypeTag(releases[releaseID][2]);

            button.appendChild(releaseName);
            button.appendChild(releaseType);

            return button;
        }

        function ReleaseTypeTag(type) {
            var tag = document.createElement("div");
            switch (type) {
                case "single":
                    tag.style.border = "2px solid aqua";
                    tag.innerHTML = "single";
                    break;
                case "album":
                    tag.style.border = "2px solid darkgreen"
                    tag.innerHTML = "album";
                    break;
                case "general-release":
                    tag.style.border = "2px solid rgba(255,0,0,0.0)";
            }
            tag.style.margin = "2px";
            tag.style.padding = "2px";
            tag.style.width = "fit-content";
            tag.style.height = "fit-content";

            return tag;
        }

        function NewRelease() {
            var releaseID = totalReleasesCount;
            var typeBuffer = "";
            var releaseCostsBuffer = 0;
            var ppIncBuffer = 0;
            var newReleaseWindow = new DraggableElement();
            newReleaseWindow.className = "epochsdialog";
            newReleaseWindow.style.zIndex = 1;

            var newReleaseHeader = document.createElement("div");
            newReleaseHeader.className = "dialogheader";
            newReleaseHeader.style.backgroundColor = "black";
            newReleaseHeader.style.color = "white";
            newReleaseHeader.innerHTML = "[" + epochs[epochID][1] + "]: Create new release";

            var newReleaseContent = document.createElement("div");
            var releaseNameText = document.createElement("p");
            releaseNameText.innerHTML = "Release Name: ";
            var releaseName = document.createElement("input");
            releaseName.value = "New Release " + releaseID;
            releaseNameText.appendChild(releaseName);
            newReleaseContent.appendChild(releaseNameText);

            var releaseTypeText = document.createElement("p");
            UpdateReleaseType();
            newReleaseContent.appendChild(releaseTypeText);

            var createButton = new ButtonAcceptDecline("accept", "Record! ($" + releaseCostsBuffer.toFixed(0) + ")");
            
            var releaseTypeButtonSection = document.createElement("div");
            releaseTypeButtonSection.style.display = "flex";
            
            var typeSingle = new ReleaseTypeTag("single");
            typeSingle.onmouseover = typeSingle.onmouseout = tileButtonHandlerToBlack;
            typeSingle.onclick = function() {
                typeBuffer = "single";
                releaseCostsBuffer = (bandPoints[bandID][3] / 4).toFixed(0);
                ppIncBuffer = 20;
                createButton.innerHTML = "Record! ($" + releaseCostsBuffer + ")";
                UpdateReleaseType();
            }
            var typeAlbum = new ReleaseTypeTag("album");
            typeAlbum.onmouseover = typeAlbum.onmouseout = tileButtonHandlerToBlack;
            typeAlbum.onclick = function() {
                typeBuffer = "album";
                releaseCostsBuffer = bandPoints[bandID][3];
                ppIncBuffer = 80;
                createButton.innerHTML = "Record! ($" + releaseCostsBuffer + ")";
                UpdateReleaseType();
            }
            releaseTypeButtonSection.appendChild(typeSingle);
            releaseTypeButtonSection.appendChild(typeAlbum);
            newReleaseContent.appendChild(releaseTypeButtonSection);

            var createOrCloseSection = document.createElement("div");
            createOrCloseSection.style.display = "flex";
            
            createButton.style.width = "fit-content";
            createButton.onclick = function() {
                if (typeBuffer != "") {
                    if (money >= releaseCostsBuffer) {
                        money = money - releaseCostsBuffer;
                        releases[releaseID] = [epochID, releaseName.value, typeBuffer];
                        document.getElementById("workflow").removeChild(newReleaseWindow);
                        showEpochReleasesSection.appendChild(new ReleaseButton(releaseID));
                        bandPoints[bandID][3] *= recordAlbumPriceInc;
                        bandPoints[bandID][0] += ppIncBuffer;
                        bandInfo[bandID][2]++;
                        totalReleasesCount++;
                    }
                    else {
                        if (!lackOfMoneyAlertShown) {
                            LackOfMoneyAlert();
                            lackOfMoneyAlertShown = true;
                        }
                    }
                    moneyUpdate();
                    HappyFan();
                }
            }

            var closeButton = new ButtonAcceptDecline("decline", "Close");
            closeButton.style.width = "fit-content";
            closeButton.onclick = function() {
                document.getElementById("workflow").removeChild(newReleaseWindow);
            }
            createOrCloseSection.appendChild(createButton);
            createOrCloseSection.appendChild(closeButton);
            newReleaseContent.appendChild(createOrCloseSection);

            newReleaseWindow.appendChild(newReleaseHeader);
            newReleaseWindow.appendChild(newReleaseContent);

            document.getElementById("workflow").appendChild(newReleaseWindow);

            function UpdateReleaseType() {
                releaseTypeText.innerHTML = "Format: " + typeBuffer;
            }            
        }

        function ChangeDistributor() {
            var changeDistributorWindow = new DraggableElement();
            changeDistributorWindow.className = "epochsdialog";
            changeDistributorWindow.style.width = "300px";

            var changeDistributorHeader = document.createElement("div");
            changeDistributorHeader.className = "dialogheader";
            changeDistributorHeader.style.backgroundColor = "black";
            changeDistributorHeader.style.color = "white";
            changeDistributorHeader.innerHTML = "Change Distributor for " + epochs[epochID][1];
            changeDistributorWindow.appendChild(changeDistributorHeader);

            var changeDistributorContent = document.createElement("div");
            changeDistributorContent.style.display = "flex";
            changeDistributorContent.style.flexWrap = "wrap";
            for (var i = 0; i < distrosAvailable; i++) {
                changeDistributorContent.appendChild(new DistributorButton(i));
            }

            changeDistributorWindow.appendChild(changeDistributorContent);

            var changeDistributorWebsites = document.createElement("div");
            var websites = document.createElement("p");
            websites.innerHTML = "Visit distributors' websites: ";
            for (var i = 0; i < distrosAvailable; i++) {
                websites.innerHTML += distroWebsiteLines[i];
            }
            changeDistributorWebsites.appendChild(websites);
            changeDistributorWindow.appendChild(changeDistributorWebsites);

            var closeButton = new ButtonAcceptDecline("decline", "Close");
            closeButton.onclick = function() {
                document.getElementById("workflow").removeChild(changeDistributorWindow);
            }
            changeDistributorWindow.appendChild(closeButton);

            document.getElementById("workflow").appendChild(changeDistributorWindow);
        }
    }
}

function DistributorButton(distroID) {
    var button = document.createElement("div");
    button.style.margin = button.style.padding = "5px";
    button.style.cursor = "pointer";
    button.style.width = "fit-content";
    button.style.border = "1px solid black";

    button.innerHTML = distroNames[distroID];
    button.onmouseout = button.onmouseover = tileButtonHandlerToBlack;
    
    return button;    
}
