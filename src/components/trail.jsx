import React, { useRef, useState, useEffect } from "react";

function Slider(props) {
  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    checkButtons();
  }, []);

  const checkButtons = () => {
    if (sliderRef.current) {
      setPrevDisable(sliderRef.current.scrollLeft <= 0);
      setNextDisable(
        sliderRef.current.offsetWidth >= sliderRef.current.scrollWidth
      );
    }
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= sliderRef.current.offsetWidth / 2;
      checkButtons();
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += sliderRef.current.offsetWidth / 2;
      checkButtons();
    }
  };

  return (
    <div className="slider-container" ref={sliderRef}>
      <div className="slider-wrapper">{props.children}</div>
      <div
        className={`btn prev ${prevDisable ? "disable" : ""}`}
        onClick={handlePrevClick}
        disabled={prevDisable}
      >
        {"<"}
      </div>
      <div
        className={`btn next ${nextDisable ? "disable" : ""}`}
        onClick={handleNextClick}
        disabled={nextDisable}
      >
        {">"}
      </div>
    </div>
  );
}

function SliderParent() {
  let data = [
    "Apple",
    "Ball",
    "Cat",
    "Dog",
    "Elephant",
    "Fruits",
    "Gorilla",
    "Horse",
    "Ink",
    "Jug",
    "Kite",
    "Lemon",
    "Orange",
    "Paddy",
    "Queen",
    "Rose",
    "Street",
    "Tuesday",
    "Umbrella",
    "Vanilla",
    "Wax",
    "Xerox",
    "Yarn",
    "Zebra",
  ];

  return (
    <div className="parent">
      <Slider>
        {data.map((value) => {
          return (
            <div key={value} className="child">
              {value}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default SliderParent;
