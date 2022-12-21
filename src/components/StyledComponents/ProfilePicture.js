import styled, { css } from "styled-components";

export const StyledProfilePicture = styled.img`
  ${(props) =>
    props.vertical &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.horizontal &&
    css`
      height: 100%;
    `}
`;

export const Badge = styled.img`
  border-radius: 50%;
  position: absolute;
  bottom: 5%;
  right: 0%;
  width: 30px;
  height: 30px;

  ${(props) =>
    props.small &&
    css`
      width: 16px;
      height: 16px;
    `}
  ${(props) =>
    props.tiny &&
    css`
      width: 12px;
      height: 12px;
    `}
`;

export const Container = styled.div`
  position: relative;
  display: inline-block;
  color: var(--primary-red);
`;

export const ImageContainer = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 150px;
  height: 150px;

  ${(props) =>
    props.small &&
    css`
      width: 50px;
      height: 50px;
    `}
  ${(props) =>
    props.tiny &&
    css`
      width: 30px;
      height: 30px;
    `}
`;
