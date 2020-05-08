var notifications = document.getElementById("notifications");

function NewbieAlert() {
    var newbieAlert = new Alert("Musical industry awaits!", "It's time to create a new artist and do some " +
                                                            "management. You start with $" + money.toFixed(0) +
                                                            " in your pocket, spend it wisely and remember: " +
                                                            "your label is where stars grow!:)");
    notifications.appendChild(newbieAlert);

    setTimeout(function() {
        $(newbieAlert).css("visibility", "hidden");
        notifications.removeChild(newbieAlert);
    }, 15000);
}

function GoSocialAlert(bandID) {    
    var goSocialAlert = new Alert("Go social", "Your artist " + bandInfo[bandID][0] + " now has more than 1 fan. " +
                                               "That means that not only their boss listen to them " +
                                               "and they start to gain more attention. Work, b@*%h!");
    notifications.appendChild(goSocialAlert);

    setTimeout(function() {
        $(goSocialAlert).css("visibility", "hidden");
        notifications.removeChild(goSocialAlert);
    }, 15000);    
}

function StillNoAlbumAlert(bandID) {    
    var stillNoAlbumAlert = new Alert("Don't stick around!", "Fans of " + bandInfo[bandID][0] + " are " +
                                                             "waiting for new releases! Don't lose their sight " +
                                                             "and go recording a new album for your guys.");
    notifications.appendChild(stillNoAlbumAlert);

    setTimeout(function() {        
        $(stillNoAlbumAlert).css("visibility", "hidden");
        notifications.removeChild(stillNoAlbumAlert);
    }, 15000);
}

function TheyGoAwayAlert(bandID) {
    var theyGoAwayAlert = new Alert("Awww man they're walking away...", "Fans of " + bandInfo[bandID][0] + " are " +
                                                                        "losing interest to them. It is recommended " +
                                                                        "to drop new release to save their community!");
    theyGoAwayAlert.style.backgroundColor = "palevioletred";
    notifications.appendChild(theyGoAwayAlert);

    setTimeout(function() {
        $(theyGoAwayAlert).css("visibility", "hidden");
        notifications.removeChild(theyGoAwayAlert);
    }, 15000);
}

function RevivalAlert(bandID) {
    var revivalAlert = new Alert("Revival", "You turned back " + bandInfo[bandID][0] + "'s fans " +
                                            "curiosity. Don't do bad things more!");
    notifications.appendChild(revivalAlert);

    setTimeout(function() {
        $(revivalAlert).css("visibility", "hidden");
        notifications.removeChild(revivalAlert);
    }, 15000);
}

function LackOfMoneyAlert() {
    var lackOfMoneyAlert = new Alert("Running out of money?", "Money isn't a neverending thing. If you're experiencing a " +
                                                              "lack of it, you can try your fortune and win some by clicking \"Money\" " +
                                                              "button in toolbar.");
    lackOfMoneyAlert.style.backgroundColor = "palevioletred";

    var moneyscreenbutton = document.createElement("div")
    moneyscreenbutton.id = "moneyscreenbutton";
    moneyscreenbutton.innerHTML = "Money: $" + money.toFixed(0);
    moneyscreenbutton.onclick = function() {        
        notifications.removeChild(lackOfMoneyAlert);
        Lottery();
    }
    moneyscreenbutton.onmouseover = function() {
        moneyscreenbutton.style.backgroundColor = "red";
    }
    moneyscreenbutton.onmouseout = function() {
        moneyscreenbutton.style.backgroundColor = null;
    }
    lackOfMoneyAlert.appendChild(moneyscreenbutton);

    notifications.appendChild(lackOfMoneyAlert);
    setTimeout(function() {        
        notifications.removeChild(lackOfMoneyAlert);
    }, 15000);
}

function Alert(header, content) {
    var alert = document.createElement("div");
    alert.className = "alert";

    var alertHeader = document.createElement("p");
    alertHeader.innerHTML = header;
    alertHeader.id = "alertheader";
    alert.appendChild(alertHeader);

    var alertContent = document.createElement("p");
    alertContent.innerHTML = content;
    alertContent.id = "alertcontent";
    alert.appendChild(alertContent);

    alert.onmouseover = function() {
        alert.style.opacity = "30%";
    }
    alert.onmouseout = function() {
        alert.style.opacity = "100%";
    }

    return alert;
}


var lotteryWindowOpened = false;

function Lottery() {
    var summary;
    var lotteryWindow = document.createElement("div");
    lotteryWindow.className = "dialog";
    lotteryWindow.id = "lottery";
    lotteryWindow.style.top = "100px";
    lotteryWindow.style.left = "500px";
    lotteryWindow.style.backgroundColor = "green";
    lotteryWindow.style.textAlign = "center";
    lotteryWindow.style.visibility = "visible";
    lotteryWindow.style.color = "white";
    lotteryWindow.style.boxShadow = "5px 5px black";
    $(lotteryWindow).draggable( { revert: false } );    
    
    var lotteryHeader = document.createElement("div");
    lotteryHeader.className = "dialogheader";
    lotteryHeader.innerHTML = "Win the money";
    lotteryHeader.style.backgroundColor = "rgb(2, 100, 2)";
    lotteryHeader.style.color = "white";
    lotteryWindow.appendChild(lotteryHeader);
    
    
    var lotteryContent = document.createElement("p");
    lotteryContent.innerHTML = "Make your bet ($):<br>";

    var betField = document.createElement("input");
    lotteryContent.appendChild(betField);
    betField.value = (money / 2).toFixed(0);

    var buttonSection = document.createElement("p");
    buttonSection.style.display = "flex";  
    buttonSection.style.textAlign = "center";  
    
    var dialogOKButton = new LotteryButton();
    dialogOKButton.innerHTML = "Play!";
    dialogOKButton.onclick = function() {
        var result = document.createElement("p");
        if (betField.value <= money) {
            var playValue = betField.value;        
            summary = getRandomInt(playValue);
            if (getRandomInt(2) == 1) {
                summary = -summary;
            }            
            result.innerHTML = Summary();
            function Summary() {
                if (summary >= 0) {
                    return "You win $" + summary + ". How lucky you are!";
                }
                else {                    
                    return "Your loss is -$" + Math.abs(summary) + ". Maybe next time.";
                }
            }
            money += summary;
        }
        else {
            result.style.backgroundColor = "red";
            result.innerHTML = "There is not enough money in your bank account.<br>" +
                               "TIP: bet less money!"
        }
        moneyUpdate();    
        lotteryWindow.appendChild(result);
    }

    var dialogCloseButton = new LotteryButton();
    dialogCloseButton.innerHTML = "Close";
    dialogCloseButton.onclick = function() {
        document.body.removeChild(lotteryWindow);
        lotteryWindowOpened = false;
    }

    var casinoImage = document.createElement("img");
    casinoImage.src = "image.png";
    casinoImage.style.width = "200px";
    lotteryWindow.appendChild(casinoImage);


    function LotteryButton() {
        var button = document.createElement("p");
        button.id - "dialogbutton";
        button.style.textAlign = "center";
        button.style.backgroundColor = "rgb(2, 100, 2)";
        button.style.cursor = "pointer";
        button.style.margin = button.style.padding = "5px";
        button.style.border = "1px solid black";
        button.onmouseover = function(event) {
            event.target.style.backgroundColor = "rgb(1, 77, 1)";
        }
        button.onmouseout = function(event) {
            event.target.style.backgroundColor = "rgb(2, 100, 2)";
        }

        return button;
    }

    lotteryContent.appendChild(dialogOKButton);
    lotteryContent.appendChild(dialogCloseButton);
    //lotteryContent.appendChild(buttonSection);
    
    lotteryWindow.appendChild(lotteryContent);
    
    if (!lotteryWindowOpened) {
        document.body.appendChild(lotteryWindow);
        lotteryWindowOpened = true;
    }    
}

function Brackets(text) {
    return "&lt;" + text + "&gt;";
}