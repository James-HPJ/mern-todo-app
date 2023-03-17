import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const MainNavigation = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Note Maker</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default MainNavigation;
