import React from "react";
import { UserStatusContext } from "../UserStatusContext";
import { useContext } from "react";
import HomeLoggedIn from "./HomeLoggedIn";
import HomeNotLoggedIn from "./HomeNotLoggedIn";

const Home = () => {
  const user = useContext(UserStatusContext);

  return (
    <div>
      {user.loggedIn ? (
        <HomeLoggedIn></HomeLoggedIn>
      ) : (
        <HomeNotLoggedIn></HomeNotLoggedIn>
      )}
    </div>
  );
};

export default Home;
