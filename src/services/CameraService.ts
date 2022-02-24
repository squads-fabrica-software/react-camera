import React from "react";
import {
  CameraOptions,
  ResolutionsToCrop,
  ResolutionString,
} from "../components/Camera/types";

class CameraService {
  public start(
    options: CameraOptions,
    videoRef: React.RefObject<HTMLVideoElement>
  ): Promise<MediaStream | Error> | Error {
    this.getUserMedia();

    const video = this.getVideoElement(videoRef);

    const constraints = this.getCameraConstraints(options);

    return new Promise((resolve, reject) =>
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          const videoPlayer = video as HTMLVideoElement;

          if ("srcObject" in video) {
            videoPlayer.srcObject = stream;
          } else {
            // Only using this for older browsers.
            videoPlayer.src = window.URL.createObjectURL(
              stream as unknown as MediaSource
            );
          }

          video.onloadedmetadata = function () {
            videoPlayer.play().then(() => resolve(stream));
          };
        })
        .catch(async function (error) {
          reject(error);
        })
    );
  }

  public takeScreenshot(
    videoRef: React.RefObject<HTMLVideoElement>,
    containerRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    cropToFit: ResolutionsToCrop | undefined
  ): string | Error {
    const video = videoRef.current;
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || !container) {
      return new Error("Video or canvas element not found.");
    }

    const ctx = canvas.getContext("2d");

    if (!ctx || !ctx.canvas) {
      return new Error("Canvas context not found.");
    }

    ctx.canvas.width = container.clientWidth;
    ctx.canvas.height = container.clientHeight;

    if (!cropToFit) {
      ctx?.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height);
    } else if (cropToFit === "3:4") {
      const ratioResolutionToVideo = video.videoWidth / video.clientWidth;
      const cropStartX = Math.floor(
        ((video.clientWidth - container.clientWidth) / 2) *
          ratioResolutionToVideo
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
  }

  private getUserMedia(): void {
    const isThereGetUserMedia =
      navigator.mediaDevices.getUserMedia || // @ts-expect-error
      navigator.getUserMedia || // @ts-expect-error
      navigator.webkitGetUserMedia || // @ts-expect-error
      navigator.mozGetUserMedia || // @ts-expect-error
      navigator.msGetUserMedia;

    if (!isThereGetUserMedia) {
      throw new Error("Your browser does not support camera access.");
    }

    if (navigator.mediaDevices === undefined) {
      // @ts-expect-error
      navigator.mediaDevices = {};
    }

    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia = isThereGetUserMedia;

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }
  }

  private getVideoElement(
    videoRef: React.RefObject<HTMLVideoElement>
  ): HTMLElement {
    const video = videoRef.current;

    if (!video) {
      throw new Error("Video element not found.");
    }

    video.setAttribute("autoplay", "true");
    video.setAttribute("muted", "true");
    video.setAttribute("playsinline", "true");

    return video;
  }

  private getCameraConstraints = (
    options: CameraOptions
  ): MediaStreamConstraints => {
    const { idealResolution, minResolution, idealFacingMode } = options;

    const idealWidth = idealResolution
      ? this.getResolution(idealResolution).width
      : 1920;
    const idealHeight = idealResolution
      ? this.getResolution(idealResolution).height
      : 1080;
    const minWidth = minResolution
      ? this.getResolution(minResolution).width
      : 640;
    const minHeight = minResolution
      ? this.getResolution(minResolution).height
      : 480;

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
    } else if (this.isMobile() && idealFacingMode) {
      videoConstraints.facingMode = { ideal: idealFacingMode };
    }

    constraints.video = videoConstraints;

    return constraints;
  };

  private isMobile(): boolean {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    }

    return false;
  }

  private getResolution = (
    resolutionStr: ResolutionString
  ): { width: number; height: number } => {
    const [width, height] = resolutionStr.split("x");

    return {
      width: Number(width),
      height: Number(height),
    };
  };
}

export default CameraService;
