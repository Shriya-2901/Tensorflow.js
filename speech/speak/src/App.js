import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";
import React,{useEffect, useState} from "react";
function App() {
  const[model,setModel] = useState(null);
  const[action,setAction] = useState(null);
  const[labels,setLabels] = useState(null);
  const loadModel=async()=>{
    const recognizer=await speech.create("BROWSER_FFT");
    console.log("Model Loaded");
    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels())
    setModel(recognizer);
    setLabels(recognizer.wordLabels());
  }
  useEffect(()=>{loadModel()},[]);
  function argmax(arr){ 
return arr.map((x,i)=>[x,i]).reduce((a,b)=>a[0]>b[0]?a:b)[1];
  }
  const recognizeCommands= async()=>{
    model.listen(result=>{//will listen to microphone to make sure we get the sound
      console.log(result.scores);
      setAction(labels[argmax(Object.values(result.scores))]);
      console.log(action);
    },{includeSpectrogram:true,probabiltyThreshold:0.5});
    setTimeout(()=>{model.stopListening()},50000);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Made usinng a pre-trained model</p>
        <p>Try saying-'down', 'eight', 'five', 'four', 'go', 'left', 'nine', 'no', 'one', 'right', 'seven', 'six', 'stop', 'three', 'two', 'up', 'yes', 'zero'</p>
       <button onClick={recognizeCommands}>Recognize Commands</button>
       {action&&<h1>{action}</h1>}
      </header>
    </div>
  );
}

export default App;
