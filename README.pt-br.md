# @squads-fabrica-software/react-camera

### Componente de câmera para Reactjs.

_Leia essa documentação em inglês: [English](README.md)._

## Dependências

- react >= 16.8.0
- react-dom >= 16.8.0

## Instalação

```bash
npm install --save @squads-fabrica-software/react-camera
```

```bash
yarn add @squads-fabrica-software/react-camera
```

## Introdução

## Uso

### Uso simples:

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

### Uso com todas as propriedades:

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
    />
  );
}
```

## API

Parameters accepted

| Propriedade          | Tipo                       | Default              | Descrição                                                                                                                    |
| -------------------- | -------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **onCameraStart():** | Função                     |                      | Função callback chamada quando a câmera é iniciada com sucesso. Retorna o objeto de midia _(media stream)_.                  |
| **onCameraError():** | Função                     |                      | Função callback chamada quando acontece um erro ao tentar abrir a câmera. Retorna o erro.                                    |
| **onScreenshot():**  | Função                     |                      | Função chamada quando um _screenshot_ é tirado. Retorna uma string base64 da imagem.                                         |
| **idealFacingMode**  | String                     | Default do navegador | Determina preferência por câmera frontal (_user_) ou câmera traseira (_environment_).                                        |
| **idealResolution**  | String                     | 1920x1080            | Resolução ideal da câmera. Informar no formato 999x999.                                                                      |
| **minResolution**    | String                     | 640x480              | Resolução mínima permitida para a câmera. Informar no formato 999x999.                                                       |
| **width**            | Número ou "100%" ou "auto" | "100%"               | Largura em pixels da câmera a ser exibida na página.                                                                         |
| **maxWidth**         | Número ou "100%" ou "auto" | "100%"               | Largura máxima em pixels da câmera a ser exibida na página.                                                                  |
| **height**           | Número ou "100%" ou "auto" | "100%"               | Altura em pixels da câmera a ser exibida na página.                                                                          |
| **maxHeight**        | Número ou "100%" ou "auto" |                      | Altura máxima em pixels da câmera a ser exibida na página.                                                                   |
| **cropToFit**        | "3:4"                      |                      | Centraliza e faz um crop da câmera para a resolução 3:4, de acordo com a largura (_width_) numérica fornecida.               |
| **overlayImage**     | URL da Imagem              |                      | Exibe a imagem fornecida em cima da câmera com _position absolute_.                                                          |
| **overlayAlt**       | String                     | Empty string         | Texto a ser inserido no atributo _alt_ da tag da imagem de overlay.                                                          |
| **overlayWidth**     | Número ou "100%"           | "100%"               | Largura em pixels da imagem de overlay.                                                                                      |
| **overlayHeight**    | Número ou "100%"           | "100%"               | Altura em pixels da imagem de overlay.                                                                                       |
| **overlayPosition**  | "center" ou "cover"        | "cover"              | Se "center", posiciona a imagem com _top_ e _left_ igual à 50%; se "cover", posiciona a imagem com _top_ e _left_ igual à 0. |
| **mirrorImage**      | boolean                    | true                 | Faz espelhamento da imagem do vídeo.                                                                                         |

### CropToFit

Essa funcionalidade faz um "crop" da câmera para exibir na resolução 3:4.
Por exemplo, digamos que você esteja no desktop utilizando uma webcam que tem orientação de paisagem, isto é, é mais larga que alta.
Habilitando a funcionalidade de cropToFit = 3:4, o player de vídeo centraliza e esconde o resto do vídeo que _overflows_ a resolução 3:4.
Então a câmera exibida para o usuário é neste formato/resolução 3:4, e o screenshot da imagem também recebe o crop de acordo, de modo que apenas o que ficou vísivel na exibição da câmera compõe a imagem.

_A resolução 3:4 é a única suportada no momento. Esperamos poder implementar o suporte à outras resoluções no futuro._
