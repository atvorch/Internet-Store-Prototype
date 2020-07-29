import styled from "styled-components";

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 2fr 1fr;
  grid-column-gap: 10px;
  padding: 10px;
  align-items: center;
  &:not(:last-child) {
    border-bottom: 1px solid #adadad;
  }
`;

export const Name = styled.span`
  padding: 5px 10px;
  text-align: left;
`;

export const Quantity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const QuantityInput = styled.input`
  width: 40px;
  margin-right: 10px;
`;
export const QuantityWarning = styled.div`
  text-align: left;
  margin-top: 5px;
  border: 1px dotted orange;
  padding: 5px;
  font-weight: 100;
  color: coral;
  background: antiquewhite;
  font-size: 14px;
`;
export const Price = styled.span`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-weight: bold;
  justify-content: center;
`;
export const Delete = styled.button``;
