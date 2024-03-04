"use client";

const Navbar = () => {
  return (
    <div className="navbar navbar-inverse navbar-fixed-top">
      <div className="navbar-inner">
        <div className="container">
          <button
            type="button"
            className="btn btn-navbar"
            data-toggle="collapse"
            data-target=".nav-collapse"
          >
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="brand" href="#">
            Lichen
          </a>
          <div className="nav-collapse collapse">
            <ul className="nav">
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
