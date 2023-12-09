import React, { useState } from "react";
import { TopNav } from "../components";
import styled from "styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => {
      window.scroll = null;
    };
  };
  //console.log(isScrolled);
  return (
    <HeroContainer>
      <TopNav isScrolled={isScrolled} />
      <div className="hero">
        <img
          className="background-image"
          src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668267540/NetflixApp/avengers-age-of-ultron-team-together-poster-wallpaper-1600x600-92751_84_qvwbif.jpg"
          alt="hero image"
        />
        <div className="container">
          <div className="title">
            <h1>Super Man</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus
              deleniti quam quidem quasi, nostrum delectus hic? Aspernatur ut
              officiis cumque aliquam rem optio unde accusantium provident
              assumenda ipsa! Laboriosam, ratione.
            </p>
          </div>
          <div className="buttons">
            <button className="playBtn">Play</button>
            <button className="moreBtn">More</button>
          </div>
        </div>
      </div>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  .hero {
    position: relative;
    .background-image {
      filter: brightness(40%);
    }
    img {
      height: 70vh;
      width: 100%;
    }
  }
  .container {
    position: absolute;
    bottom: 1rem;
    .title {
      color: white;
      h1 {
        margin-left: 5rem;
        text-transform: uppercase;
        font-size: 73px;
        background: -webkit-linear-gradient(#eee, rgb(128, 13, 13));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      p {
        margin-bottom: -50px;
        width: 640px;
        margin-left: 5rem;
        font-family: "lexend Deca", sans-serif;
        color: white;
      }
    }

    .buttons {
      display: flex;
      margin: 5rem;
      gap: 2rem;

      .playBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        border-radius: 1rem;
        cursor: pointer;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 0.9rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
      }
      .moreBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        border-radius: 1rem;
        background: black;
        cursor: pointer;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 0.9rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: 0.1rem solid white;
      }
    }
  }
`;

export default Netflix;
