var bandName = document.createElement("input");
var bandNameLabel = document.createElement("p");
var genreName = document.createElement("input");
var genreNameLabel = document.createElement("div");
var genreConstructor;

var dialog;
var displayBuffs;
var isbandCreatingFinished;
var prefix = "", root = "", postfix = "", finalGenre = "";
var effectsChoose = ["", "", ""];
var effectsDisplay = ["", ""];

function tileButtonHandler(event) {
    if (event.type == "mouseover") {
        event.target.style.background = "black"
    }
    if (event.type == "mouseout") {
        event.target.style.background = null;
    }
}

$(".dialog").draggable({
    revert: false
});

$(".tile").draggable({
    revert: false
})

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

    var dialogOKButton = document.createElement("p");
    dialogOKButton.id = "dialogbutton";
    dialogOKButton.innerHTML = "OK";
    $(dialogOKButton).css("text-align", "center");
    dialogOKButton.onmouseover = function(event) {
        event.target.style.background = "black"
        event.target.style.color = "white";
    }
    dialogOKButton.onmouseout = function(event) {
        event.target.style.background = null;
        event.target.style.color = "black";
    }
    dialogOKButton.onclick = function() {
        AppendBand();
        isbandCreatingFinished = true;
        $(dialog).css("visibility", "hidden");
        dialog = null;
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
    dialog.appendChild(dialogOKButton);
        
    body.appendChild(dialog);    

    $(dialog).css("visibility", "visible");    
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
    $(genrePrefixes).css("display", "flex");

    var genrePrefix1 = new ConstructorButton("lo-fi", "prefix");
    var genrePrefix2 = new ConstructorButton("kalyan", "prefix");
    var genrePrefix3 = new ConstructorButton("post", "prefix");

    genrePrefixes.append(genrePrefix1);
    genrePrefixes.append(genrePrefix2);
    genrePrefixes.append(genrePrefix3);

    var genreRoots = document.createElement("div");
    $(genreRoots).css("display", "flex");

    var genreRoot1 = new ConstructorButton("hip-hop", "root");
    var genreRoot2 = new ConstructorButton("rock", "root");
    var genreRoot3 = new ConstructorButton("pop", "root");
    var genreRoot4 = new ConstructorButton("jazz", "root");

    genreRoots.append(genreRoot1);
    genreRoots.append(genreRoot2);
    genreRoots.append(genreRoot3);
    genreRoots.append(genreRoot4);

    var genrePostfixes = document.createElement("div");
    $(genrePostfixes).css("display", "flex");

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

function closeDialog() {
    if (isbandCreatingFinished) {
        $(dialog).css("visibility", "hidden");
    }
}