import React from "react";
import { withRouter } from "react-router-dom";
import { Search } from "../views";

const Searchbar = ({ history }) => {
  const handleSearch = event => {
    if (event.key === "Enter") {
      const partNumber = event.target.value;
      history.push(`/product/${partNumber}`);
    }
  };

  const handleLogoClick = () => {
    history.push("/r");
    // Little "hack" to make page reload if logo is click on dashboard
    setTimeout(() => {
      history.push("/");
    });
  };

  return <Search onKeyDown={handleSearch} onLogoClick={handleLogoClick} />;
};

// As this component is not part of a route, we need withRouter HOC to get the history prop.
export default withRouter(Searchbar);
