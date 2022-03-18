# @squads-fabrica-software/react-camera

_Read this in Brazilian Portuguese (PT-BR): [Português](README.pt-br.md)._

### This is Camera component for React

## Requirements

- react >= 16.8.0
- react-dom >= 16.8.0

## Instalation

```bash
npm install --save @squads-fabrica-software/react-camera
```

```bash
yarn add @squads-fabrica-software/react-camera
```

## Getting started

## Usage

### Simple usage:

```js
import React from "react";
import { Camera } from "@squads-fabrica-software/react-camera";

function App() {
  return (
    <div>
      <Camera />
    </div>
  );
}
```

### All props usage:

```js
import React from "react";
import { Camera } from "@squads-fabrica-software/react-camera";

function App() {
  return (
    <Camera
      onCameraStart={(mediaStream) => handleCameraStart(mediaStream)}
      onCameraError={(error) => handleCameraError(error)}
      onScreenshot={(data) => handleScreenshot(data)}
      idealFacingMode="user"
      idealResolution="1920x1080"
      minResolution="640x480"
      width={600}
      maxWidth={600}
      height="auto"
      maxHeight="auto"
      cropToFit="3:4"
      overlayImage={IMAGE_URL}
      overlayAlt="Overlay image"
      overlayHeight={400}
      overlayWidth={300}
      overlayPosition="center"
      mirrorImage={true}
    />
  );
}
```

## API

Parameters accepted

| Property             | Type                       | Default         | Description                                                                                                    |
| -------------------- | -------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------- |
| **onCameraStart():** | Event                      |                 | Callback called when the camera is successfully started. Returns the media stream object.                      |
| **onCameraError():** | Event                      |                 | Callback called when there's an error while opening the camera. Returns the error.                             |
| **onScreenshot():**  | Event                      |                 | Callback called when a screenshot is taken. Returns a base 64 string of the screenshot image.                  |
| **idealFacingMode**  | String                     | Browser default | The ideal facing mode of the camera: environment (usually the back camera) or user (usually the front camera). |
| **idealResolution**  | String                     | 1920x1080       | The ideal resolution for the camera. Format 999x999.                                                           |
| **minResolution**    | String                     | 640x480         | The minimun allowed resolution for the camera. Format 999x999.                                                 |
| **width**            | Number or "100%" or "auto" | "100%"          | Width of the camera.                                                                                           |
| **maxWidth**         | Number or "100%" or "auto" | "100%"          | Maximum width of the camera.                                                                                   |
| **height**           | Number or "100%" or "auto" | "100%"          | Height of the camera.                                                                                          |
| **maxHeight**        | Number or "100%" or "auto" |                 | Maximum height of the camera.                                                                                  |
| **cropToFit**        | "3:4"                      |                 | Centers and crops the camera to a 3:4 resolution based on the provived numeric width.                          |
| **overlayImage**     | Image URL                  |                 | Places the provived overlay image on top of the camera with position absolute.                                 |
| **overlayAlt**       | String                     | Empty string    | Text to be inserted into the alt attribute of the overlay image tag.                                           |
| **overlayWidth**     | Number or "100%"           | "100%"          | Width of the overlay image.                                                                                    |
| **overlayHeight**    | Number or "100%"           | "100%"          | Height of the overlay image.                                                                                   |
| **overlayPosition**  | "center" or "cover"        | "cover"         | On "center" it centers the image with top and left 50%, on "cover" it places the image with top and left 0.    |
| **mirrorImage**      | boolean                    | true            | Mirror video image.                                                                                            |

### CropToFit

This feature aims to crop cameras with other resolutions to 3:4 resolution.
For example, if you're on desktop with a webcam that has a landscape orientation and you want it to be on 3:4.
The video player will center and hide the rest of the video player that overflows the 3:4 resolution.
The image screenshot will also be cropped accordingly.

_3:4 is the only resolution supported at the moment. Hopefully we'll be able to support other resolutions in the future._
