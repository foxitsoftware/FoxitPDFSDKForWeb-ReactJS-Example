/* eslint-disable no-console */

const fs = require('fs-extra');
const path = require('path');
const libPath = path.resolve(__dirname, '../../../lib');
const externalFontPath = path.resolve(libPath, '../external');
const exampleLicensePath = path.resolve(
    __dirname,
    '../../../examples/license-key.js'
);
const foxitLibPath = path.resolve(__dirname, '../app/foxit-lib');
const destExternalFontPath = path.resolve(foxitLibPath, 'assets/external');
const destLicenseFilePath = path.resolve(__dirname, '../app/license-key.js');

if (!fs.existsSync(libPath)) {
    console.error(`The lib path is not exist: ${libPath}`);
    process.exit(-1);
}

if (fs.existsSync(foxitLibPath)) {
    fs.removeSync(foxitLibPath);
}

fs.copySync(libPath, foxitLibPath);

if (!fs.existsSync(externalFontPath)) {
    console.warn(
        'The `external` folder is not found in this SDK package, maybe you should use `FoxitPDFSDKForWeb_{version}_Full.zip`, otherwise this application will not support more fonts provided in `external` folder'
    );
} else {
    console.info(externalFontPath, destExternalFontPath);
    fs.copySync(externalFontPath, destExternalFontPath);
}

if (!fs.existsSync(destLicenseFilePath)) {
    fs.copySync(exampleLicensePath, destLicenseFilePath);
}
