import React from 'react';
import "./App.css";

function App() {
  const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  const recognition = new SpeechRecognition();

  function ask(){
    if(document.getElementById("talk-button").className == "activeMicrophone"){
      recognition.stop();
      document.getElementById("talk-button").className = "";
    }
    else{
      recognition.start();
      document.getElementById("talk-button").className = "activeMicrophone";
    }

    recognition.onspeechend = () => {
  		recognition.stop();
      document.getElementById("talk-button").className = "";
  	};

    recognition.onresult = async function(event) {
  		const last = event.results.length - 1;
  		const message = event.results[last][0].transcript;

      fetch('http://localhost:8000/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
      })
      .then(res => res.json())
      .then(data => {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(data.message));
      });
  	};
  }

  return (
    <div id="app">
      <header>
        <h1 id="title">Bolin</h1>
        <h3 id="subtitle">Your ChatGPT-powered personal assistant</h3>
      </header>
      <button id="talk-button" onClick={ask}>
        <img src="./logo.png"></img>
        <div className="dot"></div>
      </button>
    </div>
  );
}

export default App;
