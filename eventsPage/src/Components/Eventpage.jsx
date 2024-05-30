// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Eventpage.css";

const Eventpage = () => {
  return (
    <>
      <div className="event-container">

        <div className="left-event-container">
          <p className="context">
            Immerse yourself in industry insights through ideations, hackathons,
            and expert keynotes. Explore NLP, MLOps , Computer Vision, etc.
            Experience hands-on workshops.
          </p>
          <button className="register-button">Register Now</button>
        </div>

        <div className="right-event-container">
          <h1 className="heading">AI CONCLAVE 4.0</h1>
          <img className="event-image-right"
            src="https://source.unsplash.com/random/500x250?technology"
            alt="Technology"
          />
          <div className="description">
            Welcome to AI Conclave 2024, A 3-day thrill ride from February 5th
            to 7th, hosted by the AI Club at VIT Bhopal University.
          </div>
        </div>

      </div>
    </>
  );
};

export default Eventpage;
