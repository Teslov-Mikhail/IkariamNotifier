// ==UserScript==
// @name         Ikariam Notifications
// @namespace    https://twitter.com/Mikhail_Teslov
// @version      0.1
// @description  Pretty simple and straightforward.
// @author       Mikhail Teslov
// @match        *ikariam.gameforge.com/*
// @grant        none
// @downloadURL https://raw.githubusercontent.com/Teslov-Mikhail/IkariamNotifier/master/script.user.js
// ==/UserScript==

(function() {
    'use strict';

    var alertSound = new Audio("https://raw.githubusercontent.com/Teslov-Mikhail/IkariamNotifier/master/waralert.mp3");

    var notificationOptions = {
      body: "Twoje miasto wymaga natychmiastowej interwencji.",
      icon: "https://raw.githubusercontent.com/Teslov-Mikhail/IkariamNotifier/master/general.png"
    }

    function checkForAlerts() {
      if ( $("#js_GlobalMenu_military").hasClass("normalalert") ) {

        alertSound.play();

        if (!("Notification" in window)) {
          alert("Twoja przeglądarka nie opsługuje powiadomień.");
        }

        else if (Notification.permission === "granted") {
          var notification = new Notification("Twój Generał jest zaalarmowany!", notificationOptions);
        }

        else if (Notification.permission !== "denied") {
          Notification.requestPermission(function (permission) {
            if (permission === "granted") {
              notification = new Notification("Twój Generał jest zaalarmowany!", notificationOptions);
            }
          });
        }
      }

      setTimeout(function () {
        checkForAlerts();
      }, 60000);
    }
    checkForAlerts();
})();
