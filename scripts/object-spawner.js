var bandName = document.createElement("input");
var bandNameLabel = document.createElement("p");
var genreName = document.createElement("input");
var genreNameLabel = document.createElement("p");

var dialog;
var isbandCreatingFinished;

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
    $("#dialogheadercontent").text("Create new artist");
        
    dialog = document.getElementById("dialog");
    bandNameLabel.textContent = "Artist name ";
    genreNameLabel.textContent = "Genre ";

    bandName.position = "absolute";
    bandName.width = 100;
    bandName.height = 20;        
    bandName.top = 30;
    bandName.left = 15;
    
    dialog.appendChild(bandNameLabel); 
    dialog.appendChild(genreNameLabel);
    bandNameLabel.appendChild(bandName);
    genreNameLabel.appendChild(genreName);
    $(".dialog").css("visibility", "visible");
}

function closeDialog() {
    if (isbandCreatingFinished) {
        $(dialog).css("visibility", "hidden");
    }
}