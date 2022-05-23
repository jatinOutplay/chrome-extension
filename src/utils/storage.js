/* global chrome */

export function getStoredCities() {
  const keys = ["cities"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res) => {
      resolve(res.cities ?? []);
    });
  });
}
