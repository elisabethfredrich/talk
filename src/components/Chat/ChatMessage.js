import React from "react";
import ChatMessageContainer from "../StyledComponents/Containers/ChatMessageContainer";
import "./Chat.css";
import getCurrentUser from "../../API/UserAPICalls";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { getBadgeLang } from "../Flags";

const ChatMessage = (props) => {
  const badge = getBadgeLang(props.badge);

  return (
    <div className="chat-message-wrapper" id={props.id}>
      {/*if message is from other user render this */}
      {props.messageSender !== getCurrentUser().id && (
        <div className="outer-message-container">
          <div className="profile-picture-message">
            <ProfilePicture img={props.img} badge={badge} tiny />
          </div>
          <div className="inner-message-container">
            <p className="message-info">{props.senderName}</p>
            <ChatMessageContainer otheruser>
              <p>{props.messageText}</p>
            </ChatMessageContainer>
            <p className="message-info">{props.messageDate}</p>
          </div>
        </div>
      )}

      {/**if message is from user render this */}
      {props.messageSender === getCurrentUser().id && (
        <div className="outer-message-container user">
          <div className="inner-message-container user">
            <ChatMessageContainer user>
              <p>{props.messageText}</p>
            </ChatMessageContainer>
            <p className="message-info">{props.messageDate}</p>
            <div className="profile-picture-message "></div>
          </div>
          <ProfilePicture img={props.img} tiny />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
