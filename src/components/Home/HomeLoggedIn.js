import React, { useEffect } from "react";
import Button from "../StyledComponents/Button";
import Input from "../Input/Input";
import Picture from "../../images/home-pic-logged-in.png";
import Container from "../StyledComponents/Containers/Container";
import HorizontalLine from "../StyledComponents/HorizontalLine";
import ShortInfo from "../ShortInfo/ShortInfo";
import HeaderContainer from "../StyledComponents/Containers/HeaderContainer";
import BlueBox from "../StyledComponents/Containers/BlueBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import getCurrentUser from "../../API/UserAPICalls.js";
import { getGroupRecommendations } from "../../API/SpecificAPICalls";
import { getProfileRecommendations } from "../../API/SpecificAPICalls";
import ChatPreview from "../Chat/ChatPreview";
import { getCurrentUsersChats } from "../../API/SpecificAPICalls";

const HomeLoggedIn = () => {
  const navigate = useNavigate();
  let currentUser = getCurrentUser();

  const [inputField, setInputField] = useState();
  const [userChats, setUserChats] = useState([]);
  const [recommendationChats, setRecommendationChats] = useState([]);
  const [recommendationProfiles, setRecommendationProfiles] = useState([]);

  const topic = "What is your favourite holiday memory? And why?";

  useEffect(() => {
    const getCurrentUserChats = async () => {
      setUserChats(await getCurrentUsersChats(currentUser, 4));
    };

    const getGroupRecommendation = async () => {
      await getGroupRecommendations(currentUser, setRecommendationChats);
    };

    const getProfileRecommendation = async () => {
      await getProfileRecommendations(currentUser, setRecommendationProfiles);
    };

    getCurrentUserChats();
    getGroupRecommendation();
    getProfileRecommendation();
  }, [currentUser]);

  const handleChange = (e) => {
    setInputField(e.target.value);
  };

  //not fully implemented
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search");
  };

  return (
    <div className="page-content-container">
      <HeaderContainer>
        <div>
          <h1>Topic of the day:</h1>
          <h1 className="h1-sub">{topic}</h1>
        </div>
      </HeaderContainer>
      <div className="grid-container">
        <div className="grid-horizontal">
          <div className="img-home">
            <img src={Picture} alt="language learning" />
          </div>

          <Container blue>
            <h2
              className="h2-sub"
              style={{ color: "var(--secondary-lightblue" }}
            >
              Recently active chats
              <HorizontalLine />
            </h2>

            {userChats.length > 0 &&
              userChats.map((chat) => (
                <ChatPreview
                  onClick={() => {
                    navigate(`/chats/${chat.id}`);
                  }}
                  key={chat.id}
                  img={chat.img.url()}
                  badge={chat.badge}
                  info={chat.name}
                  currentMessage={chat.currentMessage}
                  time={chat.time}
                />
              ))}
          </Container>
          <Container blue className="create-group">
            <p className="material-symbols-outlined icon-link filled-icon large-icon">
              group_add
            </p>
            <Button onClick={() => navigate("/groupregistration")} blue>
              Create new group
            </Button>
          </Container>
        </div>
      </div>
      <BlueBox>
        <h2>Search for profiles and groups</h2>
        <form onSubmit={() => handleSubmit()}>
          <div className="flex-container-horizontal">
            <button
              className="icon-btn"
              onClick={() => {
                navigate("/search");
              }}
            >
              <p className="material-symbols-outlined icon-margin-bottom">
                search
              </p>
            </button>

            <Input
              onChange={handleChange}
              values={inputField}
              placeholder="Language, theme or name"
            ></Input>
          </div>
        </form>
      </BlueBox>
      {(recommendationChats.length > 0 ||
        recommendationProfiles.length > 0) && (
        <div className="recommendations-container">
          <h1>Recommendations</h1>

          <div className="recommendations">
            <div>
              <div className="flex-container-horizontal">
                {recommendationChats.length > 0 && (
                  <Container blue>
                    <h2
                      className="h2-sub"
                      style={{ color: "var(--secondary-lightblue" }}
                    >
                      Groups
                    </h2>
                    <HorizontalLine width="90%" />
                    {recommendationChats ? (
                      recommendationChats.map((chat) => (
                        <ShortInfo
                          key={chat.id}
                          img={chat.img.url()}
                          badge={chat.badge}
                          btnGroup={"Join"}
                          info={chat.name}
                          userId={currentUser}
                          chatId={chat.id}
                        />
                      ))
                    ) : (
                      <Container blue className="create-group">
                        <p className="material-symbols-outlined icon-link filled-icon large-icon">
                          group_add
                        </p>
                        <Button
                          onClick={() => navigate("/groupregistration")}
                          blue
                        >
                          Create new group
                        </Button>
                      </Container>
                    )}
                  </Container>
                )}
                {recommendationProfiles.length > 0 && (
                  <Container blue>
                    <h2
                      className="h2-sub"
                      style={{ color: "var(--secondary-lightblue" }}
                    >
                      Profiles
                    </h2>
                    <HorizontalLine width="90%" />
                    {recommendationProfiles ? (
                      recommendationProfiles.map((profile) => (
                        <ShortInfo
                          key={profile.id}
                          img={profile.img.url()}
                          badge={profile.badge}
                          btnProfile={"Contact"}
                          flag={profile.flag}
                          info={profile.name}
                          userId={currentUser.id}
                          profileId={profile.id}
                        />
                      ))
                    ) : (
                      <></>
                    )}
                  </Container>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLoggedIn;
