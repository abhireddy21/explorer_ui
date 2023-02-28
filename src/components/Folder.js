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
  type:""
})

const [expand,setExpand]=useState(false);
console.log(explorer.name)

const  handleNewFolder = (e,type)=>{
  e.stopPropagation();
  setExpand(true)
  setShowInput({
    visible:true,
    type
  })
}



  if(explorer.type==="folder"){
  return (
    
    <div style={{marginTop:"5px",cursor:"pointer"}}>
      
      <Dropdown overlay={menu} trigger={["contextMenu"]}>
      <div className="folder" onClick={()=>setExpand(!expand)}>
        <span>📁 {explorer.name}</span>
        <div className='folder-btns'>
          <div onClick={(e)=> handleNewFolder(e,"folder")}><i class="bi bi-folder-plus"></i></div>
          <div onClick={(e)=> handleNewFolder(e,"file")}><i class="bi bi-file-earmark-plus"></i></div>
        </div>
        </div>
        </Dropdown> 
        <div style={{display:expand?"block":"none",paddingLeft:25}}>

          {/* For adding new Inputs */}
          {showInput.visible && 
            <div className="input-cnt">
              <span>{showInput.type==="file"?  "📄" : "📁"  } </span> 
              <input type="text" autoFocus onBlur={()=>setShowInput({...showInput,visible:false})} className="input"/>
            </div>
          }

          {/* Children folders tree structure */}
          {explorer.children.map((exp)=>{
              return  <Folder explorer={exp} key={exp.id}/>
          })}
        </div>
    </div>
  )}else{
    return(
      <Dropdown overlay={menu} trigger={["contextMenu"]}>
      <div className="file">
      <span> 📄 {explorer.name}</span>
      </div>
      </Dropdown>
    )
  }
}
