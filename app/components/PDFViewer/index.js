import React from "react";
import StyledComponents from 'styled-components';
import * as UIExtension from "../../foxit-lib/UIExtension.full";
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
                `${libPath}uix-addons/file-property`,
                `${libPath}uix-addons/multi-media`,
                `${libPath}uix-addons/password-protect`,
                `${libPath}uix-addons/redaction`,
                `${libPath}uix-addons/path-objects`,
                `${libPath}uix-addons/print`,
                `${libPath}uix-addons/full-screen`,
                `${libPath}uix-addons/import-form`,
                `${libPath}uix-addons/export-form`,
                `${libPath}uix-addons/undo-redo`
            ].concat(
                UIExtension.PDFViewCtrl.DeviceInfo.isMobile
                    ? []
                    : `${libPath}uix-addons/text-object`
            )
        });
    }
    componentWillUnmount() {
        this.pdfui.destry();
    }
}
