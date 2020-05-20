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
    var manName, experience;
    var manEmpDialog = document.createElement("div");
    manEmpDialog.className = "managerdialog";
    $(manEmpDialog).draggable({
        revert: false
    });

    var manEmpHeader = document.createElement("div");
    manEmpHeader.className = "dialogheader";
    manEmpHeader.style.backgroundColor = "rgb(133, 102, 0)";
    manEmpHeader.style.color = "white";
    manEmpHeader.innerHTML = "EMO Client Center";

    var manEmpContent = document.createElement("div");
    var textChoose = document.createElement("p");
    textChoose.innerHTML = "Choose one of your artists to let us match some candidates:<br>";

    var manEmpChooseArtistButtonSection = document.createElement("div");
    manEmpChooseArtistButtonSection.style.padding = "5px";
    manEmpChooseArtistButtonSection.style.display = "flex";

    ShowAllGroupButtons();

    manEmpContent.appendChild(textChoose);
    manEmpContent.appendChild(manEmpChooseArtistButtonSection);

    function ManEmpChooseArtistButton(bandID) {
        var button = document.createElement("div");
        button.style.border = "1px solid black";
        button.style.cursor = "pointer";
        button.style.margin = button.style.padding = "5px";
        button.onmouseover = button.onmouseout = buttonHandler;
        button.onclick = function() {
            manEmpDialog.removeChild(manEmpContent);
            manEmpDialog.removeChild(manEmpCloseButton);
            
            MatchResult();
            var employButton = new ButtonAcceptDecline("accept", "Employ");
            employButton.onclick = function() {
                CreateManager(manName, bandID, experience);
                document.body.removeChild(manEmpDialog);
            }
            var declineButton = new ButtonAcceptDecline("decline", "Decline offer");
            declineButton.onclick = function() {
                document.body.removeChild(manEmpDialog);
            }
            manEmpDialog.appendChild(employButton);
            manEmpDialog.appendChild(declineButton);
        }
        
        FillInnerHTML();
        setInterval(FillInnerHTML, 1000);

        function FillInnerHTML() {
            button.innerHTML = bandInfo[bandID][0] + "<br>" + GetFans(bandID).toFixed(0) + FansText();
        }

        function MatchResult() {
            experience = getRandomArbitrary(1, 6).toFixed(2);
            manName = managerRandomNames[getRandomInt(managerRandomNames.length)];
            
            var resultsHeader = document.createElement("p");
            resultsHeader.innerHTML = "Here are some results of matching a perfect employee for you.";

            var resultsContent = document.createElement("p");
            resultsContent.innerHTML = "Name: " + manName + 
                                       "<br>Experience: " + experience + 
                                       "<br>Wage: $" + (experience / 2).toFixed(1) + " per sec";
            manEmpDialog.appendChild(resultsHeader);
            manEmpDialog.appendChild(resultsContent);
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
        document.body.removeChild(manEmpDialog);
    }

    var managerEmploymentDialogElements = [manEmpHeader, manEmpContent, manEmpCloseButton];
    managerEmploymentDialogElements.forEach(element => manEmpDialog.appendChild(element));    
    document.body.appendChild(manEmpDialog);

    function ShowAllGroupButtons() {
        for (var i = 0; i < totalBandCount; i++) {
            manEmpChooseArtistButtonSection.appendChild(new ManEmpChooseArtistButton(i));
        }
    }   
}

function CreateManager(name, bandID, experience) {
    var workflow = document.getElementById("workflow");

    var managerTile = new DraggableElement();
    managerTile.className = "manager_tile";
    managerTile.ondrag = CurrentWindowOnTop;

    var managerID = totalManagerCount;
    totalManagerCount++;
    managerInfo[managerID] = [name, bandID, experience];
    managerCoeffs[managerID] = [(managerInfo[managerID][2] / 100), (managerInfo[managerID][2] / 2)];

    var managerName = document.createElement("p");
    managerName.id = "tileheader";
    managerName.innerHTML = managerInfo[managerID][0];

    var managerText = document.createElement("p");
    OutputManagerData();

    var managerTileElements = [managerName, managerText, ManagerButtonSection()];
    managerTileElements.forEach(element => managerTile.appendChild(element));

    workflow.appendChild(managerTile);

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
                button.onclick = ManagerBoostSkills(managerID);
                break;
            case "fire":
                button.innerHTML = "Fire";
                button.onclick = ManagerFire(managerID);
                break;
        }

        button.onmouseover = button.onmouseout = tileButtonHandlerToBlack;

        return button;
    }

    function OutputManagerData() {
        managerText.innerHTML = "manages " + bandInfo[bandID][0] + "<br>" +
                                "+" + managerCoeffs[managerID][0].toFixed(2) + " Promo Points per second<br>" +
                                "-$" + managerCoeffs[managerID][1].toFixed(2) + " per second";
    }
}

function ManagerPromoCampaign(bandID, managerID) {
    console.log("== Promo campaign ==");

    var minimumBound = managerInfo[managerID][2] * 10 * 0.2;
    var maximumBound = managerInfo[managerID][2] * 10 * 1.5;
    var campaignTime = 5 / managerInfo[managerID][2] * 20000;

    var managerPromoCampaignWindow = new DraggableElement();
    managerPromoCampaignWindow.className = "managerdialog";
    managerPromoCampaignWindow.style.zIndex = "6";

    var managerPromoHeader = document.createElement("div");
    managerPromoHeader.className = "dialogheader"
    managerPromoHeader.style.backgroundColor = "rgb(133, 102, 0)";
    managerPromoHeader.innerHTML = "Promo Campaign for " + bandInfo[bandID][0] + ", by " + managerInfo[managerID][0];

    var managerPromoInfo = document.createElement("p");
    managerPromoInfo.innerHTML = managerInfo[managerID][0] + " can guarantee you a result between " + 
                                 "<b>" + minimumBound.toFixed(1) + "</b> and " + 
                                 "<b>" + maximumBound.toFixed(2) + "</b> Promo Points.<br>" +
                                 "This campaign's preparation speed will be " + CampaignSpeed(); + ".";

    var managerPromoLog = document.createElement("p");
    managerPromoLog.style.width = "100%";
    managerPromoLog.style.border = "1px solid black";
    managerPromoLog.style.textAlign = "center";
    managerPromoLog.innerHTML = "Waiting for start...";
    
    var buttonSection = document.createElement("div");
    buttonSection.className = "tilebuttonsection";

    var startButton = new ButtonAcceptDecline("accept", "Start!");
    startButton.onclick = function() {
        PromoProcess();
    }
    buttonSection.appendChild(startButton);

    var managerPromoElements = [managerPromoHeader, managerPromoInfo, managerPromoLog, buttonSection];
    managerPromoElements.forEach(element => managerPromoCampaignWindow.appendChild(element));

    document.getElementById("workflow").appendChild(managerPromoCampaignWindow);

    function PromoProcess() {
        var timeElapsed = 0;
        var timer = setInterval(function() {
            //console.log("Doing promo for " + bandInfo[bandID][0] + ": " + timeElapsed + "%, campaign time = " + campaignTime);
            managerPromoLog.innerHTML = "Doing promo for " + bandInfo[bandID][0] + ": " + (timeElapsed / campaignTime * 100).toFixed(0) + "%";
            timeElapsed += 1000;
        }, 1000);
        setTimeout(function() {
            clearInterval(timer);
            var result = getRandomArbitrary(minimumBound, maximumBound);
            console.log("Result of the latest promo campaign: +" + result.toFixed(1) + " Promo Points");
            managerPromoLog.innerHTML = "Done! This promo campaign brought " + bandInfo[bandID][0] + " <b>+" + result.toFixed(1) + " Promo Points</b>.";
            bandPoints[bandID][0] += result;

            var closeButton = new ButtonAcceptDecline("decline", "Close");
            closeButton.onclick = function() {
                document.getElementById("workflow").removeChild(managerPromoCampaignWindow);
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
}

function ManagerBoostSkills(managerID) {
    console.log("Boosting skills is in progress, sorry!");
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