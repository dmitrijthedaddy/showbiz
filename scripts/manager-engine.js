let managerRandomNames = ["Daniil Dobryakov",
                          "Stephen de Balyabe",
                          "George Humilie",
                          "Hoolee Nada",
                          "Mel Adze",
                          "Jeech Bebe",
                          "Igor Fridge",
                          "Alex Johnson",
                          "Dan Lagutenko",
                          "Artem Avetisyan"];
let happyNewManagerAlertShown = false;

function buttonHandler(event) {
    if (event.type == "mouseover") {
        event.target.style.background = "black";
        event.target.style.color = "white";
    }
    if (event.type == "mouseout") {
        event.target.style.background = null;
        event.target.style.color = "black";
    }
}

function ManagerEmployment() {
    var managerName, experience;

    var managerEmployment = {
        dialog: new DraggableElement(),
        header: document.createElement("div"),
        content: document.createElement("div"),
        textChoose: document.createElement("p"),
        chooseArtistButtonSection: document.createElement("div")
    }
    
    managerEmployment.dialog.className = "managerdialog";

    managerEmployment.header.className = "managerheader";
    managerEmployment.header.innerHTML = "EMO Client Center";

    managerEmployment.textChoose.innerHTML = "Choose one of your artists to let us match some candidates:<br>";

    managerEmployment.chooseArtistButtonSection.style.padding = "5px";
    managerEmployment.chooseArtistButtonSection.style.display = "flex";

    ShowAllGroupButtons();

    managerEmployment.content.appendChild(managerEmployment.textChoose);
    managerEmployment.content.appendChild(managerEmployment.chooseArtistButtonSection);

    function ManEmpChooseArtistButton(bandID) {
        var button = document.createElement("div");
        button.id = "manager_tile_button";
        button.onmouseover = button.onmouseout = buttonHandler;
        button.onclick = function() {
            managerEmployment.dialog.removeChild(managerEmployment.content);
            managerEmployment.dialog.removeChild(manEmpCloseButton);
            
            MatchResult();
            var employButton = new ButtonAcceptDecline("accept", "Employ");
            employButton.onclick = function() {
                CreateManager(managerName, bandID, experience);
                document.body.removeChild(managerEmployment.dialog);
            }
            var declineButton = new ButtonAcceptDecline("decline", "Decline offer");
            declineButton.onclick = function() {
                document.body.removeChild(managerEmployment.dialog);
            }
            managerEmployment.dialog.appendChild(employButton);
            managerEmployment.dialog.appendChild(declineButton);
        }
        
        FillInnerHTML();
        setInterval(FillInnerHTML, 1000);

        function FillInnerHTML() {
            button.innerHTML = bandInfo[bandID][0] + "<br>" + GetFans(bandID).toFixed(0) + FansText();
        }

        function MatchResult() {
            experience = getRandomArbitrary(1, 6).toFixed(2);
            managerName = managerRandomNames[getRandomInt(managerRandomNames.length)];
            
            var resultsHeader = document.createElement("p");
            resultsHeader.innerHTML = "Here are some results of matching a perfect employee for you.";

            var resultsContent = document.createElement("p");
            resultsContent.innerHTML = "Name: " + managerName + 
                                       "<br>Experience: " + experience + 
                                       "<br>Wage: $" + (experience / 2).toFixed(1) + " per sec";
            managerEmployment.dialog.appendChild(resultsHeader);
            managerEmployment.dialog.appendChild(resultsContent);
        }

        function FansText() {
            if (GetFans(bandID).toFixed(0) % 10 == 1) {
                return " fan";
            }
            else {
                return " fans";
            }
        }
        return button;
    }

    var manEmpCloseButton = new ButtonAcceptDecline("decline", "Close");
    manEmpCloseButton.style.width = "fit-content";
    manEmpCloseButton.onclick = function() {
        document.body.removeChild(managerEmployment.dialog);
    }

    var managerEmploymentDialogElements = [managerEmployment.header,
                                           managerEmployment.content,
                                           manEmpCloseButton];
    managerEmploymentDialogElements.forEach(element => managerEmployment.dialog.appendChild(element));    
    document.body.appendChild(managerEmployment.dialog);

    function ShowAllGroupButtons() {
        for (var i = 0; i < totalBandCount; i++) {
            managerEmployment.chooseArtistButtonSection.appendChild(new ManEmpChooseArtistButton(i));
        }
    }   
}

function CreateManager(name, bandID, experience) {
    var workflow = document.getElementById("workflow");

    var managerTile = {
        tile: new DraggableElement(),
        name: document.createElement("p"),
        text: document.createElement("p"),
        buttonSection: ManagerButtonSection()
    }

    var managerID = totalManagerCount;
    totalManagerCount++;
    managerInfo[managerID] = [name, bandID, experience];
    managerCoeffs[managerID] = [(managerInfo[managerID][2] / 100), (managerInfo[managerID][2] / 2)];

    managerTile.tile.className = "manager_tile";
    managerTile.name.id = "tileheader";
    managerTile.name.innerHTML = managerInfo[managerID][0];

    OutputManagerData();

    var managerTileElements = [managerTile.name, managerTile.text, managerTile.buttonSection];
    managerTileElements.forEach(element => managerTile.tile.appendChild(element));

    workflow.appendChild(managerTile.tile);
    if (!happyNewManagerAlertShown) {
        HappyNewManagerAlert();
        happyNewManagerAlertShown = true;
    }

    setInterval(function() {
        money -= managerCoeffs[managerID][1];
        bandPoints[managerInfo[managerID][1]][0] += managerCoeffs[managerID][0];
        bandCoeffs[managerInfo[managerID][1]][0] += (managerCoeffs[managerID][0] / 10);
    }, 1000);

    function ManagerButtonSection() {
        var section = document.createElement("div");
        section.className = "tilebuttonsection";

        var promoCampaign = ManagerButton("promoCampaign");
        var boostSkills = ManagerButton("boostSkills");
        var fire = ManagerButton("fire");

        var buttons = [promoCampaign, boostSkills, fire];
        buttons.forEach(element => section.appendChild(element));

        return section;
    }

    function ManagerButton(type) {
        var button = document.createElement("div");
        button.id = "manager_tile_button";

        switch (type) {
            case "promoCampaign":
                button.innerHTML = "Promo Campaign";
                button.onclick = function() {
                    ManagerPromoCampaign(bandID, managerID);
                }
                break;
            case "boostSkills":
                button.innerHTML = "Boost Skills";
                button.onclick = function() { 
                    ManagerBoostSkills(managerID);
                }
                break;
            case "fire":
                button.innerHTML = "Fire";
                button.onclick = function() {
                    ManagerFire(managerID);
                }
                break;
        }

        button.onmouseover = button.onmouseout = tileButtonHandlerToBlack;

        return button;
    }

    function OutputManagerData() {
        managerTile.text.innerHTML = "manages " + bandInfo[bandID][0] + "<br>" +
                                     "+" + managerCoeffs[managerID][0].toFixed(2) + " Promo Points per second<br>" +
                                     "-$" + managerCoeffs[managerID][1].toFixed(2) + " per second";
    }
}

function ManagerPromoCampaign(bandID, managerID) {
    console.log("== Promo campaign ==");

    var campaignPrice = (managerInfo[managerID][2] * 1000).toFixed(0);
    var campaignEfficiency = 0;
    var campaignSharpness = 0;

    var minimumBound = managerInfo[managerID][2] * 10 * 0.2;
    var maximumBound = managerInfo[managerID][2] * 10 * 1.5;
    var campaignTime = 5 / managerInfo[managerID][2] * 20000;

    var managerPromo = {
        window: new DraggableElement(),
        header: document.createElement("div"),
        setupHeader: document.createElement("p"),
        campaignSetup: new CampaignSetupTable(),
        summary: document.createElement("p"),
        log: document.createElement("p")
    }
    
    managerPromo.window.className = "managerdialog";

    managerPromo.header.className = "managerheader";
    managerPromo.header.innerHTML = "Promo Campaign for " + bandInfo[bandID][0] + ", by " + managerInfo[managerID][0];

    managerPromo.setupHeader.innerHTML = "Campaign setup:";
    managerPromo.campaignSetup = new CampaignSetupTable();
    UpdateSummary();

    managerPromo.log.id = "campaignlog"
    managerPromo.log.innerHTML = "Waiting for start...";
    
    var buttonSection = document.createElement("div");
    buttonSection.className = "tilebuttonsection";

    var startButton = new ButtonAcceptDecline("accept", "Start! ($" + campaignPrice + ")");
    startButton.onclick = function() {
        if (money >= campaignPrice) {
            money -= campaignPrice;
            PromoProcess();
        }
    }
    buttonSection.appendChild(startButton);

    var managerPromoElements = [managerPromo.header, managerPromo.setupHeader, managerPromo.campaignSetup, 
                                managerPromo.summary, managerPromo.log, buttonSection];
    managerPromoElements.forEach(element => managerPromo.window.appendChild(element));

    document.getElementById("workflow").appendChild(managerPromo.window);

    function PromoProcess() {
        var timeElapsed = 0;
        var timer = setInterval(function() {
            //console.log("Doing promo for " + bandInfo[bandID][0] + ": " + timeElapsed + "%, campaign time = " + campaignTime);
            managerPromo.log.innerHTML = "Doing promo for " + bandInfo[bandID][0] + ": " + (timeElapsed / campaignTime * 100).toFixed(0) + "%";
            timeElapsed += 1000;
        }, 1000);
        setTimeout(function() {
            clearInterval(timer);
            var result = getRandomArbitrary(minimumBound, maximumBound);
            console.log("Result of the latest promo campaign: +" + result.toFixed(1) + " Promo Points");
            managerPromo.log.innerHTML = "Done! This promo campaign brought " + bandInfo[bandID][0] + " <b>+" + result.toFixed(1) + " Promo Points</b>.";
            bandPoints[bandID][0] += result;

            var closeButton = new ButtonAcceptDecline("decline", "Close");
            closeButton.onclick = function() {
                document.getElementById("workflow").removeChild(managerPromo.window);
            }
            buttonSection.appendChild(closeButton);

        }, campaignTime)
    }

    function CampaignSpeed() {
        if ((campaignTime / 20000) >= 3.5) {
            return "<span id='slowcampaign'>slow</span>";
        }
        else if ((campaignTime / 20000) < 3.5 && (campaignTime / 20000) >= 1) {
            return "<span id='mediumcampaign'>medium</span>";
        }
        else {
            return "<span id='fastcampaign'>fast</span>"
        }
    }

    function CampaignSetupTable() {
        var campaignSetupTable = document.createElement("table");

        var efficiencyRow = document.createElement("tr");
        
        var eRHeader = document.createElement("td");
        eRHeader.innerHTML = "Efficiency"
        efficiencyRow.append(eRHeader);        
        var decreaseEfficiency = new DecreaseIncreaseButton("decrease", "efficiency");
        var efficiencyDisplay = document.createElement("td");
        efficiencyDisplay.innerHTML = campaignEfficiency;
        var increaseEfficiency = new DecreaseIncreaseButton("increase", "efficiency");

        var efficiencyRowColumns = [eRHeader, decreaseEfficiency, efficiencyDisplay, increaseEfficiency];
        efficiencyRowColumns.forEach(element => efficiencyRow.append(element));


        var sharpnessRow = document.createElement("tr");

        var sRHeader = document.createElement("td");
        sRHeader.innerHTML = "Sharpness";
        sharpnessRow.append(sRHeader);
        var decreaseSharpness = new DecreaseIncreaseButton("decrease", "sharpness");
        var sharpnessDisplay = document.createElement("td");
        sharpnessDisplay.innerHTML = campaignSharpness;
        var increaseSharpness = new DecreaseIncreaseButton("increase", "sharpness");

        var sharpnessRowColumns = [sRHeader, decreaseSharpness, sharpnessDisplay, increaseSharpness];
        sharpnessRowColumns.forEach(element => sharpnessRow.append(element));

        campaignSetupTable.append(efficiencyRow);
        campaignSetupTable.append(sharpnessRow);

        return campaignSetupTable;

        function DecreaseIncreaseButton(type, parameter) {
            var button = document.createElement("div");
            button.id = "manager_tile_button";

            switch (type) {
                case "increase":
                    button.innerHTML = "+";
                    break;
                case "decrease":
                    button.innerHTML = "-";
                    break;
            }

            button.onclick = function() {
                switch (type) {
                    case "increase":
                            switch (parameter) {
                                case "efficiency":
                                    if (campaignEfficiency < 3) {
                                        minimumBound += managerInfo[managerID][2] * 1.1;
                                        maximumBound += managerInfo[managerID][2] * 1.1;
                                        campaignEfficiency++;

                                        campaignPrice *= 1.1;

                                        efficiencyDisplay.innerHTML = campaignEfficiency;
                                    }
                                    break;
                                case "sharpness":
                                    if (campaignSharpness < 3) {
                                        minimumBound += managerInfo[managerID][2] * 1.1;
                                        maximumBound -= managerInfo[managerID][2] * 1.1;
                                        campaignSharpness++;

                                        campaignPrice *= 1.15;

                                        sharpnessDisplay.innerHTML = campaignSharpness;
                                    }
                                    break;
                            }
                        break;
                    case "decrease":
                            switch (parameter) {
                                case "efficiency":
                                    if (campaignEfficiency > -3) {
                                        minimumBound -= managerInfo[managerID][2] * 1.1;
                                        maximumBound -= managerInfo[managerID][2] * 1.1;
                                        campaignEfficiency--;

                                        campaignPrice *= 0.9;

                                        efficiencyDisplay.innerHTML = campaignEfficiency;
                                    }
                                    break;
                                    case "sharpness":
                                        if (campaignSharpness > -3) {
                                            minimumBound -= managerInfo[managerID][2] * 1.1;
                                            maximumBound += managerInfo[managerID][2] * 1.1;
                                            campaignSharpness--;

                                            campaignPrice *= 0.95;
    
                                            sharpnessDisplay.innerHTML = campaignSharpness;
                                        }
                                        break;                                                                        
                            }
                        if (minimumBound <= 0) {
                            minimumBound = 0;       
                        }

                        if (maximumBound <= 0) {
                            minimumBound = 0;
                        }
                        break;
                }

                UpdateSummary();
                startButton.innerHTML = "Start! ($" + campaignPrice.toFixed(0) + ")";
            }

            return button;
        }

        
    }

    function UpdateSummary() {
        managerPromo.summary.innerHTML =  "Result guaranteed: " + 
        "between <b>" + minimumBound.toFixed(1) + "</b> and " + 
        "<b>" + maximumBound.toFixed(2) + "</b> Promo Points.<br>" +
        "Campaign speed: " + CampaignSpeed() + ".";
    }
}

function ManagerBoostSkills(managerID) {
    console.log("Boosting skills is in progress, sorry!");
    var managerBoostSkills = {
        window: new DraggableElement(),
        header: document.createElement("div"),
        text: document.createElement("p"),
        courseButtons: [document.createElement("div"), document.createElement("div"), document.createElement("div")]
    }

    managerBoostSkills.window = new DraggableElement();
    managerBoostSkills.window.className = "managerdialog";

    managerBoostSkills.header = document.createElement("div");
    managerBoostSkills.header.className = "managerheader";
    managerBoostSkills.header.innerHTML = "Boost skills menu [" + managerInfo[managerID][0] + "]";
    
    managerBoostSkills.text = document.createElement("p");
    managerBoostSkills.text.innerHTML = "Choose one from available courses:";

    for (var i = 0; i < 3; i++) {
        managerBoostSkills.courseButtons[i].innerHTML = "Random course";
        managerBoostSkills.courseButtons[i].id = "manager_tile_button";
        managerBoostSkills.courseButtons[i].style.width = "fit-content";
        managerBoostSkills.courseButtons[i].onmouseover = managerBoostSkills.courseButtons[i].onmouseout = tileButtonHandlerToBlack;
    }

    managerBoostSkills.window.append(managerBoostSkills.header);
    managerBoostSkills.window.append(managerBoostSkills.text);

    managerBoostSkills.courseButtons.forEach(element => managerBoostSkills.window.append(element));

    document.getElementById("workflow").appendChild(managerBoostSkills.window);
}

function ManagerFire(managerID) {
    console.log("Firing is in progress, sorry!");
}

function ButtonAcceptDecline(type, content) {
    var button = document.createElement("div");
    button.id = "acceptdeclinebutton"
    var defaultColor = "black";

    switch(type) {
        case "accept":
            button.style.border = "1px solid darkgreen";
            button.innerHTML = content;
            button.onmouseover = function() {
                button.style.backgroundColor = "green";
                button.style.color = "white";
            }
            button.onmouseout = function() {
                button.style.backgroundColor = null;
                button.style.color = defaultColor;
            }
            break;
        case "decline":
            button.innerHTML = content;
            button.style.border = "1px solid darkred";
            button.onmouseover = function() {
                button.style.backgroundColor = "red";
                button.style.color = "white";
            }
            button.onmouseout = function() {
                button.style.backgroundColor = null;
                button.style.color = defaultColor;
            }
            break;
    }
    return button;
}