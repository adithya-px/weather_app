

      {/* <nav class="navbar sticky-top bg-dark border-bottom border-body" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
        </div>
        </nav> */}
import React from "react";
import "./header.css"; // or use styled-components

export default function Header() {
  return (
    <nav className="navbar sticky-top navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <img src="logo.svg" height={30} width={30}></img>
        <a className="navbar-brand neon-text" href="#">WeatherApp</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fa-solid fa-bars-staggered" style={{ color: "#00ffff" }}></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link neon-hover" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link neon-hover" href="#">Forecast</a>
            </li>
            <li className="nav-item">
              <a className="nav-link neon-hover" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

