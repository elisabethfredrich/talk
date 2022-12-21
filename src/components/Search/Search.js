import "./Search.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalLine from "../StyledComponents/HorizontalLine";
import Button from "../StyledComponents/Button";
import Container from "../StyledComponents/Containers/Container";
import Input from "../Input/Input";
import ShortInfo from "../ShortInfo/ShortInfo";
import BlueBox from "../StyledComponents/Containers/BlueBox";
import getCurrentUser from "../../API/UserAPICalls";
import { getAllGroups, getAllProfiles } from "../../API/SpecificAPICalls";

const Search = () => {
  const navigate = useNavigate();
  let currentUser = getCurrentUser();

  const [searchResultsProfiles, setSearchResultsProfiles] = useState([]);
  const [searchResultsGroups, setSearchResultsGroups] = useState([]);
  const [inputField, setInputField] = useState();

  useEffect(() => {
    getSearchContent();
  }, []);

  const getSearchContent = async () => {
    setSearchResultsProfiles(await getAllProfiles());
    setSearchResultsGroups(await getAllGroups());
  };

  const handleChange = (e) => {
    setInputField(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="page-content-container ">
      <BlueBox>
        <h2>Search for profiles and groups</h2>
        <form className="flex-container-horizontal" onSubmit={handleSearch}>
          <button type="submit" className="icon-btn">
            <span className="material-symbols-outlined icon-link">search</span>
          </button>
          <Input
            onChange={handleChange}
            values={inputField}
            placeholder="Search for a topic or name"
          ></Input>
        </form>
      </BlueBox>

      <div className="search-page-grid">
        <div className="search-header">
          <h1>Search Results</h1>
        </div>

        <div className="flex-container-horizontal search-results">
          <Container blue>
            <h2
              className="h2-sub"
              style={{ color: "var(--secondary-lightblue" }}
            >
              Groups
            </h2>
            <HorizontalLine width="90%" />
            {searchResultsGroups &&
              searchResultsGroups.map((chat) => (
                <ShortInfo
                  key={chat.id}
                  img={chat.img.url()}
                  badge={chat.badge}
                  btnGroup={"Join"}
                  info={chat.name}
                  userId={currentUser}
                  chatId={chat.id}
                />
              ))}
          </Container>

          <Container blue>
            <h2
              className="h2-sub"
              style={{ color: "var(--secondary-lightblue" }}
            >
              Profiles
            </h2>
            <HorizontalLine width="90%" />
            {searchResultsProfiles &&
              searchResultsProfiles.map((profile) => (
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
              ))}
          </Container>
        </div>

        <div className="add-group-container">
          <Container blue>
            <p className="material-symbols-outlined icon-link filled-icon large-icon">
              group_add
            </p>
            <Button onClick={() => navigate("/groupregistration")} blue>
              Create new group
            </Button>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Search;
