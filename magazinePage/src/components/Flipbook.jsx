import React, { useState,useRef } from "react";
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
  const [pageNumber, setPageNumber] = useState(1);
  const book = useRef();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    if (book.current) {
      book.current.pageFlip().flipPrev();
      setPageNumber(prevPageNumber => prevPageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (book.current) {
      book.current.pageFlip().flipNext();
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  };

  return (
    <>
      <div className="nav-bar">
        <button onClick={goToPrevPage}>Previous page</button>
        <span>{pageNumber} / {numPages}</span>
        <button onClick={goToNextPage}>Next page</button>
      </div>
      <div className="mag-container">
        <HTMLFlipBook ref={book} width={350} height={500} showCover={true}>
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
