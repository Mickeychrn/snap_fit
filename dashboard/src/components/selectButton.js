import React from "react";
import { Button } from "react-bootstrap";

function selectButton() {
  return (
    <div>
      <Button variant="primary" onClick={sayHello}>
        {" "}
        Incomplete
      </Button>
    </div>
  );
}

function sayHello() {
  alert("Hello!");
}

export default selectButton;
