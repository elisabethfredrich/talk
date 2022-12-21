import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../images/logo.png";
import Button from "../StyledComponents/Button";
import { useNavigate } from "react-router-dom";
import { UserStatusContext } from "../UserStatusContext";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Container from "../StyledComponents/Containers/Container";
import Parse from "parse";
import getCurrentUser from "../../API/UserAPICalls";
import { getCurrentUsersChats } from "../../API/SpecificAPICalls";

function Navbar() {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const user = useContext(UserStatusContext);
  const [usersMostRecentChat, setUsersMostRecentChat] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  let currentUser = getCurrentUser();

  const hideDropdown = () => {
    const dropdown = document.querySelector("#drop-down");
    dropdown.style.visibility = "hidden";
  };

  const showDropdown = () => {
    const dropdown = document.querySelector("#drop-down");
    dropdown.style.visibility = "visible";
  };

  function goToLogin() {
    navigate("/login");
  }

  function goToRegister() {
    navigate("/register");
  }

  /*  Should be moved to API folder, but couldn't make it work */
  const doUserLogOut = async function () {
    try {
      await Parse.User.logOut();
      user.setLoggedIn(false);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try to log out again.");
    }
  };

  async function navigateToChatPage() {
    const mostRecentChat = await getCurrentUsersChats(
      currentUser,
      setUsersMostRecentChat,
      1
    );
    navigate(`/chats/${mostRecentChat.id}`);
  }

  return (
    <nav className="navbar">
      <a onClick={() => navigate("/home")}>
        <img src={logo} className="logo" />
      </a>
      {user.loggedIn ? (
        <div className="nav-items">
          <div className="icon-container">
            <a onClick={() => navigateToChatPage()} className="link">
              <span
                className={
                  pathname.includes(`/chats/`)
                    ? "material-symbols-outlined icon-link active"
                    : "material-symbols-outlined icon-link"
                }
              >
                chat
              </span>
            </a>
            <a onClick={() => navigate("/search")} className="link">
              <span
                className={
                  pathname === "/search"
                    ? "material-symbols-outlined icon-link bigger-icon active"
                    : "material-symbols-outlined icon-link bigger-icon"
                }
              >
                search
              </span>
            </a>
          </div>
          <div className="nav-profile-picture">
            <a onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
              <ProfilePicture
                id="profile-pic"
                small
                img={getCurrentUser().attributes.ProfilePicture.url()}
              ></ProfilePicture>
            </a>

            <Container
              blue
              id="drop-down"
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
            >
              <a onClick={doUserLogOut}>
                <div className="drop-down-inner-container">
                  <span className="material-symbols-outlined icon-link lightblue">
                    Logout
                  </span>
                  <p className="link-text lightblue">Log out</p>
                </div>
              </a>
            </Container>
          </div>
        </div>
      ) : (
        <div className="navbar-button-container">
          <Button onClick={goToLogin}>Log in</Button>
          <Button lightblue onClick={goToRegister}>
            Sign up
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;