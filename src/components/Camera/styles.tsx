import React from "react";
import { styled, globalCss } from "@stitches/react";
import { ResolutionsToCrop, SupportedDimensions } from "./types";

interface IdRefProps {
  id: string;
  ref?: React.RefObject<any>;
}

interface DimensionProps {
  width?: SupportedDimensions;
  minWidth?: SupportedDimensions;
  maxWidth?: SupportedDimensions;
  height?: SupportedDimensions;
  minHeight?: SupportedDimensions;
  maxHeight?: SupportedDimensions;
  cropToFit?: ResolutionsToCrop;
}

type Props = DimensionProps & IdRefProps;

interface ContainerProps extends Props {
  children: React.ReactNode;
}

const Container = React.forwardRef((props: ContainerProps, ref) => {
  const {
    width = "100%",
    maxWidth = "100%",
    height = "100%",
    cropToFit = undefined,
    id,
    children,
  } = props;

  const isCropToFit3x4 = cropToFit === "3:4" && typeof width === "number";

  const styles = isCropToFit3x4
    ? {
        maxWidth: "100% !important",
        height: "auto",
        aspectRatio: "3 / 4",
      }
    : {
        maxWidth: maxWidth,
        height: height,
        aspectRatio: "auto",
      };

  const ContainerComponent = styled("div", {
    ...styles,
    marginTop: 50,
    display: "inline-block",
    overflow: "hidden",
    width: width,
    position: "relative",
  });

  return (
    <ContainerComponent id={id} ref={ref as React.RefObject<HTMLDivElement>}>
      {children}
    </ContainerComponent>
  );
});

interface FlashProps extends Props {
  flashAnimation: boolean;
  isOn: boolean;
}

const Flash: React.FC<FlashProps> = ({ flashAnimation, isOn, id }) => {
  if (!flashAnimation) {
    return null;
  }

  const FlashComponent = styled("div", {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: "rgba(200, 200, 200, 0.7)",
    zIndex: 2,
    transition: "opacity 0.9s ease-out",
    opacity: isOn ? 1 : 0,
  });

  return <FlashComponent id={id} />;
};

const Wrapper: React.FC<Props> = ({
  width = "100%",
  maxWidth = "100%",
  height = "100%",
  cropToFit,
  id,
  children,
}) => {
  const isCropToFit3x4 = cropToFit === "3:4" && typeof width === "number";

  const styles = isCropToFit3x4
    ? {
        width: "auto",
        maxWidth: "100% !important",
        height: "100%",
      }
    : {
        width: width,
        maxWidth: maxWidth,
        height: height,
      };

  const WrapperComponent = styled("div", {
    ...styles,
    position: "relative",
    zIndex: 1,
  });

  return <WrapperComponent id={id}>{children}</WrapperComponent>;
};

const Video = React.forwardRef((props: Props, ref) => {
  const { width, maxWidth = "100%", height, cropToFit, id } = props;

  const isCropToFit3x4 = cropToFit === "3:4" && typeof width === "number";

  const styles = isCropToFit3x4
    ? {
        maxWidth: "none",
        width: "auto",
        height: "100%",
        position: "absolute",
        top: "auto",
        left: "50%",
        transform: "translateX(-50%)",
      }
    : {
        width: width,
        maxWidth: maxWidth,
        height: height,
        position: "relative",
        top: "auto",
        left: "auto",
        transform: "none",
      };

  const VideoComponent = styled("video", { ...styles });

  return (
    <VideoComponent
      ref={ref as React.RefObject<HTMLVideoElement>}
      id={id}
      autoPlay
      muted
      playsInline
    />
  );
});

const Canvas = React.forwardRef((props: Props, ref) => {
  const { id } = props;
  const CanvasComponent = styled("canvas", {
    display: "none",
  });

  return (
    <CanvasComponent id={id} ref={ref as React.RefObject<HTMLCanvasElement>} />
  );
});

interface ImageProps extends Props {
  alt?: string;
  src?: string;
  overlayPosition?: "center" | "cover";
}

const Image: React.FC<ImageProps> = (props: ImageProps) => {
  const { id, alt, src, width, height, overlayPosition } = props;

  const position =
    overlayPosition === "center"
      ? {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }
      : {
          top: 0,
          left: 0,
        };

  const ImageComponent = styled("img", {
    display: "block",
    position: "absolute",
    ...position,
    width: width || "100%",
    height: height || "100%",
  });

  return src ? <ImageComponent id={id} src={src} alt={alt || ""} /> : null;
};

interface ButtonProps extends Props {
  onClick: () => void;
  hidden: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { onClick, id, hidden } = props;

  const ButtonComponent = styled("button", {
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
    display: hidden ? "none" : "block",
    zIndex: 9,
  });

  return <ButtonComponent id={id} type="button" onClick={onClick} />;
};

const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
});

export {
  Container,
  Flash,
  Wrapper,
  Video,
  Canvas,
  Button,
  Image,
  globalStyles,
};
