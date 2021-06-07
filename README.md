# FoxitPDFSDK for Web Example - React.js

This guide shows two examples. One introduces how to quickly run the out-of=the-box sample for react.js in FoxitPDFSDK for Web package, and the other presents a way to integrate FoxitPDFSDK for Web into an exiting React app created with WebPack and Babel.

## Quickly run the out-of-the-box sample for reac.js

_Note:The root folder of `FoxitPDFSDK for Web` is referred as `root` in the following._

FoxitPDFSDK for Web provides a boilerplate project for React app which was created with WebPack and Babel. This example can be found at `root/integrations/` inside FoxitPDFSDK for Web package.

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

Navigate to `root/integratons/react.js/`, and execute:

```sh
npm run setup
```

This setup will implement the followings:

- `npm install` to install dependencies.
- `npm run update-sdk`
- Copy `lib` folder from the root folder to the `root/integratons/react.js/app/`, and auto rename it to `foxit-lib`.
- Copy `root/examples/license-key.js`to the `root/integratons/react.js/app/`.

### Referening Addons

If you are integrating FoxitPDFSDK for Web into your existing React project, you should read this section before continue. You may want to check out [Addons](../addons/introduction.md) for detailed introductions.

Here we introduce three ways to reference SDK addons for Anguar project, you may choose one of them based on your needs. This [Comparison](#Addons reference methods comparison) will help you to better understand the difference of the three ways and make a choice.

#### 1. Reference fragmented addons

This method was used by default in past versions before version 7.2. You should open `components/PDFViewer/index.js`, and referece addons as shown below:

```js
this.pdfui = new UIExtension.PDFUI({
    addons: [
        the_path_to_foxit_lib + '/uix-addons/file-property/addon.info.json',
        the_path_to_foxit_lib + '/uix-addons/full-screen/addon.info.json',
        // .etc
    ],
    // other options
});
```

Where `the_path_to_foxit_lib` is the SDK lib folder，

#### 2.  Import modular addons

1. Install

   ```sh
   npm i -D @foxitsoftware/addon-loader
   ```

2. update `development/webpack/webpack.base.js` configuration:

    ```js
    {
        test: /addon\.info\.json$/,
        include: /foxit-lib/,
        use: [{
            loader: 'babel-loader',
            options: options.babelLoaderOptions
        }, '@foxitsoftware/addon-loader'],
        type: 'javascript/auto'
    }
    ```

3. In`components/PDFViewer/index.js`, import `addon.info.json` for each addon:

    ```js
        import * as UIExtension from '../foxit-lib/UIExtension.full.js'
        import filePropertyAddon from '../foxit-lib/uix-addons/file-property/addon.info.json';
        import multiMediaAddon from '../foxit-lib/uix-addons/multi-media/addon.info.json';
        import passwordProtectAddon from '../foxit-lib/uix-addons/password-protect/addon.info.json';
        import redactionAddon from '../foxit-lib/uix-addons/redaction/addon.info.json';
        import pathObjectsAddon from '../foxit-lib/uix-addons/path-objects/addon.info.json';
        import printAddon from '../foxit-lib/uix-addons/print/addon.info.json';
        import fullScreenAddon from '../foxit-lib/uix-addons/full-screen/addon.info.json';
        import importFormAddon from '../foxit-lib/uix-addons/import-form/addon.info.json';
        import exportFormAddon from '../foxit-lib/uix-addons/export-form/addon.info.json';
        import undoRedoAddon from '../foxit-lib/uix-addons/undo-redo/addon.info.json';
        import textObjectAddon from '../foxit-lib/uix-addons/text-object/addon.info.json';
    ```

     And pass addons to the PDFUI constructor:

    ```js
    const libPath = '/foxit-lib/';
        this.pdfui = new UIExtension.PDFUI({
            addons: [
                filePropertyAddon,
                multiMediaAddon,
                passwordProtectAddon,
                redactionAddon,
                pathObjectsAddon,
                printAddon,
                fullScreenAddon,
                importFormAddon,
                exportFormAddon,
                undoRedoAddon
            ].concat(
                // text-object addon is disabled on mobile platform
                UIExtension.PDFViewCtrl.DeviceInfo.isMobile
                    ? []
                    : textObjectAddon
            ),
            // other options
        });
    ```

#### 3. Reference allInOne.js

The allInOne.js already combines all addons, which locates in `foxit-lib/uix-addons/`. To refenece this file, open `components/PDFViewer/index.js`, and update the code as follows:

```js
// ...
import * as UIExtension from '../foxit-lib/UIExtension.full.js';
import * as Addons from '../foxit-lib/uix-addons/allInOne.js';
// ...
```

 And pass parameters to the PDFUI constructor:

```js
this.pdfui = new UIExtension.PDFUI({
    addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile
        ? Addons.filter(it => it.getName() !== 'textEditObject')
        : Addons,
    // other options
});
```

#### Comparions of addons reference methods

|Referene method|Configuration|HTTP Requests|Modifiable (e.g Localization resoures, and addon.info.json)|
|--|--|--|--|
|Fragmentized|No|n+|Yes|
|Modularized|Configure gulp|0|Yes,but should re-merge the addons after modification |
|allInOne.js|No|1|No|

Note: You can rebuild allInOne.js by using our [Addons merge tools](../addons/introduction.html#how-to-merge-addons)

### Runnning the example

On the shell, execute the following command to start the development service:

```sh
npm start
```

Now you are ready to launch the app. Open your browser, navigate to `<http://127.0.0.1:9102/>` to load your example.

### Building

```sh
npm run build
```

The production will be placed into `root/integratons/react.js/dist`

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

Let's call the root folder of your existing React project and `FoxitPDFSDK for Web` as ReactJS and SDK.

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

1. In SDK, copy the `lib` and `SDK/examples/license-key.js`to `ReacJS/app`, and change the lib name to `foxi-lib`. Besides, to correctly referene your fonts lib, you also need to duplicate the `external` folder inside SDK to `ReactJS/app/foxit-lib/assets`.

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

### Details install

1. Define your project path to be an environment variable like bellow:

    ```bash
    # add your environment varaible to your syspath on windows or ~/.bashrc on macos/linux
    export PROJECT_PATH="$HOME/wkspc/FoxitPDFSDKForWeb"

    # then reboot or source your config files to make it works
    ```

2. Change directory to your `$PROJECT_PATH`, and build your latest source code like

    ```bash
    cd $PROJECT_PATH
    git pull
    npm run build
    ```

3. Copy the `lib` and `SDK/examples/license-key.js`to `ReacJS/app`

    ```bash
    cp -R lib/ $PROJECT_PATH/integrations/react.js/app/foxit-lib
    cp examples/license-key.js $PROJECT_PATH/integrations/react.js/app/
    ```

4. copy the `external`directory to `foxit-lib/assets`

    ```bash
    cp -R external/ $PROJECT_PATH/integrations/react.js/app/foxit-lib/assets
    ```

5. install your `node_modules` and run

    ```bash
    cd $PROJECT_PATH/integrations/react.js/
    npm install
    npm run start
    ```

6. Now everything is set up. Open your browser, navigate to <http://127.0.0.1:9102/> to launch your application.
