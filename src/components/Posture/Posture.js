import "./posture.css";
import * as pose from "@mediapipe/pose";
import smoothLandmarks from "mediapipe-pose-smooth"; // ES6
import * as cam from "@mediapipe/camera_utils";
import * as drawingUtils from "@mediapipe/drawing_utils";
import { useRef, useEffect, useState, useDebugValue } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Posture() {
  let timeout;

  function myFunction() {
    timeout = setTimeout(alertFunc, 7000);
  }

  function alertFunc() {
    toast("Please sit upright and fix your posture");
    clearTimeout(timeout);
  }

  function findDistance(x1, y1, x2, y2) {
    var dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return dist;
  }
  function findAngle(x1, y1, x2, y2) {
    var theta = Math.acos(
      ((y2 - y1) * -y1) / (Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * y1)
    );
    var degree = (180 / Math.pi) * theta;
    return degree;
  }

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  var camera = null;
  const [didLoad, setdidLoad] = useState(false);

  function onResults(results) {
    // Left shoulder
    var l_shldr_x = results.poseLandmarks[11].x;
    var l_shldr_y = results.poseLandmarks[11].y;
    // Right shoulder
    var r_shldr_x = results.poseLandmarks[12].x;
    var r_shldr_y = results.poseLandmarks[12].y;
    //left ear
    var l_ear_x = results.poseLandmarks[7].x;
    var l_ear_y = results.poseLandmarks[7].y;
    //left hip
    var l_hip_x = results.poseLandmarks[23].x;
    var l_hip_y = results.poseLandmarks[23].y;

    var offset = findDistance(l_shldr_x, l_shldr_y, r_shldr_x, r_shldr_y);
    console.log(results);
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.poseLandmarks) {
      drawingUtils.drawConnectors(
        canvasCtx,
        results.poseLandmarks,
        pose.POSE_CONNECTIONS[9],
        { visibilityMin: 0.65, color: "white" }
      );
      drawingUtils.drawLandmarks(
        canvasCtx,
        Object.values(pose.POSE_LANDMARKS_LEFT).map(
          (index) => results.poseLandmarks[11]
        ),
        { visibilityMin: 0.65, color: "white", fillColor: "rgb(255,138,0)" }
      );
      drawingUtils.drawLandmarks(
        canvasCtx,
        Object.values(pose.POSE_LANDMARKS_RIGHT).map(
          (index) => results.poseLandmarks[12]
        ),
        { visibilityMin: 0.65, color: "white", fillColor: "rgb(0,217,231)" }
      );
    }
    canvasCtx.restore();
    // console.log(pose.POSE_CONNECTIONS[9]);
  }

  useEffect(() => {
    if (!didLoad) {
      const mpPose = new pose.Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });
      mpPose.setOptions({
        selfieMode: true,
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      camera = new cam.Camera(webcamRef.current, {
        onFrame: async () => {
          const canvasElement = canvasRef.current;
          const aspect = window.innerHeight / window.innerWidth;
          let width, height;
          if (window.innerWidth > window.innerHeight) {
            height = window.innerHeight;
            width = height / aspect;
          } else {
            width = window.innerWidth;
            height = width * aspect;
          }
          canvasElement.width = width;
          canvasElement.height = height;
          await mpPose.send({ image: webcamRef.current });
        },
      });
      camera.start();

      mpPose.onResults((results) => smoothLandmarks(results, onResults));
      setdidLoad(true);
    }
  }, [didLoad]);
  myFunction();
  return (
    <div className="Posture">
      <div className="container">
        <video className="input_video" ref={webcamRef} />
        <canvas ref={canvasRef} className="output_canvas"></canvas>
      </div>
    </div>
  );
}

export default Posture;
