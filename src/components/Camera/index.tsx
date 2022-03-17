import React, { useEffect, useRef, useState } from "react";
import CameraService from "../../services/CameraService";
import { CameraOptions } from "./types";
import {
  Container,
  Flash,
  Wrapper,
  Video,
  Canvas,
  Button,
  Image,
  globalStyles,
} from "./styles";

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
  overlayAlt,
  overlayWidth,
  overlayHeight,
  overlayPosition = "cover",
  btnHidden = false,
  flashAnimation = true,
}: CameraOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isFlashAnimationOn, setIsFlashAnimationOn] = useState(false);

  const CameraServiceInstance = new CameraService();

  const options = { idealResolution, minResolution, idealFacingMode };

  const initializeCamera = async () => {
    if (!videoPlayerRef.current) {
      return;
    }

    try {
      const result = await CameraServiceInstance.start(options, videoPlayerRef);
      if (onCameraStart && result instanceof MediaStream) {
        return onCameraStart(result);
      }
    } catch (error) {
      if (onCameraError) {
        return onCameraError(error);
      }
    }
  };

  globalStyles(); // sets stitches global styles

  useEffect(() => {
    initializeCamera();
  });

  const handleTakeScreenshot = () => {
    if (flashAnimation) {
      setIsFlashAnimationOn(true);
    }

    if (onScreenshot) {
      const screenshot = CameraServiceInstance.takeScreenshot(
        videoPlayerRef,
        containerRef,
        canvasRef,
        cropToFit
      );

      onScreenshot(screenshot);
    }

    if (flashAnimation) {
      setTimeout(() => setIsFlashAnimationOn(false), 200);
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
        <Flash
          id="react-camera__flash"
          flashAnimation={flashAnimation}
          isOn={isFlashAnimationOn}
        />
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
          onClick={handleTakeScreenshot}
          hidden={btnHidden}
        />
      </Container>
    </>
  );
};

export default React.memo(Camera);
