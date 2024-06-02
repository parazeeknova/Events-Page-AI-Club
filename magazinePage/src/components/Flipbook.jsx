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
      {/*eslint-disable-next-line react/prop-types*/}
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

      <div className="flipbook-container">
        <div className="nav-bar">
          <div className="previousButton">
            <button onClick={goToPrevPage}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M4 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.99996 17C8.99996 17 4.00001 13.3176 4 12C3.99999 10.6824 9 7 9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="middleButton">
            <span>{pageNumber}</span>
              <div className="middleSymbol"> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                  <path d="M21 4C11.0535 4 12.9465 20 3 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>  
            <span>{numPages}</span>
          </div>
          <div className="nextButton">
            <button onClick={goToNextPage}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
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
