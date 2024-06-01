import React, { useState } from "react";
import HTMLFlipBook from "react-pageflip";
import pdf from "./Edition_1.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "./Flipbook.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pages = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      {/* <h1>Page Header</h1> */}
      <p>{props.children}</p>
    </div>
  );
});

Pages.displayName = "Pages";

function Flipbook() {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <>
      <div className="mag-container">
        <HTMLFlipBook width={350} height={500} showCover={true}>
          {[...Array(numPages).keys()].map((n) => (
            <Pages key={n} number={`${n + 1}`}>
              <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  pageNumber={n + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  width={350}
                  className="border-3 border-black"
                />
              </Document>
            </Pages>
          ))}
        </HTMLFlipBook>
      </div>
    </>
  );
}

export default Flipbook;
