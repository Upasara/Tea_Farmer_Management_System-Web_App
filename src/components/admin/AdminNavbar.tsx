import React, { useState, useContext, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/home.css";
import "../assets/css/bootstrap.min.css";
import UserContext from "../context/UserContext";
import { AuthService } from "../servises/AuthService";
import $ from 'jquery';

const AdminNavBar: React.FC = () => {
  const [user, setUser] = useContext(UserContext);
  const token = AuthService.getToken();
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    window.location.href = "/";
  };
  useEffect(() => {
    $('.hamberger-button').on('click', function (e) {
      console.log("Hello!");
      $('.popup-mobile-menu').addClass('active');
    });

    $('.close-menu').on('click', function (e) {
      $('.popup-mobile-menu').removeClass('active');
      $('.popup-mobile-menu .mainmenu .has-droupdown > a').siblings('.submenu, .mega-menu').removeClass('active').slideUp('400');
      $('.popup-mobile-menu .mainmenu .has-droupdown > a').removeClass('open');
    });

    $('.popup-mobile-menu .mainmenu .has-droupdown > a').on('click', function (e) {
      e.preventDefault();
      console.log("Hello!");
      $(this).siblings('.submenu, .mega-menu').toggleClass('active').slideToggle('400');
      $(this).toggleClass('open');
    });

    $('.popup-mobile-menu, .splash-mobile-menu .mainmenu li a').on('click', function (e) {
      e.target === this && $('.popup-mobile-menu').removeClass('active') && $('.popup-mobile-menu .mainmenu .has-droupdown > a').siblings('.submenu, .mega-menu').removeClass('active').slideUp('400') && $('.popup-mobile-menu .mainmenu .has-droupdown > a').removeClass('open');
    });
  }, []);

  return (
    <header className="edu-header header-style-1 header-fullwidth">
      <div id="edu-sticky-placeholder"></div>
      <div className="header-mainmenu">
        <div className="container-fluid">
          <div className="header-navbar">
            <div className="header-brand">
              <div className="logo">
                <a href="/dashboard">
                  {/* <img
                    className="logo-light img-logo"
                    src="../assets/images/logo/logo-v1.png"
                    alt="Corporate Logo"
                  />
                  <img
                    className="logo-dark img-logo"
                    src="../assets/images/logo/logo-v1.png"
                    alt="Corporate Logo"
                  /> */}
                </a>
              </div>
            </div>
            <div className="header-mainnav">
              <nav className="mainmenu-nav">
                <ul className="mainmenu">
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>

                  <li>
                    <NavLink to="/user-complaints">User Complaints</NavLink>
                  </li>

                  <li>
                    <NavLink to="/company-updates">Company Updates</NavLink>
                  </li>

                </ul>
              </nav>
            </div>
            <div className="header-right">
              <ul className="header-action">
                <li className="header-btn">
                  <button className="edu-btn btn-medium" onClick={logout}>Log Out <i className="ri-logout-box-r-line" style={{ fontSize: "13px" }}></i></button>
                </li>
                <li className="mobile-menu-bar d-block d-xl-none">
                  <button className="hamberger-button">
                    <i className="icon-54"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="popup-mobile-menu">
        <div className="inner">
          <div className="header-top">
            <div className="logo">
              <a href="index.html">
                <img
                  className="logo-light img-logo"
                  src="../assets/images/logo/logo-v1.png"
                  alt="Corporate Logo"
                />
                <img
                  className="logo-dark img-logo"
                  src="../assets/images/logo/logo-v1.png"
                  alt="Corporate Logo"
                />
              </a>
            </div>
            <div className="close-menu">
              <button className="close-button">
                <i className="icon-73"></i>
              </button>
            </div>
          </div>
          <ul className="mainmenu">
            <li>
              <a href="/services">Home</a>
            </li>


            <li>
              {" "}
              <a href="#" className="edu-btn">Log Out <i className="ri-logout-box-r-line" style={{ fontSize: "13px" }}></i></a>
            </li>
          </ul>
        </div>
      </div >

      <div className="edu-search-popup">
        <div className="content-wrap">
          <div className="site-logo">
            {/* <img
              className="logo-light"
              src="../assets/images/logo/logo-dark.png"
              alt="Corporate Logo"
            />
            <img
              className="logo-dark"
              src="../assets/images/logo/logo-white.png"
              alt="Corporate Logo"
            /> */}
          </div>
          <div className="close-button">
            <button className="close-trigger">
              <i className="icon-73"></i>
            </button>
          </div>
          <div className="inner">
            <form className="search-form" action="#">
              <input
                type="text"
                className="edublink-search-popup-field"
                placeholder="Search Here..."
              />
              <button className="submit-button">
                <i className="icon-2"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header >
  );
};

export default AdminNavBar;
