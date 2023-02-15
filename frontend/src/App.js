import React from 'react';
import "./App.css";

function App() {
  function ask(){
    console.log("asking question");
  }

  return (
    <div id="app">
      <header>
        <h1 id="title">Bolin</h1>
        <h3 id="subtitle">Your ChatGPT-powered personal assistant</h3>
      </header>
      <button id="talk-button" onClick={ask}>
        <img src="./logo.png"></img>
      </button>
    </div>
  );
}

export default App;
