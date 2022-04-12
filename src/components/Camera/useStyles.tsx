import React from "react";
import { CameraOptions } from "./types";

interface StyleProps extends CameraOptions {
  hasFlashAnimationOn?: boolean;
  isFlashAnimationOn: boolean;
}

const useStyles = ({
  cropToFit,
  width,
  maxWidth,
  height,
  maxHeight,
  overlayPosition,
  overlayWidth,
  overlayHeight,
  btnHidden,
  hasFlashAnimationOn,
  isFlashAnimationOn,
  mirrorImage,
}: StyleProps) => {
  const resetingStyles = {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  };

  const containerStyles = {
    display: "block",
    overflow: "hidden",
    position: "relative",
    width,
    maxWidth: cropToFit === "3:4" ? "100%" : maxWidth,
    height: cropToFit === "3:4" ? "auto" : height,
    maxHeight,
    aspectRatio: cropToFit === "3:4" ? "3 / 4" : "auto",
    ...resetingStyles,
    margin: "0 auto",
  } as React.CSSProperties;

  const wrapperStyles = {
    width: cropToFit === "3:4" ? "auto" : width,
    maxWidth: cropToFit === "3:4" ? "100% !important" : maxWidth,
    height: cropToFit === "3:4" ? "100%" : height,
    position: "relative",
    zIndex: 1,
    ...resetingStyles,
  } as React.CSSProperties;

  const getVideoTransformProperty = (
    cropToFit: "3:4" | undefined,
    mirrorImage: boolean | undefined
  ) => {
    if (cropToFit === "3:4" && mirrorImage) {
      return "translateX(-50%) rotateY(180deg)";
    } else if (cropToFit === "3:4" && !mirrorImage) {
      return "translateX(50%)";
    } else if (cropToFit !== "3:4" && mirrorImage) {
      return "rotateY(180deg)";
    } else if (cropToFit !== "3:4" && !mirrorImage) {
      return "none";
    }

    return "none";
  };

  const videoStyles = {
    maxWidth: cropToFit === "3:4" ? "none" : maxWidth,
    width: cropToFit === "3:4" ? "auto" : width,
    height: cropToFit === "3:4" ? "100%" : height,
    position: cropToFit === "3:4" ? "relative" : "absolute",
    top: "auto",
    left: cropToFit === "3:4" ? "50%" : "auto",
    transform: getVideoTransformProperty(cropToFit, mirrorImage),
    display: "none",
    ...resetingStyles,
  } as React.CSSProperties;

  const canvasStyles = {
    display: "none",
  };

  const imageStyles = {
    // width: overlayWidth || width,
    overlayHeight: overlayHeight || height,
    height,
    display: "block",
    position: "absolute",
    top: overlayPosition === "center" ? "50%" : 0,
    left: overlayPosition === "center" ? "50%" : 0,
    transform: overlayPosition === "center" ? "translate(-50%, -50%)" : "none",
    ...resetingStyles,
    width: "100%",
  } as React.CSSProperties;

  const buttonStyles = {
    width: 40,
    height: 40,
    background: "#CFCFCF",
    outline: "5px solid #FFFFFF36",
    border: "none",
    borderRadius: "50%",
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    transition: "all 0.3s ease-out",
    "&:active": {
      background: "#FFFFFF",
      outline: "5px solid #FFFFFF6F",
    },
    display: btnHidden ? "none" : "block",
    zIndex: 9,
    ...resetingStyles,
  } as React.CSSProperties;

  const flashStyles = hasFlashAnimationOn
    ? ({
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        background: "rgba(250, 250, 250, 0.8)",
        zIndex: 2,
        transition: "opacity 0.15s ease-out",
        opacity: isFlashAnimationOn ? 1 : 0,
        ...resetingStyles,
      } as React.CSSProperties)
    : ({ opacity: 0, visibility: "hidden" } as React.CSSProperties);

  return {
    containerStyles,
    wrapperStyles,
    videoStyles,
    canvasStyles,
    imageStyles,
    buttonStyles,
    flashStyles,
  };
};

export default useStyles;
