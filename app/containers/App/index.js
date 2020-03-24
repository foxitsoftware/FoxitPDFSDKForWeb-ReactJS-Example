import React from 'react';
import StyledComponents from 'styled-components';
import PDFViewer from '../../components/PDFViewer';

const AppWrapper = StyledComponents.div`
    width: 100%;
    height: 100%;
`

export default function App() {
    return (
        <AppWrapper>
            <PDFViewer></PDFViewer>
        </AppWrapper>
    );
}