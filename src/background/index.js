/* global chrome */

console.log("background.js running");

chrome.action.onClicked.addListener(function (activeTab) {
  chrome.windows.create({
    url: chrome.runtime.getURL("index.html"),
    type: "popup",
    width: 200,
    height: 200,
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("hey background.js recieved message from content.js!");
  chrome.tabs.create({ url: "http://stackoverflow.com/" }, () => {
    sendResponse("100%");
  });

  return true;
});
