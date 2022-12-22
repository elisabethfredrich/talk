import React from "react";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import "./Chat.css";
import ChatPreviewContainer from "../StyledComponents/Containers/ChatPreviewContainer";
import { getBadgeLang } from "../Flags";
import HorizontalLine from "../StyledComponents/HorizontalLine";

const ChatPreview = (props) => {
  const badge = getBadgeLang(props.badge);

  return (
    <button className="icon-btn" onClick={props.onClick}>
      <ChatPreviewContainer active={props.active}>
        <ProfilePicture small img={props.img} badge={badge} padding="1rem" />
        <div className="container">
          <p id="chat-name-truncate">{props.info}</p>
          <p id="chat-content-truncate">{props.currentMessage} </p>
        </div>
        <div className="time-container">
          <p id="time-text">{props.time}</p>
        </div>
      </ChatPreviewContainer>
      <HorizontalLine blue />
    </button>
  );
};

export default ChatPreview;
