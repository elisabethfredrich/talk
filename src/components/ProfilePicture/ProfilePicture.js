import React, { useState, useEffect } from "react";
import {
  StyledProfilePicture,
  Badge,
  Container,
  ImageContainer,
} from "../StyledComponents/ProfilePicture";

const ProfilePicture = (props) => {
  const [isHorizontal, setIsHorizontal] = useState(false);

  useEffect(() => {
    const isPictureHorizontal = () => {
      if (document.querySelector("#" + props.id) !== null) {
        let profileImg = document.querySelector("#" + props.id);
        let picWidth = profileImg.naturalWidth;
        let picHeight = profileImg.naturalHeight;
        let horizontal = false;
        if (picHeight < picWidth) {
          horizontal = true;
        }
        setIsHorizontal(horizontal);
      }
    };
    isPictureHorizontal();
  }, [props.id]);

  return (
    <Container>
      {props.badge && (
        <Badge src={props.badge} small={props.small} tiny={props.tiny} />
      )}
      <ImageContainer small={props.small} tiny={props.tiny}>
        {isHorizontal ? (
          <StyledProfilePicture
            src={props.img}
            id={props.id}
            small={props.small}
            horizontal
          />
        ) : (
          <StyledProfilePicture
            src={props.img}
            id={props.id}
            small={props.small}
            vertical
          />
        )}
      </ImageContainer>
    </Container>
  );
};

export default ProfilePicture;
