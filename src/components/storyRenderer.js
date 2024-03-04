import React, { useState, useEffect } from "react";

const StoryRenderer = ({ stories, typeTime}) => {
  const [renderComplete, setRenderComplete] = useState(false);
  const [text, setText] = useState("");
  const [storyIndex, setStoryIndex] = useState(0);
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [renderStarted, setRenderStarted] = useState(false);

  useEffect(() => {
    // Randomly select the initial storyIndex only on the first render
    if (storyIndex === 0) {
      const randomIndex = Math.floor(Math.random() * (stories.length-1));
      setStoryIndex(randomIndex);
    }
  }, [storyIndex, stories]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!renderStarted) {
        setRenderStarted(true); // Set renderStarted to true on the first render
      }

      if (charIndex < stories[storyIndex][paragraphIndex].length) {
        setText(
          (prevText) =>
            prevText + stories[storyIndex][paragraphIndex][charIndex]
        );
        setCharIndex((prevIndex) => prevIndex + 1);
      } else if (paragraphIndex < stories[storyIndex].length - 1) {
        // Move to the next paragraph
        setParagraphIndex((prevIndex) => prevIndex + 1);
        setCharIndex(0);
        setText((prevText) => prevText + "<br><br>");
      } else {
        // Rendering complete
        setRenderComplete(true);
      }
    }, typeTime);
    return () => clearTimeout(timer);
  }, [
    text,
    charIndex,
    paragraphIndex,
    storyIndex,
    stories,
    typeTime,
    renderStarted,
    setRenderComplete,
  ]);

  return (
    <p>
      <span dangerouslySetInnerHTML={{ __html: text }} />
      <span className={`${renderComplete ? "blinker" : "noblink"}`}>&#32;</span>
    </p>
  );
};

export default StoryRenderer;
