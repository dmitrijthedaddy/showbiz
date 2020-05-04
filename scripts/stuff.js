var notifications = document.getElementById("notifications");

function NewbieAlert() {
    var newbieAlert = document.createElement("div");
    newbieAlert.className = "alert";

    var newbieAlertHeader = document.createElement("p");
    newbieAlertHeader.innerHTML = "Musical industry awaits!";
    newbieAlertHeader.id = "alertheader";
    newbieAlert.appendChild(newbieAlertHeader);

    var newbieAlertContent = document.createElement("p");
    newbieAlertContent.id = "alertcontent";
    newbieAlertContent.innerHTML = "It's time to create a new artist and do some" +
                                   "management. You start with $" + money +
                                   " in your pocket, spend it wisely and remember: " +
                                   "your label is where stars grow!:)";
    newbieAlert.appendChild(newbieAlertContent);

    notifications.appendChild(newbieAlert);

    setTimeout(function() {
        $(newbieAlert).css("visibility", "hidden");
        notifications.removeChild(newbieAlert);
    }, 15000);
}

function GoSocialAlert(bandID) {
    
        var goSocialAlert = document.createElement("div");
        goSocialAlert.className = "alert";

        var alertHeader = document.createElement("p");
        alertHeader.innerHTML = "Go social";
        alertHeader.id = "alertheader";
        goSocialAlert.appendChild(alertHeader);

        var alertContent = document.createElement("p");
        alertContent.innerHTML = "Your artist " + bandInfo[bandID][0] + " now has more than 1 fan. " +
                                 "That means that not only their boss listen to them " +
                                 "and they start to gain more attention. Work, b@*%h!"
        alertContent.id = "alertcontent";
        goSocialAlert.appendChild(alertContent);

        notifications.appendChild(goSocialAlert);

        setTimeout(function() {
            $(goSocialAlert).css("visibility", "hidden");
            notifications.removeChild(goSocialAlert);
        }, 15000);    
}

function StillNoAlbumAlert(bandID) {
    
    var stillNoAlbumAlert = document.createElement("div");
    stillNoAlbumAlert.className = "alert";

    var alertHeader = document.createElement("p");
    alertHeader.innerHTML = "Don't stick around!";
    alertHeader.id = "alertheader";
    stillNoAlbumAlert.appendChild(alertHeader);

    var alertContent = document.createElement("p");
    alertContent.innerHTML = "Fans of " + bandInfo[bandID][0] + " are " +
                             "waiting for new releases! Don't lose their sight " +
                             "and go recording a new album for your guys.";
    alertContent.id = "alertcontent";
    stillNoAlbumAlert.appendChild(alertContent);

    notifications.appendChild(stillNoAlbumAlert);

    setTimeout(function() {        
        $(stillNoAlbumAlert).css("visibility", "hidden");
        notifications.removeChild(stillNoAlbumAlert);
    }, 15000);
}

function TheyGoAwayAlert(bandID) {
    var theyGoAwayAlert = document.createElement("div");
    theyGoAwayAlert.className = "alert";
    lackOfMoneyAlert.style.backgroundColor = "palevioletred";

    var alertHeader = document.createElement("p");
    alertHeader.innerHTML = "Awww man they're walking away...";
    alertHeader.id = "alertheader";
    theyGoAwayAlert.appendChild(alertHeader);

    var alertContent = document.createElement("p");
    alertContent.innerHTML = "Fans of " + bandInfo[bandID][0] + " are " +
                             "losing interest to them. It is recommended " +
                             "to drop new album to save their community!";
    alertContent.id = "alertcontent";
    theyGoAwayAlert.appendChild(alertContent);

    notifications.appendChild(theyGoAwayAlert);

    setTimeout(function() {
        $(theyGoAwayAlert).css("visibility", "hidden");
        notifications.removeChild(theyGoAwayAlert);
    }, 15000);
}

function RevivalAlert(bandID) {
    var revivalAlert = document.createElement("div");
    revivalAlert.className = "alert";

    var alertHeader = document.createElement("p");
    alertHeader.innerHTML = "Revival";
    alertHeader.id = "alertheader";
    revivalAlert.appendChild(alertHeader);

    var alertContent = document.createElement("p");
    alertContent.innerHTML = "You turned back " + bandInfo[bandID][0] + "'s fans " +
                             "curiosity. Don't do bad things more!";
    alertContent.id = "alertcontent";
    revivalAlert.appendChild(alertContent);

    notifications.appendChild(revivalAlert);

    setTimeout(function() {
        $(revivalAlert).css("visibility", "hidden");
        notifications.removeChild(revivalAlert);
    }, 15000);
}

function LackOfMoneyAlert() {
    var lackOfMoneyAlert = document.createElement("div");
    lackOfMoneyAlert.className = "alert";
    lackOfMoneyAlert.style.backgroundColor = "palevioletred";

    var alertHeader = document.createElement("p");
    alertHeader.innerHTML = "Running out of money?";
    alertHeader.id = "alertheader";
    lackOfMoneyAlert.appendChild(alertHeader);

    var alertContent = document.createElement("p");
    alertContent.innerHTML = "Money isn't a neverending thing. If you're experiencing a " +
                             "lack of it, you can try your fortune and win some by clicking \"Money\" " +
                             "button in toolbar.";
    alertContent.id = "alertcontent"
    lackOfMoneyAlert.appendChild(alertContent);

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

function Lottery() {
    var summary;
    var lotteryWindow = document.createElement("div");
    lotteryWindow.className = "dialog";
    lotteryWindow.id = "dialog";    
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
        document.getElementById("workflow").removeChild(lotteryWindow);
    }


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
    

    document.getElementById("workflow").appendChild(lotteryWindow);    
}