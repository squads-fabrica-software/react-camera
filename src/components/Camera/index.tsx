import React, { useEffect, useRef } from "react";
import CameraService from "../../services/CameraService";
import { CameraOptions } from "./types";
import {
  Container,
  Wrapper,
  Video,
  Canvas,
  Button,
  Image,
  globalStyles,
} from "./styles";

const Camera: React.FC<CameraOptions> = (props: CameraOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    width,
    maxWidth,
    height,
    maxHeight,
    cropToFit,
    onCameraStart,
    onCameraError,
    onScreenshot,
    overlayImage,
    overlayAlt,
    overlayWidth,
    overlayHeight,
    overlayPosition = "cover",
  } = props;

  const CameraServiceInstance = new CameraService();

  const options = { ...props };

  const initializeCamera = async () => {
    if (!videoPlayerRef.current) {
      return;
    }

    const result = await CameraServiceInstance.start(options, videoPlayerRef);

    if (onCameraStart && result instanceof MediaStream) {
      return onCameraStart(result);
    }

    if (onCameraError && result instanceof Error) {
      return onCameraError(result);
    }
  };

  globalStyles(); // sets stitches global styles

  useEffect(() => {
    initializeCamera();
  }, [videoPlayerRef.current]);

  const handleTakeScreenshot = () => {
    if (onScreenshot) {
      const screenshot = CameraServiceInstance.takeScreenshot(
        videoPlayerRef,
        containerRef,
        canvasRef,
        cropToFit
      );

      return onScreenshot(screenshot);
    }
  };

  return (
    <>
      <Container
        id="react-camera__container"
        width={width}
        height={height}
        cropToFit={cropToFit}
        ref={containerRef}
      >
        <Wrapper
          id="react-camera__wrapper"
          width={width}
          height={height}
          cropToFit={cropToFit}
        >
          <Video
            id="react-camera__video"
            width={width}
            maxWidth={maxWidth}
            height={height}
            maxHeight={maxHeight}
            cropToFit={cropToFit}
            ref={videoPlayerRef}
          />
          <Canvas id="react-camera__canvas" ref={canvasRef} />
          <Image
            id="react-camera__overlay"
            src={overlayImage}
            alt={overlayAlt}
            width={overlayWidth}
            height={overlayHeight}
            cropToFit={cropToFit}
            overlayPosition={overlayPosition}
          />
        </Wrapper>
        <Button
          id="react-camera__button"
          ref={buttonRef}
          onClick={handleTakeScreenshot}
        />
      </Container>
    </>
  );
};

export default Camera;
