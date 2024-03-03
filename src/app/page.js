"use client";

import styles from "../../386/css/bootstrap.css";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import StoryRenderer from "@/components/storyRenderer";
import { story } from "@/components/lichendata";

const Home = () => {
  const typeTime = 50;
  const [coordinates, setCoordinates] = useState([]);
  const [shouldRenderStory, setShouldRenderStory] = useState(false);

  const handleMouseDown = (event) => {
    console.log("clicked");
    const newCoordinates = [event.clientX, event.clientY];
    setCoordinates((prevCoordinates) => [...prevCoordinates, newCoordinates]);

    if (coordinates.length === 4) {
      setShouldRenderStory(true);
    }
  };

  return (
    <main
      onMouseDown={handleMouseDown}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div suppressHydrationWarning={true}>
        <Navbar />
        <div style={{ margin: "20px", marginTop: "45px" }}>
          <p>
            {shouldRenderStory ? (
                <StoryRenderer
                  stories={story}
                  typeTime={typeTime}
                />
            ) : (
              <span className="blinker">&#32;</span>
            )}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Home;
