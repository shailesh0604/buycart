"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";

const HorizontalSlider = ({ title, data = [], scrollAmount = 300 }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  if (!data.length) return null;

  return (
      <div className="custom-container">
        {/* Header */}
        <div className="slider-heading flex justify-between items-center gap-4 mb-4">
          <h2 className="horizontal-title">{title}</h2>

          <div className="flex items-center gap-2">
            <button onClick={scrollLeft} className="btn-slide">
              <IoMdArrowRoundBack />
            </button>
            <button onClick={scrollRight} className="btn-slide">
              <IoMdArrowRoundForward />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="horizontal-slider" ref={sliderRef}>
          {data.map((item) => (
            <Link key={item.id} href={item.link} className="horizontal-slide">
              <div className="horizontal-slide-img">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={0}
                  height={0}
                  sizes="100%"
                />
              </div>

              <h3 className="horizontal-slide-title">{item.title}</h3>

              {item.price && (
                <small className="horizontal-slide-price">
                  From ₹<span>{item.price}</span>
                </small>
              )}
            </Link>
          ))}
        </div>
      </div>
  );
};

export default HorizontalSlider;
