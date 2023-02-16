import React from 'react';
import "./App.css";

function App() {
  function ask(){
    let message = prompt("What do you want to ask Bolin?");
    fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => alert(data.message));
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
