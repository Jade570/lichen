// P5Sketch.js
import React, { useEffect } from "react";
import p5 from "p5";

const P5Sketch = ({ coordinates, onTReaches1000 }) => {
  let sketch;
  let transitionValue = 0;
  let zIndex = 1;

  useEffect(() => {
    const desiredFPS = 30;
    let n_line;
    let n_side;
    let n_tail;
    let lineXPos;
    let lineYPos;
    let lineXVel;
    let lineYVel;
    let lineRPos;
    let lineGPos;
    let lineBPos;
    let lineRVel;
    let lineGVel;
    let lineBVel;
    let bgCol;
    let t = 0;

    const setup = (p) => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.frameRate(desiredFPS);
      p.background("#000084");
      n_line = 2;
      n_side = 4;
      n_tail = 6;

      lineXPos = new Array(n_line)
        .fill([])
        .map(() => new Array(n_side).fill([]).map(() => new Array(n_tail)));
      lineYPos = new Array(n_line)
        .fill([])
        .map(() => new Array(n_side).fill([]).map(() => new Array(n_tail)));
      lineXVel = new Array(n_line)
        .fill([])
        .map(() => new Array(n_side).fill([]).map(() => new Array(n_tail)));
      lineYVel = new Array(n_line)
        .fill([])
        .map(() => new Array(n_side).fill([]).map(() => new Array(n_tail)));
      lineRPos = new Array(n_line);
      lineGPos = new Array(n_line);
      lineBPos = new Array(n_line);
      lineRVel = new Array(n_line);
      lineGVel = new Array(n_line);
      lineBVel = new Array(n_line);

      for (let i = 0; i < n_line; i++) {
        for (let j = 0; j < n_side; j++) {
          lineXPos[i][j][0] = p.width * p.random(1);
          lineYPos[i][j][0] = p.height * p.random(1);
          lineXVel[i][j][0] = (0.25 * p.width * p.random(1)) / desiredFPS;
          lineYVel[i][j][0] = (0.25 * p.height * p.random(1)) / desiredFPS;
        }
        lineRPos[i] = p.random(255);
        lineGPos[i] = p.random(255);
        lineBPos[i] = p.random(255);
        lineRVel[i] = (0.5 * p.random(255)) / desiredFPS;
        lineGVel[i] = (0.5 * p.random(255)) / desiredFPS;
        lineBVel[i] = (0.5 * p.random(255)) / desiredFPS;
      }

      for (let i = 0; i < n_line; i++) {
        for (let j = 0; j < n_side; j++) {
          for (let k = 1; k < n_tail; k++) {
            lineXPos[i][j][k] = lineXPos[i][j][k - 1] - lineXVel[i][j][0];
            lineYPos[i][j][k] = lineYPos[i][j][k - 1] - lineYVel[i][j][0];
            lineXVel[i][j][k] = lineXVel[i][j][k - 1];
            lineYVel[i][j][k] = lineYVel[i][j][k - 1];
          }
        }
      }

      for (let i = 0; i < n_line; i++) {
        for (let j = 0; j < n_side; j++) {
          for (let k = 1; k < n_tail; k++) {
            if (lineXPos[i][j][k] < 0) {
              lineXPos[i][j][k] = -lineXPos[i][j][k];
              lineXVel[i][j][k] = -lineXVel[i][j][k];
            }
            if (lineXPos[i][j][k] > p.width) {
              lineXPos[i][j][k] = p.width - lineXPos[i][j][k];
              lineXVel[i][j][k] = -lineXVel[i][j][k];
            }
            if (lineYPos[i][j][k] < 0) {
              lineYPos[i][j][k] = -lineYPos[i][j][k];
              lineYVel[i][j][k] = -lineYVel[i][j][k];
            }
            if (lineYPos[i][j][k] > p.height) {
              lineYPos[i][j][k] = p.height - lineYPos[i][j][k];
              lineYVel[i][j][k] = -lineYVel[i][j][k];
            }
          }
        }
      }

      // Initiating background properties
    };

    const draw = (p) => {
      t++;
      if (coordinates.length === 5) {
        // Cleaning screen and recreating background
        p.background(0, 0, p.map(t, 0, 1000, 84, 0));
        // Drawing line
        if (t >= 1000) {
          for (let i = 0; i < n_line; i++) {
            p.stroke(lineRPos[i], lineGPos[i], lineBPos[i]);
            for (let k = 0; k < n_tail; k++) {
              for (let j = 0; j < n_side - 1; j++) {
                p.line(
                  lineXPos[i][j][k],
                  lineYPos[i][j][k],
                  lineXPos[i][j + 1][k],
                  lineYPos[i][j + 1][k]
                );
              }
              p.line(
                lineXPos[i][n_side - 1][k],
                lineYPos[i][n_side - 1][k],
                lineXPos[i][0][k],
                lineYPos[i][0][k]
              );
            }
          }
        }

        // Updating line position and velocity
        for (let i = 0; i < n_line; i++) {
          for (let j = 0; j < n_side; j++) {
            for (let k = 0; k < n_tail; k++) {
              // Correcting x position
              lineXPos[i][j][k] = lineXPos[i][j][k] + lineXVel[i][j][k];
              if (lineXPos[i][j][k] < 0 || lineXPos[i][j][k] > p.width) {
                lineXVel[i][j][k] = -lineXVel[i][j][k];
              }
              // Correcting y position
              lineYPos[i][j][k] = lineYPos[i][j][k] + lineYVel[i][j][k];
              if (lineYPos[i][j][k] < 0 || lineYPos[i][j][k] > p.height) {
                lineYVel[i][j][k] = -lineYVel[i][j][k];
              }
            }
          }
        }

        // Updating line color
        for (let i = 0; i < n_line; i++) {
          lineRPos[i] = (lineRPos[i] + lineRVel[i]) % 255;
          lineGPos[i] = (lineGPos[i] + lineGVel[i]) % 255;
          lineBPos[i] = (lineBPos[i] + lineBVel[i]) % 255;
        }
      }
    };

    sketch = new p5((p) => {
      p.setup = () => setup(p);
      p.draw = () => draw(p);
    });

    return () => {
      // Cleanup
      sketch.remove();
    };
  }, [coordinates]);

  return (
    <div
      id="p5-canvas"
      style={{
        zIndex: zIndex + 5 * transitionValue,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default P5Sketch;
