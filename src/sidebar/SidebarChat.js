import React, { useEffect, useState } from "react";
import "../../src/sidebar/SidebarChat.css";
import { Avatar, IconButton } from "@material-ui/core";

function SidebarChat({ addNewChat }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 3000));
  }, []);

  return (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2> Room Name </h2>
        <p> Last Message... </p>
      </div>
    </div>
  );
}

export default SidebarChat;
