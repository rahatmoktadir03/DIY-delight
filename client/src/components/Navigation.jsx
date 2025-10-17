import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../css/Navigation.css";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <h1>Bolt Bucket 🏎️</h1>
        </li>
      </ul>

      <ul>
        <li>
          <Link to="/" role="button">
            CUSTOMIZE
          </Link>
        </li>
        <li>
          <Link to="/customcars" role="button">
            VIEW CARS
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
