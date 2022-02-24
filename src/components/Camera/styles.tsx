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

const Container: React.FC<Props> = ({
  width = "100%",
  maxWidth = "100%",
  height = "100%",
  cropToFit = undefined,
  id,
  ref,
  children,
}) => {
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
  });

  return (
    <ContainerComponent id={id} ref={ref}>
      {children}
    </ContainerComponent>
  );
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

const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
});

export { Container, Wrapper, Video, globalStyles };
