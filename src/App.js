import './App.css';
import { useState, useEffect } from 'react';
import Folder from './components/Folder';
import axios from 'axios';

function App() {
  const [explorerData, setExplorerData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/dextrus/explorer", { withCredentials: true })
      .then(resp => {
        console.log(resp.data)
        setExplorerData(resp.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <div>
      <Folder explorer={explorerData} />
    </div>
  );
}

export default App;
