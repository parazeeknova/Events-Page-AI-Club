import React, { useState,useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import pdf1 from "./Edition_1.pdf";
import pdf2 from "./Edition_2.pdf";
import turnSound from "./turn.mp3";
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
  const audio = new Audio(turnSound);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    if (book.current && pageNumber > 1) {
      book.current.pageFlip().flipPrev();
      setPageNumber(prevPageNumber => prevPageNumber - 2);
      audio.play();
    }
  };

  const goToNextPage = () => {
    if (book.current && pageNumber < numPages) {
      book.current.pageFlip().flipNext();
      setPageNumber(prevPageNumber => prevPageNumber + 2);
      audio.play();
    }
  };

  const [pdf, setPdf] = useState(pdf1);

  const handleButtonClick1 = () => {
    setPdf(pdf2); 
  };
  
  const handleButtonClick2 = () => {
    setPdf(pdf1);
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

      <div className="bottom-bar">
        <div className="dropdown">
          <button className="dropbtn">Change Edition</button>
          <div className="dropdown-content">
            <button className="edition" onClick={handleButtonClick2}>Edition 1</button>
            <button className="edition" onClick={handleButtonClick1}>Edition 2</button>
          </div>
        </div>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
            <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M7.5 11L14.5 11M11 7.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
            <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M7.5 11H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Flipbook;