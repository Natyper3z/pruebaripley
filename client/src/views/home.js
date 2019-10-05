import React from "react";
import PropTypes from "prop-types";
import { List, Product } from "./../design";
import { Spinner } from "../design";

const HomeView = ({ products, onClick, small = false }) => {
  return !products ? (
    <Spinner />
  ) : (
    <List>
      {(products || []).map(product => (
        <Product
          key={product.uniqueID}
          small={small}
          img={`https:${product.fullImage}`}
          title={product.name}
          prices={product.prices}
          discount={product.prices.discountPercentage || null}
          onClick={() => onClick(product)}
        />
      ))}
    </List>
  );
};

HomeView.propTypes = {
  products: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  small: PropTypes.bool
};

export default HomeView;
