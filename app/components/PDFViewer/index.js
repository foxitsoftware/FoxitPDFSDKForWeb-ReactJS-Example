import React from "react";
import StyledComponents from 'styled-components';
import * as UIExtension from "../../foxit-lib/UIExtension.full";

import filePropertyAddon from '../../foxit-lib/uix-addons/file-property/addon.info.json';
import multiMediaAddon from '../../foxit-lib/uix-addons/multi-media/addon.info.json';
import passwordProtectAddon from '../../foxit-lib/uix-addons/password-protect/addon.info.json';
import redactionAddon from '../../foxit-lib/uix-addons/redaction/addon.info.json';
import pathObjectsAddon from '../../foxit-lib/uix-addons/path-objects/addon.info.json';
import printAddon from '../../foxit-lib/uix-addons/print/addon.info.json';
import fullScreenAddon from '../../foxit-lib/uix-addons/full-screen/addon.info.json';
import importFormAddon from '../../foxit-lib/uix-addons/import-form/addon.info.json';
import exportFormAddon from '../../foxit-lib/uix-addons/export-form/addon.info.json';
import undoRedoAddon from '../../foxit-lib/uix-addons/undo-redo/addon.info.json';
import textObjectAddon from '../../foxit-lib/uix-addons/text-object/addon.info.json';
import thumbnailAddon from '../../foxit-lib/uix-addons/thumbnail/addon.info.json';

import "../../foxit-lib/UIExtension.css";

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
            appearance: UIExtension.appearances.adaptive,
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
                thumbnailAddon
            ].concat(
                UIExtension.PDFViewCtrl.DeviceInfo.isMobile
                    ? []
                    : textObjectAddon
            )
        });
    }
    componentWillUnmount() {
        this.pdfui.destroy();
    }
}
