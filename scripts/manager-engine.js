let managerRandomNames = ["Daniil Dobryakov",
                          "Stephen de Balyabe",
                          "George Humilie",
                          "Hoolee Nada",
                          "Mel Adze",
                          "Jeech Bebe",
                          "Igor Fridge",
                          "Alex Johnson"];

// HelloFromUsIncomingCall();

function CreateManager(bandID) {
    var managersBandID = bandID;

    var workflow = document.getElementById("workflow");

    var managerTile = document.createElement("div");
    managerTile.className = "tile";
    managerTile.id = "tile";
    $(managerTile).draggable({
        revert: false
    });

    var managerID = totalManagerCount;
    totalManagerCount++;
    managerInfo[managerID] = [managerRandomNames[getRandomInt(managerRandomNames.length)],
                                bandID, defaultManagerExp];
    managerCoeffs[managerID] = [(managerInfo[managerID][2] / 100), (managerInfo[managerID][2] / 2)];

    // tile style
    $(managerTile).css("color", "black");
    $(managerTile).css("background-color", "yellow");
    $(managerTile).css("border", "2px groove rgb(133, 102, 0)");
    $(managerTile).css("box-shadow", "5px 5px black");

    var managerName = document.createElement("p");
    managerName.id = "tileheader";
    managerName.innerHTML = managerInfo[managerID][0];

    var managerText = document.createElement("p");
    managerText.innerHTML = "manages " + bandInfo[bandID][0] + "<br>" +
                            "+" + managerCoeffs[managerID][0] + " per second<br>" +
                            "-$" + managerCoeffs[managerID][1] + " per second";

    managerTile.appendChild(managerName);
    managerTile.appendChild(managerText);

    workflow.appendChild(managerTile);

    setInterval(function() {
        managerText.innerHTML = "manages " + bandInfo[bandID][0] + "<br>" +
                                "+" + managerCoeffs[managerID][0] + " Promo Points per second<br>" +
                                "-$" + managerCoeffs[managerID][1] + " per second";
        money -= managerCoeffs[managerID][1];
        bandPoints[managerInfo[managerID][1]][0] += managerCoeffs[managerID][0];
        bandCoeffs[managerInfo[managerID][1]][0] += (managerCoeffs[managerID][0] / 10);
    }, 1000);
}

function ButtonAcceptDecline(type, content) {
    var button = document.createElement("div");
    button.style.margin = button.style.padding = "5px";
    button.style.position = "relative";
    button.style.textAlign = "center";
    button.style.cursor = "pointer";
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