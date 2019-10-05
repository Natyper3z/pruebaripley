import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
`;

const List = ({ children }) => {
  return <ListContainer>{children}</ListContainer>;
};

export default List;
