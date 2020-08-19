import React, { useState, useEffect } from "react";
import "../../src/chat/Chat.css";
import { Avatar, IconButton } from "@material-ui/core";

import AtachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

function Chat() {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 3000));
  }, []);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last Message...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AtachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className="chat__message chat__reciever">
          <span className="chat__name">Zero to the world</span>
          Hey this is the first message you sent!
          <span className="chat__timestamp">10:30 am</span>
        </p>

        {/*Validate if the user is logged and if is logged so the chat will paint message green and right!*/}
        <p className={`chat__message ${true && "chat__reciever"}`}>
          <span className="chat__name">World to Zero</span>
          Hack the Planet!
          <span className="chat__timestamp">3:53 pm</span>
        </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        {/*Input text field */}
        {/*Send Message Icon */}
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
