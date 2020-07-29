import styled, { css } from "styled-components";

export const GroupHeader = styled.header`
  text-align: left;
  padding: 5px 10px;
  background: #dde9f3;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid black;
`;

export const GroupWrapper = styled.div`
  display: flex;
  border: 1px solid black;
  flex-direction: column;
`;

export const GroupContent = styled.div``;

export const GroupItem = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 8fr 2fr;
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

export const Name = styled.span<{ isHigher: boolean | null }>`
  padding: 5px 10px;
  text-align: left;
  ${(props) =>
    props.isHigher != null &&
    css`
      background-color: ${props.isHigher ? "#ff4e4e54" : "#deffdc"};
    `}
`;

export const Price = styled.span`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: #efefef;
  font-weight: bold;
  justify-content: center;
  flex-shrink: 0;
`;
