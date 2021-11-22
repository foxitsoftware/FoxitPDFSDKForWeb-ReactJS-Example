import React from "react";
import StyledComponents from 'styled-components';
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

import "@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.css";

const StyledDiv = StyledComponents.div`
    height: 100%;
`;

export default class PDFViewer extends React.Component {
    constructor() {
        super();
        this.elementRef = React.createRef();
    }

    render() {
        return <StyledDiv ref={this.elementRef} />;
    }

    componentDidMount() {
        const element = this.elementRef.current;
        const libPath = "/foxit-lib/";
        this.pdfui = new UIExtension.PDFUI({
            viewerOptions: {
                libPath,
                jr: {
                    readyWorker: window.readyWorker
                }
            },
            renderTo: element,
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
                UIExtension.PDFViewCtrl.DeviceInfo.isMobile
                    ? []
                    : [
                        textObjectAddon, 
                        formDesignerAddon
                    ]
            )
        });
    }
    componentWillUnmount() {
        this.pdfui.destroy();
    }
}
