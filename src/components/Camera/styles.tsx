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

interface ButtonProps extends Props {
  onClick: () => void;
}

const Button = React.forwardRef((props: ButtonProps, ref) => {
  const { onClick, id } = props;

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
  });

  return (
    <ButtonComponent
      id={id}
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
    />
  );
});

const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
});

export { Container, Wrapper, Video, Canvas, Button, globalStyles };
