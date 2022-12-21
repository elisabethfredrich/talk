import React from "react";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Button from "../StyledComponents/Button";
import { useNavigate } from "react-router-dom";
import {
  addGroupChatToUserChatRelation,
  addUserToChatUserRelation,
  createTandemChat,
} from "../../API/SpecificAPICalls";
import "./ShortInfo.css";
import { getBadgeLang } from "../Flags";

const ShortInfo = (props) => {
  const navigate = useNavigate();
  const emoji = require("emoji-dictionary");
  const badge = getBadgeLang(props.badge);

  const joinGroupChat = async function (currentUser, chatId) {
    await addGroupChatToUserChatRelation(currentUser, chatId);
    await addUserToChatUserRelation(currentUser, chatId);
    navigate(`/chats/${chatId}`);
  };

  return (
    <div className="short-info-container">
      <ProfilePicture small img={props.img} badge={badge} padding="1rem" />
      <div className="short-info-inner-container">
        <p className="short-info">{props.info}</p>
        {props.flag && (
          <p id="learning-languages">Learning {emoji.getUnicode(props.flag)}</p>
        )}
      </div>
      <div className="short-info-inner-container">
        {props.btnGroup && (
          <Button
            onClick={() => {
              joinGroupChat(props.userId, props.chatId);
            }}
            red
            small
          >
            {props.btnGroup}
          </Button>
        )}
        {props.btnProfile && (
          <Button
            red
            small
            onClick={() => {
              createTandemChat(props.userId, props.profileId, navigate);
            }}
          >
            {props.btnProfile}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ShortInfo;
