import { Dispatch, SetStateAction, RefObject } from "react";
import {
  CameraOptions,
  ResolutionsToCrop,
  ResolutionString,
} from "../components/Camera/types";

interface VideoOptions {
  idealResolution?: ResolutionString;
  minResolution?: ResolutionString;
  idealFacingMode?: "user" | "environment";
}

const start = (
  setVideoPlayer: Dispatch<SetStateAction<HTMLVideoElement | null>>,
  onCameraError: ((error: Error) => void) | undefined,
  onCameraStart: ((mediaStream: MediaStream) => void) | undefined,
  videoOptions: VideoOptions
) => {
  const isThereGetUserMedia =
    // @ts-ignore next line
    navigator.getUserMedia || // @ts-ignore next line
    navigator.webkitGetUserMedia || // @ts-ignore next line
    navigator.mozGetUserMedia || // @ts-ignore next line
    navigator.msGetUserMedia; // @ts-ignore next line

  if (!isThereGetUserMedia) {
    return onCameraError
      ? onCameraError(new Error("This browser doesn't support camera"))
      : null;
  }

  if (navigator.mediaDevices === undefined) {
    // @ts-ignore next line
    navigator.mediaDevices = {};
  }

  if (navigator.mediaDevices.getUserMedia === undefined) {
    // @ts-ignore next line
    navigator.mediaDevices.getUserMedia = function (constraints) {
      // First get ahold of the legacy getUserMedia, if present
      var getUserMedia = isThereGetUserMedia;

      // Some browsers just don't implement it - return a rejected promise with an error
      // to keep a consistent interface
      if (!getUserMedia) {
        return onCameraError
          ? onCameraError(new Error("This browser doesn't support camera"))
          : null;
      }

      // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    };
  }

  // get video element
  const video = document.getElementById(
    "react-camera__video"
  ) as HTMLVideoElement;
  video.setAttribute("autoplay", "");
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");

  const constraints = getCameraConstraints(videoOptions);

  // tenta abrir a câmera de video
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      if ("srcObject" in video) {
        video.srcObject = stream;
      } else {
        // Avoid using this in new browsers, as it is going away.
        video.src = window.URL.createObjectURL(
          stream as unknown as MediaSource
        );
      }

      video.onloadedmetadata = function () {
        video.play().then(() => {
          console.log("PLAY");
          setVideoPlayer(video);
          return onCameraStart ? onCameraStart(stream) : null;
        });
      };
    })
    .catch((err) => {
      if (onCameraError) {
        return onCameraError(err);
      }

      console.log(err);
      return null;
    });
};

const getCameraConstraints = (
  options: CameraOptions
): MediaStreamConstraints => {
  const { idealResolution, minResolution, idealFacingMode } = options;

  const idealWidth = idealResolution
    ? getResolution(idealResolution).width
    : 1920;
  const idealHeight = idealResolution
    ? getResolution(idealResolution).height
    : 1080;
  const minWidth = minResolution ? getResolution(minResolution).width : 640;
  const minHeight = minResolution ? getResolution(minResolution).height : 480;

  let constraints: MediaStreamConstraints = {
    audio: false,
  };

  let videoConstraints: MediaTrackConstraints = {
    width: {
      min: minWidth,
      ideal: idealWidth,
    },
    height: {
      min: minHeight,
      ideal: idealHeight,
    },
  };
  const doesBrowserAllowFacingMode =
    navigator.mediaDevices.getSupportedConstraints().facingMode;

  if (!doesBrowserAllowFacingMode) {
    console.error(
      "Browser does not support setting facing mode property. This property would allow us to decide which camera (back or frontal) to use."
    );
  } else if (isMobile() && idealFacingMode) {
    videoConstraints.facingMode = { ideal: idealFacingMode };
  }

  constraints.video = videoConstraints;

  return constraints;
};

const isMobile = (): boolean => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  }

  return false;
};

const getResolution = (
  resolutionStr: ResolutionString
): { width: number; height: number } => {
  const [width, height] = resolutionStr.split("x");

  return {
    width: Number(width),
    height: Number(height),
  };
};

const takeScreenshot = (
  containerRef: RefObject<HTMLDivElement>,
  canvasRef: RefObject<HTMLCanvasElement>,
  videoPlayer: HTMLVideoElement | null,
  cropToFit: ResolutionsToCrop | undefined
): Error | string => {
  const container = containerRef.current;
  const video = videoPlayer as HTMLVideoElement;
  const canvas = canvasRef.current as HTMLCanvasElement;
  const ctx = canvas?.getContext("2d");

  if (!container || !ctx || !video) {
    return new Error("Video or canvas element not found.");
  }

  ctx.canvas.width = container.clientWidth;
  ctx.canvas.height = container?.clientHeight;

  if (!cropToFit) {
    ctx?.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);
  } else if (cropToFit === "3:4") {
    const ratioResolutionToVideo = video.videoWidth / video.clientWidth;
    const cropStartX = Math.floor(
      ((video.clientWidth - container.clientWidth) / 2) * ratioResolutionToVideo
    );
    const cropStartY = 0;
    const cropWidth = Math.floor(
      container.clientWidth * ratioResolutionToVideo
    );
    const cropHeight = Math.floor(
      container.clientHeight * ratioResolutionToVideo
    );

    ctx?.drawImage(
      video,
      cropStartX,
      cropStartY,
      cropWidth,
      cropHeight,
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );
  }

  const image = new Image();
  image.src = canvas.toDataURL("image/jpeg");

  return image.src;
};

export { start, takeScreenshot };
