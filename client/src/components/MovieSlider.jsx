import React from "react";
import Card from "./Card";
import styled from "styled-components";

export default React.memo(function MovieSlider({ data, title }) {
  //console.log(data);
  return (
    <Container>
      <h1>{title}</h1>
      <div className="wrapper">
        <div className="slider">
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
      </div>
    </Container>
  );
});

const Container = styled.div`
  color: white;
  gap: 0.7rem;
  position: relative;
  padding: 1rem 0;
  h1 {
    margin-left: 5px;
    text-transform: capitalize;
    font-size: 25px;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }
  .wrapper {
    .slider {
      display: flex;
      width: max-content;
      gap: 0.6rem;
      transform: translateX(0);
      transition: 1s ease-in-out;
      margin-left: 5px;
    }
  }
`;
