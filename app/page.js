'use client';
import Image from "next/image";
import React, { useState, useRef, useEffect } from 'react';
import { CONSTANT_VARIABLES } from '../constants';

function cardData(year) {
  return (
    <div className="card-data">
      <h2 className="header-one">
        Upcoming Events
      </h2>
      <ol class="styled-list">
        <li>Lorem ipsum</li>
        <li>Lorem ipsum</li>
      </ol>

      <h2 className="header-two">
        {year - 1} highlights
      </h2>
      <ol class="styled-list">
        <li>Lorem ipsum</li>
        <li>Lorem ipsum</li>
      </ol>

      <div className="connectWithMe">
        <p><a target="_blank" rel="noopener noreferrer" href={CONSTANT_VARIABLES.GITHUB_LINK}>{CONSTANT_VARIABLES.GITHUB}</a></p>
        <p><a target="_blank" rel="noopener noreferrer" href={CONSTANT_VARIABLES.LINKEDIN_LINK}>{CONSTANT_VARIABLES.LINKEDIN}</a></p>
        <span>{CONSTANT_VARIABLES.EMAIL}</span>
      </div>
    </div>
  )
}
export default function Home() {

  const date = new Date();
  const [isHovered, setIsHovered] = useState(false);
  const [bgImage, setBgImage] = useState(CONSTANT_VARIABLES.MONSTER_BACKROUND);
  const infoCardRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setBgImage(CONSTANT_VARIABLES.REDBULL_BACKROUND);
    if (infoCardRef.current) {
      infoCardRef.current.style.borderImage = "linear-gradient(45deg, #DB0A40, #FFCC00) 1"
      infoCardRef.current.style.color = "linear-gradient(45deg, #DB0A40, #FFCC00) 1";
      const textElements = infoCardRef.current.querySelectorAll('.card-data h2, .card-data p');
      textElements.forEach(element => {
        element.style.backgroundImage = "linear-gradient(45deg, #DB0A40, #FFCC00)";
        element.style.webkitBackgroundClip = "text";
        element.style.color = "transparent"; // Make the text transparent so the gradient shows
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setBgImage(CONSTANT_VARIABLES.MONSTER_BACKROUND);
    if (infoCardRef.current) {
      infoCardRef.current.style.borderImage = "linear-gradient(45deg, #000000, #95D600) 1";
      infoCardRef.current.style.color = "linear-gradient(45deg, #000000, #95D600) 1";
      const textElements = infoCardRef.current.querySelectorAll('.card-data h2, .card-data p');
      textElements.forEach(element => {
        element.style.backgroundImage = "linear-gradient(45deg, #95D600, #000000)";
        element.style.webkitBackgroundClip = "text";
        element.style.color = "transparent"; // Make the text transparent so the gradient shows
      });
    }
  };

  const handleMouseMove = (e, ref) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 65;
    let yAxis = (window.innerHeight / 2 - e.pageY) / -60;
    let refVariable = ref === 'card' ? infoCardRef : imageRef;
    if (refVariable.current) {
      refVariable.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      refVariable.current.style.transition = "none"; // Optional, to disable transition on move
    }
  };

  const handleCardMouseLeave = (ref) => {
    let refVariable = ref === 'card' ? infoCardRef : imageRef;
    if (refVariable.current) {
      refVariable.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
      refVariable.current.style.transition = "all 0.5s ease"; // Adds smooth transition back to original state
    }
  };

  const updateBackgroundImage = () => {
    document.body.style.transition = 'background-image 1s ease-in-out';
    document.body.style.backgroundImage = `
    repeating-linear-gradient(to right, transparent 0 150px, rgba(134, 134, 134, 0.5) 150px 151px),
      repeating-linear-gradient(to bottom, transparent 0 150px, rgba(134, 134, 134, 0.5) 150px 151px),
      linear-gradient(to right, rgba(205, 205, 205, 0.001), rgba(205, 205, 205, 0.5)),
      url('/images/${bgImage}')`;
    document.body.style.backgroundPosition = 'center';
  };

  useEffect(() => { updateBackgroundImage() }, [bgImage])

  return (
    <>
      <header>
        <div className="left">
          <h1>{CONSTANT_VARIABLES.HEADER_1}</h1>
        </div>
        <div className="author">
          <h3>{CONSTANT_VARIABLES.AUTHOR}</h3>
          <div>
            <p>{CONSTANT_VARIABLES.DETAILS}</p>
            <p>{CONSTANT_VARIABLES.AUTHOR}</p>
          </div>
        </div>
      </header>
      <div className="banner">
        <div className="product"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <div className="soda" style={{ "--url": "url('/images/monster-can-label.jpg')" }}>
          </div>
          <div className="soda" style={{ "--url": "url('/images/rebull-can-label.jpg')" }}>
          </div>
        </div>
        {isHovered ?
          <div className="images-and-divs">
            <Image src="/images/redbull-logo.png" alt="" width={500} height={900} />
            <Image ref={imageRef}
              onMouseMove={e => handleMouseMove(e, 'image')}
              onMouseLeave={handleCardMouseLeave('image')}
              id="redbull-bike" src="/images/pngegg.png" alt="" width={500} height={700} />
            <div className="info-card"
              ref={infoCardRef}
              onMouseMove={e => handleMouseMove(e, 'card')}
              onMouseLeave={handleCardMouseLeave('card')}>
              {cardData(date.getFullYear())}
            </div>
          </div>
          :
          <div className="images-and-divs">
            <Image id="monster-logo" src="/images/monster-logo.png" alt="" width={500} height={900} />
            <Image ref={imageRef}
              onMouseMove={e => handleMouseMove(e, 'image')}
              onMouseLeave={handleCardMouseLeave('image')}
              id="monster-truck" src="/images/monster-truck.png" alt="" width={700} height={200} />
            <div className="info-card"
              ref={infoCardRef}
              onMouseMove={e => handleMouseMove(e, 'card')}
              onMouseLeave={handleCardMouseLeave('card')}>
              {cardData(date.getFullYear())}
            </div>
          </div>
        }
      </div>
    </>
  );
}