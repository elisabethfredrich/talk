import React from "react";
import Button from "../StyledComponents/Button";
import HeaderContainer from "../StyledComponents/Containers/HeaderContainer";
import Picture from "../../images/home-pic.png";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Germany from "../../images/Germany.png";
import England from "../../images/England.png";
import Spain from "../../images/Spain.png";
import Norway from "../../images/Norway.png";
import Portugal from "../../images/Portugal.png";
import France from "../../images/France.png";
import Italy from "../../images/Italy.png";
import Tanzania from "../../images/Tanzania.jpeg";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import BlueBox from "../StyledComponents/Containers/BlueBox";

const HomeNotLoggedIn = () => {
  const flags = [
    { flag: Germany, id: 1 },
    { flag: England, id: 2 },
    { flag: Spain, id: 3 },
    { flag: Norway, id: 4 },
    { flag: Portugal, id: 5 },
    { flag: France, id: 6 },
    { flag: Italy, id: 7 },
    { flag: Tanzania, id: 8 },
  ];

  const navigate = useNavigate();

  return (
    <div className="page-content-container">
      <HeaderContainer>
        <div>
          <h1>Welcome to Talk!</h1>
          <h1 className="h1-sub">A chat platform for language learning</h1>
        </div>
      </HeaderContainer>
      <div className="grid-container">
        <div className="grid-horizontal">
          <div className="intro-text">
            <p>
              Talk! is a chat application. Here you can pratice your written
              language skills in English, French, German and Danish - and soon
              even more languages!{" "}
            </p>
            <p>
              You can choose to chat with a person who is native in the language
              you want to learn and ideally wants to learn your native language.
              You can use the daily topic at the home page as inspiration in
              your conversations.
            </p>
            <p>
              {" "}
              You can also choose to join different group chats within the
              language you are learning. All of our groups are made by our
              users, and each has a specific topic of interest, which the users
              discuss in the chat. We guarantee that we have at least one chat
              for your specific interest – and if not, you can start it!{" "}
            </p>
            <p>So sign up today and start your language journey!</p>
          </div>

          <div className="img-home">
            <img
              className="img-home-not-logged-in"
              src={Picture}
              alt="World map languages"
            />
          </div>
        </div>
      </div>

      <BlueBox>
        <h2>Improve your language skills today!</h2>
        <div className="flex-container-horizontal">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button lightblue onClick={() => navigate("/register")}>
            Sign up
          </Button>
        </div>
      </BlueBox>
      <div className="inner-container-flex">
        <h2>Others are learning:</h2>
        <div id="flags-grid">
          {flags.map((flag) => (
            <ProfilePicture key={flag.id} img={flag.flag}></ProfilePicture>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeNotLoggedIn;
