# FoxitPDFSDK for Web Example - React.js

This guide shows two examples. One introduces how to quickly run the boilerplate sample for react.js inside FoxitPDFSDK for Web, and the other presents a way to integrate FoxitPDFSDK for Web into an exiting React app created with WebPack and Babel.

## Quickly run the built-in example for React.js

FoxitPDFSDK for Web provides a boilerplate project for React app which was created with WebPack and Babel. This example can be found at `../integrations/` inside FoxitPDFSDK for Web package.

### Overview the project structure

```sh
├─app/
│  ├─components/
│  │  └─PDFViewer/
│  ├─containers/
│  │  └─App/
│  ├─foxit-lib/
│  │    ├─...
│  ├─app.js
│  ├─index.html
│  ├─preload.js
│  └─license-key.js
├─development/
│  ├─webpack/
│  │    ├─...
│  └─setup.js
├─package.json
├─babel.config.js
```

#### Key directory and files descriptions

|        File/Folder        |                                        Description                                        |
| :----------------------- | :---------------------------------------------------------------------------------------: |
|           app/            |                        Contains all JS and CSS files for the app.                         |
| app/components/PDFViewer/ |                Contains the initilization plugins for FoxitPDFSDK for Web.                |
|      app/preload.js       |                     This entry point used to preload SDK core assets.                     |
|        app/app.js         |                             The entry point for application.                              |
|       development/        | Contains automated scripts for packaging in dev mode, application initialization and etc. |
|       package.json        |                  Lists dependencies, version build information and ect.                   |

### Prerequisites

- [Nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com)
- [FoxitPDFSDK for Web](https://developers.foxitsoftware.com/pdf-sdk/Web)

### Getting started

Enter `../integratons/react.js/` inside FoxitPDFSDK for Web, and execute:

```sh
npm run setup
```

This setup will implement the followings:

- `npm install` to install dependencies.
- Copy `lib` folder from the root folder to the `../integratons/react.js/app/`, and auto rename it to `foxit-lib`.
- Copy `..examples/license-key.js`to the `../integratons/react.js/app/`.

### Runnning the example

On the shell, execute the following command to start your application:

```sh
npm start
```

Now you are ready to launch the app. Open your browser, navigate to `<http://127.0.0.1:9102/>` to load your example.

### Building

```sh
npm run build
```

The production will be placed into `../integratons/react.js/dist`

### Testing

```sh
cd ./dist && http-server -p 8080
```

## Integrate FoxitPDFSDK for Web into existing React.js project

This integration assumes you have React app created with Webpack and Babel.

### Prerequisites

- [Nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com)
- [Reac.js created with WebPack and Babel](https://dev.to/iamismile/how-to-setup-webpack-and-babel-for-react-59ph)
- [FoxitPDFSDK for Web](https://developers.foxitsoftware.com/pdf-sdk/Web)

### Webpack configuration

Let's call the root folder of your exiting project as RactJS and FoxitPDFSDK for Web as SDK.

1. Create and configure the following 3 files in the `ReactJS/development/webpacK`folder:

   - `webpack.base.js`
   - `webpack.dev.js`
   - `webpack.prod.js`

   For the configuration details, refer to the counterpart files in `SDK/integrations/react.js/development/webpack/`. You can also directly duplicate the files to `ReactJS/development/webpacK`

2. Configure npm script in package.json

```json
"script": {
"start": "webpack-dev-server --config development/webpack/webpack.dev.js",
"build": "webpack --config development/webpack/webpack.prod.js"
}
```

### Adding dependencies and entry point files

1. In SDK, copy the `lib` and `../examples/license-key.js`to `ReacJS/app`, and change the lib name to `foxi-lib`. Besides, to correctly referene your fonts lib, you also need to duplicate the `external` folder inside SDK to `ReactJS/app/foxit-lib/assets`. 

2. Create and configure the following files in ReacJS:

   - the [babel.config.js](https://www.npmjs.com/package/@babel/preset-react)
   - the `../app/components/PDFViewer/index.js`
   - the `../app/containers/App/index.js`
   - the `index.htm`,`app.js` and `preload.js` inside `../app/`

   For the configuration details, refer to the corresponding files in SDK. You can also directly duplicate those files into the counterpart folders in ReactJS.

### Running your application

```sh
npm run start
```

Now everything is set up. Open your browser, navigate to <http://127.0.0.1:9102/> to launch your application.
