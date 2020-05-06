var bandName = document.createElement("input");
var bandNameLabel = document.createElement("p");
var genreName = document.createElement("input");
var genreNameLabel = document.createElement("div");
var genreConstructor;

var dialog;
var displayBuffs;
var isbandCreatingFinished;
var lackOfMoneyAlertShown = false;
var prefix = "", root = "", postfix = "", finalGenre = "";
var effectsChoose = ["", "", ""];
var effectsDisplay = ["", ""];

function CurrentWindowOnTop(event) {
    let allDivs = document.getElementsByTagName("div");
    for (var i = 0; i < allDivs.length; i++) {
        allDivs[i].style.zIndex = 0;
    }
    event.target.style.zIndex = 1;
}

function tileButtonHandler(event) {
    if (event.type == "mouseover") {
        event.target.style.background = "black"
    }
    if (event.type == "mouseout") {
        event.target.style.background = null;
    }
}

function tileButtonHandlerToBlack(event) {
    if (event.type == "mouseover") {
        event.target.style.background = "black"
        event.target.style.color = "white";
    }
    if (event.type == "mouseout") {
        event.target.style.background = null;
        event.target.style.color = "black";
    }
}

$(".dialog").draggable({
    revert: false
});

$(".tile").draggable({
    revert: false
})

var isNewBandDialogOpened = false;

function createNewbandDialog() {
    var body = document.body;
    isbandCreatingFinished = false;

    var dialog = document.createElement("div");
    dialog.className = "dialog";
    dialog.id = "dialog";
    $(dialog).css("height", "content-fit");
    
    var dialogHeader = document.createElement("div");
    dialogHeader.className = "dialogheader";
    dialogHeader.innerHTML = "Create new artist!";

    var dialogOKButton = new CreateBandDialogButton();
    dialogOKButton.innerHTML = "Create!";
    dialogOKButton.onclick = function() {
        AppendBand();
        isbandCreatingFinished = true;
        dialog.style.visibility = "hidden";
        body.removeChild(dialog);
        dialog = null;
        isNewBandDialogOpened = false;
    }
    var closeButton = new CreateBandDialogButton();
    closeButton.innerHTML = "Close";
    closeButton.onclick = function() {
        body.removeChild(dialog);
        dialog = null;
        isNewBandDialogOpened = false;
    }

    function CreateBandDialogButton() {
        var button = document.createElement("div");
        button.id = "dialogbutton";
        button.style.textAlign = "center";
        button.style.margin = button.style.padding = "5px";
        button.onmouseover = function(event) {
            event.target.style.background = "black"
            event.target.style.color = "white";
        }
        button.onmouseout = function(event) {
            event.target.style.background = null;
            event.target.style.color = "black";
        }
        return button;
    }
    
    dialog.appendChild(dialogHeader);


    var genreConstructor = new GenreConstructor();
    bandNameLabel.innerHTML = "Artist Name  "
    dialog.append(bandNameLabel);
    bandNameLabel.append(bandName);
    dialog.append(genreConstructor);

    finalGenre = prefix + " " + root + " " + postfix;
    setInterval(function() {
        finalGenre = prefix + " " + root + " " + postfix;
    }, 10);

    var displayFinalGenre = document.createElement("p");
    setInterval(function() {
        displayFinalGenre.innerHTML = "You chose: " + finalGenre;
    }, 10);
    dialog.appendChild(displayFinalGenre);

    displayBuffs = document.createElement("p");
    UpdateBuffs;
    dialog.appendChild(displayBuffs);
    setInterval(UpdateBuffs, 10);
    
    var buttonSection = document.createElement("p");
    buttonSection.style.display = "flex";
    buttonSection.appendChild(dialogOKButton);    
    buttonSection.appendChild(closeButton);
    dialog.appendChild(buttonSection);

    if (!isNewBandDialogOpened) {
        body.appendChild(dialog);
        prefix = "";
        root = "";
        postfix = "";
        effectsDisplay = ["", ""];
        dialog.style.visibility = "visible";
        isNewBandDialogOpened = true;
    }
}

function UpdateBuffs() {
    displayBuffs.innerHTML = effectsDisplay[0] + effectsDisplay[1];
}

function prefixButtonHandler(event) {
    if (event.type == "mouseover") {
        event.target.style.background = "black"
        event.target.style.color = "white";
    }
    if (event.type == "click") {
        event.target.style.background = "black";
        event.target.style.color = "white";
        var content = event.target.innerHTML;
        switch (content) {
            case "lo-fi":
                recordAlbumPrice = 0;
                effectsDisplay[0] = content + ":<br>"+
                                    "--  Promo<br>" +
                                    "Album recording costs NOTHING!<br><br>";
                break;
            case "kalyan":
                recordAlbumPrice = defaultRecordAlbumPrice;
                effectsDisplay[0] = content + ":<br>" +
                                    "+++ Fans<br>" +
                                    "Albums are less efficient<br><br>";
                break;
            case "post":
                recordAlbumPrice = defaultRecordAlbumPrice;
                effectsDisplay[0] = content + ":<br>" +
                                    "??? unknown effects<br><br>"
                break;
        }       
        prefix = content;
        UpdateBuffs;
    }
    if (event.type == "mouseout") {
        event.target.style.color = "black";
        event.target.style.background = null;
    }
}

function rootButtonHandler(event) {
    if (event.type == "mouseover") {
        event.target.style.background = "black"
        event.target.style.color = "white";
    }
    if (event.type == "click") {
        event.target.style.background = "black";
        event.target.style.color = "white";
        var content = event.target.innerHTML;
        switch (content) {
            case "hip-hop":
                    tourIncome = 30000;
                    effectsDisplay[1] = content + ":<br>" +
                                        "+   Fans<br>" +
                                        "++  Tour revenue<br>" +
                                        "--- Album recording time<br><br>";
                    break;
                case "rock":
                    tourIncome = 20000;
                    effectsDisplay[1] = content + ":<br>" +
                                        "+   Tour revenue<br>" +
                                        "-   Album recording time<br><br>"
                    break;
                case "pop":
                    tourIncome = 40000;
                    effectsDisplay[1] = content + ":<br>" +
                                        "+++ Fans<br>" +
                                        "+++ Tour revenue<br>" +
                                        "you'll win the game anyway, but it'll be quite dull<br><br>";
                    break;
                case "jazz":
                    tourIncome = defaultTourIncome;
                    effectsDisplay[1] = content + ":<br>" +
                                        "-   Fans<br>" +
                                        "++  Album recording time<br><br>";
                    break;
        }
        root = content;
        
        UpdateBuffs;
    }
    if (event.type == "mouseout") {
        event.target.style.color = "black";
        event.target.style.background = null;
    }
}

function postfixButtonHandler(event) {
    if (event.type == "mouseover") {
        event.target.style.background = "black"
        event.target.style.color = "white";
    }
    if (event.type == "click") {
        event.target.style.background = "black";
        event.target.style.color = "white";
        postfix = event.target.innerHTML;
        UpdateBuffs;
    }
    if (event.type == "mouseout") {
        event.target.style.color = "black";
        event.target.style.background = null;
    }
}

function GenreConstructor() {
    var genreConstructor = document.createElement("div");

    var genrePrefixes = document.createElement("div");
    genrePrefixes.style.display = "flex";

    var genrePrefix1 = new ConstructorButton("lo-fi", "prefix");
    var genrePrefix2 = new ConstructorButton("kalyan", "prefix");
    var genrePrefix3 = new ConstructorButton("post", "prefix");

    genrePrefixes.append(genrePrefix1);
    genrePrefixes.append(genrePrefix2);
    genrePrefixes.append(genrePrefix3);

    var genreRoots = document.createElement("div");
    genreRoots.style.display = "flex";

    var genreRoot1 = new ConstructorButton("hip-hop", "root");
    var genreRoot2 = new ConstructorButton("rock", "root");
    var genreRoot3 = new ConstructorButton("pop", "root");
    var genreRoot4 = new ConstructorButton("jazz", "root");

    genreRoots.append(genreRoot1);
    genreRoots.append(genreRoot2);
    genreRoots.append(genreRoot3);
    genreRoots.append(genreRoot4);

    var genrePostfixes = document.createElement("div");
    genrePostfixes.style.display = "flex";

    var genrePostfix1 = new ConstructorButton("revival", "postfix");
    var genrePostfix2 = new ConstructorButton("wave", "postfix");
    var genrePostfix3 = new ConstructorButton("punk", "postfix");

    genrePostfixes.append(genrePostfix1);
    genrePostfixes.append(genrePostfix2);
    genrePostfixes.append(genrePostfix3);

    genreConstructor.append(genrePrefixes);
    genreConstructor.append(genreRoots);
    genreConstructor.append(genrePostfixes);

    return genreConstructor;
}

function ConstructorButton(content, buttonType) {
    var type = buttonType;
    var button = document.createElement("div");
    $(button).css( {padding: "5px", margin: "5px"} );
    $(button).css("position", "relative");
    $(button).css( {width: "fit-content", height: "fit-content"} );
    $(button).css("text-align", "center");
    $(button).css("border", "1px groove darkviolet");
    $(button).css("cursor", "pointer");
    button.innerHTML = content;
    switch (type) {
        case "prefix":    
            button.onclick = button.onmouseover = button.onmouseout = prefixButtonHandler;                 
            break;
        case "root":
            button.onclick = button.onmouseover = button.onmouseout = rootButtonHandler;            
            break;
        case "postfix":
            button.onclick = button.onmouseover = button.onmouseout = postfixButtonHandler;
            break;
        default:
            prefix = button.innerHTML;
            break;            
    }

    UpdateBuffs;
    return button;
}

function HelloFromUsIncomingCall() {
    var helloFromUsIncomingCall = document.createElement("div");
    helloFromUsIncomingCall.className = "alert";
    helloFromUsIncomingCall.style.backgroundColor = "yellow";

    var alertHeader = document.createElement("p");
    alertHeader.id = "alertheader";
    alertHeader.innerHTML = "1 new e-mail";
    var alertContent = document.createElement("p");
    alertContent.id = "alertcontent";
    alertContent.innerHTML = "from Unknown";

    var buttonSection = document.createElement("div");
    buttonSection.style.display = "flex";

    var accept = new ButtonAcceptDecline("accept", "Open");
    var decline = new ButtonAcceptDecline("decline", "Move to Spam");

    accept.onclick = function() {
        notifications.removeChild(helloFromUsIncomingCall);
        document.getElementById("workflow").appendChild(MailWindow("HelloFromUs"));        
    }
    decline.onclick = function() {
        notifications.removeChild(helloFromUsIncomingCall);
    }

    buttonSection.appendChild(accept);
    buttonSection.appendChild(decline);

    helloFromUsIncomingCall.appendChild(alertHeader);
    helloFromUsIncomingCall.appendChild(alertContent);
    helloFromUsIncomingCall.appendChild(buttonSection);

    notifications.appendChild(helloFromUsIncomingCall);
}


function MailWindow(event) {
    var mailWindow = document.createElement("div");
    document.getElementById("workflow").appendChild(mailWindow);
    mailWindow.className = "dialog";
    mailWindow.style.zIndex = "2";
    mailWindow.style.padding = "5px";
    mailWindow.style.visibility = "visible";
    mailWindow.style.width = "500px";
    mailWindow.style.top = "200px";
    mailWindow.style.left = "500px";

    var mailHeader = document.createElement("div");
    mailHeader.className = "dialogheader";
    mailWindow.appendChild(mailHeader);

    var closeMailWindow = new ButtonAcceptDecline("decline", "Close letter");    
    
    switch (event) {
        case "HelloFromUs":
            mailHeader.innerHTML = "Mail message from Unknown";
            mailWindow.appendChild(new MailContent("themostsecrethuman@intheworld.wow",
                                                 helloFromUsText[0]));
            closeMailWindow.onclick = function() {
                document.getElementById("workflow").removeChild(mailWindow);
                document.getElementById("employmanagerbutton").style.visibility = "visible";
                bandPoints[helloFromUsTargetID][0] += 2;
            }            
            break;
        default:
            mailHeader.innerHTML = "Init mail";
            break;
    }  
    mailWindow.appendChild(closeMailWindow);
}

function MailContent(sender, content) {
    var dialog = document.createElement("div");

    var senderData = document.createElement("p");
    senderData.innerHTML = "from: " + sender;
    senderData.style.fontWeight = "bold";

    var mailContent = document.createElement("p");
    mailContent.innerHTML = content;

    dialog.appendChild(senderData);
    dialog.appendChild(mailContent);

    return dialog;    
}

function closeDialog() {
    if (isbandCreatingFinished) {
        $(dialog).css("visibility", "hidden");
    }
}