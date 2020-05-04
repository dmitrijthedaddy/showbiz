// EVENTS

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

    function HelloFromUs() {
        HelloFromUsMessageConstruct();
        HelloFromUsIncomingCall();    
    }