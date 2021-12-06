# FoxitPDFSDK for Web Example - React.js

This guide shows two examples. One introduces how to quickly run the out-of=the-box sample for react.js in FoxitPDFSDK for Web package, and the other presents a way to integrate FoxitPDFSDK for Web into an exiting React app created with WebPack and Babel.

## Quickly run the out-of-the-box sample for reac.js

_Note:The root folder of `FoxitPDFSDK for Web` is referred as `root` in the following._

FoxitPDFSDK for Web provides a boilerplate project for React app which was created with WebPack and Babel.

### Overview the project structure

```sh
├─app/
│  ├─components/
│  │  └─PDFViewer/
│  ├─containers/
│  │  └─App/
│  ├─app.js
│  ├─index.html
│  ├─preload.js
│  └─license-key.js
├─development/
│  ├─webpack/
│  │    ├─...
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
- [FoxitPDFSDK for Web](https://developers.foxit.com/products/web/)

### Getting started

Clone the repository to any location:

```bash
git clone https://github.com/foxitsoftware/FoxitPDFSDKForWeb-ReactJS-Example.git
```

Navigate to `FoxitPDFSDKForWeb-Reactjs-Example/`, and execute:

```bash
cd ./FoxitPDFSDKForWeb-Reactjs-Example
npm install
```

This step will download all dependencies into `node_modules` folder.

Place the `license-key.js` into `ReacJS/app`. You can find the license information at `SDK/examples/`

### Reference the fonts

If some text in a PDF document requires a specified font to be rendered correctly, you need to specify a font loading path during initialization. In this example, you can refer to the `fontPath` configuration in `app/preload.js`. What we need to do is to copy the `external` folder in the SDK to the `app/assets` folder so that the special font can be rendered normally.

### Referening Addons

If you are integrating FoxitPDFSDK for Web into your existing React project, you should read this section before continue. You may want to check out [Addons](http://webviewer-demo.foxitsoftware.com/docs/developer-guide/ui-extension/addons/introduction.html) for detailed introductions.

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
        use: [{
            loader: 'babel-loader',
            options: options.babelLoaderOptions
        }, '@foxitsoftware/addon-loader'],
        type: 'javascript/auto'
    }
    ```

3. In`components/PDFViewer/index.js`, import `addon.info.json` for each addon:

    ```js
        import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library'
        import filePropertyAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/file-property/addon.info.json';
        import multiMediaAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/multi-media/addon.info.json';
        import passwordProtectAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/password-protect/addon.info.json';
        import redactionAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/redaction/addon.info.json';
        import pathObjectsAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/path-objects/addon.info.json';
        import printAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/print/addon.info.json';
        import fullScreenAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/full-screen/addon.info.json';
        import importFormAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/import-form/addon.info.json';
        import exportFormAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/export-form/addon.info.json';
        import undoRedoAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/undo-redo/addon.info.json';
        import textObjectAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/text-object/addon.info.json';
        import thumbnailAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/thumbnail/addon.info.json';
        import formDesignerAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/form-designer/addon.info.json';
        import formToSheetAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/form-to-sheet/addon.info.json';
        import readAloudAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/read-aloud/addon.info.json';
        import hContinuesAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/h-continuous/addon.info.json';
        import RecognitionFormAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/recognition-form/addon.info.json';
        import pageTemplateAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/page-template/addon.info.json';
        import xfaFormAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/xfa-form/addon.info.json';

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
                undoRedoAddon,
                thumbnailAddon,
                formToSheetAddon,
                readAloudAddon,
                hContinuesAddon,
                RecognitionFormAddon,
                pageTemplateAddon,
                xfaFormAddon,
                pageTemplateAddon
            ].concat(
                // text-object and form-designer addon is disabled on mobile platform
                UIExtension.PDFViewCtrl.DeviceInfo.isMobile
                    ? []
                    : [
                        textObjectAddon, 
                        formDesignerAddon
                    ]
            ),
            // other options
        });
    ```

#### 3. Reference allInOne.js

The allInOne.js already combines all addons, which locates in `@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/`. To refenece this file, open `components/PDFViewer/index.js`, and update the code as follows:

```js
// ...
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library';
import * as Addons from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/allInOne.js';
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

Note: You can rebuild allInOne.js by using our [Addons merge tools](http://webviewer-demo.foxitsoftware.com/docs/developer-guide/ui-extension/addons/introduction.html#merge-addons)

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
- [FoxitPDFSDK for Web](https://developers.foxit.com/products/web/)

### Webpack configuration

Let's call the root folder of your existing React project and `FoxitPDFSDK for Web` as ReactJS and SDK.

1. Create and configure the following 3 files in the `ReactJS/development/webpack` folder:

   - `webpack.base.js`
   - `webpack.dev.js`
   - `webpack.prod.js`

   For the configuration details, refer to the counterpart files in <https://github.com/foxitsoftware/FoxitPDFSDKForWeb-Reactjs-Example/tree/master/development/webpack>. You can also directly duplicate the files to `ReactJS/development/webpack`

2. Configure npm script in package.json

    ```json
        "script": {
            "start": "webpack-dev-server --config development/webpack/webpack.dev.js",
            "build": "webpack --config development/webpack/webpack.prod.js"
        }
    ```

### Adding dependencies and entry point files

1. Install the lattest version of `@foxitsoftware/foxit-pdf-sdk-for-web-library`.

   ```bash
   npm i -S @foxitsoftware/foxit-pdf-sdk-for-web-library
   ```

2. Install the `@foxitsoftware/addon-loader`

    ```bash
    npm i -D @foxitsoftware/addon-loader
    ```

3. Copy the `license-key.js` to `ReacJS/app`
4. Create and configure the following files in ReacJS:

   - the [babel.config.js](https://www.npmjs.com/package/@babel/preset-react)
   - the `../app/components/PDFViewer/index.js`
   - the `../app/containers/App/index.js`
   - the `index.htm`,`app.js` and `preload.js` inside `../app/`

   For the configuration details, refer to the corresponding files in <https://github.com/foxitsoftware/FoxitPDFSDKForWeb-ReactJS-Example>. You can also directly duplicate those files into the counterpart folders in ReactJS.

Besides, to correctly referene your fonts lib, you also need to duplicate the `external` folder inside SDK to `ReactJS/app/foxit-lib/assets`.

### Running your application

```sh
npm run start
```

Now everything is set up. Open your browser, navigate to <http://127.0.0.1:9102/> to launch your application.
