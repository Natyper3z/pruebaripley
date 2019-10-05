import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { Markup } from "interweave";
import { Spinner, Slider } from "../design";

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  max-width: 950px;
`;

const ShortDescription = styled.p`
  opacity: 0.6;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 13px;
`;

const Title = styled.h2`
  font-size: 18px;
`;

const Sku = styled.h3`
  font-size: 10px;
  opacity: 0.6;
  letter-spacing: 1px;
  margin: 0;
`;

const Discount = styled.span`
  color: white;
  background-color: #e75353;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 5px;
  font-weight: 600;
`;

const Points = styled.span`
  color: #70578b;
  font-weight: 400;
`;

const Price = styled.span`
  color: #999;
  ${({ strong }) => strong && "font-weight: 600;"};
`;

const CardPrice = styled.span`
  color: #e75353;
  font-weight: 600;

  img {
    width: 21px;
    height: 14px;
    margin-right: 4px;
  }
`;

const LeftPanel = styled.div`
  width: 60%;
`;

const RightPanel = styled.div`
  box-sizing: border-box;
  width: 40%;
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
`;

const OpenCloseAnimation = keyframes`
  0% {
    font-size: 0;
    opacity: 0;
  }
  100% {
    font-size: 1em;
    opacity: 0;
  }
`;
const FadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Details = styled.details`
  margin-top: 13px;

  summary::-webkit-details-marker {
    display: none;
  }

  summary {
    background: #f0f0f0;
    color: grey;
    font-weight: 600;
    text-transform: uppercase;
    padding: 12px;
    margin-bottom: 10px;
  }

  summary:after {
    border-radius: 5px;
    content: "+";
    color: grey;
    float: left;
    font-size: 1.5em;
    font-weight: bold;
    margin: -5px 10px 0 0;
    padding: 0;
    text-align: center;
    width: 20px;
  }

  &[open] summary:after {
    content: "-";
  }

  &[open] div {
    animation-name: ${OpenCloseAnimation}, ${FadeInAnimation};
    animation-duration: 500ms, 200ms;
    animation-delay: 0ms, 500ms;
    animation-direction: alternate, alternate;
  }
`;

const DivRow = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 5px 15px;
  border-top: 1px solid #ddd;
  ${({ index }) => index % 2 !== 1 && "background-color: #f9f9f9"}
`;

const DetailsView = ({ product }) => {
  return !product ? (
    <Spinner />
  ) : (
    <Container>
      <div style={{ display: "flex" }}>
        <LeftPanel>
          <Slider images={product.images} />
        </LeftPanel>
        <RightPanel>
          <Title>{product.name}</Title>
          <Sku>SKU: {product.partNumber}</Sku>
          {product.shortDescription && (
            <ShortDescription>{product.shortDescription}</ShortDescription>
          )}
          <PriceContainer>
            <Price>Normal</Price>{" "}
            <Price>{product.prices.formattedListPrice}</Price>
          </PriceContainer>
          <PriceContainer>
            <Price strong={true}>Internet</Price>
            <Price strong={true}>{product.prices.formattedOfferPrice}</Price>
          </PriceContainer>
          {product.prices.formattedCardPrice && (
            <PriceContainer>
              <CardPrice>Tarjeta Ripley</CardPrice>
              <CardPrice>
                <img
                  src="https://static.ripley.cl/images/opex.png"
                  alt="Precio Tarjeta Ripley"
                />
                {product.prices.formattedCardPrice}
              </CardPrice>
            </PriceContainer>
          )}
          {product.prices.discountPercentage > 0 && (
            <PriceContainer>
              <span>Descuento</span>
              <Discount>-{product.prices.discountPercentage}%</Discount>
            </PriceContainer>
          )}
          {product.prices.ripleyPuntos && (
            <PriceContainer>
              <Points>Acumulas</Points>
              <Points>{product.prices.ripleyPuntos} Ripley Puntos GO</Points>
            </PriceContainer>
          )}
        </RightPanel>
      </div>
      <Details>
        <summary>Descripción</summary>
        <Markup
          content={product.longDescription.replace(/<head>.+<\/head>/g, "")}
        />
      </Details>
      <Details>
        <summary>Especificaciones</summary>
        {product.attributes
          .filter(({ displayable }) => displayable)
          .map(({ name, value }, index) => (
            <DivRow key={name} index={index}>
              <div style={{ width: "30%" }}>{name}</div>
              <div style={{ width: "70%" }}>{value}</div>
            </DivRow>
          ))}
      </Details>
    </Container>
  );
};

DetailsView.propTypes = {
  product: PropTypes.object
};

export default DetailsView;
