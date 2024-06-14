import React from "react";
import StyledComponents from 'styled-components';
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library'
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
        return <StyledDiv id="pdf-ui" ref={this.elementRef} />;
    }

    componentDidMount() {
        const element = this.elementRef.current;
        const libPath = "/foxit-lib/";
        this.pdfui = new UIExtension.PDFUI({
            viewerOptions: {
                libPath,
                jr: {
                    readyWorker: window.readyWorker
                },
                messageSyncServiceWorker: {
                    options:{
                        scope: '/foxit-lib/'
                    }
                }
            },
            renderTo: element,
            addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile ?
                '/foxit-lib/uix-addons/allInOne.mobile.js':
                '/foxit-lib/uix-addons/allInOne.js'
        });
    }
    componentWillUnmount() {
        this.pdfui.destroy();
    }
}
