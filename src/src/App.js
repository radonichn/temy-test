import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="display-4">Registration app</h1>
      <Form />
    </div>
  );
}

export default App;
