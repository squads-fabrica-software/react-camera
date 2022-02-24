type ResolutionWidth = number;
type ResolutionHeight = number;

export type ResolutionString = `${ResolutionWidth}x${ResolutionHeight}`;
export type FacingModes = "user" | "environment";
export type ResolutionsToCrop = "3:4" | "4:3";
export type SupportedDimensions = number | "100%" | "auto";

export interface CameraOptions {
  playerWidth?: SupportedDimensions;
  playerMaxWidth?: SupportedDimensions;
  playerMinWidth?: SupportedDimensions;
  playerHeight?: SupportedDimensions;
  playerMaxHeight?: SupportedDimensions;
  playerMinHeight?: SupportedDimensions;
  cropToFit?: ResolutionsToCrop;
  idealResolution?: ResolutionString;
  minResolution?: ResolutionString;
  idealFacingMode?: FacingModes;
  onCameraStart?: (mediaStream: MediaStream) => void;
  onCameraError?: (error: Error) => void;
  onScreenshot?: (screenshotBase64: string | Error) => void;
}
