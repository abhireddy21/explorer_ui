import './App.css';
import { useState, useEffect } from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Folder from './components/Folder';
import axios from 'axios';
import IP from './components/Config';

function App() {
  const [explorerData, setExplorerData] = useState([]);

  useEffect(() => {
    axios.get(IP+"/dextrus/explorer", { withCredentials: true })
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
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<App/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
