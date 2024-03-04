"use client";

import styles from "../../386/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import StoryRenderer from "@/components/storyRenderer";
import { story } from "@/components/lichendata";
import P5Sketch from "@/components/P5Sketch";

const Home = () => {
  const typeTime = 50;
  const [coordinates, setCoordinates] = useState([]);
  const [shouldRenderStory, setShouldRenderStory] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const handleMouseDown = (event) => {
    event.preventDefault();
    const newCoordinates = [event.clientX, event.clientY];
    setCoordinates((prevCoordinates) => [...prevCoordinates, newCoordinates]);

    if (coordinates.length === 4) {
      setShouldRenderStory(true);
    }
  };

  useEffect(() => {
    let opacityInterval;

    if (shouldRenderStory && coordinates.length === 4) {
      // Set the opacity to 1 initially
      setOpacity(1);

      // Gradually decrease opacity over 10 seconds starting after 30 seconds
      setTimeout(() => {
        opacityInterval = setInterval(() => {
          setOpacity((prevOpacity) => Math.max(prevOpacity - 0.01, 0));
        }, 100);
      }, 500);
    }

    return () => {
      clearInterval(opacityInterval);
    };
  }, [shouldRenderStory, coordinates]);

  return (
    <main onMouseDown={handleMouseDown} style={{ overflow: "auto" }}>
      <div suppressHydrationWarning={true}>
        <Navbar style={{ zIndex: 10 }} />
        <P5Sketch coordinates={coordinates} />
        {shouldRenderStory && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 5,
              margin: 20,
            }}
          >
            <StoryRenderer
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 5,
                margin: 20,
                opacity: opacity,
                transition: "opacity 0.5s ease",
              }}
              stories={story}
              typeTime={typeTime}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;