import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  box-sizing: border-box;
  margin: 10px 4px;
  padding: 0;
  color: #000;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;
  ${({ small }) => {
    if (small) {
      return "height: auto; width: 150px";
    }
    return "height: 350px; width: 280px";
  }}

  position: relative;
  :hover {
    border-color: rgba(0, 0, 0, 0.09);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
`;

const Header = styled.div`
  img {
    width: 100%;
    display: block;
  }

  h2 {
    margin-left: 5px;
    opacity: 0.6;
    font-size: 13px;
  }
`;

const Body = styled.div`
  padding: 5px;
`;

const Discount = styled.div`
  position: absolute;
  right: 0;
  color: white;
  background-color: #e75353;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 5px;
  font-weight: 600;
`;

const Prices = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin: 0;
    text-decoration: line-through;
    font-weight: 500;
    font-size: 12px;
    line-height: 1.3em;
    :last-child {
      text-decoration: none;
      color: #e75353
      font-weight: 600;
      font-size: 16px;
    }
    :first-child ~ li:not(:last-child) {
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
    }
  }

  img {
    margin-left: 4px;
    width: 18px;
    height: 12px;
  }
`;

const Product = ({
  img,
  title,
  prices: { formattedListPrice, formattedCardPrice, formattedOfferPrice },
  discount,
  onClick,
  small = false
}) => {
  return (
    <Container onClick={onClick} small={small}>
      {discount && <Discount>-{discount}%</Discount>}
      <Header>
        <img alt="cover" src={img} />
        <h2>{title}</h2>
      </Header>
      <Body>
        <Prices>
          <li>{formattedListPrice}</li>
          {discount && formattedListPrice !== formattedOfferPrice && (
            <li>{formattedOfferPrice}</li>
          )}
          {discount && formattedCardPrice && (
            <li>
              {formattedCardPrice}
              <img
                src="https://static.ripley.cl/images/opex.png"
                alt="Precio Tarjeta Ripley"
              />
            </li>
          )}
        </Prices>
      </Body>
    </Container>
  );
};

Product.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  prices: PropTypes.object.isRequired,
  discount: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

export default Product;
