import React from "react";
import { Link } from "react-router-dom";

import "./landing.styles.css";

const LandingPage = () => {
  return (
    <div className="container-landing">
      <section className="full">
        <div className="">
          <br />
          <h1 className="h1-land">Dogs!</h1>
          <br />
          <p className="text-land">
            En éste proyecto veras información de cada perro
          </p>
          <Link to="/home">
            <button className="boton-in">Entrar</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
