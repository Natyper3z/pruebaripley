import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  background-color: black;
  width: 100%;
  position: relative;
  top: 0;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 45%;
  margin: 0 auto;
`;

const Input = styled.input`
  border-radius: 25px;
  height: 45px;
  width: 100%;
  border: none;
  font-size: 16px;
  padding: 0 15px;
`;

const Img = styled.img`
  height: 40px;
  width: auto;
  position: absolute;
  left: 80px;
  cursor: pointer;
`;

const SearchView = ({ onKeyDown, onLogoClick }) => {
  return (
    <Container>
      <Img src="/logo1.png" onClick={onLogoClick} />
      <InputContainer>
        <Input
          type="text"
          placeholder="Busca SKU..."
          onKeyDown={onKeyDown}
        />
      </InputContainer>
    </Container>
  );
};

SearchView.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onLogoClick: PropTypes.func.isRequired
};

export default SearchView;
