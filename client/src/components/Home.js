import React from "react";
import api from "./../config/apiRoutes";
import { HomeView } from "../views";

// history object comes from react-router-dom in App.js
const Home = ({ history }) => {
  const [products, setProducts] = React.useState(null);

  const loadDetails = ({ partNumber }) => {
    history.push(`/product/${partNumber}`);
  };

  // At component mount, load products
  React.useEffect(() => {
    fetch(api.products.all())
      .then(res => res.json())
      .then(response => {
        setProducts(response);
      });
  }, []);

  return <HomeView products={products} onClick={loadDetails} />;
};

export default Home;
