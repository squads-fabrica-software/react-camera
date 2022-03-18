type ResolutionWidth = number;
type ResolutionHeight = number;

export type ResolutionString = `${ResolutionWidth}x${ResolutionHeight}`;
export type FacingModes = "user" | "environment";
export type ResolutionsToCrop = "3:4";
export type SupportedDimensions = number | "100%" | "auto";

export interface CameraOptions {
  width?: SupportedDimensions;
  maxWidth?: SupportedDimensions;
  height?: SupportedDimensions;
  maxHeight?: SupportedDimensions;
  cropToFit?: ResolutionsToCrop;
  idealResolution?: ResolutionString;
  minResolution?: ResolutionString;
  idealFacingMode?: FacingModes;
  onCameraStart?: (mediaStream: MediaStream) => void;
  onCameraError?: (error: Error) => void;
  onScreenshot?: (screenshotBase64: string | Error) => void;
  overlayImage?: string;
  overlayAlt?: string;
  overlayWidth?: number | "100%";
  overlayHeight?: number | "100%";
  overlayPosition?: "center" | "cover";
  btnHidden?: boolean;
  flashAnimation?: boolean;
  mirrorImage?: boolean;
}
