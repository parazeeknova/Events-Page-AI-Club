// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect} from "react";
import { gsap, ScrollTrigger } from "gsap/all";
import "./Eventpage.css";

const Eventpage = () => {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.utils.toArray('.highlight').forEach(highlight => {
      gsap.fromTo(highlight.querySelector('.highlight-bg'), 
        { width: "0%" }, 
        { 
          width: "130%", 
          scrollTrigger: {
            trigger: highlight,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });
  }, []);

  return (
    <>
      <div className="event-container">

        <div className="left-event-container">
        <p className="context">
  Immerse yourself in <span className="highlight"><span className="highlight-bg"></span>industry</span> insights through ideations, <span className="highlight"><span className="highlight-bg"></span>hackathons</span>,
  and expert keynotes. Explore <span className="highlight"><span className="highlight-bg"></span>NLP, MLOps</span> , Computer Vision, etc.
  <span className="highlight"><span className="highlight-bg"></span>Experience</span> hands-on workshops.
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
