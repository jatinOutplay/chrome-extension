/* global chrome */

import React from 'react';
import logo from './logo.svg';
import './App.css';




function App() {

  const handleSendMessage = () => {
    console.log("handleSend Message called!");

    chrome.tabs.query(
      { active: true, url: "https://www.google.com/" },
      (tabs:any) => {
        const activeTab = tabs[0];
        console.log(activeTab);
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: "checkWindow", id: activeTab.id },
          (res:any) => {
            console.log(res);
          }
        );
      }
    );
  };


  return (
    <div className="App">
      <header className="App-header">
       <h1 onClick={handleSendMessage}>Open stackoverflow</h1>
      </header>
    </div>
  );
}

export default App;
