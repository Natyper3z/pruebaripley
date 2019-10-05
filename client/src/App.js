import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import { Home, Details, Searchbar } from "./components";

const Container = styled.div`
  height: 100vh;
`;

const Padding = styled.div`
  padding: 5px;
  padding-bottom: 30px;
`;

function App() {
  return (
    <Switch>
      <Container>
        <Searchbar />
        <Padding>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/product/:partNumber" component={Details} />
          {/* Little "hack" to refresh page if user clicks logo in dashboard */}
          <Route path="/r" component={null} />{" "}
        </Padding>
      </Container>
    </Switch>
  );
}

export default App;
