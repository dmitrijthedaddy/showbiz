let managerRandomNames = ["Daniil Dobryakov",
                          "Stephen de Balyabe",
                          "George Humilie",
                          "Hoolee Nada",
                          "Mel Adze",
                          "Jeech Bebe",
                          "Igor Fridge",
                          "Alex Johnson"];

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
    manEmpDialog.className = "manageremploymentdialog";
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

    var managerTile = document.createElement("div");
    managerTile.className = "manager_tile";
    $(managerTile).draggable({
        revert: false
    });
    managerTile.ondrag = CurrentWindowOnTop;

    var managerID = totalManagerCount;
    totalManagerCount++;
    managerInfo[managerID] = [name, bandID, experience];
    managerCoeffs[managerID] = [(managerInfo[managerID][2] / 100), (managerInfo[managerID][2] / 2)];

    // tile style
    $(managerTile).css( {"color": "black", 
                         "background-color": "yellow", 
                         "border": "2px groove rgb(133, 102, 0)", 
                         "box-shadow": "5px 5px black"} );

    var managerName = document.createElement("p");
    managerName.id = "tileheader";
    managerName.innerHTML = managerInfo[managerID][0];

    var managerText = document.createElement("p");
    OutputManagerData();
    managerTile.appendChild(managerName);
    managerTile.appendChild(managerText);

    workflow.appendChild(managerTile);

    setInterval(function() {
        money -= managerCoeffs[managerID][1];
        bandPoints[managerInfo[managerID][1]][0] += managerCoeffs[managerID][0];
        bandCoeffs[managerInfo[managerID][1]][0] += (managerCoeffs[managerID][0] / 10);
    }, 1000);

    function OutputManagerData() {
        managerText.innerHTML = "manages " + bandInfo[bandID][0] + "<br>" +
                                "+" + managerCoeffs[managerID][0].toFixed(2) + " Promo Points per second<br>" +
                                "-$" + managerCoeffs[managerID][1].toFixed(2) + " per second";
    }
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