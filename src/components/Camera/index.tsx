import React, { useEffect, useRef } from "react";
import CameraService from "../../services/CameraService";
import { CameraOptions } from "./types";
import { Container, Wrapper, Video, globalStyles } from "./styles";

const Camera: React.FC<CameraOptions> = (props: CameraOptions) => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const {
    playerWidth,
    playerMaxWidth,
    playerHeight,
    playerMaxHeight,
    cropToFit,
    onCameraStart,
    onCameraError,
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

  return (
    <>
      <Container
        id="react-camera__container"
        width={playerWidth}
        height={playerHeight}
        cropToFit={cropToFit}
      >
        <Wrapper
          id="react-camera__wrapper"
          width={playerWidth}
          height={playerHeight}
          cropToFit={cropToFit}
        >
          <Video
            id="react-camera__video"
            width={playerWidth}
            maxWidth={playerMaxWidth}
            height={playerHeight}
            maxHeight={playerMaxHeight}
            cropToFit={cropToFit}
            ref={videoPlayerRef}
          />
        </Wrapper>
      </Container>
    </>
  );
};

export default Camera;
