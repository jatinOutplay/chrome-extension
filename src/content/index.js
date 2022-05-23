/* global chrome */

import { getStoredCities } from "../utils/storage";

console.log("content.js running");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("at content");
  chrome.runtime.sendMessage({ action: "windowCheck" }, (response) => {
    console.log("message sent from content.js");
    sendResponse(response);
  });

  return true;
});

getStoredCities().then((res) => {
  console.log("city", res);
});
