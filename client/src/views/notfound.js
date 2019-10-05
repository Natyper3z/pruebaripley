import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1,
  h2 {
    color: grey;
  }
`;

const Button = styled.button`
  padding: 10px;
  background: #e75353;
  color: white;
  border: none;
  font-weight: 600;
  font-size: 15px;
  border-radius: 5px;
  transition: all 0.5s;
  :hover {
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
`;

const NotFound = ({ onClick }) => {
  return (
    <Container>
      <h1>El producto que buscas no ha sido encontrado</h1>
      <h2>Puedes volver al catálogo para buscar dentro del catálogo</h2>
      <Button onClick={onClick}>Volver al Catálogo</Button>
    </Container>
  );
};

NotFound.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default NotFound;
