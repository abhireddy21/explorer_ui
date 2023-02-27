import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import explorer from './explorer.json'
import Folder from './components/Folder';
import axios from 'axios';
function App() {
  // const [explorerData,setExplorerData]=useState([])
  const [explorerData,setExplorerData]=useState(explorer)
 
  
  // axios.get("http://192.168.0.121/dextrus/explorer")
  // .then(resp=>{
  //   JSON.stringify(resp);
  //   console.log(resp.data);
  //   setExplorerData(resp);
  // })

  return (
    <div>
      <Folder explorer={explorerData}/>
    </div>
  );
}

export default App;
