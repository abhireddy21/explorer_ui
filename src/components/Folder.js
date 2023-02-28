import React, { useState } from "react";
import "./css/styles.css";
import { Dropdown, Menu } from "antd";
import IP from "./Config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Folder({ explorer }) {
// const navigate = useNavigate();


  const menu = (
    <Menu
      onClick={({ key }) => {
        console.log(key);
        console.log("delete:"+explorer.id)
        if(key==="delete"){
          axios
        .delete(IP + "/dextrus/" + explorer.id);
        window.location.reload();
        }
      }}
      items={[
        {
          label: "Rename",
          key: "rename",
        },
        {
          label: "Delete",
          danger: true,
          key: "delete",
        },
      ]}
    ></Menu>
  );

  const [showInput, setShowInput] = useState({
    visible: false,
    type: "",
  });

  const [expand, setExpand] = useState(false);
  console.log(explorer.name);

  const [type, setType] = useState();
  const [id, setId] = useState();


  // Functioon for opening a new folder
  const handleNewFolder = (e, type, id) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      type,
    });
    setId(id);
    console.log(id);
    setType(type);
    console.log(type);
  };
  const onAddFolder = (e) => {
    if (e.keyCode == 13 && e.target.value) {
      console.log(e.target.value);
      // setShowInput({...showInput,visible:false})

      axios
        .post(IP + "/dextrus/" + type + "/" + e.target.value + "/" + id);
        window.location.reload();
        // navigate("/home");
    }
  };


  if (explorer.type === "folder") {
    return (
      <div style={{ marginTop: "5px", cursor: "pointer" }}>
        <Dropdown overlay={menu} trigger={["contextMenu"]}>
          <div className="folder" onClick={() => setExpand(!expand)}>
            <span>📁 {explorer.name}</span>
            <div className="folder-btns">
              <div onClick={(e) => handleNewFolder(e, "folder", explorer.id)}>
                <i className="bi bi-folder-plus"></i>
              </div>
              <div onClick={(e) => handleNewFolder(e, "file", explorer.id)}>
                <i className="bi bi-file-earmark-plus"></i>
              </div>
            </div>
          </div>
        </Dropdown>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {/* For adding new Inputs */}
          {showInput.visible && (
            <div className="input-cnt">
              <span>{showInput.type === "file" ? "📄" : "📁"} </span>
              <input
                type="text"
                onKeyDown={onAddFolder}
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                className="input"
              />
            </div>
          )}

          {/* Children folders tree structure */}
          {explorer.children.map((exp) => {
            return <Folder explorer={exp} key={exp.id} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <Dropdown overlay={menu} trigger={["contextMenu"]}>
        <div className="file">
          <span> 📄 {explorer.name}</span>
        </div>
      </Dropdown>
    );
  }
}
