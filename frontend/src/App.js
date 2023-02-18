import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import "./App.css";

function App() {
  const [name, setName] = useLocalStorageState("Bolin");
  const [authKey, setAuthKey] = useLocalStorageState("...");
  const [setupInstructions, setSetupInstructions] = useLocalStorageState("");
  const [speechMode, setSpeechMode] = useLocalStorageState(false);

  const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  const recognition = new SpeechRecognition();

  function toggleSettings(){
    if(document.getElementById("settings").className == "closed"){
      document.getElementById("settings").className = "open";
    }
    else{
      document.getElementById("settings").className = "closed";
    }
  }

  console.log();

  function requestAnswer(message){
    fetch(
      process.env.NODE_ENV === "development" ? "http://localhost:8000/" : "",
      {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          authKey,
          name,
          setupInstructions
        })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) alert(data.message);
      else if(speechMode) window.speechSynthesis.speak(new SpeechSynthesisUtterance(data.message));
      else alert(data.message);
    });
  }

  function ask(){
    if(speechMode){
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
  
        requestAnswer(message);
      };
    }
    else{
      const message = prompt("What would you like to ask?");
      if(message) requestAnswer(message);
    }
  }

  return (
    <div id="app">
      <header>
        <h1 id="title">{name||"Assistant"}</h1>
        <h3 id="subtitle">Your ChatGPT-powered personal assistant</h3>
      </header>
      <button id="talk-button" onClick={ask}>
        <img src="./logo.png"></img>
        <div className="dot"></div>
      </button>
      <a id="settings-button" onClick={toggleSettings}>
        <i className="fa fa-gear"></i>
      </a>
      <div id="settings" className="closed">
        <a id="close-settings-button" onClick={toggleSettings}>
          <i className="fa fa-close"></i>
        </a>
        <div id="settings-content">
          <h2>Settings</h2>
          <hr/>
          <label>Name</label>
          <input placeholder="Name" value={name} onChange={(event)=>setName(event.target.value)}/>
          <br/>
          <label>Authentication Key</label>
          <input placeholder="Key" value={authKey} onChange={(event)=>setAuthKey(event.target.value)}/>
          <br/>
          <label>Speech Mode</label>
          <input type="checkbox" checked={speechMode} onChange={(event)=>setSpeechMode(event.target.checked)}/>
          <hr/>
          <h3>Setup Instructions</h3>
          <textarea
            placeholder="Setup Instructions"
            value={setupInstructions}
            onChange={(event)=>setSetupInstructions(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
