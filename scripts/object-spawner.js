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
    event.target.style.zIndex = "" + ++maxZIndex;
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

var isNewBandDialogOpened = false;
var constructorSubstractors = [0, 0, 0];

function createNewbandDialog() {
    ppDivideCoefficientBuffer = 10;
    console.log("Current DivideCoefficientBuffer = " + ppDivideCoefficientBuffer);
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
    ppDivideCoefficientBuffer = 10 + constructorSubstractors[0] + constructorSubstractors[1] + constructorSubstractors[2];
}

function prefixButtonHandler(event) {
    if (event.type == "mouseover") {
        event.target.style.background = "rgb(0, 144, 205)";
        event.target.style.color = "white";
    }
    if (event.type == "click") {
        event.target.style.background = "black";
        event.target.style.color = "white";
        var content = event.target.innerHTML;
        switch (content) {
            case "lo-fi":
                recordAlbumPrice = 0;
                constructorSubstractors[0] = 0;
                effectsDisplay[0] = content + ":<br>"+
                                    "--  Promo<br>" +
                                    "Album recording costs NOTHING!<br><br>";
                break;
            case "kalyan":
                recordAlbumPrice = defaultRecordAlbumPrice * 2;
                constructorSubstractors[0] = -3;
                effectsDisplay[0] = content + ":<br>" +
                                    "+++ Fans<br>" +
                                    "Albums are less efficient<br><br>";
                break;
            case "post":
                recordAlbumPrice = defaultRecordAlbumPrice;
                constructorSubstractors[0] = getRandomArbitrary(0, 2) * getRandomArbitrary(-1, 2).toFixed(0);
                effectsDisplay[0] = content + ":<br>" +
                                    "??? unknown effects<br><br>"
                break;
        }       
        prefix = content;
        UpdateBuffs();
        console.log("Current DivideCoefficientBuffer = " + ppDivideCoefficientBuffer);
    }
    if (event.type == "mouseout") {
        event.target.style.color = "black";
        event.target.style.background = null;
    }
}

function rootButtonHandler(event) {
    if (event.type == "mouseover") {
        event.target.style.background = "rgb(205, 0, 205)"
        event.target.style.color = "white";
    }
    if (event.type == "click") {
        event.target.style.background = "black";
        event.target.style.color = "white";
        var content = event.target.innerHTML;
        switch (content) {
            case "hip-hop":
                    tourIncome = 30000;
                    constructorSubstractors[1] = -1;
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
                    constructorSubstractors[1] = -3;
                    effectsDisplay[1] = content + ":<br>" +
                                        "+++ Fans<br>" +
                                        "+++ Tour revenue<br>" +
                                        "you'll win the game anyway, but it'll be quite dull<br><br>";
                    break;
                case "jazz":
                    tourIncome = defaultTourIncome;
                    constructorSubstractors[1] = 1;
                    effectsDisplay[1] = content + ":<br>" +
                                        "-   Fans<br>" +
                                        "++  Album recording time<br><br>";
                    break;
        }
        root = content;
        
        UpdateBuffs();
        console.log("Current DivideCoefficientBuffer = " + ppDivideCoefficientBuffer);
    }
    if (event.type == "mouseout") {
        event.target.style.color = "black";
        event.target.style.background = null;
    }
}

function postfixButtonHandler(event) {
    if (event.type == "mouseover") {
        event.target.style.background = "rgb(205, 0, 64)"
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
    button.style.padding = button.style.margin = "5px";
    button.style.position = "relative";
    $(button).css( {width: "fit-content", height: "fit-content"} );
    $(button).css("text-align", "center");
    $(button).css("cursor", "pointer");
    button.innerHTML = content;
    switch (type) {
        case "prefix":
            button.style.border = "1px solid rgb(0, 0, 205)";
            button.onclick = button.onmouseover = button.onmouseout = prefixButtonHandler;                 
            break;
        case "root":
            button.style.border = "1px solid rgb(127, 0, 205)";
            button.onclick = button.onmouseover = button.onmouseout = rootButtonHandler;            
            break;
        case "postfix":
            button.style.border = "1px solid rgb(205, 0, 0)";
            button.onclick = button.onmouseover = button.onmouseout = postfixButtonHandler;
            break;
        default:
            prefix = button.innerHTML;
            break;            
    }

    UpdateBuffs;
    return button;
}

function NewEmailAlert(sender, AcceptMailAction) {
    var alert = document.createElement("div");
    alert.className = "alert";
    alert.style.backgroundColor = "yellow";

    var alertHeader = document.createElement("p");
    alertHeader.id = "alertheader";
    alertHeader.innerHTML = "1 new e-mail";
    var alertContent = document.createElement("p");
    alertContent.id = "alertcontent";
    alertContent.innerHTML = "from " + sender;

    var buttonSection = document.createElement("div");
    buttonSection.style.display = "flex";
    var accept = new ButtonAcceptDecline("accept", "Open");
    var decline = new ButtonAcceptDecline("decline", "Move to Spam");

    // BUTTONS
    accept.onclick = AcceptMailAction;
    decline.onclick = function() {
        notifications.removeChild(alert);
    }
    buttonSection.appendChild(accept);
    buttonSection.appendChild(decline);

    alert.appendChild(alertHeader);
    alert.appendChild(alertContent);
    alert.appendChild(buttonSection);

    return alert;
}

function MailWindow(sender, content, CloseMailAction) {
    var mailWindow = new DraggableElement();
    mailWindow.className = "mailwindow";

    var mailHeader = document.createElement("div");
    mailHeader.className = "mailheader";    
    mailHeader.innerHTML = "Mail message";    

    var closeMailWindow = new ButtonAcceptDecline("decline", "Close letter");
    closeMailWindow.onclick = CloseMailAction;

    var mailWindowElements = [mailHeader, new MailContent(sender, content), closeMailWindow];
    mailWindowElements.forEach(element => mailWindow.appendChild(element));

    return mailWindow;

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
}

function closeDialog() {
    if (isbandCreatingFinished) {
        $(dialog).css("visibility", "hidden");
    }
}