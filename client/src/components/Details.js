import React from "react";
import api from "./../config/apiRoutes";
import { DetailsView, NotFound, VisitedProductsView } from "../views";

// Match and History comes from router in App.js
const Details = ({ match, history }) => {
  const [product, setProduct] = React.useState(null);
  const [visited, setVisited] = React.useState(null);

  const handleProductClick = ({ partNumber }) => {
    history.push(`/product/${partNumber}`);
  };
  // Fetch product details
  React.useEffect(() => {
    const {
      params: { partNumber }
    } = match;
    // Set scroll to top if needed
    window.scrollTo({ top: 0, behavior: "smooth" });
    // do fetch
    fetch(api.products.byPartNumber(partNumber))
      .then(res => res.json())
      .then(response => setProduct(response));
  }, [match]);

  // Fetch visited products on component mount
  React.useEffect(() => {
    fetch(api.visited.all())
      .then(res => res.json())
      .then(response => setVisited(response));
  }, []);

  return product && product.error ? (
    <NotFound onClick={() => history.push("/")} />
  ) : (
    <>
      <DetailsView product={product} />
      <VisitedProductsView products={visited} onClick={handleProductClick} />
    </>
  );
};

export default Details;
