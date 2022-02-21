import React, { useEffect } from "react";
import { styled } from "@stitches/react";
// import { startCamera } from "../../services/startCamera";

interface Props {
  width?: string | number;
  height?: string | number;
}

const Camera = ({ width = "100%", height = "100%" }: Props) => {
  useEffect(() => {
    console.log("hello world");
  }, []);

  const Wrapper = styled("div", {
    border: "10px solid red",
    width,
    height,
  });

  const Video = styled("video", {
    backgroundColor: "#08EF99",
    width: "100%",
    height: "100%",
  });

  return (
    <Wrapper id="react-camera__wrapper">
      <Video id="react-camera__video" autoPlay muted playsInline />
    </Wrapper>
  );
};

export default Camera;
