import React, { useState } from 'react'
import './css/styles.css';
import {Dropdown,Menu} from "antd";

export default function Folder({explorer}) {
const menu=(
  <Menu 
   onClick={({key})=>{
    console.log(key)
   }}
  items={[
    {
      label:"Create Folder",
      key:"folder"
    },
    {
      label:"Create File",
      key:"file"
    },
    {
      label:"Rename",
      key:"rename"
    },
    {
      label:"Delete",
      danger:true,
      key:"delete"
    }
  ]}>

  </Menu>
)
  

const [showInput,setShowInput]=useState({
  visible:false,
  type:null
})

const [expand,setExpand]=useState(false);
console.log(explorer.name)

const  handleNewFolder = (e)=>{
  e.stopPropagation();

  setShowInput({
    visible:true,
    type:"folder"
  })
}



  if(explorer.type==="folder"){
  return (
    
    <div style={{marginTop:"5px",cursor:"pointer"}}>
      <Dropdown overlay={menu} trigger={["contextMenu"]}>
      <div className="folder" onClick={()=>setExpand(!expand)}>
        <span> 📁 {explorer.name}</span>
        </div>
        </Dropdown> 
        <div style={{display:expand?"block":"none",paddingLeft:25}}>
          {showInput.visible && 
            <div className="input-cnt">
              <span>{showInput.type=="folder"?"📁":"📄"}</span>
              <input className="input"/>
            </div>
          }
          {explorer.children.map((exp)=>{
              return <Folder explorer={exp} key={exp.id}/>
          })}
        </div>
    </div>
  )}else{
    return(
      <div className="file">
      <span> 📄 {explorer.name}</span>
      </div>
    )
  }
}
