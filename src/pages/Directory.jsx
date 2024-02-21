import React from "react";
import { Link } from "react-router-dom";

function Directory() {
  return (
    <>
      <h2>Directory Page</h2>

      <ul>
        <li>
          <Link to="/region/us/home">US</Link>
        </li>
        <li>
          <Link to="/region/eu/home">EU</Link>
        </li>
      </ul>
    </>
  );
}

export default Directory;
