import styled, { css } from "styled-components";

const ChatPreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: var(--secondary-lightblue);
  border-radius: 3px;
  padding: 1.6rem;
  &:hover {
    background: var(--secondary-darkblue);
  }

  ${(props) =>
    props.active &&
    css`
      background: var(--secondary-darkblue);
    `}
`;

export default ChatPreviewContainer;
