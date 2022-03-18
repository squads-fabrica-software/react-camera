import React, { useEffect, useRef, useState } from "react";
import { start, takeScreenshot } from "../../services/CameraService";
import { CameraOptions } from "./types";
import useStyles from "./useStyles";

const Camera: React.FC<CameraOptions> = ({
  width,
  maxWidth,
  height,
  maxHeight,
  cropToFit,
  onCameraStart,
  onCameraError,
  onScreenshot,
  idealResolution,
  minResolution,
  idealFacingMode,
  overlayImage,
  overlayAlt = "",
  overlayWidth,
  overlayHeight,
  overlayPosition = "cover",
  btnHidden = false,
  flashAnimation = true,
  mirrorImage = true,
}: CameraOptions) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [videoPlayer, setVideoPlayer] = useState(null);
  const [isFlashAnimationOn, setIsFlashAnimationOn] = useState(false);

  const videoOptions = { idealResolution, minResolution, idealFacingMode };

  const {
    containerStyles,
    wrapperStyles,
    videoStyles,
    canvasStyles,
    imageStyles,
    buttonStyles,
    flashStyles,
  } = useStyles({
    cropToFit,
    width,
    maxWidth,
    height,
    maxHeight,
    overlayPosition,
    overlayWidth,
    overlayHeight,
    btnHidden,
    hasFlashAnimationOn: flashAnimation,
    isFlashAnimationOn,
    mirrorImage,
  });

  const startMedia = () => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (!canvas) {
      return onCameraError
        ? onCameraError(new Error("Canvas not found"))
        : null;
    }

    start(setVideoPlayer, onCameraError, onCameraStart, videoOptions);
  };

  const verifyPermission = async () => {
    navigator.permissions

      // @ts-ignore next line
      .query({ name: "camera" })
      .then((permission) => {
        if (permission.state === "granted") {
          startMedia();
        }

        if (permission.state === "denied") {
          return onCameraError
            ? onCameraError(new Error("Permission denied"))
            : null;
        }

        permission.addEventListener("change", () => {
          switch (permission.state) {
            case "denied":
              onCameraError
                ? onCameraError(new Error("Permission denied"))
                : null;
              break;
            case "granted":
              startMedia();
              break;
            case "prompt":
              window.location.reload();
              break;
            default:
              break;
          }
        });
      })
      .catch((err) => {
        console.error(err);
        if (
          err.message ===
          "'camera' (value of 'name' member of PermissionDescriptor) is not a valid value for enumeration PermissionName."
        ) {
          return startMedia();
        }
      });
  };

  useEffect(() => {
    verifyPermission();
  }, []);

  const handleScreenshot = () => {
    setIsFlashAnimationOn(true);
    const result = takeScreenshot(
      containerRef,
      canvasRef,
      videoPlayer,
      cropToFit
    );

    if (result instanceof Error) {
      return onCameraError ? onCameraError(result) : console.error(result);
    }

    setTimeout(() => setIsFlashAnimationOn(false), 300);

    return onScreenshot ? onScreenshot(result) : null;
  };

  return (
    <>
      <div
        ref={containerRef}
        id="react-camera__container"
        style={containerStyles}
      >
        <div id="react-camera__flash" style={flashStyles} />
        <div id="react-camera__wrapper" style={wrapperStyles}>
          <video id="react-camera__video" style={videoStyles} />
          <canvas
            ref={canvasRef}
            id="react-camera__canvas"
            style={canvasStyles}
          />
          <img
            id="react-camera__overlay"
            src={overlayImage}
            alt={overlayAlt}
            style={imageStyles}
          />
        </div>

        <button
          id="react-camera__button"
          onClick={handleScreenshot}
          style={buttonStyles}
        />
      </div>
    </>
  );
};

export default React.memo(Camera);
