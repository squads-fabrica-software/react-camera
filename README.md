# @squads-fabrica-software/react-camera

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

### Usage

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

## API

Parameters accepted

| Property             | Type  | Default | Description                                                                               |
| -------------------- | ----- | ------- | ----------------------------------------------------------------------------------------- |
| **onCameraStart():** | Event |         | Callback called when the camera is successfully started. Returns the media stream object. |
| **onCameraError():** | Event |         | Callback called when there's an error while opening the camera. Returns the error.        |
