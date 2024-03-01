import Image from "next/image";
// import styles from "./page.module.css";
import styles from "../../bootstrap/css/bootstrap.css";

export default function Home() {
  return (
    <main>
      <div>
        <div class="navbar navbar-inverse navbar-fixed-top">
          <div class="navbar-inner">
            <div class="container">
              <button
                type="button"
                class="btn btn-navbar"
                data-toggle="collapse"
                data-target=".nav-collapse"
              >
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="brand" href="#">
                Lichen
              </a>
              <div class="nav-collapse collapse">
                <ul class="nav">
                  <li class="active">
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ margin: "20px", marginTop: "45px" }}>
          <h1>Hello, World!</h1>
          <p>When the world was but a tapestry woven from solidified lava, </p>
        </div>
      </div>
    </main>
  );
}
