var bandName = document.createElement("input");
var bandNameLabel = document.createElement("p");
var genreName = document.createElement("input");
var genreNameLabel = document.createElement("div");
var genreConstructor;

var dialog;
var isbandCreatingFinished;
var prefix = "", root = "", postfix = "";

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
    isbandCreatingFinished = false;
    var finalGenre;
    $("#dialogheadercontent").text("Create new artist");

    var dialog = document.getElementById("dialog");
    var genreConstructor = new GenreConstructor(); 

    bandNameLabel.innerHTML = "Artist Name  "
    dialog.appendChild(bandNameLabel);
    bandNameLabel.appendChild(bandName);
    dialog.appendChild(genreConstructor);

    finalGenre = prefix + " " + root + " " + postfix;
    setInterval(function() {
        finalGenre = prefix + " " + root + " " + postfix;
    }, 10);

    var displayFinalGenre = document.createElement("p");
    setInterval(function() {
        displayFinalGenre.innerHTML = finalGenre
    }, 10);
    dialog.appendChild(displayFinalGenre);

    $(".dialog").css("visibility", "visible");
    isbandCreatingFinished = true;

    
}

function prefixButtonHandler(event) {
    if (event.type == "mouseover") {
        event.target.style.background = "black"
        event.target.style.color = "white";
    }
    if (event.type == "click") {
        event.target.style.background = "black";
        event.target.style.color = "white";
        prefix = event.target.innerHTML;
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
        root = event.target.innerHTML;
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
    return button;
}

function closeDialog() {
    if (isbandCreatingFinished) {
        $(dialog).css("visibility", "hidden");
    }
}