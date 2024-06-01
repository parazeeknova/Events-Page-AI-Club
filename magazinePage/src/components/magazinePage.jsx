import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import "./magazinePage.css";
import samplePdf from './sample.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};
export default function Sample() {
  const [file] = useState(samplePdf);
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  function goToPreviousPage() {
    setCurrentPage((prevPageNumber) => Math.max(prevPageNumber - 2, 1));
  }
  
  function goToNextPage() {
    setCurrentPage((prevPageNumber) => Math.min(prevPageNumber + 2, numPages));
  }

  return (
    <>
    <div className="header">
    <div className="navbar">
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span className="page-number">{currentPage}</span>
      <button onClick={goToNextPage} disabled={currentPage === numPages}>
       Next
      </button>
    </div>
    </div>
      <div className="container">
        <div className="container__document" ref={setContainerRef}>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {Array.from(new Array(numPages), (el, index) => (
           <Page
             key={`page_${index + 1}`}
             pageNumber={index + 1}
             width={containerWidth ? containerWidth / 2 : "auto"}
           />
         )).slice(currentPage - 1, currentPage + 1)}
         </Document>
        </div>
      </div>
  </>
  );
}