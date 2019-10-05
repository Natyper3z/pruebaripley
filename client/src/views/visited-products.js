import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import HomeView from "./home";

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 950px;
`;

// Reuse HomeView, with an aditional container
const VisitedProducts = ({ products, onClick }) => {
  return (
    <Container>
      <h2>Visitados recientemente</h2>
      <HomeView products={products} onClick={onClick} small={true} />
    </Container>
  );
};

VisitedProducts.propTypes = {
  products: PropTypes.array,
  onClick: PropTypes.func.isRequired
};

export default VisitedProducts;
