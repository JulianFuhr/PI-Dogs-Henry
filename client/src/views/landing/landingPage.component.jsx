import React from "react";
import { Link } from "react-router-dom";

import "./landing.styles.css";

const LandingPage = () => {
  return (
    <div className="body">
      <title className="title">Landing Page</title>
      <div className="container">
        <br />
        <h1 className="h1">Dogs!</h1>
        <br />
        <p className="text">En este proyecto veras informacion de cada perro</p>
        <Link to="/home">
          <button className="boton">Entrar</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
