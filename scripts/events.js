// EVENTS

// Happy Fan
    let happyFanHappened = false;
    let happyFanTargetID = 0;
    let happyFanText = "";
    let happyFanRandomNames = ["Abraham", "Methodius", "Jesus", "Stanislaus", "Oibek", 
                               "Gleb", "Asalique", "Theo", "Nursultan", "Jared", "Glen",
                               "Vyacheslav", "Carlos"];

    function HappyFanMessageConstruct() {
        let happyFanReleaseID = HappyFanGetReleaseID();
        happyFanText = ["Hi " + bandInfo[happyFanTargetID][0] + "! I'm probably your biggest fan from Default City.<br><br>" +
                        "I have checked out your release <b>\"" + releases[happyFanReleaseID][1] + "\"</b> " +
                        "recently and it's really roof-bearing! Need to say that I haven't heard such a vibing <b>" + bandInfo[happyFanTargetID][1] +
                        "</b> until I found your music... Hope that you'll make a tour soon and visit my town.<br><br>" +
                        "Keep on making good music,<br>" +
                        happyFanRandomNames[getRandomInt(happyFanRandomNames.length)]];
    }

    function HappyFan() {
        setTimeout(function() {
            HappyFanMessageConstruct();
            var happyFanAlert = new NewEmailAlert("Fan", AcceptMailAction);
            notifications.appendChild(happyFanAlert);

            function AcceptMailAction() {
                notifications.removeChild(happyFanAlert);
                var mailWindow = new MailWindow("Fan " + Brackets("thebiggestfan@weehaw.com"),
                                                happyFanText[0],
                                                CloseMailAction);
                document.getElementById("workflow").appendChild(mailWindow);
                
                function CloseMailAction() {
                    document.getElementById("workflow").removeChild(mailWindow);
                }
            }
        }, getRandomArbitrary(10000, 100000));
    }

    function HappyFanGetReleaseID() {
        for (var i = 0; i < releases.length; i++)
        {
            if (releases[i][0] == bandInfo[happyFanTargetID][4]) {
                return i;
            }
        }
    }

// Hello From Us
    let helloFromUsHappened = false;
    let helloFromUsFanLaunch = getRandomArbitrary(600, 1000);
    let helloFromUsTargetID = 0;
    let helloFromUsText = "";

    function HelloFromUsMessageConstruct() {
        helloFromUsText = ["Hello. I represent the EMO (Enterprise Management Organisation). " +
                        "My name won't say you anything.<br><br>" +
                        "We noticed that one of your artists gains more and more popularity! " +
                        "Our company promoted a lot bu!@*#it, but music that is presented on " +
                        "your label would perfectly fit some charts and sound from big fests " +
                        "in the future.<br><br>" +
                        "You can employ one of our managers easily - just let us know. " +
                        "As a welcome bonus, I would like to give you two " +
                        "free Promo Points. They'll be added to " + bandInfo[helloFromUsTargetID][0] + 
                        "'s stats as you close my letter.<br><br>I hope that you'll choose EMO!<br>Bye"];
    }

    function HelloFromUsIncomingCall() {
        var helloFromUsIncomingCall = new NewEmailAlert("Unknown", AcceptMailAction);
        notifications.appendChild(helloFromUsIncomingCall);
    
        function AcceptMailAction() {            
            notifications.removeChild(helloFromUsIncomingCall);
            var mailWindow = new MailWindow("Unknown " + Brackets("representative@emo.promo"), 
                                        helloFromUsText[0],
                                        CloseMailAction);

            document.getElementById("workflow").appendChild(mailWindow);

            function CloseMailAction() {
                document.getElementById("workflow").removeChild(mailWindow);
                document.getElementById("employmanagerbutton").style.visibility = "visible";
                bandPoints[helloFromUsTargetID][0] += 2;
            }
        }

        
    }

    function HelloFromUs() { // main event function
        HelloFromUsMessageConstruct();
        HelloFromUsIncomingCall();
    }

/*
    switch (event) {
        case "HelloFromUs":
            mailHeader.innerHTML = "Mail message";
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
    */