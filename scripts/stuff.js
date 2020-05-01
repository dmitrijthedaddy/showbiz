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